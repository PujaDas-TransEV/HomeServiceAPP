
// import React, { useState } from 'react';
// import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
// import { useHistory } from 'react-router-dom';
// import logoImg from '../../assets/logo.jpg'; // update the path as per your project

// import { 
//   brushOutline,       // Cleaning
//   restaurantOutline,  // Cooking
//   happyOutline,       // Babysitting
//   walkOutline,        // Elderly Care
//   add,                // FAQ expand
//   remove              // FAQ collapse
// } from 'ionicons/icons';

// import { chevronForwardOutline } from 'ionicons/icons';

// /* Services */
// const services = [
//   { id: 1, label: 'Cleaning', icon: brushOutline, color: 'bg-blue-100', textColor: 'text-blue-600' },
//   { id: 2, label: 'Cooking', icon: restaurantOutline, color: 'bg-yellow-100', textColor: 'text-yellow-600' },
//   { id: 3, label: 'Babysitting', icon: happyOutline, color: 'bg-pink-100', textColor: 'text-pink-600' },
//   { id: 4, label: 'Elderly Care', icon: walkOutline, color: 'bg-purple-100', textColor: 'text-purple-600' },
// ];

// /* Images */
// import bannerImg from '../../assets/boise-house-cleaners.jpg';
// import victoriaImg from '../../assets/Victoria-Memorial-Kolkata-An-iconic-marble-structure-of-the-British-era-FB-1200x700-compressed.jpg';
// import aboutUsImg from '../../assets/cook-services.jpg';

// /* Maid profile images */
// import maid1Img from '../../assets/maid1.jpg';
// import maid2Img from '../../assets/maid2.jpg';
// import maid3Img from '../../assets/maid3.jpg';
// import maid4Img from '../../assets/maid1.jpg';

// /* Dummy maids */
// const maids = [
//   { id: 1, name: 'Anita', service: 'Cleaning', rating: 4.5, location: 'Kolkata', img: maid1Img, icon: brushOutline },
//   { id: 2, name: 'Maya', service: 'Cooking', rating: 4.2, location: 'Kolkata', img: maid2Img, icon: restaurantOutline },
//   { id: 3, name: 'Rina', service: 'Babysitting', rating: 4.8, location: 'Kolkata', img: maid3Img, icon: happyOutline },
//   { id: 4, name: 'Farida', service: 'Elderly Care', rating: 4.3, location: 'Kolkata', img: maid4Img, icon: walkOutline },
// ];

// /* FAQs */
// const faqs = [
//   { question: "How do I book a maid?", answer: "Simply sign up, select your service, and choose an available maid to book instantly." },
//   { question: "Are the maids verified?", answer: "Yes! All maids are verified and have ratings from previous clients." },
//   { question: "Can I schedule in advance?", answer: "Absolutely, you can select date and time as per your convenience." },
// ];

// const LandingPage: React.FC = () => {
//   const history = useHistory();
//   const handleSignupRedirect = () => history.push('/signup');
//   const handleLoginRedirect = () => history.push('/login');

//   const [openFAQ, setOpenFAQ] = useState<number | null>(null);

//   return (
//     <IonPage className="bg-pink-50">
//       <IonContent className="p-0">

       
       
// {/* Navbar */}
// <div className="flex items-center justify-between p-4 bg-white shadow sticky top-0 z-50">
//   <div className="flex items-center gap-3">
//     {/* Logo inside colored circle */}
//     <div className="w-14 h-14 rounded-full flex items-center justify-center bg-pink-500 p-1 shadow-md">
//       <img 
//         src={logoImg}      // import your logo at the top
//         alt="Logo" 
//         className="w-12 h-12 object-cover rounded-full"
//       />
//     </div>
//     <span className="font-bold text-lg md:text-2xl text-gray-800">Maidigo</span>
//   </div>
//   <div className="flex gap-2">
//     <IonButton size="small" color="primary" onClick={handleLoginRedirect}>Login</IonButton>
//     <IonButton size="small" color="secondary" onClick={handleSignupRedirect}>Signup</IonButton>
//   </div>
// </div>


