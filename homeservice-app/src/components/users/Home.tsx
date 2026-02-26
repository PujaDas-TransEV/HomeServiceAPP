
// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonButtons,
//   IonMenuButton,
//   IonContent,
//   IonMenu,
//   IonList,
//   IonItem,
//   IonLabel,
//   IonFooter,
//   IonIcon,
//   IonModal,
//   IonButton
// } from "@ionic/react";

// import {
//   homeOutline,
//   chatbubbleEllipsesOutline,
//   personCircleOutline,
//   searchOutline,
//   closeOutline
// } from "ionicons/icons";

// import { menuController } from "@ionic/core";
// import { useHistory } from "react-router-dom";
// import { useState } from "react";
// import Logo from "../assets/logo.jpg";

// import Maid1 from "../assets/maid1.jpg";
// import Maid2 from "../assets/maid2.jpg";
// import Maid3 from "../assets/maid3.jpg";
// import Maid4 from "../assets/maid2.jpg";
// import Maid5 from "../assets/maid3.jpg";
// import Maid6 from "../assets/maid1.jpg";

// /* ---------------- Dummy Maid Data ---------------- */
// const maids = [
//   { id: 1, name: "Sita Devi", category: "Cleaning", experience: "5 yrs", rating: 5, image: Maid1, location: "Dhaka" },
//   { id: 2, name: "Anita Sharma", category: "Cooking", experience: "3 yrs", rating: 4, image: Maid2, location: "Chittagong" },
//   { id: 3, name: "Rina Das", category: "Baby Sitter", experience: "4 yrs", rating: 5, image: Maid3, location: "Dhaka" },
//   { id: 4, name: "Maya Roy", category: "Elder Care", experience: "6 yrs", rating: 5, image: Maid4, location: "Sylhet" },
//   { id: 5, name: "Priya Sen", category: "Cleaning", experience: "2 yrs", rating: 4, image: Maid5, location: "Dhaka" },
//   { id: 6, name: "Rita Khatun", category: "Cooking", experience: "5 yrs", rating: 5, image: Maid6, location: "Chittagong" }
// ];

// export default function HomePage() {
//   const history = useHistory();

//   /* ---------------- States ---------------- */
//   const [selectedMaid, setSelectedMaid] = useState<any>(null);
//   const [searchText, setSearchText] = useState("");
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   /* ---------------- Multi-select Toggle Logic ---------------- */
//   const toggleService = (serviceName: string) => {
//     setSelectedServices(prev =>
//       prev.includes(serviceName)
//         ? prev.filter(s => s !== serviceName)
//         : [...prev, serviceName]
//     );
//   };

//   /* ---------------- Filtering Logic ---------------- */
//   const filteredMaids = maids.filter((maid) => {
//     const matchesSearch =
//       maid.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       maid.category.toLowerCase().includes(searchText.toLowerCase()) ||
//       maid.location.toLowerCase().includes(searchText.toLowerCase());

//     const matchesService =
//       selectedServices.length === 0 ||
//       selectedServices.includes(maid.category);

//     return matchesSearch && matchesService;
//   });

//   const handleChat = (maid: any) => {
//     setSelectedMaid(null);
//     history.push("/chat", { maid });
//   };

//   const handleLogout = () => {
//     setShowLogoutModal(false);
//     history.push("/login");
//   };

//   return (
//     <>
//       {/* ---------------- Drawer Menu ---------------- */}
//       <IonMenu side="end" menuId="main-menu" contentId="main-content">
//         <IonContent className="bg-white">
//           <IonList className="mt-4">
//             <IonItem button onClick={() => history.push("/home")}>
//               <IonLabel className="text-lg">🏠 Home</IonLabel>
//             </IonItem>
//             <IonItem button onClick={() => history.push("/profile")}>
//               <IonLabel className="text-lg">👤 Profile</IonLabel>
//             </IonItem>
//             <IonItem button onClick={() => history.push("/chat")}>
//               <IonLabel className="text-lg">💬 Chat</IonLabel>
//             </IonItem>
//             <IonItem button onClick={() => history.push("/maid-list")}>
//               <IonLabel className="text-lg">🧹 Maid List</IonLabel>
//             </IonItem>

