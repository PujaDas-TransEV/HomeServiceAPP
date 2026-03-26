
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
import bgImage from '../assets/signupm.webp';

const Signup: React.FC = () => {
  const history = useHistory();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'seeker' | 'helper'>('seeker');
  const [capacity, setCapacity] = useState<'personal' | 'institutional'>('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleSignup = async () => {
    // Frontend validation
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
      const response = await fetch('http://192.168.0.187:9830/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: `+91${phone}`,
          password,
          role,
          capacity,
        }),
      });

      const data = await response.json();

      // Handle non-200 responses with backend detail
      if (!response.ok) {
        // If backend returns a `detail` field, show that
        const errorMsg = data?.detail || data?.message || 'Signup failed';
        throw new Error(errorMsg);
      }

      // Success
      setToastMsg('Signup successful 🎉');
      localStorage.setItem('access_token', data.access_token);

      setTimeout(() => {
        history.push('/upsertprofile', {
          token: data.access_token,
          kind: data.kind,
        });
      }, 1200);

      setPhone('');
      setPassword('');
    } catch (error: any) {
      // Show backend error detail in toast
      setToastMsg(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          className="min-h-screen flex items-center justify-center lg:justify-end relative px-4 lg:px-16 bg-cover bg-center transition-colors duration-500"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-black/20"></div>

          {/* Signup Card */}
          <div
            className="relative w-full max-w-md p-8 lg:mr-10 rounded-3xl shadow-2xl border backdrop-blur-2xl
              bg-white/90 border-white/40 text-gray-800
              dark:bg-gray-800/90 dark:border-gray-700 dark:text-white transition-colors duration-500"
          >
            {/* Logo & Title */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center shadow-lg mb-3 dark:bg-pink-700 transition-colors duration-500">
                <img
                  src={logoImg}
                  alt="Logo"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>

              <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400 transition-colors duration-500">
                Create Account
              </h1>

              <p className="text-gray-600 text-sm mt-1 dark:text-gray-300 transition-colors duration-500">
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
            <div className="flex items-center border border-gray-300 rounded-xl mb-4 overflow-hidden bg-white dark:bg-gray-700 dark:border-gray-600 transition-colors duration-500">
              <div className="px-4 py-3 bg-pink-100 text-pink-600 font-bold dark:bg-pink-700 dark:text-pink-100">
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
              <IonIcon icon={callOutline} className="text-pink-500 px-3" />
            </div>

            {/* Password */}
            <IonItem
              lines="none"
              className="rounded-xl mb-4 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-500"
            >
              <IonIcon icon={lockClosedOutline} slot="start" className="text-pink-500" />
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

            {/* Account Type */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-600 mb-2 dark:text-gray-300 transition-colors duration-500">
                Account Type
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setCapacity('personal')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    capacity === 'personal'
                      ? 'border-pink-500 bg-pink-100 dark:bg-pink-700 dark:text-white'
                      : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  <IonIcon icon={personOutline} className="text-3xl text-pink-600 mb-1" />
                  <p className="font-semibold m-0">Personal</p>
                </div>

                <div
                  onClick={() => setCapacity('institutional')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    capacity === 'institutional'
                      ? 'border-pink-500 bg-pink-100 dark:bg-pink-700 dark:text-white'
                      : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  <IonIcon icon={businessOutline} className="text-3xl text-pink-600 mb-1" />
                  <p className="font-semibold m-0">Institutional</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <IonButton
              expand="block"
              className="h-12 text-lg font-semibold rounded-xl"
              style={{
                '--background': '#ec4899',
                '--background-hover': '#db2777',
              } as any}
              onClick={handleSignup}
            >
              Create Account
            </IonButton>

            {/* Login Redirect */}
            <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300 transition-colors duration-500">
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
          duration={3000}
          onDidDismiss={() => setToastMsg('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;