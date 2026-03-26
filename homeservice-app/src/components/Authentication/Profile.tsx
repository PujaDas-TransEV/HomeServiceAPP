

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
import Image from '../assets/Book-maid.png';

interface ProfileData {
  name?: string;
  city?: string;
  area?: string;
  institution_type?: string;
  phone?: string;
  age?: string;
  faith?: string;
  languages?: string;
  years_of_experience?: number | '';
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

  const optionalFieldsByKind: { [key: string]: string[] } = {
    seeker_personal: [],
    seeker_institutional: ['institution_type', 'phone'],
    helper_personal: ['age', 'faith', 'languages', 'phone'],
    helper_institutional: ['phone'], // address mandatory
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token') || '';
    const storedKind = localStorage.getItem('kind') || '';
    if (!token && storedToken) setToken(storedToken);
    if (!kind && storedKind) setKind(storedKind);

    const currentKind = kind || storedKind;

    if (!profile || Object.keys(profile).length === 0) {
      const initialProfile: ProfileData = {};
      (fieldsByKind[currentKind] || ['name', 'city', 'area']).forEach((field) => {
        initialProfile[field as keyof ProfileData] =
          field === 'years_of_experience' ? '' : '';
      });
      setProfile(initialProfile);
    }
  }, [token, kind]);

  const fields = kind ? fieldsByKind[kind] : ['name', 'city', 'area'];
  const optionalFields = kind ? optionalFieldsByKind[kind] : [];

  const showToast = (msg: string) => setToastMsg(msg);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'years_of_experience') {
      setProfile((prev) => ({
        ...prev,
        [field]: value === '' ? '' : Number(value),
      }));
    } else {
      setProfile((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!token) return showToast('Authorization token missing. Please login.');

    // Validate mandatory fields only for empty values
    for (let f of fields) {
      const val = profile[f as keyof ProfileData];
      if (!optionalFields.includes(f) && (val === '' || val === undefined)) {
        showToast(`Please enter ${f.replace('_', ' ')}`);
        return;
      }
    }

    setLoading(true);

    try {
      const payload: any = { kind };
      Object.entries(profile).forEach(([key, value]) => {
        if (value !== '' && value !== undefined) {
          payload[key] = key === 'years_of_experience' ? Number(value) : value;
        }
      });

      const res = await fetch('http://192.168.0.187:9830/profiles/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to update profile');

      showToast('Profile updated successfully 🎉');
      localStorage.setItem('access_token', token);
      localStorage.setItem('kind', kind);

      setTimeout(() => history.push('/login'), 1200);
    } catch (err: any) {
      showToast(err.message || 'Something went wrong');
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
        <div
          className="min-h-screen flex items-center justify-center px-4 py-8 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${Image})` }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Profile form card */}
          <div className="relative w-full max-w-md space-y-4 p-6 rounded-3xl shadow-2xl backdrop-blur-md
                          bg-white/90 text-gray-800 dark:bg-gray-800/90 dark:text-white transition-colors duration-500">
            <h1 className="text-3xl font-bold text-pink-600 text-center dark:text-pink-400">
              Complete Your Profile
            </h1>

            {fields.map((f) => (
              <div
                key={f}
                className="flex items-center space-x-3 p-4 rounded-2xl shadow
                           bg-white dark:bg-gray-700 transition-colors duration-500"
              >
                <IonIcon icon={iconByField[f]} className="text-pink-500 text-xl" />
                <IonInput
                  id={`input-${f}`}
                  type={f === 'years_of_experience' ? 'number' : 'text'}
                  placeholder={
                    optionalFields.includes(f)
                      ? `${f.replace('_', ' ')} (optional)`
                      : f.replace('_', ' ')
                  }
                  value={
                    profile[f as keyof ProfileData] === undefined ||
                    profile[f as keyof ProfileData] === null
                      ? ''
                      : profile[f as keyof ProfileData]?.toString()
                  }
                  // onIonChange={(e) => handleInputChange(f, e.detail.value || '')}
                  onIonInput={(e) => handleInputChange(f, e.detail.value ?? '')}
                />
              </div>
            ))}

            <IonButton
              expand="block"
              className="h-12 text-lg font-semibold rounded-xl mt-4
                         bg-linear-to-r from-pink-500 to-purple-500
                         dark:from-pink-600 dark:to-purple-700"
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

