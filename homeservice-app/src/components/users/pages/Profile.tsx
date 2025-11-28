import React from 'react';
import { IonPage, IonContent, IonAvatar, IonItem, IonLabel, IonButton } from '@ionic/react';

const ProfilePage: React.FC = () => {
  return (
    <IonPage className="bg-white">
      <IonContent className="ion-padding flex flex-col items-center">
        <IonAvatar className="w-24 h-24 mb-4">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </IonAvatar>
        <IonItem>
          <IonLabel>
            <h2 className="text-pink-500 font-bold">User Name</h2>
            <p>Email: user@example.com</p>
          </IonLabel>
        </IonItem>
        <IonButton expand="block" className="mt-4" color="pink">
          Edit Profile
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
