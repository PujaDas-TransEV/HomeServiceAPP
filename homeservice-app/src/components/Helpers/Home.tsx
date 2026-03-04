// import React, { useState } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonIcon,
//   IonSearchbar,
//   IonButton,
//   IonModal,
// } from "@ionic/react";
// import {
//   menu,
//   personCircle,
//   chatbubbles,
//   logOut,
//   restaurant,
//   sparkles,
//   people,
//   heart,
//   home,
//   time,
//   arrowForward,
//   send,
//   settings
// } from "ionicons/icons";
// import { useHistory } from "react-router-dom";

// import Logo from "../assets/logo.jpg";
// import User1 from "../assets/profile.png";
// import User2 from "../assets/profile.png";
// import User3 from "../assets/profile.png";

// const HelperHome: React.FC = () => {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [selectedJob, setSelectedJob] = useState<string | null>(null);
//   const history = useHistory();

//   const jobCategories = [
//     { name: "Cooking (রান্না)", icon: restaurant },
//     { name: "Cleaning (পরিষ্কার)", icon: sparkles },
//     { name: "Babysitting (শিশু দেখাশোনা)", icon: people },
//     { name: "Elderly Care (বয়স্কদের যত্ন)", icon: heart },
//     { name: "Full-time Maid (ফুল-টাইম কাজ)", icon: home },
//     { name: "Part-time Maid (পার্ট-টাইম কাজ)", icon: time },
//   ];

//   const userList = [
//     { image: User1, name: "Priya Sharma", need: "Cooking (রান্না)" },
//     { image: User2, name: "Rahul Verma", need: "Babysitting (শিশু দেখাশোনা)" },
//     { image: User3, name: "Sneha Kaur", need: "Cleaning (পরিষ্কার)" },
//     { image: User1, name: "Aditi Roy", need: "Cooking (রান্না)" },
//     { image: User2, name: "Imran Hossain", need: "Cleaning (পরিষ্কার)" },
//     { image: User3, name: "Kajal Das", need: "Full-time Maid (ফুল-টাইম)" },
//     { image: User1, name: "Rita Paul", need: "Elderly Care (বয়স্কদের যত্ন)" },
//     { image: User2, name: "Rohan Sen", need: "Part-time Maid (পার্ট-টাইম)" },
//   ];

//   const filteredUsers =
//     selectedJob !== null
//       ? userList.filter((u) =>
//           u.need.toLowerCase().includes(selectedJob.toLowerCase())
//         )
//       : [];

//   const handleLogout = () => {
//     setShowLogoutModal(false);
//     history.push("/login");
//   };

//   return (
//     <IonPage>
//       <IonContent className="bg-gray-100">

//         {/* NAVBAR */}
//         <div className="w-full bg-white shadow-md p-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 rounded-full bg-pink-100 border-2 border-pink-500 flex items-center justify-center shadow">
//               <img src={Logo} alt="maidigo logo" className="w-10 h-10 object-contain" />
//             </div>
//             <h1 className="text-xl font-bold text-indigo-500">
//               Maidigo (মেইডিগো)
//             </h1>
//           </div>

//           <button
//             onClick={() => setOpenMenu(!openMenu)}
//             className="p-2 rounded-lg bg-pink-600 text-white"
//           >
//             <IonIcon icon={menu} className="text-2xl" />
//           </button>
//         </div>

//         {/* SIDE MENU */}
//         <div
//           className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-all duration-300 z-50
//             ${openMenu ? "translate-x-0" : "translate-x-full"}`}
//         >
//           <div className="p-4 border-b flex justify-end">
//             <button className="text-gray-600 font-bold" onClick={() => setOpenMenu(false)}>
//               ✕
//             </button>
//           </div>

//           <div className="p-4 space-y-4">
//             {/* Profile */}
//             <div
//               className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
//               onClick={() => { setOpenMenu(false); history.push("/maid-profile"); }}
//             >
//               <IonIcon icon={personCircle} className="text-2xl text-pink-600" />
//               <span className="text-lg font-medium">Profile (প্রোফাইল)</span>
//             </div>

