

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
// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router";
// import { attachOutline, sendOutline, ellipsisVerticalOutline } from "ionicons/icons";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// import Logo from "../../assets/logo.jpg";
// const API_BASE = "http://192.168.0.187:9830";

// export default function HelperChat() {
//   const { booking_id, receiver_account_id }: any = useParams();
//   const token = localStorage.getItem("access_token");
//   const registrationId = localStorage.getItem("registration_id");
// const history = useHistory();
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [filePreview, setFilePreview] = useState<string | null>(null);
//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");
//   const [area, setArea] = useState("");
//   const [helper, setHelper] = useState({
//     name: "Helper",
//     profile_picture: "https://i.pravatar.cc/150?img=22",
//   });
//   const [profileImage, setProfileImage] = useState(
//     "https://i.pravatar.cc/150?img=33"
//   );

//   const bottomRef = useRef<HTMLDivElement>(null);
//   const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
//   const [popoverOpenId, setPopoverOpenId] = useState<string | null>(null);

//   // ---------------- Fetch helper info ----------------
//   useEffect(() => {
//     const fetchHelper = async () => {
//       try {
//         const res = await fetch(
//           `${API_BASE}/helper/helper-details/${receiver_account_id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const data = await res.json();
//         if (res.ok) {
//           setHelper({
//             name: data.profile?.name || "Helper",
//             profile_picture:
//               data.account_info?.profile_picture ||
//               "https://i.pravatar.cc/150?img=22",
//           });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchHelper();
//   }, [receiver_account_id, token]);

//   // ---------------- Fetch your profile image ----------------
//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/profiles/picture/base64`, {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok && data?.image_base64) setProfileImage(data.image_base64);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchProfileImage();
//   }, [token]);

//   // ---------------- Fetch chat history ----------------
//   const fetchMessages = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setMessages(
//         (data.history || []).sort(
//           (a: any, b: any) =>
//             new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//         )
//       );
//     } catch (err) {
//       console.log(err);
//     }
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

//   useEffect(() => {
//     fetchMessages();
//   }, [booking_id, token]);
// useEffect(() => {
   
//     fetchProfile();
//   }, []);
//   // ---------------- WebSocket for real-time updates ----------------
//   useEffect(() => {
//     if (!booking_id || !receiver_account_id) return;
//     const ws = new WebSocket(
//       `ws://192.168.0.187:9830/chat/stream/${booking_id}/${receiver_account_id}`
//     );
//     ws.onmessage = (event) => {
//       try {
//         const msg = JSON.parse(event.data);
//         setMessages((prev) => [...prev, msg]);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     ws.onclose = () => console.log("WebSocket closed");
//     return () => ws.close();
//   }, [booking_id, receiver_account_id]);

//   // ---------------- Send or Edit message ----------------
//   const sendMessage = async () => {
//     if (!text.trim() && !file) return;

//     // Editing existing message
//     if (editingMessageId) {
//       try {
//         const res = await axios.patch(
//           `${API_BASE}/chat/messages/${editingMessageId}`,
//           {
//             user_id: registrationId,
//             user_role: "user",
//             message: text, // field required by API
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (res.status === 200) {
//           setMessages((prev) =>
//             prev.map((m) =>
//               m.id === editingMessageId ? { ...m, message: text } : m
//             )
//           );
//           setEditingMessageId(null);
//           setText("");
//         }
//       } catch (err) {
//         console.log("Edit error:", err);
//       }
//       return;
//     }

//     // Sending new message
//     const tempId = `temp-${Date.now()}`;
//     const tempMessage = {
//       id: tempId,
//       sender_id: registrationId,
//       receiver_id: receiver_account_id,
//       message: text,
//       file_url: filePreview || "",
//       file_name: file?.name,
//       file_type: file?.type,
//       timestamp: new Date().toISOString(),
//       isSending: true,
//     };
//     setMessages((prev) => [...prev, tempMessage]);
//     setText("");
//     setFile(null);
//     setFilePreview(null);

//     try {
//       const formData = new FormData();
//       formData.append("receiver_account_id", receiver_account_id);
//       if (tempMessage.message) formData.append("message", tempMessage.message);
//       if (file) formData.append("file", file);

//       const res = await fetch(`${API_BASE}/chat/send/${booking_id}`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.message)
//         setMessages((prev) =>
//           prev.map((m) => (m.id === tempId ? { ...data.message } : m))
//         );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ---------------- Delete message ----------------
//   const deleteMessage = async (msgId: string) => {
//     try {
//       const res = await axios.delete(`${API_BASE}/chat/messages/${msgId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.status === 200)
//         setMessages((prev) => prev.filter((m) => m.id !== msgId));
//     } catch (err) {
//       console.log("Delete error:", err);
//     }
//   };

//   // ---------------- Scroll ----------------
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const formatDate = (ts: string) =>
//     new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   // ---------------- File preview for local upload ----------------
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0] || null;
//     setFile(f);
//     if (f && f.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = () => setFilePreview(reader.result as string);
//       reader.readAsDataURL(f);
//     } else {
//       setFilePreview(null);
//     }
//   };

