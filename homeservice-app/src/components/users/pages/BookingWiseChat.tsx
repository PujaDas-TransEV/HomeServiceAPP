
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
  attachOutline,
  sendOutline,
  ellipsisVerticalOutline,
} from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
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

type OtherUserState = {
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
      (msg.file_url && String(msg.file_url).trim()) ||
      (msg.file_name && String(msg.file_name).trim())
  );
};

const normalizeMessage = (msg: Partial<ChatMessage>): ChatMessage => {
  return {
    ...msg,
    id: msg.id ?? `msg-${Date.now()}-${Math.random()}`,
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

export default function HelperChat() {
  const { booking_id, receiver_account_id }: any = useParams();
  const history = useHistory();
  const token = localStorage.getItem("access_token");

  const [name, setName] = useState("");
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>(
    "https://i.pravatar.cc/150?img=33"
  );

  const [otherUser, setOtherUser] = useState<OtherUserState>({
    name: "Helper",
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

  // ================= MY PROFILE =================
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/profiles/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        const profile = data.profile;

        setName(profile?.name || "");

        const regId =
          data.registration_id ||
          data.profile?.registration ||
          localStorage.getItem("registration_id");

        setRegistrationId(regId ? String(regId) : null);

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

  // ================= OTHER USER =================
  useEffect(() => {
    if (!receiver_account_id || !token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/helper/helper-details/${receiver_account_id}`,
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

        setOtherUser({
          name: data.profile?.name || "Helper",
          profile_picture: img,
        });
      } catch (err) {
        console.log("Other user fetch error:", err);
      }
    };

    fetchUser();
  }, [receiver_account_id, token]);

  // ================= CHAT HISTORY =================
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

  // ================= AUTO SCROLL =================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ================= SEND / EDIT =================
  const sendMessage = async () => {
    if (!text.trim() && !file) return;
    if (!token) return;

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
              String(m.id) === String(editingMessageId)
                ? { ...m, message: text }
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

    const outgoingText = text;
    const outgoingFile = file;
    const outgoingPreview = filePreview;
    const tempId = `temp-${Date.now()}`;

    const tempMessage: ChatMessage = {
      id: tempId,
      sender_id: registrationId,
      receiver_id: receiver_account_id,
      message: outgoingText,
      file_url: outgoingPreview || "",
      file_name: outgoingFile?.name || "",
      file_type: outgoingFile?.type || "",
      timestamp: new Date().toISOString(),
      pending: true,
    };

    setMessages((prev) => sortMessages([...prev, tempMessage]));
    setText("");
    setFile(null);
    setFilePreview(null);

    try {
      const formData = new FormData();
      formData.append("receiver_account_id", String(receiver_account_id));
      if (outgoingText.trim()) formData.append("message", outgoingText);
      if (outgoingFile) formData.append("file", outgoingFile);

      const res = await fetch(`${API_BASE}/chat/send/${booking_id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (data.message) {
        mergeMessage(data.message);
      }
    } catch (err) {
      console.log("Send error:", err);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  // ================= DELETE =================
  const deleteMessage = async (msgId: string | number) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/chat/messages/${msgId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== msgId));
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

  const formatTime = (ts?: string | null) => {
    if (!ts) return "";
    const date = new Date(ts);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
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
      {/* ================= SIDE MENU ================= */}
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
            <div className="flex items-center justify-between w-full">
              <IonTitle className="text-purple-600 font-bold text-lg">
                HelperGo
              </IonTitle>
              <IonButton
                fill="clear"
                onClick={() => document.querySelector("ion-menu")?.close()}
              >
                <IonIcon icon={closeOutline} className="text-pink-600 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-indigo-50">
          <div className="flex flex-col p-3 space-y-2">
            <IonItem
              button
              routerLink="/home"
              className="rounded-lg hover:bg-indigo-100"
            >
              <FaHome className="text-purple-600 w-5 h-5 mr-3" />
              <IonLabel>Home</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/profile"
              className="rounded-lg hover:bg-indigo-100"
            >
              <FaUser className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Profile</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/chat"
              className="rounded-lg hover:bg-indigo-100"
            >
              <FaComment className="text-pink-600 w-5 h-5 mr-3" />
              <IonLabel>Chat</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/maid-list"
              className="rounded-lg hover:bg-indigo-100"
            >
              <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
              <IonLabel>Helper List</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/my-bookings"
              className="rounded-lg hover:bg-indigo-100"
            >
              <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
              <IonLabel>My Bookings</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/preferences"
              className="rounded-lg hover:bg-indigo-100"
            >
              <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Preferences</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/support"
              className="rounded-lg hover:bg-indigo-100"
            >
              <FaHeadset className="text-green-600 w-5 h-5 mr-3" />
              <IonLabel>Helper Desk</IonLabel>
            </IonItem>

            <IonItem
              button
              className="rounded-lg hover:bg-red-100"
              onClick={() => {
                localStorage.removeItem("access_token");
                history.push("/login");
              }}
            >
              <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
              <IonLabel className="text-red-500">Logout</IonLabel>
            </IonItem>
          </div>
        </IonContent>
      </IonMenu>

      {/* ================= HEADER ================= */}
      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-3">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
                alt="logo"
              />
              <div>
                <p className="text-yellow-800 text-s opacity-80">
                  Welcome back 👋
                </p>
                <p className="text-indigo-500 font-bold text-lg">
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
                  className="w-6 h-6 text-pink-600"
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

      {/* ================= OTHER USER BAR ================= */}
      <div className="flex items-center gap-3 p-3 border-b bg-gray-100">
        <IonAvatar className="w-10 h-10">
          <img
            src={otherUser.profile_picture}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
            onError={(e: any) =>
              (e.target.src = "https://i.pravatar.cc/150?img=22")
            }
          />
        </IonAvatar>

        <div>
          <div className="font-semibold">{otherUser.name}</div>
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

        {/* ✅ DATE SEPARATOR */}
        {showDate && (
          <div className="flex justify-center my-3">
            <div className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full">
              {currentDate}
            </div>
          </div>
        )}

        {/* 🔽 SAME DESIGN */}
        <div
          className={`flex ${
            isOwn ? "justify-end" : "justify-start"
          } gap-2 items-end mb-3`}
        >
          {!isOwn && (
            <IonAvatar className="w-10 h-10">
              <img
                src={otherUser.profile_picture}
                className="rounded-full object-cover"
                alt={otherUser.name}
                onError={(e: any) =>
                  (e.target.src = "https://i.pravatar.cc/150?img=22")
                }
              />
            </IonAvatar>
          )}

          <div className="relative max-w-[70%]">
            <div
              className={`p-2 rounded-lg ${
                isOwn ? "bg-green-500 text-white" : "bg-gray-200"
              } ${msg.pending ? "opacity-80" : ""}`}
            >
              {msg.message ? (
                <div className={msg.file_url || msg.file_name ? "mb-2" : ""}>
                  {msg.message}
                </div>
              ) : null}

              {fileUrl ? (
                showImage ? (
                  <img
                    src={fileUrl}
                    className="w-32 h-32 mt-2 rounded object-cover"
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
              ) : msg.file_name ? (
                <div className="text-sm mt-2 opacity-90 break-all">
                  {msg.file_name}
                  {msg.pending ? " (uploading...)" : ""}
                </div>
              ) : null}

              {msg.timestamp ? (
                <div className="text-xs text-right mt-1">
                  {formatTime(msg.timestamp)}
                </div>
              ) : null}
            </div>

            {isOwn && (
              <IonButton
                fill="clear"
                className="absolute top-0 right-0 text-blue-600 p-0 m-0"
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
              <div className="absolute top-6 right-0 bg-white shadow-lg rounded-lg z-50 w-28 border">
                <button
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => {
                    setEditingMessageId(String(msg.id));
                    setText(msg.message || "");
                    setPopoverOpenId(null);
                  }}
                >
                  Edit
                </button>

                <button
                  className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                  onClick={() => {
                    deleteMessage(msg.id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {isOwn && (
            <IonAvatar className="w-10 h-10">
              <img
                src={profileImage}
                className="rounded-full object-cover"
                alt={name || "User"}
                onError={(e: any) =>
                  (e.target.src = "https://i.pravatar.cc/150?img=33")
                }
              />
            </IonAvatar>
          )}
        </div>
      </div>
    );
  })}

  <div ref={bottomRef} />
</IonContent>

      {/* ================= INPUT ================= */}
      <div className="flex gap-2 p-2 border-t items-center">
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
        ) : file?.name ? (
          <div className="px-2 py-1 text-sm border rounded max-w-[120px] truncate">
            {file.name}
          </div>
        ) : null}

        <IonInput
          value={text}
          placeholder={editingMessageId ? "Edit message..." : "Type message..."}
          onIonInput={(e: any) => setText(e.detail.value ?? "")}
        />

        <IonButton onClick={sendMessage}>
          <IonIcon icon={sendOutline} />
        </IonButton>
      </div>
    </IonPage>
  );
}