//             {/* Chat */}
//             <div
//               className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
//               onClick={() => { setOpenMenu(false); history.push("/maid-chat"); }}
//             >
//               <IonIcon icon={chatbubbles} className="text-2xl text-pink-600" />
//               <span className="text-lg font-medium">Chat (চ্যাট)</span>
//             </div>
//            <div
//   className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
//   onClick={() => { setOpenMenu(false); history.push("/maid-preferences"); }}
// >
//   <IonIcon icon={settings} className="text-2xl text-pink-600" />
//   <span className="text-lg font-medium">Preferences (পছন্দসমূহ)</span>
// </div>

//             {/* Logout */}
//             <div
//               className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
//               onClick={() => { setOpenMenu(false); setShowLogoutModal(true); }}
//             >
//               <IonIcon icon={logOut} className="text-2xl text-red-500" />
//               <span className="text-lg font-medium text-red-500">Logout (লগআউট)</span>
//             </div>
//           </div>
//         </div>

//         {openMenu && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-40 z-40"
//             onClick={() => setOpenMenu(false)}
//           ></div>
//         )}

//         {/* BANNER */}
//         <div className="w-full bg-pink-50 py-6 px-4 rounded-b-3xl shadow">
//           <h1 className="text-2xl font-bold text-pink-700">
//             Find Your Perfect Job (আপনার পছন্দের কাজ খুঁজুন)
//           </h1>

//           <p className="text-gray-600 mt-1">
//             Search for cooking, cleaning, babysitting & more.  
//             (রান্না, পরিষ্কার, শিশু দেখাশোনা আরও অনেক কাজ খুঁজুন)
//           </p>

//           <div className="mt-4 bg-white p-4 rounded-xl shadow flex items-center space-x-3">
//             <IonIcon icon={personCircle} className="text-4xl text-pink-600" />
//             <div>
//               <p className="font-bold text-gray-700">Hello, Maid Helper! (হ্যালো, মেইড হেলপার!)</p>
//               <p className="text-gray-500 text-sm">Ready to work today? (আজ কাজ করতে প্রস্তুত?)</p>
//             </div>
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
    
// <div className="p-4 mt-4 pb-24"> {/* Added pb-24 for spacing above bottom navbar */}
//   <IonSearchbar
//     placeholder="Search job (কাজ খুঁজুন)..."
//     className="mt-2 rounded-xl shadow bg-white"
//     value={searchText}
//     onIonChange={(e) => setSearchText(e.detail.value!)}
//   />

//   {/* USER LIST SECTION */}
//   <div className="mt-4 flex justify-between items-center">
//     <h2 className="text-xl font-bold">
//       User Preference List (ইউজার পছন্দ তালিকা)
//     </h2>

//     <button
//       onClick={() => history.push("/helper/user-list")}
//       className="text-pink-600 font-semibold flex items-center space-x-1"
//     >
//       <span>Show More (আরও দেখুন)</span>
//       <IonIcon icon={arrowForward} />
//     </button>
//   </div>

//   <div className="mt-3 space-y-3">
//     {userList.map((user, i) => (
//       <div key={i} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <img src={user.image} alt="user" className="w-14 h-14 rounded-full object-cover" />
//           <div>
//             <p className="font-bold text-gray-800">{user.name}</p>
//             <p className="text-gray-500 text-sm">Needs (প্রয়োজন): {user.need}</p>
//           </div>
//         </div>

//         <IonButton
//           shape="round"
//           color="danger"
//           onClick={() => history.push("/maid-chat")}
//         >
//           <IonIcon icon={send} className="mr-1" />
//           Chat (চ্যাট)
//         </IonButton>
//       </div>
//     ))}
//   </div>

//   {/* JOB CATEGORIES */}
//   <h2 className="text-xl font-bold mt-6 mb-3">
//     Job Categories (কাজের ক্যাটাগরি)
//   </h2>

