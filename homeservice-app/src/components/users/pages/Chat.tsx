
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonButton,
  IonLabel,
  IonInput,
  IonSpinner,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonItem,
IonAvatar
} from "@ionic/react";

import { searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import DefaultAvatar from "../../assets/profile.png";
import { FaCalendarAlt, FaCog, FaComment, FaHeadset, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { closeOutline } from "ionicons/icons";
const API_BASE = "http://192.168.0.187:9830";

export default function ChatPage() {
  const history = useHistory();

  const [helpers, setHelpers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
 const [registrationId, setRegistrationId] = useState("");
 const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [avgRating, setAvgRating] = useState("0");
  const [ratingCount, setRatingCount] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchChatBookings();
  }, []);
// Fetch profile info
useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      history.push("/login");
      return;
    }

    setLoading(true);

    try {
      // Profile data API
      const response = await fetch("http://192.168.0.187:9830/profiles/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Failed to load profile");

      setRegistrationId(data.registration_id || "");
      // setRole(data.role || "");
      // setCapacity(data.capacity || "");
      // setProfileKind(data.profile_kind || "");

      const profile = data.profile;

      setName(profile?.name || "");
      setCity(profile?.city || "");
      setArea(profile?.area || "");
      setAvgRating(profile?.avg_rating || "0");
      setRatingCount(profile?.rating_count || 0);

      // Profile image API
      const imageRes = await fetch(
        "http://192.168.0.187:9830/profiles/picture/base64",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const imageData = await imageRes.json();

      if (imageRes.ok && imageData?.image_base64) {
        setProfileImage(imageData.image_base64);
      }

    } catch (err: any) {
      setToast(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [history]);
  // ✅ FETCH CHAT BOOKINGS
  const fetchChatBookings = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(`${API_BASE}/chat/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (data.status === "success") {
        const enriched: any[] = [];

        for (const chat of data.chats) {

          const registrationId = chat.other_party_registration_id;

          if (!registrationId || registrationId === "None") continue;

          const helperRes = await fetch(
            `${API_BASE}/helper/helper-details/${registrationId}`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );

          const helperData = await helperRes.json();

          enriched.push({
            booking_id: chat.booking_id,
            registrationId,
            name: helperData.profile?.name || "Helper",
            profile_picture:
              helperData.account_info?.profile_picture || DefaultAvatar,
            phone: helperData.profile?.phone || ""
          });
        }

        setHelpers(enriched);
      }
    } catch (err) {
      console.log("Error fetching chat bookings:", err);
    }

    setLoading(false);
  };

  // 🔍 SEARCH
  const filteredHelpers = helpers.filter((h) =>
    h.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
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
                 <p className="text-yellow-800 dark:text-yellow-300 text-sm opacity-80">
                  Welcome 👋
                 </p>
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

      {/* CONTENT */}
{/* <IonContent
  style={{
    "--background": "linear-gradient(to bottom right, #a7f3d0, #4ade80, #16a34a)", // soft green gradient
  }}
  className="p-4"
> */}
<IonContent
  style={{
   "--background": "linear-gradient(to bottom right, #d1fae5, #86efac, #4ade80)"
  
  }}
  className="p-4"
>
  {/* SEARCH */}
  <div className="relative mb-5">
    <IonIcon
      icon={searchOutline}
      className="absolute left-4 top-3.5 text-green-800"
    />

    <IonInput
      value={searchText}
      placeholder="Search helper..."
      onIonInput={(e: any) => setSearchText(e.target.value)}
      className="pl-10 pr-4 py-3 w-full 
        bg-green-50 dark:bg-green-900 
        border border-green-300 dark:border-green-700
        rounded-xl shadow-md focus:shadow-lg transition-all duration-200"
    />
  </div>

  {/* LOADING */}
  {loading && (
    <div className="flex justify-center mt-10">
      <IonSpinner color="success" />
    </div>
  )}

  {/* EMPTY STATE */}
 {!loading && filteredHelpers.length === 0 && (
  <div
    className="text-center mt-20 p-6 rounded-xl shadow"
    style={{
      backgroundColor: "rgba(255, 245, 238, 0.8)", // soft cream/pastel
      border: "1px solid rgba(255, 215, 200, 0.6)", // subtle border
    }}
  >
    <p className="text-pink-600 dark:text-pink-300 text-lg font-medium">
      No booking users found 😔
    </p>
    <p className="text-pink-400 dark:text-pink-300 text-sm mt-2">
      Start booking to chat with helpers
    </p>
  </div>
)}
  {/* LIST */}
  <div className="space-y-4">
    {filteredHelpers.map((helper, i) => (
      <div
        key={i}
        className="flex justify-between items-center 
          bg-white dark:bg-green-950 
          p-3 rounded-2xl 
          shadow-md hover:shadow-lg 
          border border-green-200 dark:border-green-700
          transition-all duration-200"
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* CIRCLE PROFILE PIC */}
          <IonAvatar className="w-12 h-12">
            <img
              src={helper.profile_picture}
              className="w-full h-full object-cover rounded-full border-2 border-green-400 dark:border-green-600"
            />
          </IonAvatar>

          <div>
            <p className="font-semibold text-gray-800 dark:text-green-100 text-sm">
              {helper.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-green-300">
              {helper.phone}
            </p>
          </div>
        </div>

        {/* CHAT BUTTON */}
        <IonButton
          size="small"
          className="bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-full px-4 shadow-md hover:shadow-lg transition-all"
          onClick={() =>
            history.push(
              `/helper-chat/${helper.booking_id}/${helper.registrationId}`
            )
          }
        >
          💬 Chat
        </IonButton>
      </div>
    ))}
  </div>
</IonContent>
    </IonPage>
  );
}