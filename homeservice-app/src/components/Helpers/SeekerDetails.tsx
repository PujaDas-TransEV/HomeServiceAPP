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

import { chatbubbleOutline, callOutline, locationOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const API_BASE = "http://192.168.0.187:9830";

interface SeekerDetailsType {
  name: string;
  image: string;
  city: string;
  area: string;
  phone?: string;
  services_needed?: string[];
  rating?: number;
  bio?: string;
}

export default function SeekerDetails() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [seeker, setSeeker] = useState<SeekerDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeekerDetails();
  }, [id]);

  const fetchSeekerDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE}/seekers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSeeker(data.seeker_info || data);
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

  if (!seeker)
    return (
      <IonPage>
        <IonContent className="flex justify-center items-center h-full">
          <p className="text-gray-500">Seeker not found.</p>
        </IonContent>
      </IonPage>
    );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonCardTitle>{seeker.name}</IonCardTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-linear-to-b from-yellow-50 to-pink-50 p-4">

        {/* Profile Card */}
        <IonCard className="shadow-md rounded-xl">
          <div className="flex flex-col items-center p-4">
            <img
              src={seeker.image || "https://i.pravatar.cc/150"}
              alt={seeker.name}
              className="w-32 h-32 rounded-full border-2 border-indigo-400 object-cover shadow-md mb-4"
            />
            <IonCardHeader className="text-center">
              <IonCardTitle className="text-xl font-bold">{seeker.name}</IonCardTitle>
              <IonLabel className="text-gray-600">{seeker.city}, {seeker.area}</IonLabel>
            </IonCardHeader>
          </div>
        </IonCard>

        {/* Bio */}
        {seeker.bio && (
          <IonCard className="rounded-xl shadow-md mb-4">
            <IonCardContent>
              <p className="text-gray-700">{seeker.bio}</p>
            </IonCardContent>
          </IonCard>
        )}

        {/* Services Needed */}
        {seeker.services_needed && seeker.services_needed.length > 0 && (
          <IonCard className="rounded-xl shadow-md mb-4">
            <IonCardHeader>
              <IonCardTitle className="text-lg font-semibold text-green-700">Services Needed</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="flex flex-wrap gap-2">
              {seeker.services_needed.map((service) => (
                <span
                  key={service}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {service}
                </span>
              ))}
            </IonCardContent>
          </IonCard>
        )}

        {/* Contact & Actions */}
        <div className="flex flex-col gap-3 mb-8">
          {seeker.phone && (
            <IonButton
              expand="block"
              fill="outline"
              color="primary"
              href={`tel:${seeker.phone}`}
            >
              <IonIcon icon={callOutline} slot="start" />
              Call Seeker
            </IonButton>
          )}

          <IonButton
            expand="block"
            color="secondary"
            onClick={() => history.push(`/chat/${id}`)}
          >
            <IonIcon icon={chatbubbleOutline} slot="start" />
            Chat Now
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            color="tertiary"
            disabled={!seeker.city || !seeker.area}
          >
            <IonIcon icon={locationOutline} slot="start" />
            View Location
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
}