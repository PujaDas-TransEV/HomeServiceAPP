
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
const [recommendedHelpers, setRecommendedHelpers] = useState<any[]>([]);
const [loadingHelpers, setLoadingHelpers] = useState(false);
  /* Banner Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

 
useEffect(() => {
  // Profile fetch
  const fetchAll = async () => {
    await fetchProfile();           // User profile
    await fetchServices();          // Available services
  
    await fetchRecommendedHelpers(); // If seeker, fetch recommended helpers
  };

  fetchAll();
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
      setCity(profile.city || "Kolkata");
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

  
const fetchRecommendedHelpers = async () => {
  try {
    setLoadingHelpers(true); 
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const res = await fetch(`${API_BASE}/seeker/find-my-helpers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
   
    setRecommendedHelpers(Array.isArray(data) ? data : []);
  } catch (error) {
    console.log("Error fetching helpers:", error);
    setRecommendedHelpers([]);
  } finally {
    setLoadingHelpers(false);
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

   
<div className="px-4 mt-6">
  <h2 className="text-lg font-bold mb-4 text-blue-800">
    Recommended Helpers 
  </h2>

  {loadingHelpers ? (
    <IonSpinner />
  ) : recommendedHelpers.length === 0 ? (
    <p className="text-gray-400 text-center">
      No recommended helpers found 
    </p>
  ) : (
    recommendedHelpers.map((h) => {
      const helper = h.helper_info;
      const loc = h.location;
      const helperImage = helper.profile_pic
    ? helper.profile_pic
    : "https://i.pravatar.cc/100";

      return (
        <div
          key={helper.registration_id + h.match_details.matched_on_service}
          className="bg-linear-to-r from-white to-gray-100 rounded-2xl shadow-md p-4 flex items-center gap-4 mb-4 hover:shadow-xl transition cursor-pointer"
          onClick={() => history.push(`/helper/${helper.registration_id}`)}
        >
          {/* Helper Image */}
          <img
        src={helperImage}
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
        alt={helper.name}
      />

          {/* Helper Info */}
          <div className="flex-1">
            <p className="font-semibold text-gray-800">{helper.name}</p>
            <p className="text-sm text-gray-600">{loc.city}, {loc.area}</p>

            <div>
              <p className="text-blue-600 text-sm font-medium mb-1">
                Match Score: {h.match_details.score}
              </p>
              <div className="flex flex-wrap gap-2">
                {h.match_details.matched_services.map((service: string) => (
                  <span
                    key={service}
                    className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-semibold"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* View Button */}
        <IonButton
  fill="solid"
  color="primary"
  size="small"
  onClick={(e) => {
    e.stopPropagation(); // prevent parent click events
    const helperId = helper.registration_id; // make sure this exists
    if (helperId) {
      history.push(`/helper/${helperId}`); // matches route /helper/:helperId
    } else {
      console.warn("Helper ID is missing!");
    }
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
)
};