import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { chatbubbleOutline, calendarOutline, locationOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const API_BASE = "http://192.168.0.187:9830";

export default function HelperDetails() {
  const { helperId } = useParams<{ helperId: string }>();
  const history = useHistory();

  const [helper, setHelper] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    fetchHelperDetails();
  }, [helperId]);

  const fetchHelperDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const res = await fetch(`${API_BASE}/helper/helper-details/${helperId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setHelper(data);
    } catch (err) {
      console.log("Error fetching helper details:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-400 w-5 h-5" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />);
      } else {
        stars.push(<FaStar key={i} className="text-yellow-300 w-5 h-5" />);
      }
    }
    return stars;
  };

  if (loading)
    return (
      <IonPage>
        <IonContent className={`${darkMode ? "bg-gray-900" : "bg-linear-to-b from-orange-50 to-green-50"} flex justify-center items-center h-full`}>
          <IonSpinner name="crescent" color="primary" />
        </IonContent>
      </IonPage>
    );

  if (!helper)
    return (
      <IonPage>
        <IonContent className={`${darkMode ? "bg-gray-900" : "bg-linear-to-b from-orange-50 to-green-50"} flex justify-center items-center h-full`}>
          <p className={`${darkMode ? "text-gray-200" : "text-gray-700"} text-lg`}>Helper not found.</p>
        </IonContent>
      </IonPage>
    );

  const profile = helper.profile;
  const account = helper.account_info;
  const location = helper.location;
  const work = helper.work_details;
  const requirements = helper.requirements;
  const services = helper.services;
  const notes = helper.additional_details;
  const ratingStats = account?.rating_stats;

  const profilePic = account?.profile_picture || `https://i.pravatar.cc/150?u=${helper.helper_id}`;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={`px-4 py-3 ${darkMode ? "bg-gray-800" : "bg-linear-to-r from-orange-400 via-yellow-400 to-green-400"}`}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" className={darkMode ? "text-white" : "text-blue-800"} />
          </IonButtons>
          <h1 className={`text-lg font-bold ${darkMode ? "text-white" : "text-white"}`}>Helper Details</h1>
        </IonToolbar>
      </IonHeader>

      <IonContent className={`${darkMode ? "bg-gray-900 text-white" : "bg-linear-to-b from-orange-50 via-yellow-50 to-green-50"} p-4`}>

        {/* Profile Card */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-linear-to-r from-pink-50 to-purpe-100"} rounded-3xl shadow-xl p-6 flex flex-col items-center text-center mb-6 transition transform hover:-translate-y-1`}>
          <img
            src={profilePic}
            alt={profile?.name}
            className="w-28 h-28 rounded-full border-4 border-indigo-400 shadow-lg mb-4 object-cover"
          />
          <h2 className={`${darkMode ? "text-white" : "text-gray-900"} text-2xl font-bold`}>{profile?.name}</h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm`}>{location?.city}, {location?.area}</p>
          <p className="text-yellow-400 text-sm mt-1">{profile?.experience || 0} yrs experience</p>
          <p className="text-green-500 text-sm mt-1">Capacity: {account?.capacity || "N/A"}</p>

          {ratingStats?.total_reviews > 0 && (
            <div className="flex items-center justify-center mt-2 gap-1">
              {renderStars(ratingStats.overall_rating)}
              <span className={`${darkMode ? "text-gray-300" : "text-gray-700"} ml-2 text-sm`}>({ratingStats.total_reviews} reviews)</span>
            </div>
          )}
        </div>

     {/* Services Offered */}
<IonCard
  className={`${
    darkMode ? "bg-gray-800" : "bg-linear-to-r from-pink-50 to-pink-200"
  } rounded-2xl shadow-lg p-4 mb-4 transition transform hover:-translate-y-1`}
>
  <IonCardHeader>
    <IonCardTitle className="text-lg text-indigo-300 font-semibold">
      Services Offered
    </IonCardTitle>
  </IonCardHeader>
  <IonCardContent className="flex flex-wrap">
    {services?.map((service: any) => (
      <span
        key={service.id}
        className="bg-indigo-700 text-white px-4 py-1 rounded-full text-xs font-semibold m-1"
      >
        {service.name}
      </span>
    ))}
  </IonCardContent>
</IonCard>

        {/* Work Details */}
        <IonCard className={`${darkMode ? "bg-gray-800" : "bg-linear-to-r from-pink-50 to-orange-100"} rounded-2xl shadow-lg p-4 mb-4 transition transform hover:-translate-y-1`}>
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-300 font-semibold">Work Details</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm space-y-1`}>
            <p><b>Job Type:</b> {work?.job_type}</p>
            <p><b>Work Mode:</b> {work?.work_mode}</p>
            <p><b>Working Days:</b> {work?.working_days}</p>
            <p><b>Active:</b> {account?.is_active ? "Yes" : "No"}</p>
          </IonCardContent>
        </IonCard>

        {/* Requirements */}
        <IonCard className={`${darkMode ? "bg-gray-800" : "bg-linear-to-r from-pink-50 to-green-100"} rounded-2xl shadow-lg p-4 mb-4 transition transform hover:-translate-y-1`}>
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-300 font-semibold">Requirements</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm space-y-1`}>
            <p><b>Salary:</b> ₹{requirements?.min_salary?.toLocaleString()} - ₹{requirements?.max_salary?.toLocaleString()}</p>
            <p><b>Gender:</b> {requirements?.gender_pref || "Any"}</p>
          </IonCardContent>
        </IonCard>

        {/* Skills & Notes */}
        <IonCard className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-lg p-4 mb-4 transition transform hover:-translate-y-1`}>
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-300 font-semibold">Skills & Notes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm space-y-1`}>
            <p><b>Skills:</b> {notes?.skills || "N/A"}</p>
            <p><b>Special Preferences:</b> {notes?.special_preferences || "None"}</p>
            <p><b>Phone:</b> {account?.phone || "N/A"}</p>
          </IonCardContent>
        </IonCard>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-6 mb-10">
        <IonButton
  expand="block"
  color="success"
  className="flex items-center justify-center"
  onClick={() => history.push(`/booking/${helper.helper_id}`)}
>
  Book Now
  <IonIcon icon={calendarOutline} slot="end" className="ml-2" />
</IonButton>

          <IonButton
  expand="block"
  fill="solid"
  color="tertiary"
  className="flex items-center justify-center bg-orange-100 text-orange-800 hover:bg-orange-200 shadow-md rounded-xl"
>
  <IonIcon icon={locationOutline} slot="start" className="text-orange-600" />
  {location?.city}, {location?.area}
</IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
}