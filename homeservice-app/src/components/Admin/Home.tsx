import React from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonButtons,
} from "@ionic/react";

import {
  menuOutline,
  personCircleOutline,
  homeOutline,
  settingsOutline,
  clipboardOutline,
  logOutOutline,
  closeOutline
} from "ionicons/icons";

import logoImg from "../assets/logo.jpg";
import bannerImg from "../assets/banner admin.jpeg"; // make sure no spaces in filename

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminHome: React.FC = () => {
  const barData = {
    labels: ["Cleaning", "Cooking", "Babysitting", "Elderly Care"],
    datasets: [
      {
        label: "Users per Service",
        data: [45, 32, 28, 47],
        backgroundColor: ["#ec4899", "#f472b6", "#fbcfe8", "#db2777"],
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Active Maids", "Inactive Maids"],
    datasets: [
      {
        label: "Maids Status",
        data: [34, 8],
        backgroundColor: ["#ec4899", "#fbcfe8"],
        hoverOffset: 8,
      },
    ],
  };

  const redirect = (path: string) => {
    window.location.href = path; // simple redirect, can use react-router if available
  };
 const handleLogout = () => {
  // Remove only the access token
  localStorage.removeItem("access_token");

  // Optional: remove any other related keys if needed
  // localStorage.removeItem("refresh_token");

  // Redirect to login page
  redirect("/login");
};

  return (
    <>
      {/* SIDE MENU */}
   

      <IonMenu side="end" menuId="adminMenu" contentId="adminContent">
  {/* Header */}
  <IonHeader>
    <IonToolbar className="bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 text-white px-4">
      <div className="flex justify-between items-center w-full">
        <IonTitle className="text-lg font-semibold tracking-wide">
          Admin Panel
        </IonTitle>
        <IonButton
          fill="clear"
          onClick={() =>
            (window as any).document.querySelector("ion-menu")?.close()
          }
        >
          <IonIcon icon={closeOutline} className="text-red-600 text-xl" />
        </IonButton>
      </div>
    </IonToolbar>
  </IonHeader>

  {/* Menu Content */}
  <IonContent className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
    <div className="p-4 space-y-3">

      {/* Profile */}
      <IonMenuToggle autoHide>
        <div
          onClick={() => redirect("/admin-profile")}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
        >
          <IonIcon icon={personCircleOutline} className="text-purple-400 text-xl" />
          <span className="font-medium tracking-wide">Profile</span>
        </div>
      </IonMenuToggle>

      {/* Dashboard */}
      <IonMenuToggle autoHide>
        <div
          onClick={() => redirect("/admin-home")}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-blue-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
        >
          <IonIcon icon={homeOutline} className="text-blue-400 text-xl" />
          <span className="font-medium tracking-wide">Dashboard</span>
        </div>
      </IonMenuToggle>

      {/* Services */}
      <IonMenuToggle autoHide>
        <div
          onClick={() => redirect("/admin-service")}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-pink-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
        >
          <IonIcon icon={settingsOutline} className="text-pink-400 text-xl" />
          <span className="font-medium tracking-wide">Services</span>
        </div>
      </IonMenuToggle>

      {/* Logout */}
      <IonMenuToggle autoHide>
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
        >
          <IonIcon icon={logOutOutline} className="text-red-400 text-xl" />
          <span className="font-medium tracking-wide text-red-400">
            Logout
          </span>
        </div>
      </IonMenuToggle>

    </div>
  </IonContent>
</IonMenu>
      <IonPage>
        {/* NAVBAR */}
        <div id="adminContent" className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
            />
            <h1 className="font-bold text-xl text-indigo-600 tracking-wide">Maidigo Admin</h1>
          </div>
          <IonButtons>
            <IonButton onClick={() => (window as any).document.querySelector("ion-menu")?.toggle()}>
              <IonIcon icon={menuOutline} className="text-3xl text-pink-600" />
            </IonButton>
          </IonButtons>
        </div>

        {/* PAGE CONTENT */}
        <IonContent className="bg-pink-50 min-h-screen p-4">

          {/* Banner */}
          <div className="w-full h-48 relative rounded-xl overflow-hidden shadow-lg mb-6">
            <img src={bannerImg} alt="Admin Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold drop-shadow">Welcome Admin</h2>
            </div>
          </div>

          {/* Dashboard Overview */}
          <div className="p-6">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Users per Service */}
              <div className="bg-linear-to-r from-pink-400 to-pink-600 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 flex flex-col items-center justify-center">
                <IonIcon icon={clipboardOutline} className="text-5xl mb-3 drop-shadow-lg" />
                <h3 className="text-3xl font-bold">152</h3>
                <p className="text-sm font-medium">Users per Service</p>
                <div className="w-full bg-white/30 h-1 rounded-full mt-4">
                  <div className="bg-white h-1 rounded-full w-3/4"></div>
                </div>
              </div>

              {/* Active Maids */}
              <div className="bg-linear-to-r from-indigo-400 to-indigo-600 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 flex flex-col items-center justify-center">
                <IonIcon icon={personCircleOutline} className="text-5xl mb-3 drop-shadow-lg" />
                <h3 className="text-3xl font-bold">34</h3>
                <p className="text-sm font-medium">Active Maids</p>
                <div className="w-full bg-white/30 h-1 rounded-full mt-4">
                  <div className="bg-white h-1 rounded-full w-2/3"></div>
                </div>
              </div>

              {/* New Users */}
              <div className="bg-linear-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 flex flex-col items-center justify-center">
                <IonIcon icon={homeOutline} className="text-5xl mb-3 drop-shadow-lg" />
                <h3 className="text-3xl font-bold">27</h3>
                <p className="text-sm font-medium">New Users</p>
                <div className="w-full bg-white/30 h-1 rounded-full mt-4">
                  <div className="bg-white h-1 rounded-full w-1/2"></div>
                </div>
              </div>

              {/* Pending Services */}
              <div className="bg-linear-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 flex flex-col items-center justify-center">
                <IonIcon icon={settingsOutline} className="text-5xl mb-3 drop-shadow-lg" />
                <h3 className="text-3xl font-bold">8</h3>
                <p className="text-sm font-medium">Pending Services</p>
                <div className="w-full bg-white/30 h-1 rounded-full mt-4">
                  <div className="bg-white h-1 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-24"> {/* Extra bottom margin for footer */}
            {/* Users per Service Bar Chart */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="font-bold text-gray-800 mb-2">Users per Service</h3>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </div>

            {/* Maids Status Pie Chart */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="font-bold text-gray-800 mb-2">Maids Status</h3>
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
              {/* Extra spacing under chart */}
              <div className="h-16"></div>
            </div>
          </div>
        </IonContent>

        {/* Footer Navbar */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-inner flex justify-around py-3">
          <button onClick={() => redirect("/admin-home")} className="flex flex-col items-center text-pink-600">
            <IonIcon icon={homeOutline} className="text-2xl mb-1" />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={() => redirect("/admin-profile")} className="flex flex-col items-center text-gray-600">
            <IonIcon icon={personCircleOutline} className="text-2xl mb-1" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </IonPage>
    </>
  );
};

export default AdminHome;
