import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonLabel,
  IonToast
} from "@ionic/react";

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSignup = () => {
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setToastMessage("Please fill all fields!");
      setShowToast(true);
      return;
    }
    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match!");
      setShowToast(true);
      return;
    }

    // Call your backend signup API here
    console.log({ fullName, email, phone, password });
    setToastMessage("Signup successful!");
    setShowToast(true);

    // Reset form
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <IonPage className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen flex items-center justify-center">
      <IonContent fullscreen className="flex justify-center items-center p-4">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border border-orange-200">
          <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">Sign Up</h1>

          {/* Full Name */}
          <div className="mb-5">
            <IonLabel className="block text-sm font-semibold text-gray-700 mb-2">Full Name</IonLabel>
            <IonInput
              value={fullName}
              placeholder="John Doe"
              onIonChange={(e) => setFullName(e.detail.value!)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <IonLabel className="block text-sm font-semibold text-gray-700 mb-2">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              placeholder="example@mail.com"
              onIonChange={(e) => setEmail(e.detail.value!)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>

          {/* Phone */}
          <div className="mb-5">
            <IonLabel className="block text-sm font-semibold text-gray-700 mb-2">Phone</IonLabel>
            <IonInput
              type="tel"
              value={phone}
              placeholder="+1234567890"
              onIonChange={(e) => setPhone(e.detail.value!)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <IonLabel className="block text-sm font-semibold text-gray-700 mb-2">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              placeholder="********"
              onIonChange={(e) => setPassword(e.detail.value!)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <IonLabel className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</IonLabel>
            <IonInput
              type="password"
              value={confirmPassword}
              placeholder="********"
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>

          {/* Signup Button */}
          <IonButton
            expand="block"
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 font-semibold shadow-lg transition-all duration-200"
            onClick={handleSignup}
          >
            Sign Up
          </IonButton>

          <p className="mt-5 text-center text-gray-500 text-sm">
            Already have an account? <a href="/login" className="text-orange-600 font-semibold hover:underline">Login</a>
          </p>
        </div>

        {/* Toast for messages */}
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
          color="warning"
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
