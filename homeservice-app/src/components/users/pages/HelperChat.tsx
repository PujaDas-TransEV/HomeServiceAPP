// pages/HelperChatPage.tsx
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { sendOutline } from 'ionicons/icons';
import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'helper';
}

const HelperChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // helper.account_id
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: newMessage, sender: 'user' }
    ]);

    // Simulate helper reply (optional)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: 'Thank you! I will get back to you soon.', sender: 'helper' }
      ]);
    }, 1000);

    setNewMessage('');
  };

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Chat with Helper</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* CONTENT */}
      <IonContent className="ion-padding" scrollEvents={true}>
        <IonList>
          {messages.map((msg) => (
            <IonItem
              key={msg.id}
              className={`rounded-xl my-2 px-3 py-2 ${
                msg.sender === 'user' ? 'bg-blue-100 self-end text-right' : 'bg-gray-200 self-start text-left'
              }`}
            >
              <IonLabel>{msg.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* INPUT AREA */}
        <div className="flex items-center gap-2 p-2 border-t border-gray-200">
          <IonInput
            placeholder="Type a message..."
            value={newMessage}
            onIonInput={(e: any) => setNewMessage(e.target.value)}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2"
          />
          <IonButton onClick={handleSend} className="rounded-full p-2" color="primary">
            <IonIcon icon={sendOutline} />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HelperChatPage;