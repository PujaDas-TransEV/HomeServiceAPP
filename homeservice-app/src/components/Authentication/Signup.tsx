
import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonLoading,
  IonToast,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import {
  callOutline,
  eyeOutline,
  eyeOffOutline,
  personOutline,
  businessOutline,
  lockClosedOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import logoImg from '../../components/assets/logo.jpg';

const Signup: React.FC = () => {
  const history = useHistory();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'seeker' | 'helper'>('seeker');
  const [capacity, setCapacity] = useState<'personal' | 'institutional'>(
    'personal'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // const handleSignup = async () => {
  //   if (phone.length !== 10) {
  //     setToastMsg('Enter valid 10-digit phone number');
  //     return;
  //   }
  //   if (password.length < 6) {
  //     setToastMsg('Password must be at least 6 characters');
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       'https://api.gshbe.transev.site/auth/signup',
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           phone: `+91${phone}`,
  //           password,
  //           role,
  //           capacity,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data?.message || 'Signup failed');

  //     setToastMsg('Signup successful 🎉');

  //     setTimeout(() => history.push('/upsertprofile'), 1200);

  //     setPhone('');
  //     setPassword('');
  //   } catch (error: any) {
  //     setToastMsg(error.message || 'Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSignup = async () => {
  if (phone.length !== 10) {
    setToastMsg('Enter valid 10-digit phone number');
    return;
  }
  if (password.length < 6) {
    setToastMsg('Password must be at least 6 characters');
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(
      'https://api.gshbe.transev.site/auth/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: `+91${phone}`,
          password,
          role,
          capacity,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || 'Signup failed');

    setToastMsg('Signup successful 🎉');

    // Save access token in localStorage (optional, for future API calls)
    localStorage.setItem('access_token', data.access_token);

    // Redirect to profile page with token and kind
    setTimeout(() => {
      history.push('/upsertprofile', {
        token: data.access_token,
        kind: data.kind, // e.g. "seeker_personal" or "helper_institutional"
      });
    }, 1200);

    setPhone('');
    setPassword('');
  } catch (error: any) {
    setToastMsg(error.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Background */}
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-200 via-pink-200 to-pink-200 px-4">
          
          {/* Card */}
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
            
            {/* Logo & Title */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center shadow-lg mb-3">
                <img
                  src={logoImg}
                  alt="Logo"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold text-pink-600">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Join HelperGo in seconds
              </p>
            </div>

            {/* Role */}
            <IonSegment
              value={role}
              onIonChange={(e) => setRole(e.detail.value as any)}
              className="mb-5 rounded-xl"
            >
              <IonSegmentButton value="seeker">
                <IonIcon icon={personOutline} />
                Seeker
              </IonSegmentButton>
              <IonSegmentButton value="helper">
                <IonIcon icon={personOutline} />
                Helper
              </IonSegmentButton>
            </IonSegment>

            {/* Phone */}
            <div className="flex items-center border border-gray-300 rounded-xl mb-4 overflow-hidden">
              <div className="px-4 py-3 bg-pink-100 text-pink-600 font-bold">
                +91
              </div>
              <IonInput
                className="px-3"
                type="tel"
                inputMode="numeric"
                placeholder="10 digit phone number"
                value={phone}
                maxlength={10}
                onIonChange={(e) => setPhone(e.detail.value!)}
              />
              <IonIcon
                icon={callOutline}
                className="text-pink-500 px-3"
              />
            </div>

            {/* Password */}
            <IonItem lines="none" className="rounded-xl border border-gray-300 mb-4">
              <IonIcon
                icon={lockClosedOutline}
                slot="start"
                className="text-pink-500"
              />
              <IonInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                slot="end"
                className="cursor-pointer text-pink-500"
                onClick={() => setShowPassword(!showPassword)}
              />
            </IonItem>

            {/* Capacity */}
          {/* Capacity */}
<div className="mb-6">
  <p className="text-sm font-semibold text-gray-600 mb-2">
    Account Type
  </p>

  <div className="grid grid-cols-2 gap-4">
    {/* Personal */}
    <div
      onClick={() => setCapacity('personal')}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition
      ${
        capacity === 'personal'
          ? 'border-pink-500 bg-pink-100'
          : 'border-gray-200 bg-white'
      }`}
    >
      <IonIcon
        icon={personOutline}
        className="text-3xl text-pink-600 mb-1"
      />
      <p className="font-semibold text-center m-0">Personal</p>
    </div>

    {/* Institutional */}
    <div
      onClick={() => setCapacity('institutional')}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition
      ${
        capacity === 'institutional'
          ? 'border-pink-500 bg-pink-100'
          : 'border-gray-200 bg-white'
      }`}
    >
      <IonIcon
        icon={businessOutline}
        className="text-3xl text-pink-600 mb-1"
      />
      <p className="font-semibold text-center m-0">Institutional</p>
    </div>
  </div>
</div>


            {/* Button */}
            <IonButton
              expand="block"
              color="secondary"
              className="h-12 text-lg font-semibold rounded-xl"
              onClick={handleSignup}
            >
              Create Account
            </IonButton>

            {/* Login Redirect */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <span
                className="text-pink-600 font-semibold cursor-pointer hover:underline"
                onClick={() => history.push('/login')}
              >
                Login
              </span>
            </p>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Creating account..." />
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

export default Signup;
