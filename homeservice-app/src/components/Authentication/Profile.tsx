import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonIcon,
  IonLoading,
  IonToast,
} from '@ionic/react';
import {
  personOutline,
  businessOutline,
  callOutline,
} from 'ionicons/icons';

interface Props {
  role: 'seeker' | 'helper';
  capacity: 'personal' | 'institutional';
  phone?: string;
}

const CompleteProfile: React.FC<Props> = ({ role, capacity, phone }) => {
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Common fields
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [institutionType, setInstitutionType] = useState('');

  // Optional helper fields
  const [age, setAge] = useState('');
  const [faith, setFaith] = useState('');
  const [languages, setLanguages] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    let payload: any = {};
    const kind = `${role}_${capacity}`;

    try {
      switch (kind) {
        case 'seeker_personal':
          payload = { kind, name, city, area };
          break;
        case 'seeker_institutional':
          payload = { kind, name, city, area, institution_type: institutionType || undefined, phone };
          break;
        case 'helper_personal':
          payload = { kind, name, city, area, age: age || undefined, faith: faith || undefined, languages: languages || undefined, phone, years_of_experience: yearsOfExperience || undefined };
          break;
        case 'helper_institutional':
          payload = { kind, name, city, address, phone };
          break;
        default:
          throw new Error('Invalid role/capacity');
      }

      const response = await fetch('https://api.gshbe.transev.site/profiles/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || 'Profile update failed');

      setToastMsg('Profile updated successfully! 🎉');
      // Optionally navigate to dashboard/home here
    } catch (error: any) {
      setToastMsg(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="bg-gray-100">
        <div className="min-h-screen flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-md rounded-3xl shadow-xl p-6 bg-linear-to-br from-indigo-50 to-pink-50">

            <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Complete Your Profile</h1>

            {/* Name */}
            <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
              <IonIcon icon={personOutline} slot="start" className="text-indigo-500" />
              <IonInput placeholder="Full Name" value={name} onIonChange={e => setName(e.detail.value!)} />
            </IonItem>

            {/* City */}
            <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
              <IonInput placeholder="City" value={city} onIonChange={e => setCity(e.detail.value!)} />
            </IonItem>

            {/* Area / Address */}
            {(capacity === 'personal' || role === 'seeker') ? (
              <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
                <IonInput placeholder="Area" value={area} onIonChange={e => setArea(e.detail.value!)} />
              </IonItem>
            ) : (
              <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
                <IonInput placeholder="Address" value={address} onIonChange={e => setAddress(e.detail.value!)} />
              </IonItem>
            )}

            {/* Institution Type for seeker_institutional */}
            {role === 'seeker' && capacity === 'institutional' && (
              <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
                <IonInput placeholder="Institution Type" value={institutionType} onIonChange={e => setInstitutionType(e.detail.value!)} />
              </IonItem>
            )}

            {/* Optional helper personal fields */}
            {role === 'helper' && capacity === 'personal' && (
              <>
                <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
                  <IonInput placeholder="Age" type="number" value={age} onIonChange={e => setAge(e.detail.value!)} />
                </IonItem>
                <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
                  <IonInput placeholder="Faith" value={faith} onIonChange={e => setFaith(e.detail.value!)} />
                </IonItem>
                <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
                  <IonInput placeholder="Languages" value={languages} onIonChange={e => setLanguages(e.detail.value!)} />
                </IonItem>
                <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
                  <IonInput placeholder="Years of Experience" type="number" value={yearsOfExperience} onIonChange={e => setYearsOfExperience(e.detail.value!)} />
                </IonItem>
              </>
            )}

            {/* Phone (optional) */}
            {phone && (
              <IonItem lines="none" className="rounded-xl bg-white shadow-sm mb-4">
                <IonIcon icon={callOutline} slot="start" className="text-indigo-500" />
                <IonInput placeholder="Phone" value={phone} disabled />
              </IonItem>
            )}

            {/* Submit Button */}
            <IonButton expand="block" shape="round" size="large" color="primary" className="mt-4" onClick={handleSubmit}>
              Save Profile
            </IonButton>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Saving profile..." />
        <IonToast isOpen={!!toastMsg} message={toastMsg} duration={2500} onDidDismiss={() => setToastMsg('')} />
      </IonContent>
    </IonPage>
  );
};

export default CompleteProfile;
