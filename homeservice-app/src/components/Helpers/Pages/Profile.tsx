import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
  IonLoading,
  IonToast,
  IonModal,
} from "@ionic/react";
import {
  starOutline,
  locationOutline,
  personOutline,
  callOutline,
  menu,
  home,
  personCircle,
  chatbubbles,
  settings,
  logOut,
  idCardOutline,
  briefcaseOutline,
  languageOutline,
  peopleOutline,
  calendarOutline,
  schoolOutline,
  pinOutline
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DefaultAvatar from "../../assets/profile.png";
import Logo from "../../assets/logo.jpg";

const HelperProfilePage: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Root
  const [registrationId, setRegistrationId] = useState("");
  const [role, setRole] = useState("");
  const [capacity, setCapacity] = useState("");
  const [profileKind, setProfileKind] = useState("");

  // Profile
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [faith, setFaith] = useState("");
  const [languages, setLanguages] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [experience, setExperience] = useState<number | null>(null);
  const [avgRating, setAvgRating] = useState("0");
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        history.push("/login");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          "http://192.168.0.187:9830/profiles/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();
        if (!res.ok) throw new Error("Failed to load profile");

        setRegistrationId(data.registration_id);
        setRole(data.role);
        setCapacity(data.capacity);
        setProfileKind(data.profile_kind);

        const p = data.profile;
        setName(p?.name);
        setAge(p?.age);
        setFaith(p?.faith);
        setLanguages(p?.languages);
        setPhone(p?.phone);
        setCity(p?.city);
        setArea(p?.area);
        setExperience(p?.years_of_experience);
        setAvgRating(p?.avg_rating || "0");
        setRatingCount(p?.rating_count || 0);
      } catch (err: any) {
        setToast(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [history]);

  const InfoRow = ({ icon, label, value }: any) => (
    <div className="flex items-center gap-3 bg-white/80 rounded-xl p-4 shadow-sm">
      <IonIcon icon={icon} className="text-pink-600 text-xl" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value || "-"}</p>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.clear();
    history.push("/landing");
  };

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="bg-white px-4">
          {/* Logo + Title on left */}
          <div slot="start" className="flex items-center gap-2">
            <img src={Logo} className="w-9 h-9 rounded-full" alt="Logo" />
            <h1 className="text-xl font-bold text-pink-600">HelperGo</h1>
          </div>

          {/* Hamburger on right */}
          <IonButtons slot="end">
            <IonButton
              className="bg-pink-600 text-white rounded-lg"
              onClick={() => setOpenMenu(true)}
            >
              <IonIcon icon={menu} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* SIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300
        ${openMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-end">
          <button
            className="text-xl font-bold"
            onClick={() => setOpenMenu(false)}
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Menu Items */}
          {[
            { icon: home, label: "Home", path: "/helper-home" },
            { icon: personCircle, label: "Profile", path: "/helper-profile" },
            { icon: chatbubbles, label: "Chat", path: "/helper-chat" },
            { icon: settings, label: "Preferences", path: "/helper-preferences" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setOpenMenu(false);
                history.push(item.path);
              }}
            >
              <IonIcon icon={item.icon} className="text-pink-600 text-xl" />
              <span>{item.label}</span>
            </div>
          ))}

          {/* Logout */}
          <div
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 cursor-pointer text-red-500"
            onClick={() => {
              setOpenMenu(false);
              setShowLogoutModal(true);
            }}
          >
            <IonIcon icon={logOut} className="text-red-500 text-xl" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <IonContent className="bg-linear-to-b from-pink-100 to-white">
        <div className="max-w-md mx-auto mt-14 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8">

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <img src={DefaultAvatar} className="w-32 h-32 rounded-full" alt="Profile" />
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold text-center">{name}</h2>

            {/* Rating */}
            <div className="flex justify-center items-center gap-2 mt-2 text-pink-600">
              <IonIcon icon={starOutline} />
              <span className="font-semibold">{avgRating} Ratings</span>
              <span className="text-gray-500 text-sm">| {ratingCount} Reviews</span>
            </div>

            {/* Profile Info */}
           
            <div className="mt-6 space-y-4">
  <InfoRow icon={idCardOutline} label="Registration ID" value={registrationId} />   
  <InfoRow icon={personOutline} label="Role" value={role} />                        
  <InfoRow icon={peopleOutline} label="Capacity" value={capacity} />               
  <InfoRow icon={personCircle} label="Profile Type" value={profileKind} />        
  <InfoRow icon={calendarOutline} label="Age" value={age} />                        
  <InfoRow icon={languageOutline} label="Languages" value={languages} />           
  <InfoRow icon={schoolOutline} label="Faith" value={faith} />                      
  <InfoRow icon={callOutline} label="Phone" value={phone} />                        
  <InfoRow icon={locationOutline} label="City" value={city} />                     
  <InfoRow icon={pinOutline} label="Area" value={area} />                          
  <InfoRow icon={briefcaseOutline} label="Experience (Years)" value={experience} /> 
</div>

          </div>
        </div>

        {/* Loading & Toast */}
        <IonLoading isOpen={loading} message="Loading profile..." />
        <IonToast isOpen={!!toast} message={toast} duration={2000} />

        {/* LOGOUT MODAL */}
        <IonModal isOpen={showLogoutModal}>
          <div className="flex h-full items-center justify-center bg-black/30">
            <div className="bg-white p-6 rounded-xl text-center w-72">
              <p className="font-semibold mb-6">Are you sure you want to logout?</p>

              {/* Buttons Row */}
              <div className="flex justify-center gap-4">
                <IonButton color="danger" onClick={handleLogout}>Yes</IonButton>
                <IonButton color="medium" onClick={() => setShowLogoutModal(false)}>No</IonButton>
              </div>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default HelperProfilePage;
