// import React, { useEffect, useState } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonBadge,
//   IonButton,
//   IonLabel,
//   IonInput,
//   IonSpinner,
//   IonMenu,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonIcon,
//   IonItem
// } from "@ionic/react";
// import axios from "axios";

// interface Booking {
//   id: string;
//   customer_name: string;
//   customer_phone: string;
//   customer_email: string;
//   address: string;
//   city: string;
//   area: string;
//   pin_code: string;
//   service_name: string;
// helper_reg_id: string;
//   booking_date: string;
//   time_slot: string;
//   duration: string;
//   work_details: string;
//   preferences: string;
//   payment_method: string;
//   total_price: string;
//   status: string;
//   created_at?: string;
//   helper_name:string;
// }
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
//   FaCalendarAlt
// } from "react-icons/fa";
// import { useHistory } from "react-router-dom";
// import Logo from "../../assets/logo.jpg";
// import { closeOutline, locationOutline, searchOutline } from "ionicons/icons";
// const MyBookingsPage: React.FC = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [rating, setRating] = useState<{ [key: string]: number }>({});
//    const token = localStorage.getItem("access_token");
//   const history = useHistory();
//   // Fetch bookings
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://192.168.0.187:9830/bookings/my-bookings", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBookings(res.data);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // Cancel booking
//   const cancelBooking = async (bookingId: string) => {
//     try {
//       await axios.patch(
//         `http://192.168.0.187:9830/bookings/${bookingId}/cancel`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchBookings(); // refresh
//     } catch (err) {
//       console.error("Error cancelling booking:", err);
//     }
//   };

//   return (
//     <IonPage>
//  <IonMenu side="end" contentId="main-content" type="overlay">
//       <IonHeader>
//         <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
//           <div className="flex items-center justify-between w-full">
//             <IonTitle className="text-purple-600 font-bold text-lg">
//               HelperGo
//             </IonTitle>
//             <IonButton
//               fill="clear"
//               onClick={() => document.querySelector("ion-menu")?.close()}
//             >
//               <IonIcon icon={closeOutline} className="text-pink-600 text-xl" />
//             </IonButton>
//           </div>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="bg-indigo-50">
//         <div className="flex flex-col p-3 space-y-2">
//           <IonItem button routerLink="/home" className="rounded-lg hover:bg-indigo-100">
//             <FaHome className="text-purple-600 w-5 h-5 mr-3" />
//             <IonLabel>Home</IonLabel>
//           </IonItem>

//           <IonItem button routerLink="/profile" className="rounded-lg hover:bg-indigo-100">
//             <FaUser className="text-indigo-600 w-5 h-5 mr-3" />
//             <IonLabel>Profile</IonLabel>
//           </IonItem>

//           <IonItem button routerLink="/chat" className="rounded-lg hover:bg-indigo-100">
//             <FaComment className="text-pink-600 w-5 h-5 mr-3" />
//             <IonLabel>Chat</IonLabel>
//           </IonItem>

//           <IonItem button routerLink="/maid-list" className="rounded-lg hover:bg-indigo-100">
//             <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
//             <IonLabel>Helper List</IonLabel>
//           </IonItem>
// <IonItem button routerLink="/my-bookings" className="rounded-lg hover:bg-indigo-100">
//   <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
//   <IonLabel>My Bookings</IonLabel>
// </IonItem>
//           <IonItem button routerLink="/preferences" className="rounded-lg hover:bg-indigo-100">
//             <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
//             <IonLabel>Preferences</IonLabel>
//           </IonItem>

//           <IonItem
//             button
//             className="rounded-lg hover:bg-red-100"
//             onClick={() => {
//               localStorage.removeItem("access_token");
//               history.push("/login");
//             }}
//           >
//             <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
//             <IonLabel className="text-red-500">Logout</IonLabel>
//           </IonItem>
//         </div>
//       </IonContent>
//     </IonMenu>

//     {/* ================= HEADER ================= */}
//     <IonHeader>
//       <IonToolbar className="bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-3">
//         <div className="flex justify-between items-center w-full">

