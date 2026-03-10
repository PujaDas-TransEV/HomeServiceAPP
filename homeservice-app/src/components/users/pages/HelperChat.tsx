import { useParams } from "react-router-dom";
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

import { attachOutline, closeOutline, sendOutline } from "ionicons/icons";
import { useState, useEffect, useRef } from "react";

import Logo from "../../assets/logo.jpg";
import { FaCog, FaComment, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { useHistory } from "react-router-dom";
interface Message {
  id: number;
  sender: "user" | "helper";
  text: string;
}

const HelperChatPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
const history = useHistory();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const name = "User";

  // dummy helper info
  const helper = {
    name: "Rahul Helper",
    profile_picture: "https://i.pravatar.cc/150?img=45"
  };

  const userAvatar = "https://i.pravatar.cc/150?img=32";

  useEffect(() => {

    setMessages([
      { id: 1, sender: "helper", text: "Hello! How can I help you?" },
      { id: 2, sender: "user", text: "Hi, I need babysitting today." }
    ]);

  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {

    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: input }
    ]);

    setInput("");

    // fake helper reply
    setTimeout(() => {

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "helper",
          text: "Sure, I am available."
        }
      ]);

    }, 1000);
  };

  return (

    <IonPage>

    
      <IonMenu side="end" contentId="main-content" type="overlay">
      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
          <div className="flex items-center justify-between w-full">
            <IonTitle className="text-purple-600 font-bold text-lg">
              HelperGo
            </IonTitle>
            <IonButton
              fill="clear"
              onClick={() => document.querySelector("ion-menu")?.close()}
            >
              <IonIcon icon={closeOutline} className="text-pink-600 text-xl" />
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-indigo-50">
        <div className="flex flex-col p-3 space-y-2">
          <IonItem button routerLink="/home" className="rounded-lg hover:bg-indigo-100">
            <FaHome className="text-purple-600 w-5 h-5 mr-3" />
            <IonLabel>Home</IonLabel>
          </IonItem>

          <IonItem button routerLink="/profile" className="rounded-lg hover:bg-indigo-100">
            <FaUser className="text-indigo-600 w-5 h-5 mr-3" />
            <IonLabel>Profile</IonLabel>
          </IonItem>

          <IonItem button routerLink="/chat" className="rounded-lg hover:bg-indigo-100">
            <FaComment className="text-pink-600 w-5 h-5 mr-3" />
            <IonLabel>Chat</IonLabel>
          </IonItem>

          <IonItem button routerLink="/maid-list" className="rounded-lg hover:bg-indigo-100">
            <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
            <IonLabel>Helper List</IonLabel>
          </IonItem>

          <IonItem button routerLink="/preferences" className="rounded-lg hover:bg-indigo-100">
            <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
            <IonLabel>Preferences</IonLabel>
          </IonItem>

          <IonItem
            button
            className="rounded-lg hover:bg-red-100"
            onClick={() => {
              localStorage.removeItem("access_token");
              history.push("/login");
            }}
          >
            <FaSignOutAlt className="text-red-500 w-5 h-5 mr-3" />
            <IonLabel className="text-red-500">Logout</IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonMenu>

    {/* ================= HEADER ================= */}
    <IonHeader>
      <IonToolbar className="bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 px-4 py-3">
        <div className="flex justify-between items-center w-full">

          {/* LEFT → User Welcome */}
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
              alt="logo"
            />
            <div>
              <p className="text-yellow-800 text-s opacity-80">Welcome back 👋</p>
              <p className="text-indigo-500 font-bold text-lg">{name || "User"}</p>
            </div>
          </div>

          {/* RIGHT → Hamburger */}
          <IonButton
            fill="clear"
            onClick={() => document.querySelector("ion-menu")?.open()}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </IonButton>

        </div>
      </IonToolbar>
    </IonHeader>


      {/* CHAT HEADER */}

      <div className="flex items-center gap-3 bg-white px-4 py-3 border-b shadow-sm">

        <IonAvatar className="w-10 h-10">
          <img src={helper.profile_picture} />
        </IonAvatar>

        <div>
          <p className="font-semibold text-gray-800 text-lg">
            Chat with {helper.name}
          </p>

          <p className="text-xs text-gray-500">
            Online
          </p>
        </div>

      </div>

      {/* CHAT CONTENT */}

      <IonContent className="bg-gray-100 p-4">

        <div className="flex flex-col space-y-3">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={`flex items-end ${
                msg.sender === "user"
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
                className={`px-4 py-2 rounded-xl max-w-xs shadow
                ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && (

                <IonAvatar className="w-8 h-8 ml-2">
                  <img src={userAvatar} />
                </IonAvatar>

              )}

            </div>

          ))}

          <div ref={chatEndRef}></div>

        </div>

      </IonContent>

      {/* MESSAGE INPUT */}

      <div className="flex items-center gap-2 p-3 bg-white border-t">

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
          className="flex-1 rounded-full border px-4 py-2"
        />

        <IonButton
          onClick={sendMessage}
        
        >
          <IonIcon icon={sendOutline} className="text-white text-xl" />
        </IonButton>

      </div>

    </IonPage>

  );
};

export default HelperChatPage;