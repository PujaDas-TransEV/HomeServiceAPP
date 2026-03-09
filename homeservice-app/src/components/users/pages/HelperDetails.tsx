import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSpinner
} from "@ionic/react";

import { chatbubbleOutline, calendarOutline, locationOutline } from "ionicons/icons";

import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

const API_BASE = "http://192.168.0.187:9830";

export default function HelperDetails() {
  const { helperId } = useParams<{ helperId: string }>();
  const history = useHistory();

  const [helper, setHelper] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return (
      <IonPage>
        <IonContent className="flex justify-center items-center h-full bg-linear-to-b from-indigo-50 to-white">
          <IonSpinner name="crescent" color="primary" />
        </IonContent>
      </IonPage>
    );

  if (!helper)
    return (
      <IonPage>
        <IonContent className="flex justify-center items-center h-full bg-linear-to-b from-indigo-50 to-white">
          <p className="text-gray-500 text-lg">Helper not found.</p>
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

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar className="bg-white">
  <IonButtons slot="start">
    <IonBackButton
      defaultHref="/helper-home"
      className="text-black"
    />
  </IonButtons>
</IonToolbar>
      </IonHeader>

      <IonContent className="bg-linear-to-b from-indigo-50 to-white p-4">

        {/* Profile Card */}
        <IonCard className="rounded-3xl shadow-xl mb-5 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col items-center p-6 bg-white rounded-3xl">
            <img
              src={profile?.image || "https://i.pravatar.cc/150"}
              alt={profile?.name}
              className="w-28 h-28 rounded-full border-4 border-indigo-400 shadow-lg mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800">{profile?.name}</h2>
            <p className="text-gray-500 text-sm">{location?.city}, {location?.area}</p>
            <p className="text-yellow-500 text-sm mt-1">
              ⭐ {profile?.experience || 0} yrs experience
            </p>
            <p className="text-green-600 text-sm mt-1">
              Capacity: {account?.capacity || "N/A"}
            </p>
          </div>
        </IonCard>

        {/* Services Offered */}
        <IonCard className="rounded-2xl shadow-lg mb-4 hover:shadow-xl transition-all duration-300">
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-700 font-semibold">Services Offered</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="flex flex-wrap gap-2">
            {services?.map((service: any) => (
              <span
                key={service.id}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
              >
                {service.name}
              </span>
            ))}
          </IonCardContent>
        </IonCard>

        {/* Work Details */}
        <IonCard className="rounded-2xl shadow-lg mb-4 hover:shadow-xl transition-all duration-300">
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-700 font-semibold">Work Details</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="text-sm text-gray-700 space-y-2">
            <p><b>Job Type:</b> {work?.job_type}</p>
            <p><b>Work Mode:</b> {work?.work_mode}</p>
            <p><b>Working Days:</b> {work?.working_days}</p>
            <p><b>Active:</b> {account?.is_active ? "Yes" : "No"}</p>
          </IonCardContent>
        </IonCard>

        {/* Requirements */}
        <IonCard className="rounded-2xl shadow-lg mb-4 hover:shadow-xl transition-all duration-300">
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-700 font-semibold">Requirements</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="text-sm text-gray-700 space-y-2">
            <p>
              <b>Salary:</b> ₹{requirements?.min_salary?.toLocaleString()} - ₹{requirements?.max_salary?.toLocaleString()}
            </p>
            <p><b>Gender Preference:</b> {requirements?.gender_pref || "Any"}</p>
          </IonCardContent>
        </IonCard>

        {/* Additional Details */}
        <IonCard className="rounded-2xl shadow-lg mb-4 hover:shadow-xl transition-all duration-300">
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-700 font-semibold">Skills & Notes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="text-sm text-gray-700 space-y-2">
            <p><b>Skills:</b> {notes?.skills || "N/A"}</p>
            <p><b>Special Preferences:</b> {notes?.special_preferences || "None"}</p>
            <p><b>Phone:</b> {account?.phone || "N/A"}</p>
          </IonCardContent>
        </IonCard>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-10 mt-6">
          <IonButton
            expand="block"
            color="gradient-green"
            className="h-12 text-base font-semibold bg-linear-to-r from-green-400 to-emerald-500 text-white shadow-md hover:shadow-lg transition"
            onClick={() => history.push(`/booking/${helper.helper_id}`)}
          >
            <IonIcon icon={calendarOutline} slot="start" />
            Book Now
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            color="primary"
            className="h-12 text-base font-semibold hover:bg-indigo-50 transition"
            onClick={() => history.push(`/chat/${helper.helper_id}`)}
          >
            <IonIcon icon={chatbubbleOutline} slot="start" />
            Chat Now
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            color="medium"
            className="hover:bg-gray-100 transition"
          >
            <IonIcon icon={locationOutline} slot="start" />
            {location?.city}, {location?.area}
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
}