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
//   FaSignOutAlt,FaClipboardList,
//   FaCalendarAlt,
//   FaHeadset
// } from "react-icons/fa";

// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// import banner1 from "../assets/dashboard1.jpg";
// import banner2 from "../assets/home3.jpg";
// import banner3 from "../assets/maid1.jpg";
// import Logo from "../assets/logo.jpg";
// import { eyeOutline } from "ionicons/icons";
// const API_BASE = "http://192.168.0.187:9830";

// export default function HelperHome() {
//   const history = useHistory();

//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");
//   const [area, setArea] = useState("");
//   const [services, setServices] = useState<any[]>([]);
//   const [recommendedSeekers, setRecommendedSeekers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingSeekers, setLoadingSeekers] = useState(false);
// const [searchText, setSearchText] = useState("");
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
//       setCity(profile.city || "Kolkata");
//       setArea(profile.area || "");
//     } catch (error) {
//       console.log("Profile error:", error);
//     }
//   };

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

//   const fetchRecommendedSeekers = async () => {
//     try {
//       setLoadingSeekers(true);
//       const token = localStorage.getItem("access_token");
//       const res = await fetch(`${API_BASE}/helper/find-my-seekers`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setRecommendedSeekers(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.log("Error fetching seekers:", error);
//       setRecommendedSeekers([]);
//     } finally {
//       setLoadingSeekers(false);
//     }
//   };

//   const serviceColors = [
//     "from-red-400 to-pink-500",
//     "from-yellow-400 to-orange-500",
//     "from-green-400 to-teal-500",
//     "from-blue-400 to-indigo-500",
//     "from-purple-400 to-fuchsia-500",
//     "from-pink-400 to-rose-500"
//   ];

//   const getServiceIcon = (name: string) => {
//     switch (name?.toLowerCase()) {
//       case "cleaning": return <FaBroom size={24} />;
//       case "cooking": return <FaUtensils size={24} />;
//       case "baby sitting": return <FaBaby size={24} />;
//       case "elder care": return <FaUserNurse size={24} />;
//       case "home care": return <FaHome size={24} />;
//       default: return <FaHandsHelping size={24} />;
//     }
//   };
// const filteredServices = services.filter((service) =>
//   service?.name?.toLowerCase().includes(searchText.toLowerCase())
// );
//   return (
//     <IonPage>

//       {/* SIDE MENU */}
//       <IonMenu side="end" contentId="main-content" type="overlay">
//         <IonHeader>
//           <IonToolbar className="bg-linear-to-r from-red-500 to-pink-600 px-4">
//             <div className="flex items-center justify-between w-full">
//               <IonTitle className="text-indigo-500 font-bold text-lg">HelperGo</IonTitle>
//               <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
//                 <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
//               </IonButton>
//             </div>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent className="bg-red-50">
//           <div className="flex flex-col p-3 space-y-2">
//             <IonItem button routerLink="/helper-home" className="rounded-lg hover:bg-red-100">
//               <FaHome className="text-red-600 w-5 h-5 mr-3" />
//               <IonLabel>Home / হোম</IonLabel>
//             </IonItem>
//             <IonItem button routerLink="/maid-profile" className="rounded-lg hover:bg-red-100">
//               <FaUser className="text-orange-400 w-5 h-5 mr-3" />
//               <IonLabel>Profile / প্রোফাইল</IonLabel>
//             </IonItem>
//             <IonItem button routerLink="/maid-chat" className="rounded-lg hover:bg-red-100">
//               <FaComment className="text-pink-600 w-5 h-5 mr-3" />
//               <IonLabel>Chat / চ্যাট</IonLabel>
//             </IonItem>
//             <IonItem button routerLink="/seeker-list" className="rounded-lg hover:bg-red-100">
//               <FaUsers className="text-purple-600 w-5 h-5 mr-3" />
//               <IonLabel>Seeker List / খোঁজকারী তালিকা</IonLabel>
//             </IonItem>
//                <IonItem button routerLink="/helper-bookings" className="rounded-lg hover:bg-red-100">
//               <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
//               <IonLabel>Bookings / বুকিংসমূহ</IonLabel>
//             </IonItem>
//             <IonItem button routerLink="/maid-preferences" className="rounded-lg hover:bg-red-100">
//               <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
//               <IonLabel>Preferences / পছন্দসমূহ</IonLabel>
//             </IonItem>

