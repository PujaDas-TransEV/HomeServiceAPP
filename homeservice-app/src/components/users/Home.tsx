// import {
//   IonPage,
//   IonContent,
//   IonMenu,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonMenuButton,
//   IonButtons,
//   IonItem,
//   IonList,
//   IonIcon,
//   IonLabel,
//   IonSearchbar,
//   IonButton,
// } from "@ionic/react";

// import {
//   homeOutline,
//   listOutline,
//   bookmarkOutline,
//   personOutline,
//   logInOutline,
//   personAddOutline,
// } from "ionicons/icons";

// import { useHistory } from "react-router";

// export default function Home() {
//   const history = useHistory();

//   const openService = (id: number) => {
//     history.push(`/service-detail/${id}`);
//   };

//   return (
//     <>
//       {/* ---------- LEFT MENU ---------- */}
//       <IonMenu contentId="main-content">
//         <IonHeader>
//           <IonToolbar color="primary">
//             <IonTitle className="text-white">Menu</IonTitle>
//           </IonToolbar>
//         </IonHeader>

//         <IonContent className="ion-padding">
//           <IonList className="space-y-2">
//             <IonItem routerLink="/home">
//               <IonIcon icon={homeOutline} slot="start" />
//               <IonLabel>Home</IonLabel>
//             </IonItem>

//             <IonItem routerLink="/services">
//               <IonIcon icon={listOutline} slot="start" />
//               <IonLabel>All Services</IonLabel>
//             </IonItem>

//             <IonItem routerLink="/bookings">
//               <IonIcon icon={bookmarkOutline} slot="start" />
//               <IonLabel>Your Bookings</IonLabel>
//             </IonItem>

//             <IonItem routerLink="/profile">
//               <IonIcon icon={personOutline} slot="start" />
//               <IonLabel>Profile</IonLabel>
//             </IonItem>
//           </IonList>
//         </IonContent>
//       </IonMenu>

//       {/* ---------- MAIN PAGE ---------- */}
//       <IonPage id="main-content">
//         <IonHeader className="shadow-md">
//           <IonToolbar color="primary">
//             <IonButtons slot="start">
//               <IonMenuButton />
//             </IonButtons>
//             <IonTitle className="text-white font-semibold text-lg">
//               Maid Booking
//             </IonTitle>
//           </IonToolbar>
//         </IonHeader>

//         <IonContent fullscreen className="bg-gray-100">

//           {/* ---- TOP GRADIENT BANNER ---- */}
//           <div className="w-full h-56 bg-gradient-to-b from-orange-500 to-orange-300 px-6 pt-6 rounded-b-[38px] relative shadow-lg">
//             <h2 className="text-white text-3xl font-bold drop-shadow">
//               Fast & Trusted
//             </h2>
//             <p className="text-white text-sm opacity-90">
//               Home services at your doorstep
//             </p>

//             {/* Floating Search Box */}
//             <div className="absolute inset-x-0 -bottom-8 px-6">
//               <div className="bg-white p-2 rounded-2xl shadow-xl">
//                 <IonSearchbar
//                   placeholder="Search cleaners, plumbing, electric..."
//                   className="rounded-xl"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ---- Login / Signup Buttons ---- */}
//           <div className="px-6 mt-14 flex gap-4">
//             <IonButton
//               expand="block"
//               className="flex-1 bg-white text-orange-600 border border-orange-400 rounded-xl shadow font-semibold"
//               onClick={() => history.push("/login")}
//             >
//               <IonIcon icon={logInOutline} slot="start" />
//               Login
//             </IonButton>

//             <IonButton
//               expand="block"
//               className="flex-1 bg-orange-600 text-white rounded-xl shadow font-semibold"
//               onClick={() => history.push("/signup")}
//             >
//               <IonIcon icon={personAddOutline} slot="start" />
//               Signup
//             </IonButton>
//           </div>

//           {/* ---- Categories ---- */}
//           <div className="px-6 mt-10">
//             <h3 className="text-lg font-semibold mb-3 text-gray-800">
//               Service Categories
//             </h3>

//             <div className="grid grid-cols-2 gap-5">

//               {[
//                 { icon: homeOutline, label: "Cleaning", bg: "bg-orange-100", color: "text-orange-500" },
//                 { icon: listOutline, label: "Plumbing", bg: "bg-blue-100", color: "text-blue-500" },
//                 { icon: personOutline, label: "Electric", bg: "bg-green-100", color: "text-green-600" },
//                 { icon: bookmarkOutline, label: "Painting", bg: "bg-purple-100", color: "text-purple-600" },
//               ].map((cat, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow hover:shadow-xl transition-all"
//                 >
//                   <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${cat.bg}`}>
//                     <IonIcon icon={cat.icon} className={`text-3xl ${cat.color}`} />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-semibold">{cat.label}</h4>
//                     <p className="text-xs text-gray-500">Explore services</p>
//                   </div>
//                 </div>
//               ))}

//             </div>
//           </div>

