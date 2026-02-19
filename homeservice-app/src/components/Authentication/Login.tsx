
// import React, { useState } from 'react';
// import { IonPage, IonContent, IonButton, IonToast, IonIcon } from '@ionic/react';
// import { callOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
// import { useHistory } from 'react-router-dom';
// import logoImg from '../assets/logo.jpg';
// import bgImage from '../assets/bg.png'; // ✅ Add your background image

// const LoginPage: React.FC = () => {
//   const history = useHistory();
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [showToast, setShowToast] = useState(false);

//   const showToastMsg = (msg: string) => {
//     setToastMessage(msg);
//     setShowToast(true);
//   };

//   const handleLogin = async () => {
//     if (!phone || !password) {
//       showToastMsg('Please fill in all fields!');
//       return;
//     }

//     const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

//     try {
//       const response = await fetch('http://192.168.0.187:9830/auth/signin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           phone: formattedPhone,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('access_token', data.access_token || '');
//         localStorage.setItem('type', data.type || '');

//         showToastMsg('Login successful!');

//         setTimeout(() => {
//           if (data.type === 'helper') {
//             history.push('/helper-home');
//           } else if (data.type === 'seeker') {
//             history.push('/home');
//           } else if (data.type === 'admin') {
//             history.push('/admin-home');
//           } else {
//             history.push('/home');
//           }
//         }, 1000);
//       } else {
//         showToastMsg(data?.message || 'Login Failed!');
//       }
//     } catch (error) {
//       showToastMsg('Network Error!');
//     }
//   };

//   return (
//     <IonPage>
//       <IonContent fullscreen>
//         {/* Background Image */}
//         <div
//           className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
//           style={{ backgroundImage: `url(${bgImage})` }}
//         >
//           {/* Dark Overlay */}
//           <div className="absolute inset-0 bg-black/40"></div>

//           {/* Login Card */}
//           <div className="relative w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-8 mx-4">

//             {/* Logo */}
//             <div className="flex flex-col items-center mb-6">
//               <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center shadow-lg mb-3">
//                 <img
//                   src={logoImg}
//                   alt="Logo"
//                   className="w-14 h-14 rounded-full object-cover"
//                 />
//               </div>
//               <h1 className="text-3xl font-bold text-white">HelperGo</h1>
//               <p className="text-pink-100 text-sm mt-1">
//                 Login to your account
//               </p>
//             </div>

//             {/* Phone Input */}
//             <div className="flex items-center bg-white rounded-xl mb-4 overflow-hidden shadow-md">
//               <div className="px-4 py-3 bg-pink-500 text-white font-bold">
//                 +91
//               </div>
//               <input
//                 type="tel"
//                 placeholder="Phone number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 maxLength={10}
//                 className="flex-1 p-3 outline-none"
//               />
//               <IonIcon icon={callOutline} className="text-pink-500 px-3" />
//             </div>

//             {/* Password Input with Eye */}
//             <div className="flex items-center bg-white rounded-xl mb-6 overflow-hidden shadow-md">
//               <IonIcon icon={lockClosedOutline} className="text-pink-500 px-3" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="flex-1 p-3 outline-none"
//               />
//               <IonIcon
//                 icon={showPassword ? eyeOffOutline : eyeOutline}
//                 className="text-pink-500 px-3 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               />
//             </div>

//             {/* Login Button */}
//             <IonButton
//               expand="block"
//               className="h-12 text-lg font-semibold rounded-xl bg-pink-500 hover:bg-pink-600"
//               onClick={handleLogin}
//             >
//               Login
//             </IonButton>

//             {/* Signup */}
//             <p className="text-center text-sm text-white mt-6">
//               Don’t have an account?{' '}
//               <span
//                 className="text-pink-200 font-semibold cursor-pointer hover:underline"
//                 onClick={() => history.push('/signup')}
//               >
//                 Create Account
//               </span>
//             </p>
//           </div>
//         </div>

//         <IonToast
//           isOpen={showToast}
//           message={toastMessage}
//           duration={2000}
//           onDidDismiss={() => setShowToast(false)}
//         />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default LoginPage;

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
        showToastMsg(data?.message || 'Login Failed!');
      }
    } catch (error) {
      showToastMsg('Network Error!');
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

          {/* Login Card */}
          <div className="relative w-full max-w-md backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-8">

            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center shadow-lg mb-3">
                <img
                  src={logoImg}
                  alt="Logo"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold text-white">HelperGo</h1>
              <p className="text-pink-100 text-sm mt-1">
                Login to your account
              </p>
            </div>

            {/* Phone Input */}
            <div className="flex items-center bg-white rounded-xl mb-4 overflow-hidden shadow-md">
              <div className="px-4 py-3 bg-pink-500 text-white font-bold">
                +91
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                className="flex-1 p-3 outline-none text-sm sm:text-base"
              />
              <IonIcon icon={callOutline} className="text-pink-500 px-3 text-lg" />
            </div>

            {/* Password Input */}
            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-md">
              <IonIcon icon={lockClosedOutline} className="text-pink-500 px-3 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-3 outline-none text-sm sm:text-base"
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
                className="text-pink-200 text-sm cursor-pointer hover:underline"
                onClick={() => history.push('/forget-password')}
              >
                Forgot Password?
              </span>
            </div>

            {/* Login Button */}
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
            <p className="text-center text-sm text-white mt-6">
              Don’t have an account?{' '}
              <span
                className="text-pink-200 font-semibold cursor-pointer hover:underline"
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
