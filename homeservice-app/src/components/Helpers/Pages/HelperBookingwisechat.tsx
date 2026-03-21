

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonSpinner,
  IonMenu,
  IonTitle,
  IonButton,
  IonItem,
  IonLabel,
IonAvatar,IonInput
} from "@ionic/react";

import { closeOutline, locationOutline, searchOutline } from "ionicons/icons";

import {
  FaBroom,
  FaUtensils,
  FaBaby,
  FaUserNurse,
  FaHandsHelping,
  FaHome,
  FaUser,
  FaComment,
  FaUsers,
  FaCog,
  FaSignOutAlt,FaClipboardList,
  FaCalendarAlt,
  FaHeadset
} from "react-icons/fa";

import { useEffect, useState,useRef } from "react";
import { useHistory } from "react-router-dom";
import { ellipsisVerticalOutline } from "ionicons/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/logo.jpg"
import { attachOutline, sendOutline } from "ionicons/icons";
const API_BASE = "http://192.168.0.187:9830";

export default function HelperBookingwiseChat() {
  const { booking_id, receiver_account_id }: any = useParams();

  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>("https://i.pravatar.cc/150?img=33");
  const [name, setName] = useState("You");
 const history = useHistory();
  const [seeker, setSeeker] = useState({
    name: "Seeker",
    profile_picture: "https://i.pravatar.cc/150?img=22",
  });

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [popoverOpenId, setPopoverOpenId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("access_token");

  // ================= PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`${API_BASE}/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      const regId = data.registration_id || data.profile?.registration;
      setRegistrationId(regId);
      setName(data.profile?.name || "You");

      const imgRes = await fetch(`${API_BASE}/profiles/picture/base64`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const imgData = await imgRes.json();

      if (imgData?.image_base64) {
        setProfileImage(imgData.image_base64);
      }
    };

    fetchProfile();
  }, [token]);

  // ================= SEEKER =================
  useEffect(() => {
    const fetchSeeker = async () => {
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
    };

    if (receiver_account_id) fetchSeeker();
  }, [receiver_account_id]);

  // ================= MESSAGES =================
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      setMessages(
        (data.history || []).sort(
          (a: any, b: any) =>
            new Date(a.timestamp).getTime() -
            new Date(b.timestamp).getTime()
        )
      );
    };

    fetchMessages();
  }, [booking_id]);

  // ================= WEBSOCKET =================
  useEffect(() => {
    const ws = new WebSocket(
      `ws://192.168.0.187:9830/chat/stream/${booking_id}/${receiver_account_id}`
    );

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setMessages((prev) => [...prev, msg]);
    };

    return () => ws.close();
  }, []);

  // ================= SEND / EDIT =================
  const sendMessage = async () => {
    if (!text.trim() && !file) return;

    // EDIT
    if (editingMessageId) {
      try {
        const res = await axios.patch(
          `${API_BASE}/chat/messages/${editingMessageId}`,
          {
            user_id: registrationId,
            user_role: "user",
            message: text,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 200) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === editingMessageId ? { ...m, message: text } : m
            )
          );
          setEditingMessageId(null);
          setText("");
        }
      } catch (err) {
        console.log(err);
      }
      return;
    }

    // SEND
    const formData = new FormData();
    formData.append("receiver_account_id", receiver_account_id);
    if (text) formData.append("message", text);
    if (file) formData.append("file", file);

    const res = await fetch(`${API_BASE}/chat/send/${booking_id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (data.message) setMessages((prev) => [...prev, data.message]);

    setText("");
    setFile(null);
    setFilePreview(null);
  };

  // ================= DELETE =================
  const deleteMessage = async (id: string) => {
    try {
      const res = await axios.delete(`${API_BASE}/chat/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILE =================
  const handleFileChange = (e: any) => {
    const f = e.target.files?.[0];
    setFile(f);

    if (f && f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const formatDate = (ts: string) =>
    new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
     <IonPage>

      {/* SIDE MENU */}
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-red-500 to-pink-600 px-4">
            <div className="flex items-center justify-between w-full">
              <IonTitle className="text-indigo-500 font-bold text-lg">HelperGo</IonTitle>
              <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-red-50">
          <div className="flex flex-col p-3 space-y-2">
            <IonItem button routerLink="/helper-home" className="rounded-lg hover:bg-red-100">
              <FaHome className="text-red-600 w-5 h-5 mr-3" />
              <IonLabel>Home / হোম</IonLabel>
            </IonItem>
            <IonItem button routerLink="/maid-profile" className="rounded-lg hover:bg-red-100">
              <FaUser className="text-orange-400 w-5 h-5 mr-3" />
              <IonLabel>Profile / প্রোফাইল</IonLabel>
            </IonItem>
            <IonItem button routerLink="/maid-chat" className="rounded-lg hover:bg-red-100">
              <FaComment className="text-pink-600 w-5 h-5 mr-3" />
              <IonLabel>Chat / চ্যাট</IonLabel>
            </IonItem>
            <IonItem button routerLink="/seeker-list" className="rounded-lg hover:bg-red-100">
              <FaUsers className="text-purple-600 w-5 h-5 mr-3" />
              <IonLabel>Seeker List / খোঁজকারী তালিকা</IonLabel>
            </IonItem>
               <IonItem button routerLink="/helper-bookings" className="rounded-lg hover:bg-red-100">
              <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
              <IonLabel>Bookings / বুকিংসমূহ</IonLabel>
            </IonItem>
            <IonItem button routerLink="/maid-preferences" className="rounded-lg hover:bg-red-100">
              <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Preferences / পছন্দসমূহ</IonLabel>
            </IonItem>

<IonItem button routerLink="/support-system" className="rounded-lg hover:bg-red-100">
  <FaHeadset className="text-green-600 w-5 h-5 mr-3" />
  <IonLabel>Helper Desk / সহায়তা কেন্দ্র</IonLabel>
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

      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-yellow-400 via-red-400 to-pink-500 px-4 py-3">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <img src={Logo} className="w-10 h-10 rounded-full shadow-lg border-2 border-white" alt="logo"/>
              <div>
                <p className="text-pink-500 text-s opacity-80">Welcome 👋 / স্বাগতম</p>
                <p className="font-bold text-lg text-red-600">{name || "User"}</p>
              </div>
            </div>
            <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.open()}>
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z" clipRule="evenodd"/>
                </svg>
              </div>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>


      {/* ✅ SEEKER INFO BAR */}
     <div className="flex items-center gap-3 p-3 border-b bg-gray-100">
  <IonAvatar className="w-10 h-10">
 
          <img
            src={seeker.profile_picture}
            className="rounded-full object-cover"
          />
        </IonAvatar>
        <div>
          <div className="font-semibold">{seeker.name}</div>
          <div className="text-xs text-green-500">Online</div>
        </div>
      </div>

      {/* CHAT */}
      <IonContent className="p-3">
        {messages.map((msg) => {
          const isOwn =
            String(msg.sender_id) === String(registrationId);

          return (
            <div
              key={msg.id}
              className={`flex ${
                isOwn ? "justify-end" : "justify-start"
              } gap-2 mb-3`}
            >
              {!isOwn && (
                <IonAvatar className="w-10 h-10">
                  <img src={seeker.profile_picture} />
                </IonAvatar>
              )}

              <div className="relative max-w-[70%]">
                <div
                  className={`p-2 rounded-lg ${
                    isOwn ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {msg.message}

                  {msg.file_url && (
                    <img
                      src={
                        msg.file_url.startsWith("http")
                          ? msg.file_url
                          : `${API_BASE}${msg.file_url}`
                      }
                      className="w-24 h-24 mt-2 rounded"
                    />
                  )}

                  <div className="text-xs text-right">
                    {formatDate(msg.timestamp)}
                  </div>
                </div>

                {/* 3 DOT */}
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

                {/* POPUP */}
                {popoverOpenId === msg.id && (
                  <div className="absolute right-0 top-6 bg-white shadow rounded w-24">
                    <button
                      className="block w-full text-left px-2 py-1"
                      onClick={() => {
                        setEditingMessageId(msg.id);
                        setText(msg.message);
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
                  <img src={profileImage} />
                </IonAvatar>
              )}
            </div>
          );
        })}

        <div ref={bottomRef} />
      </IonContent>

      {/* INPUT */}
      <div className="flex gap-2 p-2 border-t">
        <input type="file" hidden id="fileInput" onChange={handleFileChange} />

        <IonButton onClick={() => document.getElementById("fileInput")?.click()}>
          <IonIcon icon={attachOutline} />
        </IonButton>

        {filePreview && <img src={filePreview} className="w-12 h-12" />}

        <IonInput
          value={text}
          placeholder="Type message..."
          onIonInput={(e: any) => setText(e.target.value)}
        />

        <IonButton onClick={sendMessage}>
          <IonIcon icon={sendOutline} />
        </IonButton>
      </div>
    </IonPage>
  );
}