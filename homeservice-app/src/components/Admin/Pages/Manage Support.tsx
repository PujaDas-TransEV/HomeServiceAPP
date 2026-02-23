// import React, { useEffect, useMemo, useState } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonButton,
//   IonIcon,
//   IonModal,
//   IonSpinner,
//   IonMenu,
//   IonMenuToggle,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonButtons,
// } from "@ionic/react";
// import {
//   menuOutline,
//   eyeOutline,
//   closeOutline,
//   searchOutline,
//   banOutline,
//   personCircleOutline,
//   homeOutline,
//   peopleOutline,
//   settingsOutline,
//   logOutOutline,
//   chatbubblesOutline,
// } from "ionicons/icons";

// import backgroundImg from "../../assets/support.webp";
// import logoImg from "../../assets/logo.jpg";
// interface Complaint {
//   id: string;
//   user_name: string;
//   user_phone: string;
//   complaint_text: string;
//   status: "pending" | "resolved" | "blocked";
// }

// const AdminComplaints: React.FC = () => {
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState<"all" | "pending" | "resolved" | "blocked">("all");
//   const [searchId, setSearchId] = useState("");
//   const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
//   const [showModal, setShowModal] = useState(false);
//  const redirect = (path: string) => {
//     window.location.href = path;
//   };
//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setComplaints([
//         {
//           id: "CMP-101",
//           user_name: "John Doe",
//           user_phone: "1234567890",
//           complaint_text: "App crashes while booking.",
//           status: "pending",
//         },
//         {
//           id: "CMP-102",
//           user_name: "Jane Smith",
//           user_phone: "9876543210",
//           complaint_text: "Payment failed issue.",
//           status: "resolved",
//         },
//         {
//           id: "CMP-103",
//           user_name: "Mike Johnson",
//           user_phone: "5556667777",
//           complaint_text: "User abusive behavior.",
//           status: "blocked",
//         },
//       ]);
//       setLoading(false);
//     }, 800);
//   }, []);

//   const handleBlock = (id: string) => {
//     setComplaints(prev =>
//       prev.map(c => (c.id === id ? { ...c, status: "blocked" } : c))
//     );
//   };

//   const filteredComplaints = useMemo(() => {
//     return complaints.filter(c => {
//       const matchFilter = filter === "all" ? true : c.status === filter;
//       const matchSearch = searchId ? c.id.toLowerCase().includes(searchId.toLowerCase()) : true;
//       return matchFilter && matchSearch;
//     });
//   }, [complaints, filter, searchId]);

//    const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     redirect("/login");
//   };

//   return (
   
//       <>
//       {/* SIDE MENU */}
//       <IonMenu side="end" menuId="adminMenu" contentId="adminContent">
//         <IonHeader>
//           <IonToolbar className="bg-indigo-600 text-purple-300 px-4">
//             <div className="flex justify-between items-center w-full">
//               <IonTitle>Admin Panel</IonTitle>
//               <IonButton fill="clear" onClick={() =>
//                 (window as any).document.querySelector("ion-menu")?.close()
//               }>
//                 <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
//               </IonButton>
//             </div>
//           </IonToolbar>
//         </IonHeader>

//        <IonContent className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
//            <div className="p-4 space-y-3">
       
//              {/* Profile */}
//              <IonMenuToggle autoHide>
//                <div
//                  onClick={() => redirect("/admin-profile")}
//                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//                >
//                  <IonIcon icon={personCircleOutline} className="text-purple-400 text-xl" />
//                  <span className="font-medium tracking-wide">Profile</span>
//                </div>
//              </IonMenuToggle>
       
//              {/* Dashboard */}
//              <IonMenuToggle autoHide>
//                <div
//                  onClick={() => redirect("/admin-home")}
//                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-blue-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//                >
//                  <IonIcon icon={homeOutline} className="text-blue-400 text-xl" />
//                  <span className="font-medium tracking-wide">Dashboard</span>
//                </div>
//              </IonMenuToggle>
//        <IonMenuToggle autoHide>
//   <div
//     onClick={() => redirect("/manage-users")}
//     className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//   >
//     <IonIcon icon={peopleOutline} className="text-purple-400 text-xl" />
//     <span className="font-medium tracking-wide">Manage Users</span>
//   </div>
// </IonMenuToggle>

