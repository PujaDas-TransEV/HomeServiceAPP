
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonMenu,
  IonTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonAvatar,
  IonInput,
} from "@ionic/react";
import {
  closeOutline,
  ellipsisVerticalOutline,
  attachOutline,
  sendOutline,
} from "ionicons/icons";
import {
  FaHome,
  FaUser,
  FaComment,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaHeadset,
} from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/logo.jpg";

const API_BASE = "http://192.168.0.187:9830";

type ChatMessage = {
  id: string | number;
  sender_id?: string | number | null;
  receiver_id?: string | number | null;
  message?: string | null;
  file_url?: string | null;
  file_name?: string | null;
  file_type?: string | null;
  timestamp?: string | null;
  created_at?: string | null;
  pending?: boolean;
  [key: string]: any;
};

type SeekerState = {
  name: string;
  profile_picture: string;
};

const normalizeTimestamp = (ts?: string | null) => {
  if (!ts) return new Date().toISOString();
  return ts.replace(/\.(\d{3})\d+/, ".$1");
};

const hasVisibleContent = (msg: Partial<ChatMessage>) => {
  return Boolean(
    (msg.message && String(msg.message).trim()) ||
      (msg.file_url && String(msg.file_url).trim())
  );
};

const normalizeMessage = (msg: Partial<ChatMessage>): ChatMessage => {
  return {
    ...msg,
    id: msg.id ?? `msg-${Date.now()}`,
    message: msg.message ?? "",
    file_url: msg.file_url ?? "",
    file_name: msg.file_name ?? "",
    file_type: msg.file_type ?? "",
    timestamp: normalizeTimestamp(msg.timestamp || msg.created_at),
  };
};

const sortMessages = (list: ChatMessage[]) => {
  return [...list].sort(
    (a, b) =>
      new Date(a.timestamp || 0).getTime() -
      new Date(b.timestamp || 0).getTime()
  );
};

const resolveFileUrl = (fileUrl?: string | null) => {
  if (!fileUrl) return "";
  if (
    fileUrl.startsWith("http://") ||
    fileUrl.startsWith("https://") ||
    fileUrl.startsWith("data:")
  ) {
    return fileUrl;
  }
  return `${API_BASE}${fileUrl}`;
};

const isImageFile = (msg: ChatMessage, resolvedUrl: string) => {
  if (msg.file_type?.startsWith("image/")) return true;
  if (resolvedUrl.startsWith("data:image/")) return true;
  return /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(resolvedUrl);
};

