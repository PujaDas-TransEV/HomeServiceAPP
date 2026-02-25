import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";

const API_BASE = "http://192.168.0.187:9830";

export default function ServiceHelpers() {
  const { serviceId } = useParams<any>();
  const history = useHistory();
  const [helpers, setHelpers] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/helpers/service/${serviceId}`)
      .then(res => res.json())
      .then(data => setHelpers(data));
  }, [serviceId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-indigo-600 text-white">
          <IonTitle>Service Helpers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 bg-gray-100">
        {helpers.map((helper) => (
          <div
            key={helper.id}
            onClick={() => history.push(`/helper/${helper.id}`)}
            className="bg-white p-4 rounded-xl shadow mb-4 cursor-pointer"
          >
            <p className="font-semibold">{helper.name}</p>
            <p className="text-sm text-gray-500">{helper.city}</p>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
}