//              {/* Services */}
//              <IonMenuToggle autoHide>
//                <div
//                  onClick={() => redirect("/admin-service")}
//                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-pink-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//                >
//                  <IonIcon icon={settingsOutline} className="text-pink-400 text-xl" />
//                  <span className="font-medium tracking-wide"> Manage Services</span>
//                </div>
//              </IonMenuToggle>
//        <IonMenuToggle autoHide>
//   <div
//     onClick={() => redirect("/manage-support")}
//     className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//   >
//     <IonIcon icon={chatbubblesOutline} className="text-purple-400 text-xl" />
//     <span className="font-medium tracking-wide">Manage Support</span>
//   </div>
// </IonMenuToggle>
//              {/* Logout */}
//              <IonMenuToggle autoHide>
//                <div
//                  onClick={handleLogout}
//                  className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//                >
//                  <IonIcon icon={logOutOutline} className="text-red-400 text-xl" />
//                  <span className="font-medium tracking-wide text-red-400">
//                    Logout
//                  </span>
//                </div>
//              </IonMenuToggle>
       
//            </div>
//          </IonContent>
//       </IonMenu>

//       <IonPage>
//         {/* NAVBAR */}
//         <div id="adminContent"
//           className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-5 py-3">

//           <div className="flex items-center gap-3">
//             <img
//               src={logoImg}
//               alt="Logo"
//               className="w-12 h-12 rounded-full border-2 border-pink-500"
//             />
//             <h1 className="font-bold text-xl text-indigo-600">
//               Maidigo Admin
//             </h1>
//           </div>

//           <IonButtons>
//             <IonButton onClick={() =>
//               (window as any).document.querySelector("ion-menu")?.toggle()
//             }>
//               <IonIcon icon={menuOutline}
//                 className="text-3xl text-pink-600" />
//             </IonButton>
//           </IonButtons>
//         </div>
//         <IonContent style={{ "--background": "transparent" } as React.CSSProperties}>
//           <div
//             className="min-h-screen bg-cover bg-center"
//             style={{ backgroundImage: `url(${backgroundImg})` }}
//           >
//             <div className="min-h-screen bg-black/50 backdrop-blur-sm p-6">

//               {/* FILTER + SEARCH */}
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

//                 <div className="flex items-center gap-3">
//                   <label className="text-sm font-semibold text-white">Filter:</label>
//                   <select
//                     value={filter}
//                     onChange={(e) =>
//                       setFilter(
//                         e.target.value as "all" | "pending" | "resolved" | "blocked"
//                       )
//                     }
//                     className="px-5 py-2 rounded-full text-sm font-semibold bg-white text-gray-700 border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 outline-none hover:border-indigo-400 transition"
//                   >
//                     <option value="all">All</option>
//                     <option value="pending">Pending</option>
//                     <option value="resolved">Resolved</option>
//                     <option value="blocked">Blocked</option>
//                   </select>
//                 </div>

//                 <div className="relative w-full md:w-72">
//                   <IonIcon
//                     icon={searchOutline}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search by Complaint ID..."
//                     value={searchId}
//                     onChange={(e) => setSearchId(e.target.value)}
//                     className="w-full pl-11 pr-4 py-2.5 rounded-full text-sm bg-white border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-500 outline-none transition"
//                   />
//                 </div>
//               </div>

