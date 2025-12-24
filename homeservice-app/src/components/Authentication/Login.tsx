
import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonToast, IonIcon } from '@ionic/react';
import { callOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';

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
      showToastMsg('Please fill in all fields!');
      return;
    }

    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    try {
      const response = await fetch('https://api.gshbe.transev.site/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formattedPhone,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save access token in localStorage
        localStorage.setItem('access_token', data.access_token || '');
        localStorage.setItem('type', data.type || '');

        showToastMsg('Login successful!');

        // Redirect based on user type
        setTimeout(() => {
          if (data.type === 'helper') {
            history.push('/helper-home');
          } else if (data.type === 'seeker') {
            history.push('/home');
          } else {
            history.push('/home'); // fallback
          }
        }, 1000);
      } else {
        showToastMsg(data?.message || 'Login Failed!');
      }
    } catch (error) {
      showToastMsg('Network Error!');
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
              <h1 className="text-3xl font-bold text-pink-600">Maidigo</h1>
              <p className="text-gray-500 text-sm mt-1">Login to your account</p>
            </div>

            {/* Phone Input with +91 */}
            <div className="flex items-center border border-gray-300 rounded-xl mb-4 overflow-hidden">
              <div className="px-4 py-3 bg-pink-100 text-pink-600 font-bold flex items-center justify-center">
                +91
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                className="flex-1 p-3 outline-none"
              />
              <IonIcon icon={callOutline} className="text-pink-500 px-3" />
            </div>

            {/* Password Input */}
            <div className="flex items-center border border-gray-300 rounded-xl mb-6 overflow-hidden">
              <IonIcon icon={lockClosedOutline} className="text-pink-500 px-3" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-3 outline-none"
              />
            </div>

            {/* Login Button */}
            <IonButton
              expand="block"
              color="secondary"
              className="h-12 text-lg font-semibold rounded-xl"
              onClick={handleLogin}
            >
              Login
            </IonButton>

            {/* Signup Redirect */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{' '}
              <span
                className="text-pink-600 font-semibold cursor-pointer hover:underline"
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
