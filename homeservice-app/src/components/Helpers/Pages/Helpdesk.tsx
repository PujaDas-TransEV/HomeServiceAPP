// // import {
// //   IonPage,
// //   IonHeader,
// //   IonToolbar,
// //   IonTitle,
// //   IonContent,
// //   IonButton,
// //   IonIcon,
// //   IonItem,
// //   IonMenu,
// //   IonLabel
// // } from "@ionic/react";
// // import { useEffect, useState } from "react";
// // import { AlertCircle, Upload } from "lucide-react";
// // import { callOutline, mailOutline, logoWhatsapp, closeOutline } from "ionicons/icons";
// // import { Phone, Mail, MessageCircle } from "lucide-react";
// // import { FaCalendarAlt, FaCog, FaComment, FaHeadset, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
// // import Logo from "../../assets/logo.jpg";
// // import { useHistory } from "react-router-dom";
// // const HelperHelpdesk = () => {
// //   const [openFaq, setOpenFaq] = useState<number | null>(null);
// //     const [name, setName] = useState("");
// //   const [city, setCity] = useState("");
// //   const [area, setArea] = useState("");
// //   const [modal, setModal] = useState<{ type: string; value: string } | null>(
// //     null
// //   );

// //   const CONTACTS = {
// //     call: "+1 234 567 890",
// //     whatsapp: "+1 234 567 890",
// //     email: "support@example.com",
// //   };

// //   const faqs = [
// //     {
// //       question: "When will I receive payment?",
// //       answer: "Payments are processed weekly every Friday.",
// //     },
// //     {
// //       question: "What if customer behaves badly?",
// //       answer: "You can report the issue using the Helpdesk page.",
// //     },
// //     {
// //       question: "How to cancel a booking?",
// //       answer: "Open booking details and click cancel request.",
// //     },
// //   ];
// //   const history = useHistory();
// //   const fetchProfile = async () => {
// //     try {
// //       const token = localStorage.getItem("access_token");
// //       if (!token) {
// //         history.push("/login");
// //         return;
// //       }
// //    const res = await fetch(`http://192.168.0.187:9830}/profiles/me`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const data = await res.json();
// //       const profile = data?.profile || {};
// //       setName(profile.name || "User");
// //       setCity(profile.city || "Kolkata");
// //       setArea(profile.area || "");
// //     } catch (error) {
// //       console.log("Profile error:", error);
// //     }
// //   };
// //  useEffect(() => {
// //     // Profile fetch
// //     const fetchAll = async () => {
// //       await fetchProfile();           // User profile
// //              // Available services
    
// //      // If seeker, fetch recommended helpers
// //     };
  
// //     fetchAll();
// //   }, []);
// //   return (
// //       <IonPage>