//             <IonItem
//               button
//               onClick={() => {
//                 history.push("/preferences");
//                 menuController.close("main-menu");
//               }}
//             >
//               <IonLabel className="text-lg">⚙️ Preferences</IonLabel>
//             </IonItem>

//             <IonItem button onClick={() => setShowLogoutModal(true)}>
//               <IonLabel className="text-lg text-red-500">🚪 Logout</IonLabel>
//             </IonItem>
//           </IonList>
//         </IonContent>
//       </IonMenu>

//       {/* ---------------- Main Page ---------------- */}
//       <IonPage id="main-content">
//         <IonHeader className="shadow-md">
//           <IonToolbar className="px-4 bg-white flex justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
//                 <img src={Logo} alt="logo" className="w-8 h-8 rounded-full" />
//               </div>
//               <h1 className="text-xl font-semibold text-indigo-600">HelperGo</h1>
//             </div>

//             <IonButtons slot="end">
//               <IonMenuButton className="text-2xl" />
//             </IonButtons>
//           </IonToolbar>
//         </IonHeader>

//         {/* ---------------- Content ---------------- */}
//         <IonContent className="bg-gray-50">

//           {/* Hero Section */}
//           <div className="w-full h-48 bg-linear-to-r from-pink-600 to-indigo-400 rounded-b-3xl p-5 text-white flex flex-col justify-center">
//             <h2 className="text-2xl font-semibold">Find Trusted Helper Near You</h2>
//             <p className="opacity-90">Verified • Experienced • Reliable</p>
//           </div>

//           {/* Search Bar */}
//           <div className="px-4 mt-5">
//             <div className="bg-white rounded-full p-3 flex items-center shadow-md">
//               <IonIcon icon={searchOutline} className="text-indigo-600 text-xl" />
//               <input
//                 type="text"
//                 placeholder="Search maids..."
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 className="ml-2 w-full focus:outline-none text-gray-700 bg-transparent"
//               />
//             </div>
//           </div>

//           {/* ---------------- Filter by Service ---------------- */}
//           <div className="px-4 mt-6">
//             <h3 className="text-xl font-semibold mb-3">Filter by Service</h3>

//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { name: "Cleaning", icon: "🧹", bg: "from-indigo-400 to-indigo-600" },
//                 { name: "Cooking", icon: "🍽️", bg: "from-orange-400 to-orange-600" },
//                 { name: "Baby Sitter", icon: "👩‍🍼", bg: "from-pink-400 to-pink-600" },
//                 { name: "Elder Care", icon: "🧓", bg: "from-green-400 to-green-600" }
//               ].map((service) => (
//                 <button
//                   key={service.name}
//                   onClick={() => toggleService(service.name)}
//                   className={`
//                     p-3 rounded-xl text-center shadow-md font-medium flex items-center justify-center gap-2
//                     transition transform hover:scale-105
//                     ${
//                       selectedServices.includes(service.name)
//                         ? `bg-linear-to-r ${service.bg} text-white shadow-lg`
//                         : "bg-white text-gray-800 border border-gray-200"
//                     }
//                   `}
//                 >
//                   <span className="text-xl">{service.icon}</span>
//                   {service.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ---------------- Maid List ---------------- */}
//           <div className="mt-8 px-4 flex justify-between items-center">
//             <h3 className="text-xl font-bold">
//               {selectedServices.length > 0
//                 ? `Filtered Maids`
//                 : "All Maids"}
//             </h3>

//             <button
//               onClick={() => history.push("/maid-list")}
//               className="text-sm px-4 py-1 rounded-full bg-indigo-600 text-white shadow hover:bg-indigo-700"
//             >
//               Show More →
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 mt-3 pb-6">
//             {filteredMaids.map((maid) => (
//               <div
//                 key={maid.id}
//                 onClick={() => setSelectedMaid(maid)}
//                 className="bg-white rounded-xl shadow p-4 flex items-center gap-4 cursor-pointer hover:bg-indigo-50 transition"
//               >
//                 <img src={maid.image} className="w-16 h-16 rounded-full object-cover" />