//         {/* Banner */}
//         <div className="relative w-full h-72 md:h-96">
//           <img src={bannerImg} alt="Banner" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-linear-to-b from-white/10 via-white/5 to-white/10 backdrop-blur-[2px] flex items-center justify-center px-4">
//             <div className="text-center p-4">
//               {/* <h1 className="text-5xl md:text-8xl font-black text-amber-300 drop-shadow-[0_6px_16px_rgba(0,0,0,1)] tracking-wide leading-tight">
//                 Trusted Maids<br />For Your Home
//               </h1> */}
//               <h1
//   className="
//     text-5xl md:text-8xl       /* very large text */
//     font-extrabold              /* super bold */
//     text-pink-600               /* vibrant color visible on overlay */
//     drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]  /* strong shadow for contrast */
//     tracking-wide
//     leading-tight
//   "
// >
//   Trusted Maids<br />For Your Home
// </h1>

//               <p className="text-white/95 text-base md:text-2xl font-semibold mt-3 mb-6 drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
//                 Cleaning, Cooking, Babysitting & Elderly Care in Kolkata
//               </p>
//              <IonButton
  
//   onClick={handleSignupRedirect}
// >
//   Get Started
// </IonButton>

//             </div>
//           </div>
//         </div>

//         <div className="p-4">

//           {/* Services */}
//           <section className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose a Service</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {services.map(service => (
//                 <div key={service.id} className={`flex flex-col items-center gap-2 p-4 ${service.color} rounded-xl shadow hover:shadow-lg cursor-pointer transition`} onClick={handleSignupRedirect}>
//                   <div className={`w-12 h-12 rounded-full flex items-center justify-center ${service.textColor}`}>
//                     <IonIcon icon={service.icon} className="text-2xl" />
//                   </div>
//                   <span className="font-semibold">{service.label}</span>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Available Maids */}
//           <section className="mb-8">
//   {/* Header with Show More */}
//   <div className="flex justify-between items-center mb-4">
//     <h2 className="text-xl font-semibold text-gray-800">
//       Available Maids in Kolkata
//     </h2>
//     <button
//       className="flex items-center text-pink-500 font-semibold text-sm hover:underline transition"
//       onClick={handleSignupRedirect}
//     >
//       Show More
//       <IonIcon icon={chevronForwardOutline} className="ml-1 w-4 h-4" />
//     </button>
//   </div>

