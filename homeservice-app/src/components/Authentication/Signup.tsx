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
import logoImg from '../../assets/logo.jpg';

const Signup: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'seeker' | 'helper'>('seeker');
  const [capacity, setCapacity] = useState<'personal' | 'institutional'>(
    'personal'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

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
      {/* 🌟 POLISHED NAVBAR */}
      <div className="bg-white shadow-sm px-4 pt-6 pb-5">
        <div className="flex flex-col items-center">
          <img
            src={logoImg}
            alt="logo"
            className="w-14 h-14 rounded-full border mb-2"
          />

          <h1 className="text-3xl font-extrabold text-indigo-600 tracking-wide">
            Create Your Account
          </h1>

          <div className="h-1 w-20 bg-linear-to-r from-indigo-500 to-pink-500 rounded-full mt-2" />

          <p className="mt-3 text-[17px] font-medium text-gray-600 tracking-wide leading-relaxed">
  Join <span className="font-semibold text-indigo-600">HelperGo</span> in seconds
</p>

        </div>
      </div>

      <IonContent className="bg-gray-100">
        <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-md rounded-3xl shadow-xl p-6 bg-linear-to-br from-indigo-50 to-pink-50">

            {/* Role */}
            <IonSegment
              value={role}
              onIonChange={(e) => setRole(e.detail.value as any)}
              className="mb-5 bg-white rounded-xl"
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

            {/* 📱 PHONE WITH BEAUTIFUL +91 */}
            <div className="flex items-center bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
              <div className="px-4 py-3 bg-indigo-100 text-indigo-700 font-bold">
                +91
              </div>
              <IonInput
                className="px-3"
                type="tel"
                inputMode="numeric"
                placeholder="Phone number"
                value={phone}
                maxlength={10}
                onIonChange={(e) => setPhone(e.detail.value!)}
              />
              <IonIcon
                icon={callOutline}
                className="text-indigo-500 px-3"
              />
            </div>

            {/* 🔒 PASSWORD */}
            <IonItem lines="none" className="rounded-xl bg-white shadow-sm">
              <IonIcon icon={lockClosedOutline} slot="start" className="text-indigo-500" />
              <IonInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                slot="end"
                className="cursor-pointer text-indigo-500"
                onClick={() => setShowPassword(!showPassword)}
              />
            </IonItem>

            {/* Capacity */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Account Type
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setCapacity('personal')}
                  className={`p-4 rounded-xl border-2 text-center cursor-pointer transition
                  ${
                    capacity === 'personal'
                      ? 'border-indigo-500 bg-indigo-100'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <IonIcon icon={personOutline} className="text-3xl text-indigo-600 mb-1" />
                  <p className="font-semibold">Personal</p>
                </div>

                <div
                  onClick={() => setCapacity('institutional')}
                  className={`p-4 rounded-xl border-2 text-center cursor-pointer transition
                  ${
                    capacity === 'institutional'
                      ? 'border-indigo-500 bg-indigo-100'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <IonIcon icon={businessOutline} className="text-3xl text-indigo-600 mb-1" />
                  <p className="font-semibold">Institutional</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <IonButton
              expand="block"
              shape="round"
              size="large"
              color="primary"
              className="mt-6"
              onClick={handleSignup}
            >
              Create Account
            </IonButton>
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
