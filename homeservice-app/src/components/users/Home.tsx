
// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonButtons,
//   IonMenuButton,
//   IonContent,
//   IonMenu,
//   IonList,
//   IonItem,
//   IonLabel,
//   IonFooter,
//   IonIcon,
//   IonModal,
//   IonButton
// } from "@ionic/react";

// import {
//   homeOutline,
//   chatbubbleEllipsesOutline,
//   personCircleOutline,
//   searchOutline,
//   closeOutline
// } from "ionicons/icons";
// import { menuController } from "@ionic/core";
// import { useHistory } from "react-router-dom";
// import { useState } from "react";
// import Logo from "../assets/logo.jpg";

// /* Maid Profile Images */
// import Maid1 from "../assets/maid1.jpg";
// import Maid2 from "../assets/maid2.jpg";
// import Maid3 from "../assets/maid3.jpg";
// import Maid4 from "../assets/maid2.jpg";
// import Maid5 from "../assets/maid3.jpg";
// import Maid6 from "../assets/maid1.jpg";

// /* Dummy Maid Data */
// const maids = [
//   { id: 1, name: "Sita Devi", category: "Cleaning", experience: "5 yrs", rating: 5, image: Maid1, location: "Dhaka" },
//   { id: 2, name: "Anita Sharma", category: "Cooking", experience: "3 yrs", rating: 4, image: Maid2, location: "Chittagong" },
//   { id: 3, name: "Rina Das", category: "Baby Sitter", experience: "4 yrs", rating: 5, image: Maid3, location: "Dhaka" },
//   { id: 4, name: "Maya Roy", category: "Elder Care", experience: "6 yrs", rating: 5, image: Maid4, location: "Sylhet" },
//   { id: 5, name: "Priya Sen", category: "Cleaning", experience: "2 yrs", rating: 4, image: Maid5, location: "Dhaka" },
//   { id: 6, name: "Rita Khatun", category: "Cooking", experience: "5 yrs", rating: 5, image: Maid6, location: "Chittagong" }
// ];

// export default function HomePage() {
//   const history = useHistory();
//   const [selectedMaid, setSelectedMaid] = useState<any>(null);
//   const [searchText, setSearchText] = useState("");
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   /* Filter maids based on search */
//   const filteredMaids = maids.filter(
//     maid =>
//       maid.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       maid.category.toLowerCase().includes(searchText.toLowerCase()) ||
//       maid.location.toLowerCase().includes(searchText.toLowerCase())
//   );

//   /* Navigate to chat page with maid */
//   const handleChat = (maid: any) => {
//     setSelectedMaid(null);
//     history.push("/chat", { maid });
//   };

//   /* Handle logout */
//   const handleLogout = () => {
//     setShowLogoutModal(false);
//     history.push("/login"); // Change this to your login route
//   };

//   return (
//     <>
//       {/* ---------- Drawer Menu ---------- */}
//       <IonMenu side="end" menuId="main-menu" contentId="main-content">
//         <IonContent className="bg-white">
//           <IonList className="mt-4">
//             <IonItem button onClick={() => history.push("/home")}>
//               <IonLabel className="text-lg">🏠 Home</IonLabel>
//             </IonItem>
//             <IonItem button onClick={() => history.push("/profile")}>
//               <IonLabel className="text-lg">👤 Profile</IonLabel>
//             </IonItem>
//             <IonItem button onClick={() => history.push("/chat")}>
//               <IonLabel className="text-lg">💬 Chat</IonLabel>
//             </IonItem>
//             <IonItem button onClick={() => history.push("/maid-list")}>
//               <IonLabel className="text-lg">🧹 Maid List</IonLabel>
//             </IonItem>
//               <IonItem
//   button
//   onClick={() => {
//     history.push("/preferences"); // Navigate to preferences page
//     menuController.close("main-menu");
//   }}
// >
//   <IonLabel className="text-lg">⚙️ Preferences</IonLabel>
// </IonItem>
//             <IonItem button onClick={() => setShowLogoutModal(true)}>
//               <IonLabel className="text-lg text-red-500">🚪 Logout</IonLabel>
//             </IonItem>
//           </IonList>
//         </IonContent>
//       </IonMenu>