//   <div className="grid grid-cols-2 gap-4">
//     {jobCategories
//       .filter((job) => job.name.toLowerCase().includes(searchText.toLowerCase()))
//       .map((job, i) => (
//         <div
//           key={i}
//           onClick={() => setSelectedJob(job.name)}
//           className="bg-white p-5 rounded-xl shadow flex flex-col items-center border hover:border-pink-400 hover:scale-105 transition cursor-pointer"
//         >
//           <IonIcon icon={job.icon} className="text-3xl text-pink-600" />
//           <p className="mt-2 font-semibold text-center">{job.name}</p>
//         </div>
//       ))}
//   </div>

//   {/* FILTERED USER LIST BELOW CATEGORY */}
//   {selectedJob && (
//     <div className="mt-6">
//       <h3 className="text-lg font-bold text-gray-800">
//         Users looking for (যারা খুঁজছে): {selectedJob}
//       </h3>

//       <div className="mt-3 space-y-3">
//         {filteredUsers.map((user, i) => (
//           <div key={i} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <img src={user.image} alt="user" className="w-14 h-14 rounded-full object-cover" />
//               <div>
//                 <p className="font-bold text-gray-800">{user.name}</p>
//                 <p className="text-gray-500 text-sm">Needs: {user.need}</p>
//               </div>
//             </div>

//             <IonButton
//               shape="round"
//               color="danger"
//               onClick={() => history.push("/maid-chat")}
//             >
//               <IonIcon icon={send} className="mr-1" />
//               Chat (চ্যাট)
//             </IonButton>
//           </div>
//         ))}
//       </div>
//     </div>
//   )}
// </div>


//         {/* LOGOUT MODAL */}
//         <IonModal isOpen={showLogoutModal}>
//           <div className="flex items-center justify-center h-full w-full bg-black/30">
//             <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
//               <h2 className="text-xl font-bold text-gray-700 mb-4">
//                 Are you sure you want to logout?{" "}
//                 <span className="text-pink-500">(আপনি কি লগআউট করতে চান?)</span>
//               </h2>
//               <div className="flex justify-center space-x-4 mt-4">
//                 <IonButton color="danger" onClick={handleLogout}>
//                   Yes (হ্যাঁ)
//                 </IonButton>
//                 <IonButton color="medium" onClick={() => setShowLogoutModal(false)}>
//                   No (না)
//                 </IonButton>
//               </div>
//             </div>
//           </div>
//         </IonModal>

//         {/* BOTTOM NAVBAR */}
//         <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner flex justify-around py-2">
//           <button
//             className="flex flex-col items-center text-pink-600"
//             onClick={() => history.push("/helper-home")}
//           >
//             <IonIcon icon={home} className="text-2xl" />
//             <span className="text-xs font-semibold">Home (হোম)</span>
//           </button>
//           <button
//             className="flex flex-col items-center text-gray-500"
//             onClick={() => history.push("/maid-profile")}
//           >
//             <IonIcon icon={personCircle} className="text-2xl" />
//             <span className="text-xs font-semibold">Profile (প্রোফাইল)</span>
//           </button>
//           <button
//             className="flex flex-col items-center text-gray-500"
//             onClick={() => history.push("/helper/chat")}
//           >
//             <IonIcon icon={chatbubbles} className="text-2xl" />
//             <span className="text-xs font-semibold">Chat (চ্যাট)</span>
//           </button>
//         </div>

//       </IonContent>
//     </IonPage>
//   );
// };

// export default HelperHome;

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
//   IonLabel
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
//   FaSignOutAlt
// } from "react-icons/fa";

// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// import banner1 from "../assets/dashboard1.jpg";
// import banner2 from "../assets/home3.jpg";
// import banner3 from "../assets/maid1.jpg";
// import Logo from "../assets/logo.jpg";

// const API_BASE = "http://192.168.0.187:9830";

// export default function HelperHome() {
//   const history = useHistory();

