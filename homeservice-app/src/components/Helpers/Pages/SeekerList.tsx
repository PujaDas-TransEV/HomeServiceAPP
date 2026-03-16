// pages/SeekerList.tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
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
  IonItem
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  peopleOutline,
  locationOutline,
  chatbubbleOutline,
  closeOutline,
  searchOutline,
  appsOutline,
  calendarOutline
} from "ionicons/icons";

import { FaHome, FaUser, FaComment, FaSignOutAlt, FaUsers, FaCog , FaClipboardList,FaCalendarAlt, FaHeadset} from "react-icons/fa";
import Logo from "../../assets/logo.jpg";

const serviceIcons: Record<string, any> = {
  "Baby sitting": peopleOutline,
  Cleaning: appsOutline,
  Cooking: appsOutline,
  "Elderly Care": peopleOutline,
  Driver: peopleOutline,
  Laundry: appsOutline,
  Fitness: appsOutline,
  Gardening: peopleOutline
};

const API_BASE = "http://192.168.0.187:9830";

export default function SeekerList() {
  const history = useHistory();

  const [seekers, setSeekers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const cardColors = ["bg-purple-50","bg-pink-50","bg-blue-50","bg-green-50","bg-yellow-50","bg-orange-50"];

  useEffect(() => {
    fetchServices();
    fetchSeekers();
    fetchProfile();
  }, []);

 
const fetchSeekers = async () => {
  setSelectedService(null);
  setLoading(true);
  const token = localStorage.getItem("access_token");
  try {
    const res = await fetch(`${API_BASE}/services/admin/user-report`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    // Filter only seekers
    const seekerList = (data.users || []).filter((user: any) => user.role === "seeker");
    setSeekers(seekerList);
  } catch (err) {
    console.log(err);
  }
  setLoading(false);
};
  /* ---------------- FETCH SERVICES ---------------- */
  const fetchServices = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${API_BASE}/services/getall`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setServices(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- FETCH PROFILE ---------------- */
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        history.push("/login");
        return;
      }
      const res = await fetch(`${API_BASE}/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` }
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

  /* ---------------- SERVICE FILTER ---------------- */
  const fetchServiceSeekers = async (serviceId: string) => {
    setSelectedService(serviceId);
    setLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${API_BASE}/services/service-participants/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      // Directly use seekers array
      const seekersList = data.seekers || [];
      setSeekers(seekersList);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredSeekers = seekers.filter((s) =>
    (s.name || "").toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      {/* ================= SIDE MENU ================= */}
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
            <div className="flex items-center justify-between w-full">
              <IonTitle className="text-purple-600 font-bold text-lg">HelperGo</IonTitle>
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

      {/* ================= HEADER ================= */}
      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-3">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <img src={Logo} className="w-10 h-10 rounded-full shadow-lg border-2 border-white" alt="logo" />
              <div>
                <p className="text-yellow-800 text-s opacity-80">Welcome back 👋</p>
                <p className="text-indigo-500 font-bold text-lg">{name || "User"}</p>
              </div>
            </div>
            <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.open()}>
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
                <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z" clipRule="evenodd" />
                </svg>
              </div>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent id="main-content" className="p-4 bg-linear-to-b from-indigo-50 via-purple-50 to-pink-50">

        {/* SEARCH */}
        <div className="flex items-center bg-blue-50 rounded-2xl shadow-md px-4 py-3 mb-5 border border-blue-100">
          <IonIcon icon={searchOutline} className="text-blue-500 text-xl mr-3" />
          <IonInput
            placeholder="Search seekers..."
            value={searchText}
            onIonInput={(e: any) => setSearchText(e.target.value)}
            className="bg-blue-50 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* SERVICE FILTER */}
        <div className="mb-5 flex items-center space-x-3">
          <div className="bg-pink-500 p-2 rounded-full shadow-md">
            <IonIcon icon={appsOutline} className="text-white text-xl" />
          </div>
          <h2 className="text-gray-900 font-extrabold text-lg tracking-wide">Filter Seekers by Service</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {/* ALL */}
          <div
            onClick={fetchSeekers}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition 
              ${!selectedService ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-700 shadow-md hover:bg-indigo-50"}`}
          >
            <IonIcon icon={appsOutline} className="text-2xl mb-2" />
            <p className="text-sm font-semibold text-center">All</p>
          </div>

          {services.map((service, index) => {
            const colors = ["bg-blue-100","bg-green-100","bg-pink-100","bg-yellow-100","bg-purple-100","bg-orange-100"];
            const bgColor = colors[index % colors.length];
            return (
              <div
                key={service.id}
                onClick={() => fetchServiceSeekers(service.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition
                  ${selectedService === service.id
                    ? "bg-indigo-600 text-white shadow-lg"
                    : `${bgColor} text-gray-700 shadow-md hover:brightness-95`
                  }`}
              >
                <IonIcon
                  icon={serviceIcons[service.name] || searchOutline}
                  className={`text-2xl mb-2 ${selectedService === service.id ? "text-white" : "text-gray-700"}`}
                />
                <p className="text-sm font-semibold text-center">{service.name}</p>
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

        {/* SEEKER LIST */}
        {!loading && (
          <div className="space-y-4">
               <h2 className="text-gray-800 font-bold text-lg mb-3 tracking-wide">All Seeker List</h2>
            {filteredSeekers.map((seeker, index) => (
              <div
                key={seeker.account_id}
                className={`flex flex-col p-4 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border ${cardColors[index % cardColors.length]}`}
                onClick={() => history.push(`/seeker/${seeker.account_id}`)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <IonAvatar className="w-14 h-14">
                    <img
                      src={seeker.profile_picture || "https://i.pravatar.cc/150"}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </IonAvatar>
                  <div>
                    <h2 className="font-semibold text-gray-900 text-base">{seeker.name}</h2>
                    <p className="text-sm text-gray-500">{seeker.phone}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <IonIcon icon={locationOutline} className="mr-1 text-gray-400" />
                      {seeker.location.city} • {seeker.location.area || "-"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {(seeker.required_services || []).map((service: string, i: number) => (
                    <IonChip key={i} color="secondary" className="text-xs">
                      <IonLabel>{service}</IonLabel>
                    </IonChip>
                  ))}
                </div>

                <div className="flex gap-2 justify-end">
                  <IonButton
                    size="small"
                    fill="solid"
                    color="primary"
                    className="rounded-full shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/seeker-chat/${seeker.account_id}`);
                    }}
                  >
                    <IonIcon icon={chatbubbleOutline} />
                  </IonButton>
                  
                </div>
              </div>
            ))}

            {filteredSeekers.length === 0 && !loading && (
              <div className="text-center text-gray-500 mt-20">
                <IonIcon icon={peopleOutline} className="text-4xl mb-2" />
                <p>No seekers found</p>
              </div>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}