//               {/* TABLE DESKTOP */}
//               <div className="hidden md:block bg-white/95 rounded-2xl shadow-2xl overflow-hidden mt-8">
//                 <div className="max-h-[600px] overflow-y-auto">
//                   <table className="min-w-full text-sm">
//                     <thead className="bg-indigo-600 text-white sticky top-0">
//                       <tr>
//                         <th className="px-6 py-4 text-left">ID</th>
//                         <th className="px-6 py-4 text-left">Name</th>
//                         <th className="px-6 py-4 text-left">Phone</th>
//                         <th className="px-6 py-4 text-left">Status</th>
//                         <th className="px-6 py-4 text-center">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredComplaints.map((c) => (
//                         <tr key={c.id} className="border-b hover:bg-gray-100 transition">
//                           <td className="px-6 py-5 font-medium">{c.id}</td>
//                           <td className="px-6 py-5">{c.user_name}</td>
//                           <td className="px-6 py-5">{c.user_phone}</td>
//                           <td className="px-6 py-5">
//                             <span
//                               className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                                 c.status === "pending"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : c.status === "resolved"
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-red-100 text-red-700"
//                               }`}
//                             >
//                               {c.status.toUpperCase()}
//                             </span>
//                           </td>
//                           <td className="px-6 py-5 text-center space-x-2">
//                             <IonButton
//                               size="small"
//                               fill="clear"
//                               onClick={() => {
//                                 setSelectedComplaint(c);
//                                 setShowModal(true);
//                               }}
//                             >
//                               <IonIcon icon={eyeOutline} />
//                             </IonButton>
//                             {c.status !== "blocked" && (
//                               <IonButton
//                                 size="small"
//                                 fill="clear"
//                                 color="danger"
//                                 onClick={() => handleBlock(c.id)}
//                               >
//                                 <IonIcon icon={banOutline} />
//                               </IonButton>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* MOBILE CARD VIEW */}
//               <div className="md:hidden space-y-4 mt-6">
//                 {filteredComplaints.map((c) => (
//                   <div key={c.id} className="bg-white/95 p-5 rounded-2xl shadow-xl">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="font-bold text-indigo-600">{c.id}</span>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           c.status === "pending"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : c.status === "resolved"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {c.status.toUpperCase()}
//                       </span>
//                     </div>
//                     <p className="text-sm font-semibold">{c.user_name}</p>
//                     <p className="text-sm text-gray-600">{c.user_phone}</p>
//                     <p className="text-sm text-gray-700 mt-2">{c.complaint_text}</p>

//                     {c.status !== "blocked" && (
//                       <IonButton
//                         size="small"
//                         color="danger"
//                         className="mt-3 w-full"
//                         onClick={() => handleBlock(c.id)}
//                       >
//                         Block User
//                       </IonButton>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* MODAL */}
//               <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//                   <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-auto p-6 relative">
//                     <div className="flex justify-between items-center mb-6 border-b pb-2">
//                       <h2 className="text-2xl font-bold text-indigo-600">Complaint Details</h2>
//                       <IonButton fill="clear" onClick={() => setShowModal(false)}>
//                         <IonIcon icon={closeOutline} className="text-gray-600 text-2xl" />
//                       </IonButton>
//                     </div>

//                     {selectedComplaint && (
//                       <div className="space-y-4 text-gray-700">
//                         <div className="flex justify-between items-center">
//                           <span className="font-semibold text-gray-600">ID:</span>
//                           <span className="font-medium text-indigo-600">{selectedComplaint.id}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="font-semibold text-gray-600">Name:</span>
//                           <span className="font-medium">{selectedComplaint.user_name}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="font-semibold text-gray-600">Phone:</span>
//                           <span className="font-medium">{selectedComplaint.user_phone}</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <span className="font-semibold text-gray-600">Status:</span>
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               selectedComplaint.status === "pending"
//                                 ? "bg-yellow-100 text-yellow-700"
//                                 : selectedComplaint.status === "resolved"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {selectedComplaint.status.toUpperCase()}
//                           </span>
//                         </div>
//                         <div>
//                           <span className="font-semibold text-gray-600">Complaint:</span>
//                           <p className="mt-1 text-gray-700">{selectedComplaint.complaint_text}</p>
//                         </div>
//                       </div>
//                     )}

//                     <div className="mt-6 flex justify-end">
//                       <IonButton color="primary" onClick={() => setShowModal(false)} className="px-6 py-2 rounded-xl">
//                         Close
//                       </IonButton>
//                     </div>
//                   </div>
//                 </div>
//               </IonModal>

//             </div>
//           </div>
//         </IonContent>
//       </IonPage>
//     </>
//   );
// };

// export default AdminComplaints;

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonButton,
//   IonIcon,
//   IonModal,
//   IonSpinner,
//   IonInput,
//   IonMenu,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonMenuToggle,
//   IonMenuButton,
//   useIonToast,
// } from "@ionic/react";
// import { useHistory } from "react-router-dom";

