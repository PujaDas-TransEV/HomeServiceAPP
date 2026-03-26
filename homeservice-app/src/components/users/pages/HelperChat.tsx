import { useParams, useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonButton,
  IonIcon,
  IonInput,
  IonMenu,
  IonItem,
  IonLabel
} from "@ionic/react";

import {
  attachOutline,
  sendOutline,
  closeOutline
} from "ionicons/icons";

import {
  FaHome,
  FaUser,
  FaComment,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaHeadset
} from "react-icons/fa";

import { useState, useEffect, useRef } from "react";

import Logo from "../../assets/logo.jpg";

interface Message {
  id: number;
  sender: "me" | "helper";
  text: string;
}

export default function HelperChat() {

  const { accountId } = useParams<{ accountId: string }>();
  const history = useHistory();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Dummy helper info
  const helper = {
    name: "Ayesha Begum",
    profile_picture: "https://i.pravatar.cc/150?img=22",
  };

  useEffect(() => {
    setMessages([
      { id: 1, sender: "helper", text: "Hello! How can I help you?" },
      { id: 2, sender: "me", text: "I need cleaning service today." },
      { id: 3, sender: "helper", text: "Sure, what time should I come?" },
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { id: Date.now(), sender: "me", text: input }
    ]);

    setInput("");
  };

  return (
    <IonPage className="bg-gray-100">

      {/* ================= SIDE MENU ================= */}

      <IonMenu side="end" contentId="main-content" type="overlay">

        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-red-500 to-pink-600 px-4">
            <div className="flex items-center justify-between w-full">

              <IonTitle className="text-indigo-500 font-bold text-lg">
                HelperGo
              </IonTitle>

              <IonButton
                fill="clear"
                onClick={() => document.querySelector("ion-menu")?.close()}
              >
                <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
              </IonButton>

            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-red-50">

          <div className="flex flex-col p-3 space-y-2">

            <IonItem button routerLink="/home" className="rounded-lg hover:bg-red-100">
              <FaHome className="text-red-600 w-5 h-5 mr-3" />
              <IonLabel>Home</IonLabel>
            </IonItem>

            <IonItem button routerLink="/profile" className="rounded-lg hover:bg-red-100">
              <FaUser className="text-orange-400 w-5 h-5 mr-3" />
              <IonLabel>Profile</IonLabel>
            </IonItem>

            <IonItem button routerLink="/chat" className="rounded-lg hover:bg-red-100">
              <FaComment className="text-pink-600 w-5 h-5 mr-3" />
              <IonLabel>Chat</IonLabel>
            </IonItem>

            <IonItem button routerLink="/helper-list" className="rounded-lg hover:bg-red-100">
              <FaUsers className="text-purple-600 w-5 h-5 mr-3" />
              <IonLabel>Helper List</IonLabel>
            </IonItem>

            <IonItem button routerLink="/my-bookings" className="rounded-lg hover:bg-red-100">
              <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
              <IonLabel>Bookings</IonLabel>
            </IonItem>

            <IonItem button routerLink="/preferences" className="rounded-lg hover:bg-red-100">
              <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Preferences</IonLabel>
            </IonItem>
  <IonItem button routerLink="/support" className="rounded-lg hover:bg-indigo-100">
  <FaHeadset className="text-green-600 w-5 h-5 mr-3" />
  <IonLabel>Helper Desk</IonLabel>
</IonItem>
            <IonItem
              button
              className="rounded-lg hover:bg-red-200"
              onClick={() => {
                localStorage.removeItem("access_token");
                history.push("/login");
              }}
            >
              <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
              <IonLabel>Logout</IonLabel>
            </IonItem>

          </div>

        </IonContent>

      </IonMenu>

      {/* ================= HEADER ================= */}

      <IonHeader>

        <IonToolbar className="bg-linear-to-r from-yellow-400 via-red-400 to-pink-500 px-4 py-3">

          <div className="flex items-center justify-between w-full">

            <div className="flex items-center gap-3">

              <img
                src={Logo}
                className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
              />

              <div>
                <p className="text-pink-500 text-s opacity-80">
                  Welcome 👋
                </p>
                <p className="font-bold text-lg text-red-600">
                  Helper
                </p>
              </div>

            </div>

            <IonButton
              fill="clear"
              onClick={() => document.querySelector("ion-menu")?.open()}
            >

              <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md">

                <svg
                  className="w-6 h-6 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
                  />
                </svg>

              </div>

            </IonButton>

          </div>

        </IonToolbar>

      </IonHeader>

      {/* ================= CHAT HEADER ================= */}

      <div className="flex items-center gap-3 bg-white px-4 py-3 border-b border-gray-200">

        <IonAvatar className="w-12 h-12">
          <img src={helper.profile_picture} alt={helper.name} />
        </IonAvatar>

        <IonTitle className="text-gray-800 font-semibold text-lg">
          {helper.name}
        </IonTitle>

      </div>

      {/* ================= CHAT CONTENT ================= */}

      <IonContent id="main-content" className="p-4 bg-gray-100">

        <div className="flex flex-col space-y-3">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={`flex items-end ${
                msg.sender === "me"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              {msg.sender === "helper" && (

                <IonAvatar className="w-8 h-8 mr-2">
                  <img src={helper.profile_picture} />
                </IonAvatar>

              )}

              <div
                className={`px-4 py-2 max-w-xs rounded-xl shadow
                ${
                  msg.sender === "me"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>

            </div>

          ))}

          <div ref={chatEndRef}></div>

        </div>

      </IonContent>

      {/* ================= INPUT BAR ================= */}

      <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-300">

        <IonButton
          fill="clear"
          className="p-2 rounded-full bg-gray-200"
        >
          <IonIcon icon={attachOutline} className="text-gray-700 text-xl" />
        </IonButton>

        <IonInput
          placeholder="Type a message..."
          value={input}
          onIonInput={(e: any) => setInput(e.target.value)}
          className="flex-1 rounded-full border border-gray-300 px-4 py-2"
        />

        <IonButton onClick={sendMessage}>

          <IonIcon icon={sendOutline} className="text-white text-xl" />

        </IonButton>

      </div>

    </IonPage>
  );
}