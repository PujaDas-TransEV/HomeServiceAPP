
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonSpinner,
  IonBackButton,
  IonButtons
} from "@ionic/react";
import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import { locationOutline, calendarOutline } from "ionicons/icons";

const API_BASE = "http://192.168.0.187:9830";

export default function ServiceHelpers() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const history = useHistory();

  const [helpers, setHelpers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchServiceHelpers = async () => {
    if (!serviceId) {
      setHelpers([]);
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        `${API_BASE}/services/service-participants/${serviceId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) setHelpers(data);
      else if (data.helpers) setHelpers(data.helpers);
      else setHelpers([]);
    } catch (err) {
      console.error(err);
      setHelpers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceHelpers();
  }, [serviceId]);

  const goToHelperProfile = (e: any, helperId: string) => {
    e.stopPropagation();
    history.push(`/helper/${helperId}`);
  };

  // Pastel colors for light mode cards
  const pastelColors = [
    "bg-pink-50 border-pink-200",
    "bg-purple-50 border-purple-200",
    "bg-indigo-50 border-indigo-200",
    "bg-green-50 border-green-200",
    "bg-yellow-50 border-yellow-200",
    "bg-orange-50 border-orange-200",
    "bg-teal-50 border-teal-200"
  ];

  return (
    <IonPage>
      {/* ================= HEADER ================= */}
      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 text-white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/helper-home" className="text-blue-600 dark:text-blue-400"/>
          </IonButtons>
          <IonTitle className="font-semibold">
            Available Helpers
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* ================= CONTENT ================= */}
      <IonContent className="p-4 bg-gray-100 dark:bg-gray-900">

        {/* Title */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Available Helpers
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose a helper for your service
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mt-10">
            <IonSpinner />
          </div>
        )}

        {/* Empty */}
        {!loading && helpers.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No helpers available for this service
          </p>
        )}

        {/* Helpers List */}
        {helpers.map((helper, index) => {
          const cardColor = pastelColors[index % pastelColors.length];
          return (
            <div
              key={helper.registration_id}
              className={`rounded-2xl shadow-md p-4 mb-4 flex items-center gap-4 
                          ${cardColor} dark:bg-gray-800 dark:border-gray-700 border hover:shadow-xl transition-all`}
            >
              {/* Profile */}
              <img
                src={helper.profile_picture || "https://i.pravatar.cc/100"}
                className="w-16 h-16 rounded-full object-cover border cursor-pointer"
                alt={helper.name}
                onClick={(e) => goToHelperProfile(e, helper.registration_id)}
              />

              {/* Info */}
              <div className="flex-1">
                <p
                  className="font-semibold cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition 
                             text-gray-800 dark:text-gray-200"
                  onClick={(e) => goToHelperProfile(e, helper.registration_id)}
                >
                  {helper.name}
                </p>

                <div className="flex items-center text-sm mt-1 text-gray-500 dark:text-gray-400">
                  <IonIcon icon={locationOutline} className="mr-1" />
                  {helper.city || "Unknown City"}
                </div>
              </div>

              {/* Book Button */}
              <IonButton
                size="small"
                className="flex items-center gap-2 rounded-full shadow-md bg-green-500 hover:bg-green-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/booking/${helper.registration_id}`);
                }}
              >
                Book Now
                <IonIcon icon={calendarOutline} className="ml-2" />
              </IonButton>
            </div>
          );
        })}
      </IonContent>
    </IonPage>
  );
}