// import {
//   IonPage,
//   IonContent,
//   IonHeader,
//   IonToolbar,
//   IonButtons,
//   IonBackButton,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonButton,
//   IonIcon,
//   IonSpinner
// } from "@ionic/react";

// import { chatbubbleOutline, calendarOutline, locationOutline } from "ionicons/icons";
// import { useEffect, useState } from "react";
// import { useParams, useHistory } from "react-router";
// import { FaStar } from "react-icons/fa";
// const API_BASE = "http://192.168.0.187:9830";

// export default function HelperDetails() {
//   const { helperId } = useParams<{ helperId: string }>();
//   const history = useHistory();

//   const [helper, setHelper] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchHelperDetails();
//   }, [helperId]);

//   const fetchHelperDetails = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("access_token");

//       const res = await fetch(`${API_BASE}/helper/helper-details/${helperId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();
//       setHelper(data);
//     } catch (err) {
//       console.log("Error fetching helper details:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return (
//       <IonPage>
//         <IonContent className="flex justify-center items-center h-full bg-linear-to-b from-indigo-50 to-white">
//           <IonSpinner name="crescent" color="primary" />
//         </IonContent>
//       </IonPage>
//     );

//   if (!helper)
//     return (
//       <IonPage>
//         <IonContent className="flex justify-center items-center h-full bg-linear-to-b from-indigo-50 to-white">
//           <p className="text-gray-500 text-lg">Helper not found.</p>
//         </IonContent>
//       </IonPage>
//     );

//   const profile = helper.profile;
//   const account = helper.account_info;
//   const location = helper.location;
//   const work = helper.work_details;
//   const requirements = helper.requirements;
//   const services = helper.services;
//   const notes = helper.additional_details;

//   // Profile picture from API (Base64)
//   const profilePic = account?.profile_picture || "https://i.pravatar.cc/150";

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar className="bg-white">
//           <IonButtons slot="start">
//             <IonBackButton defaultHref="/helper-home" className="text-black" />
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="bg-linear-to-b from-indigo-50 to-white p-4">

//         {/* Profile Card */}
//         <IonCard className="rounded-3xl shadow-xl mb-5">
//           <div className="flex flex-col items-center p-6 bg-white rounded-3xl">
//             <img
//               src={profilePic}
//               alt={profile?.name}
//               className="w-28 h-28 rounded-full border-4 border-indigo-400 shadow-lg mb-4 object-cover"
//             />

//             <h2 className="text-2xl font-bold text-gray-800">
//               {profile?.name}
//             </h2>

//             <p className="text-gray-500 text-sm">
//               {location?.city}, {location?.area}
//             </p>

//             <p className="text-yellow-500 text-sm mt-1">
//                {profile?.experience || 0} yrs experience
//             </p>

//             <p className="text-green-600 text-sm mt-1">
//               Capacity: {account?.capacity || "N/A"}
//             </p>
//             <div className="flex items-center gap-1">
//   {[1,2,3,4,5].map((star)=>(
//     <FaStar
//       key={star}
//       className={account?.rating >= star ? "text-yellow-400" : "text-yellow-300"}
//     />
//   ))}
// </div>
//           </div>
//         </IonCard>

//         {/* Services Offered */}
//         <IonCard className="rounded-2xl shadow-lg mb-4">
//           <IonCardHeader>
//             <IonCardTitle className="text-lg text-indigo-700">
//               Services Offered
//             </IonCardTitle>
//           </IonCardHeader>

//           <IonCardContent className="flex flex-wrap gap-2">
//             {services?.map((service: any) => (
//               <span
//                 key={service.id}
//                 className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold"
//               >
//                 {service.name}
//               </span>
//             ))}
//           </IonCardContent>
//         </IonCard>

//         {/* Work Details */}
//         <IonCard className="rounded-2xl shadow-lg mb-4">
//           <IonCardHeader>
//             <IonCardTitle className="text-lg text-indigo-700">
//               Work Details
//             </IonCardTitle>
//           </IonCardHeader>

//           <IonCardContent className="text-sm text-gray-700 space-y-2">
//             <p><b>Job Type:</b> {work?.job_type}</p>
//             <p><b>Work Mode:</b> {work?.work_mode}</p>
//             <p><b>Working Days:</b> {work?.working_days}</p>
//             <p><b>Active:</b> {account?.is_active ? "Yes" : "No"}</p>
//           </IonCardContent>
//         </IonCard>

//         {/* Requirements */}
//         <IonCard className="rounded-2xl shadow-lg mb-4">
//           <IonCardHeader>
//             <IonCardTitle className="text-lg text-indigo-700">
//               Requirements
//             </IonCardTitle>
//           </IonCardHeader>

//           <IonCardContent className="text-sm text-gray-700 space-y-2">
//             <p>
//               <b>Salary:</b> ₹{requirements?.min_salary?.toLocaleString()} - ₹{requirements?.max_salary?.toLocaleString()}
//             </p>

//             <p>
//               <b>Gender:</b> {requirements?.gender_pref || "Any"}
//             </p>
//           </IonCardContent>
//         </IonCard>

//         {/* Additional Details */}
//         <IonCard className="rounded-2xl shadow-lg mb-4">
//           <IonCardHeader>
//             <IonCardTitle className="text-lg text-indigo-700">
//               Skills & Notes
//             </IonCardTitle>
//           </IonCardHeader>

//           <IonCardContent className="text-sm text-gray-700 space-y-2">
//             <p><b>Skills:</b> {notes?.skills || "N/A"}</p>
//             <p><b>Special Preferences:</b> {notes?.special_preferences || "None"}</p>
//             <p><b>Phone:</b> {account?.phone || "N/A"}</p>
//           </IonCardContent>
//         </IonCard>

//         {/* Buttons */}
//         <div className="flex flex-col gap-3 mb-10 mt-6">

//           <IonButton
//             expand="block"
//             color="success"
//             onClick={() => history.push(`/booking/${helper.helper_id}`)}
//           >
//             <IonIcon icon={calendarOutline} slot="start" />
//             Book Now
//           </IonButton>

//           <IonButton
//             expand="block"
//             fill="outline"
//             color="primary"
//             onClick={() => history.push(`/chat/${helper.helper_id}`)}
//           >
//             <IonIcon icon={chatbubbleOutline} slot="start" />
//             Chat Now
//           </IonButton>

//           <IonButton expand="block" fill="clear" color="medium">
//             <IonIcon icon={locationOutline} slot="start" />
//             {location?.city}, {location?.area}
//           </IonButton>

//         </div>

//       </IonContent>
//     </IonPage>
//   );
// }

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
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
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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

  // Inside your HelperDetails component, after fetching helper



// Function to render stars with half/full logic
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className="text-yellow-400 w-5 h-5" />);
    } else if (i - rating < 1) {
      // half star
      stars.push(<FaStar key={i} className="text-yellow-400 w-5 h-5" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    } else {
      stars.push(<FaStar key={i} className="text-yellow-300 w-5 h-5" />);
    }
  }
  return stars;
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
const ratingStats = account?.rating_stats;

  // Profile picture from API (Base64)
  const profilePic = account?.profile_picture || "https://i.pravatar.cc/150";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" className="text-black" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-linear-to-b from-indigo-50 to-white p-4">

        {/* Profile Card */}
        <IonCard className="rounded-3xl shadow-xl mb-5">
          <div className="flex flex-col items-center p-6 bg-white rounded-3xl">
            <img
              src={profilePic}
              alt={profile?.name}
              className="w-28 h-28 rounded-full border-4 border-indigo-400 shadow-lg mb-4 object-cover"
            />

            <h2 className="text-2xl font-bold text-gray-800">{profile?.name}</h2>
            <p className="text-gray-500 text-sm">{location?.city}, {location?.area}</p>
            <p className="text-yellow-500 text-sm mt-1">{profile?.experience || 0} yrs experience</p>
            <p className="text-green-600 text-sm mt-1">Capacity: {account?.capacity || "N/A"}</p>

           {/* Overall Rating Section */}
{ratingStats?.total_reviews > 0 && (
 <div className="flex items-center gap-1">
  {Array.from({ length: Math.ceil(ratingStats.overall_rating) }, (_, i) => {
    const starNumber = i + 1;
    if (starNumber <= Math.floor(ratingStats.overall_rating)) {
      return <FaStar key={i} className="text-yellow-400 w-5 h-5" />;
    } else {
      // Half star
      return <FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />;
    }
  })}
</div>
)}
          </div>
        </IonCard>

        {/* Services Offered */}
       
<IonCard className="rounded-2xl shadow-lg mb-4">
  <IonCardHeader>
    <IonCardTitle className="text-lg text-indigo-700">
      Services Offered
    </IonCardTitle>
  </IonCardHeader>

  <IonCardContent className="flex flex-wrap">
    {services?.map((service: any) => (
      <span
        key={service.id}
        className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-semibold m-1"
      >
        {service.name}
      </span>
    ))}
  </IonCardContent>
</IonCard>
        {/* Work Details */}
        <IonCard className="rounded-2xl shadow-lg mb-4">
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-700">Work Details</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="text-sm text-gray-700 space-y-2">
            <p><b>Job Type:</b> {work?.job_type}</p>
            <p><b>Work Mode:</b> {work?.work_mode}</p>
            <p><b>Working Days:</b> {work?.working_days}</p>
            <p><b>Active:</b> {account?.is_active ? "Yes" : "No"}</p>
          </IonCardContent>
        </IonCard>

        {/* Requirements */}
        <IonCard className="rounded-2xl shadow-lg mb-4">
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-700">Requirements</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="text-sm text-gray-700 space-y-2">
            <p><b>Salary:</b> ₹{requirements?.min_salary?.toLocaleString()} - ₹{requirements?.max_salary?.toLocaleString()}</p>
            <p><b>Gender:</b> {requirements?.gender_pref || "Any"}</p>
          </IonCardContent>
        </IonCard>

        {/* Additional Details */}
        <IonCard className="rounded-2xl shadow-lg mb-4">
          <IonCardHeader>
            <IonCardTitle className="text-lg text-indigo-700">Skills & Notes</IonCardTitle>
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
            color="success"
            onClick={() => history.push(`/booking/${helper.helper_id}`)}
          >
            <IonIcon icon={calendarOutline} slot="start" />
            Book Now
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            color="primary"
            onClick={() => history.push(`/chat/${helper.helper_id}`)}
          >
            <IonIcon icon={chatbubbleOutline} slot="start" />
            Chat Now
          </IonButton>

          <IonButton expand="block" fill="clear" color="medium">
            <IonIcon icon={locationOutline} slot="start" />
            {location?.city}, {location?.area}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}