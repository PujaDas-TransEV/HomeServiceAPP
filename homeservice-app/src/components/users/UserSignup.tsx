// import React, { useState } from 'react';
// import { IonPage, IonContent, IonButton } from '@ionic/react';
// import { useHistory } from 'react-router-dom';
// import logoImg from '../assets/logo.jpg';
// import bgImg from '../assets/signup.png'; // Your background image

// const UserSignup: React.FC = () => {
//   const history = useHistory();
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = () => {
//     // TODO: Add signup API call
//     console.log({ name, phone, password });
//     history.push('/login'); // Redirect after signup
//   };

//   const handleLoginRedirect = () => history.push('/login');

//   return (
//     <IonPage className="relative min-h-screen">
//       {/* Background Image */}
//       <img
//         src={bgImg}
//         alt="Signup Background"
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       <IonContent className="relative flex flex-col items-center justify-center p-6 min-h-screen">
//         {/* Navbar */}
//         <div className="flex items-center justify-start w-full max-w-md px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl mb-6 shadow-md relative z-10">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-full flex items-center justify-center bg-pink-500 p-1 shadow-md">
//               <img src={logoImg} alt="Logo" className="w-14 h-14 object-cover rounded-full" />
//             </div>
//             <span className="text-2xl font-bold text-pink-600">Maidigo</span>
//           </div>
//         </div>

//         {/* Signup Card */}
//         <div className="bg-pink-50 rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10">
//           <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
//         Create Your Account
//           </h2>

//           {/* Full Name */}
//           <div className="flex flex-col mb-4">
//             <label className="text-gray-700 mb-1 font-medium">Full Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your full name"
//               className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition shadow-sm"
//             />
//           </div>

//           {/* Phone Number */}
//           <div className="flex flex-col mb-4">
//             <label className="text-gray-700 mb-1 font-medium">Phone Number</label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Enter your phone number"
//               className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition shadow-sm"
//             />
//           </div>

//           {/* Password */}
//           <div className="flex flex-col mb-6">
//             <label className="text-gray-700 mb-1 font-medium">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition shadow-sm"
//             />
//           </div>

//           {/* Signup Button */}
       
//  <div className="flex w-full mt-4 justify-center">
//   <IonButton
//     size="small"
//     color="secondary"
//     onClick={handleSignup}
//   >
//     Signup
//   </IonButton>
// </div>


//           {/* Login Redirect */}
//           <p className="text-sm text-gray-600 text-center">
//             Already have an account?{' '}
//             <span
//               onClick={handleLoginRedirect}
//               className="text-pink-600 font-semibold cursor-pointer hover:underline"
//             >
//               Login
//             </span>
//           </p>
//         </div>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default UserSignup;
import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonCheckbox } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';
import bgImg from '../assets/signup.png'; // Background image

const UserSignup: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);

  const handleSignup = () => {
    // TODO: Add signup API call
    console.log({ name, phone, password, preferences });
    history.push('/login'); // Redirect after signup
  };

  const handleLoginRedirect = () => history.push('/login');

  const options = ['Cooking', 'Cleaning', 'Babysitting', 'Elderly Care'];

  const togglePreference = (item: string) => {
    if (preferences.includes(item)) {
      setPreferences(preferences.filter((x) => x !== item));
    } else {
      setPreferences([...preferences, item]);
    }
  };

  return (
    <IonPage className="relative min-h-screen">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Signup Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <IonContent className="relative flex flex-col items-center justify-center p-6 min-h-screen">
        {/* Navbar */}
        <div className="flex items-center justify-start w-full max-w-md px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl mb-6 shadow-md relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-pink-500 p-1 shadow-md">
              <img src={logoImg} alt="Logo" className="w-14 h-14 object-cover rounded-full" />
            </div>
            <span className="text-2xl font-bold text-pink-600">Maidigo</span>
          </div>
        </div>

        {/* Signup Card */}
        <div className="bg-pink-50 rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10">
          <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
            Create Your Account
          </h2>

          {/* Full Name */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 mb-1 font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition shadow-sm"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 mb-1 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 mb-1 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition shadow-sm"
            />
          </div>

          {/* Work Preference */}
          <div className="flex flex-col mb-6">
            <label className="text-gray-700 mb-1 font-medium">
              Work Preference (Which type of maid are you looking for?) <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col space-y-2 mt-2">
              {options.map((item, i) => (
                <label
                  key={i}
                  className="flex items-center bg-white p-3 rounded-xl shadow-sm border cursor-pointer"
                >
                  <IonCheckbox
                    checked={preferences.includes(item)}
                    onIonChange={() => togglePreference(item)}
                    className="mr-3"
                  />
                  <span className="text-gray-700 font-medium">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Signup Button */}
          <div className="flex w-full mt-4 justify-center">
            <IonButton size="small" color="secondary" onClick={handleSignup}>
              Signup
            </IonButton>
          </div>

          {/* Login Redirect */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{' '}
            <span
              onClick={handleLoginRedirect}
              className="text-pink-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserSignup;