//           {/* LEFT → User Welcome */}
//           <div className="flex items-center gap-3">
//             <img
//               src={Logo}
//               className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
//               alt="logo"
//             />
//             <div>
//               <p className="text-yellow-800 text-s opacity-80">Welcome back 👋</p>
//               {/* <p className="text-indigo-500 font-bold text-lg">{name || "User"}</p> */}
//             </div>
//           </div>

//           {/* RIGHT → Hamburger */}
//           <IonButton
//             fill="clear"
//             onClick={() => document.querySelector("ion-menu")?.open()}
//           >
//             <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
//               <svg
//                 className="w-6 h-6 text-pink-600"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </IonButton>

//         </div>
//       </IonToolbar>
//     </IonHeader>

//       <IonContent className="p-4 bg-gray-50">
//      <div className="bg-linear-to-r from-blue-400 to-indigo-400 text-white shadow-lg rounded-xl p-4 mb-6 flex items-center">
  
//   <div className="bg-white/20 p-2 rounded-lg mr-3">
//     📅
//   </div>

//   <h1 className="text-xl md:text-2xl font-bold">
//     My Bookings
//   </h1>

// </div>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <IonSpinner name="crescent" />
//           </div>
//         ) : bookings.length === 0 ? (
//           <p className="text-gray-500 text-center">No bookings found.</p>
//         ) : (
//           bookings.map((b) => {
//             const workDetails = JSON.parse(b.work_details || "{}");
//             const preferences = JSON.parse(b.preferences || "{}");
//             return (
//               <IonCard
//                 key={b.id}
//                 className="mb-4 border-l-4 border-indigo-500 shadow-lg hover:shadow-xl transition-all"
//               >
                
//                 <IonCardHeader className="flex justify-between items-center">
//   {/* Left → Service & Customer */}
//   <IonCardTitle className="text-lg font-bold text-indigo-700">
//     {b.service_name} 
//   </IonCardTitle>

//   {/* Right → Status badge */}
//   <div className="ml-auto">
//     <IonBadge
//       className={`px-3 py-1 text-sm font-semibold ${
//         b.status === "pending"
//           ? "bg-yellow-100 text-yellow-800"
//           : b.status === "accepted"
//           ? "bg-green-100 text-green-800"
//           : b.status === "cancelled"
//           ? "bg-red-100 text-red-800"
//           : "bg-gray-100 text-gray-800"
//       } rounded-full`}
//     >
//       {b.status.toUpperCase()}
//     </IonBadge>
//   </div>
// </IonCardHeader>

//               <IonCardContent className="space-y-4 text-gray-700">
//   {/* Booking & Helper Info */}
//  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-linear-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-xl shadow-md">
//     <p>
//       <span className="font-semibold text-indigo-700">Booking ID:</span>{" "}
//       <span className="text-gray-800">{b.id}</span>
//     </p>
//     <p>
//       <span className="font-semibold text-indigo-700">Helper ID:</span>{" "}
//       <span className="text-gray-800">{b.helper_reg_id}</span>
//     </p>
//     <p>
//       <span className="font-semibold text-indigo-700">Helper Name:</span>{" "}
//       <span className="text-gray-800">{b.helper_name || "N/A"}</span>
//     </p>
//     <p>
//       <span className="font-semibold text-indigo-700">Service:</span>{" "}
//       <span className="text-gray-800">{b.service_name}</span>
//     </p>
//     <p>
//       <span className="font-semibold text-indigo-700">Booking Date:</span>{" "}
//       <span className="text-gray-800">{b.booking_date || "N/A"}</span>
//     </p>
//     <p>
//       <span className="font-semibold text-indigo-700">Time Slot:</span>{" "}
//       <span className="text-gray-800">{b.time_slot}</span>
//     </p>
//     {b.duration && (
//     <p>
//       <span className="font-semibold text-indigo-700">Duration:</span>{" "}
//       <span className="text-gray-800">{b.duration} Hour</span>
//     </p>
//   )}

