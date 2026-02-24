
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
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import {
  starOutline,
  locationOutline,
  personOutline,
  callOutline,
  menu,
  idCardOutline,
  briefcaseOutline,
  languageOutline,
  peopleOutline,
  calendarOutline,
  schoolOutline,
  pinOutline,
  closeOutline,
  homeOutline,
  logOutOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DefaultAvatar from "../../assets/profile.png";
import Logo from "../../assets/logo.jpg";
import helper from "../../assets/helperprofile.jpeg";

const HelperProfilePage: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
        const res = await fetch("http://192.168.0.187:9830/profiles/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error("প্রোফাইল লোড করতে ব্যর্থ / Failed to load profile");

        setRegistrationId(data.registration_id);
        setRole(data.role);
        setCapacity(data.capacity);
        setProfileKind(data.profile_kind);

        const p = data.profile;
        setName(p?.name);
        setAge(p?.age);
        setFaith(p?.faith);
        setLanguages(p?.languages);
        setPhone(data.phone);
        setCity(p?.city);
        setArea(p?.area);
        setExperience(p?.years_of_experience);
        setAvgRating(p?.avg_rating || "0");
        setRatingCount(p?.rating_count || 0);
      } catch (err: any) {
        setToast(err.message || "কিছু ভুল হয়েছে / Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [history]);

  const InfoRow = ({ icon, label, value }: any) => (
    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-md mb-4">
      <IonIcon icon={icon} className="text-pink-600 text-xl" />
      <div>
        <p className="text-xs text-white/80">{label}</p>
        <p className="font-semibold text-white">{value || "-"}</p>
      </div>
    </div>
  );

  const InfoCard = ({ icon, label, value }: any) => (
    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-md flex-1">
      <IonIcon icon={icon} className="text-pink-600 text-xl" />
      <div>
        <p className="text-xs text-white/80">{label}</p>
        <p className="font-semibold text-white">{value || "-"}</p>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

 
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
      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-pink-500 to-purple-600 px-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="w-10 h-10 rounded-full" />
              <span className="text-indigo-700 font-bold text-lg">HelperGo</span>
            </div>
            <div>
              <span className="text-purple-300 font-semibold text-lg">{name || "ব্যবহারকারী / User"}</span>
            </div>
            <IonButtons>
              <IonButton fill="clear" onClick={() => setOpenMenu(true)}>
                <IonIcon icon={menu} className="text-pink-700 text-2xl" />
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      {/* SIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300
          ${openMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-bold text-indigo-500 text-lg">HelperGo</span>
          <button className="text-2xl font-bold text-pink-500" onClick={() => setOpenMenu(false)}>
            <IonIcon icon={closeOutline} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {[
            { icon: homeOutline, label: "হোম / Home", path: "/helper-home" },
            { icon: personOutline, label: "প্রোফাইল / Profile", path: "/maid-profile" },
            { icon: callOutline, label: "চ্যাট / Chat", path: "/maid-chat" },
            { icon: briefcaseOutline, label: "প্রেফারেন্সেস / Preferences", path: "/maid-preferences" },
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

          <div
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 cursor-pointer text-red-500"
            onClick={() => {
              setOpenMenu(false);
              setShowLogoutModal(true);
            }}
          >
            <IonIcon icon={logOutOutline} className="text-red-500 text-xl" />
            <span>লগ আউট / Logout</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <IonContent id="main-content" fullscreen>
        <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative"
          style={{ backgroundImage: `url(${helper})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-md">
            <div className="bg-linear-to-br from-indigo-700/40 via-purple-700/40 to-indigo-900/40 backdrop-blur-md border border-indigo-400/30 rounded-3xl shadow-2xl p-8 w-full text-white">

              <div className="flex flex-col items-center">
               

                <h2 className="text-2xl font-bold text-center">{name}</h2>

                {/* Rating */}
                <div className="flex justify-center items-center gap-2 mt-2">
                  <IonIcon icon={starOutline} className="text-yellow-400 text-xl" />
                  <span className="font-semibold">{avgRating}</span>
                  <span className="text-white/80 text-sm">({ratingCount} রিভিউ / Reviews)</span>
                </div>

                {/* Registration ID */}
                <InfoRow icon={idCardOutline} label="রেজিস্ট্রেশন আইডি / Registration ID" value={registrationId} />

                {/* Profile Info (2-column cards) */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <InfoCard icon={personOutline} label="রোল / Role" value={role} />
                  <InfoCard icon={peopleOutline} label="ক্যাপাসিটি / Capacity" value={capacity} />
                  <InfoCard icon={briefcaseOutline} label="প্রোফাইল টাইপ / Profile Type" value={profileKind} />
                  <InfoCard icon={calendarOutline} label="বয়স / Age" value={age} />
                  <InfoCard icon={languageOutline} label="ভাষা / Languages" value={languages} />
                  <InfoCard icon={schoolOutline} label="ধর্ম / Faith" value={faith} />
                  <InfoCard icon={callOutline} label="ফোন / Phone" value={phone} />
                  <InfoCard icon={locationOutline} label="শহর / City" value={city} />
                  <InfoCard icon={pinOutline} label="এলাকা / Area" value={area} />
                  <InfoCard icon={briefcaseOutline} label="অভিজ্ঞতা (বছর) / Experience (Years)" value={experience} />
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
                  <IonLabel position="stacked" className="text-white/90 font-medium">Old Password</IonLabel>
                  <IonInput
                    type="password"
                    value={passwords.oldPassword}
                    className="text-white placeholder-white"
                    onIonChange={(e) => setPasswords({ ...passwords, oldPassword: e.detail.value! })}
                  />
                </IonItem>

                <IonItem className="mb-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                  <IonLabel position="stacked" className="text-white/90 font-medium">New Password</IonLabel>
                  <IonInput
                    type="password"
                    value={passwords.newPassword}
                    className="text-white placeholder-white"
                    onIonChange={(e) => setPasswords({ ...passwords, newPassword: e.detail.value! })}
                  />
                </IonItem>

                <IonItem className="mb-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                  <IonLabel position="stacked" className="text-white/90 font-medium">Confirm Password</IonLabel>
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

          {/* Loading & Toast */}
          <IonLoading isOpen={loading} message="প্রোফাইল লোড হচ্ছে..." />
          <IonToast isOpen={!!toast} message={toast} duration={2000} />

          {/* Logout Modal */}
          <IonModal isOpen={showLogoutModal}>
            <div className="flex h-full items-center justify-center bg-black/30">
              <div className="bg-white p-6 rounded-xl text-center w-72">
                <p className="font-semibold mb-6">আপনি কি লগ আউট করতে চান? / Are you sure you want to logout?</p>
                <div className="flex justify-center gap-4">
                  <IonButton color="danger" onClick={handleLogout}>হ্যাঁ / Yes</IonButton>
                  <IonButton color="medium" onClick={() => setShowLogoutModal(false)}>না / No</IonButton>
                </div>
              </div>
            </div>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HelperProfilePage;