//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");
//   const [area, setArea] = useState("");
//   const [services, setServices] = useState<any[]>([]);
//   const [recommendedSeekers, setRecommendedSeekers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const banners = [banner1, banner2, banner3];
//   const [currentBanner, setCurrentBanner] = useState(0);

//   // Banner Auto Slide
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length);
//     }, 3500);
//     return () => clearInterval(interval);
//   }, []);

//   // Initial Load
//   useEffect(() => {
//     fetchProfile();
//     fetchServices();
//     fetchRecommendedSeekers();
//   }, []);

//   // FETCH PROFILE
//   const fetchProfile = async () => {
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
//       setCity(profile.city || "Dhaka");
//       setArea(profile.area || "");
//     } catch (error) {
//       console.log("Profile error:", error);
//     }
//   };

//   // FETCH SERVICES
//   const fetchServices = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE}/services/getall`);
//       const data = await res.json();
//       setServices(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.log("Services error:", error);
//       setServices([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // FETCH RECOMMENDED SEEKERS
//   const fetchRecommendedSeekers = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/seekers/recommended`);
//       const data = await res.json();

//       if (Array.isArray(data)) {
//         setRecommendedSeekers(data);
//       } else if (Array.isArray(data?.seekers)) {
//         setRecommendedSeekers(data.seekers);
//       } else {
//         setRecommendedSeekers([]);
//       }
//     } catch (error) {
//       console.log("Recommended seekers error:", error);
//       setRecommendedSeekers([]);
//     }
//   };

//   // Service Colors
//   const serviceColors = [
//     "from-pink-500 to-rose-500",
//     "from-indigo-500 to-purple-500",
//     "from-orange-400 to-amber-500",
//     "from-green-400 to-emerald-500",
//     "from-blue-400 to-cyan-500",
//     "from-fuchsia-500 to-purple-600"
//   ];

//   const getServiceIcon = (name: string) => {
//     switch (name?.toLowerCase()) {
//       case "cleaning":
//         return <FaBroom size={24} />;
//       case "cooking":
//         return <FaUtensils size={24} />;
//       case "baby sitting":
//         return <FaBaby size={24} />;
//       case "elder care":
//         return <FaUserNurse size={24} />;
//       case "home care":
//         return <FaHome size={24} />;
//       default:
//         return <FaHandsHelping size={24} />;
//     }
//   };

//   return (
//     <IonPage>

//       {/* ================= SIDE MENU ================= */}
//       <IonMenu side="end" contentId="main-content" type="overlay">
//         <IonHeader>
//           <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
//             <div className="flex items-center justify-between w-full">
//               <IonTitle className="text-purple-600 font-bold text-lg">HelperGo</IonTitle>
//               <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
//                 <IonIcon icon={closeOutline} className="text-pink-600 text-xl" />
//               </IonButton>
//             </div>
//           </IonToolbar>
//         </IonHeader>

//         <IonContent className="bg-indigo-50">
//           <div className="flex flex-col p-3 space-y-2">
//             <IonItem button routerLink="/home" className="rounded-lg hover:bg-indigo-100">
//               <FaHome className="text-purple-600 w-5 h-5 mr-3" />
//               <IonLabel>Home</IonLabel>
//             </IonItem>
//             <IonItem button routerLink="/profile" className="rounded-lg hover:bg-indigo-100">
//               <FaUser className="text-indigo-600 w-5 h-5 mr-3" />
//               <IonLabel>Profile</IonLabel>
//             </IonItem>
//             <IonItem button routerLink="/chat" className="rounded-lg hover:bg-indigo-100">
//               <FaComment className="text-pink-600 w-5 h-5 mr-3" />
//               <IonLabel>Chat</IonLabel>
//             </IonItem>
//             <IonItem button routerLink="/services" className="rounded-lg hover:bg-indigo-100">
//               <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
//               <IonLabel>Seeker List</IonLabel>
//             </IonItem>
//             <IonItem button routerLink="/preferences" className="rounded-lg hover:bg-indigo-100">
//               <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
//               <IonLabel>Preferences</IonLabel>
//             </IonItem>
//             <IonItem
//               button
//               className="rounded-lg hover:bg-red-100"
//               onClick={() => {
//                 localStorage.removeItem("access_token");
//                 history.push("/login");
//               }}
//             >
//               <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
//               <IonLabel className="text-red-500">Logout</IonLabel>
//             </IonItem>
//           </div>
//         </IonContent>
//       </IonMenu>

