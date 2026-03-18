// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonButtons,
//   IonMenuButton,
//   IonContent,
//   IonIcon,
//   IonSpinner,
//   IonMenu,
//   IonTitle,
//   IonButton,
//   IonItem,
//   IonLabel,
//   IonInput,
//   IonAvatar
// } from "@ionic/react";

// import { closeOutline, locationOutline, searchOutline } from "ionicons/icons";

// import {
//   FaBroom,
//   FaUtensils,
//   FaBaby,
//   FaUserNurse,
//   FaHandsHelping,
//   FaHome,
//   FaUser,
//   FaComment,
//   FaUsers,
//   FaCog,
//   FaSignOutAlt,
// FaCalendarAlt,
// FaHeadset
// } from "react-icons/fa";

// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// import { chatbubbleOutline } from "ionicons/icons";

// import Logo from "../../assets/logo.jpg";
// import DefaultAvatar from "../../assets/profile.png";

// const API_BASE = "http://192.168.0.187:9830";

// export default function ChatPage() {

//   const history = useHistory();

//   const [helpers, setHelpers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searchText, setSearchText] = useState("");
//  const [name, setName] = useState("");
//   const [city, setCity] = useState("");
//   const [area, setArea] = useState("");
//   useEffect(() => {
//     fetchHelpers();
//     fetchProfile();
//   }, []);

//   // ---------------- Fetch Helpers ----------------
//   const fetchHelpers = async () => {

//     setLoading(true);

//     const token = localStorage.getItem("access_token");

//     try {

//       const res = await fetch(`${API_BASE}/services/admin/user-report`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const data = await res.json();

//       const helperList = (data.users || []).filter(
//         (user: any) => user.role === "helper"
//       );

//       setHelpers(helperList);

//     } catch (err) {
//       console.log(err);
//     }

//     setLoading(false);
//   };
// const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         history.push("/login");
//         return;
//       }

//       const res = await fetch(`${API_BASE}/profiles/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();
//       const profile = data?.profile || {};

//       setName(profile.name || "User");
//       setCity(profile.city || "Kolkata");
//       setArea(profile.area || "");
//     } catch (error) {
//       console.log("Profile error:", error);
//     }
//   };

//   // ---------------- Search Filter ----------------
//   const filteredHelpers = helpers.filter((helper: any) =>
//     helper.name?.toLowerCase().includes(searchText.toLowerCase())
//   );
//  const cardColors = [
//     "bg-gradient-to-r from-blue-50 to-indigo-50",
//     "bg-gradient-to-r from-pink-50 to-rose-50",
//     "bg-gradient-to-r from-purple-50 to-indigo-50",
//     "bg-gradient-to-r from-green-50 to-emerald-50"
//   ];
//   return (
//     <IonPage>
   
//        {/* ================= SIDE MENU ================= */}
//        <IonMenu side="end" contentId="main-content" type="overlay">
//          <IonHeader>
//            <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
//              <div className="flex items-center justify-between w-full">
//                <IonTitle className="text-purple-600 font-bold text-lg">
//                  HelperGo
//                </IonTitle>
//                <IonButton
//                  fill="clear"
//                  onClick={() => document.querySelector("ion-menu")?.close()}
//                >
//                  <IonIcon icon={closeOutline} className="text-pink-600 text-xl" />
//                </IonButton>
//              </div>
//            </IonToolbar>
//          </IonHeader>
   
//          <IonContent className="bg-indigo-50">
//            <div className="flex flex-col p-3 space-y-2">
//              <IonItem button routerLink="/home" className="rounded-lg hover:bg-indigo-100">
//                <FaHome className="text-purple-600 w-5 h-5 mr-3" />
//                <IonLabel>Home</IonLabel>
//              </IonItem>
   
//              <IonItem button routerLink="/profile" className="rounded-lg hover:bg-indigo-100">
//                <FaUser className="text-indigo-600 w-5 h-5 mr-3" />
//                <IonLabel>Profile</IonLabel>
//              </IonItem>
   
//              <IonItem button routerLink="/chat" className="rounded-lg hover:bg-indigo-100">
//                <FaComment className="text-pink-600 w-5 h-5 mr-3" />
//                <IonLabel>Chat</IonLabel>
//              </IonItem>
   
//              <IonItem button routerLink="/maid-list" className="rounded-lg hover:bg-indigo-100">
//                <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
//                <IonLabel>Helper List</IonLabel>
//              </IonItem>
//    <IonItem button routerLink="/my-bookings" className="rounded-lg hover:bg-indigo-100">
//      <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
//      <IonLabel>My Bookings</IonLabel>
//    </IonItem>
//              <IonItem button routerLink="/preferences" className="rounded-lg hover:bg-indigo-100">
//                <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
//                <IonLabel>Preferences</IonLabel>
//              </IonItem>
//      <IonItem button routerLink="/support" className="rounded-lg hover:bg-indigo-100">
//      <FaHeadset className="text-green-600 w-5 h-5 mr-3" />
//      <IonLabel>Helper Desk</IonLabel>
//    </IonItem>
//              <IonItem
//                button
//                className="rounded-lg hover:bg-red-100"
//                onClick={() => {
//                  localStorage.removeItem("access_token");
//                  history.push("/login");
//                }}
//              >
//                <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
//                <IonLabel className="text-red-500">Logout</IonLabel>
//              </IonItem>
//            </div>
//          </IonContent>
//        </IonMenu>
   
//        {/* ================= HEADER ================= */}
//        <IonHeader>
//          <IonToolbar className="bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-3">
//            <div className="flex justify-between items-center w-full">
   