//   return (
//       <IonPage>
   
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
   
      
//  <div className="flex items-center gap-4 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-3 rounded-b-xl shadow-md">
//   {/* Profile Avatar */}
//   <IonAvatar className="w-10 h-10 border-2 border-white shadow-sm">
//   <img
//     src={helper.profile_picture}
//     alt={helper.name}
//     className="w-full h-full object-cover rounded-full"
//   />
// </IonAvatar>

//   {/* Name and Status */}
//   <div className="flex flex-col justify-center">
//     <IonTitle className="text-white font-semibold text-lg">
//       {helper.name}
//     </IonTitle>
//     <span className="text-green-300 text-sm opacity-80">Online</span>
//   </div>
// </div>


//       {/* CHAT CONTENT */}
//       <IonContent className="p-4 flex flex-col gap-4">
//         {messages.map((msg, index) => {
//           const isOwn = String(msg.sender_id) === String(registrationId);
//           const showDate =
//             index === 0 ||
//             new Date(messages[index - 1].timestamp).toDateString() !==
//               new Date(msg.timestamp).toDateString();
//           const dateLabel =
//             new Date(msg.timestamp).toDateString() === new Date().toDateString()
//               ? "Today"
//               : new Date(msg.timestamp).toLocaleDateString();

//           return (
//             <div key={msg.id} className="mb-3">
//               {showDate && (
//                 <div className="flex justify-center my-2">
//                   <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
//                     {dateLabel}
//                   </span>
//                 </div>
//               )}

//               <div className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}>
//                 {!isOwn && (
//                   <IonAvatar className="w-8 h-8 shadow-sm">
//                     <img
//                       src={helper.profile_picture}
//                       alt={helper.name}
//                       className="object-cover rounded-full"
//                     />
//                   </IonAvatar>
//                 )}

//                 <div className="relative max-w-[70%]">
//                   <div
//                     className={`px-4 py-2 rounded-2xl shadow-md wrap-break-word ${
//                       isOwn
//                         ? "bg-green-500 text-white rounded-br-none"
//                         : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
//                     }`}
//                   >
//                     <div className="text-xs font-semibold mb-1 opacity-70">
//                       {isOwn ? "You" : helper.name}
//                     </div>

//                     {msg.message && <div className="text-sm">{msg.message}</div>}

                    
//               <div className="mt-2 flex flex-wrap gap-2">
//   {msg.file_url ? (
//     msg.file_type?.startsWith("image/") ? (
//       <img
//         src={msg.file_url.startsWith("http") ? msg.file_url : `${API_BASE}${msg.file_url}`}
//         alt={msg.file_name ?? "attachment"}
//         className="rounded-md object-cover w-20 h-24 cursor-pointer hover:scale-105 transition-transform border"
//         onClick={() =>
//           window.open(msg.file_url?.startsWith("http") ? msg.file_url : `${API_BASE}${msg.file_url}`)
//         }
//       />
//     ) : (
//       <a
//         href={msg.file_url.startsWith("http") ? msg.file_url : `${API_BASE}${msg.file_url}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-600 underline text-sm"
//       >
//         {msg.file_name ?? "View Attachment"}
//       </a>
//     )
//   ) : null}
// </div>

//                     <div className="text-[10px] mt-1 text-right opacity-60">
//                       {formatDate(msg.timestamp)}
//                     </div>
//                   </div>

//                   {/* 3-dot menu for own messages */}
//                   {isOwn && (
//                     <IonButton
//                       fill="clear"
//                       className="absolute top-1 right-1 text-gray-500 p-0 hover:text-gray-700"
//                       onClick={() =>
//                         setPopoverOpenId(popoverOpenId === msg.id ? null : msg.id)
//                       }
//                     >
//                       <IonIcon icon={ellipsisVerticalOutline} />
//                     </IonButton>
//                   )}

