
// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
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

// import { closeOutline, attachOutline, sendOutline } from "ionicons/icons";

// import {
//   FaHome,
//   FaUser,
//   FaComment,
//   FaUsers,
//   FaCog,
//   FaSignOutAlt,
//   FaCalendarAlt,
//   FaHeadset
// } from "react-icons/fa";

// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router";
// import { useHistory } from "react-router-dom";

// import Logo from "../../assets/logo.jpg";

// const API_BASE = "http://192.168.0.187:9830";

// export default function HelperChat() {
//   const { booking_id, receiver_account_id }: any = useParams(); // ✅ seeker id আসবে এখানে
//   const token = localStorage.getItem("access_token");
//   const registrationId = localStorage.getItem("registration_id");
//   const history = useHistory();

//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [filePreview, setFilePreview] = useState<string | null>(null);

//   const [seeker, setSeeker] = useState({
//     name: "User",
//     profile_picture: "https://i.pravatar.cc/150"
//   });

//   const [loading, setLoading] = useState(false);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   // ✅ FETCH SEEKER DETAILS (MAIN FIX)
//   useEffect(() => {
//     if (receiver_account_id) {
//       fetchSeekerDetails();
//     }
//   }, [receiver_account_id]);

//   const fetchSeekerDetails = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         `${API_BASE}/seeker/seeker-details/${receiver_account_id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       const result = await res.json();

//       if (res.ok) {
//         setSeeker({
//           name: result?.profile?.name || "User",
//           profile_picture:
//             result?.account_info?.profile_picture ||
//             "https://i.pravatar.cc/150"
//         });
//       }
//     } catch (err) {
//       console.log("Seeker fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ FETCH MESSAGES
//   const fetchMessages = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
//         headers: { Authorization: `Bearer ${token}` }
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

//   useEffect(() => {
//     fetchMessages();
//   }, [booking_id]);

//   // ✅ WEBSOCKET
//   useEffect(() => {
//     if (!booking_id || !receiver_account_id) return;

//     const ws = new WebSocket(
//       `ws://0.0.0.0:9830/chat/stream/${booking_id}/${receiver_account_id}`
//     );

//     ws.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       setMessages((prev) => [...prev, msg]);
//     };

//     return () => ws.close();
//   }, [booking_id, receiver_account_id]);

//   // ✅ SEND MESSAGE
//   const sendMessage = async () => {
//     if (!text.trim() && !file) return;

//     const formData = new FormData();
//     formData.append("receiver_account_id", receiver_account_id);

//     if (text) formData.append("message", text);
//     if (file) formData.append("file", file);

//     setText("");
//     setFile(null);
//     setFilePreview(null);

//     try {
//       await fetch(`${API_BASE}/chat/send/${booking_id}`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const formatDate = (ts: string) =>
//     new Date(ts).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit"
//     });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0] || null;
//     setFile(f);

//     if (f && f.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = () => setFilePreview(reader.result as string);
//       reader.readAsDataURL(f);
//     }
//   };

//   return (
//     <IonPage>

//       {/* HEADER */}
//       <IonHeader>
//         <IonToolbar className="bg-linear-to-r from-yellow-400 via-red-400 to-pink-500 px-4 py-3">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center gap-3">
//               <img
//                 src={Logo}
//                 className="w-10 h-10 rounded-full border-2 border-white"
//               />
//               <p className="text-white font-semibold">Helper Chat</p>
//             </div>
//           </div>
//         </IonToolbar>
//       </IonHeader>

//       {/* ✅ SEEKER HEADER */}
//       {loading ? (
//         <div className="flex justify-center py-2 bg-indigo-500">
//           <IonSpinner color="light" />
//         </div>
//       ) : (
//         <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3 shadow-md">
//           <IonAvatar className="w-10 h-10 border-2 border-white shadow-md">
//             <img
//               src={seeker.profile_picture}
//               className="w-full h-full object-cover rounded-full"
//             />
//           </IonAvatar>

//           <div>
//             <h2 className="text-white font-semibold text-lg">
//               {seeker.name}
//             </h2>
//             <span className="text-green-300 text-xs">Online</span>
//           </div>
//         </div>
//       )}

//       {/* CHAT */}
//       <IonContent className="p-4">
//         {messages.map((msg) => {
//           const isOwn = String(msg.sender_id) === String(registrationId);

