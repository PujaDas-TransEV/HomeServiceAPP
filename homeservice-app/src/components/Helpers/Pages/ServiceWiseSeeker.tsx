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
import { useParams, useHistory } from "react-router-dom"; // useHistory for v5
import { useEffect, useState } from "react";
import { locationOutline, chatbubbleOutline } from "ionicons/icons";

const API_BASE = "http://192.168.0.187:9830";

export default function ServiceWiseSeeker() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const history = useHistory(); // <-- v5 navigation

  const [seekers, setSeekers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchServiceSeekers = async (serviceId: string) => {
    if (!serviceId) {
      console.error("No serviceId provided!");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        `${API_BASE}/services/service-participants/${serviceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();

      const seekersList = data.seekers || [];
      setSeekers(seekersList);
    } catch (err) {
      console.error("Error fetching seekers:", err);
      setSeekers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceSeekers(serviceId);
  }, [serviceId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-indigo-600 text-white">
           <IonButtons slot="start">
                      <IonBackButton defaultHref="/helper-home" className="text-black" />
                    </IonButtons>
         
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 bg-gray-100">
       
         <IonTitle className="bg-purple-400 text-pink-600">Available Seekers</IonTitle>

        {loading && (
          <div className="flex justify-center mt-10">
            <IonSpinner />
          </div>
        )}

        {!loading && seekers.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No seekers available for this service
          </p>
        )}

        {seekers.map((seeker) => (
          <div
            key={seeker.registration_id}
            className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center gap-4 hover:shadow-lg transition"
          >
            <img
              src={seeker.profile_picture || "https://i.pravatar.cc/100"}
              className="w-16 h-16 rounded-full object-cover border"
              alt={seeker.name}
            />

            <div className="flex-1">
              <p className="font-semibold text-gray-800">{seeker.name}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <IonIcon icon={locationOutline} className="mr-1" />
                {seeker.city || "Unknown City"}
              </div>
            </div>

            <IonButton
              size="small"
              color="primary"
              onClick={() => history.push(`/chat/${seeker.registration_id}`)}
            >
              <IonIcon slot="start" icon={chatbubbleOutline} />
              Chat
            </IonButton>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
}