// //       {/* SIDE MENU */}
// //       <IonMenu side="end" contentId="main-content" type="overlay">
// //         <IonHeader>
// //           <IonToolbar className="bg-linear-to-r from-red-500 to-pink-600 px-4">
// //             <div className="flex items-center justify-between w-full">
// //               <IonTitle className="text-indigo-500 font-bold text-lg">HelperGo</IonTitle>
// //               <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
// //                 <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
// //               </IonButton>
// //             </div>
// //           </IonToolbar>
// //         </IonHeader>
// //         <IonContent className="bg-red-50">
// //           <div className="flex flex-col p-3 space-y-2">
// //             <IonItem button routerLink="/helper-home" className="rounded-lg hover:bg-red-100">
// //               <FaHome className="text-red-600 w-5 h-5 mr-3" />
// //               <IonLabel>Home / হোম</IonLabel>
// //             </IonItem>
// //             <IonItem button routerLink="/maid-profile" className="rounded-lg hover:bg-red-100">
// //               <FaUser className="text-orange-400 w-5 h-5 mr-3" />
// //               <IonLabel>Profile / প্রোফাইল</IonLabel>
// //             </IonItem>
// //             <IonItem button routerLink="/maid-chat" className="rounded-lg hover:bg-red-100">
// //               <FaComment className="text-pink-600 w-5 h-5 mr-3" />
// //               <IonLabel>Chat / চ্যাট</IonLabel>
// //             </IonItem>
// //             <IonItem button routerLink="/seeker-list" className="rounded-lg hover:bg-red-100">
// //               <FaUsers className="text-purple-600 w-5 h-5 mr-3" />
// //               <IonLabel>Seeker List / খোঁজকারী তালিকা</IonLabel>
// //             </IonItem>
// //                <IonItem button routerLink="/helper-bookings" className="rounded-lg hover:bg-red-100">
// //               <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
// //               <IonLabel>Bookings / বুকিংসমূহ</IonLabel>
// //             </IonItem>
// //             <IonItem button routerLink="/maid-preferences" className="rounded-lg hover:bg-red-100">
// //               <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
// //               <IonLabel>Preferences / পছন্দসমূহ</IonLabel>
// //             </IonItem>
// //             <IonItem button routerLink="/support-system" className="rounded-lg hover:bg-red-100">
// //               <FaHeadset className="text-green-600 w-5 h-5 mr-3" />
// //               <IonLabel>Helper Desk / সহায়তা কেন্দ্র</IonLabel>
// //             </IonItem>
// //             <IonItem
// //               button
// //               className="rounded-lg hover:bg-red-200"
// //               onClick={() => {
// //                 localStorage.removeItem("access_token");
// //                 history.push("/login");
// //               }}
// //             >
// //               <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
// //               <IonLabel>Logout / লগ আউট</IonLabel>
// //             </IonItem>
// //           </div>
// //         </IonContent>
// //       </IonMenu>

// //       {/* HEADER */}
// //       <IonHeader>
// //         <IonToolbar className="bg-linear-to-r from-yellow-400 via-red-400 to-pink-500 px-4 py-3">
// //           <div className="flex justify-between items-center w-full">
// //             <div className="flex items-center gap-3">
// //               <img src={Logo} className="w-10 h-10 rounded-full shadow-lg border-2 border-white" alt="logo"/>
// //               <div>
// //                 <p className="text-pink-500 text-s opacity-80">Welcome back 👋 / স্বাগতম</p>
// //                 <p className="font-bold text-lg text-red-600">{name || "User"}</p>
// //               </div>
// //             </div>
// //             <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.open()}>
// //               <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
// //                 <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
// //                   <path fillRule="evenodd" d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z" clipRule="evenodd"/>
// //                 </svg>
// //               </div>
// //             </IonButton>
// //           </div>
// //         </IonToolbar>
// //       </IonHeader>
// //       <IonContent className="bg-gray-100 p-4">

// //         {/* Raise Report */}
// //         <div className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 flex flex-col space-y-6">

// //           <h2 className="text-2xl font-semibold flex items-center gap-3 text-purple-700">
// //             <AlertCircle size={26} /> Report a Problem
// //           </h2>

// //           {/* Inputs container */}
// //           <div className="flex flex-col space-y-4">
// //             <input
// //               type="text"
// //               placeholder="Booking ID"
// //               className="w-full p-4 rounded-xl bg-yellow-50 border border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
// //             />
// // <div></div>
// //             <select className="w-full p-4 rounded-xl bg-green-50 border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none">
// //               <option>Select Problem Type</option>
// //               <option>Customer Misbehaviour</option>
// //               <option>Payment Not Received</option>
// //               <option>Unsafe Environment</option>
// //               <option>Wrong Work Description</option>
// //               <option>Location Issue</option>
// //             </select>
// // <div></div>
// //             <textarea
// //               placeholder="Describe the issue"
// //               className="w-full p-4 rounded-xl bg-purple-50 border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none h-28"
// //             />
// //           </div>

// //           {/* Attachment Upload */}
// //           <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center bg-pink-50">
// //             <Upload className="mx-auto text-pink-400 mb-2" size={28} />
// //             <p className="text-sm text-gray-500 mb-2">Upload proof / image</p>
// //             <input type="file" className="text-sm w-full" />
// //           </div>

// //           {/* Submit Button */}
// //           <IonButton
// //             expand="block"
// //             shape="round"
// //             color="primary"
// //             className="py-3 text-lg shadow-md"
// //           >
// //             Submit Report
// //           </IonButton>

