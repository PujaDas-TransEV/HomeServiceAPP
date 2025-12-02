import {
  IonPage,
  IonContent,
  IonButton,
  IonToast,
  IonAvatar,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { menu, personCircle, chatbubbles, logOut } from "ionicons/icons";
import Logo from "../../assets/logo.jpg";
import DefaultAvatar from "../../assets/profile.png";

// Maid Interface
interface Maid {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  services: string[];
}

// Dummy current maid data
const currentMaid: Maid = {
  id: 101,
  name: "Ayesha Begum",
  phone: "+880 1111 2222",
  avatar: DefaultAvatar,
  services: [],
};

// Available services with Bengali translations
const serviceOptions = [
  { name: "Cleaning", bn: "পরিষ্কার", color: "bg-green-500", icon: "🧹" },
  { name: "Cooking", bn: "রান্না", color: "bg-yellow-500", icon: "🍳" },
  { name: "Laundry", bn: "লন্ড্রি", color: "bg-blue-500", icon: "🧺" },
  { name: "Babysitting", bn: "শিশু দেখাশোনা", color: "bg-pink-500", icon: "👶" },
  { name: "Elderly Care", bn: "বৃদ্ধদের যত্ন", color: "bg-purple-500", icon: "🧓" },
  { name: "Pet Care", bn: "পশুপালন", color: "bg-orange-500", icon: "🐶" },
];

const daysOfWeek = [
  { name: "Monday", bn: "সোমবার" },
  { name: "Tuesday", bn: "মঙ্গলবার" },
  { name: "Wednesday", bn: "বুধবার" },
  { name: "Thursday", bn: "বৃহস্পতিবার" },
  { name: "Friday", bn: "শুক্রবার" },
  { name: "Saturday", bn: "শনিবার" },
  { name: "Sunday", bn: "রবিবার" },
];

const MaidPreferencesPage: React.FC = () => {
  const history = useHistory();
  const [servicePreferences, setServicePreferences] = useState<string[]>([]);
  const [availabilityPreferences, setAvailabilityPreferences] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem(`maid-${currentMaid.id}-services`) || "[]");
    const savedAvailability = JSON.parse(localStorage.getItem(`maid-${currentMaid.id}-availability`) || "[]");
    setServicePreferences(savedServices);
    setAvailabilityPreferences(savedAvailability);
  }, []);

  const handleToggleService = (service: string) => {
    setServicePreferences((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleToggleAvailability = (day: string) => {
    setAvailabilityPreferences((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSavePreferences = () => {
    localStorage.setItem(`maid-${currentMaid.id}-services`, JSON.stringify(servicePreferences));
    localStorage.setItem(`maid-${currentMaid.id}-availability`, JSON.stringify(availabilityPreferences));
    setShowToast(true);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    history.push("/");
  };

  return (
    <IonPage className="bg-gray-100">

      {/* NAVBAR */}
      <div className="w-full bg-linear-to-r from-white-500 to-white-500 shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow">
            <img src={Logo} alt="Maidigo Logo" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-xl font-bold text-indigo-400">Maidigo (মেইডিগো)</h1>
        </div>

        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="p-2 rounded-lg bg-white text-pink-600 shadow hover:bg-pink-100 transition"
        >
          <IonIcon icon={menu} className="text-2xl" />
        </button>
      </div>

      {/* SIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50
          ${openMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-end">
          <button
            className="text-gray-600 font-bold text-xl"
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
            onClick={() => { setOpenMenu(false); history.push("/maid-chat"); }}
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

      {/* MAIN CONTENT */}
      <IonContent className="p-4">

        {/* Banner Section */}
        <div className="relative bg-linear-to-r from-pink-400 to-purple-500 text-white rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-4">
            <IonAvatar className="w-20 h-20 border-2 border-white shadow-lg">
              <img src={currentMaid.avatar} alt={currentMaid.name} />
            </IonAvatar>
            <div>
              <h2 className="text-2xl font-bold">{currentMaid.name}</h2>
              <p className="text-white/80 text-sm">{currentMaid.phone}</p>
            </div>
          </div>
          <p className="mt-4 text-white/90 text-base">
            Select your preferred services and availability below. <br />
            আপনার পছন্দের সার্ভিস ও উপলব্ধ দিনগুলো নির্বাচন করুন।
          </p>
        </div>

        {/* Services Section */}
        <h2 className="font-semibold text-gray-800 mb-4 text-lg">
          Select Your Service Preferences (আপনার পছন্দ)
        </h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {serviceOptions.map((service) => {
            const selected = servicePreferences.includes(service.name);
            return (
              <button
                key={service.name}
                className={`flex flex-col items-center justify-center gap-1 w-32 h-20 rounded-xl font-medium shadow-md transition-all
                  ${selected ? `${service.color} text-white shadow-lg` : "bg-white text-gray-700 border border-gray-300"}
                  hover:scale-105 hover:shadow-xl`}
                onClick={() => handleToggleService(service.name)}
              >
                <span className="text-2xl">{service.icon}</span>
                <span className="text-sm text-center">{service.name} ({service.bn})</span>
              </button>
            );
          })}
        </div>

        {/* Availability Section */}
        <div className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-xl font-bold mb-3 text-white">Availability (উপলব্ধতা)</h3>
          <p className="text-white/80 text-sm mb-5">
            Select the days you are available to work. <br />
            আপনার কাজের জন্য কোন দিনগুলো উপলব্ধ তা নির্বাচন করুন।
          </p>

          <div className="flex flex-wrap gap-3">
            {daysOfWeek.map((day) => {
              const selected = availabilityPreferences.includes(day.name);
              return (
                <button
                  key={day.name}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all 
                    ${selected
                      ? "bg-white text-purple-600 shadow-lg hover:scale-105"
                      : "bg-purple-600/20 text-white border border-white/40 hover:bg-purple-600/40 hover:text-white"
                    }`}
                  onClick={() => handleToggleAvailability(day.name)}
                >
                  {day.name} ({day.bn})
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <IonButton
          expand="block"
          color="primary"
          className="rounded-xl mb-6 shadow-md hover:scale-105 transition-transform"
          onClick={handleSavePreferences}
          disabled={servicePreferences.length === 0 && availabilityPreferences.length === 0}
        >
          Save Preferences (সংরক্ষণ করুন)
        </IonButton>

        {/* Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Preferences saved! (পছন্দ সংরক্ষণ করা হয়েছে!)"
          duration={1500}
          color="success"
        />

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Logout</h2>
              <p className="text-gray-700 mb-6">Are you sure you want to logout? (আপনি কি নিশ্চিত লগ আউট করতে চান?)</p>
              <div className="flex justify-end gap-4">
                <IonButton fill="outline" color="medium" onClick={() => setShowLogoutModal(false)}>
                  No (না)
                </IonButton>
                <IonButton color="danger" onClick={handleLogout}>
                  Yes (হ্যাঁ)
                </IonButton>
              </div>
            </div>
          </div>
        )}

      </IonContent>
    </IonPage>
  );
};

export default MaidPreferencesPage;
