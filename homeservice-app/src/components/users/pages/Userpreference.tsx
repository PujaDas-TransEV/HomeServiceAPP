import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonCheckbox } from '@ionic/react';

const WorkPreference: React.FC = () => {
  const options = [
    'Cooking',
    'Cleaning',
    'Babysitting',
    'Elderly Care',
    'Laundry',
    'Deep Cleaning'
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const togglePreference = (item: string) => {
    selected.includes(item)
      ? setSelected(selected.filter((x) => x !== item))
      : setSelected([...selected, item]);
  };

  const handleSubmit = () => {
    console.log("Selected Preferences:", selected);
    alert("Preference API call hobe ekhane");
  };

  return (
    <IonPage className="bg-pink-50 min-h-screen">
      <IonContent className="p-6">
        
        <h1 className="text-3xl font-extrabold text-indigo-600 mb-4 text-center">
          Select Your Preferences
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Choose the services you need
        </p>

        <div className="space-y-3">
          {options.map((item, i) => (
            <label
              key={i}
              className={`flex items-center p-4 rounded-2xl border shadow-md bg-white cursor-pointer transition 
              ${selected.includes(item) ? "border-indigo-500 bg-indigo-100" : ""}`}
            >
              <IonCheckbox
                checked={selected.includes(item)}
                onIonChange={() => togglePreference(item)}
                className="mr-3"
              />
              <span className="text-gray-700 font-medium">{item}</span>
            </label>
          ))}
        </div>

        <IonButton
          expand="block"
          color="primary"
          className="mt-6"
          onClick={handleSubmit}
        >
          Save Preferences
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default WorkPreference;