export default function HelperBookingwiseChat() {
  const { booking_id, receiver_account_id }: any = useParams();
  const history = useHistory();

  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>(
    "https://i.pravatar.cc/150?img=33"
  );
  const [name, setName] = useState("You");
  const [seeker, setSeeker] = useState<SeekerState>({
    name: "Seeker",
    profile_picture: "https://i.pravatar.cc/150?img=22",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [popoverOpenId, setPopoverOpenId] = useState<string | number | null>(
    null
  );

  const bottomRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("access_token");

  // ================= PROFILE =================
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/profiles/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const regId = data.registration_id || data.profile?.registration;
        setRegistrationId(regId ? String(regId) : null);
        setName(data.profile?.name || "You");

        const imgRes = await fetch(`${API_BASE}/profiles/picture/base64`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const imgData = await imgRes.json();

        if (imgData?.image_base64) {
          setProfileImage(imgData.image_base64);
        }
      } catch (err) {
        console.log("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, [token]);

  // ================= SEEKER =================
  useEffect(() => {
    if (!receiver_account_id || !token) return;

    const fetchSeeker = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/seeker/seeker-details/${receiver_account_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        let img =
          data.account_info?.profile_picture ||
          "https://i.pravatar.cc/150?img=22";

        if (data.account_info?.image_base64) {
          img = data.account_info.image_base64;
        }

        setSeeker({
          name: data.profile?.name || "Seeker",
          profile_picture: img,
        });
      } catch (err) {
        console.log("Seeker fetch error:", err);
      }
    };

    fetchSeeker();
  }, [receiver_account_id, token]);

  // ================= MESSAGES =================
  useEffect(() => {
    if (!booking_id || !token) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const normalizedHistory = (data.history || [])
          .map((msg: ChatMessage) => normalizeMessage(msg))
          .filter((msg: ChatMessage) => hasVisibleContent(msg));

        setMessages(sortMessages(normalizedHistory));
      } catch (err) {
        console.log("History fetch error:", err);
      }
    };

    fetchMessages();
  }, [booking_id, token]);

  // ================= WEBSOCKET =================
 
  // ================= AUTO SCROLL =================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ================= SEND / EDIT =================
  const sendMessage = async () => {
  if (!text.trim() && !file) return;
  if (!token) return;

  // ================= EDIT MESSAGE =================
  if (editingMessageId) {
    try {
      const res = await fetch(`${API_BASE}/chat/messages/${editingMessageId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: registrationId,
          user_role: "user",
          message: text,
        }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === editingMessageId
              ? { ...m, message: text, timestamp: normalizeTimestamp(m.timestamp) }
              : m
          )
        );
        setEditingMessageId(null);
        setText("");
        setPopoverOpenId(null);
      }
    } catch (err) {
      console.log("Edit error:", err);
    }
    return;
  }

  // ================= SEND NEW MESSAGE =================
  const tempId = `temp-${Date.now()}`;
  const tempMessage: ChatMessage = {
    id: tempId,
    sender_id: registrationId,
    receiver_id: receiver_account_id,
    message: text,
    file_url: filePreview || "",
    file_name: file?.name || "",
    file_type: file?.type || "",
    timestamp: new Date().toISOString(),
    pending: true, // mark as temporary
  };

  // Add temp message
  setMessages((prev) => sortMessages([...prev, tempMessage]));

  // Clear input fields
  setText("");
  setFile(null);
  setFilePreview(null);

  try {
   const formData = new FormData();

formData.append("receiver_account_id", String(receiver_account_id));

if (text.trim()) {
  formData.append("message", text); // ✅ FIXED
}

if (file) {
  formData.append("file", file);
}

    const res = await fetch(`${API_BASE}/chat/send/${booking_id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();

    if (data.message) {
      // Merge backend message and replace temp
      mergeMessage(data.message);
    }
  } catch (err) {
    console.log("Send error:", err);
    // Remove temp message if send fails
    setMessages((prev) => prev.filter((m) => m.id !== tempId));
  }
};
  // ================= DELETE =================
  const deleteMessage = async (id: string | number) => {
    if (!token) return;

    try {
      const res = await axios.delete(`${API_BASE}/chat/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setPopoverOpenId(null);
      }
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // ================= FILE =================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (!selectedFile) {
      setFilePreview(null);
      return;
    }

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const formatDate = (ts?: string | null) => {
    if (!ts) return "";
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
// ✅ FIRST declare this
const mergeMessage = useCallback((incoming: Partial<ChatMessage>) => {
  const normalized = normalizeMessage(incoming);

  if (!hasVisibleContent(normalized)) return;

  setMessages((prev) => {
    // ✅ already exists by id
    const exists = prev.some((m) => m.id === normalized.id);
    if (exists) return prev;

    // ✅ replace temp message (VERY IMPORTANT)
    const tempIndex = prev.findIndex(
      (m) =>
        m.pending &&
        String(m.sender_id) === String(normalized.sender_id) &&
        String(m.message) === String(normalized.message)
    );

    if (tempIndex !== -1) {
      const updated = [...prev];
      updated[tempIndex] = { ...normalized, pending: false };
      return sortMessages(updated);
    }

    // ✅ new message (receiver side)
    return sortMessages([...prev, { ...normalized, pending: false }]);
  });
}, []);
// ✅ THEN use it
useEffect(() => {
  if (!booking_id || !token) return;

  const socket = new WebSocket(
    `ws://192.168.0.187:9830/chat/stream/${booking_id}?token=${token}`
  );

 socket.onmessage = (e) => {
  try {
    const raw = JSON.parse(e.data);

    // ✅ FIX: handle backend structure
    const payload = raw?.data || raw;

    if (!payload || typeof payload !== "object") return;
    if (!hasVisibleContent(payload)) return;

    // ✅ optional: type check (best practice)
    if (raw.type && raw.type !== "new_message") return;

    const isOwn =
      String(payload.sender_id ?? "") === String(registrationId ?? "");

    // ✅ OWN message → replace temp
    if (isOwn) {
      mergeMessage(payload);
      return;
    }

    // ✅ RECEIVER message → instantly show
    mergeMessage(payload);
  } catch (err) {
    console.log("WS parse error:", err);
  }
};

  return () => socket.close();
}, [booking_id, token, registrationId, mergeMessage]);
const formatDateLabel = (ts?: string | null) => {
  if (!ts) return "";

  const msgDate = new Date(ts);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(msgDate, today)) return "Today";
  if (isSameDay(msgDate, yesterday)) return "Yesterday";

  return msgDate.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
  return (
    <IonPage>
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-red-500 to-pink-600 px-4">
            <div className="flex items-center justify-between w-full">
              <IonTitle className="text-indigo-500 font-bold text-lg">
                HelperGo
              </IonTitle>
              <IonButton
                fill="clear"
                onClick={() => document.querySelector("ion-menu")?.close()}
              >
                <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-red-50">
          <div className="flex flex-col p-3 space-y-2">
            <IonItem
              button
              routerLink="/helper-home"
              className="rounded-lg hover:bg-red-100"
            >
              <FaHome className="text-red-600 w-5 h-5 mr-3" />
              <IonLabel>Home / হোম</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/maid-profile"
              className="rounded-lg hover:bg-red-100"
            >
              <FaUser className="text-orange-400 w-5 h-5 mr-3" />
              <IonLabel>Profile / প্রোফাইল</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/maid-chat"
              className="rounded-lg hover:bg-red-100"
            >
              <FaComment className="text-pink-600 w-5 h-5 mr-3" />
              <IonLabel>Chat / চ্যাট</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/seeker-list"
              className="rounded-lg hover:bg-red-100"
            >
              <FaUsers className="text-purple-600 w-5 h-5 mr-3" />
              <IonLabel>Seeker List / খোঁজকারী তালিকা</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/helper-bookings"
              className="rounded-lg hover:bg-red-100"
            >
              <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
              <IonLabel>Bookings / বুকিংসমূহ</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/maid-preferences"
              className="rounded-lg hover:bg-red-100"
            >
              <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Preferences / পছন্দসমূহ</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/support-system"
              className="rounded-lg hover:bg-red-100"
            >
              <FaHeadset className="text-green-600 w-5 h-5 mr-3" />
              <IonLabel>Help Desk / সহায়তা কেন্দ্র</IonLabel>
            </IonItem>

            <IonItem
              button
              className="rounded-lg hover:bg-red-200"
              onClick={() => {
                localStorage.removeItem("access_token");
                history.push("/login");
              }}
            >
              <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
              <IonLabel>Logout / লগ আউট</IonLabel>
            </IonItem>
          </div>
        </IonContent>
      </IonMenu>

      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-yellow-400 via-red-400 to-pink-500 px-4 py-3">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
                alt="logo"
              />
              <div>
                <p className="text-pink-500 text-s opacity-80">
                  Welcome 👋 / স্বাগতম
                </p>
                <p className="font-bold text-lg text-red-600">
                  {name || "User"}
                </p>
              </div>
            </div>

            <IonButton
              fill="clear"
              onClick={() => document.querySelector("ion-menu")?.open()}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>

      <div className="flex items-center gap-3 p-3 border-b bg-gray-100 dark:bg-blue-900">
        <IonAvatar className="w-10 h-10">
          {/* <img
            src={seeker.profile_picture}
            className="rounded-full object-cover"
            alt={seeker.name}
          /> */}
           <img
            src={seeker.profile_picture}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
            onError={(e: any) =>
              (e.target.src = "https://i.pravatar.cc/150?img=22")
            }
          />
        </IonAvatar>
        <div>
          <div className="font-semibold">{seeker.name}</div>
          <div className="text-xs text-green-500">Online</div>
        </div>
      </div>

     
      <IonContent id="main-content" className="p-3">
  {messages.map((msg, index) => {
    const prevMsg = messages[index - 1];

    const currentDate = formatDateLabel(msg.timestamp);
    const prevDate = prevMsg
      ? formatDateLabel(prevMsg.timestamp)
      : null;

    const showDate = currentDate !== prevDate;

    const isOwn =
      String(msg.sender_id ?? "") === String(registrationId ?? "");

    if (!hasVisibleContent(msg)) return null;

    const fileUrl = resolveFileUrl(msg.file_url);
    const showImage = Boolean(fileUrl) && isImageFile(msg, fileUrl);

    return (
      <div key={String(msg.id)}>

        {/* ✅ DATE SEPARATOR (NEW ADD) */}
        {showDate && (
          <div className="flex justify-center my-3">
            <div className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full">
              {currentDate}
            </div>
          </div>
        )}

        {/* 🔽 তোমার আগের design same */}
        <div
          className={`flex ${
            isOwn ? "justify-end" : "justify-start"
          } gap-2 mb-3`}
        >
          {!isOwn && (
            <IonAvatar className="w-10 h-10">
              <img src={seeker.profile_picture} alt={seeker.name} />
            </IonAvatar>
          )}

          <div className="relative max-w-[70%]">
            <div
              className={`p-2 rounded-lg ${
                isOwn ? "bg-green-500 text-white" : "bg-gray-200 dark:text-gray-900 "
              } ${msg.pending ? "opacity-80" : ""}`}
            >
              {msg.message ? (
                <div className={fileUrl ? "mb-2" : ""}>{msg.message}</div>
              ) : null}

              {fileUrl ? (
                showImage ? (
                  <img
                    src={fileUrl}
                    className="w-24 h-24 mt-2 rounded object-cover"
                    alt={msg.file_name || "attachment"}
                  />
                ) : (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`underline break-all ${
                      isOwn ? "text-white" : "text-blue-600"
                    }`}
                  >
                    {msg.file_name || "Open attachment"}
                  </a>
                )
              ) : null}

              {msg.timestamp ? (
                <div className="text-xs text-right mt-1">
                  {formatDate(msg.timestamp)}
                </div>
              ) : null}
            </div>

            {isOwn && (
              <IonButton
                fill="clear"
                className="absolute -top-2 -right-2 p-0 m-0"
                onClick={() =>
                  setPopoverOpenId(
                    popoverOpenId === msg.id ? null : msg.id
                  )
                }
              >
                <IonIcon icon={ellipsisVerticalOutline} />
              </IonButton>
            )}

            {popoverOpenId === msg.id && (
              // <div className="absolute right-0 top-6 bg-white shadow rounded w-24 z-10">
              //   <button
              //     className="block w-full text-left px-2 py-1"
              //     onClick={() => {
              //       setEditingMessageId(String(msg.id));
              //       setText(msg.message || "");
              //       setPopoverOpenId(null);
              //     }}
              //   >
              //     Edit
              //   </button>
              <div className="absolute right-0 top-6 bg-white dark:bg-white-800 shadow rounded w-24 z-10">
  <button
    className="block w-full text-left px-2 py-1 text-gray-800 dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700"
    onClick={() => {
      setEditingMessageId(String(msg.id));
      setText(msg.message || "");
      setPopoverOpenId(null);
    }}
  >
    Edit
  </button>


                <button
                  className="block w-full text-left px-2 py-1 text-red-500"
                  onClick={() => deleteMessage(msg.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {isOwn && (
            <IonAvatar className="w-10 h-10">
              <img src={profileImage} alt={name} />
            </IonAvatar>
          )}
        </div>
      </div>
    );
  })}

  <div ref={bottomRef} />
</IonContent>

      <div className="flex gap-2 p-2 border-t">
        <input
          type="file"
          hidden
          id="fileInput"
          onChange={handleFileChange}
        />

        <IonButton
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <IonIcon icon={attachOutline} />
        </IonButton>

        {filePreview ? (
          <img
            src={filePreview}
            className="w-12 h-12 rounded object-cover"
            alt="preview"
          />
        ) : null}

        <IonInput
          value={text}
          placeholder="Type message..."
          onIonInput={(e: CustomEvent) =>
            setText(String((e.detail as any).value ?? ""))
          }
        />

        <IonButton onClick={sendMessage}>
          <IonIcon icon={sendOutline} />
        </IonButton>
      </div>
    </IonPage>
  );
}