//                 <div>
//                   <h4 className="font-semibold">{maid.name}</h4>
//                   <p className="text-sm text-gray-600">{maid.experience}</p>
//                   <p className="text-sm text-gray-500">{maid.location}</p>
//                   <div className="text-yellow-500">{"⭐".repeat(maid.rating)}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </IonContent>

//         {/* ---------------- Bottom Navigation ---------------- */}
//         <IonFooter className="bg-white border-t">
//           <div className="flex justify-around text-gray-500 py-3">
//             <div onClick={() => history.push("/profile")} className="flex flex-col items-center">
//               <IonIcon icon={personCircleOutline} className="text-2xl" />
//               <span className="text-sm">Profile</span>
//             </div>

//             <div onClick={() => history.push("/chat")} className="flex flex-col items-center">
//               <IonIcon icon={chatbubbleEllipsesOutline} className="text-2xl" />
//               <span className="text-sm">Chat</span>
//             </div>

//             <div className="flex flex-col items-center text-indigo-600">
//               <IonIcon icon={homeOutline} className="text-2xl" />
//               <span className="text-sm font-semibold">Home</span>
//             </div>
//           </div>
//         </IonFooter>

//         {/* ---------------- Maid Modal ---------------- */}
//         <IonModal isOpen={selectedMaid !== null} onDidDismiss={() => setSelectedMaid(null)}>
//           {selectedMaid && (
//             <div className="p-5 bg-white h-full overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold">{selectedMaid.name}</h3>
//                 <IonButton fill="clear" onClick={() => setSelectedMaid(null)}>
//                   <IonIcon icon={closeOutline} className="text-xl" />
//                 </IonButton>
//               </div>

//               <img src={selectedMaid.image} className="w-full h-48 object-cover rounded-lg mb-3" />

//               <p><strong>Category:</strong> {selectedMaid.category}</p>
//               <p><strong>Experience:</strong> {selectedMaid.experience}</p>
//               <p><strong>Location:</strong> {selectedMaid.location}</p>

//               <IonButton
//                 expand="block"
//                 color="primary"
//                 className="mt-5"
//                 onClick={() => handleChat(selectedMaid)}
//               >
//                 Chat with {selectedMaid.name}
//               </IonButton>
//             </div>
//           )}
//         </IonModal>

//         {/* ---------------- Logout Modal ---------------- */}
//         {showLogoutModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
//               <h2 className="text-lg font-bold mb-4">Logout</h2>
//               <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>

//               <div className="flex justify-end gap-4">
//                 <IonButton fill="outline" onClick={() => setShowLogoutModal(false)}>No</IonButton>
//                 <IonButton color="danger" onClick={handleLogout}>Yes</IonButton>
//               </div>
//             </div>
//           </div>
//         )}
//       </IonPage>
//     </>
//   );
// }

// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonButtons,
//   IonMenuButton,
//   IonContent,
//   IonIcon,
//   IonSpinner
// } from "@ionic/react";

// import { locationOutline, searchOutline } from "ionicons/icons";

// import {
//   FaBroom,
//   FaUtensils,
//   FaBaby,
//   FaUserNurse,
//   FaHandsHelping,
//   FaHome
// } from "react-icons/fa";

// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// import banner1 from "../assets/dashboard1.jpg";
// import banner2 from "../assets/home3.jpg";
// import banner3 from "../assets/maid1.jpg";
// import Logo from "../assets/logo.jpg";

// const API_BASE = "http://192.168.0.187:9830";

// export default function SeekerHome() {
//   const history = useHistory();

//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");
//   const [area, setArea] = useState("");
//   const [services, setServices] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const banners = [banner1, banner2, banner3];
//   const [currentBanner, setCurrentBanner] = useState(0);

//   /* Banner Auto Slide */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length);
//     }, 3500);
//     return () => clearInterval(interval);
//   }, []);

//   /* Fetch Profile */
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("access_token");
//       if (!token) return history.push("/login");

//       const res = await fetch(`${API_BASE}/profiles/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();
//       const profile = data.profile;

//       setName(profile?.name || "");
//       setCity(profile?.city || "");
//       setArea(profile?.area || "");
//     };

