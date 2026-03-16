
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import {
  add,
  remove,
  chevronForwardOutline,
  brushOutline,
  restaurantOutline,
  happyOutline,
  walkOutline,
  waterOutline,
  medkitOutline,
  womanOutline,
  personAddOutline,
  logInOutline,
  star,
  starHalf,
} from "ionicons/icons";

import logoImg from "../../assets/logo.jpg";
import bannerImg from "../../assets/boise-house-cleaners.jpg";
import victoriaImg from "../../assets/Victoria-Memorial-Kolkata-An-iconic-marble-structure-of-the-British-era-FB-1200x700-compressed.jpg";
import aboutUsImg from "../../assets/cook-services.jpg";

/* Render Stars Without Extra Empty Stars */
const renderStars = (rating: number) => {
  const stars = [];
  let remaining = rating;

  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<IonIcon key={`full-${i}`} icon={star} className="text-yellow-500 w-4 h-4" />);
    remaining--;
  }

  if (remaining >= 0.5) {
    stars.push(<IonIcon key="half" icon={starHalf} className="text-yellow-500 w-4 h-4" />);
  }

  return stars;
};

const API_BASE = "http://192.168.0.187:9830";

const LandingPage: React.FC = () => {
  const history = useHistory();

  const [services, setServices] = useState<any[]>([]);
  const [helpers, setHelpers] = useState<any[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingHelpers, setLoadingHelpers] = useState(false);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const token = localStorage.getItem("access_token");

  // Fetch services
  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const res = await fetch(`${API_BASE}/services/getall`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.log("Error fetching services:", err);
    }
    setLoadingServices(false);
  };

  // Fetch helpers
  const fetchHelpers = async () => {
    setLoadingHelpers(true);
    try {
      const res = await fetch(`${API_BASE}/services/admin/user-report`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      const helperList = (data.users || []).filter(
        (user: any) => user.role === "helper"
      );
      setHelpers(helperList.slice(0, 8)); // show first 8
    } catch (err) {
      console.log("Error fetching helpers:", err);
    }
    setLoadingHelpers(false);
  };

  // Fetch FAQ from API
  const fetchFaqs = async () => {
    try {
      const res = await fetch(`${API_BASE}/faq/admin/all`);
      const data = await res.json();
      setFaqs(data || []);
    } catch (err) {
      console.log("Error fetching FAQs:", err);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchHelpers();
    fetchFaqs();
  }, []);

  // Service icon mapper
  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "cleaning":
        return brushOutline;
      case "cooking":
        return restaurantOutline;
      case "baby sitting":
        return happyOutline;
      case "elderly care":
        return walkOutline;
      case "laundry":
        return waterOutline;
      default:
        return medkitOutline;
    }
  };

  // Service background
  const getServiceBg = (name: string) => {
    switch (name.toLowerCase()) {
      case "cleaning":
        return "bg-gradient-to-r from-indigo-500 to-indigo-300";
      case "cooking":
        return "bg-gradient-to-r from-orange-500 to-orange-300";
      case "baby sitting":
        return "bg-gradient-to-r from-pink-500 to-pink-300";
      case "elderly care":
        return "bg-gradient-to-r from-green-500 to-green-300";
      case "laundry":
        return "bg-gradient-to-r from-blue-500 to-blue-300";
      default:
        return "bg-gray-400";
    }
  };

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
            <IonButton size="small" color="primary" className="flex items-center gap-2" onClick={() => history.push("/login")}>
              <IonIcon icon={logInOutline} />
              Login
            </IonButton>

            <IonButton size="small" color="secondary" className="flex items-center gap-2" onClick={() => history.push("/signup")}>
              <IonIcon icon={personAddOutline} />
              Signup
            </IonButton>
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
              <IonButton onClick={() => history.push("/signup")}>Get Started</IonButton>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Services Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose a Service</h2>
            {loadingServices ? (
              <div className="flex justify-center pb-8">
                <IonSpinner name="crescent" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {services.map((service: any) => (
                  <div
                    key={service.id}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition ${getServiceBg(service.name)}`}
                    onClick={() => token ? history.push(`/service/${service.id}`) : history.push("/login")}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl">
                      <IonIcon icon={getServiceIcon(service.name)} />
                    </div>
                    <span className="font-semibold text-white">{service.name}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

         <section className="mb-8">
   {/* Header */}
   <div className="flex justify-between items-center mb-4">
     <h2 className="text-xl font-semibold text-gray-800">
       Available Helpers in Kolkata
     </h2>
    <button
      className="flex items-center text-pink-500 font-semibold text-sm hover:underline transition"
      onClick={() =>
        token ? history.push("/helpers") : history.push("/login")
      }
    >
      Show More
      <IonIcon icon={chevronForwardOutline} className="ml-1 w-4 h-4" />
    </button>
  </div>

  {/* Helpers List */}
  {loadingHelpers ? (
    <div className="flex justify-center py-6">
      <IonSpinner name="crescent" />
    </div>
  ) : helpers.length === 0 ? (
    <p className="text-gray-400 text-center">No helpers available</p>
  ) : (
    helpers.map((helper: any) => {
      const helperImage =
        helper.profile_picture || "https://i.pravatar.cc/150";

      return (
        <div
          key={helper.account_id}
          className="bg-linear-to-r from-white to-gray-100 rounded-2xl shadow-md p-4 flex items-center gap-4 mb-4 hover:shadow-xl transition cursor-pointer"
          onClick={() =>
            token
              ? history.push(`/helper-details/${helper.account_id}`)
              : history.push("/login")
          }
        >
          {/* Profile Pic */}
          <img
            src={helperImage}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            alt={helper.name}
          />

          {/* Helper Info */}
          <div className="flex-1">
            <p className="font-semibold text-gray-800">{helper.name}</p>
            <p className="text-sm text-gray-600">
            Location:  {helper.location?.city || "Kolkata"}, {helper.location?.area || "-"}
            </p>
              
 {/* Allocated Services */}
{helper.allocated_services && helper.allocated_services.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-2">
    {helper.allocated_services.map((service: string) => (
      <span
        key={service}
        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-semibold"
      >
        <IonIcon icon={getServiceIcon(service)} className="text-blue-600 w-3 h-3" />
        {service}
      </span>
    ))}
  </div>
)}
{helper.rating?.overall_rating > 0 && (
  <div className="flex items-center gap-1 mt-1">
    {renderStars(helper.rating.overall_rating)}
    <span className="text-yellow-600 font-medium text-sm">
      {helper.rating.overall_rating.toFixed(1)}
    </span>
  </div>
)}
          </div>
        </div>
      );
    })
  )}
</section>

          {/* About App */}
          <section className="mb-8 bg-white p-6 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={aboutUsImg}
                alt="About App"
                className="w-full md:w-1/3 rounded-xl shadow-md object-cover"
              />
              <div>
                <h3 className="text-2xl font-extrabold text-pink-600 mb-4">
                  Why Choose HelperGo?
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Verified & Trusted Helpers</li>
                  <li>Easy Booking & Scheduling</li>
                  <li>Transparent Pricing</li>
                  <li>24/7 Support</li>
                  <li>Instant Ratings & Reviews</li>
                </ul>
              </div>
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