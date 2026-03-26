
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonAvatar,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonChip,
  IonSpinner,
  IonMenu,
  IonTitle,
  IonItem,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  constructOutline,
  restaurantOutline,
  peopleOutline,
  heartOutline,
  carOutline,
  cogOutline,
  fitnessOutline,
  leafOutline,
  searchOutline,
  appsOutline,
  locationOutline,
  chatbubbleOutline,
  calendarOutline,
  closeOutline,
} from "ionicons/icons";
import {
  FaCog,
  FaComment,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaHeadset,
} from "react-icons/fa";

import Logo from "../../assets/logo.jpg";

// Map service name to icons
const serviceIcons: any = {
  "Baby sitting": peopleOutline,
  Cleaning: constructOutline,
  Cooking: restaurantOutline,
  "Elderly Care": heartOutline,
  Driver: carOutline,
  Laundry: cogOutline,
  Fitness: fitnessOutline,
  Gardening: leafOutline,
};

const API_BASE = "http://192.168.0.187:9830";

export default function HelperList() {
  const history = useHistory();

  const [services, setServices] = useState<any[]>([]);
  const [helpers, setHelpers] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  // Colorful card backgrounds for light mode
  const cardColorsLight = [
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-pink-50",
    "bg-purple-50",
    "bg-orange-50",
  ];

  // Colorful card backgrounds for dark mode
  const cardColorsDark = [
    "bg-blue-900",
    "bg-green-900",
    "bg-yellow-900",
    "bg-pink-900",
    "bg-purple-900",
    "bg-orange-900",
  ];

  // Detect dark mode
  const [darkMode, setDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    fetchServices();
    fetchHelpers();
    fetchProfile();
  }, []);

  /* ---------------- SERVICES ---------------- */
  const fetchServices = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${API_BASE}/services/getall`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setServices(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- ALL HELPERS ---------------- */
  const fetchHelpers = async () => {
    setSelectedService(null);
    setLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${API_BASE}/services/admin/user-report`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const helperList = (data.users || []).filter(
        (user: any) => user.role === "helper"
      );
      setHelpers(helperList);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  /* ---------------- SEARCH ---------------- */
  const filteredHelpers = helpers.filter((h) =>
    (h.name || "").toLowerCase().includes(searchText.toLowerCase())
  );

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        history.push("/login");
        return;
      }

      const res = await fetch(`${API_BASE}/profiles/me`, {
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

  return (
    <IonPage className={darkMode ? "dark" : ""}>
      {/* ================= SIDE MENU ================= */}
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar
            className={
              darkMode
                ? "bg-gray-800 px-4"
                : "bg-linear-to-r from-indigo-600 to-purple-600 px-4"
            }
          >
            <div className="flex items-center justify-between w-full">
              <IonTitle
                className={darkMode ? "text-white font-bold text-lg" : "text-purple-600 font-bold text-lg"}
              >
                HelperGo
              </IonTitle>
              <IonButton
                fill="clear"
                onClick={() => document.querySelector("ion-menu")?.close()}
              >
                <IonIcon
                  icon={closeOutline}
                  className={darkMode ? "text-white text-xl" : "text-pink-600 text-xl"}
                />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent className={darkMode ? "bg-gray-900 text-white" : "bg-indigo-50"}>
          <div className="flex flex-col p-3 space-y-2">
            <IonItem
              button
              routerLink="/home"
              className={`rounded-lg hover:bg-indigo-100 ${darkMode && "hover:bg-gray-700"}`}
            >
              <FaHome className="text-purple-600 w-5 h-5 mr-3" />
              <IonLabel>Home</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/profile"
              className={`rounded-lg hover:bg-indigo-100 ${darkMode && "hover:bg-gray-700"}`}
            >
              <FaUser className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Profile</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/chat"
              className={`rounded-lg hover:bg-indigo-100 ${darkMode && "hover:bg-gray-700"}`}
            >
              <FaComment className="text-pink-600 w-5 h-5 mr-3" />
              <IonLabel>Chat</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/maid-list"
              className={`rounded-lg hover:bg-indigo-100 ${darkMode && "hover:bg-gray-700"}`}
            >
              <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
              <IonLabel>Helper List</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/my-bookings"
              className={`rounded-lg hover:bg-indigo-100 ${darkMode && "hover:bg-gray-700"}`}
            >
              <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
              <IonLabel>My Bookings</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/preferences"
              className={`rounded-lg hover:bg-indigo-100 ${darkMode && "hover:bg-gray-700"}`}
            >
              <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Preferences</IonLabel>
            </IonItem>

            <IonItem
              button
              routerLink="/support"
              className={`rounded-lg hover:bg-indigo-100 ${darkMode && "hover:bg-gray-700"}`}
            >
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
        <IonToolbar
          className={
            darkMode
              ? "bg-gray-800 px-4 py-3"
              : "bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-3"
          }
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
                alt="logo"
              />
              <div>
                <p
                  className={
                    darkMode ? "text-yellow-300 text-s opacity-80" : "text-yellow-800 text-s opacity-80"
                  }
                >
                  Welcome back 👋
                </p>
                <p
                  className={darkMode ? "text-white font-bold text-lg" : "text-indigo-500 font-bold text-lg"}
                >
                  {name || "User"}
                </p>
              </div>
            </div>

            <IonButton
              fill="clear"
              onClick={() => document.querySelector("ion-menu")?.open()}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
                <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
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

      <IonContent
        className={`p-4 ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-linear-to-b from-indigo-50 via-purple-50 to-pink-50"
        }`}
      >
        {/* SEARCH */}
        <div
          className={`flex items-center rounded-2xl shadow-md px-4 py-3 mb-5 border ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-blue-50 border-blue-100"
          }`}
        >
          <IonIcon
            icon={searchOutline}
            className={darkMode ? "text-white text-xl mr-3" : "text-blue-500 text-xl mr-3"}
          />
          <IonInput
            placeholder="Search helpers..."
            value={searchText}
            onIonInput={(e: any) => setSearchText(e.target.value)}
            className={`${darkMode ? "bg-gray-800 text-white placeholder-gray-400" : "bg-blue-50 text-gray-700 placeholder-gray-400"}`}
          />
        </div>

        {/* FILTER TITLE */}
        <div className="mb-5 flex items-center space-x-3">
          <div className={`${darkMode ? "bg-purple-700" : "bg-green-500"} p-2 rounded-full shadow-md`}>
            <IonIcon
              icon={appsOutline}
              className="text-white text-xl"
            />
          </div>
          <h2 className={`${darkMode ? "text-white" : "text-gray-900"} font-extrabold text-lg tracking-wide`}>
            Filter Helpers by Service
          </h2>
        </div>

        
{/* SERVICE FILTER GRID */}
<div className="grid grid-cols-3 gap-3 mb-5">
  {/* ALL */}
  <div
    onClick={() => fetchHelpers()}
    className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition ${
      !selectedService
        ? "bg-indigo-600 text-white shadow-lg"
        : darkMode
        ? "bg-gray-800 text-white shadow-md hover:bg-gray-700"
        : "bg-white text-gray-700 shadow-md hover:bg-indigo-50"
    }`}
  >
    <IonIcon icon={appsOutline} className="text-2xl mb-2 text-white" />
    <p className="text-sm font-semibold text-center">All</p>
  </div>

  {services.map((service, index) => {
    const bgColor = darkMode
      ? cardColorsDark[index % cardColorsDark.length]
      : cardColorsLight[index % cardColorsLight.length];

    // Custom icon colors
    const iconColors: any = {
      "Baby Sitting": "text-pink-500",
      Cleaning: "text-blue-500",
      Cooking: "text-orange-500",
      "Elderly Care": "text-green-500",
      Driver: "text-purple-500",
      Laundry: "text-teal-500",
      Fitness: "text-red-500",
      Gardening: "text-yellow-500",
       "Baby sitting": "text-pink-500",
    };

    // Custom text colors (different from icon)
    const textColors: any = {
      "Baby Sitting": "text-pink-700",
      Cleaning: "text-blue-700",
      Cooking: "text-orange-700",
      "Elderly Care": "text-green-700",
      Driver: "text-purple-700",
      Laundry: "text-teal-700",
      Fitness: "text-red-700",
      Gardening: "text-yellow-700",
        "Baby sitting": "text-pink-500",
    };

    return (
      <div
        key={service.id}
        onClick={() => history.push(`/service/${service.id}`)}
        className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition ${
          selectedService === service.id
            ? "bg-indigo-600 text-white shadow-lg"
            : `${bgColor} shadow-md hover:brightness-95`
        }`}
      >
        <IonIcon
          icon={serviceIcons[service.name] || searchOutline}
          className={`text-2xl mb-2 ${selectedService === service.id ? "text-white" : iconColors[service.name] || "text-gray-700"}`}
        />
        <p className={`text-sm font-semibold text-center ${selectedService === service.id ? "text-white" : textColors[service.name] || "text-gray-700"}`}>
          {service.name}
        </p>
      </div>
    );
  })}
