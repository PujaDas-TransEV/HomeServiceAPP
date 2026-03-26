
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
import { eyeOutline } from "ionicons/icons";
import { FaHome, FaUser, FaComment, FaSignOutAlt, FaUsers, FaCog , FaCalendarAlt, FaHeadset} from "react-icons/fa";
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

  const lightCardColors = ["bg-purple-200","bg-pink-200","bg-blue-200","bg-green-200","bg-yellow-200","bg-orange-200"];
  const darkCardColors = ["bg-purple-800","bg-pink-800","bg-blue-800","bg-green-800","bg-yellow-800","bg-orange-800"];

  const darkTextColors = ["text-purple-300","text-pink-300","text-blue-300","text-green-300","text-yellow-300","text-orange-300"];
  const darkIconColors = ["text-purple-400","text-pink-400","text-blue-400","text-green-400","text-yellow-400","text-orange-400"];

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
      const seekerList = (data.users || []).filter((user: any) => user.role === "seeker");
      setSeekers(seekerList);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

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

  const filteredSeekers = seekers.filter((s) =>
    (s.name || "").toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      {/* ================= SIDE MENU ================= */}
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar className="bg-white dark:bg-gray-900 px-4">
            <div className="flex items-center justify-between w-full">
              <IonTitle className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">HelperGo</IonTitle>
              <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} className="text-pink-600 dark:text-pink-400 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-white dark:bg-gray-900">
          <div className="flex flex-col p-3 space-y-2">
            <IonItem button routerLink="/helper-home" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaHome className="text-red-600 dark:text-red-400 w-5 h-5 mr-3" />
              <IonLabel className="text-gray-900 dark:text-red-300">Home / হোম</IonLabel>
            </IonItem>
            <IonItem button routerLink="/maid-profile" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaUser className="text-orange-400 dark:text-orange-300 w-5 h-5 mr-3" />
              <IonLabel className="text-gray-900 dark:text-orange-300">Profile / প্রোফাইল</IonLabel>
            </IonItem>
            <IonItem button routerLink="/maid-chat" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaComment className="text-pink-600 dark:text-pink-400 w-5 h-5 mr-3" />
              <IonLabel className="text-gray-900 dark:text-pink-300">Chat / চ্যাট</IonLabel>
            </IonItem>
            <IonItem button routerLink="/seeker-list" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaUsers className="text-purple-600 dark:text-purple-400 w-5 h-5 mr-3" />
              <IonLabel className="text-gray-900 dark:text-purple-300">Seeker List / খোঁজকারী তালিকা</IonLabel>
            </IonItem>
            <IonItem button routerLink="/helper-bookings" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaCalendarAlt className="text-yellow-600 dark:text-yellow-400 w-5 h-5 mr-3" />
              <IonLabel className="text-gray-900 dark:text-yellow-300">Bookings / বুকিংসমূহ</IonLabel>
            </IonItem>
            <IonItem button routerLink="/maid-preferences" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaCog className="text-indigo-600 dark:text-indigo-400 w-5 h-5 mr-3" />
              <IonLabel className="text-gray-900 dark:text-indigo-300">Preferences / পছন্দসমূহ</IonLabel>
            </IonItem>
            <IonItem button routerLink="/support-system" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaHeadset className="text-green-600 dark:text-green-400 w-5 h-5 mr-3" />
              <IonLabel className="text-gray-900 dark:text-green-300">Help Desk / সহায়তা কেন্দ্র</IonLabel>
            </IonItem>
            <IonItem
              button
              className="rounded-lg hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                localStorage.removeItem("access_token");
                history.push("/login");
              }}
            >
              <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
              <IonLabel className="text-red-600 dark:text-red-400">Logout / লগ আউট</IonLabel>
            </IonItem>
          </div>
        </IonContent>
      </IonMenu>

      {/* ================= HEADER ================= */}
      <IonHeader>
        <IonToolbar className="bg-white dark:bg-gray-900 px-4 py-3">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <img src={Logo} className="w-10 h-10 rounded-full shadow-lg border-2 border-gray-200 dark:border-gray-700" alt="logo" />
              <div>
                <p className="text-orange-500 dark:text-orange-400 text-m">Welcome 👋</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">{name || "User"}</p>
              </div>
            </div>
            <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.open()}>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800/30 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z" clipRule="evenodd" />
                </svg>
              </div>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent id="main-content" className="p-4 bg-gray-50 dark:bg-gray-900">

        {/* SEARCH */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md px-4 py-3 mb-5 border border-gray-200 dark:border-gray-700">
          <IonIcon icon={searchOutline} className="text-indigo-600 dark:text-indigo-400 text-xl mr-3" />
          <IonInput
            placeholder="Search seekers..."
            value={searchText}
            onIonInput={(e: any) => setSearchText(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* SERVICE FILTER */}
        <div className="mb-5 flex items-center space-x-3">
          <div className="bg-pink-500 dark:bg-pink-600 p-2 rounded-full shadow-md">
            <IonIcon icon={appsOutline} className="text-white text-xl" />
          </div>
          <h2 className="text-gray-900 dark:text-gray-100 font-extrabold text-lg tracking-wide">Filter Seekers by Service</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {/* ALL */}
          <div
            onClick={() => { setSelectedService(null); fetchSeekers(); }}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition 
              ${!selectedService ? "bg-indigo-600 text-white shadow-lg dark:bg-indigo-500" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md hover:bg-indigo-50 dark:hover:bg-indigo-600"}`}
          > 
            <IonIcon icon={appsOutline} className="text-2xl mb-2" />
            <p className="text-sm font-semibold text-center">All</p>
          </div>

          {services.map((service, index) => {
            const bgLight = lightCardColors[index % lightCardColors.length];
            const bgDark = darkCardColors[index % darkCardColors.length];
            const textDark = darkTextColors[index % darkTextColors.length];
            const iconDark = darkIconColors[index % darkIconColors.length];
            return (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedService(service.id);
                  history.push(`/service-seeker/${service.id}`);
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition
                  ${selectedService === service.id 
                    ? "bg-indigo-600 dark:bg-indigo-500 text-white"
                    : `${bgLight} dark:${bgDark} text-gray-900 dark:${textDark}`}`}
              >
                <IonIcon
                  icon={serviceIcons[service.name] || searchOutline}
                  className={`text-2xl mb-2 ${selectedService === service.id ? "text-white" : `dark:${iconDark}`}`}
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
            <h2 className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-3 tracking-wide">All Seeker List</h2>
            {filteredSeekers.map((seeker, index) => {
              const textDark = darkTextColors[index % darkTextColors.length];
              const iconDark = darkIconColors[index % darkIconColors.length];
              return (
              <div
                key={seeker.account_id}
                className={`flex flex-col p-4 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border 
                  ${lightCardColors[index % lightCardColors.length]} dark:${darkCardColors[index % darkCardColors.length]}`}
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
                    <h2 className={`font-semibold text-base text-gray-900 dark:${textDark}`}>{seeker.name}</h2>
                    <p className={`text-sm text-gray-500 dark:text-gray-400`}>{seeker.phone}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <IonIcon icon={locationOutline} className={`mr-1 text-gray-400 dark:${iconDark}`} />
                      {seeker.location.city} • {seeker.location.area || "-"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {(seeker.required_services || []).map((service: string, i: number) => (
                    <IonChip key={i} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
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
    history.push(`/seeker/${seeker.account_id}`); // navigates to view seeker
  }}
>
  <IonIcon icon={eyeOutline} />
</IonButton>
                </div>
              </div>
            )})}

            {filteredSeekers.length === 0 && !loading && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
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