//           return (
//             <div
//               key={msg.id}
//               className={`flex ${
//                 isOwn ? "justify-end" : "justify-start"
//               } mb-2`}
//             >
//               <div
//                 className={`p-3 rounded-lg max-w-[70%] ${
//                   isOwn
//                     ? "bg-green-500 text-white"
//                     : "bg-white border"
//                 }`}
//               >
//                 {msg.message && <p>{msg.message}</p>}

//                 {msg.file_url &&
//                   (msg.file_type?.startsWith("image/") ? (
//                     <img
//                       src={
//                         msg.file_url.startsWith("http")
//                           ? msg.file_url
//                           : `${API_BASE}${msg.file_url}`
//                       }
//                       className="w-20 h-24 mt-2 rounded"
//                     />
//                   ) : (
//                     <a
//                       href={`${API_BASE}${msg.file_url}`}
//                       target="_blank"
//                       className="text-blue-500"
//                     >
//                       View File
//                     </a>
//                   ))}

//                 <div className="text-xs text-right mt-1 opacity-60">
//                   {formatDate(msg.timestamp)}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </IonContent>

//       {/* INPUT */}
//       <div className="p-2 flex gap-2 border-t">
//         <input type="file" onChange={handleFileChange} />

//         <IonInput
//           value={text}
//           placeholder="Type message..."
//           onIonInput={(e: any) => setText(e.target.value)}
//         />

//         <IonButton onClick={sendMessage}>
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
//   IonIcon,
//   IonMenu,
//   IonTitle,
//   IonButton,
//   IonItem,
//   IonLabel,
//   IonInput,
//   IonAvatar
// } from "@ionic/react";

// import { closeOutline, attachOutline, sendOutline, ellipsisVerticalOutline } from "ionicons/icons";
// import {
//   FaHome,
//   FaUser,
//   FaComment,
//   FaUsers,
//   FaCog,
//   FaSignOutAlt,
//   FaCalendarAlt,
//   FaHeadset
// } from "react-icons/fa";

// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import Logo from "../../assets/logo.jpg";

// const API_BASE = "http://192.168.0.187:9830";

// export default function HelperChat() {
//   const { booking_id, receiver_account_id }: any = useParams();
//   const token = localStorage.getItem("access_token");
//   const registrationId = localStorage.getItem("registration_id");
//   const history = useHistory();

//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [filePreview, setFilePreview] = useState<string | null>(null);

//   const [helper, setHelper] = useState({
//     name: "Helper",
//     profile_picture: "https://i.pravatar.cc/150?img=22",
//   });

//   const [profileImage] = useState("https://i.pravatar.cc/150?img=33");

//   const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
//   const [popoverOpenId, setPopoverOpenId] = useState<string | null>(null);

//   const bottomRef = useRef<HTMLDivElement>(null);

//   // ✅ FETCH CHAT HISTORY
//   const fetchMessages = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
//         headers: { Authorization: `Bearer ${token}` }
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

//   useEffect(() => {
//     fetchMessages();
//   }, [booking_id]);

//   // ✅ WEBSOCKET
//   useEffect(() => {
//     if (!booking_id || !receiver_account_id) return;

//     const ws = new WebSocket(
//       `ws://http://192.168.0.187:9830/chat/stream/${booking_id}/${receiver_account_id}`
//     );

//     ws.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       setMessages((prev) => [...prev, msg]);
//     };

//     return () => ws.close();
//   }, [booking_id, receiver_account_id]);

//   // ✅ SEND / EDIT MESSAGE
//   const sendMessage = async () => {
//     if (!text.trim() && !file) return;

//     // EDIT
//     if (editingMessageId) {
//       try {
//         await axios.patch(
//           `${API_BASE}/chat/messages/${editingMessageId}`,
//           {
//             user_id: registrationId,
//             user_role: "helper",
//             message: text,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setMessages((prev) =>
//           prev.map((m) =>
//             m.id === editingMessageId ? { ...m, message: text } : m
//           )
//         );

//         setEditingMessageId(null);
//         setText("");
//         return;
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     // TEMP MESSAGE (RIGHT SIDE instantly)
//     const tempId = `temp-${Date.now()}`;
//     const tempMsg = {
//       id: tempId,
//       sender_id: registrationId,
//       message: text,
//       file_url: filePreview,
//       file_type: file?.type,
//       timestamp: new Date().toISOString(),
//     };

