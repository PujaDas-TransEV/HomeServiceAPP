import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton
} from "@ionic/react";

import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";

const API_BASE = "http://192.168.0.187:9830";

export default function HelperDetails() {
  const { helperId } = useParams<any>();
  const history = useHistory();
  const [helper, setHelper] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/helpers/${helperId}`)
      .then(res => res.json())
      .then(data => setHelper(data));
  }, [helperId]);

  if (!helper) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-purple-600 text-white">
          <IonTitle>{helper.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 bg-gray-100">

        <img
          src={helper.image}
          className="w-full h-64 object-cover rounded-2xl mb-4"
        />

        <p><b>Experience:</b> {helper.experience}</p>
        <p><b>Location:</b> {helper.city}</p>
        <p><b>Rating:</b> ⭐⭐⭐⭐⭐</p>

        <IonButton
          expand="block"
          className="mt-6"
          onClick={() => history.push(`/chat/${helper.id}`)}
        >
          Chat
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          className="mt-3"
          onClick={() => history.push(`/booking/${helper.id}`)}
        >
          Book Now
        </IonButton>

      </IonContent>
    </IonPage>
  );
}