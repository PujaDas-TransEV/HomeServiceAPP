

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
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';
import bgImage from '../assets/bg.png';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showToastMsg = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const handleLogin = async () => {
    if (!phone || !password) {
      showToastMsg('Please fill in all fields!');
      return;
    }

    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    try {
      const response = await fetch('http://192.168.0.187:9830/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formattedPhone,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token || '');
        localStorage.setItem('type', data.type || '');

        showToastMsg('Login successful!');

        setTimeout(() => {
          if (data.type === 'helper') {
            history.push('/helper-home');
          } else if (data.type === 'seeker') {
            history.push('/home');
          } else if (data.type === 'admin') {
            history.push('/admin-home');
          } else {
            history.push('/home');
          }
        }, 1000);
      } else {
        showToastMsg(data?.detail || data?.message || 'Login Failed!');
      }
    } catch (error) {
      showToastMsg('Network Error!');
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

            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center shadow-lg mb-3">
                <img
                  src={logoImg}
                  alt="Logo"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>

              <h1 className="text-3xl font-bold text-white dark:text-pink-300">
                HelperGo
              </h1>

              <p className="text-pink-100 dark:text-gray-300 text-sm mt-1">
                Login to your account
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center rounded-xl mb-4 overflow-hidden shadow-md
                            bg-white/90 dark:bg-gray-800/80 transition">
              <div className="px-4 py-3 bg-pink-500 text-white font-bold">
                +91
              </div>

              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                className="flex-1 p-3 outline-none bg-transparent
                           text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />

              <IonIcon icon={callOutline} className="text-pink-500 px-3 text-lg" />
            </div>

            {/* Password */}
            <div className="flex items-center rounded-xl overflow-hidden shadow-md
                            bg-white/90 dark:bg-gray-800/80 transition">
              <IonIcon icon={lockClosedOutline} className="text-pink-500 px-3 text-lg" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-3 outline-none bg-transparent
                           text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />

              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                className="text-pink-500 px-3 text-xl cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right mt-2 mb-6">
              <span
                className="text-pink-200 dark:text-pink-300 text-sm cursor-pointer hover:underline"
                onClick={() => history.push('/forget-password')}
              >
                Forgot Password?
              </span>
            </div>

            {/* Button */}
            <IonButton
              expand="block"
              className="h-12 text-lg font-semibold rounded-xl"
              style={{
                '--background': '#ec4899',
                '--background-hover': '#db2777',
              } as any}
              onClick={handleLogin}
            >
              Login
            </IonButton>

            {/* Signup */}
            <p className="text-center text-sm mt-6 text-white dark:text-gray-300">
              Don’t have an account?{' '}
              <span
                className="text-pink-200 dark:text-pink-300 font-semibold cursor-pointer hover:underline"
                onClick={() => history.push('/signup')}
              >
                Create Account
              </span>
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

export default LoginPage;