</div>
        {/* LOADING */}
        {loading && (
          <div className="flex justify-center items-center mt-16">
            <IonSpinner color="primary" />
          </div>
        )}

        {/* HELPER LIST */}
        {!loading && (
          <>
            <h2 className={`${darkMode ? "text-white" : "text-gray-800"} font-bold text-lg mb-3 tracking-wide`}>
              All Helper List
            </h2>

            <div className="space-y-4">
              {filteredHelpers.map((helper, index) => (
                <div
                  key={helper.account_id}
                  className={`flex items-center justify-between p-4 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border ${
                    darkMode
                      ? cardColorsDark[index % cardColorsDark.length]
                      : cardColorsLight[index % cardColorsLight.length]
                  }`}
                  onClick={() => history.push(`/helper/${helper.account_id}`)}
                >
                  <div className="flex items-center gap-3">
                    <IonAvatar className="w-14 h-14">
                      <img
                        src={helper.profile_picture || "https://i.pravatar.cc/150"}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </IonAvatar>

                    <div>
                      <h2 className={`${darkMode ? "text-white" : "text-gray-900"} font-semibold text-base`}>
                        {helper.name}
                      </h2>
                      <p className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-sm`}>
                        {helper.phone}
                      </p>
                      <div className={`flex items-center text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <IonIcon icon={locationOutline} className="mr-1" />
                        {helper.location.city} • {helper.location.area}
                      </div>
                      {helper.service_name && (
                        <IonChip color="secondary" className="mt-1 text-xs">
                          <IonLabel>{helper.service_name}</IonLabel>
                        </IonChip>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    

                <IonButton
  size="small"
  fill="solid"
  color="success"
  className="rounded-full shadow flex items-center"
  onClick={(e) => {
    e.stopPropagation();
    history.push(`/booking/${helper.registration_id}`);
  }}
>
  Book Now
  <IonIcon icon={calendarOutline} className="ml-2" />
</IonButton>
                  </div>
                </div>
              ))}

              {filteredHelpers.length === 0 && !loading && (
                <div className="text-center mt-20">
                  <IonIcon
                    icon={searchOutline}
                    className={darkMode ? "text-white text-4xl mb-2" : "text-gray-400 text-4xl mb-2"}
                  />
                  <p className={darkMode ? "text-white" : "text-gray-500"}>No helpers found</p>
                </div>
              )}
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}