//     setMessages((prev) => [...prev, tempMsg]);
//     setText("");
//     setFile(null);
//     setFilePreview(null);

//     try {
//       const formData = new FormData();
//       formData.append("receiver_account_id", receiver_account_id);
//       if (text) formData.append("message", text);
//       if (file) formData.append("file", file);

//       const res = await fetch(`${API_BASE}/chat/send/${booking_id}`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.message) {
//         setMessages((prev) =>
//           prev.map((m) => (m.id === tempId ? data.message : m))
//         );
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ✅ DELETE
//   const deleteMessage = async (id: string) => {
//     try {
//       await axios.delete(`${API_BASE}/chat/messages/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMessages((prev) => prev.filter((m) => m.id !== id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ✅ SCROLL
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const formatTime = (ts: string) =>
//     new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   // ✅ FILE
//   const handleFileChange = (e: any) => {
//     const f = e.target.files?.[0];
//     setFile(f);

//     if (f && f.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = () => setFilePreview(reader.result as string);
//       reader.readAsDataURL(f);
//     }
//   };

//   return (
//     <IonPage>

//       {/* HEADER */}
//       <IonHeader>
//         <IonToolbar className="bg-indigo-600 text-white px-4">
//           <IonTitle>Helper Chat</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       {/* CHAT */}
//       <IonContent className="p-4">
//         {messages.map((msg) => {
//           const isOwn = String(msg.sender_id) === String(registrationId);

//           return (
//             <div
//               key={msg.id}
//               className={`flex mb-3 ${isOwn ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[70%] px-4 py-2 rounded-2xl ${
//                   isOwn
//                     ? "bg-green-500 text-white rounded-br-none"
//                     : "bg-gray-200 text-black rounded-bl-none"
//                 }`}
//               >
//                 {msg.message}

//                 {msg.file_url && (
//                   <img
//                     src={
//                       msg.file_url.startsWith("http")
//                         ? msg.file_url
//                         : `${API_BASE}${msg.file_url}`
//                     }
//                     className="mt-2 w-24 rounded"
//                   />
//                 )}

//                 <div className="text-xs text-right mt-1 opacity-70">
//                   {formatTime(msg.timestamp)}
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         <div ref={bottomRef} />
//       </IonContent>

//       {/* INPUT */}
//       <div className="p-3 flex gap-2 border-t">
//         <input type="file" hidden id="file" onChange={handleFileChange} />

//         <IonButton onClick={() => document.getElementById("file")?.click()}>
//           <IonIcon icon={attachOutline} />
//         </IonButton>

//         <IonInput
//           value={text}
//           onIonInput={(e: any) => setText(e.target.value)}
//           placeholder="Type message..."
//         />

//         <IonButton onClick={sendMessage}>
//           <IonIcon icon={sendOutline} />
//         </IonButton>
//       </div>
//     </IonPage>
//   );
// }

// import {
//   IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonIcon,
//   IonInput, IonAvatar, IonTitle
// } from "@ionic/react";

// import { attachOutline, sendOutline, ellipsisVerticalOutline } from "ionicons/icons";
// import { useEffect, useState, useRef } from "react";
// import { useParams, useHistory } from "react-router-dom";

// const API_BASE = "http://192.168.0.187:9830";

// export default function HelperBookingwiseChat() {
//   const { booking_id, receiver_account_id }: any = useParams();
//   const [registrationId, setRegistrationId] = useState<string | null>(null);
//   const [profileImage, setProfileImage] = useState<string>("https://i.pravatar.cc/150?img=33");
//   const [name, setName] = useState("User");
//   const [seeker, setSeeker] = useState({ name: "Seeker", profile_picture: "https://i.pravatar.cc/150?img=22" });
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [filePreview, setFilePreview] = useState<string | null>(null);
//   const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
//   const [popoverOpenId, setPopoverOpenId] = useState<string | null>(null);

//   const bottomRef = useRef<HTMLDivElement>(null);
//   const token = localStorage.getItem("access_token");
//   const history = useHistory();

//   // ---------------- Fetch helper profile ----------------
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/profiles/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setName(data.profile?.name || "User");

//           const regId = data.registration_id || data.account_id || null;
//           setRegistrationId(regId);
//           console.log("Helper Registration ID:", regId);

