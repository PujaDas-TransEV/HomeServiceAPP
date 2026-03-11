import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonCheckbox,
  IonSpinner,
  IonMenu,
  IonIcon
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBroom,
  FaUtensils,
  FaBaby,
  FaUserNurse,
  FaHome,
  FaHandsHelping,
} from "react-icons/fa";
import Logo from "../../assets/logo.jpg";
import {

  FaUser,
  FaComment,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaClipboardList
} from "react-icons/fa";
import { closeOutline, locationOutline, searchOutline } from "ionicons/icons";
const API_BASE = "http://192.168.0.187:9830";

const getServiceIcon = (name: string) => {
  switch (name?.toLowerCase()) {
    case "cleaning":
      return <FaBroom size={20} />;
    case "cooking":
      return <FaUtensils size={20} />;
    case "babysitting":
      return <FaBaby size={20} />;
    case "elderlycare":
      return <FaUserNurse size={20} />;
    case "fulltimemaid":
      return <FaHome size={20} />;
    default:
      return <FaHandsHelping size={20} />;
  }
};

const HelperBookingPage: React.FC = () => {
  const { id: helperId } = useParams<{ id: string }>();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [helper, setHelper] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
const [duration, setDuration] = useState<string>(""); // string by default
  const [workDetails, setWorkDetails] = useState({
   
    instructions: "",
   descriptions: ""
  });
  const [maidPreference, setMaidPreference] = useState({
    female: false,
    experienced: false,
    language: "",
  });
const [paymentMethod, setPaymentMethod] = useState(""); // <-- empty string
  const [userProfile, setUserProfile] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pinCode: "",
    area:""
  });

  // Busy dates with slots
  const [busySlots, setBusySlots] = useState<{ date: string; slot: string }[]>([]);

  // Fetch helper details
  useEffect(() => {
    const fetchHelperDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await fetch(`${API_BASE}/helper/helper-details/${helperId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setHelper(data);
      } catch (err) {
        console.log("Error fetching helper details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHelperDetails();
  }, [helperId]);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE}/services/getall`);
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return history.push("/login");

        const res = await fetch(`${API_BASE}/profiles/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const profile = data?.profile || {};
        setUserProfile({
          name: profile.name || "",
          phone: data.phone || "",
          email: profile.email || "",
          address: profile.address || "",
          city: profile.city || "",
              area: profile.area || "",
          pinCode: profile.pin_code || "",
        });
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [history]);

  // Fetch busy dates for helper
  useEffect(() => {
    const fetchBusyDates = async () => {
      try {
        const res = await fetch(`${API_BASE}/bookings/helper/${helperId}/busy-dates`);
        const data = await res.json();
        setBusySlots(data); // [{date: "2026-03-20", slot: "Morning"}]
      } catch (err) {
        console.log("Error fetching busy dates:", err);
      }
    };
    fetchBusyDates();
  }, [helperId]);

  // Check if date is fully busy (all slots booked)
  const isDateFullyBusy = (dateStr: string) => {
    const slots = busySlots.filter((b) => b.date === dateStr);
    return slots.length >= 4; // Morning, Afternoon, Evening, Live-in
  };

  // Handle booking
  const handleBooking = async () => {
    if (!selectedService || !timeSlot || !bookingDate) {
      alert("Please select service, date, and time slot.");
      return;
    }

    const body = {
      helper_id: helperId,
      service_id: selectedService,
      customer_name: userProfile.name,
      customer_phone: userProfile.phone,
      customer_email: userProfile.email,
      address: userProfile.address,
      city: userProfile.city,
      area: userProfile.area,
      pin_code: userProfile.pinCode,
      booking_date: bookingDate.split("T")[0],
      time_slot: timeSlot,
      work_details: {
       description:workDetails.descriptions,
        instructions: workDetails.instructions,
      },
      duration: timeSlot === "Live-in" ? null : duration,
      preferences: {
        gender: maidPreference.female ? "female" : "any",
        experienced: maidPreference.experienced,
        language: maidPreference.language,
      },
     payment_method: paymentMethod,
      total_price: 500,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE}/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Booking failed");
      alert("Booking submitted successfully!");
      history.push("/home");
    } catch (err) {
      console.log(err);
      alert("Booking failed!");
    } finally {
      setLoading(false);
    }
  };

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
  <FaClipboardList className="text-indigo-600 w-5 h-5 mr-3" />
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
              {/* <p className="text-indigo-500 font-bold text-lg">{name || "User"}</p> */}
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


      <IonContent className="ion-padding">
        

  {/* User Info */}

<div className="p-6 mb-6 bg-linear-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200">
  <h2 className="font-extrabold text-2xl mb-5 text-blue-800 border-b border-blue-300 pb-2">
    Your Info
  </h2>

  {/* Full Name */}
  <div className="mb-4 flex flex-col">
    <label className="font-semibold text-gray-700 mb-2 text-base">
      Full Name <span className="text-red-500">*</span>
    </label>
    <IonInput
      value={userProfile.name}
      placeholder="Enter your full name"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      onIonInput={(e: any) =>
        setUserProfile({ ...userProfile, name: e.target.value })
      }
    />
  </div>

  {/* Phone */}
  <div className="mb-4 flex flex-col">
    <label className="font-semibold text-gray-700 mb-2 text-base">
      Phone <span className="text-red-500">*</span>
    </label>
    <IonInput
      value={userProfile.phone}
      placeholder="Enter your phone number"
      type="tel"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      onIonInput={(e: any) =>
        setUserProfile({ ...userProfile, phone: e.target.value })
      }
    />
  </div>

  {/* Email (optional) */}
  <div className="mb-4 flex flex-col">
    <label className="font-semibold text-gray-700 mb-2 text-base">
      Email
    </label>
    <IonInput
      value={userProfile.email}
      placeholder="Enter your email (optional)"
      type="email"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      onIonInput={(e: any) =>
        setUserProfile({ ...userProfile, email: e.target.value })
      }
    />
  </div>

  {/* Address / Area */}
  <div className="mb-4 flex flex-col">
    <label className="font-semibold text-gray-700 mb-2 text-base">
      Address / Area <span className="text-red-500">*</span>
    </label>
    <IonInput
      value={userProfile.area}
      placeholder="Enter your area or address"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      onIonInput={(e: any) =>
        setUserProfile({ ...userProfile, area: e.target.value })
      }
    />
  </div>

  {/* City */}
  <div className="mb-4 flex flex-col">
    <label className="font-semibold text-gray-700 mb-2 text-base">
      City <span className="text-red-500">*</span>
    </label>
    <IonInput
      value={userProfile.city}
      placeholder="Enter your city"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      onIonInput={(e: any) =>
        setUserProfile({ ...userProfile, city: e.target.value })
      }
    />
  </div>

  {/* Pin Code */}
  <div className="mb-4 flex flex-col">
    <label className="font-semibold text-gray-700 mb-2 text-base">
      Pin Code <span className="text-red-500">*</span>
    </label>
    <IonInput
      value={userProfile.pinCode}
      placeholder="Enter your pin code"
      type="number"
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      onIonInput={(e: any) =>
        setUserProfile({ ...userProfile, pinCode: e.target.value })
      }
    />
  </div>
</div>
{loading && <IonSpinner />}
{/* Helper Info */}
{helper && (
  <div className="p-6 mb-6 bg-linear-to-r from-pink-50 to-pink-100 rounded-2xl shadow-lg border border-pink-200">
    <h2 className="font-extrabold text-2xl mb-5 text-pink-800 border-b border-pink-300 pb-3">
      Helper Info
    </h2>

    <div className="space-y-3 text-pink-700">
      <p className="flex justify-between items-center">
        <span className="font-semibold text-pink-900">Name:</span>
        <span className="text-pink-800">{helper.profile?.name || helper.name}</span>
      </p>
      <p className="flex justify-between items-center">
        <span className="font-semibold text-pink-900">Age:</span>
        <span className="text-pink-800">{helper.profile?.age || "-"}</span>
      </p>
      <p className="flex justify-between items-center">
        <span className="font-semibold text-pink-900">Experience:</span>
        <span className="text-pink-800">{helper.profile?.experience || "-"} years</span>
      </p>
      <p className="flex justify-between items-center">
        <span className="font-semibold text-pink-900">City:</span>
        <span className="text-pink-800">{helper.profile?.city || "-"}</span>
      </p>
      <p className="flex justify-between items-center">
        <span className="font-semibold text-pink-900">Area:</span>
        <span className="text-pink-800">{helper.profile?.area || "-"}</span>
      </p>
    </div>
  </div>
)}

        
        {/* Service Selection */}
        <div className="p-4 mb-4 bg-green-50 rounded-xl shadow-md">
          <h2 className="font-bold mb-2 text-lg text-green-700">Select Service</h2>
          <IonSelect placeholder="Choose Service" value={selectedService} onIonChange={(e) => setSelectedService(e.detail.value)}>
            {services.map((s) => (
              <IonSelectOption key={s.id} value={s.id}>
                <div className="flex items-center gap-2">
                  {getServiceIcon(s.name)}
                  <span>{s.name}</span>
                </div>
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>

        {/* Booking Date */}
  <div className="p-6 mb-6 bg-linear-to-r from-pink-50 to-pink-100 rounded-2xl shadow-lg border border-pink-200">
  <h2 className="font-extrabold text-xl mb-4 text-pink-700 border-b border-pink-300 pb-2">
    Booking Date
  </h2>

  <IonItem className="bg-white rounded-lg shadow-inner border border-pink-300 p-0">
    <IonDatetime
      value={bookingDate}
      display-format="DD MMM YYYY"       // for showing in input
      picker-format="DD MMM YYYY"        // for the date picker
      min={new Date().toISOString().split("T")[0]}
      className="w-full px-4 py-3 text-pink-700 placeholder-pink-400 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
      onIonChange={(e) => {
        const val = e.detail.value;
        let dateOnly: string = "";

        if (typeof val === "string") dateOnly = val.split("T")[0];
        else if (Array.isArray(val) && val.length > 0) dateOnly = val[0].split("T")[0];

        if (isDateFullyBusy(dateOnly)) {
          alert("All slots on this date are booked. Please choose another date.");
          return;
        }

        setBookingDate(dateOnly);
      }}
    />
  </IonItem>
</div>

        {/* Time Slot */}
      <div className="p-6 mb-6 bg-linear-to-r from-purple-50 to-purple-100 rounded-2xl shadow-lg border border-purple-200">
  <h2 className="font-extrabold text-xl mb-4 text-purple-800 border-b border-purple-300 pb-2">
    Time Slot
  </h2>

  <IonRadioGroup value={timeSlot} onIonChange={(e) => setTimeSlot(e.detail.value)}>
    {["Morning", "Afternoon", "Evening", "Live-in"].map((slot) => {
      const disabled = busySlots.some((b) => b.date === bookingDate && b.slot === slot);
      return (
        <div
          key={slot}
          className={`flex items-center justify-between mb-3 px-4 py-3 rounded-lg border ${
            disabled
              ? "border-red-300 bg-red-100 text-red-600 cursor-not-allowed"
              : "border-purple-300 bg-white hover:bg-purple-50"
          }`}
        >
          <span className={`font-medium ${disabled ? "line-through" : ""}`}>{slot}</span>
          <IonRadio slot="start" value={slot} disabled={disabled} />
          {disabled && <span className="ml-3 text-sm font-semibold text-red-500">Booked</span>}
        </div>
      );
    })}
  </IonRadioGroup>
</div>

    {/* Duration */}
{timeSlot !== "Live-in" && (
  <div className="p-6 mb-6 bg-linear-to-r from-orange-50 to-orange-100 rounded-2xl shadow-lg border border-orange-200">
    <h2 className="font-extrabold text-xl mb-4 text-orange-800 border-b border-orange-300 pb-2">
      Duration
    </h2>

    <div className="grid grid-cols-3 gap-4">
      {/* Predefined Durations */}
      {["2", "4", "6", "8", "10"].map((hour) => (
        <button
          key={hour}
          onClick={() => setDuration(hour)}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium border transition-all ${
            duration === hour
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white border-orange-300 hover:bg-orange-50"
          }`}
        >
          ⏱ {hour} Hours
        </button>
      ))}

      {/* Other Option */}
      <button
        onClick={() => {
          if (["2","4","6","8","10"].includes(duration?.toString())) {
            setDuration(""); // reset for custom input
          }
        }}
        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium border transition-all ${
          duration !== "" && !["2","4","6","8","10"].includes(duration.toString())
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white border-orange-300 hover:bg-orange-50"
        }`}
      >
        ✏️ {duration !== "" && !["2","4","6","8","10"].includes(duration.toString()) ? `${duration} Hours` : "Other"}
      </button>
    </div>

    {/* Custom Duration Input */}
    {(duration === "" || (!["2","4","6","8","10"].includes(duration.toString()) && duration !== null)) && (
      <IonItem className="mt-4 bg-white rounded-lg shadow-inner border border-orange-300 flex flex-col items-start p-0">
        <label className="font-semibold text-gray-700 mb-2 mt-2 ml-3 text-base">
          Enter custom duration (hours)
        </label>
        <IonInput
          type="number"
          placeholder="e.g., 3"
          value={duration}
          className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
          onIonInput={(e: any) => setDuration(e.target.value)}
        />
      </IonItem>
    )}
  </div>
)}
        {/* Work Details */}
     <div className="p-6 mb-6 bg-linear-to-r from-teal-50 to-teal-100 rounded-2xl shadow-lg border border-teal-200">
  <h2 className="font-extrabold text-xl mb-5 text-teal-800 border-b border-teal-300 pb-2">
    Work Details
  </h2>

  {/* Work Description */}
  <IonItem className="mb-4 bg-white rounded-lg shadow-inner border border-teal-300 flex flex-col items-start p-0">
    <label className="font-semibold text-gray-700 mb-2 mt-2 ml-3 text-base">
      Work Description
    </label>
    <IonInput
      placeholder="Enter work description"
      value={workDetails.descriptions}
      className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
      onIonInput={(e: any) =>
        setWorkDetails({ ...workDetails, descriptions: e.target.value })
      }
    />
  </IonItem>

  {/* Special Instructions */}
  <IonItem className="mb-4 bg-white rounded-lg shadow-inner border border-teal-300 flex flex-col items-start p-0">
    <label className="font-semibold text-gray-700 mb-2 mt-2 ml-3 text-base">
      Special Instructions
    </label>
    <IonInput
      placeholder="Enter any special instructions"
      value={workDetails.instructions}
      className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
      onIonInput={(e: any) =>
        setWorkDetails({ ...workDetails, instructions: e.target.value })
      }
    />
  </IonItem>
</div>

        {/* Maid Preference */}
      <div className="p-6 mb-6 bg-linear-to-r from-indigo-50 to-indigo-100 rounded-2xl shadow-lg border border-indigo-200">
  <h2 className="font-extrabold text-xl mb-5 text-indigo-800 border-b border-indigo-300 pb-2">
    Maid Preference (Optional)
  </h2>

  {/* Female Maid Checkbox */}
  <IonItem lines="none" className="mb-3 flex items-center gap-3">
    <IonCheckbox
      checked={maidPreference.female}
      onIonChange={(e) =>
        setMaidPreference({ ...maidPreference, female: e.detail.checked })
      }
    />
    <span className="text-gray-700 font-medium">Female maid</span>
  </IonItem>

  {/* Experienced Maid Checkbox */}
  <IonItem lines="none" className="mb-3 flex items-center gap-3">
    <IonCheckbox
      checked={maidPreference.experienced}
      onIonChange={(e) =>
        setMaidPreference({ ...maidPreference, experienced: e.detail.checked })
      }
    />
    <span className="text-gray-700 font-medium">Experienced maid</span>
  </IonItem>

  {/* Language Preference */}
  <IonItem className="mb-4 bg-white rounded-lg shadow-inner border border-indigo-300 flex flex-col items-start p-0">
    <label className="font-semibold text-gray-700 mb-2 mt-2 ml-3 text-base">
      Language Preference
    </label>
    <IonInput
      placeholder="Enter preferred language"
      value={maidPreference.language}
      className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
      onIonInput={(e: any) =>
        setMaidPreference({ ...maidPreference, language: e.target.value })
      }
    />
  </IonItem>
</div>
        {/* Payment */}
       <div className="p-6 mb-6 bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200">
  <h2 className="font-extrabold text-xl mb-4 text-gray-800 border-b border-gray-300 pb-2">
    Payment Method
  </h2>

  {/* Display Selected Payment Method */}
  <div className="mt-4 flex items-center gap-3 bg-white rounded-lg shadow-inner border border-gray-300 px-4 py-3">
    <span className="text-gray-700 font-medium">Selected Method:</span>
    <span className="text-gray-900 font-semibold">{paymentMethod || "Cash"}</span>
  </div>
</div>

        <IonButton expand="block" color="primary" onClick={handleBooking}>
          {loading ? <IonSpinner /> : "Confirm Booking"}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HelperBookingPage;