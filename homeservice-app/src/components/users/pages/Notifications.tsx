// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonContent,
//   IonItem,
//   IonLabel,
//   IonButton,
//   IonIcon,
//   IonSpinner,
// } from "@ionic/react";
// import { arrowBackOutline } from "ionicons/icons";
// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// const API_BASE = "http://192.168.0.187:9830";

// interface Notification {
//   id: string;
//   title: string;
//   content: string;
//   is_read: boolean;
//   created_at: string;
// }

// export default function NotificationsPage() {
//   const history = useHistory();
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [registrationId, setRegistrationId] = useState<string>("");

//   // Fetch profile to get registrationId for WebSocket
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         if (!token) {
//           history.push("/login");
//           return;
//         }

//         const res = await fetch(`${API_BASE}/profiles/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error("Failed to fetch profile");

//         setRegistrationId(data.registration_id);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchProfile();
//   }, [history]);

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("access_token");
//       if (!token) return;

//       const res = await fetch(`${API_BASE}/notifications/my-notifications`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       const notis = data?.data?.notifications || [];
//       setNotifications(notis);
//     } catch (err) {
//       console.error(err);
//       setNotifications([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   // WebSocket for live notifications
//   useEffect(() => {
//     if (!registrationId) return;

//     const ws = new WebSocket(
//       `ws://192.168.0.187:9830/notifications/ws/${registrationId}`
//     );

//     ws.onmessage = (event) => {
//       const notification = JSON.parse(event.data);
//       setNotifications((prev) => [notification, ...prev]);
//     };

//     ws.onclose = () => console.log("WebSocket closed");
//     return () => ws.close();
//   }, [registrationId]);

//   // Mark notification as read
//   const markAsRead = async (id: string) => {
//     try {
//       const token = localStorage.getItem("access_token");
//       if (!token) return;

//       await fetch(`${API_BASE}/notifications/${id}/read`, {
//         method: "PATCH",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Update locally
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar className="bg-indigo-600 text-white">
//           <IonButton slot="start" fill="clear" onClick={() => history.goBack()}>
//             <IonIcon icon={arrowBackOutline} />
//           </IonButton>
//           <IonTitle>Notifications</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="p-4 bg-gray-50 dark:bg-gray-900">
//         {loading ? (
//           <div className="flex justify-center mt-8">
//             <IonSpinner name="crescent" />
//           </div>
//         ) : notifications.length === 0 ? (
//           <p className="text-gray-500 text-center mt-8">No notifications</p>
//         ) : (
//           notifications.map((n) => (
//             <IonItem
//               key={n.id}
//               onClick={() => !n.is_read && markAsRead(n.id)}
//               className={`mb-3 rounded-xl shadow-md cursor-pointer transition
//                 ${n.is_read ? "bg-gray-100 dark:bg-gray-700" : "bg-blue-100 dark:bg-blue-900"}
//               `}
//             >
//               <IonLabel>
//                 <h3 className="font-semibold text-gray-800 dark:text-gray-200">
//                   {n.title}
//                 </h3>
//                 <p className="text-sm text-gray-700 dark:text-gray-300">{n.content}</p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                   {new Date(n.created_at).toLocaleString()}
//                 </p>
//               </IonLabel>
//               {!n.is_read && (
//                 <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
//                   New
//                 </span>
//               )}
//             </IonItem>
//           ))
//         )}
//       </IonContent>
//     </IonPage>
//   );
// }

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const API_BASE = "http://192.168.0.187:9830";

interface Notification {
  id: string;
  title: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const history = useHistory();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>("");

  // Fetch profile to get registrationId for WebSocket
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          history.push("/login");
          return;
        }

        const res = await fetch(`${API_BASE}/profiles/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch profile");

        setRegistrationId(data.registration_id);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [history]);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/notifications/my-notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const notis = data?.data?.notifications || [];
      setNotifications(notis);
    } catch (err) {
      console.error(err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // WebSocket for live notifications (keep same created_at format as API)
  useEffect(() => {
    if (!registrationId) return;

    const ws = new WebSocket(
      `ws://192.168.0.187:9830/notifications/ws/${registrationId}`
    );

    ws.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);

        // Ensure created_at format matches HTTP API
        if (!notification.created_at) {
          notification.created_at = new Date().toISOString();
        }

        setNotifications((prev) => [notification, ...prev]);
      } catch (err) {
        console.error("Invalid WebSocket notification:", err);
      }
    };

    ws.onclose = () => console.log("WebSocket closed");
    return () => ws.close();
  }, [registrationId]);

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      await fetch(`${API_BASE}/notifications/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update locally
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-indigo-600 text-white">
          <IonButton slot="start" fill="clear" onClick={() => history.goBack()}>
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 bg-gray-50 dark:bg-gray-900">
        {loading ? (
          <div className="flex justify-center mt-8">
            <IonSpinner name="crescent" />
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No notifications</p>
        ) : (
          notifications.map((n) => (
            <IonItem
              key={n.id}
              onClick={() => !n.is_read && markAsRead(n.id)}
              className={`mb-3 rounded-xl shadow-md cursor-pointer transition
                ${n.is_read ? "bg-gray-100 dark:bg-gray-700" : "bg-blue-100 dark:bg-blue-900"}
              `}
            >
              <IonLabel>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{n.content}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </IonLabel>
              {!n.is_read && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  New
                </span>
              )}
            </IonItem>
          ))
        )}
      </IonContent>
    </IonPage>
  );
}