//           // Fetch helper base64 profile image
//           const imgRes = await fetch(`${API_BASE}/profiles/picture/base64`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           const imgData = await imgRes.json();
//           if (imgRes.ok && imgData?.image_base64) {
//             setProfileImage(`data:image/jpeg;base64,${imgData.image_base64}`);
//           }
//         }
//       } catch (err) {
//         console.log("Profile fetch error:", err);
//       }
//     };
//     if (token) fetchProfile();
//   }, [token]);

//   // ---------------- Fetch seeker info ----------------
//   useEffect(() => {
//     const fetchSeeker = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/seeker/seeker-details/${receiver_account_id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           let img = data.account_info?.profile_picture || "https://i.pravatar.cc/150?img=22";
//           if (data.account_info?.image_base64) {
//             img = `data:image/jpeg;base64,${data.account_info.image_base64}`;
//           }
//           setSeeker({ name: data.profile?.name || "Seeker", profile_picture: img });
//         }
//       } catch (err) {
//         console.log("Seeker fetch error:", err);
//       }
//     };
//     if (receiver_account_id) fetchSeeker();
//   }, [receiver_account_id, token]);

//   // ---------------- Fetch chat messages ----------------
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         setMessages((data.history || []).sort(
//           (a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//         ));
//       } catch (err) {
//         console.log("Fetch messages error:", err);
//       }
//     };
//     if (booking_id) fetchMessages();
//   }, [booking_id, token]);

//   // ---------------- WebSocket ----------------
//   useEffect(() => {
//     if (!booking_id || !receiver_account_id) return;
//     const ws = new WebSocket(`ws://192.168.0.187:9830/chat/stream/${booking_id}/${receiver_account_id}`);
//     ws.onmessage = (e) => {
//       try {
//         const msg = JSON.parse(e.data);
//         setMessages(prev => [...prev, msg]);
//       } catch {}
//     };
//     ws.onclose = () => console.log("WebSocket closed");
//     return () => ws.close();
//   }, [booking_id, receiver_account_id]);

//   // ---------------- Send or edit message ----------------
//   const sendMessage = async () => {
//     if (!text.trim() && !file) return;

//     // Editing existing message
//     if (editingMessageId) {
//       try {
//         const res = await fetch(`${API_BASE}/chat/messages/${editingMessageId}`, {
//           method: "PATCH",
//           headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//           body: JSON.stringify({ user_id: registrationId, message: text, user_role: "user" }),
//         });
//         if (res.ok) {
//           setMessages(prev => prev.map(m => m.id === editingMessageId ? { ...m, message: text } : m));
//           setEditingMessageId(null);
//           setText("");
//         }
//       } catch (err) { console.log("Edit error:", err); }
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
//     setMessages(prev => [...prev, tempMessage]);
//     setText(""); setFile(null); setFilePreview(null);

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
//       if (data.message) setMessages(prev => prev.map(m => m.id === tempId ? { ...data.message } : m));
//     } catch (err) { console.log(err); }
//   };

//   const deleteMessage = async (msgId: string) => {
//     try {
//       const res = await fetch(`${API_BASE}/chat/messages/${msgId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) setMessages(prev => prev.filter(m => m.id !== msgId));
//     } catch (err) { console.log("Delete error:", err); }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0] || null;
//     setFile(f);
//     if (f && f.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = () => setFilePreview(reader.result as string);
//       reader.readAsDataURL(f);
//     } else setFilePreview(null);
//   };

//   const formatDate = (ts: string) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>{name}</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="p-4 flex flex-col gap-3">
//         {messages.map(msg => {
//           const isOwn = String(msg.sender_id) === String(registrationId);
//           return (
//             <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"} gap-2 items-end`}>
//               {!isOwn && <IonAvatar><img src={seeker.profile_picture} alt={seeker.name} /></IonAvatar>}

//               <div className="relative max-w-[70%]">
//                 <div className={`p-2 rounded-xl ${isOwn ? "bg-green-500 text-white" : "bg-gray-200"}`}>
//                   <div className="text-xs opacity-70">{isOwn ? "You" : seeker.name}</div>
//                   {msg.message && <div>{msg.message}</div>}
//                   {msg.file_url && <img src={msg.file_url.startsWith("http") ? msg.file_url : `${API_BASE}${msg.file_url}`} alt="file" className="w-24 h-24 object-cover mt-1" />}
//                   <div className="text-[10px] text-right opacity-50">{formatDate(msg.timestamp)}</div>
//                 </div>

//                 {isOwn && (
//                   <IonButton
//                     fill="clear"
//                     className="absolute top-0 right-0 p-0 text-gray-500"
//                     onClick={() => setPopoverOpenId(popoverOpenId === msg.id ? null : msg.id)}
//                   >
//                     <IonIcon icon={ellipsisVerticalOutline} />
//                   </IonButton>
//                 )}

//                 {popoverOpenId === msg.id && (
//                   <div className="absolute top-6 right-0 bg-white shadow-lg rounded-lg z-50 w-24 border">
//                     <button
//                       className="w-full px-2 py-1 text-left text-sm hover:bg-gray-100"
//                       onClick={() => { setEditingMessageId(msg.id); setText(msg.message); setPopoverOpenId(null); }}
//                     >Edit</button>
//                     <button
//                       className="w-full px-2 py-1 text-left text-sm text-red-500 hover:bg-gray-100"
//                       onClick={() => deleteMessage(msg.id)}
//                     >Delete</button>
//                   </div>
//                 )}
//               </div>

//               {isOwn && <IonAvatar><img src={profileImage} alt="You" /></IonAvatar>}
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </IonContent>

//       {/* INPUT */}
//       <div className="flex items-center gap-2 p-2 border-t">
//         <input type="file" hidden id="fileInput" onChange={handleFileChange} />
//         <IonButton onClick={() => document.getElementById("fileInput")?.click()}><IonIcon icon={attachOutline} /></IonButton>
//         {filePreview && <img src={filePreview} alt="preview" className="w-16 h-16 object-cover" />}
//         <IonInput value={text} placeholder="Type message..." onIonInput={(e: any) => setText(e.target.value)} />
//         <IonButton onClick={sendMessage}><IonIcon icon={sendOutline} /></IonButton>
//       </div>
//     </IonPage>
//   );
// }

import {
  IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonIcon,
  IonInput, IonAvatar, IonTitle
} from "@ionic/react";

import { attachOutline, sendOutline, ellipsisVerticalOutline } from "ionicons/icons";
import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

const API_BASE = "http://192.168.0.187:9830";

export default function HelperBookingwiseChat() {
  const { booking_id, receiver_account_id }: any = useParams();
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>("https://i.pravatar.cc/150?img=33");
  const [name, setName] = useState("User");
  const [seeker, setSeeker] = useState({ name: "Seeker", profile_picture: "https://i.pravatar.cc/150?img=22" });
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [popoverOpenId, setPopoverOpenId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("access_token");
  const history = useHistory();

  // ---------------- Fetch helper profile + base64 image ----------------
  useEffect(() => {
    const fetchHelperProfileAndImage = async () => {
      try {
        if (!token) return;

        const profileRes = await fetch(`${API_BASE}/profiles/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profileData = await profileRes.json();

        if (profileRes.ok) {
          const regId = profileData.registration_id || profileData.profile?.registration;
          setRegistrationId(regId);
          console.log("Helper Registration ID:", regId);

          setName(profileData.profile?.name || "User");

          // Fetch base64 profile image
          const imageRes = await fetch(`${API_BASE}/profiles/picture/base64`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const imageData = await imageRes.json();
          if (imageRes.ok && imageData?.image_base64) {
            setProfileImage(`data:image/jpeg;base64,${imageData.image_base64}`);
          }
        }
      } catch (err) {
        console.log("Helper profile/image fetch error:", err);
      }
    };
    fetchHelperProfileAndImage();
  }, [token]);

  // ---------------- Fetch seeker info ----------------
  useEffect(() => {
    const fetchSeeker = async () => {
      try {
        const res = await fetch(`${API_BASE}/seeker/seeker-details/${receiver_account_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          let img = data.account_info?.profile_picture || "https://i.pravatar.cc/150?img=22";
          if (data.account_info?.image_base64) {
            img = `data:image/jpeg;base64,${data.account_info.image_base64}`;
          }
          setSeeker({ name: data.profile?.name || "Seeker", profile_picture: img });
        }
      } catch (err) {
        console.log("Seeker fetch error:", err);
      }
    };
    if (receiver_account_id) fetchSeeker();
  }, [receiver_account_id, token]);

  // ---------------- Fetch chat messages ----------------
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMessages((data.history || []).sort(
          (a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        ));
      } catch (err) {
        console.log("Fetch messages error:", err);
      }
    };
    if (booking_id) fetchMessages();
  }, [booking_id, token]);

  // ---------------- WebSocket ----------------
  useEffect(() => {
    if (!booking_id || !receiver_account_id) return;
    const ws = new WebSocket(`ws://192.168.0.187:9830/chat/stream/${booking_id}/${receiver_account_id}`);
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        setMessages(prev => [...prev, msg]);
      } catch {}
    };
    ws.onclose = () => console.log("WebSocket closed");
    return () => ws.close();
  }, [booking_id, receiver_account_id]);

  // ---------------- Send or edit message ----------------
  const sendMessage = async () => {
    if (!text.trim() && !file) return;

    if (editingMessageId) {
      try {
        const res = await fetch(`${API_BASE}/chat/messages/${editingMessageId}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: registrationId, message: text, user_role: "user" }),
        });
        if (res.ok) {
          setMessages(prev => prev.map(m => m.id === editingMessageId ? { ...m, message: text } : m));
          setEditingMessageId(null);
          setText("");
        }
      } catch (err) { console.log("Edit error:", err); }
      return;
    }

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
      isSending: true,
    };
    setMessages(prev => [...prev, tempMessage]);
    setText(""); setFile(null); setFilePreview(null);

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
      if (data.message) setMessages(prev => prev.map(m => m.id === tempId ? { ...data.message } : m));
    } catch (err) { console.log(err); }
  };

  const deleteMessage = async (msgId: string) => {
    try {
      const res = await fetch(`${API_BASE}/chat/messages/${msgId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setMessages(prev => prev.filter(m => m.id !== msgId));
    } catch (err) { console.log("Delete error:", err); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f && f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(f);
    } else setFilePreview(null);
  };

  const formatDate = (ts: string) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 flex flex-col gap-3">
        {messages.map(msg => {
          const isOwn = String(msg.sender_id) === String(registrationId);
          return (
            <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"} gap-2 items-end`}>
              {!isOwn && <IonAvatar><img src={seeker.profile_picture} alt={seeker.name} /></IonAvatar>}

              <div className="relative max-w-[70%]">
                <div className={`p-2 rounded-xl ${isOwn ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                  <div className="text-xs opacity-70">{isOwn ? "You" : seeker.name}</div>
                  {msg.message && <div>{msg.message}</div>}
                  {msg.file_url && <img src={msg.file_url.startsWith("http") ? msg.file_url : `${API_BASE}${msg.file_url}`} alt="file" className="w-24 h-24 object-cover mt-1" />}
                  <div className="text-[10px] text-right opacity-50">{formatDate(msg.timestamp)}</div>
                </div>

                {isOwn && (
                  <IonButton
                    fill="clear"
                    className="absolute top-0 right-0 p-0 text-gray-500"
                    onClick={() => setPopoverOpenId(popoverOpenId === msg.id ? null : msg.id)}
                  >
                    <IonIcon icon={ellipsisVerticalOutline} />
                  </IonButton>
                )}

                {popoverOpenId === msg.id && (
                  <div className="absolute top-6 right-0 bg-white shadow-lg rounded-lg z-50 w-24 border">
                    <button
                      className="w-full px-2 py-1 text-left text-sm hover:bg-gray-100"
                      onClick={() => { setEditingMessageId(msg.id); setText(msg.message); setPopoverOpenId(null); }}
                    >Edit</button>
                    <button
                      className="w-full px-2 py-1 text-left text-sm text-red-500 hover:bg-gray-100"
                      onClick={() => deleteMessage(msg.id)}
                    >Delete</button>
                  </div>
                )}
              </div>

              {isOwn && <IonAvatar><img src={profileImage} alt="You" /></IonAvatar>}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </IonContent>

      <div className="flex items-center gap-2 p-2 border-t">
        <input type="file" hidden id="fileInput" onChange={handleFileChange} />
        <IonButton onClick={() => document.getElementById("fileInput")?.click()}><IonIcon icon={attachOutline} /></IonButton>
        {filePreview && <img src={filePreview} alt="preview" className="w-16 h-16 object-cover" />}
        <IonInput value={text} placeholder="Type message..." onIonInput={(e: any) => setText(e.target.value)} />
        <IonButton onClick={sendMessage}><IonIcon icon={sendOutline} /></IonButton>
      </div>
    </IonPage>
  );
}