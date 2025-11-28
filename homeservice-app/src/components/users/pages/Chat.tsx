import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel } from '@ionic/react';

const ChatPage: React.FC = () => {
  return (
    <IonPage className="bg-white">
      <IonHeader>
        <IonToolbar color="pink">
          <IonTitle className="text-white">Chats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem button>
          <IonLabel>
            <h2>Anita</h2>
            <p>Hey, I am available tomorrow</p>
          </IonLabel>
        </IonItem>
        <IonItem button>
          <IonLabel>
            <h2>Maya</h2>
            <p>Can you help with cleaning?</p>
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ChatPage;
