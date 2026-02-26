import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonMenu,
  IonTitle,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonLoading,
  IonToast,
  IonModal,
  IonInput,
} from "@ionic/react";
import { starOutline, locationOutline, personOutline, mapOutline, closeOutline } from "ionicons/icons";
import { FaCog, FaComment, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
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

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  // Fetch profile info
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        history.push("/login");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("http://192.168.0.187:9830/profiles/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) throw new Error("Failed to load profile");

        setRegistrationId(data.registration_id || "");
        setRole(data.role || "");
        setCapacity(data.capacity || "");
        setProfileKind(data.profile_kind || "");

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

  // Info row component
  const InfoRow = ({ icon, label, value }: any) => (
    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-md">
      <IonIcon icon={icon} className="text-indigo-300 text-xl" />
      <div>
        <p className="text-xs text-white/80">{label}</p>
        <p className="font-semibold text-white">{value || "-"}</p>
      </div>
    </div>
  );

  // Change password handler
  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You are not logged in!");
      history.push("/login");
      return;
    }

    try {
      const res = await fetch("http://192.168.0.187:9830/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: passwords.oldPassword,
          new_password: passwords.newPassword,
          confirm_password: passwords.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      alert("Password changed successfully!");
      setIsPasswordOpen(false);
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <IonPage>
      {/* Side Menu */}
      <IonMenu side="end" contentId="main-content" type="overlay">
      <IonHeader>
  <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
    <div className="flex items-center justify-between w-full">
      {/* App Name on the left */}
      <IonTitle className="text-purple-400 font-bold">HelperGo</IonTitle>

      {/* Close Button on the right */}
      <IonButton
        fill="clear"
        onClick={() => document.querySelector("ion-menu")?.close()}
      >
        <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
      </IonButton>
    </div>
  </IonToolbar>
</IonHeader>
        <IonContent className="bg-indigo-50">
          <div className="flex flex-col p-2 space-y-2">
            <IonItem button className="hover:bg-indigo-100 rounded-lg" routerLink="/home">
              <FaHome className="text-purple-600 w-5 h-5 mr-3" />
              <IonLabel>Home</IonLabel>
            </IonItem>
            <IonItem button className="hover:bg-indigo-100 rounded-lg" routerLink="/profile">
              <FaUser className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem button className="hover:bg-indigo-100 rounded-lg" routerLink="/chat">
              <FaComment className="text-pink-600 w-5 h-5 mr-3" />
              <IonLabel>Chat</IonLabel>
            </IonItem>
            <IonItem button className="hover:bg-indigo-100 rounded-lg" routerLink="/maid-list">
              <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
              <IonLabel>Helper List</IonLabel>
            </IonItem>
            <IonItem button className="hover:bg-indigo-100 rounded-lg" routerLink="/preferences">
              <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Preferences</IonLabel>
            </IonItem>
            <IonItem
              button
              className="hover:bg-red-100 rounded-lg"
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

      {/* Header with App Name + Profile Name + Hamburger */}
      <IonHeader className="shadow-md">
        <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
          <div className="flex items-center justify-between w-full">
            {/* Left: App Logo + Name */}
            <div className="flex items-center gap-2">
              <img src={Logo} alt="App Logo" className="w-10 h-10 rounded-full" />
              <span className="text-indigo-400 font-bold text-lg">HelperGo</span>
            </div>

            {/* Center: Profile Name */}
            <div>
              <span className="text-pink-400 font-semibold text-lg">{name || "User"}</span>
            </div>

            {/* Right: Hamburger */}
            <IonButtons>
              <IonMenuButton>
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
                  <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </IonMenuButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent id="main-content" fullscreen scrollY={false} className="relative">
        {/* Background */}
        <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1400&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Profile Card */}
          <div className="relative z-10 flex items-center justify-center w-full">
            <div className="bg-linear-to-br from-indigo-700/40 via-purple-700/40 to-indigo-900/40 backdrop-blur-md border border-indigo-400/30 rounded-3xl shadow-2xl p-8 max-w-md w-full text-white">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 -mt-16 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img src={DefaultAvatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-indigo-100">{name || "User"}</h2>

                {/* Badges */}
                <div className="flex justify-center gap-2 mt-3 flex-wrap">
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
                  <span className="text-white/80 text-sm">({ratingCount} reviews)</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <InfoRow icon={personOutline} label="Full Name" value={name} />
                <InfoRow icon={locationOutline} label="City" value={city} />
                <InfoRow icon={mapOutline} label="Area" value={area} />
                <div className="text-white/80 text-sm mt-2">
                  <p>
                    <span className="font-semibold">Registration ID:</span> {registrationId}
                  </p>
                </div>
              </div>

              <IonButton
                expand="block"
                className="mt-6 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-xl"
                onClick={() => setIsPasswordOpen(true)}
              >
                Change Password
              </IonButton>
            </div>
          </div>
        </div>

        {/* Password Modal */}
        <IonModal isOpen={isPasswordOpen} backdropDismiss={true}>
          <div className="min-h-screen flex items-start justify-center p-6 relative">
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 w-full max-w-md bg-linear-to-br from-slate-700 to-purple-700 rounded-3xl shadow-2xl p-8 text-white translate-y-10">
              <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-linear-to-r from-purple-300 to-pink-300">
                Change Password
              </h2>

              <IonItem className="mb-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                <IonLabel position="stacked" className="text-white/90 font-medium">
                  Old Password
                </IonLabel>
                <IonInput
                  type="password"
                  value={passwords.oldPassword}
                  className="text-white placeholder-white"
                  onIonChange={(e) => setPasswords({ ...passwords, oldPassword: e.detail.value! })}
                />
              </IonItem>

              <IonItem className="mb-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                <IonLabel position="stacked" className="text-white/90 font-medium">
                  New Password
                </IonLabel>
                <IonInput
                  type="password"
                  value={passwords.newPassword}
                  className="text-white placeholder-white"
                  onIonChange={(e) => setPasswords({ ...passwords, newPassword: e.detail.value! })}
                />
              </IonItem>

              <IonItem className="mb-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                <IonLabel position="stacked" className="text-white/90 font-medium">
                  Confirm Password
                </IonLabel>
                <IonInput
                  type="password"
                  value={passwords.confirmPassword}
                  className="text-white placeholder-white"
                  onIonChange={(e) => setPasswords({ ...passwords, confirmPassword: e.detail.value! })}
                />
              </IonItem>

              <div className="flex justify-center gap-4 mt-6">
                <IonButton fill="solid" className="w-40" onClick={handleChangePassword}>
                  Update Password
                </IonButton>

                <IonButton
                  fill="outline"
                  className="w-40 text-white border-white/30 hover:border-white/50 rounded-xl py-2"
                  onClick={() => setIsPasswordOpen(false)}
                >
                  Cancel
                </IonButton>
              </div>
            </div>
          </div>
        </IonModal>

        <IonLoading isOpen={loading} message="Loading..." />
        <IonToast isOpen={!!toast} message={toast} duration={2000} onDidDismiss={() => setToast("")} />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;