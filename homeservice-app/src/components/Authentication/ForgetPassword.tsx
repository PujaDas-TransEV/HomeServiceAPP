import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonToast,
  IonIcon
} from '@ionic/react';
import {
  callOutline,
  checkmarkCircle,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import bgImage from '../assets/reset.jpg';

const ForgotPassword: React.FC = () => {
  const history = useHistory();

  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showToastMsg = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const isPhoneValid = phone.length === 10;

  const handleResetPassword = async () => {
    if (!phone || !newPassword || !confirmPassword) {
      showToastMsg('Please fill all fields!');
      return;
    }

    if (!isPhoneValid) {
      showToastMsg('Enter valid 10 digit phone number!');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToastMsg('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.187:9830/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: `+91${phone}`,
          new_password: newPassword,
          confirm_password: confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToastMsg('Password reset successful!');
        setTimeout(() => {
          history.push('/login');
        }, 1500);
      } else {
        showToastMsg(data?.message || 'Reset failed!');
      }
    } catch (error) {
      showToastMsg('Network error!');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Card */}
          <div className="relative w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-8">

            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Reset Password
            </h2>

            {/* Phone Input */}
            <div className="flex items-center bg-white rounded-xl mb-4 overflow-hidden shadow-md">
              <div className="px-4 py-3 bg-pink-500 text-white font-bold">
                +91
              </div>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 p-3 outline-none"
              />
              {isPhoneValid ? (
                <IonIcon
                  icon={checkmarkCircle}
                  className="text-green-500 text-xl px-3"
                />
              ) : (
                <IonIcon
                  icon={callOutline}
                  className="text-pink-500 text-lg px-3"
                />
              )}
            </div>

            {/* New Password */}
            <div className="flex items-center bg-white rounded-xl mb-4 overflow-hidden shadow-md">
              <IonIcon icon={lockClosedOutline} className="text-pink-500 px-3 text-lg" />
              <input
                type={showNewPass ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-1 p-3 outline-none"
              />
              <IonIcon
                icon={showNewPass ? eyeOffOutline : eyeOutline}
                className="text-pink-500 px-3 text-xl cursor-pointer"
                onClick={() => setShowNewPass(!showNewPass)}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center bg-white rounded-xl mb-6 overflow-hidden shadow-md">
              <IonIcon icon={lockClosedOutline} className="text-pink-500 px-3 text-lg" />
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 p-3 outline-none"
              />
              <IonIcon
                icon={showConfirmPass ? eyeOffOutline : eyeOutline}
                className="text-pink-500 px-3 text-xl cursor-pointer"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              />
            </div>

            {/* Reset Button */}
            <IonButton
              expand="block"
              className="h-12 text-lg font-semibold rounded-xl bg-pink-500"
              onClick={handleResetPassword}
            >
              Reset Password
            </IonButton>

            {/* Back to Login */}
            <p
              className="text-center text-sm text-white mt-6 cursor-pointer hover:underline"
              onClick={() => history.push('/login')}
            >
              Back to Login
            </p>

          </div>
        </div>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
