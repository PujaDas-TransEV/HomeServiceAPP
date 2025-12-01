import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonButton,
  IonIcon,
  IonMenu,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/react";
import { cameraOutline, pencilOutline, checkmarkOutline, closeOutline } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { menuController } from "@ionic/core";
import DefaultAvatar from "../../assets/profile.png";
import Logo from "../../assets/logo.jpg";

export default function ProfilePage() {
  const history = useHistory();

  const [profileImage, setProfileImage] = useState(DefaultAvatar);
  const [name, setName] = useState("Rahim Khan");
  const [email, setEmail] = useState("rahim@example.com");
  const [phone, setPhone] = useState("+880 1234 567890");
  const [address, setAddress] = useState("Kolkata, India");
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Clear session or token here if needed
    history.push("/"); // Redirect to landing page
  };

  // Helper component for input/display
  const InfoField = ({ label, value, type, setter }: any) => (
    <div className="mb-4">
      <label className="block text-gray-600 mb-1 font-medium">{label}</label>
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
        />
      ) : (
        <p className="w-full border border-gray-200 rounded-xl p-3 bg-indigo-50 text-gray-700">{value}</p>
      )}
    </div>
  );

  return (
    <>
      {/* ---------- Drawer Menu ---------- */}
      <IonMenu side="end" menuId="main-menu" contentId="main-content">
        <IonContent className="bg-white">
          <IonList className="mt-4">
            <IonItem button onClick={() => { history.push("/home"); menuController.close("main-menu"); }}>
              <IonLabel className="text-lg">🏠 Home</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { history.push("/profile"); menuController.close("main-menu"); }}>
              <IonLabel className="text-lg">👤 Profile</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { history.push("/chat"); menuController.close("main-menu"); }}>
              <IonLabel className="text-lg">💬 Chat</IonLabel>
            </IonItem>
            <IonItem button onClick={() => { history.push("/maid-list"); menuController.close("main-menu"); }}>
              <IonLabel className="text-lg">🧹 Maid List</IonLabel>
            </IonItem>
            <IonItem
  button
  onClick={() => {
    history.push("/preferences"); // Navigate to preferences page
    menuController.close("main-menu");
  }}
>
  <IonLabel className="text-lg">⚙️ Preferences</IonLabel>
</IonItem>

            <IonItem button onClick={() => setShowLogoutModal(true)}>
              <IonLabel className="text-lg text-red-500">🚪 Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* ---------- Main Page ---------- */}
      <IonPage id="main-content">
        {/* ---------- Top Navbar ---------- */}
        <IonHeader className="shadow-md">
          <IonToolbar className="flex justify-between px-4 bg-white">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
                <img src={Logo} alt="logo" className="w-8 h-8 object-cover rounded-full" />
              </div>
              <h1 className="text-xl font-semibold text-indigo-600">Maidigo</h1>
            </div>
            <IonButtons slot="end">
              <IonMenuButton menu="main-menu" className="text-2xl" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {/* ---------- Profile Content ---------- */}
        <IonContent className="bg-linear-to-b from-indigo-50 to-white">
          <div className="max-w-md mx-auto mt-10 bg-linear-to-r from-indigo-100 via-indigo-50 to-indigo-100 rounded-3xl shadow-xl p-8 relative">
            
            {/* Profile Image */}
            <div className="flex justify-center -mt-20 relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-indigo-200 shadow-md"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-indigo-700">
                  <input type="file" className="hidden" onChange={handleImageChange} />
                  <IonIcon icon={cameraOutline} />
                </label>
              )}
            </div>

            {/* Input Fields */}
            <div className="mt-6">
              <InfoField label="Name" value={name} type="text" setter={setName} />
              <InfoField label="Email" value={email} type="email" setter={setEmail} />
              <InfoField label="Phone" value={phone} type="tel" setter={setPhone} />
              <InfoField label="Address" value={address} type="text" setter={setAddress} />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              {isEditing ? (
                <>
                  <IonButton onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2">
                    <IonIcon icon={checkmarkOutline} /> Save
                  </IonButton>
                  <IonButton onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl flex items-center gap-2">
                    <IonIcon icon={closeOutline} /> Cancel
                  </IonButton>
                </>
              ) : (
                <IonButton onClick={() => setIsEditing(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 mx-auto">
                  <IonIcon icon={pencilOutline} /> Edit Profile
                </IonButton>
              )}
            </div>
          </div>
        </IonContent>

        {/* ---------- Logout Modal ---------- */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Logout</h2>
              <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-4">
                <IonButton
                  fill="outline"
                  color="medium"
                  onClick={() => setShowLogoutModal(false)}
                  className="px-6 py-2 rounded-xl hover:bg-gray-100"
                >
                  No
                </IonButton>
                <IonButton
                  color="danger"
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-xl hover:bg-red-600"
                >
                  Yes
                </IonButton>
              </div>
            </div>
          </div>
        )}
      </IonPage>
    </>
  );
}
