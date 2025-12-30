import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonAvatar,
  IonButton,
  IonInput,
  IonIcon,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { menuController } from "@ionic/core";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { attachOutline, paperPlaneOutline } from "ionicons/icons";
import Logo from "../../assets/logo.jpg";
import DefaultAvatar from "../../assets/profile.png";

const dummyMaids = [
  { id: 1, name: "Ayesha Begum", phone: "+880 1111 2222", avatar: DefaultAvatar },
  { id: 2, name: "Fatima Akter", phone: "+880 3333 4444", avatar: DefaultAvatar },
  { id: 3, name: "Sohana Rahman", phone: "+880 5555 6666", avatar: DefaultAvatar },
  { id: 4, name: "Rina Khatun", phone: "+880 7777 8888", avatar: DefaultAvatar },
  { id: 5, name: "Salma Parvin", phone: "+880 9999 0000", avatar: DefaultAvatar },
];

export default function ChatPage() {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [selectedMaid, setSelectedMaid] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ from: string; text?: string; file?: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const filteredMaids = dummyMaids.filter((maid) =>
    maid.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { from: "user", text: message }]);
    setMessage("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "maid", text: "Hello! How can I assist you?" }]);
    }, 500);
  };

  const handleFileUpload = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setMessages([...messages, { from: "user", file: url }]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    setShowLogoutModal(false);
    history.push("/"); // Redirect to landing page
  };

  // ---------------- Hamburger Menu ----------------
  const Menu = (
    <IonMenu side="end" menuId="main-menu" contentId="main-content">
      <IonContent className="bg-white">
        <IonList className="mt-4">
          <IonItem button onClick={() => history.push("/home")}>
            <IonLabel className="text-lg">🏠 Home</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/profile")}>
            <IonLabel className="text-lg">👤 Profile</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/chat")}>
            <IonLabel className="text-lg">💬 Chat</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/maid-list")}>
            <IonLabel className="text-lg">🧹 Maid List</IonLabel>
          </IonItem>
           <IonItem
            button
            onClick={() => {
              history.push("/preferences"); // Navigate to preferences page
              menuController.close("main-menu");
            }}
          >
            <IonLabel className="text-lg">⚙️ Preferences</IonLabel>
          </IonItem>
          <IonItem button onClick={() => setShowLogoutModal(true)}>
            <IonLabel className="text-lg text-red-500">🚪 Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );

  // ------------------ Chat Window ------------------
  if (selectedMaid) {
    return (
      <>
        {Menu}
        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar className="bg-pink-500 text-white shadow-md flex justify-between items-center px-4 py-2">
              <IonButtons slot="start">
                <IonButton
                  onClick={() => {
                    setSelectedMaid(null);
                    setMessages([]);
                  }}
                  className="text-white"
                >
                  Back
                </IonButton>
              </IonButtons>
              <h1 className="text-xl font-bold">Chat</h1>
              <IonButtons slot="end">
                <IonMenuButton
                  menu="main-menu"
                  className="text-white bg-yellow-500 p-2 rounded-lg shadow-md hover:bg-yellow-600"
                />
              </IonButtons>
            </IonToolbar>
            <div className="flex items-center gap-3 bg-white p-3 shadow-md">
              <IonAvatar className="w-12 h-12">
                <img src={selectedMaid.avatar} alt={selectedMaid.name} />
              </IonAvatar>
              <h2 className="text-lg font-semibold">{selectedMaid.name}</h2>
            </div>
          </IonHeader>

          <IonContent className="bg-pink-50 flex flex-col justify-end">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl max-w-xs wrap-break-word ${
                    msg.from === "user"
                      ? "bg-pink-500 text-white self-end"
                      : "bg-white text-gray-800 self-start"
                  }`}
                >
                  {msg.text && <p>{msg.text}</p>}
                  {msg.file && (
                    <a
                      href={msg.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline text-sm ${
                        msg.from === "user" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      View Attachment
                    </a>
                  )}
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            <div className="flex gap-2 items-center p-4 bg-white shadow-md">
              <label className="bg-pink-500 p-2 rounded-xl cursor-pointer hover:bg-pink-600 text-white">
                <IonIcon icon={attachOutline} />
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
              <IonInput
                value={message}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                onIonInput={(e: any) => setMessage(e.target.value)}
              />
              <IonButton
                onClick={handleSend}
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl flex items-center justify-center"
              >
                <IonIcon icon={paperPlaneOutline} />
              </IonButton>
            </div>
          </IonContent>

          {/* ---------- Logout Modal ---------- */}
          {showLogoutModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
                <h2 className="text-lg font-bold mb-4">Logout</h2>
                <p className="text-gray-700 mb-6">Are you sure you want to Logout?</p>
                <div className="flex justify-end gap-4">
                  <IonButton
                    fill="outline"
                    color="medium"
                    onClick={() => setShowLogoutModal(false)}
                    className="px-6 py-2 rounded-xl hover:bg-gray-100"
                  >
                    No
                  </IonButton>
                  <IonButton
                    color="danger"
                    onClick={handleLogout}
                    className="px-6 py-2 rounded-xl hover:bg-red-600"
                  >
                    Yes
                  </IonButton>
                </div>
              </div>
            </div>
          )}
        </IonPage>
      </>
    );
  }

  // ------------------ Maid List ------------------
  return (
    <>
      {Menu}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar className="flex justify-between items-center px-4 py-2 bg-pink-500 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <img src={Logo} alt="logo" className="w-8 h-8 object-cover rounded-full" />
              </div>
              <h1 className="text-l font-bold text-indigo-400">HelperGo</h1>
            </div>
            <IonButtons slot="end">
              <IonMenuButton
                menu="main-menu"
                className="text-white bg-yellow-500 p-2 rounded-lg shadow-md hover:bg-yellow-600"
              />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-white p-4">
          {/* Search */}
          <IonInput
            value={searchText}
            placeholder="Search maids..."
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4 bg-white"
            onIonInput={(e: any) => setSearchText(e.target.value)}
          />

          {/* Maid List */}
          <div className="space-y-4">
            {filteredMaids.length > 0 ? (
              filteredMaids.map((maid) => (
                <div
                  key={maid.id}
                  className="flex items-center justify-between bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <IonAvatar className="w-12 h-12">
                      <img src={maid.avatar} alt={maid.name} />
                    </IonAvatar>
                    <div>
                      <h2 className="font-semibold text-gray-800">{maid.name}</h2>
                      <p className="text-gray-500 text-sm">{maid.phone}</p>
                    </div>
                  </div>
                  <IonButton
                    onClick={() => setSelectedMaid(maid)}
                    className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl"
                  >
                    Chat
                  </IonButton>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No maids found</p>
            )}
          </div>

          {/* ---------- Logout Modal ---------- */}
          {showLogoutModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
                <h2 className="text-lg font-bold mb-4">Logout</h2>
                <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
                <div className="flex justify-end gap-4">
                  <IonButton
                    fill="outline"
                    color="medium"
                    onClick={() => setShowLogoutModal(false)}
                    className="px-6 py-2 rounded-xl hover:bg-gray-100"
                  >
                    No
                  </IonButton>
                  <IonButton
                    color="danger"
                    onClick={handleLogout}
                    className="px-6 py-2 rounded-xl hover:bg-red-600"
                  >
                    Yes
                  </IonButton>
                </div>
              </div>
            </div>
          )}
        </IonContent>
      </IonPage>
    </>
  );
}