// <IonItem button routerLink="/support-system" className="rounded-lg hover:bg-red-100">
//   <FaHeadset className="text-green-600 w-5 h-5 mr-3" />
//   <IonLabel>Help Desk / সহায়তা কেন্দ্র</IonLabel>
// </IonItem>
//             <IonItem
//               button
//               className="rounded-lg hover:bg-red-200"
//               onClick={() => {
//                 localStorage.removeItem("access_token");
//                 history.push("/login");
//               }}
//             >
//               <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
//               <IonLabel>Logout / লগ আউট</IonLabel>
//             </IonItem>
//           </div>
//         </IonContent>
//       </IonMenu>

//       {/* HEADER */}
//       <IonHeader>
//         <IonToolbar className="bg-linear-to-r from-yellow-400 via-red-400 to-pink-500 px-4 py-3">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center gap-3">
//               <img src={Logo} className="w-10 h-10 rounded-full shadow-lg border-2 border-white" alt="logo"/>
//               <div>
//                 <p className="text-pink-500 text-s opacity-80">Welcome 👋 / স্বাগতম</p>
//                 <p className="font-bold text-lg text-red-600">{name || "User"}</p>
//               </div>
//             </div>
//             <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.open()}>
//               <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
//                 <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z" clipRule="evenodd"/>
//                 </svg>
//               </div>
//             </IonButton>
//           </div>
//         </IonToolbar>
//       </IonHeader>

//       {/* CONTENT */}
//       <IonContent id="main-content" className="bg-linear-to-b from-yellow-50 to-pink-50">

//         {/* Banner Slider */}
//         <div className="relative h-56">
//           <img src={banners[currentBanner]} className="w-full h-full object-cover" alt="banner" />
//           <div className="absolute inset-0 bg-black/30" />
//         </div>

//         {/* Location Card */}
//         <div className="px-4 mt-6">
//           <div className="bg-linear-to-r from-green-400 to-teal-500 text-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
//             <div className="bg-white/30 p-3 rounded-full">
//               <IonIcon icon={locationOutline} className="text-xl" />
//             </div>
//             <div>
//               <p className="text-xs opacity-90">Your Location / আপনার অবস্থান</p>
//               <p className="font-semibold">{city}, {area}</p>
//             </div>
//           </div>
//         </div>


//         {/* Search Bar */}
// {/* <div className="px-4 mt-6">
//   <div className="bg-white rounded-full shadow-lg p-3 flex items-center border-2 border-indigo-300 focus-within:border-purple-500 transition">
//     <IonIcon icon={searchOutline} className="text-indigo-500 text-xl" />

//     <input
//       type="text"
//       placeholder="Search service..."
//       value={searchText}
//       onChange={(e) => setSearchText(e.target.value)}
//       className="ml-3 w-full outline-none bg-transparent text-gray-700"
//     />
//   </div>
// </div> */}
// <div className="px-4 mt-6">
//   <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3 flex items-center 
//                   border-2 border-indigo-300 dark:border-gray-600 
//                   focus-within:border-purple-500 dark:focus-within:border-purple-400 transition">

//     <IonIcon 
//       icon={searchOutline} 
//       className="text-indigo-500 dark:text-gray-300 text-xl" 
//     />

//     <input
//       type="text"
//       placeholder="Search service..."
//       value={searchText}
//       onChange={(e) => setSearchText(e.target.value)}
//       className="ml-3 w-full outline-none bg-transparent 
//                  text-gray-700 dark:text-gray-200 
//                  placeholder-gray-400 dark:placeholder-gray-500"
//     />
//   </div>
// </div>

//         {/* Services */}
//         <div className="px-4 mt-8">
//           <h2 className="text-lg font-bold mb-4 text-green-800">Available Services / উপলব্ধ সার্ভিস</h2>
//           {loading ? (
//             <IonSpinner />
//           ) : (
//             <div className="grid grid-cols-3 gap-4">
//               {/* {services.length === 0 && ( */}
//               {filteredServices.length === 0 && (
//                 <p className="text-gray-400 col-span-3 text-center">No services available / কোন সার্ভিস নেই</p>
//               )}
//               {/* {services.map((service, index) => ( */}
//            {filteredServices.map((service, index) => {
//     const serviceId = service?.id; // Make sure this is the correct ID field

