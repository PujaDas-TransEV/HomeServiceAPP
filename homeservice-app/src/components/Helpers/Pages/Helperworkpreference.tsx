import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonCheckbox
} from "@ionic/react";
import logoImg from "../../assets/logo.jpg";

const HelperWorkPreference: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const services = [
    "Full-Time Maid",
    "Part-Time Maid",
    "Cooking",
    "Cleaning",
    "Deep Cleaning",
    "Baby Sitting",
    "Elderly Care",
    "Patient Care",
    "Laundry & Washing",
    "Dish Washing",
    "Shopping & Market Work",
    "House Keeping",
    "Nanny",
    "Home Nurse",
  ];

  const toggleService = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(s => s !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleSave = () => {
    console.log("Selected Services:", selected);
    alert("Preferences Saved Successfully!");
  };

  return (
    <IonPage className="min-h-screen bg-pink-50">
      
      {/* Navbar */}
      <div className="w-full bg-white shadow-md px-6 py-4 flex items-center gap-4 fixed top-0 z-20">
        <div className="w-14 h-14 rounded-full bg-pink-500 p-1 shadow-md">
          <img
            src={logoImg}
            alt="Logo"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-pink-600 tracking-wide">
          Helper Preferences
        </h1>
      </div>

      <IonContent className="pt-24 px-4 pb-10">
        
        {/* Page Title */}
        <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-6">
          Choose Your Work Skills
        </h2>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <p className="text-gray-700 text-center mb-5 font-medium">
            Select the services you can provide
          </p>

          <div className="grid grid-cols-1 gap-3">
            {services.map((item, i) => (
              <label
                key={i}
                className="flex items-center gap-3 bg-pink-50 border border-pink-200
                rounded-xl p-3 shadow-sm cursor-pointer hover:bg-pink-100 transition"
              >
                <IonCheckbox
                  checked={selected.includes(item)}
                  onIonChange={() => toggleService(item)}
                  className="text-pink-600 scale-110"
                />

                <span className="font-medium text-gray-800">{item}</span>
              </label>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <IonButton
              color="secondary"
              expand="block"
              onClick={handleSave}
              className="w-full rounded-xl text-lg font-semibold"
            >
              Save Preferences
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HelperWorkPreference;