//   {/* Address */}
//   <p>
//     <span className="font-semibold text-indigo-700"> Booking Address:</span>{" "}
//     <span className="text-gray-800">
//       {b.area}, {b.city} - {b.pin_code}
//     </span>
//   </p>
//   </div>


//   {/* Instructions */}
//  {/* Work Details */}
// {workDetails && (workDetails.description || workDetails.instructions) && (
//   <div className="bg-blue-50 p-3 rounded-lg space-y-1">
//     <h2 className="font-bold text-blue-700">Work Details:</h2>
//     {workDetails.description && (
//       <p>
//         <span className="font-semibold text-blue-600">Description:</span>{" "}
//         {workDetails.description}
//       </p>
//     )}
//     {workDetails.instructions && (
//       <p>
//         <span className="font-semibold text-blue-600">Instructions:</span>{" "}
//         {workDetails.instructions}
//       </p>
//     )}
//   </div>
// )}

//   {/* Preferences */}
//   {preferences && (
//     <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400 space-y-1">
//       <h2 className="font-bold text-purple-800 text-md">Preferences:</h2>
//       <p>
//         <span className="font-semibold text-purple-700">Gender:</span>{" "}
//         {preferences.gender || "Any"}
//       </p>
//       <p>
//         <span className="font-semibold text-purple-700">Language:</span>{" "}
//         {preferences.language || "Any"}
//       </p>
//       <p>
//         <span className="font-semibold text-purple-700">Experienced:</span>{" "}
//         {preferences.experienced ? "Yes" : "No"}
//       </p>
//     </div>
//   )}

//   {/* Created At */}
//   <div className="flex flex-col md:flex-row md:gap-4">
//     <p>
//       <span className="font-semibold text-indigo-700">Created At:</span>{" "}
//       <span className="text-gray-800">
//         {b.created_at
//           ? new Date(b.created_at).toLocaleString("en-IN", {
//               day: "2-digit",
//               month: "short",
//               year: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : "N/A"}
//       </span>
//     </p>
//     <p>
//       <span className="font-semibold text-indigo-700">Payment:</span>{" "}
//       <span className="text-gray-800">
//         {b.payment_method && b.payment_method.trim() !== ""
//           ? b.payment_method
//           : "After On Service"}
//       </span>
//     </p>
//   </div>

//   {/* Cancel Button */}
//   {b.status === "pending" && (
//   <IonButton
//     size="small"
//     color="danger"
//     // className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-md text-sm transition"
//     onClick={() => cancelBooking(b.id)}
//   >
//     Cancel Booking
//   </IonButton>
// )}

//   {/* Rating Stars */}
//   {b.status === "accepted" && (
//     <div className="mt-3 flex items-center gap-2">
//       <span className="font-semibold text-indigo-700">Rate your experience:</span>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <button
//           key={star}
//           onClick={() =>
//             setRating((prev) => ({ ...prev, [b.id]: star }))
//           }
//           className={`text-2xl transition-colors ${
//             rating[b.id] && rating[b.id] >= star
//               ? "text-yellow-400"
//               : "text-gray-300"
//           }`}
//         >
//           ★
//         </button>
//       ))}
//     </div>
//   )}
// </IonCardContent>
//               </IonCard>
//             );
//           })
//         )}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default MyBookingsPage;

import React, { useEffect, useState } from "react";
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
  IonTextarea
} from "@ionic/react";


interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  address: string;
  city: string;
  area: string;
  pin_code: string;
  service_name: string;
helper_reg_id: string;
  booking_date: string;
  time_slot: string;
  duration: string;
  work_details: string;
  preferences: string;
  payment_method: string;
  total_price: string;
  status: string;
  created_at?: string;
  helper_name:string;
  helper_address:string;
}
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
  FaCalendarAlt
} from "react-icons/fa";
import axios from "axios";

import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { closeOutline, locationOutline, searchOutline } from "ionicons/icons";

interface Review {
  booking_id: string;
  helper_id: string;
  rating: number;
  comment: string;
}

