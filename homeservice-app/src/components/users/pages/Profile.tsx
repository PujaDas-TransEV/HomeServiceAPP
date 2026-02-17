
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonIcon,
  IonLoading,
  IonToast,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonTitle,
} from "@ionic/react";
import {
  starOutline,
  locationOutline,
  personOutline,
  closeOutline,
  mapOutline
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import DefaultAvatar from "../../assets/profile.png";
import Logo from "../../assets/logo.jpg";

const ProfilePage: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [avgRating, setAvgRating] = useState("0");
  const [ratingCount, setRatingCount] = useState(0);

  const [registrationId, setRegistrationId] = useState("");
  const [role, setRole] = useState("");
  const [capacity, setCapacity] = useState("");
  const [profileKind, setProfileKind] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        history.push("/login");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          "http://192.168.0.187:9830/profiles/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error("Failed to load profile");

        // Set top-level info
        setRegistrationId(data.registration_id || "");
        setRole(data.role || "");
        setCapacity(data.capacity || "");
        setProfileKind(data.profile_kind || "");

        // Set profile info
        const profile = data.profile;
        setName(profile?.name || "");
        setCity(profile?.city || "");
        setArea(profile?.area || "");
        setAvgRating(profile?.avg_rating || "0");
        setRatingCount(profile?.rating_count || 0);
      } catch (err: any) {
        setToast(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [history]);

  const InfoRow = ({ icon, label, value }: any) => (
    <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-sm">
      <IonIcon icon={icon} className="text-indigo-600 text-xl" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value || "-"}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Right Side Menu */}
      <IonMenu side="end" contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList>
            <IonItem routerLink="/home" button>
              <IonLabel>🏠 Home</IonLabel>
            </IonItem>

            <IonItem routerLink="/profile" button>
              <IonLabel>👤 Profile</IonLabel>
            </IonItem>

            <IonItem routerLink="/chat" button>
              <IonLabel>💬 Chat</IonLabel>
            </IonItem>

            <IonItem routerLink="/maid-list" button>
              <IonLabel>🧹 Maid List</IonLabel>
            </IonItem>

            <IonItem routerLink="/preferences" button>
              <IonLabel>⚙️ Preferences</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => {
                localStorage.removeItem("access_token");
                history.push("/login");
              }}
            >
              <IonLabel className="text-red-500">🚪 Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Main Page */}
      <IonPage id="main-content">
        <IonHeader className="shadow-md">
          <IonToolbar className="bg-white px-4">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="logo" className="w-9 h-9 rounded-full" />
              <h1 className="text-xl font-bold text-indigo-600">HelperGo</h1>
            </div>
            <IonButtons slot="end">
              <IonMenuButton style={{ color: "#4f46e5" }} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="bg-linear-to-b from-indigo-50 via-indigo-100 to-white">
          <div className="max-w-md mx-auto mt-16 px-4">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative">
              {/* Header */}
              <div className="bg-linear-to-r from-indigo-500 via-indigo-400 to-indigo-600 p-6 relative flex flex-col items-center">
                <div className="w-32 h-32 -mt-6 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={DefaultAvatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white">{name || "User"}</h2>

                {/* Badges */}
                <div className="flex justify-center gap-2 mt-2 flex-wrap">
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full font-semibold">
                    Role: {role || "-"}
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full font-semibold">
                    Capacity: {capacity || "-"}
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full font-semibold">
                    Profile: {profileKind || "-"}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex justify-center items-center gap-2 mt-3">
                  <IonIcon icon={starOutline} className="text-yellow-400 text-xl" />
                  <span className="font-semibold text-white">{avgRating}</span>
                  <span className="text-white text-sm">({ratingCount} reviews)</span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 space-y-4">
                <InfoRow icon={personOutline} label="Full Name" value={name} />
                <InfoRow icon={locationOutline} label="City" value={city} />
                <InfoRow icon={mapOutline} label="Area" value={area} />
                <div className="text-gray-500 text-sm mt-2">
                  <p>
                    <span className="font-semibold">Registration ID:</span> {registrationId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <IonLoading isOpen={loading} message="Loading profile..." />
          <IonToast
            isOpen={!!toast}
            message={toast}
            duration={2000}
            onDidDismiss={() => setToast("")}
          />
        </IonContent>
      </IonPage>
    </>
  );
};

export default ProfilePage;