// //         </div>

// //         {/* Report History */}
// //         <div className="bg-linear-to-r from-white to-gray-50 rounded-2xl shadow-lg p-6 mt-6 space-y-4">
// //           <h2 className="text-xl font-semibold text-gray-700">Report History</h2>

// //           <div className="flex justify-between items-center border p-4 rounded-xl bg-yellow-50">
// //             <div>
// //               <p className="font-medium">Booking #2045</p>
// //               <p className="text-sm text-gray-500">Customer Misbehaviour</p>
// //             </div>
// //             <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">Pending</span>
// //           </div>

// //           <div className="flex justify-between items-center border p-4 rounded-xl bg-green-50">
// //             <div>
// //               <p className="font-medium">Booking #2070</p>
// //               <p className="text-sm text-gray-500">Payment Issue</p>
// //             </div>
// //             <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">Resolved</span>
// //           </div>
// //         </div>

// //         {/* FAQ */}
// //         <div className="bg-linear-to-r from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 mt-6 space-y-4">
// //           <h2 className="text-xl font-semibold text-gray-700">Helper FAQ</h2>
// //           {faqs.map((faq, index) => (
// //             <div key={index} className="border rounded-xl overflow-hidden">
// //               <button
// //                 className="w-full text-left p-4 bg-blue-50 font-medium flex justify-between items-center text-gray-700 hover:bg-blue-100 transition-colors"
// //                 onClick={() => setOpenFaq(openFaq === index ? null : index)}
// //               >
// //                 {faq.question}
// //                 <span className="text-lg font-bold">{openFaq === index ? "−" : "+"}</span>
// //               </button>
// //               {openFaq === index && (
// //                 <div className="p-4 text-gray-600 border-t bg-white">{faq.answer}</div>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //         {/* Contact Support */}
// //         <div className="bg-linear-to-r from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 mt-6 space-y-4">
// //           <h2 className="text-xl font-semibold text-gray-700">Contact Support</h2>

// //           <IonButton
// //             fill="solid"
// //             color="primary"
// //             size="small"
// //             onClick={() => setModal({ type: "call", value: CONTACTS.call })}
// //             className="flex items-center gap-2"
// //           >
// //             <IonIcon slot="start" icon={callOutline} />
// //             Call
// //           </IonButton>

// //           <IonButton
// //             fill="solid"
// //             color="success"
// //             size="small"
// //             onClick={() => setModal({ type: "whatsapp", value: CONTACTS.whatsapp })}
// //             className="flex items-center gap-2"
// //           >
// //             <IonIcon slot="start" icon={logoWhatsapp} />
// //             WhatsApp
// //           </IonButton>

// //           <IonButton
// //             fill="solid"
// //             color="tertiary"
// //             size="small"
// //             onClick={() => setModal({ type: "email", value: CONTACTS.email })}
// //             className="flex items-center gap-2"
// //           >
// //             <IonIcon slot="start" icon={mailOutline} />
// //             Email
// //           </IonButton>
// //         </div>

// //         {/* Modal */}
// //         {modal && (
// //           <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
// //             <div className="bg-white rounded-2xl p-6 w-80 shadow-lg relative">
// //               <button
// //                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
// //                 onClick={() => setModal(null)}
// //               >
// //                 X
// //               </button>
// //               <h3 className="text-lg font-semibold mb-4">
// //                 {modal.type === "call"
// //                   ? "Call Support"
// //                   : modal.type === "whatsapp"
// //                   ? "WhatsApp Support"
// //                   : "Email Support"}
// //               </h3>
// //               <p className="text-gray-700 text-center font-medium">{modal.value}</p>
// //             </div>
// //           </div>
// //         )}

// //       </IonContent>
// //     </IonPage>
// //   );
// // };

// // export default HelperHelpdesk;

// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonContent,
//   IonButton,
//   IonIcon,
//   IonItem,
//   IonMenu,
//   IonLabel
// } from "@ionic/react";

