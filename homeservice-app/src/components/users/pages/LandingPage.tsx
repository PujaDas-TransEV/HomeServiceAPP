import React, { useState, useEffect } from "react";

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
import banner1 from '../../assets/home1.webp';
import banner2 from '../../assets/home2.png';
import banner3 from '../../assets/homee3.webp';
import { useHistory } from "react-router-dom";
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
  

  const [services, setServices] = useState<any[]>([]);
  const [helpers, setHelpers] = useState<any[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingHelpers, setLoadingHelpers] = useState(false);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
const [user, setUser] = useState<any>(null); // logged-in user info
  const token = localStorage.getItem("access_token");
 
const history = useHistory();
  // Fetch logged-in user profile
  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }
  }, [token]);
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
const slides = [
  {
    image: banner1,
    tag: "Verified Professionals",
    title: "Trusted Helpers",
    desc: "Cooking, Cleaning & Daily Support You Can Rely On",
    btn: "Book Now",
    align: "left",
  },
  {
    image: banner2,
    tag: "Care & Safety",
    title: "Care You Can Trust",
    desc: "Loving Babysitting & Compassionate Elderly Care",
    btn: "Find Care",
    align: "right",
  },
  {
    image: banner3,
    tag: "Easy Living",
    title: "Hassle-Free Living",
    desc: "Laundry & Home Services Without the Stress",
    btn: "Explore Services",
    align: "left",
  },
  {
    image: bannerImg,
    tag: "Premium Experience",
    title: "Effortless Home Care",
    desc: "Everything Your Home Needs, Done Perfectly",
    btn: "Get Started",
    align: "left",
  },
];

  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <IonPage className="bg-pink-50">
      <IonContent className="p-0">
        {/* Navbar */}
 <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-lg">
          <img src={logoImg} alt="Logo" className="w-12 h-12 object-cover rounded-full" />
        </div>
        <span className="font-extrabold text-lg md:text-2xl bg-clip-text text-transparent bg-linear-to-r from-green-400 to-orange-500">
          HelperGo
        </span>
      </div>

      {/* Buttons / User */}
      <div className="flex gap-3 items-center">
        {user ? (
          <button
            className="font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-pink-400 transition-colors duration-300"
            onClick={() => {
              if (user.role === "helper") {
                history.push("/helper-home");
              } else {
                history.push("/home");
              }
            }}
          >
            Hi, {user.profile?.name || "User"}
          </button>
        ) : (
          <>
            {/* Login Button */}
           <IonButton
        size="small"
        color="primary"
        className="flex items-center gap-2"
        onClick={() => history.push("/login")}
      >
        <IonIcon icon={logInOutline} />
        Login
      </IonButton>

      <IonButton
        size="small"
        color="secondary"
        className="flex items-center gap-2"
        onClick={() => history.push("/signup")}
      >
        <IonIcon icon={personAddOutline} />
        Signup
      </IonButton>
      </>
    )}
  </div>
