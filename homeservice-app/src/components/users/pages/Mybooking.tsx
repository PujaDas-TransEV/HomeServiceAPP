
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
  FaCalendarAlt,
  FaHeadset
} from "react-icons/fa";
import axios from "axios";

import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { closeOutline, locationOutline, searchOutline,chatbubbleOutline } from "ionicons/icons";

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

    <IonContent className="bg-indigo-50 dark:bg-gray-900">
      <div className="flex flex-col p-3 space-y-2">
        <IonItem button routerLink="/home" className="rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800">
          <FaHome className="text-purple-600 w-5 h-5 mr-3" />
          <IonLabel className="dark:text-white">Home</IonLabel>
        </IonItem>

        <IonItem button routerLink="/profile" className="rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800">
          <FaUser className="text-indigo-600 w-5 h-5 mr-3" />
          <IonLabel className="dark:text-white">Profile</IonLabel>
        </IonItem>

        <IonItem button routerLink="/chat" className="rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800">
          <FaComment className="text-pink-600 w-5 h-5 mr-3" />
          <IonLabel className="dark:text-white">Chat</IonLabel>
        </IonItem>

        <IonItem button routerLink="/maid-list" className="rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800">
          <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
          <IonLabel className="dark:text-white">Helper List</IonLabel>
        </IonItem>

        <IonItem button routerLink="/my-bookings" className="rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800">
          <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
          <IonLabel className="dark:text-white">My Bookings</IonLabel>
        </IonItem>

        <IonItem button routerLink="/preferences" className="rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800">
          <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
          <IonLabel className="dark:text-white">Preferences</IonLabel>
        </IonItem>

        <IonItem button routerLink="/support" className="rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800">
          <FaHeadset className="text-green-600 w-5 h-5 mr-3" />
          <IonLabel className="dark:text-white">Help Desk</IonLabel>
        </IonItem>

        <IonItem
          button
          className="rounded-lg hover:bg-red-100 dark:hover:bg-red-900"
          onClick={() => {
            localStorage.removeItem("access_token");
            history.push("/login");
          }}
        >
          <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
          <IonLabel className="text-red-500 dark:text-red-400">Logout</IonLabel>
        </IonItem>
      </div>
    </IonContent>
  </IonMenu>

  {/* Header */}
  <IonHeader>
    <IonToolbar className="bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-3">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
            alt="logo"
          />
          <div>
            <p className="text-yellow-800 dark:text-yellow-400 text-sm opacity-80">Welcome👋</p>
            <p className="text-indigo-500 dark:text-indigo-300 font-bold text-lg">{name || "User"}</p>
          </div>
        </div>

        <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.open()}>
          <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
            <svg
              className="w-6 h-6 text-pink-600 dark:text-pink-400"
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

  <IonContent className="p-4 bg-gray-50 dark:bg-gray-900">
    <div className="bg-linear-to-r from-blue-400 to-indigo-400 text-white shadow-lg rounded-xl p-4 mb-6 flex items-center">
      <div className="bg-white/20 p-2 rounded-lg mr-3">📅</div>
      <h1 className="text-xl md:text-2xl font-bold">My Bookings</h1>
    </div>

    {loading ? (
      <div className="flex justify-center py-20">
        <IonSpinner name="crescent" />
      </div>
    ) : bookings.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400 text-center">No bookings found.</p>
    ) : (
      bookings.map((b) => {
        const workDetails = JSON.parse(b.work_details || "{}");
        const preferences = JSON.parse(b.preferences || "{}");
        return (
          <IonCard
            key={b.id}
            className="mb-4 border-l-4 border-indigo-500 shadow-lg hover:shadow-xl transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            {/* Header */}
            <IonCardHeader className="flex justify-between items-center">
              <IonCardTitle className="text-lg font-bold text-indigo-700 dark:text-indigo-400">
                {b.service_name}
              </IonCardTitle>
              <div className="ml-auto">
                <IonBadge
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    b.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : b.status === "accepted"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : b.status === "cancelled"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {b.status.toUpperCase()}
                </IonBadge>
              </div>
            </IonCardHeader>

            <IonCardContent className="space-y-4">
              {/* Booking Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-purple-50 dark:bg-gray-700 rounded-xl shadow-md">
                <p><span className="font-semibold">Booking ID:</span> {b.id}</p>
                <p><span className="font-semibold">Helper ID:</span> {b.helper_reg_id}</p>
                <p><span className="font-semibold">Helper Name:</span> {b.helper_name || "N/A"}</p>
                <p><span className="font-semibold">Helper Address:</span> {b.helper_address || "N/A"}</p>
                <p><span className="font-semibold">Service:</span> {b.service_name}</p>
                <p><span className="font-semibold">Booking Date:</span> {b.booking_date || "N/A"}</p>
                <p><span className="font-semibold">Time Slot:</span> {b.time_slot}</p>
                {b.duration && <p><span className="font-semibold">Duration:</span> {b.duration} Hour</p>}
                <p><span className="font-semibold">Address:</span> {b.area}, {b.city} - {b.pin_code}</p>
              </div>

              {/* Work Details */}
              {workDetails && (workDetails.description || workDetails.instructions) && (
                <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg space-y-1">
                  <h2 className="font-bold text-blue-700 dark:text-blue-300">Work Details:</h2>
                  {workDetails.description && <p><span className="font-semibold">Description:</span> {workDetails.description}</p>}
                  {workDetails.instructions && <p><span className="font-semibold">Instructions:</span> {workDetails.instructions}</p>}
                </div>
              )}

              {/* Preferences */}
              {preferences && (
                <div className="bg-purple-50 dark:bg-gray-700 p-3 rounded-lg border-l-4 border-purple-400 dark:border-purple-600 space-y-1">
                  <h2 className="font-bold text-purple-800 dark:text-purple-300">Preferences:</h2>
                  <p><span className="font-semibold">Gender:</span> {preferences.gender || "Any"}</p>
                  <p><span className="font-semibold">Language:</span> {preferences.language || "Any"}</p>
                  <p><span className="font-semibold">Experienced:</span> {preferences.experienced ? "Yes" : "No"}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col md:flex-row md:gap-4">
                <p><span className="font-semibold">Created At:</span> {b.created_at ? new Date(b.created_at).toLocaleString() : "N/A"}</p>
                <p><span className="font-semibold">Payment:</span> {b.payment_method || "After On Service"}</p>
              </div>

              {b.status === "pending" && (
                <IonButton size="small" color="danger" onClick={() => cancelBooking(b.id)}>Cancel Booking</IonButton>
              )}

              <IonButton size="small" className="mt-2 ml-auto block" disabled={!b.helper_reg_id} onClick={() => history.push(`/helper-chat/${b.id}/${b.helper_reg_id}`)}>Chat with Helper</IonButton>

              {b.status === "accepted" && (
                <div className="mt-4 bg-yellow-50 dark:bg-gray-700 p-3 rounded-lg space-y-2">
                  <span className="font-semibold">Rate your experience:</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => (
                      <button key={star} onClick={() => setRatingInput(prev => ({...prev, [b.id]: star}))} className={`text-2xl ${(ratingInput[b.id] || 0) >= star ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"}`}>★</button>
                    ))}
                  </div>
                  {reviews[b.id] ? <p>Comment: {reviews[b.id].comment}</p> : (
                    <>
                    <IonTextarea
  placeholder="Write your comment..."
  value={comments[b.id] || ""}
  onIonInput={(e: any) =>
    setComments(prev => ({
      ...prev,
      [b.id]: e.detail.value ?? "",
    }))
  }
/>
                      <IonButton size="small" onClick={() => submitRating(b.id, b.helper_reg_id)}>Submit Rating</IonButton>
                    </>
                  )}
                </div>
              )}
            </IonCardContent>
          </IonCard>
        )
      })
    )}
  </IonContent>
</IonPage>
  );
};

export default MyBookingsPage;