//       {/* ================= HEADER ================= */}
//       <IonHeader>
//         <IonToolbar className="bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-3">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center gap-3">
//               <img
//                 src={Logo}
//                 className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
//                 alt="logo"
//               />
//               <div>
//                 <p className="text-yellow-800 text-s opacity-80">Welcome back 👋</p>
//                 <p className="text-indigo-500 font-bold text-lg">{name || "User"}</p>
//               </div>
//             </div>
//             <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.open()}>
//               <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
//                 <svg
//                   className="w-6 h-6 text-pink-600"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </IonButton>
//           </div>
//         </IonToolbar>
//       </IonHeader>

//       {/* ================= CONTENT ================= */}
//       <IonContent id="main-content" className="bg-linear-to-b from-pink-50 to-indigo-50">

//         {/* Banner Slider */}
//         <div className="relative h-56">
//           <img
//             src={banners[currentBanner]}
//             className="w-full h-full object-cover"
//             alt="banner"
//           />
//           <div className="absolute inset-0 bg-black/40" />
//         </div>

//         {/* Location Card */}
//         <div className="px-4 mt-6">
//           <div className="bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
//             <div className="bg-white/20 p-3 rounded-full">
//               <IonIcon icon={locationOutline} className="text-xl" />
//             </div>
//             <div>
//               <p className="text-xs opacity-80">Your Location</p>
//               <p className="font-semibold">{city}, {area}</p>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="px-4 mt-6">
//           <div className="bg-white rounded-full shadow-lg p-3 flex items-center border-2 border-indigo-300 focus-within:border-purple-500 transition">
//             <IonIcon icon={searchOutline} className="text-indigo-500 text-xl" />
//             <input
//               type="text"
//               placeholder="Search service or seeker..."
//               className="ml-3 w-full outline-none bg-transparent text-gray-700"
//             />
//           </div>
//         </div>

//         {/* Services */}
//         <div className="px-4 mt-8">
//           <h2 className="text-lg font-bold mb-4 text-gray-700">Available Services</h2>

//           {loading ? (
//             <IonSpinner />
//           ) : (
//             <div className="grid grid-cols-3 gap-4">
//               {services.length === 0 && (
//                 <p className="text-gray-400 col-span-3 text-center">No services available</p>
//               )}
//               {services.map((service, index) => (
//                 <div
//                   key={service?.id}
//                   onClick={() => history.push(`/service/${service?.id}`)}
//                   className={`cursor-pointer bg-linear-to-r ${serviceColors[index % serviceColors.length]} text-white rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300`}
//                 >
//                   <div className="bg-white/20 p-3 rounded-full mb-2">
//                     {getServiceIcon(service?.name)}
//                   </div>
//                   <p className="text-xs font-semibold text-center">{service?.name}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Recommended Seekers */}
//         <div className="px-4 mt-10 pb-10">
//           <h2 className="text-lg font-bold mb-4 text-gray-700">Recommended Seekers</h2>

//           {recommendedSeekers.length === 0 && (
//             <p className="text-gray-400 text-center">No recommended seekers found</p>
//           )}