// import {
//   eyeOutline,
//   searchOutline,
//   banOutline,
//   checkmarkDoneOutline,
//   logOutOutline,
//   chatbubblesOutline,
//   settingsOutline,
//   peopleOutline,
//   homeOutline,
//   personCircleOutline,
//   closeOutline,
// } from "ionicons/icons";

// import backgroundImg from "../../assets/support.webp";
// import logoImg from "../../assets/logo.jpg";

// interface Complaint {
//   id: string;
//   subject: string;
//   description: string;
//   status: "pending" | "resolved";
//   created_at: string;
//   account_id: string;
//   phone: string;
// }

// const AdminComplaints: React.FC = () => {
//   const history = useHistory();
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState("all");
//   const [searchId, setSearchId] = useState("");
//   const [selectedComplaint, setSelectedComplaint] =
//     useState<Complaint | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [blockedAccounts, setBlockedAccounts] = useState<string[]>([]);
//   const [present] = useIonToast();

//   const token = localStorage.getItem("access_token");

//   const redirect = (path: string) => history.push(path);

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     history.replace("/login");
//   };

//   /* ================= FETCH ================= */
//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "http://192.168.0.187:9830/complaint/admin/usercomplaintsdata",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setComplaints(data);
//     } catch {
//       present({
//         message: "Failed to fetch complaints",
//         duration: 2000,
//         color: "danger",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   /* ================= RESOLVE ================= */
//   const handleResolve = async (id: string) => {
//     try {
//       const res = await fetch(
//         `http://192.168.0.187:9830/admin/complaints/${id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ status: "resolved" }),
//         }
//       );
//       if (!res.ok) throw new Error();
//       setComplaints((prev) =>
//         prev.map((c) =>
//           c.id === id ? { ...c, status: "resolved" } : c
//         )
//       );
//       present({ message: "Complaint Resolved", duration: 2000, color: "success" });
//     } catch {
//       present({ message: "Resolve Failed", duration: 2000, color: "danger" });
//     }
//   };

//   /* ================= FILTER ================= */
//   const filteredComplaints = useMemo(() => {
//     return complaints.filter((c) => {
//       const matchFilter =
//         filter === "all" ? true : c.status === filter;
//       const matchSearch = searchId
//         ? c.id.toLowerCase().includes(searchId.toLowerCase())
//         : true;
//       return matchFilter && matchSearch;
//     });
//   }, [complaints, filter, searchId]);

//   return (
//     <>
//       {/* ================= SIDE MENU ================= */}
//       <IonMenu side="end" menuId="adminMenu" contentId="adminContent">
//         <IonHeader>
//        <IonToolbar className="bg-indigo-600 text-purple-300 px-4">
//   <div className="flex justify-between items-center w-full">
//     <IonTitle>Admin Panel</IonTitle>
//     <IonButton
//       fill="clear"
//       onClick={() =>
//         (window as any).document.querySelector("ion-menu")?.close()
//       }
//     >
//       <IonIcon icon={closeOutline} className="text-red-400 text-xl" />
//     </IonButton>
//   </div>
// </IonToolbar>
//         </IonHeader>

//      <IonContent className="bg-slate-900 text-white">
//   <div className="p-4 space-y-3">

//     {[
//       { label: "Profile", icon: personCircleOutline, path: "/admin-profile", color: "text-purple-400" },
//       { label: "Dashboard", icon: homeOutline, path: "/admin-home", color: "text-blue-400" },
//       { label: "Manage Users", icon: peopleOutline, path: "/manage-users", color: "text-indigo-400" },
//       { label: "Manage Services", icon: settingsOutline, path: "/admin-service", color: "text-pink-400" },
//       { label: "Manage Support", icon: chatbubblesOutline, path: "/manage-support", color: "text-purple-300" },
//     ].map((item) => (
//       <IonMenuToggle key={item.label} autoHide>
//         <div
//           onClick={() => redirect(item.path)}
//           className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-indigo-600/40 transition cursor-pointer"
//         >
//           <IonIcon icon={item.icon} className={`${item.color} text-xl`} />
//           <span className="font-medium">{item.label}</span>
//         </div>
//       </IonMenuToggle>
//     ))}

//     <IonMenuToggle autoHide>
//       <div
//         onClick={handleLogout}
//         className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-600/30 transition cursor-pointer"
//       >
//         <IonIcon icon={logOutOutline} className="text-red-400 text-xl" />
//         <span className="text-red-400 font-medium">Logout</span>
//       </div>
//     </IonMenuToggle>

