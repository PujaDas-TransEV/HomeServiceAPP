import React from 'react';
import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { personOutline, peopleOutline } from 'ionicons/icons';
import logoImg from '../../assets/logo.jpg';

const Signup: React.FC = () => {
  const history = useHistory();

  const handleHelperSignup = () => history.push('/helper-signup');
  const handleUserSignup = () => history.push('/signup-user');

  return (
    <IonPage className="bg-pink-50 min-h-screen">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-pink-500 p-1 shadow-md">
            <img src={logoImg} alt="Logo" className="w-14 h-14 object-cover rounded-full" />
          </div>
          <span className="text-2xl font-bold text-pink-600">Maidigo</span>
        </div>
      </div>

      <IonContent className="flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-pink-600 mb-10 text-center">
          Signup as
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Helper Card */}
          <div
            className="bg-linear-to-br from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl"
            onClick={handleHelperSignup}
          >
            <IonIcon icon={personOutline} className="text-white text-6xl mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Helper</h3>
            <p className="text-white/90 text-center text-sm md:text-base">
              Sign up to offer your services as a trusted maid.
            </p>
          </div>

          {/* User Card */}
          <div
            className="bg-linear-to-br from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl"
            onClick={handleUserSignup}
          >
            <IonIcon icon={peopleOutline} className="text-white text-6xl mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">User</h3>
            <p className="text-white/90 text-center text-sm md:text-base">
              Sign up to book verified maids instantly.
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