//     fetchProfile();
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     setLoading(true);
//     const res = await fetch(`${API_BASE}/services/getall`);
//     const data = await res.json();
//     setServices(data);
//     setLoading(false);
//   };

//   /* Color Mapping */
//   const serviceColors = [
//     "from-pink-500 to-rose-500",
//     "from-indigo-500 to-purple-500",
//     "from-orange-400 to-amber-500",
//     "from-green-400 to-emerald-500",
//     "from-blue-400 to-cyan-500",
//     "from-fuchsia-500 to-purple-600"
//   ];

//   const getServiceIcon = (name: string) => {
//     switch (name.toLowerCase()) {
//       case "cleaning":
//         return <FaBroom size={22} />;
//       case "cooking":
//         return <FaUtensils size={22} />;
//       case "baby sitting":
//         return <FaBaby size={22} />;
//       case "elder care":
//         return <FaUserNurse size={22} />;
//       case "home care":
//         return <FaHome size={22} />;
//       default:
//         return <FaHandsHelping size={22} />;
//     }
//   };

//   return (
//     <IonPage>

//       {/* HEADER */}
//       <IonHeader>
//         <IonToolbar className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-3">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center gap-3">
//               <img src={Logo} className="w-10 h-10 rounded-full shadow-lg border-2 border-white" />
//               <div>
//                 <p className="text-white text-xs">Welcome back 👋</p>
//                 <p className="text-white font-bold text-lg">{name}</p>
//               </div>
//             </div>
//             <IonButtons>
//               <IonMenuButton />
//             </IonButtons>
//           </div>
//         </IonToolbar>
//       </IonHeader>

//       {/* CONTENT */}
//       <IonContent className="bg-gradient-to-b from-pink-50 to-indigo-50">

//         {/* SLIDER */}
//         <div className="relative h-56">
//           <img
//             src={banners[currentBanner]}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/40" />
//         </div>

//         {/* LOCATION CARD (FIXED POSITION) */}
//         <div className="px-4 mt-4">
//           <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
//             <div className="bg-indigo-100 p-3 rounded-full">
//               <IonIcon icon={locationOutline} className="text-indigo-600 text-xl" />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Your Location</p>
//               <p className="font-semibold text-gray-800">
//                 {city}, {area}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* SEARCH */}
//         <div className="px-4 mt-6">
//           <div className="bg-white rounded-full shadow-lg p-3 flex items-center">
//             <IonIcon icon={searchOutline} className="text-gray-400 text-xl" />
//             <input
//               type="text"
//               placeholder="Search service or helper..."
//               className="ml-3 w-full outline-none bg-transparent"
//             />
//           </div>
//         </div>

//         {/* SERVICES */}
//         <div className="px-4 mt-8">
//           <h2 className="text-lg font-bold mb-4 text-gray-700">
//             Book a Service
//           </h2>

//           {loading ? (
//             <IonSpinner />
//           ) : (
//             <div className="grid grid-cols-3 gap-4">
//               {services.map((service, index) => (
//                 <div
//                   key={service.id}
//                   onClick={() => history.push(`/service/${service.id}`)}
//                   className="rounded-2xl p-4 shadow-lg text-white flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
//                   style={{
//                     background: `linear-gradient(to right, var(--tw-gradient-stops))`,
//                   }}
//                 >
//                   <div
//                     className={`bg-gradient-to-r ${serviceColors[index % serviceColors.length]} p-5 rounded-2xl w-full flex flex-col items-center`}
//                   >
//                     {getServiceIcon(service.name)}
//                     <p className="text-xs font-semibold mt-2 text-center">
//                       {service.name}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* RECOMMENDED */}
//         <div className="px-4 mt-10 pb-10">
//           <h2 className="text-lg font-bold mb-4 text-gray-700">
//             Recommended Helpers
//           </h2>

//           <div className="space-y-4">
//             {[1, 2, 3].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 hover:shadow-xl transition"
//               >
//                 <img
//                   src="https://i.pravatar.cc/100"
//                   className="w-16 h-16 rounded-full object-cover border-2 border-pink-300"
//                 />
//                 <div className="flex-1">
//                   <p className="font-semibold text-gray-800">
//                     Sita Devi
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Dhaka • 5 yrs exp
//                   </p>
//                   <p className="text-yellow-500 text-sm">
//                     ⭐⭐⭐⭐⭐
//                   </p>
//                 </div>
//                 <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-semibold">
//                   View
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </IonContent>
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

