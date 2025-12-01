import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonInput, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg'; // your logo image

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log({ phone, password });
  };

  const handleSignupRedirect = () => history.push('/signup');
  const handleForgotPassword = () => alert('Forgot Password clicked');

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

      <IonContent className="relative flex items-center justify-center p-6 min-h-screen">
        {/* Login Card */}
        <div className="bg-pink-50 rounded-3xl shadow-2xl p-8 w-full max-w-md fixed">
          <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
            Login
          </h2>

          {/* Phone Number */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-6">
            <label className="text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition shadow-sm"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <span
              className="text-pink-600 text-sm cursor-pointer hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
      <div className="flex justify-center mt-4">
  <IonButton
    size="default"
    color="secondary"
    className="w-18 h-2 text-lg rounded-full"
    onClick={handleLogin}
  >
    Login
  </IonButton>
</div>


          {/* Signup Redirect */}
          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{' '}
            <span
              className="text-pink-600 font-semibold cursor-pointer hover:underline"
              onClick={handleSignupRedirect}
            >
              Signup
            </span>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
