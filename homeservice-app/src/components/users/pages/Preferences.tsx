import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonToast,
  IonCheckbox,
  IonList,
  IonAvatar,
  IonMenu,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

// Dummy Data
const dummyMaids: Maid[] = [
  { id: 1, name: "Ayesha Begum", phone: "+880 1111 2222", avatar: DefaultAvatar, services: ["Cleaning", "Cooking"] },
  { id: 2, name: "Fatima Akter", phone: "+880 3333 4444", avatar: DefaultAvatar, services: ["Babysitting"] },
  { id: 3, name: "Sohana Rahman", phone: "+880 5555 6666", avatar: DefaultAvatar, services: ["Cleaning", "Laundry"] },
  { id: 4, name: "Rina Khatun", phone: "+880 7777 8888", avatar: DefaultAvatar, services: ["Cooking"] },
  { id: 5, name: "Salma Parvin", phone: "+880 9999 0000", avatar: DefaultAvatar, services: ["Cleaning", "Cooking", "Babysitting"] },
];

const serviceOptions = ["Cleaning", "Cooking", "Laundry", "Babysitting"];

const PreferencesPage: React.FC = () => {
  const history = useHistory();

  // States must be inside the component
  const [preferences, setPreferences] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("preferredServices") || "[]");
    setPreferences(saved);
  }, []);

  // Toggle individual service
  const handleTogglePreference = (service: string) => {
    setPreferences((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  // Save preference to localStorage
  const handleSavePreferences = () => {
    localStorage.setItem("preferredServices", JSON.stringify(preferences));
    setShowToast(true);
  };

  // Logout handler
  const handleLogout = () => {
    setShowLogoutModal(false);
    history.push("/"); // landing page redirect
  };

  // Filter maids by selected preferences
  const filteredMaids = dummyMaids.filter((maid) =>
    preferences.some((pref) => maid.services.includes(pref))
  );

  // MENU (Same as other pages)
  const Menu = (
    <IonMenu side="end" menuId="main-menu" contentId="main-content">
      <IonContent className="bg-white">
        <IonList className="mt-4">

          <IonItem button onClick={() => history.push("/home")}>
            <IonLabel>🏠 Home</IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push("/profile")}>
            <IonLabel>👤 Profile</IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push("/chat")}>
            <IonLabel>💬 Chat</IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push("/maid-list")}>
            <IonLabel>🧹 Maid List</IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push("/preferences")}>
            <IonLabel className="text-lg">⚙️ Preferences</IonLabel>
          </IonItem>

          <IonItem button onClick={() => setShowLogoutModal(true)}>
            <IonLabel className="text-red-500">🚪 Logout</IonLabel>
          </IonItem>

        </IonList>
      </IonContent>
    </IonMenu>
  );

  return (
    <>
      {Menu}

      <IonPage id="main-content">
        {/* HEADER */}
        <IonHeader>
          <IonToolbar className="flex justify-between items-center px-4 py-2 bg-pink-500 text-white shadow-md">

            {/* Logo + App Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <img src={Logo} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
              </div>
              <h1 className="text-l font-bold text-indigo-400">HelperGo</h1>
            </div>

            {/* Hamburger */}
            <IonButtons slot="end">
              <IonMenuButton
                menu="main-menu"
                className="text-white bg-yellow-500 p-2 rounded-lg shadow-md hover:bg-yellow-600"
              />
            </IonButtons>

          </IonToolbar>
        </IonHeader>

        {/* BODY */}
        <IonContent className="p-4">

          <h2 className="font-semibold text-gray-800 mb-2">Select Your Preferred Services</h2>

          <IonList className="bg-white rounded-xl shadow-md mb-4">
            {serviceOptions.map((service) => (
              <IonItem key={service}>
                <IonLabel>{service}</IonLabel>
                <IonCheckbox
                  slot="end"
                  checked={preferences.includes(service)}
                  onIonChange={() => handleTogglePreference(service)}
                />
              </IonItem>
            ))}
          </IonList>

          <IonButton
            expand="block"
            color="primary"
            className="rounded-xl mb-6"
            onClick={handleSavePreferences}
            disabled={preferences.length === 0}
          >
            Save Preferences
          </IonButton>

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Preferences saved!"
            duration={1500}
            color="success"
          />

          {/* Recommended Maids */}
          <h2 className="font-semibold text-gray-800 mb-2">Recommended Maids</h2>

          {filteredMaids.length > 0 ? (
            <div className="space-y-4">
              {filteredMaids.map((maid) => (
                <div
                  key={maid.id}
                  className="flex items-center justify-between bg-white rounded-xl shadow-md p-3"
                >
                  <div className="flex items-center gap-3">
                    <IonAvatar className="w-12 h-12">
                      <img src={maid.avatar} alt={maid.name} />
                    </IonAvatar>

                    <div>
                      <h2 className="font-semibold text-gray-800">{maid.name}</h2>
                      <p className="text-gray-500 text-sm">{maid.phone}</p>
                      <p className="text-gray-600 text-sm">
                        Services: {maid.services.join(", ")}
                      </p>
                    </div>
                  </div>

                  <IonButton
                    onClick={() => history.push(`/chat?maidId=${maid.id}`)}
                    className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl"
                  >
                    Chat
                  </IonButton>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No maids found for your preferences.</p>
          )}

        </IonContent>

        {/* LOGOUT MODAL */}
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
                >
                  No
                </IonButton>

                <IonButton color="danger" onClick={handleLogout}>
                  Yes
                </IonButton>
              </div>
            </div>
          </div>
        )}

      </IonPage>
    </>
  );
};

export default PreferencesPage;