//                   {popoverOpenId === msg.id && (
//                     <div className="absolute top-7 right-0 bg-white shadow-lg rounded-lg z-50 w-28 border border-gray-200">
//                       <button
//                         className="w-full px-3 py-1 text-left text-sm hover:bg-gray-100"
//                         onClick={() => {
//                           setEditingMessageId(msg.id);
//                           setText(msg.message);
//                           setPopoverOpenId(null);
//                         }}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="w-full px-3 py-1 text-left text-sm text-red-500 hover:bg-gray-100"
//                         onClick={() => deleteMessage(msg.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {isOwn && profileImage && (
//                   <IonAvatar className="w-8 h-8 shadow-sm">
//                     <img
//                       src={profileImage}
//                       alt="You"
//                       className="object-cover rounded-full"
//                     />
//                   </IonAvatar>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </IonContent>

//       {/* INPUT */}
//       <div className="p-3 flex items-center gap-2 border-t bg-white">
//         <input
//           type="file"
//           id="fileInput"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//         <IonButton
//           fill="clear"
//           className="bg-gray-200 rounded-full p-2"
//           onClick={() => document.getElementById("fileInput")?.click()}
//         >
//           <IonIcon icon={attachOutline} />
//         </IonButton>

//         {filePreview && (
//           <img
//             src={filePreview}
//             alt="preview"
//             className="h-16 w-16 object-contain rounded"
//           />
//         )}

//         <IonInput
//           value={text}
//           placeholder="Type message..."
//           onIonInput={(e: any) => setText(e.target.value)}
//           className="flex-1 bg-gray-100 rounded-full px-4"
//         />

//         <IonButton
//           onClick={sendMessage}
//           className="bg-green-500 text-white rounded-full px-4"
//         >
//           <IonIcon icon={sendOutline} />
//         </IonButton>
//       </div>
//     </IonPage>
//   );
// }

// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonContent,
//   IonButton,
//   IonIcon,
//   IonInput,
//   IonAvatar,
//   IonTitle
// } from "@ionic/react";

// import { attachOutline, sendOutline, ellipsisVerticalOutline } from "ionicons/icons";
// import { useEffect, useState, useRef } from "react";
// import { useParams, useHistory } from "react-router-dom";

// const API_BASE = "http://192.168.0.187:9830";

// export default function HelperChat() {
//   const { booking_id, receiver_account_id }: any = useParams();

//   const [registrationId, setRegistrationId] = useState<string | null>(null);
//   const [profileImage, setProfileImage] = useState<string>("https://i.pravatar.cc/150?img=33");
//   const [helper, setHelper] = useState({
//     name: "Helper",
//     profile_picture: "https://i.pravatar.cc/150?img=22",
//   });

//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");

//   const bottomRef = useRef<HTMLDivElement>(null);
//   const token = localStorage.getItem("access_token");

//   // ✅ FETCH PROFILE + REGISTRATION ID + BASE64 IMAGE
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (!token) return;

//         const res = await fetch(`${API_BASE}/profiles/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = await res.json();

//         const regId =
//           data.registration_id ||
//           data.profile?.registration ||
//           localStorage.getItem("registration_id");

//         setRegistrationId(regId);

//         console.log("✅ Registration ID:", regId);

//         // 👉 FIX BASE64 IMAGE
//         const imgRes = await fetch(`${API_BASE}/profiles/picture/base64`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const imgData = await imgRes.json();

//         if (imgData?.image_base64) {
//           setProfileImage(`data:image/jpeg;base64,${imgData.image_base64}`);
//         }
//       } catch (err) {
//         console.log("Profile error:", err);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   // ✅ FETCH OTHER USER (LEFT SIDE)
//   useEffect(() => {
//     const fetchHelper = async () => {
//       try {
//         const res = await fetch(
//           `${API_BASE}/helper/helper-details/${receiver_account_id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const data = await res.json();

//         let img = data.account_info?.profile_picture;

//         if (data.account_info?.image_base64) {
//           img = `data:image/jpeg;base64,${data.account_info.image_base64}`;
//         }

//         setHelper({
//           name: data.profile?.name || "Helper",
//           profile_picture: img || "https://i.pravatar.cc/150?img=22",
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (receiver_account_id) fetchHelper();
//   }, [receiver_account_id, token]);

