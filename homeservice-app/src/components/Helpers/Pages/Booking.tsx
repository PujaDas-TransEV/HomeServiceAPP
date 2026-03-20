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
  IonSpinner,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonMenu,
  IonItem,
} from "@ionic/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { closeOutline } from "ionicons/icons";
import Logo from "../../assets/logo.jpg";
import {
  FaHome,
  FaUser,
  FaComment,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaCalendarAlt,
  FaHeadset,
} from "react-icons/fa";

interface Booking {
  seeker_account_id: any;
  seeker_reg_id: any;
  id: string;
  customer_name: string;
  customer_phone: string;
  address: string;
  city: string;
  area: string;
  pin_code: string;
  service_name: string;
  booking_date: string;
  time_slot: string;
  duration: string;
  work_details: string;
  preferences: string;
  payment_method: string;
  total_price: string;
  status: string;
   created_at?: string;
}
interface Review {
  booking_id: string;
  helper_id: string;
  rating: number;
  comment: string;
}
const HelperBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<{ [key: string]: number }>({});
  const token = localStorage.getItem("access_token");
  const history = useHistory();
  const [reviews, setReviews] = useState<{ [key: string]: Review }>({});
  
 const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://192.168.0.187:9830/bookings/helper/my-requests",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(res.data);

      // Booking summary
      const sum: { [key: string]: number } = {};
      res.data.forEach((b: Booking) => {
        sum[b.status] = (sum[b.status] || 0) + 1;
        // Fetch review for each booking
        fetchBookingReview(b.id);
      });
      setSummary(sum);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch review for a specific booking
  const fetchBookingReview = async (bookingId: string) => {
    if (!bookingId) return;
    try {
      const res = await axios.get(
        `http://192.168.0.187:9830/ratings/booking/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data) {
        setReviews((prev) => ({ ...prev, [bookingId]: res.data }));
      }
    } catch (err) {
      console.error("Error fetching booking review:", err);
    }
  };
  
  const respondBooking = async (bookingId: string, newStatus: string) => {
    try {
      await axios.patch(
        `http://192.168.0.187:9830/bookings/helper/respond/${bookingId}?new_status=${newStatus}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <IonPage>
      {/* SIDE MENU */}
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-red-500 to-pink-600 px-4">
            <div className="flex items-center justify-between w-full">
              <IonTitle className="text-indigo-500 font-bold text-lg">HelperGo</IonTitle>
              <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} className="text-pink-600 text-xl" />
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
              <IonLabel>Helper Desk / সহায়তা কেন্দ্র</IonLabel>
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
      <IonContent className="p-4 bg-gray-50">
      <div className="bg-linear-to-r from-blue-400 to-indigo-400 text-white shadow-lg rounded-xl p-4 mb-6 flex items-center">
  
  <div className="bg-white/20 p-2 rounded-lg mr-3">
    📅
  </div>

  <h1 className="text-xl md:text-2xl font-bold">
    My Booking Request
  </h1>

</div>
        {loading ? (
          <div className="flex justify-center py-20">
            <IonSpinner name="crescent" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No bookings found.</p>
        ) : (
          <>
            <div className="mb-6 flex justify-end">
              <IonSelect placeholder="Booking Summary" className="w-64 bg-white rounded-md shadow-md">
                {Object.keys(summary).map((status) => (
                  <IonSelectOption key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}: {summary[status]}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>

            {bookings.map((b) => {
               const review = reviews[b.id]; // ✅ fetch review for this booking
              const workDetails = JSON.parse(b.work_details || "{}");
              const preferences = JSON.parse(b.preferences || "{}");
              return (
                <IonCard key={b.id} className="mb-4 border-l-4 border-indigo-500 shadow-lg hover:shadow-xl transition-all bg-white">
                 <IonCardHeader className="flex items-center justify-between">
  <IonCardTitle className="text-lg font-bold text-indigo-700 flex-1">
    {b.service_name} 
  </IonCardTitle>

   <IonBadge
    className={`ml-auto px-3 py-1 text-sm font-semibold rounded-full ${
      b.status === "pending"
        ? "bg-yellow-100 text-yellow-800"
        : b.status === "accepted"
        ? "bg-green-100 text-green-800"
        : b.status === "cancelled"
        ? "bg-red-100 text-red-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {b.status.toUpperCase()}
  </IonBadge>
</IonCardHeader>

                  
                    <IonCardContent className="bg-gray-50 p-4 rounded-xl shadow-sm space-y-3">

  <div className="bg-white p-3 rounded-lg border border-gray-100">
    <p className="text-sm">
      <span className="font-semibold text-indigo-600">Booking ID:</span> 
      <span className="ml-2 text-gray-800">{b.id}</span>
    </p>
  </div>

  <div className="bg-white p-3 rounded-lg border border-gray-100">
    <p className="text-sm">
      <span className="font-semibold text-blue-600">Customer Name:</span> 
      <span className="ml-2 text-gray-800">{b.customer_name}</span>
    </p>

    <p className="text-sm mt-1">
      <span className="font-semibold text-blue-600">Customer Phone:</span> 
      <span className="ml-2 text-gray-800">{b.customer_phone}</span>
    </p>
  </div>

  <div className="bg-white p-3 rounded-lg border border-gray-100">
    <p className="text-sm">
      <span className="font-semibold text-green-600"> Booking Date:</span> 
      <span className="ml-2">{b.booking_date}</span>

      <span className="font-semibold text-green-600 ml-4">Time Slot:</span> 
      <span className="ml-2">{b.time_slot}</span>
    </p>

    <p className="text-sm mt-1">
      <span className="font-semibold text-purple-600">Duration:</span> 
      <span className="ml-2">{b.duration || "N/A"}Hours </span>
    </p>
  </div>
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
    </div>
  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
    <p className="text-sm">
      <span className="font-semibold text-blue-700">Address:</span>
    </p>
    <p className="text-sm text-gray-700 mt-1">
      {b.area}, {b.city} - {b.pin_code}
    </p>
  </div>

                    {preferences && (
                      <div className="bg-purple-50 p-3 rounded-lg space-y-1">
                        <h2 className="font-bold text-pink-800">Preferences:</h2>
                        <p><span className="font-semibold text-purple-800">Gender:</span> {preferences.gender || "Any"}</p>
                        <p><span className="font-semibold text-purple-800">Language:</span> {preferences.language || "Any"}</p>
                        <p><span className="font-semibold text-purple-800">Experienced:</span> {preferences.experienced ? "Yes" : "No"}</p>
                      </div>
                    )}
{workDetails && (workDetails.description || workDetails.instructions) && (
  <div className="bg-blue-50 p-3 rounded-lg space-y-1">
    <h2 className="font-bold text-blue-700">Work Details:</h2>
    {workDetails.description && (
      <p>
        <span className="font-semibold text-purple-600">Description:</span>{" "}
        {workDetails.description}
      </p>
    )}
    {workDetails.instructions && (
      <p>
        <span className="font-semibold text-purple-600">Instructions:</span>{" "}
        {workDetails.instructions}
      </p>
    )}
  </div>
)}

                    <p><span className="font-semibold">Payment:</span> {b.payment_method?.trim() || "After On Service"}</p>
     {/* Review Section */}
{b.status === "accepted" ? (
  review ? (
    <div className="mt-3 p-4 rounded-lg bg-linear-to-r from-blue-200 via-blue-100 to-blue-300 shadow-md">
      <p className="font-semibold text-orange-800 mb-1">
        User Rating:{" "}
        <span className="text-2xl text-yellow-500">
          {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
        </span>
      </p>
      <p className="text-orange-900">{review.comment || "No comment"}</p>
    </div>
  ) : (
    <div className="mt-3 p-4 rounded-lg bg-gray-100 text-gray-600 shadow-sm">
      No review yet
    </div>
  )
) : null}
                    {b.status === "pending" && (
                      <div className="flex gap-3 mt-2">
                        <IonButton color="success" expand="block" onClick={() => respondBooking(b.id, "accepted")}>Accept</IonButton>
                        <IonButton color="danger" expand="block" onClick={() => respondBooking(b.id, "rejected")}>Reject</IonButton>
                      </div>
                    )}
                   {b.status?.toLowerCase() === "accepted" && b.seeker_reg_id && (
  <IonButton
    size="small"
    className="mt-3 w-full bg-linear-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:scale-[1.02] transition-all"
    onClick={() => {
      history.push(`/seeker-chat/${b.id}/${b.seeker_account_id}`);
    }}
  >
    💬 Chat with Customer
  </IonButton>
)}
                  </IonCardContent>
                </IonCard>
              );
            })}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HelperBookingsPage;