// import { useEffect, useState } from "react";
// import { callOutline, mailOutline, logoWhatsapp, closeOutline } from "ionicons/icons";
// import { AlertCircle, Upload } from "lucide-react";
// import { FaCalendarAlt, FaCog, FaComment, FaHeadset, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
// import Logo from "../../assets/logo.jpg";
// import { useHistory } from "react-router-dom";

// const HelperHelpdesk = () => {

// const history = useHistory();

// const [name,setName] = useState("User");
// const [registrationId,setRegistrationId] = useState("");

// const [bookings,setBookings] = useState<any[]>([]);
// const [selectedBooking,setSelectedBooking] = useState("");

// const [category,setCategory] = useState("");
// const [description,setDescription] = useState("");
// const [file,setFile] = useState<File | null>(null);

// const [complaints,setComplaints] = useState<any[]>([]);
// const [faqs,setFaqs] = useState<any[]>([]);
// const [openFaq,setOpenFaq] = useState<number | null>(null);

// const [modal,setModal] = useState<{type:string,value:string}|null>(null);

// const CONTACTS = {
// call:"+1 234 567 890",
// whatsapp:"+1 234 567 890",
// email:"support@example.com"
// };





// /* ================= PROFILE ================= */

// const fetchProfile = async () => {

// try{

// const token = localStorage.getItem("access_token");
// if(!token) return history.push("/login");

// const res = await fetch("http://192.168.0.187:9830/profiles/me",{
// headers:{ Authorization:`Bearer ${token}` }
// });

// const data = await res.json();

// setName(data?.profile?.name || "User");

// if(data?.registration_id){
// setRegistrationId(data.registration_id);
// }

// }catch(error){
// console.log("Profile error",error);
// }

// };



// /* ================= BOOKINGS ================= */

// const fetchBookings = async () => {

// try{

// const token = localStorage.getItem("access_token");

// const res = await fetch(
// "http://192.168.0.187:9830/bookings/helper/my-requests",
// {
// headers:{ Authorization:`Bearer ${token}` }
// }
// );

// const data = await res.json();

// const mapped = data.map((b:any)=>({

// id:b.id,
// service_name:b.service_name || "Service",
// seeker_name:b.seeker_name || "Customer"

// }));

// setBookings(mapped);

// if(mapped.length>0){
// setSelectedBooking(mapped[0].id);
// }

// }catch(error){
// console.log("Booking fetch error",error);
// }

// };



// /* ================= FAQ ================= */

// const fetchFaqs = async () => {

// try{

// const token = localStorage.getItem("access_token");

// const res = await fetch(
// "http://192.168.0.187:9830/faq/my-faqs",
// {
// headers:{ Authorization:`Bearer ${token}` }
// }
// );

// const data = await res.json();

// const helperFaqs = data.filter(
// (f:any)=> f.target_role === "helper" || f.target_role === "both"
// );

// setFaqs(helperFaqs);

// }catch(error){
// console.log("FAQ error",error);
// }

// };



// /* ================= COMPLAINT HISTORY ================= */

// const fetchComplaints = async(userId:string)=>{

// try{

// const token = localStorage.getItem("access_token");

// const res = await fetch(
// `http://192.168.0.187:9830/complaint/history/${userId}`,
// {
// headers:{ Authorization:`Bearer ${token}` }
// }
// );

// const data = await res.json();

// const sorted = data.sort(
// (a:any,b:any)=>
// new Date(b.created_at).getTime() -
// new Date(a.created_at).getTime()
// );

// setComplaints(sorted);

// }catch(error){
// console.log("Complaint history error",error);
// }

// };



// /* ================= SUBMIT COMPLAINT ================= */

// const handleComplaintSubmit = async()=>{

// if(!category || !description || !selectedBooking){
// alert("Please fill all fields");
// return;
// }

// try{

// const token = localStorage.getItem("access_token");

// const formData = new FormData();

// formData.append("category",category);
// formData.append("description",description);
// formData.append("booking_id",selectedBooking);

// if(file){
// formData.append("file",file);
// }

// const res = await fetch(
// "http://192.168.0.187:9830/complaint/submit",
// {
// method:"POST",
// headers:{ Authorization:`Bearer ${token}` },
// body:formData
// }
// );

// if(!res.ok) throw new Error("Failed");