//   {/* Maids Grid */}
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     {maids.map(maid => (
//       <div
//         key={maid.id}
//         className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition flex items-center gap-3"
//         onClick={handleSignupRedirect}
//       >
//         <img src={maid.img} alt={maid.name} className="w-16 h-16 rounded-full object-cover" />
//         <div>
//           <h4 className="font-semibold">{maid.name}</h4>
//           <div className="flex items-center gap-2">
//             <IonIcon icon={maid.icon} className="text-pink-500" />
//             <p className="text-xs text-gray-500">{maid.service}</p>
//           </div>
//           <p className="text-xs text-gray-400">Rating: {maid.rating} ⭐</p>
//           <p className="text-xs text-gray-400">Location: {maid.location}</p>
//         </div>
//       </div>
//     ))}
//   </div>
// </section>

//           {/* Location */}
//          <section className="mb-8 flex items-center bg-pink-100 p-6 rounded-xl shadow-lg">
//   {/* Image */}
//   <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mr-6 shrink-0">
//     <img 
//       src={victoriaImg} 
//       alt="Kolkata" 
//       className="w-full h-full object-cover" 
//     />
//   </div>

//   {/* Text */}
//   <div>
//     <h3 className="text-2xl md:text-3xl font-bold text-pink-700 mb-2">
//       Available in Kolkata
//     </h3>
//     <p className="text-gray-700 text-base md:text-lg leading-relaxed">
//       Trusted maids are available in different areas of Kolkata. Choose your preferred location.
//     </p>
//   </div>
// </section>
//   {/* --- Services Grid --- */}
//           <div className="mt-6 px-4">
//             <h3 className="text-2xl font-bold mb-5 text-gray-800">Find What You Need</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {[
//                 { name: "Cleaning", icon: "🧹", bg: "bg-gradient-to-r from-indigo-500 to-indigo-300", description: "Keep your home spotless and organized with our trusted cleaning maids." },
//                 { name: "Cooking", icon: "🍽️", bg: "bg-gradient-to-r from-orange-500 to-orange-300", description: "Delicious home-cooked meals prepared by professional cooking maids." },
//                 { name: "Baby Sitter", icon: "👩‍🍼", bg: "bg-gradient-to-r from-pink-500 to-pink-300", description: "Safe and caring babysitting services to look after your little ones." },
//                 { name: "Elder Care", icon: "🧓", bg: "bg-gradient-to-r from-green-500 to-green-300", description: "Compassionate elder care maids to assist your loved ones daily." }
//               ].map(service => (
//                 <div
//                   key={service.name}
//                   onClick={() => history.push(`/category/${service.name}`)}
//                   className={`p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer transform transition hover:scale-105 hover:shadow-2xl ${service.bg}`}
//                 >
//                   <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-white`}>
//                     <span className="text-3xl">{service.icon}</span>
//                   </div>
//                   <h4 className="font-semibold text-lg text-white mb-2">{service.name}</h4>
//                   <p className="text-sm text-white text-center">{service.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* About App / Benefits */}
//         <section className="mb-8 flex flex-col md:flex-row items-center bg-white p-6 md:p-8 rounded-xl shadow-lg">
//   {/* Image */}
//   <img 
//     src={aboutUsImg} 
//     alt="About App" 
//     className="w-full md:w-1/3 rounded-xl mb-4 md:mb-0 md:mr-6 shadow-md object-cover"
//   />

//   {/* Text Content */}
//   <div>
//     <h3 className="text-2xl md:text-3xl font-extrabold text-pink-600 mb-4">
//       Why Choose Maidigo?
//     </h3>
//     <ul className="list-disc list-inside text-gray-700 text-base md:text-lg space-y-2">
//       <li>✅ Verified & trusted maids</li>
//       <li>✅ Easy booking & scheduling</li>
//       <li>✅ Transparent pricing</li>
//       <li>✅ 24/7 customer support</li>
//       <li>✅ Instant ratings & reviews</li>
//     </ul>
//   </div>
// </section>


//         {/* FAQ */}
// <section className="mb-8 bg-pink-50 p-6 rounded-xl shadow">
//   <h3 className="text-2xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h3>
//   <div className="space-y-4">
//     {faqs.map((faq, index) => {
//       const isOpen = openFAQ === index;
//       return (
//         <div key={index} className="bg-white rounded shadow overflow-hidden">
//           <button
//             className="flex justify-between items-center w-full p-6 focus:outline-none"
//             onClick={() => setOpenFAQ(isOpen ? null : index)}
//           >
//             <span className="font-bold text-gray-900 text-lg flex-1">{faq.question}</span>
//             <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-500 text-white ml-4">
//               <IonIcon icon={isOpen ? remove : add} />
//             </div>
//           </button>
//           {isOpen && (
//             <p className="px-6 pb-6 text-gray-700 text-base">
//               {faq.answer}
//             </p>
//           )}
//         </div>
//       );
//     })}
//   </div>
// </section>


//           {/* Footer */}
// <div className="w-full bg-amber-200 p-6 rounded-t-3xl shadow-inner flex flex-col items-center space-y-3">
//   <h4 className="text-lg md:text-xl font-bold text-sky-900 text-center">
//     Maidigo - Trusted Maid Booking App in Kolkata
//   </h4>
//   <p className="text-sm md:text-base text-gray-700 text-center max-w-md">
//     Book verified maids instantly for cleaning, cooking, babysitting, and elderly care. Safe, fast, and reliable!
//   </p>
 
// </div>

//         </div>
//         <footer className="w-full bg-pink-100 p-4 mt-auto flex justify-center items-center shadow-inner">
//   <p className="text-xs text-gray-500 text-center">
//     © 2025 Maidigo. All rights reserved.
//   </p>
// </footer>

//       </IonContent>
//     </IonPage>
//   );
// };

// export default LandingPage;

import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg';

import { 
  brushOutline,       // Cleaning
  restaurantOutline,  // Cooking
  happyOutline,       // Babysitting
  walkOutline,        // Elderly Care
  waterOutline,       // Laundry
  add,
  remove,
  chevronForwardOutline,
  carOutline,
  constructOutline
} from 'ionicons/icons';

/* Images */
import bannerImg from '../../assets/boise-house-cleaners.jpg';
import victoriaImg from '../../assets/Victoria-Memorial-Kolkata-An-iconic-marble-structure-of-the-British-era-FB-1200x700-compressed.jpg';
import aboutUsImg from '../../assets/cook-services.jpg';

import maid1Img from '../../assets/maid1.jpg';
import maid2Img from '../../assets/maid2.jpg';
import maid3Img from '../../assets/maid3.jpg';
import maid4Img from '../../assets/maid1.jpg';
/* Dummy helpers */
const helpers = [
  { id: 1, name: 'Anita', service: 'Cleaning', rating: 4.5, location: 'Kolkata', img: maid1Img, icon: brushOutline },
  { id: 2, name: 'Maya', service: 'Cooking', rating: 4.2, location: 'Kolkata', img: maid2Img, icon: restaurantOutline },
  { id: 3, name: 'Rina', service: 'Babysitting', rating: 4.8, location: 'Kolkata', img: maid3Img, icon: happyOutline },
  { id: 4, name: 'Farida', service: 'Elderly Care', rating: 4.3, location: 'Kolkata', img: maid4Img, icon: walkOutline },
  { id: 5, name: 'Sima', service: 'Laundry', rating: 4.6, location: 'Kolkata', img: maid2Img, icon: waterOutline },
];


/* Main Services */
const mainServices = [
  { name: "Cleaning", icon: brushOutline, bg: "bg-gradient-to-r from-indigo-500 to-indigo-300", sub: ["Home", "Office", "Deep Cleaning"] },
  { name: "Cooking", icon: restaurantOutline, bg: "bg-gradient-to-r from-orange-500 to-orange-300", sub: ["Home Meals", "Tiffin Services", "Meal Prep"] },
  { name: "Babysitting", icon: happyOutline, bg: "bg-gradient-to-r from-pink-500 to-pink-300", sub: ["Infants", "Toddlers", "After School"] },
  { name: "Elder Care", icon: walkOutline, bg: "bg-gradient-to-r from-green-500 to-green-300", sub: ["Home Care", "Medication Assistance", "Companionship"] },
  { name: "Laundry", icon: waterOutline, bg: "bg-gradient-to-r from-blue-500 to-blue-300", sub: ["Wash & Fold", "Dry Cleaning", "Ironing"] },
];

/* Providers for advertisements */
const providers = [
  { name: "Catering & Event Services", icon: restaurantOutline, bg: "bg-yellow-400", sub: ["Weddings", "Parties", "Corporate Events"] },
  { name: "Pharmacy", icon: happyOutline, bg: "bg-red-400", sub: ["Medicines", "Health Supplies"] },
  { name: "Emergency & Medical Care", icon: walkOutline, bg: "bg-pink-400", sub: ["Ambulance", "Home Nurses"] },
  { name: "Diagnostics", icon: brushOutline, bg: "bg-green-400", sub: ["Blood Test", "X-Ray", "ECG"] },
  { name: "Utility Repair & Installation", icon: constructOutline, bg: "bg-blue-400", sub: ["AC", "Plumbing", "Electrical"] },
  { name: "Transportation", icon: carOutline, bg: "bg-purple-400", sub: ["Car", "Van", "Bike"] },
];

/* FAQs */
const faqs = [
  { question: "How do I book a helper?", answer: "Simply sign up, select your service, and choose an available helper to book instantly." },
  { question: "Are the helpers verified?", answer: "Yes! All helpers are verified and have ratings from previous clients." },
  { question: "Can I schedule in advance?", answer: "Absolutely, you can select date and time as per your convenience." },
];

const LandingPage: React.FC = () => {
  const history = useHistory();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleSignupRedirect = () => history.push('/signup');
  const handleLoginRedirect = () => history.push('/login');

  return (
    <IonPage className="bg-pink-50">
      <IonContent className="p-0">
        {/* Navbar */}
        <div className="flex items-center justify-between p-4 bg-white shadow sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-pink-500 p-1 shadow-md">
              <img src={logoImg} alt="Logo" className="w-12 h-12 object-cover rounded-full" />
            </div>
            <span className="font-bold text-lg md:text-2xl text-indigo-600">HelperGo</span>
          </div>
          <div className="flex gap-2">
            <IonButton size="small" color="primary" onClick={handleLoginRedirect}>Login</IonButton>
            <IonButton size="small" color="secondary" onClick={handleSignupRedirect}>Signup</IonButton>
          </div>
        </div>

        {/* Banner */}
        <div className="relative w-full h-72 md:h-96">
          <img src={bannerImg} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-b from-white/10 via-white/5 to-white/10 backdrop-blur-[2px] flex items-center justify-center px-4">
            <div className="text-center p-4">
              <h1 className="text-5xl md:text-8xl font-extrabold text-pink-600 drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] tracking-wide leading-tight">
                Trusted Helpers<br />For Your Needs
              </h1>
              <p className="text-white/95 text-base md:text-2xl font-semibold mt-3 mb-6 drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                Cooking, Cleaning, Babysitting, Elderly Care & Laundry
              </p>
              <IonButton onClick={handleSignupRedirect}>Get Started</IonButton>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Main Services */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose a Service</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {mainServices.map(service => (
                <div key={service.name} className={`flex flex-col items-center gap-2 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition ${service.bg}`} onClick={handleSignupRedirect}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl">
                    <IonIcon icon={service.icon} />
                  </div>
                  <span className="font-semibold text-white">{service.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Available Helpers */}
        <section className="mb-8">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-800">Available Helpers in Kolkata</h2>
    <button className="flex items-center text-pink-500 font-semibold text-sm hover:underline transition" onClick={handleSignupRedirect}>
      Show More
      <IonIcon icon={chevronForwardOutline} className="ml-1 w-4 h-4" />
    </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {helpers.map(helper => (
      <div key={helper.id} className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition flex items-center gap-3" onClick={handleSignupRedirect}>
        <img src={helper.img} alt={helper.name} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h4 className="font-semibold">{helper.name}</h4>
          <div className="flex items-center gap-2">
            <IonIcon icon={helper.icon} className="text-pink-500" />
            <p className="text-xs text-gray-500">{helper.service}</p>
          </div>
          <p className="text-xs text-gray-400">Rating: {helper.rating} ⭐</p>
          <p className="text-xs text-gray-400">Location: {helper.location}</p>
        </div>
      </div>
    ))}
  </div>
</section>


          {/* Providers Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Explore Service Providers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {providers.map(provider => (
                <div key={provider.name} className={`p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer transform transition hover:scale-105 hover:shadow-2xl ${provider.bg}`} onClick={handleSignupRedirect}>
                  <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-white text-2xl">
                    <IonIcon icon={provider.icon} />
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-center">{provider.name}</h4>
                  <p className="text-sm text-white text-center">{provider.sub.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          {/* About App / Benefits */}
          <section className="mb-8 flex flex-col md:flex-row items-center bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <img src={aboutUsImg} alt="About App" className="w-full md:w-1/3 rounded-xl mb-4 md:mb-0 md:mr-6 shadow-md object-cover" />
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-pink-600 mb-4">Why Choose HelperGo?</h3>
              <ul className="list-disc list-inside text-gray-700 text-base md:text-lg space-y-2">
                <li>✅ Verified & trusted helpers</li>
                <li>✅ Easy booking & scheduling</li>
                <li>✅ Transparent pricing</li>
                <li>✅ 24/7 customer support</li>
                <li>✅ Instant ratings & reviews</li>
              </ul>
            </div>
          </section>

          {/* Location Section */}
          <section className="mb-8 flex items-center bg-pink-100 p-6 rounded-xl shadow-lg">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mr-6 shrink-0">
              <img src={victoriaImg} alt="Kolkata" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-pink-700 mb-2">Available in Kolkata</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Trusted helpers are available in different areas of Kolkata. Choose your preferred location.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8 bg-pink-50 p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFAQ === index;
                return (
                  <div key={index} className="bg-white rounded shadow overflow-hidden">
                    <button className="flex justify-between items-center w-full p-6 focus:outline-none" onClick={() => setOpenFAQ(isOpen ? null : index)}>
                      <span className="font-bold text-gray-900 text-lg flex-1">{faq.question}</span>
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-500 text-white ml-4">
                        <IonIcon icon={isOpen ? remove : add} />
                      </div>
                    </button>
                    {isOpen && <p className="px-6 pb-6 text-gray-700 text-base">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
          </section>

           {/* Footer */}
 <div className="w-full bg-amber-200 p-6 rounded-t-3xl shadow-inner flex flex-col items-center space-y-3">
   <h4 className="text-lg md:text-xl font-bold text-sky-900 text-center">
     HelperGo - Trusted Helper Booking App in Kolkata
   </h4>
   <p className="text-sm md:text-base text-gray-700 text-center max-w-md">
    Book verified helpers instantly for cleaning, cooking, babysitting, elderly care, and laundry. Safe, fast, and reliable!
   </p>
 
 </div>

         </div>
         <footer className="w-full bg-pink-100 p-4 mt-auto flex justify-center items-center shadow-inner">
   <p className="text-xs text-gray-500 text-center">
     © 2025 HelperGo. All rights reserved.
   </p>
 </footer>

       </IonContent>
     </IonPage>
  );
};

export default LandingPage;
