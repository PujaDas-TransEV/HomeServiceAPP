import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { menuOutline, closeOutline, barChartOutline } from "ionicons/icons";
import bannerImg from "../../assets/reports_banner.jpg"; // replace with your banner image

const ManageReports: React.FC = () => {
  const redirect = (path: string) => {
    window.location.href = path;
  };

  return (
    <IonPage id="reportsContent">
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-6 py-4">
        <h1 className="font-bold text-xl text-indigo-600">Reports & Analytics</h1>
        <IonButtons>
          <IonButton onClick={() => (window as any).document.querySelector("ion-menu")?.toggle()}>
            <IonIcon icon={menuOutline} className="text-3xl text-pink-600" />
          </IonButton>
        </IonButtons>
      </div>

      <IonContent className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
          <img src={bannerImg} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
            <h2 className="text-4xl font-extrabold tracking-wide">Reports & Analytics 📊</h2>
            <p className="mt-2 text-white/80">
              View platform performance, revenue, and user growth
            </p>
          </div>
        </div>

        {/* Reports Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* User Growth Report */}
          <div
            className="bg-gradient-to-tr from-indigo-400 to-purple-400 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => redirect("/reports/user-growth")}
          >
            <div className="flex items-center gap-3">
              <IonIcon icon={barChartOutline} className="text-white text-3xl" />
              <h3 className="text-white font-bold text-lg">User Growth Report</h3>
            </div>
            <p className="text-white/80 mt-2 text-sm">
              Track the growth of users over time
            </p>
          </div>

          {/* Booking Report */}
          <div
            className="bg-gradient-to-tr from-pink-400 to-pink-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => redirect("/reports/booking")}
          >
            <div className="flex items-center gap-3">
              <IonIcon icon={barChartOutline} className="text-white text-3xl" />
              <h3 className="text-white font-bold text-lg">Booking Report</h3>
            </div>
            <p className="text-white/80 mt-2 text-sm">
              Overview of bookings on the platform
            </p>
          </div>

          {/* Revenue Report */}
          <div
            className="bg-gradient-to-tr from-green-400 to-green-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => redirect("/reports/revenue")}
          >
            <div className="flex items-center gap-3">
              <IonIcon icon={barChartOutline} className="text-white text-3xl" />
              <h3 className="text-white font-bold text-lg">Revenue Report</h3>
            </div>
            <p className="text-white/80 mt-2 text-sm">
              Analyze revenue trends and growth
            </p>
          </div>

          {/* Service Popularity */}
          <div
            className="bg-linear-to-tr from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => redirect("/reports/service-popularity")}
          >
            <div className="flex items-center gap-3">
              <IonIcon icon={barChartOutline} className="text-white text-3xl" />
              <h3 className="text-white font-bold text-lg">Service Popularity</h3>
            </div>
            <p className="text-white/80 mt-2 text-sm">
              Most popular services used by users
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ManageReports;