// setCategory("");
// setDescription("");
// setFile(null);

// if(registrationId){
// fetchComplaints(registrationId);
// }

// alert("Complaint submitted successfully");

// }catch(error){
// console.log("Submit error",error);
// }

// };




// /* ================= USE EFFECT ================= */

// useEffect(()=>{
// fetchProfile();
// fetchBookings();
// fetchFaqs();
// },[]);

// useEffect(()=>{
// if(registrationId){
// fetchComplaints(registrationId);
// }
// },[registrationId]);



// /* ================= UI ================= */

// return(

// <IonPage>

// <IonHeader>

// <IonToolbar className="bg-linear-to-r from-yellow-400 via-red-400 to-pink-500">

// <div className="flex justify-between items-center px-4">

// <div className="flex items-center gap-3">

// <img src={Logo} className="w-10 h-10 rounded-full"/>

// <div>

// <p className="text-sm text-white">Welcome 👋</p>

// <p className="text-lg font-bold text-white">{name}</p>

// </div>

// </div>

// </div>

// </IonToolbar>

// </IonHeader>



// <IonContent className="bg-gray-100 p-4">




// {/* REPORT FORM */}

// <div className="bg-white rounded-2xl p-6 shadow space-y-4">

// <h2 className="text-xl font-semibold flex items-center gap-2">
// <AlertCircle size={22}/> Report a Problem
// </h2>



// <select
// className="w-full p-3 border rounded-xl"
// value={selectedBooking}
// onChange={(e)=>setSelectedBooking(e.target.value)}
// >

// {bookings.map((b)=>(
// <option key={b.id} value={b.id}>
// {b.service_name} - {b.seeker_name}
// </option>
// ))}

// </select>



// <select
// className="w-full p-3 border rounded-xl"
// value={category}
// onChange={(e)=>setCategory(e.target.value)}
// >

// <option value="">Select Problem Type</option>
// <option>Customer Misbehaviour</option>
// <option>Payment Not Received</option>
// <option>Unsafe Environment</option>
// <option>Wrong Work Description</option>
// <option>Location Issue</option>

// </select>



// <textarea
// placeholder="Describe the issue"
// className="w-full p-3 border rounded-xl"
// value={description}
// onChange={(e)=>setDescription(e.target.value)}
// />



// <input
// type="file"
// onChange={(e)=>setFile(e.target.files?.[0] || null)}
// />



// <IonButton expand="block" onClick={handleComplaintSubmit}>
// Submit Report
// </IonButton>

// </div>



// {/* COMPLAINT HISTORY */}

// <div className="bg-white rounded-2xl p-6 mt-6 shadow space-y-3">

// <h2 className="text-lg font-semibold">Report History</h2>

// {complaints.map((c:any)=>(
// <div key={c.id} className="border p-3 rounded-xl flex justify-between">

// <div>
// <p className="font-medium">{c.category}</p>
// <p className="text-sm text-gray-500">{c.description}</p>
// </div>

// <span className="text-sm font-semibold">{c.status}</span>

// </div>
// ))}

// </div>




// {/* FAQ */}

// <div className="bg-white rounded-2xl p-6 mt-6 shadow space-y-3">

// <h2 className="text-lg font-semibold">Helper FAQ</h2>

// {faqs.map((faq:any,index:number)=>(
// <div key={index} className="border rounded-xl overflow-hidden">

// <button
// className="w-full p-3 text-left flex justify-between"
// onClick={()=>setOpenFaq(openFaq===index?null:index)}
// >

// {faq.question}

// <span>{openFaq===index?"-":"+"}</span>

// </button>

// {openFaq===index && (
// <div className="p-3 text-sm text-gray-600 border-t">
// {faq.answer}
// </div>
// )}

// </div>
// ))}

// </div>




// {/* CONTACT SUPPORT */}

// <div className="bg-white rounded-2xl p-6 mt-6 shadow space-y-3">

// <h2 className="text-lg font-semibold">Contact Support</h2>

// <IonButton
// size="small"
// onClick={()=>setModal({type:"call",value:CONTACTS.call})}
// >

// <IonIcon icon={callOutline} slot="start"/>
// Call

