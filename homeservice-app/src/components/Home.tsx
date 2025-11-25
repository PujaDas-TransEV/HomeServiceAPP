import {
  IonPage,
  IonContent,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonButtons,
  IonItem,
  IonList,
  IonIcon,
  IonLabel,
  IonSearchbar,
  IonButton,
} from "@ionic/react";

import {
  homeOutline,
  listOutline,
  bookmarkOutline,
  personOutline,
  logInOutline,
  personAddOutline,
} from "ionicons/icons";

import { useHistory } from "react-router";

export default function Home() {
  const history = useHistory();

  const openService = (id: number) => {
    history.push(`/service-detail/${id}`);
  };

  return (
    <>
      {/* ---------- LEFT MENU ---------- */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle className="text-white">Menu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonList className="space-y-2">
            <IonItem routerLink="/home">
              <IonIcon icon={homeOutline} slot="start" />
              <IonLabel>Home</IonLabel>
            </IonItem>

            <IonItem routerLink="/services">
              <IonIcon icon={listOutline} slot="start" />
              <IonLabel>All Services</IonLabel>
            </IonItem>

            <IonItem routerLink="/bookings">
              <IonIcon icon={bookmarkOutline} slot="start" />
              <IonLabel>Your Bookings</IonLabel>
            </IonItem>

            <IonItem routerLink="/profile">
              <IonIcon icon={personOutline} slot="start" />
              <IonLabel>Profile</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* ---------- MAIN PAGE ---------- */}
      <IonPage id="main-content">
        <IonHeader className="shadow-md">
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle className="text-white font-semibold text-lg">
              Maid Booking
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="bg-gray-100">

          {/* ---- TOP GRADIENT BANNER ---- */}
          <div className="w-full h-56 bg-gradient-to-b from-orange-500 to-orange-300 px-6 pt-6 rounded-b-[38px] relative shadow-lg">
            <h2 className="text-white text-3xl font-bold drop-shadow">
              Fast & Trusted
            </h2>
            <p className="text-white text-sm opacity-90">
              Home services at your doorstep
            </p>

            {/* Floating Search Box */}
            <div className="absolute inset-x-0 -bottom-8 px-6">
              <div className="bg-white p-2 rounded-2xl shadow-xl">
                <IonSearchbar
                  placeholder="Search cleaners, plumbing, electric..."
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* ---- Login / Signup Buttons ---- */}
          <div className="px-6 mt-14 flex gap-4">
            <IonButton
              expand="block"
              className="flex-1 bg-white text-orange-600 border border-orange-400 rounded-xl shadow font-semibold"
              onClick={() => history.push("/login")}
            >
              <IonIcon icon={logInOutline} slot="start" />
              Login
            </IonButton>

            <IonButton
              expand="block"
              className="flex-1 bg-orange-600 text-white rounded-xl shadow font-semibold"
              onClick={() => history.push("/signup")}
            >
              <IonIcon icon={personAddOutline} slot="start" />
              Signup
            </IonButton>
          </div>

          {/* ---- Categories ---- */}
          <div className="px-6 mt-10">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Service Categories
            </h3>

            <div className="grid grid-cols-2 gap-5">

              {[
                { icon: homeOutline, label: "Cleaning", bg: "bg-orange-100", color: "text-orange-500" },
                { icon: listOutline, label: "Plumbing", bg: "bg-blue-100", color: "text-blue-500" },
                { icon: personOutline, label: "Electric", bg: "bg-green-100", color: "text-green-600" },
                { icon: bookmarkOutline, label: "Painting", bg: "bg-purple-100", color: "text-purple-600" },
              ].map((cat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow hover:shadow-xl transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${cat.bg}`}>
                    <IonIcon icon={cat.icon} className={`text-3xl ${cat.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{cat.label}</h4>
                    <p className="text-xs text-gray-500">Explore services</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* ---- Popular Services ---- */}
          <div className="px-6 mt-10 mb-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Popular Services
            </h3>

            <div className="grid grid-cols-2 gap-5">
              {[ 
                { id: 1, title: "Home Cleaning", price: "$20", img: "/assets/img/cleaning.jpg" },
                { id: 2, title: "Plumbing", price: "$15", img: "/assets/img/plumbing.jpg" },
                { id: 3, title: "Electrician", price: "$10", img: "/assets/img/electrician.jpg" },
                { id: 4, title: "Painting", price: "$25", img: "/assets/img/painting.jpg" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
                  onClick={() => openService(item.id)}
                >
                  <img
                    src={item.img}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500">
                      Starts at {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </IonContent>
      </IonPage>
    </>
  );
}
