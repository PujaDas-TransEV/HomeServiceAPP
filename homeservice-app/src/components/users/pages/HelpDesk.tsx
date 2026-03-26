
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu
} from "@ionic/react";
import { useEffect, useState } from "react";
import { HelpCircle, Phone, Mail, MessageCircle, Upload, X } from "lucide-react";
import { callOutline, closeOutline, logoWhatsapp, mailOutline } from "ionicons/icons";
import { FaCalendarAlt, FaCog, FaComment, FaHeadset, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import Logo from "../../assets/logo.jpg";
import { useHistory } from "react-router-dom";

const Helpdesk = () => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [bookings, setBookings] = useState<{ id: string; helper_name: string; service_name: string }[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string>("");
  const [faqs, setFaqs] = useState<{ id: string; question: string; answer: string; target_role: string }[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const history = useHistory();
  const [modal, setModal] = useState<{type: string, value: string} | null>(null);
const [registrationId, setRegistrationId] = useState("");
   const CONTACTS = {
    call: "+1 234 567 890",
    whatsapp: "+1 234 567 890",
    email: "support@example.com"
  };
  // Fetch user profile
const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return history.push("/login");

    const res = await fetch("http://192.168.0.187:9830/profiles/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    setName(data?.profile?.name || "User");

    if (data?.registration_id) {
      setRegistrationId(data.registration_id);
    }

  } catch (error) {
    console.log("Profile error:", error);
  }
};
useEffect(() => {
  if (registrationId) {
    fetchComplaints(registrationId);
  }
}, [registrationId]);
  // Fetch bookings for dropdown
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("http://192.168.0.187:9830/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const mapped = data.map((b: any) => ({
        id: b.id,
        helper_name: b.helper_name || "Helper",
        service_name: b.service_name || "Service",
      }));
      setBookings(mapped);
      if (mapped.length > 0) setSelectedBooking(mapped[0].id);
    } catch (error) {
      console.log("Bookings fetch error:", error);
    }
  };

  // Fetch FAQs
  const fetchFaqs = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("http://192.168.0.187:9830/faq/my-faqs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Only seeker or both
      const seekerFaqs = data.filter(
        (f: any) => f.target_role === "seeker" || f.target_role === "both"
      );
      setFaqs(seekerFaqs);
    } catch (error) {
      console.log("FAQ fetch error:", error);
    }
  };

  // Fetch complaints for history
  const fetchComplaints = async (userId: string) => {
  try {
    const token = localStorage.getItem("access_token");

    const res = await fetch(
      `http://192.168.0.187:9830/complaint/history/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    const sorted = data.sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

    setComplaints(sorted);

  } catch (error) {
    console.log("Complaints fetch error:", error);
  }
};

  // Submit complaint
  const handleComplaintSubmit = async () => {
  if (!category || !description || !selectedBooking) {
    alert("Please fill all fields");
    return;
  }

  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      history.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("description", description);
    formData.append("booking_id", selectedBooking);

    if (file) {
      formData.append("file", file);
    }

    const res = await fetch(
      "http://192.168.0.187:9830/complaint/submit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Failed to submit complaint");

    // reset form
    setCategory("");
    setDescription("");
    setFile(null);

    // refresh complaint history
    if (registrationId) {
      fetchComplaints(registrationId);
    }

    alert("Complaint submitted successfully!");

  } catch (error) {
    console.log("Complaint submit error:", error);
    alert("Error submitting complaint");
  }
};
  useEffect(() => {
    fetchProfile();
    fetchBookings();
    fetchFaqs();
  
  }, []);

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

      <IonContent className="bg-indigo-50 dark:bg-gray-700 text-gray-800 dark:text-white">
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
  <IonLabel>Help Desk</IonLabel>
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
              <p className="text-yellow-800 text-s opacity-80">Welcome 👋</p>
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

      <IonContent className="bg-gray-100 p-4">

        {/* Raise Complaint Section */}
        <div className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 flex flex-col space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-3 text-blue-700">
            <HelpCircle size={26} /> Raise a Complaint
          </h2>

      
<div className="flex flex-col space-y-2">
  <label className="text-sm font-semibold text-gray-700  bg-gray-100 dark:text-gray-500">
    Select Booking ID
  </label>

  <select
  value={selectedBooking}
  onChange={(e) => setSelectedBooking(e.target.value)}
  className="w-full p-4 rounded-xl 
  bg-yellow-50 border border-yellow-300 
  text-gray-900 
  dark:bg-yellow-200 dark:text-black 
  focus:ring-2 focus:ring-yellow-400 focus:outline-none"
>
  <option value="">Select Booking</option>
  {bookings.map((b) => (
    <option key={b.id} value={b.id}>
      {b.id} ({b.helper_name} - {b.service_name})
    </option>
  ))}
</select>
</div>


{/* Complaint Category */}
<div className="flex flex-col space-y-2">
  <label className="text-sm font-semibold text-gray-700">
    Complaint Category
  </label>

  
  <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full p-4 rounded-xl 
  bg-green-50 border border-green-300 
  text-gray-900 
  dark:bg-green-200 dark:text-black 
  focus:ring-2 focus:ring-green-400 focus:outline-none"
>
  <option value="">Select Complaint Category</option>
  <option>Helper did not arrive</option>
  <option>Late arrival</option>
  <option>Bad behaviour</option>
  <option>Service not proper</option>
  <option>Payment issue</option>
  <option>Other</option>
</select>
</div>


{/* Description */}
<div className="flex flex-col space-y-2">
  <label className="text-sm font-semibold text-gray-700">
    Description
  </label>

 <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe your issue"
  className="w-full p-4 rounded-xl 
  bg-purple-50 border border-purple-300 
  text-gray-900 placeholder-gray-500
  dark:bg-purple-200 dark:text-black dark:placeholder-gray-700
  focus:ring-2 focus:ring-purple-400 focus:outline-none 
  resize-none h-28"
/>
</div>


{/* File Upload */}
<div className="flex flex-col space-y-2">
  <label className="text-sm font-semibold text-gray-700">
    Upload Proof (Optional)
  </label>

 <div className="border-2 border-dashed border-pink-300 
  dark:border-pink-400 
  rounded-xl p-5 text-center 
  bg-pink-50 dark:bg-pink-200 transition">

  <Upload className="mx-auto text-pink-400 dark:text-pink-600 mb-2" size={28} />

  <p className="text-sm text-gray-600 dark:text-black mb-2">
    Upload proof / image
  </p>

  <input
    type="file"
    className="text-sm w-full 
    text-gray-800 dark:text-black
    file:mr-3 file:py-2 file:px-4 
    file:rounded-lg file:border-0 
    file:bg-pink-500 file:text-white 
    hover:file:bg-pink-600 cursor-pointer"
    onChange={(e) => setFile(e.target.files?.[0] || null)}
  />

  </div>
</div>

          <IonButton
            expand="block"
            shape="round"
            color="primary"
            className="py-3 text-lg shadow-md"
            onClick={handleComplaintSubmit}
          >
            Submit Complaint
          </IonButton>
        </div>

        {/* Complaint History */}
       <div className="bg-linear-to-r from-white via-indigo-50 to-purple-50 rounded-2xl shadow-xl p-6 mt-6 space-y-5">

<h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
Complaint History
</h2>

{complaints.length === 0 ? (
  <p className="text-gray-500 italic text-center bg-white p-5 rounded-lg shadow">
    No complaints submitted yet
  </p>
) : (
  complaints.map((c) => (
    <div
      key={c.id}
      className="bg-white border border-indigo-100 rounded-xl p-5 shadow hover:shadow-lg transition space-y-2"
    >

      <div className="flex justify-between items-center">
        <p className="font-semibold text-indigo-700">
          Booking ID: {c.booking_id}
        </p>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            c.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {c.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        <span className="font-semibold">Category:</span> {c.category}
      </p>

      <p className="text-sm text-gray-600">
        <span className="font-semibold">Description:</span> {c.description}
      </p>

      <p className="text-xs text-gray-400">
        {new Date(c.created_at).toLocaleString()}
      </p>

      {c.proof_image && (
        <img
          src={c.proof_image}
          alt="proof"
          className="w-32 rounded-lg border mt-2 shadow-sm"
        />
      )}

    </div>
  ))
)}

</div>

    <div className="bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl p-6 mt-6 space-y-4">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
    Frequently Asked Questions
  </h2>

  {faqs.length === 0 ? (
    <p className="text-gray-500 italic bg-white p-6 rounded-lg text-center shadow-sm">
      No FAQ available
    </p>
  ) : (
    faqs.map((faq, index) => (
      <div
        key={faq.id}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <button
          className="w-full text-left px-5 py-4 flex justify-between items-center text-gray-800 font-semibold text-lg hover:bg-indigo-50 transition-colors"
          onClick={() => setFaqOpen(faqOpen === index ? null : index)}
        >
          <span>{faq.question}</span>
          <span className="text-indigo-600 text-xl font-bold">{faqOpen === index ? "−" : "+"}</span>
        </button>
        {faqOpen === index && (
          <div className="px-5 py-4 text-gray-700 bg-indigo-50 border-t border-indigo-100">
            {faq.answer}
          </div>
        )}
      </div>
    ))
  )}
</div>
 {/* Contact Support */}
      <div className="bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl p-6 mt-6 space-y-4">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
    Contact Support
  </h2>

  <div className="flex flex-col sm:flex-row gap-3">
    <IonButton
      fill="solid"
      color="primary"
      size="small"
      onClick={() => setModal({ type: "call", value: CONTACTS.call })}
      className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
    >
      <IonIcon slot="start" icon={callOutline} className="text-white" />
      Call
    </IonButton>

    <IonButton
      fill="solid"
      color="success"
      size="small"
      onClick={() => setModal({ type: "whatsapp", value: CONTACTS.whatsapp })}
      className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
    >
      <IonIcon slot="start" icon={logoWhatsapp} className="text-white" />
      WhatsApp
    </IonButton>

    <IonButton
      fill="solid"
      color="tertiary"
      size="small"
      onClick={() => setModal({ type: "email", value: CONTACTS.email })}
      className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
    >
      <IonIcon slot="start" icon={mailOutline} className="text-white" />
      Email
    </IonButton>
  </div>
</div>

{/* Modal */}
{modal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 w-80 shadow-2xl relative animate-slide-in">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        onClick={() => setModal(null)}
      >
        <X size={20} />
      </button>

      <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        {modal.type === "call"
          ? "Call Support"
          : modal.type === "whatsapp"
          ? "WhatsApp Support"
          : "Email Support"}
      </h3>

      <p className="text-gray-700 text-center font-medium bg-white rounded-lg px-4 py-2 shadow-sm">
        {modal.value}
      </p>

      <div className="mt-6 flex justify-center">
        <IonButton
          fill="solid"
          color="primary"
          onClick={() => setModal(null)}
          className="px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Close
        </IonButton>
      </div>
    </div>
  </div>
)}

      </IonContent>
    </IonPage>
  );
};

export default Helpdesk;

    