//              {/* LEFT → User Welcome */}
//              <div className="flex items-center gap-3">
//                <img
//                  src={Logo}
//                  className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
//                  alt="logo"
//                />
//                <div>
//                  <p className="text-yellow-800 text-s opacity-80">Welcome back 👋</p>
//                  <p className="text-indigo-500 font-bold text-lg">{name || "User"}</p>
//                </div>
//              </div>
   
//              {/* RIGHT → Hamburger */}
//              <IonButton
//                fill="clear"
//                onClick={() => document.querySelector("ion-menu")?.open()}
//              >
//                <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
//                  <svg
//                    className="w-6 h-6 text-pink-600"
//                    fill="currentColor"
//                    viewBox="0 0 20 20"
//                  >
//                    <path
//                      fillRule="evenodd"
//                      d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
//                      clipRule="evenodd"
//                    />
//                  </svg>
//                </div>
//              </IonButton>
   
//            </div>
//          </IonToolbar>
//        </IonHeader>
//       {/* ---------- Content ---------- */}

//       <IonContent className="bg-linear-to-b from-pink-50 via-white to-purple-50 p-4">

//         {/* ---------- Search ---------- */}

//       <div className="relative mb-5">

//   {/* Search Icon */}
//   <IonIcon
//     icon={searchOutline}
//     className="absolute left-4 top-3.5 text-pink-500 text-lg"
//   />

//   <IonInput
//     value={searchText}
//     placeholder="Search helper..."
//     onIonInput={(e: any) => setSearchText(e.target.value)}
//     className="pl-10 pr-4 py-3 w-full 
//     bg-linear-to-r from-pink-50 via-white to-purple-50
//     border border-pink-200 
//     rounded-xl 
//     shadow-md 
//     focus:ring-2 focus:ring-pink-400 
//     text-gray-700"
//   />

// </div>
//         {/* ---------- Loading ---------- */}

//         {loading && (

//           <div className="flex justify-center mt-10">
//             <IonSpinner name="crescent" color="primary" />
//           </div>

//         )}

//         {/* ---------- Helper List ---------- */}

//         <div className="space-y-4">

//           {!loading && filteredHelpers.length === 0 && (
//             <p className="text-center text-gray-500">
//               No helpers found
//             </p>
//           )}

//           {filteredHelpers.map((helper: any, index:number) => (

//             <div
//               key={helper.account_id}
//               className={`flex items-center justify-between rounded-2xl p-3 shadow-md hover:shadow-lg transition ${cardColors[index % cardColors.length]}`}
//             >

//               {/* Left Info */}

//               <div className="flex items-center gap-3">

//                 <IonAvatar className="w-10 h-10">

//                   <img
//                     src={helper.profile_picture || DefaultAvatar}
//                     className="object-cover"
//                   />

//                 </IonAvatar>

//                 <div>

//                   <h2 className="font-semibold text-gray-800 text-sm">
//                     {helper.name || "Helper"}
//                   </h2>

//                   <p className="text-gray-500 text-xs">
//                     {helper.phone || "No phone"}
//                   </p>

//                 </div>

//               </div>

//               {/* Chat Button */}

//               <IonButton
//                 size="small"
//                 className="rounded-full bg-linear-to-r from-pink-500 to-red-500 text-white shadow"
//                 onClick={(e) => {

//                   e.stopPropagation();

//                   history.push(`/helper-chat/${helper.registration_id}`);

//                 }}
//               >

//                 <IonIcon icon={chatbubbleOutline}/>

//               </IonButton>

//             </div>

//           ))}

//         </div>

//       </IonContent>

//     </IonPage>
//   );
// }

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton
} from "@ionic/react";

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";

const API_BASE = "http://192.168.0.187:9830";

export default function HelperChat() {

  const { booking_id, receiver_account_id }: any = useParams();

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<any>(null);

  const token = localStorage.getItem("access_token");

  // ---------------- Fetch Chat History ----------------
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [booking_id]);

  // ---------------- WebSocket (Native) ----------------
  useEffect(() => {

    if (!booking_id || !receiver_account_id) return;

    const ws = new WebSocket(
      `ws://0.0.0.0:9830/chat/stream/${booking_id}/${receiver_account_id}`
    );

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        // append new message
        setMessages((prev) => [...prev, msg]);

      } catch (err) {
        console.log("WS parse error", err);
      }
    };

    ws.onerror = (err) => {
      console.log("WebSocket error", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };

  }, [booking_id, receiver_account_id]);

  // ---------------- Send Message ----------------
  const sendMessage = async () => {

    if (!text.trim()) return;

    try {

      const res = await fetch(`${API_BASE}/chat/send/${booking_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          receiver_account_id,
          message: text
        })
      });

      const data = await res.json();

      // optional: push instantly
      setMessages((prev) => [...prev, data]);

      setText("");

    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Auto Scroll ----------------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <IonPage>

      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Chat Body */}
      <IonContent className="p-3">

        <div className="flex flex-col gap-2">

          {messages.map((msg, i) => {

            const isOwn = msg.is_sender; // adjust if needed

            return (
              <div
                key={i}
                className={`max-w-[75%] p-2 rounded-lg text-sm ${
                  isOwn
                    ? "bg-green-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.message}
              </div>
            );
          })}

          <div ref={bottomRef} />

        </div>

      </IonContent>

      {/* Input */}
      <div className="p-2 flex gap-2 border-t">

        <IonInput
          value={text}
          placeholder="Type message..."
          onIonInput={(e: any) => setText(e.target.value)}
        />

        <IonButton onClick={sendMessage}>
          Send
        </IonButton>

      </div>

    </IonPage>
  );
}