//       {/* ---------- Main Page ---------- */}
//       <IonPage id="main-content">
//         {/* ---------- Top Navbar ---------- */}
//         <IonHeader className="shadow-md">
//           <IonToolbar className="flex justify-between px-4 bg-white">
//             {/* Logo + Title */}
//             <div className="flex items-center gap-2">
//               <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
//                 <img
//                   src={Logo}
//                   alt="logo"
//                   className="w-8 h-8 object-cover rounded-full"
//                 />
//               </div>
//               <h1 className="text-xl font-semibold text-indigo-600">Maidigo</h1>
//             </div>
//             {/* Hamburger */}
//             <IonButtons slot="end">
//               <IonMenuButton className="text-2xl"></IonMenuButton>
//             </IonButtons>
//           </IonToolbar>
//         </IonHeader>

//         {/* ---------- Content ---------- */}
//         <IonContent className="bg-gray-50">
//           {/* --- Hero Banner --- */}
//           <div className="w-full h-48 bg-linear-to-r from-pink-600 to-indigo-300 rounded-b-3xl p-5 text-white flex flex-col justify-center">
//             <h2 className="text-2xl font-semibold">Find Trusted Maids Near You</h2>
//             <p className="opacity-90">Verified • Experienced • Reliable</p>
//           </div>

//           {/* --- Search Section --- */}
//           <div className="px-4 mt-5">
//             <div className="bg-white rounded-full p-3 flex items-center shadow-md">
//               <IonIcon icon={searchOutline} className="text-indigo-600 text-xl" />
//               <input
//                 type="text"
//                 placeholder="Search by name, category, or location..."
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 className="ml-2 w-full focus:outline-none text-gray-700 bg-transparent"
//               />
//             </div>
//           </div>

//           {/* --- Services Grid --- */}
//           <div className="mt-6 px-4">
//             <h3 className="text-2xl font-bold mb-5 text-gray-800">Our Services</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {[
//                 { name: "Cleaning", icon: "🧹", bg: "bg-gradient-to-r from-indigo-500 to-indigo-300", description: "Keep your home spotless and organized with our trusted cleaning maids." },
//                 { name: "Cooking", icon: "🍽️", bg: "bg-gradient-to-r from-orange-500 to-orange-300", description: "Delicious home-cooked meals prepared by professional cooking maids." },
//                 { name: "Baby Sitter", icon: "👩‍🍼", bg: "bg-gradient-to-r from-pink-500 to-pink-300", description: "Safe and caring babysitting services to look after your little ones." },
//                 { name: "Elder Care", icon: "🧓", bg: "bg-gradient-to-r from-green-500 to-green-300", description: "Compassionate elder care maids to assist your loved ones daily." }
//               ].map(service => (
//                 <div
//                   key={service.name}
//                   onClick={() => history.push(`/category/${service.name}`)}
//                   className={`p-6 rounded-2xl flex flex-col items-center justify-center cursor-pointer transform transition hover:scale-105 hover:shadow-2xl ${service.bg}`}
//                 >
//                   <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-white`}>
//                     <span className="text-3xl">{service.icon}</span>
//                   </div>
//                   <h4 className="font-semibold text-lg text-white mb-2">{service.name}</h4>
//                   <p className="text-sm text-white text-center">{service.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* --- Featured Maids --- */}
//           <div className="mt-6 px-4">
//             <h3 className="text-xl font-semibold mb-3">Available Maids for your Preferences</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {filteredMaids.map((maid) => (
//                 <div
//                   key={maid.id}
//                   onClick={() => setSelectedMaid(maid)}
//                   className="bg-white rounded-xl shadow p-4 flex items-center gap-4 cursor-pointer hover:bg-indigo-50 transition"
//                 >
//                   <img
//                     src={maid.image}
//                     alt={maid.name}
//                     className="w-16 h-16 object-cover rounded-full"
//                   />
//                   <div>
//                     <h4 className="font-semibold">{maid.name}</h4>
//                     <p className="text-sm text-gray-600">{maid.experience}</p>
//                     <p className="text-sm text-gray-500">{maid.location}</p>
//                     <div className="text-yellow-500">{"⭐".repeat(maid.rating)}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Other sections like How It Works, Why Choose Us, Testimonials */}
//           {/* ... you can include your other sections here ... */}

