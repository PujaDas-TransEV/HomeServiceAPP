
import { useState, useEffect } from "react";
import { IonPage, IonContent, IonButton, IonToast, IonIcon } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { arrowBack } from "ionicons/icons";

import Logo from "../../assets/logo.jpg";

const HelperSignup: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [userType, setUserType] = useState("helper"); // default helper
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleLoginRedirect = () => history.push('/login');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "helper") setUserType(type);
  }, [location.search]);

  const showToastMessageNow = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const handleSignup = async () => {
    if (!name || !phone || !password) {
      showToastMessageNow("সব ফিল্ড পূরণ করতে হবে! (All fields are required!)");
      return;
    }

    const payload = {
      name,
      phone_number: phone,
      password,
      user_type: userType,
    };

    try {
      const response = await fetch("https://api.bsbe.transev.site/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        showToastMessageNow("সাইনআপ সফল হয়েছে! 🎉 (Signup Successful 🎉)");
        setTimeout(() => {
          history.push("/helper-workpreferences");
        }, 1500);
      } else {
        showToastMessageNow(data?.message || data?.detail || "Signup Failed!");
      }
    } catch (error) {
      showToastMessageNow("Network Error!");
    }
  };

  return (
    <IonPage className="relative min-h-screen">

      {/* FULL WIDTH NAVBAR */}
      <div className="w-full bg-white shadow-md z-30 flex items-center px-4 py-3 fixed top-0 left-0">
        <IonIcon
          icon={arrowBack}
          className="text-2xl text-pink-600 cursor-pointer"
          onClick={() => window.history.back()}
        />
        <img
          src={Logo}
          alt="logo"
          className="w-10 h-10 rounded-full border-2 border-pink-400 mx-4"
        />
        <h1 className="text-xl font-bold text-indigo-600">Maidigo (মেইডিগো)</h1>
      </div>

      {/* CONTENT */}
      <IonContent className="bg-gray-100 pt-24 pb-10 overflow-y-auto">

        {/* CARD */}
        <div className="bg-pink-50 rounded-3xl shadow-2xl w-full max-w-md mx-auto flex flex-col p-8">

          {/* PAGE TITLE */}
          <div className="text-center mt-12 mb-6">
            <h2 className="text-2xl font-bold text-pink-700">
              Helper Signup (হেল্পার সাইনআপ)
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Create your account to start working (কাজ শুরু করতে অ্যাকাউন্ট তৈরি করুন)
            </p>
          </div>

          {/* INPUTS */}
          <div className="flex flex-col space-y-4 mb-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1 font-medium">
                Full Name (পূর্ণ নাম) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1 font-medium">
                Phone Number (ফোন নম্বর) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1 font-medium">
                Password (পাসওয়ার্ড) <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm"
              />
            </div>
          </div>

          {/* Signup Button */}
          <div className="flex justify-center mb-4">
            <IonButton
              size="large"
              expand="block"
              className="py-4 text-lg font-semibold"
              color="secondary"
              onClick={handleSignup}
            >
              Signup (সাইনআপ)
            </IonButton>
          </div>

          {/* Login Redirect */}
          <p className="text-sm text-gray-600 text-center mt-2">
            Already have an account? (আপনার কি আগে থেকে অ্যাকাউন্ট আছে?) {' '}
            <span
              onClick={handleLoginRedirect}
              className="text-pink-600 font-semibold cursor-pointer hover:underline"
            >
              Login (লগইন)
            </span>
          </p>

        </div>

        {/* Toast */}
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          color={toastMessage.includes("সাইনআপ সফল") ? "success" : "danger"}
          onDidDismiss={() => setShowToast(false)}
        />

      </IonContent>
    </IonPage>
  );
};

export default HelperSignup;