const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<{ [key: string]: Review }>({});
  const [ratingInput, setRatingInput] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const token = localStorage.getItem("access_token");
   const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
   const history = useHistory();
  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://192.168.0.187:9830/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);

      // Fetch reviews for each booking after bookings load
      res.data.forEach((b: Booking) => {
        if (b.id) fetchBookingReview(b.id);
      });
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch review for a specific booking
  const fetchBookingReview = async (bookingId: string) => {
    if (!bookingId) return; // safety check
    try {
      const res = await axios.get(
        `http://192.168.0.187:9830/ratings/booking/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data) {
        setReviews(prev => ({ ...prev, [bookingId]: res.data }));
        setRatingInput(prev => ({ ...prev, [bookingId]: res.data.rating }));
        setComments(prev => ({ ...prev, [bookingId]: res.data.comment }));
      }
    } catch (err) {
      console.error("Error fetching booking review:", err);
    }
  };

  // Submit rating and comment
  const submitRating = async (bookingId: string, helperId: string) => {
    if (!bookingId || !helperId) return;
    try {
      await axios.post(
        "http://192.168.0.187:9830/ratings/rate",
        {
          booking_id: bookingId,
          helper_id: helperId,
          rating: ratingInput[bookingId],
          comment: comments[bookingId] || "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh review after submit
      fetchBookingReview(bookingId);
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  // Cancel booking
  const cancelBooking = async (bookingId: string) => {
    try {
      await axios.patch(
        `http://192.168.0.187:9830/bookings/${bookingId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };
const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        history.push("/login");
        return;
      }

      const res = await fetch(`http://192.168.0.187:9830/profiles/me`, {
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

  useEffect(() => {
    fetchBookings();
    fetchProfile();
  }, []);
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

      <IonContent className="p-4 bg-gray-50">
     <div className="bg-linear-to-r from-blue-400 to-indigo-400 text-white shadow-lg rounded-xl p-4 mb-6 flex items-center">
  
  <div className="bg-white/20 p-2 rounded-lg mr-3">
    📅
  </div>

  <h1 className="text-xl md:text-2xl font-bold">
    My Bookings
  </h1>

</div>

        {loading ? (
          <div className="flex justify-center py-20">
            <IonSpinner name="crescent" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500 text-center">No bookings found.</p>
        ) : (
          bookings.map((b) => {
            const workDetails = JSON.parse(b.work_details || "{}");
            const preferences = JSON.parse(b.preferences || "{}");
            return (
              <IonCard
                key={b.id}
                className="mb-4 border-l-4 border-indigo-500 shadow-lg hover:shadow-xl transition-all"
              >
                
                <IonCardHeader className="flex justify-between items-center">
  {/* Left → Service & Customer */}
  <IonCardTitle className="text-lg font-bold text-indigo-700">
    {b.service_name} 
  </IonCardTitle>

  {/* Right → Status badge */}
  <div className="ml-auto">
    <IonBadge
      className={`px-3 py-1 text-sm font-semibold ${
        b.status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : b.status === "accepted"
          ? "bg-green-100 text-green-800"
          : b.status === "cancelled"
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800"
      } rounded-full`}
    >
      {b.status.toUpperCase()}
    </IonBadge>
  </div>
</IonCardHeader>

              <IonCardContent className="space-y-4 text-gray-700">
  {/* Booking & Helper Info */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-linear-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-xl shadow-md">
    <p>
      <span className="font-semibold text-indigo-700">Booking ID:</span>{" "}
      <span className="text-gray-800">{b.id}</span>
    </p>
    <p>
      <span className="font-semibold text-indigo-700">Helper ID:</span>{" "}
      <span className="text-gray-800">{b.helper_reg_id}</span>
    </p>
    <p>
      <span className="font-semibold text-indigo-700">Helper Name:</span>{" "}
      <span className="text-gray-800">{b.helper_name || "N/A"}</span>
    </p>
    <p>
      <span className="font-semibold text-indigo-700">Helper Address:</span>{" "}
      <span className="text-gray-800">{b.helper_address || "N/A"}</span>
    </p>
    <p>
      <span className="font-semibold text-indigo-700">Service:</span>{" "}
      <span className="text-gray-800">{b.service_name}</span>
    </p>
    <p>
      <span className="font-semibold text-indigo-700">Booking Date:</span>{" "}
      <span className="text-gray-800">{b.booking_date || "N/A"}</span>
    </p>
    <p>
      <span className="font-semibold text-indigo-700">Time Slot:</span>{" "}
      <span className="text-gray-800">{b.time_slot}</span>
    </p>
    {b.duration && (
    <p>
      <span className="font-semibold text-indigo-700">Duration:</span>{" "}
      <span className="text-gray-800">{b.duration} Hour</span>
    </p>
  )}

  {/* Address */}
  <p>
    <span className="font-semibold text-indigo-700"> Booking Address:</span>{" "}
    <span className="text-gray-800">
      {b.area}, {b.city} - {b.pin_code}
    </span>
  </p>
  </div>


  {/* Instructions */}
 {/* Work Details */}
{workDetails && (workDetails.description || workDetails.instructions) && (
  <div className="bg-blue-50 p-3 rounded-lg space-y-1">
    <h2 className="font-bold text-blue-700">Work Details:</h2>
    {workDetails.description && (
      <p>
        <span className="font-semibold text-blue-600">Description:</span>{" "}
        {workDetails.description}
      </p>
    )}
    {workDetails.instructions && (
      <p>
        <span className="font-semibold text-blue-600">Instructions:</span>{" "}
        {workDetails.instructions}
      </p>
    )}
  </div>
)}

  {/* Preferences */}
  {preferences && (
    <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400 space-y-1">
      <h2 className="font-bold text-purple-800 text-md">Preferences:</h2>
      <p>
        <span className="font-semibold text-purple-700">Gender:</span>{" "}
        {preferences.gender || "Any"}
      </p>
      <p>
        <span className="font-semibold text-purple-700">Language:</span>{" "}
        {preferences.language || "Any"}
      </p>
      <p>
        <span className="font-semibold text-purple-700">Experienced:</span>{" "}
        {preferences.experienced ? "Yes" : "No"}
      </p>
    </div>
  )}

  {/* Created At */}
  <div className="flex flex-col md:flex-row md:gap-4">
    <p>
      <span className="font-semibold text-indigo-700">Created At:</span>{" "}
      <span className="text-gray-800">
        {b.created_at
          ? new Date(b.created_at).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A"}
      </span>
    </p>
    <p>
      <span className="font-semibold text-indigo-700">Payment:</span>{" "}
      <span className="text-gray-800">
        {b.payment_method && b.payment_method.trim() !== ""
          ? b.payment_method
          : "After On Service"}
      </span>
    </p>
  </div>

  {/* Cancel Button */}
  {b.status === "pending" && (
  <IonButton
    size="small"
    color="danger"
    // className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-md text-sm transition"
    onClick={() => cancelBooking(b.id)}
  >
    Cancel Booking
  </IonButton>
)}

 
   {b.status === "accepted" && (
                <div className="mt-4 bg-yellow-50 p-3 rounded-lg space-y-2">
                  <span className="font-semibold text-indigo-700">
                    Rate your experience:
                  </span>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          setRatingInput(prev => ({ ...prev, [b.id]: star }))
                        }
                        className={`text-2xl ${
                          (ratingInput[b.id] || 0) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  {reviews[b.id] ? (
                    <p className="text-gray-700">Comment: {reviews[b.id].comment}</p>
                  ) : (
                    <>
                      <IonTextarea
                        placeholder="Write your comment..."
                        value={comments[b.id] || ""}
                        onIonChange={(e) =>
                          setComments(prev => ({ ...prev, [b.id]: e.detail.value! }))
                        }
                      />
                      <IonButton
                        size="small"
                        onClick={() => submitRating(b.id, b.helper_reg_id)}
                      >
                        Submit Rating
                      </IonButton>
                    </>
                  )}
                </div>
              )}

</IonCardContent>
              </IonCard>
            );
          })
        )}
      </IonContent>
    </IonPage>
  );
};

export default MyBookingsPage;

