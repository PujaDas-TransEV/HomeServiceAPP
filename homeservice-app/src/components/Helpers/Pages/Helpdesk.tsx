import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonMenu,
  IonLabel
} from "@ionic/react";
import { useEffect, useState } from "react";
import { AlertCircle, Upload } from "lucide-react";
import { callOutline, mailOutline, logoWhatsapp, closeOutline } from "ionicons/icons";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { FaCalendarAlt, FaCog, FaComment, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import Logo from "../../assets/logo.jpg";
import { useHistory } from "react-router-dom";
const HelperHelpdesk = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [modal, setModal] = useState<{ type: string; value: string } | null>(
    null
  );

  const CONTACTS = {
    call: "+1 234 567 890",
    whatsapp: "+1 234 567 890",
    email: "support@example.com",
  };

  const faqs = [
    {
      question: "When will I receive payment?",
      answer: "Payments are processed weekly every Friday.",
    },
    {
      question: "What if customer behaves badly?",
      answer: "You can report the issue using the Helpdesk page.",
    },
    {
      question: "How to cancel a booking?",
      answer: "Open booking details and click cancel request.",
    },
  ];
  const history = useHistory();
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        history.push("/login");
        return;
      }
   const res = await fetch(`http://192.168.0.187:9830}/profiles/me`, {
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
    // Profile fetch
    const fetchAll = async () => {
      await fetchProfile();           // User profile
             // Available services
    
     // If seeker, fetch recommended helpers
    };
  
    fetchAll();
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
      <IonContent className="bg-gray-100 p-4">

        {/* Raise Report */}
        <div className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 flex flex-col space-y-6">

          <h2 className="text-2xl font-semibold flex items-center gap-3 text-purple-700">
            <AlertCircle size={26} /> Report a Problem
          </h2>

          {/* Inputs container */}
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Booking ID"
              className="w-full p-4 rounded-xl bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
<div></div>
            <select className="w-full p-4 rounded-xl bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none">
              <option>Select Problem Type</option>
              <option>Customer Misbehaviour</option>
              <option>Payment Not Received</option>
              <option>Unsafe Environment</option>
              <option>Wrong Work Description</option>
              <option>Location Issue</option>
            </select>
<div></div>
            <textarea
              placeholder="Describe the issue"
              className="w-full p-4 rounded-xl bg-purple-50 border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none h-28"
            />
          </div>

          {/* Attachment Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center bg-pink-50">
            <Upload className="mx-auto text-pink-400 mb-2" size={28} />
            <p className="text-sm text-gray-500 mb-2">Upload proof / image</p>
            <input type="file" className="text-sm w-full" />
          </div>

          {/* Submit Button */}
          <IonButton
            expand="block"
            shape="round"
            color="primary"
            className="py-3 text-lg shadow-md"
          >
            Submit Report
          </IonButton>

        </div>

        {/* Report History */}
        <div className="bg-linear-to-r from-white to-gray-50 rounded-2xl shadow-lg p-6 mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Report History</h2>

          <div className="flex justify-between items-center border p-4 rounded-xl bg-yellow-50">
            <div>
              <p className="font-medium">Booking #2045</p>
              <p className="text-sm text-gray-500">Customer Misbehaviour</p>
            </div>
            <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">Pending</span>
          </div>

          <div className="flex justify-between items-center border p-4 rounded-xl bg-green-50">
            <div>
              <p className="font-medium">Booking #2070</p>
              <p className="text-sm text-gray-500">Payment Issue</p>
            </div>
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">Resolved</span>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-linear-to-r from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Helper FAQ</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-xl overflow-hidden">
              <button
                className="w-full text-left p-4 bg-blue-50 font-medium flex justify-between items-center text-gray-700 hover:bg-blue-100 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {faq.question}
                <span className="text-lg font-bold">{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index && (
                <div className="p-4 text-gray-600 border-t bg-white">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-linear-to-r from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Contact Support</h2>

          <IonButton
            fill="solid"
            color="primary"
            size="small"
            onClick={() => setModal({ type: "call", value: CONTACTS.call })}
            className="flex items-center gap-2"
          >
            <IonIcon slot="start" icon={callOutline} />
            Call
          </IonButton>

          <IonButton
            fill="solid"
            color="success"
            size="small"
            onClick={() => setModal({ type: "whatsapp", value: CONTACTS.whatsapp })}
            className="flex items-center gap-2"
          >
            <IonIcon slot="start" icon={logoWhatsapp} />
            WhatsApp
          </IonButton>

          <IonButton
            fill="solid"
            color="tertiary"
            size="small"
            onClick={() => setModal({ type: "email", value: CONTACTS.email })}
            className="flex items-center gap-2"
          >
            <IonIcon slot="start" icon={mailOutline} />
            Email
          </IonButton>
        </div>

        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 shadow-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setModal(null)}
              >
                X
              </button>
              <h3 className="text-lg font-semibold mb-4">
                {modal.type === "call"
                  ? "Call Support"
                  : modal.type === "whatsapp"
                  ? "WhatsApp Support"
                  : "Email Support"}
              </h3>
              <p className="text-gray-700 text-center font-medium">{modal.value}</p>
            </div>
          </div>
        )}

      </IonContent>
    </IonPage>
  );
};

export default HelperHelpdesk;