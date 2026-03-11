

// import {
//   IonPage,
//   IonContent,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonButton,
//   IonIcon,
//   IonSpinner,
//    IonBackButton,
//    IonButtons
// } from "@ionic/react";
// import { useParams, useHistory } from "react-router";
// import { useEffect, useState } from "react";
// import { locationOutline, calendarOutline } from "ionicons/icons";

// const API_BASE = "http://192.168.0.187:9830";

// export default function ServiceHelpers() {
//   const { serviceId } = useParams<{ serviceId: string }>();
//   const history = useHistory();

//   const [helpers, setHelpers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchServiceHelpers = async () => {
//     if (!serviceId) {
//       console.warn("No serviceId provided!");
//       setHelpers([]);
//       return;
//     }

//     setLoading(true);
//     const token = localStorage.getItem("access_token");

//     try {
//       const res = await fetch(`${API_BASE}/services/service-participants/${serviceId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (!res.ok) {
//         console.error("API returned error:", res.status);
//         setHelpers([]);
//         return;
//       }

//       const data = await res.json();

//       // handle different API formats safely
//       if (Array.isArray(data)) setHelpers(data);
//       else if (data.helpers) setHelpers(data.helpers);
//       else setHelpers([]);

//     } catch (err) {
//       console.error("Fetch error:", err);
//       setHelpers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServiceHelpers();
//   }, [serviceId]);

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar className="bg-indigo-600 text-white">
//             <IonButtons slot="start">
//                       <IonBackButton defaultHref="/helper-home" className="text-black" />
//                     </IonButtons>
//           <IonTitle>Available Helpers</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="p-4 bg-gray-100">
//           <IonTitle className="bg-purple-400 text-pink-600">Available Seekers</IonTitle>
//         {loading && (
//           <div className="flex justify-center mt-10">
//             <IonSpinner />
//           </div>
//         )}

//         {!loading && helpers.length === 0 && (
//           <p className="text-center text-gray-500 mt-10">
//             No helpers available for this service
//           </p>
//         )}

//         {helpers.map((helper) => (
//           <div
//             key={helper.registration_id}
//             className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center gap-4 hover:shadow-lg transition"
//           >
//             <img
//               src={helper.profile_picture || "https://i.pravatar.cc/100"}
//               className="w-16 h-16 rounded-full object-cover border"
//               alt={helper.name}
//             />

//             <div className="flex-1">
//               <p className="font-semibold text-gray-800">{helper.name}</p>
//               <div className="flex items-center text-sm text-gray-500 mt-1">
//                 <IonIcon icon={locationOutline} className="mr-1" />
//                 {helper.city || "Unknown City"}
//               </div>
//             </div>

//             <IonButton
//               size="small"
//               color="primary"
//               onClick={() =>
//                 history.push(`/book/${serviceId}/${helper.registration_id}`)
//               }
//             >
//               <IonIcon slot="start" icon={calendarOutline} />
//               Book Now
//             </IonButton>
//           </div>
//         ))}
//       </IonContent>
//     </IonPage>
//   );
// }

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
      console.warn("No serviceId provided!");
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

      if (!res.ok) {
        console.error("API returned error:", res.status);
        setHelpers([]);
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) setHelpers(data);
      else if (data.helpers) setHelpers(data.helpers);
      else setHelpers([]);
    } catch (err) {
      console.error("Fetch error:", err);
      setHelpers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceHelpers();
  }, [serviceId]);

  // redirect to helper profile
  const goToHelperProfile = (e: any, helperId: string) => {
    e.stopPropagation();
    if (helperId) {
      history.push(`/helper/${helperId}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-indigo-600 text-white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/helper-home" className="text-black" />
          </IonButtons>
          <IonTitle>Available Helpers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 bg-gray-100">
        <IonTitle className="bg-purple-400 text-pink-600">
          Available Helpers
        </IonTitle>

        {loading && (
          <div className="flex justify-center mt-10">
            <IonSpinner />
          </div>
        )}

        {!loading && helpers.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No helpers available for this service
          </p>
        )}

        {helpers.map((helper) => (
          <div
            key={helper.registration_id}
            className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center gap-4 hover:shadow-lg transition"
          >
            {/* Profile Image */}
            <img
              src={helper.profile_picture || "https://i.pravatar.cc/100"}
              className="w-16 h-16 rounded-full object-cover border cursor-pointer"
              alt={helper.name}
              onClick={(e) =>
                goToHelperProfile(e, helper.registration_id)
              }
            />

            <div className="flex-1">
              {/* Name clickable */}
              <p
                className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600"
                onClick={(e) =>
                  goToHelperProfile(e, helper.registration_id)
                }
              >
                {helper.name}
              </p>

              <div className="flex items-center text-sm text-gray-500 mt-1">
                <IonIcon icon={locationOutline} className="mr-1" />
                {helper.city || "Unknown City"}
              </div>
            </div>

            {/* Book Button */}
            <IonButton
              size="small"
              color="primary"
              onClick={() =>
                history.push(`/book/${serviceId}/${helper.registration_id}`)
              }
            >
              <IonIcon slot="start" icon={calendarOutline} />
              Book Now
            </IonButton>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
}