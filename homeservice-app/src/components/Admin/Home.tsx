import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
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
  closeOutline,
  peopleOutline,
} from "ionicons/icons";


import logoImg from "../assets/logo.jpg";
import bannerImg from "../assets/banner admin.jpeg";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar,Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface ServiceInventory {
  service_name: string;
  total_helpers: number;
  total_seekers: number;
  helpers: any[];
  seekers: any[];
}

const AdminHome: React.FC = () => {
 const [lastMonthData, setLastMonthData] = useState({
  total_new_helpers: 0,
  total_new_seekers: 0,
  total_new_users: 0,
  helpers_details: [],
  seekers_details: [],
});


  const [serviceInventory, setServiceInventory] = useState<ServiceInventory[]>([]);
  const [loading, setLoading] = useState(true);
const [totalHelpers, setTotalHelpers] = useState(0);
  const [totalSeekers, setTotalSeekers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
   const [activeHelpers, setActiveHelpers] = useState(0);
  const [inactiveHelpers, setInactiveHelpers] = useState(0);
  const redirect = (path: string) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    redirect("/login");
  };


useEffect(() => {
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      /* ===============================
         1️⃣ User Report
      =============================== */
      const userReportRes = await fetch(
        "http://192.168.0.187:9830/services/admin/user-report",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userReportData = await userReportRes.json();

      if (userReportRes.ok) {
        setTotalHelpers(userReportData.total_helpers || 0);
        setTotalSeekers(userReportData.total_seekers || 0);
        setTotalUsers(userReportData.total_users || 0);
      }

      /* ===============================
         2️⃣ Last Month Report
      =============================== */
      const lastMonthRes = await fetch(
        "http://192.168.0.187:9830/admin/analytics/last-month-report",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const lastMonthJson = await lastMonthRes.json();

      if (lastMonthRes.ok) {
        setLastMonthData({
          total_new_helpers: lastMonthJson.total_new_helpers || 0,
          total_new_seekers: lastMonthJson.total_new_seekers || 0,
          total_new_users:
            (lastMonthJson.total_new_helpers || 0) +
            (lastMonthJson.total_new_seekers || 0),
          helpers_details: lastMonthJson.helpers_details || [],
          seekers_details: lastMonthJson.seekers_details || [],
        });
      }

      /* ===============================
         3️⃣ Service Inventory
      =============================== */
      const serviceRes = await fetch(
        "http://192.168.0.187:9830/admin/analytics/service-inventory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const serviceJson: ServiceInventory[] = await serviceRes.json();

      if (serviceRes.ok) {
        setServiceInventory(serviceJson);
      }

      /* ===============================
         4️⃣ Active & Inactive Helpers Count
      =============================== */
      /* ===============================
   4️⃣ Active & Inactive Helpers Count
=============================== */
const helperCountRes = await fetch(
  "http://192.168.0.187:9830/admin/helpers/counts",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const helperCountJson = await helperCountRes.json();

if (helperCountRes.ok && helperCountJson.summary) {
  setActiveHelpers(helperCountJson.summary.active_helpers || 0);
  setInactiveHelpers(helperCountJson.summary.inactive_helpers || 0);
}


    } catch (error) {
      console.error("Dashboard API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

   const barData = {
    labels: ["Helpers", "Seekers"],
    datasets: [
      {
        label: "User Distribution",
        data: [totalHelpers, totalSeekers],
        backgroundColor: ["#ec4899", "#6366f1"],
        borderRadius: 8,
      },
    ],
  };

   const pieData = {
  labels: ["Active Helpers", "Inactive Helpers"],
  datasets: [
    {
      label: "Helper Status",
      data: [activeHelpers, inactiveHelpers], // now from API response
      backgroundColor: ["#22c55e", "#ef4444"], // green for active, red for inactive
      borderWidth: 1,
      hoverOffset: 6,
    },
  ],
};



  return (
    <>
      {/* SIDE MENU */}
      <IonMenu side="end" menuId="adminMenu" contentId="adminContent">
        <IonHeader>
          <IonToolbar className="bg-indigo-600 text-purple-300 px-4">
            <div className="flex justify-between items-center w-full">
              <IonTitle>Admin Panel</IonTitle>
              <IonButton
                fill="clear"
                onClick={() => (window as any).document.querySelector("ion-menu")?.close()}
              >
                <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>

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

            {/* Manage Users */}
            <IonMenuToggle autoHide>
              <div
                onClick={() => redirect("/manage-users")}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <IonIcon icon={peopleOutline} className="text-purple-400 text-xl" />
                <span className="font-medium tracking-wide">Manage Users</span>
              </div>
            </IonMenuToggle>

            {/* Services */}
            <IonMenuToggle autoHide>
              <div
                onClick={() => redirect("/admin-service")}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-pink-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <IonIcon icon={settingsOutline} className="text-pink-400 text-xl" />
                <span className="font-medium tracking-wide"> Manage Services</span>
              </div>
            </IonMenuToggle>

            {/* Logout */}
            <IonMenuToggle autoHide>
              <div
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <IonIcon icon={logOutOutline} className="text-red-400 text-xl" />
                <span className="font-medium tracking-wide text-red-400">Logout</span>
              </div>
            </IonMenuToggle>
          </div>
        </IonContent>
      </IonMenu>

      <IonPage>
        {/* NAVBAR */}
        <div
          id="adminContent"
          className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-5 py-3"
        >
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-pink-500"
            />
            <h1 className="font-bold text-xl text-indigo-600">Maidigo Admin</h1>
          </div>

          <IonButtons>
            <IonButton
              onClick={() => (window as any).document.querySelector("ion-menu")?.toggle()}
            >
              <IonIcon icon={menuOutline} className="text-3xl text-pink-800" />
            </IonButton>
          </IonButtons>
        </div>

        <IonContent className="bg-pink-50 min-h-screen p-4">
          {/* Banner */}
          <div className="w-full h-64 relative rounded-xl overflow-hidden shadow-lg mb-6">
            <img src={bannerImg} alt="Admin Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-2">Dashboard</h2>
              <p className="text-white/90 text-lg drop-shadow-sm">
                Overview of Users & Services
              </p>
            </div>
          </div>
{/* Dashboard Cards */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  {/* Total Users */}
  <div className="flex flex-col items-center justify-center bg-linear-to-r from-pink-400 via-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl min-h-[220px] text-center">
    <IonIcon icon={clipboardOutline} className="text-5xl mb-3" />
    <h3 className="text-3xl font-bold">{loading ? "..." : totalSeekers}</h3>
    <p className="mt-2">Total Users</p>
  </div>

  {/* Total Helpers */}
  <div className="flex flex-col items-center justify-center bg-linear-to-r from-indigo-400 via-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl min-h-[220px] text-center">
    <IonIcon icon={personCircleOutline} className="text-5xl mb-3" />
    <h3 className="text-3xl font-bold">{loading ? "..." : totalHelpers}</h3>
    <p className="mt-2">Total Helpers</p>
  </div>

  {/* Combined New Users Card */}
  <div className="flex flex-col items-center justify-between 
                bg-linear-to-r from-indigo-500 via-pink-500 to-teal-500 
                text-white p-6 rounded-2xl shadow-xl 
                min-h-60 text-center">

  {/* Icon */}
  <div className="flex justify-center items-center mb-3">
    <IonIcon icon={peopleOutline} className="text-5xl" />
  </div>

  {/* Total New Users */}
  <h3 className="text-4xl font-extrabold tracking-wide">
    {loading
      ? "..."
      : lastMonthData.total_new_helpers + lastMonthData.total_new_seekers}
  </h3>

  <p className="mb-4 text-white/90 font-medium">
    Total New Users (Last 30 Days)
  </p>

  {/* Helper & Seeker Breakdown */}
  <div className="flex justify-between gap-4 w-full mt-2">

    <div className="flex-1 bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md">
      <p className="text-2xl font-bold">
        {loading ? "..." : lastMonthData.total_new_helpers}
      </p>
      <p className="text-sm text-white/90">New Helpers</p>
    </div>

    <div className="flex-1 bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md">
      <p className="text-2xl font-bold">
        {loading ? "..." : lastMonthData.total_new_seekers}
      </p>
      <p className="text-sm text-white/90">New Seekers</p>
    </div>

  </div>
</div>


  {/* Total Services */}
  <div className="flex flex-col items-center justify-center bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-xl min-h-[220px] text-center">
    <IonIcon icon={settingsOutline} className="text-5xl mb-3" />
    <h3 className="text-3xl font-bold">{loading ? "..." : serviceInventory.length}</h3>
    <p className="mt-2">Total Services</p>
  </div>
</div>

          {/* Service Inventory */}
<h3 className="text-3xl font-extrabold mb-6 bg-linear-to-r from-indigo-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">
  Service Inventory
</h3>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  {serviceInventory.map((service, idx) => (
    <div
      key={idx}
      className="relative flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg min-h-[200px] 
                 bg-linear-to-r from-blue-200 via-indigo-200 to-teal-200 text-center"
    >
      {/* Soft white overlay */}
      <div className="absolute inset-0 bg-white/40 rounded-2xl backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">
          {service.service_name}
        </h4>

        <div className="flex gap-4 w-full justify-center">
          <div className="flex-1 bg-white/70 p-3 rounded-xl text-center shadow-sm">
            <p className="text-2xl font-bold text-indigo-600">
              {service.total_helpers}
            </p>
            <p className="text-sm text-gray-600">Helpers</p>
          </div>

          <div className="flex-1 bg-white/70 p-3 rounded-xl text-center shadow-sm">
            <p className="text-2xl font-bold text-teal-600">
              {service.total_seekers}
            </p>
            <p className="text-sm text-gray-600">Seekers</p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>



 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-h-[calc(100vh-200px)] overflow-auto">
  {/* Bar Chart */}
 <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-96 md:h-104 w-full">
  <h3 className="text-lg font-bold mb-4 text-gray-700 text-center">
    User Distribution
  </h3>
  <div className="flex-1 w-full">
    <Bar
      data={barData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      }}
    />
  </div>
</div>



 {/* Helper Status Card */}
<div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center h-132 md:h-128 w-full mt-6">
  <h3 className="text-lg font-bold mb-4 text-gray-700 text-center">
    Helper Status
  </h3>

  {loading ? (
    <p>Loading chart...</p>
  ) : (
    <div className="flex-1 flex items-center justify-center w-full">
      <div className="w-64 h-64 md:w-72 md:h-72">
        <Pie
          data={{
            labels: ["Active Helpers", "Inactive Helpers"],
            datasets: [
              {
                label: "Helper Status",
                data: [activeHelpers, inactiveHelpers], // ✅ dynamic from state
                backgroundColor: ["#22c55e", "#ef4444"], // green & red
                borderWidth: 1,
                hoverOffset: 6,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: { boxWidth: 14, font: { size: 12 } },
              },
              tooltip: { enabled: true },
            },
          }}
        />
      </div>
    </div>
  )}
</div>

</div>

        </IonContent>
          

       
       </IonPage>
    </>
  );
};

export default AdminHome;
