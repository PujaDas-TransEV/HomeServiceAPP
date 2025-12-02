import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  IonModal,
} from "@ionic/react";
import {
  camera,
  menu,
  personCircle,
  chatbubbles,
  logOut,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo.jpg";

const MaidProfile: React.FC = () => {
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("Moushumi Khatun");
  const [phone, setPhone] = useState("017xxxxxxxx");
  const [email, setEmail] = useState("maid@example.com");
  const [area, setArea] = useState("Your Area");
  const [city, setCity] = useState("Your City");

  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log({ name, phone, email, area, city, profileImage });
    alert("Profile updated!");
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    history.push("/landing"); // redirect to landing page
  };

  return (
    <IonPage>
      <IonContent className="bg-linear-to-b from-pink-100 via-pink-50 to-white min-h-screen">

        {/* NAVBAR */}
        <div className="w-full bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-pink-100 border-2 border-pink-500 flex items-center justify-center shadow">
              <img src={Logo} alt="maidigo logo" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-xl font-bold text-indigo-500">
              Maidigo (মেইডিগো)
            </h1>
          </div>

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-2 rounded-lg bg-pink-600 text-white"
          >
            <IonIcon icon={menu} className="text-2xl" />
          </button>
        </div>

        {/* SIDE MENU */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-all duration-300 z-50
            ${openMenu ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4 border-b flex justify-end">
            <button
              className="text-gray-600 font-bold"
              onClick={() => setOpenMenu(false)}
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-4">
           
                       
  {/* Home */}
  <div
    className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
    onClick={() => { setOpenMenu(false); history.push("/helper-home"); }}
  >
    <IonIcon icon={personCircle} className="text-2xl text-pink-600" />
    <span className="text-lg font-medium">Home (হোম)</span>
  </div>
            {/* Profile */}
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => { setOpenMenu(false); history.push("/maid-profile"); }}
            >
              <IonIcon icon={personCircle} className="text-2xl text-pink-600" />
              <span className="text-lg font-medium">Profile (প্রোফাইল)</span>
            </div>

            {/* Chat */}
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => { setOpenMenu(false); history.push("/helper/chat"); }}
            >
              <IonIcon icon={chatbubbles} className="text-2xl text-pink-600" />
              <span className="text-lg font-medium">Chat (চ্যাট)</span>
            </div>

            {/* Logout */}
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => { setOpenMenu(false); setShowLogoutModal(true); }}
            >
              <IonIcon icon={logOut} className="text-2xl text-red-500" />
              <span className="text-lg font-medium text-red-500">Logout (লগআউট)</span>
            </div>
          </div>
        </div>

<IonModal isOpen={showLogoutModal} className="logout-modal">
  <div className="flex items-center justify-center h-full w-full bg-black/30">
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Are you sure you want to logout?{" "}
        <span className="text-pink-500">(আপনি কি লগআউট করতে চান?)</span>
      </h2>
      <div className="flex justify-center space-x-4 mt-4">
        <IonButton color="danger" onClick={handleLogout}>
          Yes (হ্যাঁ)
        </IonButton>
        <IonButton color="medium" onClick={() => setShowLogoutModal(false)}>
          No (না)
        </IonButton>
      </div>
    </div>
  </div>
</IonModal>



        {/* Maid Profile Card */}
        <div className="flex justify-center items-start py-12 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">

            {/* Profile Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32">
                <img
                  src={profileImage || Logo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-400 shadow-lg"
                />
                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-0 right-0 bg-pink-600 p-3 rounded-full cursor-pointer shadow-md hover:bg-pink-700 transition"
                >
                  <IonIcon icon={camera} className="text-white text-xl" />
                </label>
                <input
                  id="profileUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <h2 className="text-2xl font-bold text-pink-600 mt-4">{name}</h2>
            </div>

            {/* Editable Form */}
            <div className="space-y-5">

              {/* Name */}
              <div>
                <label className="font-semibold text-gray-700">
                  Full Name <span className="text-pink-500">(পূর্ণ নাম)</span>
                </label>
                <IonInput
                  value={name}
                  onIonChange={(e) => setName(e.detail.value!)}
                  placeholder="Enter your full name"
                  className="bg-pink-50 p-3 rounded-xl w-full shadow-inner mt-1 focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-semibold text-gray-700">
                  Phone Number <span className="text-pink-500">(ফোন নম্বর)</span>
                </label>
                <IonInput
                  value={phone}
                  onIonChange={(e) => setPhone(e.detail.value!)}
                  type="tel"
                  placeholder="Enter your phone number"
                  className="bg-pink-50 p-3 rounded-xl w-full shadow-inner mt-1 focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-semibold text-gray-700">
                  Email <span className="text-pink-500">(ইমেইল)</span>
                </label>
                <IonInput
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  type="email"
                  placeholder="Enter your email (optional)"
                  className="bg-pink-50 p-3 rounded-xl w-full shadow-inner mt-1 focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Area */}
              <div>
                <label className="font-semibold text-gray-700">
                  Area <span className="text-pink-500">(এলাকা)</span>
                </label>
                <IonInput
                  value={area}
                  onIonChange={(e) => setArea(e.detail.value!)}
                  placeholder="Enter your area"
                  className="bg-pink-50 p-3 rounded-xl w-full shadow-inner mt-1 focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* City */}
              <div>
                <label className="font-semibold text-gray-700">
                  City <span className="text-pink-500">(শহর)</span>
                </label>
                <IonInput
                  value={city}
                  onIonChange={(e) => setCity(e.detail.value!)}
                  placeholder="Enter your city"
                  className="bg-pink-50 p-3 rounded-xl w-full shadow-inner mt-1 focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Save Button */}
              <IonButton
                expand="block"
                color="danger"
                shape="round"
                className="mt-6 py-4 text-lg font-semibold shadow-lg hover:scale-105 transition transform"
                onClick={handleSave}
              >
                Save Profile <span className="text-white ml-2">(প্রোফাইল সংরক্ষণ)</span>
              </IonButton>

            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MaidProfile;