</div>


       <div className="relative w-full h-[75vh] overflow-hidden">

  {/* Slides */}
  <div
    className="flex transition-transform duration-700 ease-in-out h-full"
    style={{ transform: `translateX(-${current * 100}%)` }}
  >
    {slides.map((slide, index) => (
      <div
        key={index}
        className="min-w-full h-full relative flex items-center"
      >
        {/* Background Image */}
        <img
          src={slide.image}
          alt="banner"
          className="absolute w-full h-full object-cover scale-105"
        />

        {/* ✅ BRIGHT OVERLAY (gradient instead of black) */}
        <div className="absolute inset-0 bg-linear-to-r from-white/80 via-white/40 to-transparent dark:from-black/50 dark:via-black/20" />

      <div
  className={`relative z-10 max-w-xl px-6 md:px-16 ${
    slide.align === "left" ? "text-left" : "ml-auto text-right"
  }`}
>
  <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold 
bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-400 
text-white rounded-full shadow-md 
animate-[fadeIn_0.6s_ease-in-out]">
  {slide.tag}
</span>

<h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight
bg-linear-to-r from-green-400 via-yellow-400 to-orange-500
bg-clip-text text-transparent
drop-shadow-[0_6px_20px_rgba(0,0,0,0.2)]
animate-[fadeUp_0.8s_ease-in-out]">
  {slide.title}
</h1>

{/* 📝 Description */}
<p className="mt-5 text-gray-700 dark:text-gray-300 
text-lg md:text-xl font-medium leading-relaxed 
animate-[fadeUp_1s_ease-in-out]">

 <p className="mt-5 text-gray-800 dark:text-gray-200 
text-lg md:text-xl font-medium leading-relaxed 
animate-[fadeUp_1s_ease-in-out]">

  {slide.desc.split(" ").map((word, i) =>
    i === 0 ? (
      <span key={i} className="text-indigo-600 dark:text-cyan-400 font-semibold">
        {word}{" "}
      </span>
    ) : (
      word + " "
    )
  )}

</p>

</p>

 <div
  className={`mt-6 flex gap-4 animate-[fadeUp_1.2s_ease-in-out] ${
    slide.align === "left" ? "" : "justify-end"
  }`}
>
<div
  className={`mt-6 flex gap-4 ${
    slide.align === "left" ? "" : "justify-end"
  }`}
>
  {/* ✅ Primary Gradient Button */}
  <button
    onClick={() => history.push("/login")}
    style={{    background: "linear-gradient(90deg, #7c3aed, #9333ea, #6d28d9)", // purple gradient
      color: "white",
      borderRadius: "9999px",
      padding: "0.75rem 1.75rem",
      fontWeight: "600",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {slide.btn}
  </button>

  {/* ✅ Secondary Glass Button */}
 <button
  onClick={() => history.push("/login")}
  style={{
    borderRadius: "9999px", // pill shape
    padding: "0.75rem 1.75rem",
    color: "#fff", // text white
    background: "rgba(219, 39, 119, 0.3)", // pinkish glass background
    backdropFilter: "blur(8px)", // blur effect
    border: "1px solid rgba(219, 39, 119, 0.6)", // pink border
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.background = "rgba(219, 39, 119, 0.5)"; // brighter on hover
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(219,39,119,0.3)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.background = "rgba(219, 39, 119, 0.3)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  Learn More
</button>
</div>

</div>
</div>
      </div>
    ))}
  </div>

  {/* Dots */}
  <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
    {slides.map((_, index) => (
      <div
        key={index}
        onClick={() => setCurrent(index)}
        className={`w-3 h-3 rounded-full cursor-pointer transition ${
          current === index
            ? "bg-pink-500 scale-125"
            : "bg-gray-300 dark:bg-gray-500"
        }`}
      />
    ))}
  </div>
</div>

      <div className="p-4 bg-pink-50 dark:bg-linear-to-b dark:from-[#1a0b1f] dark:via-[#2a0f2f] dark:to-[#1f0a24] transition">

  {/* Services Section */}
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4 
      text-gray-800 
      dark:text-pink-200">
      Choose a Service
    </h2>

    {loadingServices ? (
      <div className="flex justify-center pb-8">
        <IonSpinner name="crescent" />
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {services.map((service: any) => (
          <div
            key={service.id}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all duration-300
              
              shadow-md hover:shadow-xl

              ${getServiceBg(service.name)}

              /* Dark mode card style */
              dark:bg-white/10 
              dark:backdrop-blur-md 
              dark:border dark:border-white/10
              dark:hover:scale-105 dark:hover:bg-white/20
            `}
            onClick={() =>
              token
                ? history.push(`/service/${service.id}`)
                : history.push("/login")
            }
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl 
              dark:bg-white/20">
              <IonIcon icon={getServiceIcon(service.name)} />
            </div>

            <span className="font-semibold text-white dark:text-pink-100">
              {service.name}
            </span>
          </div>
        ))}
      </div>
    )}
  </section>

        <section className="mb-8 p-4 bg-gray-900 rounded-xl">
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold text-orange-200">
      Available Helpers in Kolkata
    </h2>
    <button
      className="flex items-center text-orange-400 font-semibold text-sm hover:underline transition"
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
    <p className="text-orange-300 text-center">No helpers available</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {helpers.map((helper: any) => {
        const helperImage =
          helper.profile_picture || "https://i.pravatar.cc/150";

        return (
          <div
            key={helper.account_id}
            className="
              flex items-center gap-4 p-4 rounded-2xl shadow-lg cursor-pointer
              bg-linear-to-r from-orange-900 via-orange-800 to-orange-950
              border border-orange-700
              hover:scale-105 hover:shadow-2xl transition-transform duration-300
            "
            onClick={() =>
              token
                ? history.push(`/helper-details/${helper.account_id}`)
                : history.push("/login")
            }
          >
            {/* Profile Pic */}
            <img
              src={helperImage}
              className="w-16 h-16 rounded-full object-cover border-2 border-orange-400"
              alt={helper.name}
            />

            {/* Helper Info */}
            <div className="flex-1">
              <p className="font-semibold text-orange-100 text-lg">{helper.name}</p>
              <p className="text-sm text-orange-200">
                Location: {helper.location?.city || "Kolkata"}, {helper.location?.area || "-"}
              </p>

              {/* Allocated Services */}
              {helper.allocated_services && helper.allocated_services.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {helper.allocated_services.map((service: string) => (
                    <span
                      key={service}
                      className="
                        flex items-center gap-1 bg-orange-700 text-orange-100 px-2 py-0.5
                        rounded-full text-xs font-semibold
                      "
                    >
                      <IonIcon icon={getServiceIcon(service)} className="text-orange-300 w-3 h-3" />
                      {service}
                    </span>
                  ))}
                </div>
              )}

              {/* Rating */}
              {helper.rating?.overall_rating > 0 && (
                <div className="flex items-center gap-1 mt-2">
                  {renderStars(helper.rating.overall_rating)}
                  <span className="text-yellow-400 font-medium text-sm">
                    {helper.rating.overall_rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )}
</section>

         {/* About App Section */}
{/* About App Section */}
<section className="mb-8 p-6 rounded-2xl shadow-lg bg-pink-600 dark:bg-pink-700 md:flex md:items-center md:gap-6 transition-colors duration-300">
  <img
    src={aboutUsImg}
    alt="About App"
    className="w-full md:w-1/3 rounded-xl shadow-md object-cover border-2 border-white/20"
  />
  <div className="mt-4 md:mt-0">
    <h3 className="text-2xl font-extrabold text-white mb-4">
      Why Choose HelperGo?
    </h3>
    <ul className="list-disc list-inside text-white/90 space-y-2">
      <li>Verified & Trusted Helpers</li>
      <li>Easy Booking & Scheduling</li>
      <li>Transparent Pricing</li>
      <li>24/7 Support</li>
      <li>Instant Ratings & Reviews</li>
    </ul>
  </div>
</section>

{/* Location Section */}
<section className="mb-8 flex flex-col md:flex-row items-center p-6 rounded-2xl shadow-lg bg-blue-600 dark:bg-blue-700 md:gap-6 transition-colors duration-300">
  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
    <img src={victoriaImg} alt="Kolkata" className="w-full h-full object-cover" />
  </div>
  <div className="mt-4 md:mt-0">
    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
      Available in Kolkata
    </h3>
    <p className="text-white/90 text-base md:text-lg leading-relaxed">
      Trusted helpers are available in different areas of Kolkata. Choose your preferred location.
    </p>
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

