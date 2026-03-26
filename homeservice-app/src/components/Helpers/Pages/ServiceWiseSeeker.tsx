// import {
//   IonPage,
//   IonContent,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonButton,
//   IonIcon,
//   IonSpinner,
//   IonBackButton,
//   IonButtons
// } from "@ionic/react";
// import { useParams, useHistory } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { locationOutline, chatbubbleOutline } from "ionicons/icons";

// const API_BASE = "http://192.168.0.187:9830";

// export default function ServiceWiseSeeker() {
//   const { serviceId } = useParams<{ serviceId: string }>();
//   const history = useHistory();

//   const [seekers, setSeekers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchServiceSeekers = async (serviceId: string) => {
//     if (!serviceId) {
//       console.error("No serviceId provided!");
//       return;
//     }

//     setLoading(true);
//     const token = localStorage.getItem("access_token");

//     try {
//       const res = await fetch(
//         `${API_BASE}/services/service-participants/${serviceId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const data = await res.json();
//       const seekersList = data.seekers || [];
//       setSeekers(seekersList);
//     } catch (err) {
//       console.error("Error fetching seekers:", err);
//       setSeekers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServiceSeekers(serviceId);
//   }, [serviceId]);

//   // go to seeker profile
//   const goToSeekerProfile = (e: any, seekerId: string) => {
//     e.stopPropagation();
//     history.push(`/seeker/${seekerId}`);
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar className="bg-indigo-600 text-white">
//           <IonButtons slot="start">
//             <IonBackButton defaultHref="/helper-home" className="text-black" />
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="p-4 bg-gray-100">
//         <IonTitle className="bg-purple-400 text-pink-600">
//           Available Seekers
//         </IonTitle>

//         {loading && (
//           <div className="flex justify-center mt-10">
//             <IonSpinner />
//           </div>
//         )}

//         {!loading && seekers.length === 0 && (
//           <p className="text-center text-gray-500 mt-10">
//             No seekers available for this service
//           </p>
//         )}

//         {seekers.map((seeker) => (
//           <div
//             key={seeker.registration_id}
//             className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center gap-4 hover:shadow-lg transition"
//           >
//             {/* Profile Image */}
//             <img
//               src={seeker.profile_picture || "https://i.pravatar.cc/100"}
//               className="w-16 h-16 rounded-full object-cover border cursor-pointer"
//               alt={seeker.name}
//               onClick={(e) => goToSeekerProfile(e, seeker.registration_id)}
//             />

//             <div className="flex-1">
//               {/* Name clickable */}
//               <p
//                 className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600"
//                 onClick={(e) => goToSeekerProfile(e, seeker.registration_id)}
//               >
//                 {seeker.name}
//               </p>

//               <div className="flex items-center text-sm text-gray-500 mt-1">
//                 <IonIcon icon={locationOutline} className="mr-1" />
//                 {seeker.city || "Unknown City"}
//               </div>
//             </div>

//             {/* Chat Button */}
//             <IonButton
//               size="small"
//               color="primary"
//               onClick={() => history.push(`/chat/${seeker.registration_id}`)}
//             >
//               <IonIcon slot="start" icon={chatbubbleOutline} />
//               Chat
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
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { locationOutline, chatbubbleOutline } from "ionicons/icons";
import { eyeOutline } from "ionicons/icons";
const API_BASE = "http://192.168.0.187:9830";

// Predefined card color sets for variety
const lightCardColors = [
  "bg-yellow-50 text-yellow-900",
  "bg-pink-50 text-pink-900",
  "bg-green-50 text-green-900",
  "bg-blue-50 text-blue-900",
  "bg-purple-50 text-purple-900",
];

const darkCardColors = [
  "bg-yellow-800 text-yellow-100",
  "bg-pink-800 text-pink-100",
  "bg-green-800 text-green-100",
  "bg-blue-800 text-blue-100",
  "bg-purple-800 text-purple-100",
];

export default function ServiceWiseSeeker() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const history = useHistory();

  const [seekers, setSeekers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchServiceSeekers = async (serviceId: string) => {
    if (!serviceId) return;

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

  // go to seeker profile
  const goToSeekerProfile = (e: any, seekerId: string) => {
    e.stopPropagation();
    history.push(`/seeker/${seekerId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-indigo-600 text-white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/helper-home" className="text-blue-600" />
          </IonButtons>
          <IonTitle className="text-pink-300">Available Seekers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {loading && (
          <div className="flex justify-center mt-10">
            <IonSpinner name="crescent" />
          </div>
        )}

        {!loading && seekers.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-300 mt-10">
            No seekers available for this service
          </p>
        )}

        {seekers.map((seeker, index) => {
          const lightColor = lightCardColors[index % lightCardColors.length];
          const darkColor = darkCardColors[index % darkCardColors.length];

          return (
            <div
              key={seeker.registration_id}
              className={`rounded-2xl shadow-md p-4 mb-4 flex items-center gap-4 
                hover:shadow-xl transition
                ${lightColor} dark:${darkColor}`}
            >
              {/* Profile Image */}
              <img
                src={seeker.profile_picture || "https://i.pravatar.cc/100"}
                className="w-16 h-16 rounded-full object-cover border cursor-pointer border-gray-300 dark:border-gray-600"
                alt={seeker.name}
                onClick={(e) => goToSeekerProfile(e, seeker.registration_id)}
              />

              <div className="flex-1">
                {/* Name clickable */}
                <p
                  className="font-semibold cursor-pointer hover:underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  onClick={(e) => goToSeekerProfile(e, seeker.registration_id)}
                >
                  {seeker.name}
                </p>

                <div className="flex items-center text-sm mt-1">
                  <IonIcon icon={locationOutline} className="mr-1 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-500">
                    {seeker.city || "Unknown City"}
                  </span>
                </div>
              </div>

           
              {/* View Button */}
<IonButton
  size="small"
  className="bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-400 dark:hover:bg-indigo-500 rounded-full px-3 shadow-md"
  onClick={() => history.push(`/seeker/${seeker.registration_id}`)}
>
  <IonIcon slot="start" icon={eyeOutline} />
  View
</IonButton>
            </div>
          );
        })}
      </IonContent>
    </IonPage>
  );
}