//   </div>
// </IonContent>
//       </IonMenu>

//       {/* ================= PAGE ================= */}
//       <IonPage id="adminContent">

//         {/* NAVBAR */}
//         <div className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img
//               src={logoImg}
//               className="w-10 h-10 rounded-full border-2 border-indigo-500"
//               alt="Logo"
//             />
//             <h1 className="text-lg font-bold text-indigo-600">
//               Manage Support
//             </h1>
//           </div>

//          <IonMenuButton menu="adminMenu" className="text-pink-800 text-2xl" />
//         </div>

//         <IonContent>
//           <div
//             className="min-h-screen bg-cover bg-center"
//             style={{ backgroundImage: `url(${backgroundImg})` }}
//           >
//             <div className="min-h-screen bg-black/55 p-6">

//               {/* FILTER + SEARCH */}
//               <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
//                 <select
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                   className="px-4 py-2 rounded-lg bg-purple-200 shadow border"
//                 >
//                   <option value="all">All</option>
//                   <option value="pending">Pending</option>
//                   <option value="resolved">Resolved</option>
//                 </select>

//                 <div className="relative w-full md:w-96">
//                   <IonIcon
//                     icon={searchOutline}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   />
//                   <IonInput
//                     placeholder="Search by ID..."
//                     value={searchId}
//                     onIonChange={(e) => setSearchId(e.detail.value!)}
//                     className="pl-10 bg-indigo-50 rounded-lg shadow"
//                   />
//                 </div>
//               </div>

//               {loading && (
//                 <div className="flex justify-center">
//                   <IonSpinner color="primary" />
//                 </div>
//               )}

//               {/* CARDS */}
//              {/* CARDS */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//   {filteredComplaints.length > 0 ? (
//     filteredComplaints.map((c) => (
//       <div
//         key={c.id}
//         className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
//       >
//         <div className="flex justify-between mb-2">
//           <span className="font-bold text-indigo-600 text-sm">
//             {c.id}
//           </span>
//           <span
//             className={`text-xs px-2 py-1 rounded-full ${
//               c.status === "pending"
//                 ? "bg-yellow-100 text-yellow-700"
//                 : "bg-green-100 text-green-700"
//             }`}
//           >
//             {c.status}
//           </span>
//         </div>

//         <p className="font-semibold">{c.subject}</p>
//         <p className="text-xs text-gray-500 mb-3">{c.phone}</p>

//         <IonButton
//           size="small"
//           fill="outline"
//           onClick={() => {
//             setSelectedComplaint(c);
//             setShowModal(true);
//           }}
//         >
//           <IonIcon icon={eyeOutline} slot="start" />
//           View
//         </IonButton>
//       </div>
//     ))
//   ) : (
//     <div className="col-span-full text-center text-gray-400 mt-6">
//       {filter === "pending"
//         ? "No pending complaints available."
//         : filter === "resolved"
//         ? "No resolved complaints available."
//         : "No complaints available."}
//     </div>
//   )}
// </div>

//               {/* MODAL */}
//               <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
//                 <div className="p-6">
//                   {selectedComplaint && (
//                     <>
//                       <h2 className="text-lg font-bold mb-4 text-indigo-600">
//                         Complaint Details
//                       </h2>
//                       <p><b>ID:</b> {selectedComplaint.id}</p>
//                       <p><b>Subject:</b> {selectedComplaint.subject}</p>
//                       <p><b>Description:</b> {selectedComplaint.description}</p>
//                       <p><b>Phone:</b> {selectedComplaint.phone}</p>
//                     </>
//                   )}

//                   <IonButton expand="block" className="mt-6" onClick={() => setShowModal(false)}>
//                     Close
//                   </IonButton>
//                 </div>
//               </IonModal>

//             </div>
//           </div>
//         </IonContent>
//       </IonPage>
//     </>
//   );
// };

// export default AdminComplaints;

import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonModal,
  IonSpinner,
  IonInput,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuToggle,
  IonMenuButton,
  useIonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import {
  eyeOutline,
  searchOutline,
  banOutline,
  checkmarkDoneOutline,
  logOutOutline,
  chatbubblesOutline,
  settingsOutline,
  peopleOutline,
  homeOutline,
  personCircleOutline,
  closeOutline,
} from "ionicons/icons";

