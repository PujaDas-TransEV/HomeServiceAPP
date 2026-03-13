
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonSpinner
} from "@ionic/react";

import {
  chatbubbleOutline,
  calendarOutline,
  locationOutline
} from "ionicons/icons";

import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const API_BASE = "http://192.168.0.187:9830";

export default function SeekerDetails() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeekerDetails();
  }, [id]);

  const fetchSeekerDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const res = await fetch(
        `${API_BASE}/seeker/seeker-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.log("Error fetching seeker details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <IonPage>
        <IonContent className="flex justify-center items-center h-full">
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );

  if (!data)
    return (
      <IonPage>
        <IonContent className="flex justify-center items-center h-full">
          <p className="text-gray-500">Seeker not found.</p>
        </IonContent>
      </IonPage>
    );

  
 const account = data.account_info;
const profile = {
  ...data.profile,
  image: account?.profile_picture || "https://i.pravatar.cc/150", // Use Base64 from API or fallback
};
const location = data.location;
const work = data.work_details;
const requirements = data.requirements;
const services = data.services_required;
const notes = data.additional_notes;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 text-white">
          <IonButtons slot="start">
            {/* <IonBackButton defaultHref="/helper-home" color="light" /> */}
            <IonToolbar className="bg-white">
  <IonButtons slot="start">
    <IonBackButton
      defaultHref="/helper-home"
      className="text-black"
    />
  </IonButtons>
</IonToolbar>
          </IonButtons>
          <IonCardTitle className="text-white font-bold">
            {profile?.name}
          </IonCardTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-linear-to-b from-indigo-50 to-white p-4">

        {/* Profile Card */}
        <IonCard className="rounded-2xl shadow-lg mb-5">
          <div className="flex flex-col items-center p-6">
            
         <img
  src={profile.image}
  alt={profile?.name}
  className="w-28 h-28 rounded-full border-4 border-indigo-400 shadow-md mb-4 object-cover"
/>
            <h2 className="text-xl font-bold text-gray-800">
              {profile?.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {location?.city}, {location?.area}
            </p>
            <p className="text-yellow-500 text-sm mt-1">
              ⭐ {profile?.rating || 0} Rating
            </p>
          </div>
        </IonCard>

        {/* Services Required */}
      
        <IonCard className="rounded-xl shadow-md mb-4">
  <IonCardHeader>
    <IonCardTitle className="text-lg text-indigo-700">
      Services Required
    </IonCardTitle>
  </IonCardHeader>
  <IonCardContent>
    <div className="flex flex-wrap items-center gap-2">
      {services?.map((service: any) => (
        <span
          key={service.id}
          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold"
        >
          {service.name}
        </span>
      ))}
    </div>
  </IonCardContent>
</IonCard>

        {/* Work Details */}
        <IonCard className="rounded-xl shadow-md mb-4">
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-700">
              Work Details
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="text-sm text-gray-700 space-y-2">
            <p><b>Job Type:</b> {work?.job_type}</p>
            <p><b>Work Mode:</b> {work?.work_mode}</p>
            <p><b>Working Days:</b> {work?.working_days}</p>
            <p><b>Accommodation:</b> {work?.accommodation ? "Yes" : "No"}</p>
          </IonCardContent>
        </IonCard>

        {/* Requirements */}
        <IonCard className="rounded-xl shadow-md mb-4">
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-700">
              Requirements
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="text-sm text-gray-700 space-y-2">
            {/* <p><b>Salary Budget:</b> ₹{requirements?.salary_budget}</p> */}
            <p>
  <b>Salary Budget:</b>{" "}
  {requirements?.salary_min && requirements?.salary_max
    ? `₹${requirements.salary_min.toLocaleString()} - ₹${requirements.salary_max.toLocaleString()}`
    : requirements?.salary_min
    ? `From ₹${requirements.salary_min.toLocaleString()}`
    : requirements?.salary_max
    ? `Up to ₹${requirements.salary_max.toLocaleString()}`
    : "Not specified"}
</p>
            <p><b>Gender Preference:</b> {requirements?.gender_pref}</p>
            <p><b>Age Range:</b> {requirements?.age_range}</p>
            <p><b>Experience Required:</b> {requirements?.experience_required}</p>
            <p><b>Skills Needed:</b> {notes?.skills_needed}</p>
          </IonCardContent>
        </IonCard>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-10 mt-6">

          {/* <IonButton
            expand="block"
            color="success"
            className="h-12 text-base font-semibold"
            onClick={() => history.push(`/booking/${id}`)}
          >
            <IonIcon icon={calendarOutline} slot="start" />
            Book Now
          </IonButton> */}

          <IonButton
            expand="block"
            fill="outline"
            color="primary"
            className="h-12 text-base font-semibold"
            onClick={() => history.push(`/chat/${id}`)}
          >
            <IonIcon icon={chatbubbleOutline} slot="start" />
            Chat Now
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            color="medium"
          >
            <IonIcon icon={locationOutline} slot="start" />
            {location?.city}, {location?.area}
          </IonButton>

        </div>

      </IonContent>
    </IonPage>
  );
}