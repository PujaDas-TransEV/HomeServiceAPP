
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonMenu,
  IonMenuToggle,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaIdCard,
  FaBars,
  FaLock,
  FaSignOutAlt,
    FaTachometerAlt, 
  FaCogs, 
} from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { chatbubblesOutline, closeOutline, peopleOutline, settingsOutline } from "ionicons/icons";
const AdminProfile: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const [registrationId, setRegistrationId] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


// In your component:
const [showOldPassword, setShowOldPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      setPhone(data.phone);
        const p = data.profile;
        setName(p?.name);
      
        setCity(p?.city);
        setArea(p?.area);
      } catch (err: any) {
        setToast(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [history]);

  const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.clear();

  const menu = document.querySelector("ion-menu");
  if (menu) (menu as any).close();

  history.replace("/login");
};


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
        Authorization: `Bearer ${token}`, // Authorization header
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
    <>
      {/* SIDE MENU */}
      <IonMenu contentId="main-content" side="end">
    <IonContent className="bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-white p-6 ">

  {/* Sidebar Header */}

<div className="mb-10 flex justify-between items-center">
  <h2 className="text-xl font-bold tracking-wide text-purple-300 ml-5">
    Admin Panel
  </h2>

  {/* Close Button on the right */}
  <IonButton
    fill="clear"
    onClick={() => (window as any).document.querySelector("ion-menu")?.close()}
  >
    <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
  </IonButton>
</div>
<div className="space-y-4">

    {/* Profile */}
    <div
      onClick={() => history.push("/admin-profile")}
        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
    >
      <FaUserCircle className="text-purple-400 text-lg group-hover:scale-110 transition-all duration-300" />
      <span className="font-medium tracking-wide group-hover:text-white-300">
        Profile
      </span>
    </div>

    {/* Dashboard */}
    <div
      onClick={() => history.push("/admin-home")}
        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
    >
      <FaTachometerAlt className="text-indigo-400 text-lg group-hover:scale-110 transition-all duration-300" />
      <span className="font-medium tracking-wide group-hover:text-indigo-300">
        Dashboard
      </span>
    </div>
  {/* Manage Users */}
          {/* Manage Users */}
<div
  onClick={() => history.push("/manage-users")}
  className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-md border border-white/10"
>
  <IonIcon
    icon={peopleOutline}
    className="text-purple-400 text-xl group-hover:scale-110 transition-all duration-300"
  />
  <span className="font-medium tracking-wide group-hover:text-white-300">
    Manage Users
  </span>
</div>

    {/* Manage Services */}
   <div
  onClick={() => history.push("/admin-service")}
  className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-pink-600/30 transition-all duration-300 cursor-pointer backdrop-blur-md border border-white/10"
>
  <IonIcon
    icon={settingsOutline}
    className="text-pink-400 text-xl group-hover:scale-110 transition-all duration-300"
  />
  <span className="font-medium tracking-wide group-hover:text-white-300">
    Manage Services
  </span>
</div>
<div
  onClick={() => history.push("/manage-support")}
  className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-pink-600/30 transition-all duration-300 cursor-pointer backdrop-blur-md border border-white/10"
>
  <IonIcon
    icon={chatbubblesOutline}
    className="text-pink-400 text-xl group-hover:scale-110 transition-all duration-300"
  />
  <span className="font-medium tracking-wide group-hover:text-white-300">
    Manage Support
  </span>
</div>

    {/* Logout */}
    <div
      onClick={handleLogout}
         className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
    >
      <FaSignOutAlt className="text-red-400 text-lg group-hover:scale-110 transition-all duration-300" />
      <span className="font-medium tracking-wide text-red-400 group-hover:text-red-300">
        Logout
      </span>
    </div>

  </div>

</IonContent>





      </IonMenu>

      <IonPage id="main-content">
        {/* HEADER WITH HAMBURGER */}
        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-purple-800 to-indigo-800 text-indigo-400 px-4">
            <div className="flex justify-between items-center w-full">
              <IonTitle className="text-lg font-semibold">
                Admin Profile
              </IonTitle>

              <IonButton
                fill="clear"
                onClick={() =>
                  (window as any).document.querySelector("ion-menu")?.open()
                }
              >
                <FaBars className="text-pink-800 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent >
         {/* Full Background Image */}
         <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1400&q=80')",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

            {/* PROFILE CARD */}
         <div className="bg-linear-to-br from-indigo-700/40 via-purple-700/40 to-indigo-900/40 backdrop-blur-md border border-indigo-400/30 rounded-3xl shadow-2xl p-8 max-w-md w-full text-white">



              <div className="flex justify-center mb-4">
                <FaUserCircle size={100} className="text-purple-300" />
              </div>

              <h2 className="text-2xl font-bold text-center">{name}</h2>
              <p className="text-center text-purple-300 mb-6">{role}</p>

              <div className="space-y-4">

                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                  <FaIdCard className="text-purple-300" />
                  <span>{registrationId}</span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                  <FaMapMarkerAlt className="text-purple-300" />
                  <span>{city}, {area}</span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                  <FaPhone className="text-purple-300" />
                  <span>{phone}</span>
                </div>

              </div>

              {/* CHANGE PASSWORD BUTTON */}
              <IonButton
                expand="block"
                className="mt-6 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-xl"
                onClick={() => setIsPasswordOpen(true)}
              >
                <FaLock className="mr-2" />
                Change Password
              </IonButton>

              {loading && (
                <p className="text-center mt-4 text-purple-200">Loading...</p>
              )}

              {toast && (
                <p className="text-center mt-4 text-red-400">{toast}</p>
              )}
            </div>
          </div>
        </IonContent>
      </IonPage>

      {/* PASSWORD MODAL */}
 <IonModal isOpen={isPasswordOpen} backdropDismiss={true}>
  <div className="min-h-screen flex items-start justify-center p-6 relative">

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Modal Card */}
    <div className="relative z-10 w-full max-w-md bg-linear-to-br from-slate-700 to-purple-700 rounded-3xl shadow-2xl p-8 text-white translate-y-10">
      
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-linear-to-r from-purple-300 to-pink-300">
        Change Password
      </h2>

      {/* Old Password */}
      <IonItem className="mb-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
        <IonLabel position="stacked" className="text-white/90 font-medium">Old Password</IonLabel>
        <IonInput
          type="password"
          value={passwords.oldPassword}
          className="text-white placeholder-white"
          onIonChange={(e) => setPasswords({ ...passwords, oldPassword: e.detail.value! })}
        />
      </IonItem>

      {/* New Password */}
      <IonItem className="mb-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
        <IonLabel position="stacked" className="text-white/90 font-medium">New Password</IonLabel>
        <IonInput
          type="password"
          value={passwords.newPassword}
          className="text-white placeholder-white"
          onIonChange={(e) => setPasswords({ ...passwords, newPassword: e.detail.value! })}
        />
      </IonItem>

      {/* Confirm Password */}
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
  {/* Update Password Button */}
  <IonButton
    fill="solid"
    className="w-40 "
    onClick={handleChangePassword}
  >
    Update Password
  </IonButton>

  {/* Cancel Button */}
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



    </>
  );
};

export default AdminProfile;