//         </IonContent>

//         {/* ---------- Bottom Navigation ---------- */}
//         <IonFooter className="border-t bg-white">
//           <div className="flex justify-around text-gray-500 py-3">
//             <div onClick={() => history.push("/profile")} className="flex flex-col items-center text-gray-400 cursor-pointer">
//               <IonIcon icon={personCircleOutline} className="text-2xl" />
//               <span className="text-sm">Profile</span>
//             </div>
//             <div onClick={() => history.push("/chat")} className="flex flex-col items-center text-gray-400 cursor-pointer">
//               <IonIcon icon={chatbubbleEllipsesOutline} className="text-2xl" />
//               <span className="text-sm">Chat</span>
//             </div>
//             <div className="flex flex-col items-center text-indigo-600">
//               <IonIcon icon={homeOutline} className="text-2xl" />
//               <span className="text-sm font-semibold">Home</span>
//             </div>
//           </div>
//         </IonFooter>

//         {/* ---------- Maid Details Modal ---------- */}
//         <IonModal isOpen={selectedMaid !== null} onDidDismiss={() => setSelectedMaid(null)}>
//           {selectedMaid && (
//             <div className="p-5 bg-white h-full overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold">{selectedMaid.name}</h3>
//                 <IonButton fill="clear" onClick={() => setSelectedMaid(null)}>
//                   <IonIcon icon={closeOutline} className="text-xl" />
//                 </IonButton>
//               </div>
//               <img
//                 src={selectedMaid.image}
//                 alt={selectedMaid.name}
//                 className="w-full h-48 object-cover rounded-lg mb-3"
//               />
//               <p><strong>Category:</strong> {selectedMaid.category}</p>
//               <p><strong>Experience:</strong> {selectedMaid.experience}</p>
//               <p><strong>Location:</strong> {selectedMaid.location}</p>
//               <p><strong>Rating:</strong> {"⭐".repeat(selectedMaid.rating)}</p>

//               {/* Chat Button */}
//               <IonButton expand="block" color="primary" className="mt-5" onClick={() => handleChat(selectedMaid)}>
//                 <IonIcon icon={chatbubbleEllipsesOutline} slot="start" />
//                 Chat with {selectedMaid.name}
//               </IonButton>
//             </div>
//           )}
//         </IonModal>

//       {/* ---------- Logout Modal ---------- */}
//         {showLogoutModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
//               <h2 className="text-lg font-bold mb-4">Logout</h2>
//               <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
//               <div className="flex justify-end gap-4">
//                 <IonButton
//                   fill="outline"
//                   color="medium"
//                   onClick={() => setShowLogoutModal(false)}
//                   className="px-6 py-2 rounded-xl hover:bg-gray-100"
//                 >
//                   No
//                 </IonButton>
//                 <IonButton
//                   color="danger"
//                   onClick={handleLogout}
//                   className="px-6 py-2 rounded-xl hover:bg-red-600"
//                 >
//                   Yes
//                 </IonButton>
//               </div>
//             </div>
//           </div>
//         )}

//       </IonPage>
//     </>
//   );
// }

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonIcon,
  IonModal,
  IonButton
} from "@ionic/react";

import {
  homeOutline,
  chatbubbleEllipsesOutline,
  personCircleOutline,
  searchOutline,
  closeOutline
} from "ionicons/icons";

import { menuController } from "@ionic/core";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo.jpg";

import Maid1 from "../assets/maid1.jpg";
import Maid2 from "../assets/maid2.jpg";
import Maid3 from "../assets/maid3.jpg";
import Maid4 from "../assets/maid2.jpg";
import Maid5 from "../assets/maid3.jpg";
import Maid6 from "../assets/maid1.jpg";