import backgroundImg from "../../assets/support.webp";
import logoImg from "../../assets/logo.jpg";

interface Complaint {
  user_name: ReactNode;
  id: string;
  subject: string;
  description: string;
  status: "pending" | "resolved";
  created_at: string;
  account_id: string;
  phone: string;
}

const AdminComplaints: React.FC = () => {
  const history = useHistory();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchId, setSearchId] = useState("");
  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [blockedAccounts, setBlockedAccounts] = useState<string[]>([]);
  const [present] = useIonToast();

  const token = localStorage.getItem("access_token");

  const redirect = (path: string) => history.push(path);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    history.replace("/login");
  };

  /* ================= FETCH COMPLAINTS ================= */
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://192.168.0.187:9830/complaint/admin/usercomplaintsdata",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setComplaints(data);
    } catch {
      present({ message: "Failed to fetch complaints", duration: 2000, color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH BLOCKED USERS ================= */
  const fetchBlockedUsers = async () => {
    try {
      const res = await fetch("http://192.168.0.187:9830/admin/blocked-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data: { account_id: string }[] = await res.json();
      setBlockedAccounts(data.map((u) => u.account_id));
    } catch {
      present({ message: "Failed to fetch blocked users", duration: 2000, color: "danger" });
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchBlockedUsers();
  }, []);

  /* ================= RESOLVE ================= */
  const handleResolve = async (id: string) => {
    try {
      const res = await fetch(`http://192.168.0.187:9830/admin/complaints/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "resolved" }),
      });
      if (!res.ok) throw new Error();
      setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status: "resolved" } : c)));
      present({ message: "Complaint Resolved", duration: 2000, color: "success" });
    } catch {
      present({ message: "Resolve Failed", duration: 2000, color: "danger" });
    }
  };

  /* ================= BLOCK USER ================= */
  const handleBlock = async (accountId: string) => {
    try {
      const res = await fetch(`http://192.168.0.187:9830/admin/users/${accountId}/block`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setBlockedAccounts((prev) => [...prev, accountId]);
      present({ message: "User Blocked", duration: 2000, color: "danger" });
    } catch {
      present({ message: "Block Failed", duration: 2000, color: "danger" });
    }
  };

  /* ================= UNBLOCK USER ================= */
  const handleUnblock = async (accountId: string) => {
    try {
      const res = await fetch(`http://192.168.0.187:9830/admin/users/${accountId}/unblock`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setBlockedAccounts((prev) => prev.filter((id) => id !== accountId));
      present({ message: "User Unblocked", duration: 2000, color: "success" });
    } catch {
      present({ message: "Unblock Failed", duration: 2000, color: "danger" });
    }
  };

  /* ================= FILTERED COMPLAINTS ================= */
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchFilter = filter === "all" ? true : c.status === filter;
      const matchSearch = searchId ? c.id.toLowerCase().includes(searchId.toLowerCase()) : true;
      return matchFilter && matchSearch;
    });
  }, [complaints, filter, searchId]);

  return (
    <>
      {/* ================= SIDE MENU ================= */}
      <IonMenu side="end" menuId="adminMenu" contentId="adminContent">
        <IonHeader>
          <IonToolbar className="bg-indigo-600 text-purple-300 px-4">
            <div className="flex justify-between items-center w-full">
              <IonTitle>Admin Panel</IonTitle>
              <IonButton fill="clear" onClick={() => (window as any).document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} className="text-red-400 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-slate-900 text-white">
          <div className="p-4 space-y-3">
            {[
              { label: "Profile", icon: personCircleOutline, path: "/admin-profile", color: "text-purple-400" },
              { label: "Dashboard", icon: homeOutline, path: "/admin-home", color: "text-blue-400" },
              { label: "Manage Users", icon: peopleOutline, path: "/manage-users", color: "text-indigo-400" },
              { label: "Manage Services", icon: settingsOutline, path: "/admin-service", color: "text-pink-400" },
              { label: "Manage Support", icon: chatbubblesOutline, path: "/manage-support", color: "text-purple-300" },
            ].map((item) => (
              <IonMenuToggle key={item.label} autoHide>
                <div
                  onClick={() => redirect(item.path)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-indigo-600/40 transition cursor-pointer"
                >
                  <IonIcon icon={item.icon} className={`${item.color} text-xl`} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </IonMenuToggle>
            ))}

            <IonMenuToggle autoHide>
              <div
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-600/30 transition cursor-pointer"
              >
                <IonIcon icon={logOutOutline} className="text-red-400 text-xl" />
                <span className="text-red-400 font-medium">Logout</span>
              </div>
            </IonMenuToggle>
          </div>
        </IonContent>
      </IonMenu>

      {/* ================= PAGE ================= */}
      <IonPage id="adminContent">
        {/* NAVBAR */}
        <div className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="Logo" />
            <h1 className="text-lg font-bold text-indigo-600">Manage Support</h1>
          </div>
          <IonMenuButton menu="adminMenu" className="text-pink-800 text-2xl" />
        </div>

        <IonContent>
          <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})` }}>
            <div className="min-h-screen bg-black/55 p-6">
              {/* FILTER + SEARCH */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 rounded-lg bg-purple-200 shadow border">
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>

                <div className="relative w-full md:w-96">
                  <IonIcon icon={searchOutline} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <IonInput
                    placeholder="Search by ID..."
                    value={searchId}
                    onIonChange={(e) => setSearchId(e.detail.value!)}
                    className="pl-10 bg-indigo-50 rounded-lg shadow"
                  />
                </div>
              </div>

              {loading && (
                <div className="flex justify-center">
                  <IonSpinner color="primary" />
                </div>
              )}

              {/* CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((c) => (
                    <div key={c.id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-indigo-600 text-sm">{c.id}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${c.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                          {c.status}
                        </span>
                      </div>

                      <p className="font-semibold">{c.subject}</p>
                      <p className="text-xs text-gray-500 mb-3">{c.phone}</p>

                      <div className="flex flex-wrap gap-2">
                        <IonButton
                          size="small"
                          fill="outline"
                          onClick={() => {
                            setSelectedComplaint(c);
                            setShowModal(true);
                          }}
                        >
                          <IonIcon icon={eyeOutline} slot="start" />
                          View
                        </IonButton>

                        {c.status === "pending" && (
                          <IonButton size="small" color="success" onClick={() => handleResolve(c.id)}>
                            <IonIcon icon={checkmarkDoneOutline} slot="start" />
                            Resolve
                          </IonButton>
                        )}

                        {blockedAccounts.includes(c.account_id) ? (
                          <IonButton size="small" color="medium" onClick={() => handleUnblock(c.account_id)}>
                            Unblock
                          </IonButton>
                        ) : (
                          <IonButton size="small" color="danger" onClick={() => handleBlock(c.account_id)}>
                            <IonIcon icon={banOutline} slot="start" />
                            Block
                          </IonButton>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                 <div className="col-span-full text-center text-gray-200 mt-6">
  {filter === "pending"
    ? "No pending complaints available."
    : filter === "resolved"
    ? "No resolved complaints available."
    : "No complaints available."}
</div>
                )}
              </div>

              {/* MODAL */}
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
  <div className="p-6 bg-indigo-50 rounded-xl shadow-lg min-w-[300px] max-w-md mx-auto my-20">
    {selectedComplaint && (
      <>
        <h2 className="text-xl font-bold mb-4 text-indigo-700 border-b-2 border-indigo-300 pb-2">
          Complaint Details
        </h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold text-indigo-600">ID:</span> {selectedComplaint.id}</p>
          <p><span className="font-semibold text-indigo-600">Subject:</span> {selectedComplaint.subject}</p>
          <p><span className="font-semibold text-indigo-600">Description:</span> {selectedComplaint.description}</p>
          <p><span className="font-semibold text-indigo-600">Customer Name:</span> {selectedComplaint.user_name}</p>
          <p><span className="font-semibold text-indigo-600">Phone:</span> {selectedComplaint.phone}</p>
        </div>
      </>
    )}

    <IonButton 
      expand="block" 
      className="mt-6 bg-indigo-600 text-white hover:bg-indigo-700"
      onClick={() => setShowModal(false)}
    >
      Close
    </IonButton>
  </div>
</IonModal>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminComplaints;