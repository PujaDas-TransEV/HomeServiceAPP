// import React, { useState, useEffect } from 'react';
// import {
//   IonPage,
//   IonContent,
//   IonInput,
//   IonButton,
//   IonIcon,
//   IonToast,
//   IonLoading,
// } from '@ionic/react';
// import {
//   personOutline,
//   callOutline,
//   locationOutline,
//   businessOutline,
//   calendarOutline,
//   bookOutline,
//   globeOutline,
// } from 'ionicons/icons';
// import { useHistory, useLocation } from 'react-router-dom';

// interface ProfileData {
//   name?: string;
//   city?: string;
//   area?: string;
//   institution_type?: string;
//   phone?: string;
//   age?: string;
//   faith?: string;
//   languages?: string;
//   years_of_experience?: string;
//   address?: string;
// }

// const ProfilePage: React.FC = () => {
//   const history = useHistory();
//   const location = useLocation<any>();

//   let { token, kind } = location.state || {};

//   // Fallback to localStorage if page reloads
//   useEffect(() => {
//     if (!token) {
//       token = localStorage.getItem('access_token') || '';
//       kind = localStorage.getItem('kind') || kind;
//     }
//   }, []);

//   // Fields by user kind
//   const fieldsByKind: { [key: string]: string[] } = {
//     seeker_personal: ['name', 'city', 'area'],
//     seeker_institutional: ['name', 'city', 'area', 'institution_type', 'phone'],
//     helper_personal: [
//       'name',
//       'city',
//       'area',
//       'age',
//       'faith',
//       'languages',
//       'phone',
//       'years_of_experience',
//     ],
//     helper_institutional: ['name', 'city', 'address', 'phone'],
//   };

//   const fields = kind ? fieldsByKind[kind] : ['name', 'city', 'area'];

//   const [profile, setProfile] = useState<ProfileData>(
//     fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {} as ProfileData)
//   );
//   const [loading, setLoading] = useState(false);
//   const [toastMsg, setToastMsg] = useState('');

//   const showToast = (msg: string) => setToastMsg(msg);

//   const handleInputChange = (field: string, value: string) => {
//     setProfile((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!token) {
//       showToast('Authorization token missing. Please login again.');
//       return;
//     }

//     // Validate all fields in the current kind
//     for (let f of fields) {
//       if (!profile[f as keyof ProfileData]) {
//         showToast(`Please enter ${f.replace('_', ' ')}`);
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       const response = await fetch('http://192.168.0.200:8000/profiles/me', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ...profile, kind }), // Include kind in payload
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data?.message || 'Failed to update profile');

//       showToast('Profile updated successfully 🎉');

//       // Save token and kind in localStorage
//       localStorage.setItem('access_token', token);
//       localStorage.setItem('kind', kind);

//       // Redirect to login or dashboard
//       setTimeout(() => history.push('/login'), 1200);
//     } catch (error: any) {
//       showToast(error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const iconByField: { [key: string]: string } = {
//     name: personOutline,
//     city: locationOutline,
//     area: locationOutline,
//     institution_type: businessOutline,
//     phone: callOutline,
//     age: calendarOutline,
//     faith: globeOutline,
//     languages: bookOutline,
//     years_of_experience: calendarOutline,
//     address: locationOutline,
//   };

//   return (
//     <IonPage>
//       <IonContent fullscreen>
//         <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-200 via-pink-100 to-pink-200 px-4 py-8">
//           <div className="w-full max-w-md space-y-4">
//             <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">
//               Complete Your Profile
//             </h1>
//             <p className="text-gray-500 text-sm mb-6 text-center">
//               Please fill in all required fields
//             </p>

//             {fields.map((f) => (
//               <div
//                 key={f}
//                 className="bg-white p-4 rounded-2xl shadow-md flex items-center space-x-3"
//               >
//                 <IonIcon icon={iconByField[f]} className="text-pink-500 text-xl" />
//                 <IonInput
//                   placeholder={f.replace('_', ' ')}
//                   value={profile[f as keyof ProfileData] || ''}
//                   onIonChange={(e) => handleInputChange(f, e.detail.value!)}
//                 />
//               </div>
//             ))}

//             <IonButton
//               expand="block"
//               color="secondary"
//               className="h-12 text-lg font-semibold rounded-xl mt-4"
//               onClick={handleSubmit}
//             >
//               Save Profile
//             </IonButton>
//           </div>
//         </div>

//         <IonLoading isOpen={loading} message="Saving profile..." />
//         <IonToast
//           isOpen={!!toastMsg}
//           message={toastMsg}
//           duration={2000}
//           onDidDismiss={() => setToastMsg('')}
//         />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonToast,
  IonLoading,
} from '@ionic/react';
import {
  personOutline,
  callOutline,
  locationOutline,
  businessOutline,
  calendarOutline,
  bookOutline,
  globeOutline,
} from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';

interface ProfileData {
  name?: string;
  city?: string;
  area?: string;
  institution_type?: string;
  phone?: string;
  age?: string;
  faith?: string;
  languages?: string;
  years_of_experience?: string;
  address?: string;
}

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<any>();

  const [token, setToken] = useState(location.state?.token || '');
  const [kind, setKind] = useState(location.state?.kind || '');
  const [profile, setProfile] = useState<ProfileData>({});
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Fields by user kind
  const fieldsByKind: { [key: string]: string[] } = {
    seeker_personal: ['name', 'city', 'area'],
    seeker_institutional: ['name', 'city', 'area', 'institution_type', 'phone'],
    helper_personal: [
      'name',
      'city',
      'area',
      'age',
      'faith',
      'languages',
      'phone',
      'years_of_experience',
    ],
    helper_institutional: ['name', 'city', 'address', 'phone'],
  };

  // Optional fields
  const optionalFields = [
    'age',
    'faith',
    'languages',
    'phone',
    'institution_type',
    'address',
    'years_of_experience',
  ];

  // Initialize token/kind and profile state on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token') || '';
    const storedKind = localStorage.getItem('kind') || '';
    if (!token && storedToken) setToken(storedToken);
    if (!kind && storedKind) setKind(storedKind);

    if (!profile || Object.keys(profile).length === 0) {
      const currentFields = (kind || storedKind) ? fieldsByKind[kind || storedKind] : ['name', 'city', 'area'];
      const initialProfile = currentFields.reduce(
        (acc, field) => ({ ...acc, [field]: '' }),
        {} as ProfileData
      );
      setProfile(initialProfile);
    }
  }, []);

  const fields = kind ? fieldsByKind[kind] : ['name', 'city', 'area'];

  const showToast = (msg: string) => setToastMsg(msg);

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!token) {
      showToast('Authorization token missing. Please login again.');
      return;
    }

    // Validate only required fields
    for (let f of fields) {
      if (!optionalFields.includes(f) && !profile[f as keyof ProfileData]) {
        showToast(`Please enter ${f.replace('_', ' ')}`);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.200:8000/profiles/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...profile, kind }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Failed to update profile');

      showToast('Profile updated successfully 🎉');

      localStorage.setItem('access_token', token);
      localStorage.setItem('kind', kind);

      // Redirect to dashboard
      setTimeout(() => history.push('/login'), 1200);
    } catch (error: any) {
      showToast(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const iconByField: { [key: string]: string } = {
    name: personOutline,
    city: locationOutline,
    area: locationOutline,
    institution_type: businessOutline,
    phone: callOutline,
    age: calendarOutline,
    faith: globeOutline,
    languages: bookOutline,
    years_of_experience: calendarOutline,
    address: locationOutline,
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-200 via-pink-100 to-pink-200 px-4 py-8">
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">
              Complete Your Profile
            </h1>
            <p className="text-gray-500 text-sm mb-6 text-center">
              Please fill in all required fields
            </p>

            {fields.map((f) => (
              <div
                key={f}
                className="bg-white p-4 rounded-2xl shadow-md flex items-center space-x-3"
              >
                <IonIcon icon={iconByField[f]} className="text-pink-500 text-xl" />
                <IonInput
                  placeholder={optionalFields.includes(f) ? `${f.replace('_', ' ')} (optional)` : f.replace('_', ' ')}
                  value={profile[f as keyof ProfileData] || ''}
                  onIonChange={(e) => handleInputChange(f, e.detail.value!)}
                />
              </div>
            ))}

            <IonButton
              expand="block"
              color="secondary"
              className="h-12 text-lg font-semibold rounded-xl mt-4"
              onClick={handleSubmit}
            >
              Save Profile
            </IonButton>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Saving profile..." />
        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={2000}
          onDidDismiss={() => setToastMsg('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