/* ---------------- Dummy Maid Data ---------------- */
const maids = [
  { id: 1, name: "Sita Devi", category: "Cleaning", experience: "5 yrs", rating: 5, image: Maid1, location: "Dhaka" },
  { id: 2, name: "Anita Sharma", category: "Cooking", experience: "3 yrs", rating: 4, image: Maid2, location: "Chittagong" },
  { id: 3, name: "Rina Das", category: "Baby Sitter", experience: "4 yrs", rating: 5, image: Maid3, location: "Dhaka" },
  { id: 4, name: "Maya Roy", category: "Elder Care", experience: "6 yrs", rating: 5, image: Maid4, location: "Sylhet" },
  { id: 5, name: "Priya Sen", category: "Cleaning", experience: "2 yrs", rating: 4, image: Maid5, location: "Dhaka" },
  { id: 6, name: "Rita Khatun", category: "Cooking", experience: "5 yrs", rating: 5, image: Maid6, location: "Chittagong" }
];

export default function HomePage() {
  const history = useHistory();

  /* ---------------- States ---------------- */
  const [selectedMaid, setSelectedMaid] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* ---------------- Multi-select Toggle Logic ---------------- */
  const toggleService = (serviceName: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceName)
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  /* ---------------- Filtering Logic ---------------- */
  const filteredMaids = maids.filter((maid) => {
    const matchesSearch =
      maid.name.toLowerCase().includes(searchText.toLowerCase()) ||
      maid.category.toLowerCase().includes(searchText.toLowerCase()) ||
      maid.location.toLowerCase().includes(searchText.toLowerCase());

    const matchesService =
      selectedServices.length === 0 ||
      selectedServices.includes(maid.category);

    return matchesSearch && matchesService;
  });

  const handleChat = (maid: any) => {
    setSelectedMaid(null);
    history.push("/chat", { maid });
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    history.push("/login");
  };

  return (
    <>
      {/* ---------------- Drawer Menu ---------------- */}
      <IonMenu side="end" menuId="main-menu" contentId="main-content">
        <IonContent className="bg-white">
          <IonList className="mt-4">
            <IonItem button onClick={() => history.push("/home")}>
              <IonLabel className="text-lg">🏠 Home</IonLabel>
            </IonItem>
            <IonItem button onClick={() => history.push("/profile")}>
              <IonLabel className="text-lg">👤 Profile</IonLabel>
            </IonItem>
            <IonItem button onClick={() => history.push("/chat")}>
              <IonLabel className="text-lg">💬 Chat</IonLabel>
            </IonItem>
            <IonItem button onClick={() => history.push("/maid-list")}>
              <IonLabel className="text-lg">🧹 Maid List</IonLabel>
            </IonItem>

            <IonItem
              button
              onClick={() => {
                history.push("/preferences");
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

      {/* ---------------- Main Page ---------------- */}
      <IonPage id="main-content">
        <IonHeader className="shadow-md">
          <IonToolbar className="px-4 bg-white flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
                <img src={Logo} alt="logo" className="w-8 h-8 rounded-full" />
              </div>
              <h1 className="text-xl font-semibold text-indigo-600">Maidigo</h1>
            </div>

            <IonButtons slot="end">
              <IonMenuButton className="text-2xl" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {/* ---------------- Content ---------------- */}
        <IonContent className="bg-gray-50">

          {/* Hero Section */}
          <div className="w-full h-48 bg-linear-to-r from-pink-600 to-indigo-400 rounded-b-3xl p-5 text-white flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">Find Trusted Helper Near You</h2>
            <p className="opacity-90">Verified • Experienced • Reliable</p>
          </div>

          {/* Search Bar */}
          <div className="px-4 mt-5">
            <div className="bg-white rounded-full p-3 flex items-center shadow-md">
              <IonIcon icon={searchOutline} className="text-indigo-600 text-xl" />
              <input
                type="text"
                placeholder="Search maids..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="ml-2 w-full focus:outline-none text-gray-700 bg-transparent"
              />
            </div>
          </div>

          {/* ---------------- Filter by Service ---------------- */}
          <div className="px-4 mt-6">
            <h3 className="text-xl font-semibold mb-3">Filter by Service</h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Cleaning", icon: "🧹", bg: "from-indigo-400 to-indigo-600" },
                { name: "Cooking", icon: "🍽️", bg: "from-orange-400 to-orange-600" },
                { name: "Baby Sitter", icon: "👩‍🍼", bg: "from-pink-400 to-pink-600" },
                { name: "Elder Care", icon: "🧓", bg: "from-green-400 to-green-600" }
              ].map((service) => (
                <button
                  key={service.name}
                  onClick={() => toggleService(service.name)}
                  className={`
                    p-3 rounded-xl text-center shadow-md font-medium flex items-center justify-center gap-2
                    transition transform hover:scale-105
                    ${
                      selectedServices.includes(service.name)
                        ? `bg-linear-to-r ${service.bg} text-white shadow-lg`
                        : "bg-white text-gray-800 border border-gray-200"
                    }
                  `}
                >
                  <span className="text-xl">{service.icon}</span>
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          {/* ---------------- Maid List ---------------- */}
          <div className="mt-8 px-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">
              {selectedServices.length > 0
                ? `Filtered Maids`
                : "All Maids"}
            </h3>

            <button
              onClick={() => history.push("/maid-list")}
              className="text-sm px-4 py-1 rounded-full bg-indigo-600 text-white shadow hover:bg-indigo-700"
            >
              Show More →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 mt-3 pb-6">
            {filteredMaids.map((maid) => (
              <div
                key={maid.id}
                onClick={() => setSelectedMaid(maid)}
                className="bg-white rounded-xl shadow p-4 flex items-center gap-4 cursor-pointer hover:bg-indigo-50 transition"
              >
                <img src={maid.image} className="w-16 h-16 rounded-full object-cover" />

                <div>
                  <h4 className="font-semibold">{maid.name}</h4>
                  <p className="text-sm text-gray-600">{maid.experience}</p>
                  <p className="text-sm text-gray-500">{maid.location}</p>
                  <div className="text-yellow-500">{"⭐".repeat(maid.rating)}</div>
                </div>
              </div>
            ))}
          </div>
        </IonContent>

        {/* ---------------- Bottom Navigation ---------------- */}
        <IonFooter className="bg-white border-t">
          <div className="flex justify-around text-gray-500 py-3">
            <div onClick={() => history.push("/profile")} className="flex flex-col items-center">
              <IonIcon icon={personCircleOutline} className="text-2xl" />
              <span className="text-sm">Profile</span>
            </div>

            <div onClick={() => history.push("/chat")} className="flex flex-col items-center">
              <IonIcon icon={chatbubbleEllipsesOutline} className="text-2xl" />
              <span className="text-sm">Chat</span>
            </div>

            <div className="flex flex-col items-center text-indigo-600">
              <IonIcon icon={homeOutline} className="text-2xl" />
              <span className="text-sm font-semibold">Home</span>
            </div>
          </div>
        </IonFooter>

        {/* ---------------- Maid Modal ---------------- */}
        <IonModal isOpen={selectedMaid !== null} onDidDismiss={() => setSelectedMaid(null)}>
          {selectedMaid && (
            <div className="p-5 bg-white h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{selectedMaid.name}</h3>
                <IonButton fill="clear" onClick={() => setSelectedMaid(null)}>
                  <IonIcon icon={closeOutline} className="text-xl" />
                </IonButton>
              </div>

              <img src={selectedMaid.image} className="w-full h-48 object-cover rounded-lg mb-3" />

              <p><strong>Category:</strong> {selectedMaid.category}</p>
              <p><strong>Experience:</strong> {selectedMaid.experience}</p>
              <p><strong>Location:</strong> {selectedMaid.location}</p>

              <IonButton
                expand="block"
                color="primary"
                className="mt-5"
                onClick={() => handleChat(selectedMaid)}
              >
                Chat with {selectedMaid.name}
              </IonButton>
            </div>
          )}
        </IonModal>

        {/* ---------------- Logout Modal ---------------- */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Logout</h2>
              <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>

              <div className="flex justify-end gap-4">
                <IonButton fill="outline" onClick={() => setShowLogoutModal(false)}>No</IonButton>
                <IonButton color="danger" onClick={handleLogout}>Yes</IonButton>
              </div>
            </div>
          </div>
        )}
      </IonPage>
    </>
  );
}