// </IonButton>

// <IonButton
// size="small"
// color="success"
// onClick={()=>setModal({type:"whatsapp",value:CONTACTS.whatsapp})}
// >

// <IonIcon icon={logoWhatsapp} slot="start"/>
// WhatsApp

// </IonButton>

// <IonButton
// size="small"
// color="tertiary"
// onClick={()=>setModal({type:"email",value:CONTACTS.email})}
// >

// <IonIcon icon={mailOutline} slot="start"/>
// Email

// </IonButton>

// </div>



// </IonContent>

// </IonPage>

// );

// };

// export default HelperHelpdesk;

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonTitle
} from "@ionic/react";

import { useEffect, useState } from "react";
import { HelpCircle, Upload, X } from "lucide-react";
import { callOutline, closeOutline, logoWhatsapp, mailOutline } from "ionicons/icons";

import {
  FaCalendarAlt,
  FaCog,
  FaComment,
  FaHeadset,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUsers
} from "react-icons/fa";

import Logo from "../../assets/logo.jpg";
import { useHistory } from "react-router-dom";
import Helpdesk from "../../users/pages/HelpDesk";

const HelperHelpdesk = () => {

const history = useHistory();

const [name,setName] = useState("");
const [registrationId,setRegistrationId] = useState("");

const [faqOpen,setFaqOpen] = useState<number|null>(null);

const [bookings,setBookings] = useState<any[]>([]);
const [selectedBooking,setSelectedBooking] = useState("");

const [faqs,setFaqs] = useState<any[]>([]);
const [complaints,setComplaints] = useState<any[]>([]);

const [category,setCategory] = useState("");
const [description,setDescription] = useState("");
const [file,setFile] = useState<File|null>(null);

const [modal,setModal] = useState<{type:string,value:string}|null>(null);

const CONTACTS = {
call:"+1 234 567 890",
whatsapp:"+1 234 567 890",
email:"support@example.com"
};



/* ================= PROFILE ================= */

const fetchProfile = async()=>{

try{

const token = localStorage.getItem("access_token");
if(!token) return history.push("/login");

const res = await fetch(
"http://192.168.0.187:9830/profiles/me",
{
headers:{ Authorization:`Bearer ${token}` }
}
);

const data = await res.json();

setName(data?.profile?.name || "User");

if(data?.registration_id){
setRegistrationId(data.registration_id);
}

}catch(error){
console.log("Profile error",error);
}

};



/* ================= HELPER BOOKINGS ================= */

const fetchBookings = async()=>{

try{

const token = localStorage.getItem("access_token");

const res = await fetch(
"http://192.168.0.187:9830/bookings/helper/my-requests",
{
headers:{ Authorization:`Bearer ${token}` }
}
);

const data = await res.json();

const mapped = data.map((b:any)=>({

id:b.id,
seeker_name:b.seeker_name || "Customer",
service_name:b.service_name || "Service"

}));

setBookings(mapped);

if(mapped.length>0){
setSelectedBooking(mapped[0].id);
}

}catch(error){
console.log("Booking fetch error",error);
}

};



/* ================= FAQ ================= */

 const fetchFaqs = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("http://192.168.0.187:9830/faq/my-faqs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Only seeker or both
      const helperFaqs = data.filter(
        (f: any) => f.target_role === "helper" || f.target_role === "both"
      );
      setFaqs(helperFaqs);
    } catch (error) {
      console.log("FAQ fetch error:", error);
    }
  };
/* ================= COMPLAINT HISTORY ================= */

const fetchComplaints = async(userId:string)=>{

try{

const token = localStorage.getItem("access_token");

const res = await fetch(
`http://192.168.0.187:9830/complaint/history/${userId}`,
{
headers:{ Authorization:`Bearer ${token}` }
}
);

const data = await res.json();

const sorted = data.sort(
(a:any,b:any)=>
new Date(b.created_at).getTime() -
new Date(a.created_at).getTime()
);

setComplaints(sorted);

}catch(error){
console.log("Complaint history error",error);
}

};



/* ================= SUBMIT COMPLAINT ================= */