//           {/* ---- Popular Services ---- */}
//           <div className="px-6 mt-10 mb-10">
//             <h3 className="text-lg font-semibold mb-4 text-gray-800">
//               Popular Services
//             </h3>

//             <div className="grid grid-cols-2 gap-5">
//               {[ 
//                 { id: 1, title: "Home Cleaning", price: "$20", img: "/assets/img/cleaning.jpg" },
//                 { id: 2, title: "Plumbing", price: "$15", img: "/assets/img/plumbing.jpg" },
//                 { id: 3, title: "Electrician", price: "$10", img: "/assets/img/electrician.jpg" },
//                 { id: 4, title: "Painting", price: "$25", img: "/assets/img/painting.jpg" },
//               ].map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
//                   onClick={() => openService(item.id)}
//                 >
//                   <img
//                     src={item.img}
//                     className="h-32 w-full object-cover"
//                   />
//                   <div className="p-3">
//                     <h4 className="font-semibold text-sm">{item.title}</h4>
//                     <p className="text-xs text-gray-500">
//                       Starts at {item.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </IonContent>
//       </IonPage>
//     </>
//   );
// }
// import React from "react";
// import {
//   IonPage,
//   IonContent,
//   IonMenu,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonMenuButton,
//   IonButtons,
//   IonItem,
//   IonList,
//   IonIcon,
//   IonLabel,
//   IonSearchbar,
//   IonButton,
// } from "@ionic/react";

// import {
//   homeOutline,
//   listOutline,
//   bookmarkOutline,
//   personOutline,
//   logInOutline,
//   personAddOutline,
// } from "ionicons/icons";

// import { useHistory } from "react-router";

// export default function Home() {
//   const history = useHistory();

//   const openService = (id: number) => {
//     history.push(`/service-detail/${id}`);
//   };

//   return (
//     <>
//       {/* ---------- LEFT MENU ---------- */}
//       <IonMenu contentId="main-content">
//         <IonHeader>
//           <IonToolbar color="primary">
//             <IonTitle className="text-white font-bold">Menu</IonTitle>
//           </IonToolbar>
//         </IonHeader>

//         <IonContent className="ion-padding bg-pink-50">
//           <IonList className="space-y-2">
//             <IonItem routerLink="/home">
//               <IonIcon icon={homeOutline} slot="start" />
//               <IonLabel>Home</IonLabel>
//             </IonItem>
//             <IonItem routerLink="/services">
//               <IonIcon icon={listOutline} slot="start" />
//               <IonLabel>All Services</IonLabel>
//             </IonItem>
//             <IonItem routerLink="/bookings">
//               <IonIcon icon={bookmarkOutline} slot="start" />
//               <IonLabel>Your Bookings</IonLabel>
//             </IonItem>
//             <IonItem routerLink="/profile">
//               <IonIcon icon={personOutline} slot="start" />
//               <IonLabel>Profile</IonLabel>
//             </IonItem>
//           </IonList>
//         </IonContent>
//       </IonMenu>

//       {/* ---------- MAIN PAGE ---------- */}
//       <IonPage id="main-content" className="bg-white">
//         <IonHeader className="shadow-md">
//           <IonToolbar color="primary">
//             <IonButtons slot="start">
//               <IonMenuButton />
//             </IonButtons>
//             <IonTitle className="text-white font-bold text-lg">
//               Baai Sahab
//             </IonTitle>
//           </IonToolbar>
//         </IonHeader>

//         <IonContent fullscreen className="bg-pink-50">

//           {/* ---- TOP BANNER ---- */}
//           <div className="w-full h-60 bg-gradient-to-b from-pink-500 to-pink-300 px-6 pt-6 rounded-b-[40px] relative shadow-lg">
//             <h2 className="text-white text-3xl font-bold drop-shadow-lg">
//               Trusted Maids at Your Doorstep
//             </h2>
//             <p className="text-white text-sm opacity-90 mt-1">
//               Cooking, Cleaning, Babysitter, Elderly Care
//             </p>

//             {/* Floating Search Box */}
//             <div className="absolute inset-x-0 -bottom-8 px-6">
//               <div className="bg-white p-2 rounded-2xl shadow-xl">
//                 <IonSearchbar
//                   placeholder="Search maids by name or location..."
//                   className="rounded-xl"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ---- Login / Signup Buttons ---- */}
//           <div className="px-6 mt-16 flex gap-4">
//             <IonButton
//               expand="block"
//               className="flex-1 bg-white text-pink-500 border border-pink-400 rounded-xl shadow font-semibold"
//               onClick={() => history.push("/login")}
//             >
//               <IonIcon icon={logInOutline} slot="start" />
//               Login
//             </IonButton>

//             <IonButton
//               expand="block"
//               className="flex-1 bg-pink-500 text-white rounded-xl shadow font-semibold"
//               onClick={() => history.push("/signup")}
//             >
//               <IonIcon icon={personAddOutline} slot="start" />
//               Signup
//             </IonButton>
//           </div>

//           {/* ---- Service Categories ---- */}
//           <div className="px-6 mt-10">
//             <h3 className="text-lg font-semibold mb-3 text-gray-800">
//               Service Categories
//             </h3>