export default function SeekerHome() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [services, setServices] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const banners = [banner1, banner2, banner3];
  const [currentBanner, setCurrentBanner] = useState(0);

  /* Banner Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  /* Initial Load */
  useEffect(() => {
    fetchProfile();
    fetchServices();
    fetchRecommended();
  }, []);

  /* FETCH PROFILE */
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

  /* FETCH SERVICES */
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

  /* FETCH RECOMMENDED */
  const fetchRecommended = async () => {
    try {
      const res = await fetch(`${API_BASE}/helpers/recommended`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setRecommended(data);
      } else if (Array.isArray(data?.helpers)) {
        setRecommended(data.helpers);
      } else {
        setRecommended([]);
      }
    } catch (error) {
      console.log("Recommended error:", error);
      setRecommended([]);
    }
  };

  /* Service Colors */
  const serviceColors = [
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-purple-500",
    "from-orange-400 to-amber-500",
    "from-green-400 to-emerald-500",
    "from-blue-400 to-cyan-500",
    "from-fuchsia-500 to-purple-600"
  ];

  const getServiceIcon = (name: string) => {
    switch (name?.toLowerCase()) {
      case "cleaning":
        return <FaBroom size={24} />;
      case "cooking":
        return <FaUtensils size={24} />;
      case "baby sitting":
        return <FaBaby size={24} />;
      case "elder care":
        return <FaUserNurse size={24} />;
      case "home care":
        return <FaHome size={24} />;
      default:
        return <FaHandsHelping size={24} />;
    }
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

          <IonItem button routerLink="/preferences" className="rounded-lg hover:bg-indigo-100">
            <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
            <IonLabel>Preferences</IonLabel>
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

    {/* ================= CONTENT ================= */}
    <IonContent id="main-content" className="bg-linear-to-b from-pink-50 to-indigo-50">

      {/* Banner Slider */}
      <div className="relative h-56">
        <img
          src={banners[currentBanner]}
          className="w-full h-full object-cover"
          alt="banner"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Location Card */}
      <div className="px-4 mt-6">
        <div className="bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <IonIcon icon={locationOutline} className="text-xl" />
          </div>
          <div>
            <p className="text-xs opacity-80">Your Location</p>
            <p className="font-semibold">{city}, {area}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-full shadow-lg p-3 flex items-center border-2 border-indigo-300 focus-within:border-purple-500 transition">
          <IonIcon icon={searchOutline} className="text-indigo-500 text-xl" />
          <input
            type="text"
            placeholder="Search service or helper..."
            className="ml-3 w-full outline-none bg-transparent text-gray-700"
          />
        </div>
      </div>

      {/* Services */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Book a Service</h2>

        {loading ? (
          <IonSpinner />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {services.length === 0 && (
              <p className="text-gray-400 col-span-3 text-center">
                No services available
              </p>
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

      {/* Recommended Helpers */}
      <div className="px-4 mt-10 pb-10">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Recommended Helpers</h2>

        {recommended.length === 0 && (
          <p className="text-gray-400 text-center">No recommended helpers found</p>
        )}

        {recommended.map((helper) => (
          <div
            key={helper?.id}
            className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 mb-4 hover:shadow-xl transition"
          >
            <img
              src={helper?.image || "https://i.pravatar.cc/100"}
              className="w-16 h-16 rounded-full object-cover border-2 border-pink-300"
              alt="helper"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{helper?.name}</p>
              <p className="text-sm text-gray-500">
                {helper?.city || "Dhaka"} • {helper?.experience || 0} yrs exp
              </p>
              <p className="text-yellow-500 text-sm">⭐⭐⭐⭐⭐</p>
            </div>
            <button
              onClick={() => history.push(`/helper/${helper?.id}`)}
              className="bg-pink-500 text-white px-4 py-1 rounded-full text-xs font-semibold"
            >
              View
            </button>
          </div>
        ))}
      </div>

    </IonContent>
  </IonPage>
)
};