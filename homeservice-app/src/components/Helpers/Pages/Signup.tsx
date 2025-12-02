// import React, { useState } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonIcon,
//   IonButton,
//   IonInput,
//   IonCheckbox,
// } from "@ionic/react";
// import { arrowBack } from "ionicons/icons";

// import Logo from "../../assets/logo.jpg";

// const HelperSignup: React.FC = () => {
//   const [preferences, setPreferences] = useState<string[]>([]);

//   const togglePreference = (item: string) => {
//     if (preferences.includes(item)) {
//       setPreferences(preferences.filter((x) => x !== item));
//     } else {
//       setPreferences([...preferences, item]);
//     }
//   };

//   const options = [
//     "Cooking (রান্না)",
//     "Cleaning (পরিষ্কার)",
//     "Babysitting (শিশু দেখাশোনা)",
//     "Elderly Care (বয়স্কদের যত্ন)",
//   ];

//   return (
//     <IonPage>
//       <IonContent className="bg-gray-100">

//         {/* NAVBAR */}
//         <div className="w-full bg-white shadow-md p-4 flex items-center space-x-3">
//           <IonIcon
//             icon={arrowBack}
//             className="text-2xl text-pink-600 cursor-pointer"
//             onClick={() => window.history.back()}
//           />

//           <div className="flex items-center space-x-3">
//             <img
//               src={Logo}
//               alt="logo"
//               className="w-10 h-10 rounded-full border-2 border-pink-400"
//             />
//             <h1 className="text-xl font-bold text-indigo-600">
//               Maidigo (মেইডিগো)
//             </h1>
//           </div>
//         </div>

//         {/* PAGE TITLE */}
//         <div className="text-center mt-6 px-4">
//           <h2 className="text-2xl font-bold text-pink-700">
//             Helper Signup (হেল্পার সাইনআপ)
//           </h2>
//           <p className="text-gray-600 mt-1">
//             Create your account to start working  
//             (কাজ শুরু করতে অ্যাকাউন্ট তৈরি করুন)
//           </p>
//         </div>

//         {/* SIGNUP FORM */}
//         <div className="p-5 mt-4 space-y-5">

//           {/* Name */}
//           <div>
//             <label className="font-semibold text-gray-700">
//               Full Name (পূর্ণ নাম)
//             </label>
//             <IonInput
//               placeholder="Enter your full name (আপনার নাম লিখুন)"
//               className="bg-white p-3 rounded-xl shadow mt-1"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="font-semibold text-gray-700">
//               Phone Number (ফোন নম্বর)
//             </label>
//             <IonInput
//               type="tel"
//               placeholder="Enter phone number (ফোন নম্বর দিন)"
//               className="bg-white p-3 rounded-xl shadow mt-1"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="font-semibold text-gray-700">
//               Password (পাসওয়ার্ড)
//             </label>
//             <IonInput
//               type="password"
//               placeholder="Enter password (পাসওয়ার্ড দিন)"
//               className="bg-white p-3 rounded-xl shadow mt-1"
//             />
//           </div>

//           {/* PREFERENCE SECTION */}
//           <div>
//             <label className="font-semibold text-gray-700">
//               Work Preference (কোন কোন কাজ করতে চান)
//             </label>

//             <div className="mt-3 space-y-3">
//               {options.map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center bg-white p-3 rounded-xl shadow border"
//                 >
//                   <IonCheckbox
//                     checked={preferences.includes(item)}
//                     onIonChange={() => togglePreference(item)}
//                     className="mr-3"
//                   />
//                   <span className="text-gray-700 font-medium">{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* SIGNUP BUTTON */}
//           <IonButton
//             expand="block"
//             color="danger"
//             shape="round"
//             className="mt-5 py-3 text-lg font-semibold"
//           >
//             Signup (সাইনআপ)
//           </IonButton>

//         </div>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default HelperSignup;

import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonInput,
  IonCheckbox,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo.jpg";

const HelperSignup: React.FC = () => {
  const history = useHistory();
  const [preferences, setPreferences] = useState<string[]>([]);

  const togglePreference = (item: string) => {
    if (preferences.includes(item)) {
      setPreferences(preferences.filter((x) => x !== item));
    } else {
      setPreferences([...preferences, item]);
    }
  };

  const options = [
    "Cooking (রান্না)",
    "Cleaning (পরিষ্কার)",
    "Babysitting (শিশু দেখাশোনা)",
    "Elderly Care (বয়স্কদের যত্ন)",
  ];

  const handleLoginRedirect = () => {
    history.push("/login");
  };

  return (
    <IonPage>
      <IonContent className="bg-gray-100 flex justify-center items-start min-h-screen py-10">

        {/* CARD */}
        <div className="bg-pink-50 rounded-3xl shadow-2xl w-full max-w-md">

          {/* NAVBAR (no sticky) */}
          <div className="w-full bg-white rounded-t-3xl shadow-md flex items-center space-x-3 p-4">
            <IonIcon
              icon={arrowBack}
              className="text-2xl text-pink-600 cursor-pointer"
              onClick={() => window.history.back()}
            />
            <img
              src={Logo}
              alt="logo"
              className="w-10 h-10 rounded-full border-2 border-pink-400"
            />
            <h1 className="text-xl font-bold text-indigo-600">
              Maidigo (মেইডিগো)
            </h1>
          </div>

          {/* PAGE TITLE */}
          <div className="text-center mt-6 px-6 mb-6">
            <h2 className="text-2xl font-bold text-pink-700">
              Helper Signup (হেল্পার সাইনআপ)
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Create your account to start working (কাজ শুরু করতে অ্যাকাউন্ট তৈরি করুন)
            </p>
          </div>

          {/* SIGNUP FORM */}
          <div className="px-6 pb-6 space-y-5">

            {/* Name */}
            <div>
              <label className="font-semibold text-gray-700">
                Full Name (পূর্ণ নাম) <span className="text-red-500">*</span>
              </label>
              <IonInput
                placeholder="Enter your full name (আপনার নাম লিখুন)"
                className="bg-white p-3 rounded-xl shadow-inner mt-1 w-full"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-semibold text-gray-700">
                Phone Number (ফোন নম্বর) <span className="text-red-500">*</span>
              </label>
              <IonInput
                type="tel"
                placeholder="Enter phone number (ফোন নম্বর দিন)"
                className="bg-white p-3 rounded-xl shadow-inner mt-1 w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold text-gray-700">
                Password (পাসওয়ার্ড) <span className="text-red-500">*</span>
              </label>
              <IonInput
                type="password"
                placeholder="Enter password (পাসওয়ার্ড দিন)"
                className="bg-white p-3 rounded-xl shadow-inner mt-1 w-full"
              />
            </div>

            {/* PREFERENCE SECTION */}
            <div>
              <label className="font-semibold text-gray-700">
                Work Preference (কোন কোন কাজ করতে চান) <span className="text-red-500">*</span>
              </label>
              <div className="mt-3 space-y-3">
                {options.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-white p-3 rounded-xl shadow-sm border cursor-pointer"
                    onClick={() => togglePreference(item)}
                  >
                    <IonCheckbox
                      checked={preferences.includes(item)}
                      onIonChange={() => togglePreference(item)}
                      className="mr-3"
                    />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SIGNUP BUTTON */}
            <IonButton
              expand="block"
              color="danger"
              shape="round"
              className="mt-5 py-3 text-lg font-semibold"
            >
              Signup (সাইনআপ)
            </IonButton>

            {/* LOGIN REDIRECT */}
            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <span
                onClick={handleLoginRedirect}
                className="text-pink-600 font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HelperSignup;