//             <div className="grid grid-cols-2 gap-5">
//               {[
//                 { icon: homeOutline, label: "Cleaning", bg: "bg-pink-100", color: "text-pink-500" },
//                 { icon: listOutline, label: "Cooking", bg: "bg-yellow-100", color: "text-yellow-500" },
//                 { icon: personOutline, label: "Babysitter", bg: "bg-green-100", color: "text-green-600" },
//                 { icon: bookmarkOutline, label: "Elderly Care", bg: "bg-purple-100", color: "text-purple-600" },
//               ].map((cat, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow hover:shadow-xl transition-all cursor-pointer"
//                 >
//                   <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${cat.bg}`}>
//                     <IonIcon icon={cat.icon} className={`text-3xl ${cat.color}`} />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-semibold">{cat.label}</h4>
//                     <p className="text-xs text-gray-500">Explore services</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ---- Popular Maids ---- */}
//           <div className="px-6 mt-10 mb-10">
//             <h3 className="text-lg font-semibold mb-4 text-gray-800">
//               Popular Maids
//             </h3>

//             <div className="grid grid-cols-2 gap-5">
//               {[
//                 { id: 1, name: "Anita", service: "Cleaning", rating: 4.5, location: "Dhaka", img: "/assets/img/maid1.jpg" },
//                 { id: 2, name: "Maya", service: "Cooking", rating: 4.2, location: "Chittagong", img: "/assets/img/maid2.jpg" },
//                 { id: 3, name: "Rina", service: "Babysitter", rating: 4.8, location: "Sylhet", img: "/assets/img/maid3.jpg" },
//                 { id: 4, name: "Farida", service: "Elderly Care", rating: 4.3, location: "Dhaka", img: "/assets/img/maid4.jpg" },
//               ].map((maid) => (
//                 <div
//                   key={maid.id}
//                   className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
//                   onClick={() => openService(maid.id)}
//                 >
//                   <img src={maid.img} className="h-32 w-full object-cover" />
//                   <div className="p-3">
//                     <h4 className="font-semibold text-sm">{maid.name}</h4>
//                     <p className="text-xs text-gray-500">{maid.service}</p>
//                     <p className="text-xs text-gray-500">Rating: {maid.rating} ⭐</p>
//                     <p className="text-xs text-gray-400">{maid.location}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </IonContent>
//       </IonPage>
//     </>
//   );
// }
import React from "react";
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
} from "@ionic/react";

import {
  homeOutline,
  personOutline,
  chatbubblesOutline,
  listOutline,
  logOutOutline,
} from "ionicons/icons";

import { useHistory } from "react-router";

export default function Home() {
  const history = useHistory();

  const maids = [
    { id: 1, name: "Anita", service: "Cleaning", rating: 4.5, location: "Dhaka", icon: homeOutline },
    { id: 2, name: "Maya", service: "Cooking", rating: 4.2, location: "Chittagong", icon: listOutline },
    { id: 3, name: "Rina", service: "Babysitting", rating: 4.8, location: "Sylhet", icon: personOutline },
    { id: 4, name: "Farida", service: "Elderly Care", rating: 4.3, location: "Dhaka", icon: chatbubblesOutline },
  ];

  const openService = (id: number) => {
    history.push(`/service-detail/${id}`);
  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="pink">
            <IonTitle className="text-white">Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding bg-pink-50">
          <IonList>
            <IonItem routerLink="/home"><IonIcon icon={homeOutline} slot="start" /><IonLabel>Home</IonLabel></IonItem>
            <IonItem routerLink="/profile"><IonIcon icon={personOutline} slot="start" /><IonLabel>Profile</IonLabel></IonItem>
            <IonItem routerLink="/chat"><IonIcon icon={chatbubblesOutline} slot="start" /><IonLabel>Chat</IonLabel></IonItem>
            <IonItem routerLink="/" onClick={() => history.push("/")}>
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader className="shadow-md">
          <IonToolbar color="pink">
            <IonButtons slot="start"><IonMenuButton /></IonButtons>
            <IonTitle className="text-white font-bold">Baai Sahab</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="bg-pink-50 p-4">
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <IonSearchbar placeholder="Search maids by name, service, location..." />
          </div>

          <h3 className="text-lg font-semibold mb-3 text-gray-800">Popular Maids</h3>
          <div className="grid grid-cols-2 gap-4">
            {maids.map((maid) => (
              <div key={maid.id} className="bg-white rounded-xl shadow p-3 cursor-pointer" onClick={() => openService(maid.id)}>
                <div className="flex justify-center mb-2">
                  <IonIcon icon={maid.icon} className="text-4xl text-pink-500" />
                </div>
                <h4 className="font-semibold text-sm">{maid.name}</h4>
                <p className="text-xs text-gray-500">{maid.service}</p>
                <p className="text-xs text-gray-400">Rating: {maid.rating} ⭐</p>
                <p className="text-xs text-gray-400">{maid.location}</p>
              </div>
            ))}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
