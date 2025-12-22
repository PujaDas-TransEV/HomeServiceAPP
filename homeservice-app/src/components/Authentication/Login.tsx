
import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonToast, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { logoIonic } from 'ionicons/icons';
import logoImg from '../components/assets/logo.jpg';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showToastMsg = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const handleLogin = async () => {
    if (!phone || !password) {
      showToastMsg('সব ফিল্ড পূরণ করতে হবে! (All fields are required!)');
      return;
    }

    try {
      const response = await fetch('https://api.bsbe.transev.site/auth/signin/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userType = data.user.user_type;

        showToastMsg('লগইন সফল! (Login Successful)');

        setTimeout(() => {
          if (userType === 'helper') {
            history.push('/helper-home');
          } else {
            history.push('/home');
          }
        }, 1000);
      } else {
        showToastMsg(data?.message || data?.detail || 'Login Failed!');
      }
    } catch (error) {
      showToastMsg('Network Error!');
    }
  };

  const handleSignupRedirect = () => history.push('/signup');
  const handleForgotPassword = () => showToastMsg('ফরগট পাসওয়ার্ড ক্লিক হয়েছে!');

  return (
    <IonPage className="bg-pink-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-start px-6 py-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-pink-500 p-1 shadow-md">
            <img src={logoImg} alt="Logo" className="w-10 h-10 object-cover rounded-full" />
          </div>
          <span className="text-2xl font-bold text-pink-600">Maidigo</span>
        </div>
      </div>

      <IonContent className="pt-10 px-4">
        <div className="max-w-md w-full mx-auto bg-pink-50 rounded-3xl shadow-2xl p-8 mt-10">
          <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
            Login (লগইন)
          </h2>

          {/* Phone Number */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 mb-1 font-medium">Phone Number (ফোন নম্বর)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 mb-1 font-medium">Password (পাসওয়ার্ড)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <span
              className="text-pink-600 text-sm cursor-pointer hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot Password? (পাসওয়ার্ড ভুলে গেছেন?)
            </span>
          </div>

          {/* Login Button */}
          <div className="flex justify-center mb-4">
            <IonButton
              size="large"
              expand="block"
              color="secondary"
              className="py-4 text-lg font-semibold rounded-xl"
              onClick={handleLogin}
            >
              Login (লগইন)
            </IonButton>
          </div>

          {/* Signup Redirect */}
          <p className="text-sm text-gray-600 text-center">
            Don't have an account? (আপনার কি অ্যাকাউন্ট নেই?){' '}
            <span
              className="text-pink-600 font-semibold cursor-pointer hover:underline"
              onClick={handleSignupRedirect}
            >
              Signup (সাইনআপ)
            </span>
          </p>
        </div>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          color={toastMessage.includes('সফল') ? 'success' : 'danger'}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
