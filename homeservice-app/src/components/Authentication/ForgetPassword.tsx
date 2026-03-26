

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
        showToastMsg('Password reset successful! 🎉');
        setTimeout(() => history.push('/login'), 1200);
      } else {
        showToastMsg(data?.detail || data?.message || 'Reset failed!');
      }
    } catch (error) {
      showToastMsg('Network error!');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>

          {/* Card */}
          <div
            className="
            relative w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl
            backdrop-blur-2xl border
            bg-white/20 border-white/30
            dark:bg-gray-900/30 dark:border-gray-700
            transition-all duration-500
          "
          >
            <h2 className="text-2xl font-bold text-center mb-6
                           text-white dark:text-pink-300">
              Reset Password
            </h2>

            {/* Phone */}
            <div className="flex items-center rounded-xl mb-4 overflow-hidden shadow-md
                            bg-white/90 dark:bg-gray-800/80 transition">
              <div className="px-4 py-3 bg-pink-500 text-white font-bold">
                +91
              </div>

              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 p-3 outline-none bg-transparent
                           text-gray-800 dark:text-white
                           placeholder-gray-500 dark:placeholder-gray-400"
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
            <div className="flex items-center rounded-xl mb-4 overflow-hidden shadow-md
                            bg-white/90 dark:bg-gray-800/80 transition">
              <IonIcon icon={lockClosedOutline} className="text-pink-500 px-3 text-lg" />

              <input
                type={showNewPass ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-1 p-3 outline-none bg-transparent
                           text-gray-800 dark:text-white
                           placeholder-gray-500 dark:placeholder-gray-400"
              />

              <IonIcon
                icon={showNewPass ? eyeOffOutline : eyeOutline}
                className="text-pink-500 px-3 text-xl cursor-pointer"
                onClick={() => setShowNewPass(!showNewPass)}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center rounded-xl mb-6 overflow-hidden shadow-md
                            bg-white/90 dark:bg-gray-800/80 transition">
              <IonIcon icon={lockClosedOutline} className="text-pink-500 px-3 text-lg" />

              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 p-3 outline-none bg-transparent
                           text-gray-800 dark:text-white
                           placeholder-gray-500 dark:placeholder-gray-400"
              />

              <IonIcon
                icon={showConfirmPass ? eyeOffOutline : eyeOutline}
                className="text-pink-500 px-3 text-xl cursor-pointer"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              />
            </div>

            {/* Button */}
            <IonButton
              expand="block"
              className="h-12 text-lg font-semibold rounded-xl"
              style={{
                '--background': 'linear-gradient(135deg, #ec4899, #a855f7)',
                '--background-hover': '#db2777',
              } as any}
              onClick={handleResetPassword}
            >
              Reset Password
            </IonButton>

            {/* Back */}
            <p
              className="text-center text-sm mt-6 cursor-pointer hover:underline
                         text-white dark:text-gray-300"
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