//           {recommendedSeekers.map((seeker) => (
//             <div
//               key={seeker?.id}
//               className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 mb-4 hover:shadow-xl transition"
//             >
//               <img
//                 src={seeker?.image || "https://i.pravatar.cc/100"}
//                 className="w-16 h-16 rounded-full object-cover border-2 border-pink-300"
//                 alt="seeker"
//               />
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-800">{seeker?.name}</p>
//                 <p className="text-sm text-gray-500">{seeker?.city || "Dhaka"}</p>
//                 <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</p>
//               </div>
//               <button
//                 onClick={() => history.push(`/seeker/${seeker?.id}`)}
//                 className="bg-pink-500 text-white px-4 py-1 rounded-full text-xs font-semibold"
//               >
//                 View
//               </button>
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
  IonContent,
  IonIcon,
  IonSpinner,
  IonMenu,
  IonTitle,
  IonButton,
  IonItem,
  IonLabel
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
  FaSignOutAlt
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import banner1 from "../assets/dashboard1.jpg";
import banner2 from "../assets/home3.jpg";
import banner3 from "../assets/maid1.jpg";
import Logo from "../assets/logo.jpg";

const API_BASE = "http://192.168.0.187:9830";

export default function HelperHome() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [services, setServices] = useState<any[]>([]);
  const [recommendedSeekers, setRecommendedSeekers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSeekers, setLoadingSeekers] = useState(false);

  const banners = [banner1, banner2, banner3];
  const [currentBanner, setCurrentBanner] = useState(0);

  // Banner Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Initial Load
  useEffect(() => {
    fetchProfile();
    fetchServices();
    fetchRecommendedSeekers();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        history.push("/login");
        return;
      }
      const res = await fetch(`${API_BASE}/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const profile = data?.profile || {};
      setName(profile.name || "User");
      setCity(profile.city || "Dhaka");
      setArea(profile.area || "");
    } catch (error) {
      console.log("Profile error:", error);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/services/getall`);
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Services error:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedSeekers = async () => {
    try {
      setLoadingSeekers(true);
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE}/helper/find-my-seekers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRecommendedSeekers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching seekers:", error);
      setRecommendedSeekers([]);
    } finally {
      setLoadingSeekers(false);
    }
  };

  const serviceColors = [
    "from-red-400 to-pink-500",
    "from-yellow-400 to-orange-500",
    "from-green-400 to-teal-500",
    "from-blue-400 to-indigo-500",
    "from-purple-400 to-fuchsia-500",
    "from-pink-400 to-rose-500"
  ];

  const getServiceIcon = (name: string) => {
    switch (name?.toLowerCase()) {
      case "cleaning": return <FaBroom size={24} />;
      case "cooking": return <FaUtensils size={24} />;
      case "baby sitting": return <FaBaby size={24} />;
      case "elder care": return <FaUserNurse size={24} />;
      case "home care": return <FaHome size={24} />;
      default: return <FaHandsHelping size={24} />;
    }
  };

  return (
    <IonPage>

      {/* SIDE MENU */}
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-red-500 to-pink-600 px-4">
            <div className="flex items-center justify-between w-full">
              <IonTitle className="text-white font-bold text-lg">HelperGo</IonTitle>
              <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} className="text-white text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-red-50">
          <div className="flex flex-col p-3 space-y-2">
            <IonItem button routerLink="/home" className="rounded-lg hover:bg-red-100">
              <FaHome className="text-red-600 w-5 h-5 mr-3" />
              <IonLabel>Home / হোম</IonLabel>
            </IonItem>
            <IonItem button routerLink="/profile" className="rounded-lg hover:bg-red-100">
              <FaUser className="text-orange-600 w-5 h-5 mr-3" />
              <IonLabel>Profile / প্রোফাইল</IonLabel>
            </IonItem>
            <IonItem button routerLink="/chat" className="rounded-lg hover:bg-red-100">
              <FaComment className="text-pink-600 w-5 h-5 mr-3" />
              <IonLabel>Chat / চ্যাট</IonLabel>
            </IonItem>
            <IonItem button routerLink="/services" className="rounded-lg hover:bg-red-100">
              <FaUsers className="text-purple-600 w-5 h-5 mr-3" />
              <IonLabel>Seeker List / খোঁজকারী তালিকা</IonLabel>
            </IonItem>
            <IonItem button routerLink="/preferences" className="rounded-lg hover:bg-red-100">
              <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Preferences / পছন্দসমূহ</IonLabel>
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
                <p className="text-pink-500 text-s opacity-80">Welcome back 👋 / স্বাগতম</p>
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

      {/* CONTENT */}
      <IonContent id="main-content" className="bg-linear-to-b from-yellow-50 to-pink-50">

        {/* Banner Slider */}
        <div className="relative h-56">
          <img src={banners[currentBanner]} className="w-full h-full object-cover" alt="banner" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Location Card */}
        <div className="px-4 mt-6">
          <div className="bg-linear-to-r from-green-400 to-teal-500 text-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
            <div className="bg-white/30 p-3 rounded-full">
              <IonIcon icon={locationOutline} className="text-xl" />
            </div>
            <div>
              <p className="text-xs opacity-90">Your Location / আপনার অবস্থান</p>
              <p className="font-semibold">{city}, {area}</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 mt-6">
          <div className="bg-white rounded-full shadow-lg p-3 flex items-center border-2 border-green-300 focus-within:border-teal-500 transition">
            <IonIcon icon={searchOutline} className="text-green-500 text-xl" />
            <input
              type="text"
              placeholder="Search service or seeker / সার্ভিস বা খোঁজকারী খুঁজুন..."
              className="ml-3 w-full outline-none bg-transparent text-gray-700"
            />
          </div>
        </div>

        {/* Services */}
        <div className="px-4 mt-8">
          <h2 className="text-lg font-bold mb-4 text-green-800">Available Services / উপলব্ধ সার্ভিস</h2>
          {loading ? (
            <IonSpinner />
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {services.length === 0 && (
                <p className="text-gray-400 col-span-3 text-center">No services available / কোন সার্ভিস নেই</p>
              )}
              {services.map((service, index) => (
                <div
                  key={service?.id}
                  onClick={() => history.push(`/service/${service?.id}`)}
                  className={`cursor-pointer bg-linear-to-r ${serviceColors[index % serviceColors.length]} text-white rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300`}
                >
                  <div className="bg-white/20 p-3 rounded-full mb-2">
                    {getServiceIcon(service?.name)}
                  </div>
                  <p className="text-xs font-semibold text-center">{service?.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Seekers */}
        <div className="px-4 mt-10 pb-10">
          <h2 className="text-lg font-bold mb-4 text-green-800">Recommended Seekers / প্রস্তাবিত খোঁজকারী</h2>
          {loadingSeekers ? (
            <IonSpinner />
          ) : recommendedSeekers.length === 0 ? (
            <p className="text-gray-400 text-center">No recommended seekers found / কোন প্রস্তাবিত খোঁজকারী নেই</p>
          ) : (
            recommendedSeekers.map((s) => {
              const seeker = s.seeker_info;
              const loc = s.location;
              return (
               <div
  key={seeker.registration_id + s.match_details.matched_on_service}
  className="bg-linear-to-r from-white to-gray-100 rounded-2xl shadow-md p-4 flex items-center gap-4 mb-4 hover:shadow-xl transition cursor-pointer"
  onClick={() => history.push(`/seeker/${seeker.registration_id}`)}
>
  {/* Seeker Image */}
  <img
    src={seeker.image || "https://i.pravatar.cc/100"}
    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
    alt={seeker.name}
  />

  {/* Seeker Info */}
  <div className="flex-1">
    <p className="font-semibold text-gray-800">{seeker.name}</p>
    <p className="text-sm text-gray-600">{loc.city}, {loc.area}</p>
    <p className="text-green-600 text-sm font-medium">
      Match: {s.match_details.score} ({s.match_details.matched_on_service})
    </p>
  </div>

  {/* Ionic View Button */}
  <IonButton
    fill="solid"
    color="success"
    size="small"
    onClick={(e) => {
      e.stopPropagation(); // Prevent outer div click
      history.push(`/seeker/:id`);
    }}
    className="flex items-center gap-1"
  >
    <IonIcon slot="start" icon={searchOutline} />
    View
  </IonButton>
</div>
              );
            })
          )}
        </div>

      </IonContent>
    </IonPage>
  );
}