//   // ✅ FETCH CHAT HISTORY
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = await res.json();

//         setMessages(
//           (data.history || []).sort(
//             (a: any, b: any) =>
//               new Date(a.timestamp).getTime() -
//               new Date(b.timestamp).getTime()
//           )
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (booking_id) fetchMessages();
//   }, [booking_id, token]);

//   // ✅ WEBSOCKET
//   useEffect(() => {
//     if (!booking_id || !receiver_account_id) return;

//     const ws = new WebSocket(
//       `ws://192.168.0.187:9830/chat/stream/${booking_id}/${receiver_account_id}`
//     );

//     ws.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       setMessages((prev) => [...prev, msg]);
//     };

//     return () => ws.close();
//   }, [booking_id, receiver_account_id]);

//   // ✅ SEND MESSAGE
//   const sendMessage = async () => {
//     if (!text.trim()) return;

//     const tempMessage = {
//       id: Date.now(),
//       sender_id: registrationId,
//       message: text,
//       timestamp: new Date().toISOString(),
//     };

//     setMessages((prev) => [...prev, tempMessage]);
//     setText("");

//     try {
//       await fetch(`${API_BASE}/chat/send/${booking_id}`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: JSON.stringify({
//           receiver_account_id,
//           message: text,
//         }),
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const formatTime = (ts: string) =>
//     new Date(ts).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Chat</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="p-4">
//         {messages.map((msg) => {
//           // 🔥 MAIN LOGIC FIX
//           const isOwn =
//             String(msg.sender_id) === String(registrationId);

//           return (
//             <div
//               key={msg.id}
//               className={`flex ${
//                 isOwn ? "justify-end" : "justify-start"
//               } mb-2`}
//             >
//               {/* LEFT AVATAR */}
//               {!isOwn && (
//                 <IonAvatar>
//                   <img src={helper.profile_picture} />
//                 </IonAvatar>
//               )}

//               {/* MESSAGE */}
//               <div
//                 className={`px-3 py-2 rounded-lg max-w-[70%] ${
//                   isOwn
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 <div>{msg.message}</div>
//                 <div className="text-xs text-right">
//                   {formatTime(msg.timestamp)}
//                 </div>
//               </div>

//               {/* RIGHT AVATAR */}
//               {isOwn && (
//                 <IonAvatar>
//                   <img src={profileImage} />
//                 </IonAvatar>
//               )}
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </IonContent>

//       {/* INPUT */}
//       <div className="flex p-2 border-t">
//         <IonInput
//           value={text}
//           onIonInput={(e: any) => setText(e.target.value)}
//           placeholder="Type message"
//         />
//         <IonButton onClick={sendMessage}>
//           <IonIcon icon={sendOutline} />
//         </IonButton>
//       </div>
//     </IonPage>
//   );
// }

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

  // ================= SEND =================
  const sendMessage = async () => {
    if (!text.trim() && !file) return;

    const tempMessage = {
      id: Date.now(),
      sender_id: registrationId,
      message: text,
      file_url: filePreview || "",
      file_type: file?.type,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);

    const formData = new FormData();
    formData.append("receiver_account_id", receiver_account_id);
    if (text) formData.append("message", text);
    if (file) formData.append("file", file);

    setText("");
    setFile(null);
    setFilePreview(null);

    await fetch(`${API_BASE}/chat/send/${booking_id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
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
      {/* <div className="flex items-center gap-3 p-3 border-b bg-gray-100">
        <IonAvatar>
          <img
            src={otherUser.profile_picture}
            onError={(e: any) =>
              (e.target.src = "https://i.pravatar.cc/150?img=22")
            }
          />
        </IonAvatar> */}
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
              {/* LEFT */}
              {!isOwn && (
                <IonAvatar  className="w-10 h-8">
                  <img
                    src={otherUser.profile_picture}
                    onError={(e: any) =>
                      (e.target.src =
                        "https://i.pravatar.cc/150?img=22")
                    }
                  />
                </IonAvatar>
              )}

              {/* MESSAGE */}
              <div
                className={`p-2 rounded-lg max-w-[70%] ${
                  isOwn
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.message && <div>{msg.message}</div>}

                {/* IMAGE ATTACHMENT */}
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

              {/* RIGHT */}
              {isOwn && (
                <IonAvatar className="w-10 h-10">
                  <img
                    src={profileImage}
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