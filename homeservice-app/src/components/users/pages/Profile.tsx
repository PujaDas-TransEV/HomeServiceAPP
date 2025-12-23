
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
} from "@ionic/react";
import { starOutline, locationOutline, personOutline } from "ionicons/icons";
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
          "https://api.gshbe.transev.site/profiles/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error("Failed to load profile");

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
    <IonPage>
      {/* ---------- Header ---------- */}
      <IonHeader className="shadow-md">
        <IonToolbar className="bg-white px-4">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="logo" className="w-9 h-9 rounded-full" />
            <h1 className="text-xl font-bold text-indigo-600">Maidigo</h1>
          </div>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* ---------- Content ---------- */}
      <IonContent fullscreen className="bg-linear-to-b from-indigo-100 via-indigo-50 to-white">
        <div className="max-w-md mx-auto mt-14 px-4">
          
          {/* Profile Card */}
          <div className="relative bg-linear-to-br from-indigo-500 via-indigo-400 to-indigo-600 rounded-3xl p-1 shadow-2xl">
            <div className="bg-white rounded-3xl p-8">
              
              {/* Avatar */}
              <div className="flex justify-center -mt-24 mb-6">
                <div className="bg-white p-2 rounded-full shadow-xl">
                  <img
                    src={DefaultAvatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-center text-gray-800">
                {name || "User"}
              </h2>

              {/* Rating */}
              <div className="flex justify-center items-center gap-2 mt-2 text-indigo-600">
                <IonIcon icon={starOutline} />
                <span className="font-semibold">{avgRating}</span>
                <span className="text-gray-500 text-sm">
                  ({ratingCount} reviews)
                </span>
              </div>

              {/* Info */}
              <div className="mt-8 space-y-4">
                <InfoRow
                  icon={personOutline}
                  label="Full Name"
                  value={name}
                />
                <InfoRow
                  icon={locationOutline}
                  label="City"
                  value={city}
                />
                <InfoRow
                  icon={locationOutline}
                  label="Area"
                  value={area}
                />
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
  );
};

export default ProfilePage;