//     return (
//       <div
//         key={serviceId || index} // fallback to index if id missing
//         onClick={() => {
//           if (!serviceId) {
//             console.warn("Service ID is missing!");
//             return; // prevent navigation if no ID
//           }
//           // Navigate to the service-seeker page with correct ID
//           history.push(`/service-seeker/${serviceId}`);
//         }}
//         className={`cursor-pointer bg-linear-to-r ${serviceColors[index % serviceColors.length]} text-white rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300`}
//       >
//         <div className="bg-white/20 p-3 rounded-full mb-2">
//           {getServiceIcon(service?.name)}
//         </div>
//         <p className="text-xs font-semibold text-center">{service?.name}</p>
//       </div>
//     );
//   })}
// </div>
//   )}
//       </div>

//         {/* Recommended Seekers */}
//         <div className="px-4 mt-10 pb-10">
//           <h2 className="text-lg font-bold mb-4 text-green-800">Recommended Seekers / প্রস্তাবিত খোঁজকারী</h2>
//           {loadingSeekers ? (
//             <IonSpinner />
//           ) : recommendedSeekers.length === 0 ? (
//             <p className="text-gray-400 text-center">No recommended seekers found / কোন প্রস্তাবিত খোঁজকারী নেই</p>
//           ) : (
//             recommendedSeekers.map((s) => {
//               const seeker = s.seeker_info;
//               const loc = s.location;
//               // Use profile_pic if available
//   const seekerImage = seeker.profile_pic
//     ? seeker.profile_pic
//     : "https://i.pravatar.cc/100";

//               return (
//                <div
//   key={seeker.registration_id + s.match_details.matched_on_service}
//   className="bg-linear-to-r from-white to-gray-100 rounded-2xl shadow-md p-4 flex items-center gap-4 mb-4 hover:shadow-xl transition cursor-pointer"
//   onClick={() => history.push(`/seeker/${seeker.registration_id}`)}
// >
//   {/* Seeker Image */}
//    <img
//         src={seekerImage}
//         className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
//         alt={seeker.name}
//       />

//   {/* Seeker Info */}
//   <div className="flex-1">
//     <p className="font-semibold text-gray-800">{seeker.name}</p>
//     <p className="text-sm text-gray-600">{loc.city}, {loc.area}</p>
   
//     <div>
//   <p className="text-green-600 text-sm font-medium mb-1">
//     Match Score: {s.match_details.score}
//   </p>
//   <div className="flex flex-wrap gap-2">
//     {s.match_details.matched_services.map((service: string) => (
//       <span
//         key={service}
//         className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-semibold"
//       >
//         {service}
//       </span>
//     ))}
//   </div>
// </div>
//   </div>

//   {/* Ionic View Button */}
//  <IonButton
//   fill="solid"
//   color="success"
//   size="small"
//   onClick={(e) => {
//     e.stopPropagation();
//     history.push(`/seeker/${seeker.registration_id}`);
//   }}
//   className="flex items-center gap-1"
// >
//   <IonIcon slot="start" icon={eyeOutline} />
//   View
// </IonButton>
// </div>
//               );
//             })
//           )}
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

import { closeOutline, locationOutline, searchOutline, notificationsOutline, eyeOutline } from "ionicons/icons";

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

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import banner1 from "../assets/dashboard1.jpg";
import banner2 from "../assets/home3.jpg";
import banner3 from "../assets/maid1.jpg";
import Logo from "../assets/logo.jpg";

const API_BASE = "http://192.168.0.187:9830";

interface Notification {
  id: string;
  title: string;
  content: string;
  is_read: boolean;
  is_ws: boolean;
  created_at: string;
}

