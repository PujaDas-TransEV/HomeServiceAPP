import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenu,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonList,
  IonFooter,
} from "@ionic/react";

import {
  menuOutline,
  closeOutline,
  homeOutline,
  personCircleOutline,
  settingsOutline,
  logOutOutline,
  star,
  locationOutline,
  peopleOutline,
} from "ionicons/icons";

import logoImg from "../../assets/logo.jpg";

const MaidDetails: React.FC = () => {
  const [maids] = useState([
    {
      id: 1,
      name: "Anita Sharma",
      age: 28,
      skills: "Cleaning, Cooking",
      rating: 4.8,
      salary: "₹10,000",
      location: "Kolkata",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      id: 2,
      name: "Rita Das",
      age: 32,
      skills: "Baby Care, Cleaning",
      rating: 4.9,
      salary: "₹12,000",
      location: "Howrah",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Sunita Devi",
      age: 26,
      skills: "Cooking, Dishwashing",
      rating: 4.7,
      salary: "₹9,000",
      location: "Salt Lake",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 4,
      name: "Lata Mondal",
      age: 30,
      skills: "Cleaning, Laundry",
      rating: 4.6,
      salary: "₹11,000",
      location: "Dum Dum",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ]);

  const redirect = (p: string) => (window.location.href = p);

  return (
    <>
      {/* SIDE MENU */}
      <IonMenu side="end" menuId="maidMenu" contentId="maidContent">
        <IonHeader>
          <IonToolbar className="bg-pink-600 text-white flex justify-between">
            <IonTitle>Admin Menu</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() =>
                  (document.querySelector("ion-menu") as any)?.close()
                }
              >
                <IonIcon icon={closeOutline} className="text-white text-xl" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-pink-50">
          <IonList className="mt-4">
            <IonMenuToggle autoHide>
              <IonItem button onClick={() => redirect("/admin-home")}>
                <IonIcon icon={homeOutline} className="text-pink-600 mr-2" />
                <IonLabel>Dashboard</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide>
              <IonItem button onClick={() => redirect("/admin-profile")}>
                <IonIcon
                  icon={personCircleOutline}
                  className="text-pink-600 mr-2"
                />
                <IonLabel>Profile</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide>
              <IonItem
                button
                onClick={() => {
                  localStorage.clear();
                  redirect("/login");
                }}
              >
                <IonIcon icon={logOutOutline} className="text-red-500 mr-2" />
                <IonLabel className="text-red-500">Logout</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* PAGE */}
      <IonPage id="maidContent">
        {/* NAVBAR */}
        <IonHeader>
          <IonToolbar className="bg-pink-600 text-white flex justify-between px-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="logo"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <IonTitle>Maid Details</IonTitle>
            </div>

            <IonButtons slot="end">
              <IonButton
                onClick={() =>
                  (document.querySelector("ion-menu") as any)?.open()
                }
              >
                <IonIcon icon={menuOutline} className="text-white text-2xl" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {/* CONTENT */}
        <IonContent className="bg-pink-50 p-4 pb-24 min-h-screen">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-pink-700">
              Total Maids: {maids.length}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maids.map((maid) => (
              <div
                key={maid.id}
                className="bg-white shadow-xl rounded-2xl p-4 flex flex-col items-center"
              >
                <img
                  src={maid.image}
                  className="w-24 h-24 rounded-full border-4 border-pink-400"
                />

                <h3 className="text-lg font-bold text-gray-800 mt-3">
                  {maid.name}
                </h3>

                <p className="text-pink-600 font-medium">Age: {maid.age}</p>

                <p className="text-gray-600 mt-1">
                  <b>Skills:</b> {maid.skills}
                </p>

                <p className="text-yellow-500 flex gap-1 items-center mt-1">
                  <IonIcon icon={star} /> {maid.rating}
                </p>

                <p className="font-semibold text-pink-700 mt-1">
                  Salary: {maid.salary}
                </p>

                <p className="flex items-center gap-1 text-gray-600 mt-1">
                  <IonIcon icon={locationOutline} /> {maid.location}
                </p>
              </div>
            ))}
          </div>
        </IonContent>

        {/* FOOTER NAVBAR (FIXED) */}
        <IonFooter className="bg-white shadow-lg border-t border-pink-300 safe-bottom">
          <div className="flex justify-around py-3">
            <div
              className="flex flex-col items-center text-pink-600"
              onClick={() => redirect("/admin-home")}
            >
              <IonIcon icon={homeOutline} className="text-2xl" />
              <p className="text-xs">Home</p>
            </div>

            <div
              className="flex flex-col items-center text-pink-600"
              onClick={() => redirect("/maid-details")}
            >
              <IonIcon icon={peopleOutline} className="text-2xl" />
              <p className="text-xs">Maids</p>
            </div>

            <div
              className="flex flex-col items-center text-pink-600"
              onClick={() => redirect("/admin-service")}
            >
              <IonIcon icon={settingsOutline} className="text-2xl" />
              <p className="text-xs">Services</p>
            </div>

            <div
              className="flex flex-col items-center text-pink-600"
              onClick={() => redirect("/admin-profile")}
            >
              <IonIcon icon={personCircleOutline} className="text-2xl" />
              <p className="text-xs">Profile</p>
            </div>
          </div>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default MaidDetails;