const handleComplaintSubmit = async()=>{

if(!category || !description || !selectedBooking){
alert("Please fill all fields");
return;
}

try{

const token = localStorage.getItem("access_token");

const formData = new FormData();

formData.append("category",category);
formData.append("description",description);
formData.append("booking_id",selectedBooking);

if(file){
formData.append("file",file);
}

const res = await fetch(
"http://192.168.0.187:9830/complaint/submit",
{
method:"POST",
headers:{ Authorization:`Bearer ${token}` },
body:formData
}
);

if(!res.ok) throw new Error("Failed");

setCategory("");
setDescription("");
setFile(null);

if(registrationId){
fetchComplaints(registrationId);
}

alert("Complaint submitted successfully");

}catch(error){
console.log("Submit error",error);
}

};



/* ================= USE EFFECT ================= */

useEffect(()=>{

fetchProfile();
fetchBookings();
fetchFaqs();

},[]);

useEffect(()=>{

if(registrationId){
fetchComplaints(registrationId);
}

},[registrationId]);



/* ================= UI ================= */

return(

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



{/* Raise Complaint */}

<div className="bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 flex flex-col space-y-6">

<h2 className="text-2xl font-semibold flex items-center gap-3 text-blue-700">

<HelpCircle size={26}/>
Raise a Complaint

</h2>



{/* Booking Dropdown */}

<div className="flex flex-col space-y-2">

<label className="text-sm font-semibold text-gray-700">
Select Booking ID
</label>

<select
value={selectedBooking}
onChange={(e)=>setSelectedBooking(e.target.value)}
className="w-full p-4 rounded-xl bg-yellow-50 border border-yellow-300"
>

<option value="">Select Booking</option>

{bookings.map((b)=>(
<option key={b.id} value={b.id}>
{b.id} ({b.seeker_name} - {b.service_name})
</option>
))}

</select>

</div>



{/* Category */}
<div className="flex flex-col space-y-2">
  <label className="text-sm font-semibold text-gray-700">
    Complaint Category
  </label>
<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="w-full p-4 rounded-xl bg-green-50 border border-green-300"
>

<option value="">Select Complaint Category</option>

<option>Customer Misbehaviour</option>
<option>Payment Not Received</option>
<option>Unsafe Environment</option>
<option>Wrong Work Description</option>
<option>Location Issue</option>

</select>

</div>

{/* Description */}
<div className="flex flex-col space-y-2">
  <label className="text-sm font-semibold text-gray-700">
    Description
  </label>
<textarea
value={description}
onChange={(e)=>setDescription(e.target.value)}
placeholder="Describe issue"
className="w-full p-4 rounded-xl bg-purple-50 border border-purple-300"
/>

</div>

{/* Upload */}
<div className="flex flex-col space-y-2">
  <label className="text-sm font-semibold text-gray-700">
    Upload Proof (Optional)
  </label>

  <div className="border-2 border-dashed border-pink-300 rounded-xl p-5 text-center bg-pink-50">
    <Upload className="mx-auto text-pink-400 mb-2" size={28} />
    <p className="text-sm text-gray-500 mb-2">
      Upload proof / image
    </p>

    <input
      type="file"
      className="text-sm w-full"
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
      No FAQs available
    </p>
  ) : (
    faqs.map((faq, index) => {
      const isOpen = faqOpen === index;
      return (
        <div
          key={faq.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <button
            className="w-full text-left px-5 py-4 flex justify-between items-center text-gray-800 font-semibold text-lg hover:bg-indigo-50 transition-colors focus:outline-none"
            onClick={() => setFaqOpen(isOpen ? null : index)}
            aria-expanded={isOpen}
            aria-controls={`faq-${faq.id}`}
          >
            <span>{faq.question}</span>
            <span className="text-indigo-600 text-xl font-bold">
              {isOpen ? "−" : "+"}
            </span>
          </button>

          {isOpen && (
            <div
              id={`faq-${faq.id}`}
              className="px-5 py-4 text-gray-700 bg-indigo-50 border-t border-indigo-100"
            >
              {faq.answer}
            </div>
          )}
        </div>
      );
    })
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

export default HelperHelpdesk;

    