export default function HelperHome() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [services, setServices] = useState<any[]>([]);
  const [recommendedSeekers, setRecommendedSeekers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSeekers, setLoadingSeekers] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [missedCount, setMissedCount] = useState(0);
  const [liveNotification, setLiveNotification] = useState<Notification | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
    const fetchAll = async () => {
      await fetchProfile();
      await fetchServices();
      await fetchRecommendedSeekers();
      await fetchMissedNotifications();
    };
    fetchAll();
  }, []);

  // Profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return history.push("/login");

      const res = await fetch(`${API_BASE}/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const profile = data?.profile || {};
      setName(profile.name || "User");
      setCity(profile.city || "Kolkata");
      setArea(profile.area || "");
      setRegistrationId(profile.registration_id);
    } catch (error) {
      console.log("Profile error:", error);
    }
  };

  // Services
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

  // Recommended Seekers
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

  // Missed notifications
  const fetchMissedNotifications = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/notifications/missed`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      const count =
        data?.data?.count ||
        data?.count ||
        (Array.isArray(data) ? data.length : 0);

      setMissedCount(count);
    } catch (err) {
      console.error("Missed notification error:", err);
    }
  };

  // WebSocket for live notifications
  useEffect(() => {
    if (!registrationId) return;

    const ws = new WebSocket(
      `ws://192.168.0.187:9830/notifications/ws/${registrationId}`
    );

    ws.onopen = () => console.log("WS connected");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        const newNotification: Notification = {
          id: data.id || Date.now().toString(),
          title: data.title || data.message || "New Notification",
          content: data.content || data.message || "You have a new notification",
          is_read: false,
          is_ws: true,
          created_at: data.created_at || new Date().toISOString(),
        };

        setNotifications((prev) => {
          const exists = prev.find((n) => n.id === newNotification.id);
          if (exists) return prev;
          return [newNotification, ...prev];
        });

        setMissedCount((prev) => prev + 1);

        // Show popup
        setLiveNotification(newNotification);
        setTimeout(() => setLiveNotification(null), 3000);

      } catch (err) {
        console.error("WS parse error:", err);
      }
    };

    ws.onerror = (err) => console.error("WS error:", err);
    ws.onclose = () => console.log("WS closed");

    return () => ws.close();
  }, [registrationId]);

  // Service colors and icons
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

  const filteredServices = services.filter((service) =>
    service?.name?.toLowerCase().includes(searchText.toLowerCase())
  );

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
              <IonLabel>Help Desk / সহায়তা কেন্দ্র</IonLabel>
            </IonItem>
            <IonItem button className="rounded-lg hover:bg-red-200"
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

            {/* Notification */}
            <div className="relative cursor-pointer" onClick={() => history.push("/helper-notification")}>
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full">
                <IonIcon icon={notificationsOutline} className="text-yellow-300 text-xl" />
              </div>
              {missedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {missedCount}
                </span>
              )}
            </div>

            {/* Hamburger */}
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

        {/* Live Notification Popup */}
        {liveNotification && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm p-4 rounded-xl bg-linear-to-r from-red-500 to-pink-500 shadow-2xl text-white border-l-4 border-yellow-400 flex flex-col gap-1 animate-fade-in">
            <h3 className="text-lg font-bold tracking-wide">{liveNotification.title}</h3>
            <p className="text-sm opacity-90">{liveNotification.content}</p>
            <div className="flex justify-end mt-1">
              <span className="text-xs opacity-70 italic">New</span>
            </div>
          </div>
        )}

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

        {/* Services */}
        <div className="px-4 mt-8">
          <h2 className="text-lg font-bold mb-4 text-green-800">Available Services / উপলব্ধ সার্ভিস</h2>
          {loading ? (
            <IonSpinner />
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredServices.length === 0 && (
                <p className="text-gray-400 col-span-3 text-center">No services available / কোন সার্ভিস নেই</p>
              )}
              {filteredServices.map((service, index) => (
                <div
                  key={service?.id || index}
                  onClick={() => history.push(`/service-seeker/${service?.id}`)}
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
              const seekerImage = seeker.profile_pic ? seeker.profile_pic : "https://i.pravatar.cc/100";

              return (
                <div
                  key={seeker.registration_id + s.match_details.matched_on_service}
                  className="bg-linear-to-r from-white to-gray-100 rounded-2xl shadow-md p-4 flex items-center gap-4 mb-4 hover:shadow-xl transition cursor-pointer"
                  onClick={() => history.push(`/seeker/${seeker.registration_id}`)}
                >
                  <img src={seekerImage} className="w-16 h-16 rounded-full object-cover border-2 border-gray-300" alt={seeker.name} />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{seeker.name}</p>
                    <p className="text-sm text-gray-600">{loc.city}, {loc.area}</p>
                    <div>
                      <p className="text-green-600 text-sm font-medium mb-1">
                        Match Score: {s.match_details.score}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {s.match_details.matched_services.map((service: string) => (
                          <span key={service} className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <IonButton fill="solid" color="success" size="small" onClick={(e) => { e.stopPropagation(); history.push(`/seeker/${seeker.registration_id}`); }} className="flex items-center gap-1">
                    <IonIcon slot="start" icon={eyeOutline} />
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