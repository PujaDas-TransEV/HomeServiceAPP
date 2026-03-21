
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
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

import { closeOutline, headsetOutline, locationOutline, searchOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
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
  FaSignOutAlt,
FaCalendarAlt,
FaHeadset
} from "react-icons/fa";

import { attachOutline, sendOutline } from "ionicons/icons";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { ellipsisVerticalOutline } from "ionicons/icons";
const API_BASE = "http://192.168.0.187:9830";

export default function HelperChat() {
  const { booking_id, receiver_account_id }: any = useParams();
const [name, setName] = useState("");
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>(
    "https://i.pravatar.cc/150?img=33"
  );

  const [otherUser, setOtherUser] = useState({
    name: "Helper",
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
  const history = useHistory();
  // ================= MY PROFILE =================
  useEffect(() => {
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

        setRegistrationId(regId);
        console.log("✅ Registration ID:", regId);

        // ✅ BASE64 IMAGE (NO PREFIX ADD)
        const imgRes = await fetch(`${API_BASE}/profiles/picture/base64`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const imgData = await imgRes.json();
        console.log("IMAGE API:", imgData);

        if (imgData?.image_base64) {
          setProfileImage(imgData.image_base64);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [token]);

  // ================= OTHER USER =================
  useEffect(() => {
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
        console.log(err);
      }
    };

    if (receiver_account_id) fetchUser();
  }, [receiver_account_id, token]);

  // ================= CHAT =================
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

    if (booking_id) fetchMessages();
  }, [booking_id]);

 
const sendMessage = async () => {
  if (!text.trim() && !file) return;

  // ================= EDIT =================
  if (editingMessageId) {
    try {
      const res = await fetch(
        `${API_BASE}/chat/messages/${editingMessageId}`,
        {
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
        }
      );

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === editingMessageId ? { ...m, message: text } : m
          )
        );
        setEditingMessageId(null);
        setText("");
      }
    } catch (err) {
      console.log("Edit error:", err);
    }
    return;
  }

  // ================= SEND =================
  const tempId = `temp-${Date.now()}`;

  const tempMessage = {
    id: tempId,
    sender_id: registrationId,
    receiver_id: receiver_account_id,
    message: text,
    file_url: filePreview || "",
    file_name: file?.name,
    file_type: file?.type,
    timestamp: new Date().toISOString(),
  };

  setMessages((prev) => [...prev, tempMessage]);

  setText("");
  setFile(null);
  setFilePreview(null);

  try {
    const formData = new FormData();
    formData.append("receiver_account_id", receiver_account_id);
    if (tempMessage.message) formData.append("message", tempMessage.message);
    if (file) formData.append("file", file);

    const res = await fetch(`${API_BASE}/chat/send/${booking_id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();

    if (data.message) {
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? data.message : m))
      );
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteMessage = async (msgId: string) => {
  try {
    const res = await fetch(`${API_BASE}/chat/messages/${msgId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== msgId));
    }
  } catch (err) {
    console.log("Delete error:", err);
  }
};
  // ================= FILE =================
  const handleFileChange = (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);

    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
             <IonItem button routerLink="/home" className="rounded-lg hover:bg-indigo-100">
               <FaHome className="text-purple-600 w-5 h-5 mr-3" />
               <IonLabel>Home</IonLabel>
             </IonItem>
   
             <IonItem button routerLink="/profile" className="rounded-lg hover:bg-indigo-100">
               <FaUser className="text-indigo-600 w-5 h-5 mr-3" />
               <IonLabel>Profile</IonLabel>
             </IonItem>
   
             <IonItem button routerLink="/chat" className="rounded-lg hover:bg-indigo-100">
               <FaComment className="text-pink-600 w-5 h-5 mr-3" />
               <IonLabel>Chat</IonLabel>
             </IonItem>
   
             <IonItem button routerLink="/maid-list" className="rounded-lg hover:bg-indigo-100">
               <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
               <IonLabel>Helper List</IonLabel>
             </IonItem>
   <IonItem button routerLink="/my-bookings" className="rounded-lg hover:bg-indigo-100">
     <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
     <IonLabel>My Bookings</IonLabel>
   </IonItem>
             <IonItem button routerLink="/preferences" className="rounded-lg hover:bg-indigo-100">
               <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
               <IonLabel>Preferences</IonLabel>
             </IonItem>
             <IonItem button routerLink="/support" className="rounded-lg hover:bg-indigo-100">
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
   
             {/* LEFT → User Welcome */}
             <div className="flex items-center gap-3">
               <img
                 src={Logo}
                 className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
                 alt="logo"
               />
               <div>
                 <p className="text-yellow-800 text-s opacity-80">Welcome back 👋</p>
                 <p className="text-indigo-500 font-bold text-lg">{name || "User"}</p>
               </div>
             </div>
   
             {/* RIGHT → Hamburger */}
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
   

      {/* ✅ HELPER INFO (NAVBAR ER NICHE) */}
    
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

      {/* ================= CHAT ================= */}

<IonContent className="p-3">
  {messages.map((msg) => {
    const isOwn =
      String(msg.sender_id) === String(registrationId);

    return (
      <div
        key={msg.id}
        className={`flex ${
          isOwn ? "justify-end" : "justify-start"
        } gap-2 items-end mb-3`}
      >
        {/* LEFT USER */}
        {!isOwn && (
          <IonAvatar className="w-10 h-10">
            <img
              src={otherUser.profile_picture}
              className="rounded-full object-cover"
              onError={(e: any) =>
                (e.target.src =
                  "https://i.pravatar.cc/150?img=22")
              }
            />
          </IonAvatar>
        )}

        {/* MESSAGE BOX */}
        <div className="relative max-w-[70%]">
          <div
            className={`p-2 rounded-lg ${
              isOwn
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {msg.message && <div>{msg.message}</div>}

            {/* IMAGE */}
            {msg.file_url &&
              msg.file_type?.startsWith("image/") && (
                <img
                  src={
                    msg.file_url.startsWith("http")
                      ? msg.file_url
                      : `${API_BASE}${msg.file_url}`
                  }
                  className="w-32 h-32 mt-2 rounded"
                />
              )}

            <div className="text-xs text-right mt-1">
              {formatTime(msg.timestamp)}
            </div>
          </div>

          {/* ✅ 3 DOT MENU (ONLY OWN MSG) */}
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

          {/* ✅ POPUP MENU */}
          {popoverOpenId === msg.id && (
            <div className="absolute top-6 right-0 bg-white shadow-lg rounded-lg z-50 w-28 border">
              
              {/* EDIT */}
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  setEditingMessageId(msg.id);
                  setText(msg.message);
                  setPopoverOpenId(null);
                }}
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                onClick={() => {
                  deleteMessage(msg.id);
                  setPopoverOpenId(null);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* RIGHT USER */}
        {isOwn && (
          <IonAvatar className="w-10 h-10">
            <img
              src={profileImage}
              className="rounded-full object-cover"
              onError={(e: any) =>
                (e.target.src =
                  "https://i.pravatar.cc/150?img=33")
              }
            />
          </IonAvatar>
        )}
      </div>
    );
  })}

  <div ref={bottomRef} />
</IonContent>

      {/* ================= INPUT ================= */}
      <div className="flex gap-2 p-2 border-t">
        <input
          type="file"
          hidden
          id="fileInput"
          onChange={handleFileChange}
        />

        <IonButton
          onClick={() =>
            document.getElementById("fileInput")?.click()
          }
        >
          <IonIcon icon={attachOutline} />
        </IonButton>

        {filePreview && (
          <img src={filePreview} className="w-12 h-12" />
        )}

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