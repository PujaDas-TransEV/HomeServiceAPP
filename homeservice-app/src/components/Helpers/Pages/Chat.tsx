

import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonAvatar,
  IonModal,
} from "@ionic/react";
import { menu, send, personCircle, chatbubbles, logOut, home } from "ionicons/icons";
import { useHistory } from "react-router-dom";

import Logo from "../../assets/logo.jpg";
import UserImg from "../../assets/profile.png";

interface Client {
  name: string;
  need: string;
  profilePic: string;
  services: string[];
}

interface Message {
  sender: string;
  text: string;
  attachment?: { url: string; name: string; type: string };
}

const MaidChat: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [chatUser, setChatUser] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const history = useHistory();

  const clients: Client[] = [
    { name: "Rahul Verma", need: "Cooking (রান্না)", profilePic: UserImg, services: ["Cooking"] },
    { name: "Priya Sharma", need: "Cleaning (পরিষ্কার)", profilePic: UserImg, services: ["Cleaning"] },
    { name: "Aditi Roy", need: "Babysitting (শিশু দেখাশোনা)", profilePic: UserImg, services: ["Babysitting"] },
    { name: "Rohan Sen", need: "Elderly Care (বয়স্কদের যত্ন)", profilePic: UserImg, services: ["Elderly Care"] },
    { name: "Sunita Das", need: "Cooking & Babysitting", profilePic: UserImg, services: ["Cooking", "Babysitting"] },
  ];

  const recommendedClients = clients.slice(0, 3); // initial preference/recommended clients
  const services = ["Cooking", "Cleaning", "Babysitting", "Elderly Care"];

  // Filter by search + selected services
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedServices.length === 0 || client.services.some((s) => selectedServices.includes(s)))
  );

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSend = (attachment?: { url: string; name: string; type: string }) => {
    if (!newMsg.trim() && !attachment) return;

    const newMessage: Message = {
      sender: "maid",
      text: newMsg.trim() || (attachment ? "Attachment" : ""),
      ...(attachment && { attachment }),
    };

    setMessages([...messages, newMessage]);
    setNewMsg("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "client", text: "ধন্যবাদ, আমি বুঝেছি!" }]);
    }, 1000);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    history.push("/login");
  };

  return (
    <IonPage>
      {/* NAVBAR */}
      <IonHeader>
        <IonToolbar className="bg-white">
          <div className="flex justify-between items-center w-full px-4 py-2">
            <IonAvatar>
              <img src={Logo} alt="Logo" className="object-contain" />
            </IonAvatar>
            <IonTitle className="text-pink-600 text-xl font-bold">Maidigo (মেইডিগো)</IonTitle>
            <IonIcon
              icon={menu}
              className="text-pink-600 text-2xl"
              onClick={() => setOpenMenu(true)}
            />
          </div>
        </IonToolbar>
      </IonHeader>

      {/* SIDE MENU */}
      {openMenu && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50">
          <div className="p-4 border-b flex justify-end">
            <button className="text-gray-600 font-bold text-xl" onClick={() => setOpenMenu(false)}>
              ✕
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => {
                setOpenMenu(false);
                history.push("/helper-home");
              }}
            >
              <IonIcon icon={home} className="text-2xl text-pink-600" />
              <span className="text-lg font-medium">Home (হোম)</span>
            </div>
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => {
                setOpenMenu(false);
                history.push("/maid-profile");
              }}
            >
              <IonIcon icon={personCircle} className="text-2xl text-pink-600" />
              <span className="text-lg font-medium">Profile (প্রোফাইল)</span>
            </div>
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => {
                setOpenMenu(false);
                setChatUser(null);
              }}
            >
              <IonIcon icon={chatbubbles} className="text-2xl text-pink-600" />
              <span className="text-lg font-medium">Chat (চ্যাট)</span>
            </div>
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => {
                setOpenMenu(false);
                setShowLogoutModal(true);
              }}
            >
              <IonIcon icon={logOut} className="text-2xl text-red-500" />
              <span className="text-lg font-medium text-red-500">Logout (লগআউট)</span>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY */}
      {openMenu && <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setOpenMenu(false)}></div>}

      <IonContent className="ion-padding bg-pink-50">
        {!chatUser && (
          <>
            <IonSearchbar
              placeholder="Search client (ক্লায়েন্ট খুঁজুন)"
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              className="mb-4 rounded-xl shadow"
            />

            <h3 className="font-bold text-gray-700 mb-2">Recommended Clients</h3>
            {recommendedClients.map((client, i) => (
              <div key={i} className="bg-white p-3 rounded-xl mb-2 shadow flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <IonAvatar>
                    <img src={client.profilePic} alt={client.name} />
                  </IonAvatar>
                  <div>
                    <p className="font-bold text-gray-800">{client.name}</p>
                    <p className="text-gray-500 text-sm">{client.need}</p>
                  </div>
                </div>
                <IonButton
                  color="primary"
                  onClick={() => {
                    setChatUser(client);
                    setMessages([{ sender: "client", text: "হ্যালো, আমি সাহায্য চাই!" }]);
                  }}
                >
                  <IonIcon icon={send} className="mr-1" /> Chat
                </IonButton>
              </div>
            ))}

            <h3 className="font-bold text-gray-700 mt-4 mb-2">Filter by Service</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {services.map((service) => (
                <button
                  key={service}
                  className={`px-4 py-2 rounded-full border ${
                    selectedServices.includes(service)
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  onClick={() => handleServiceToggle(service)}
                >
                  {service}
                </button>
              ))}
            </div>

            {filteredClients.length > 0 ? (
              filteredClients.map((client, i) => (
                <div key={i} className="bg-white p-3 rounded-xl mb-2 shadow flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <IonAvatar>
                      <img src={client.profilePic} alt={client.name} />
                    </IonAvatar>
                    <div>
                      <p className="font-bold text-gray-800">{client.name}</p>
                      <p className="text-gray-500 text-sm">{client.need}</p>
                    </div>
                  </div>
                  <IonButton
                    color="primary"
                    onClick={() => {
                      setChatUser(client);
                      setMessages([{ sender: "client", text: "হ্যালো, আমি সাহায্য চাই!" }]);
                    }}
                  >
                    <IonIcon icon={send} className="mr-1" /> Chat
                  </IonButton>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No clients match the selected filter.</p>
            )}
          </>
        )}

        {/* CHAT WINDOW */}
        {chatUser && (
          <div className="flex flex-col h-full justify-between" style={{ minHeight: "70vh" }}>
            {/* Header */}
            <div className="bg-white p-3 rounded-xl shadow mb-3 flex items-center space-x-3">
              <IonAvatar>
                <img src={chatUser.profilePic} alt={chatUser.name} />
              </IonAvatar>
              <div>
                <p className="font-bold text-gray-800">{chatUser.name}</p>
                <p className="text-gray-500 text-sm">{chatUser.need}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-3 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.sender === "maid" ? "bg-pink-200 self-end" : "bg-gray-200 self-start"
                  }`}
                >
                  {msg.attachment ? (
                    <div className="flex flex-col space-y-1">
                      <p>{msg.text}</p>
                      {msg.attachment.type.startsWith("image") ? (
                        <img src={msg.attachment.url} alt="attachment" className="w-48 h-auto rounded-lg shadow" />
                      ) : (
                        <a href={msg.attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          {msg.attachment.name}
                        </a>
                      )}
                    </div>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Input + Attachment */}
            <div className="flex space-x-2 mb-2 items-center">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type message... (মেসেজ লিখুন)"
                className="flex-1 p-3 rounded-xl border border-gray-300"
              />

              <label className="bg-gray-200 p-3 rounded-xl cursor-pointer">
                📎
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      handleSend({ url, name: file.name, type: file.type });
                    }
                  }}
                />
              </label>

              <IonButton color="primary" onClick={() => handleSend()}>
                <IonIcon icon={send} />
              </IonButton>
            </div>

            <IonButton expand="full" color="medium" className="mt-2" onClick={() => setChatUser(null)}>
              Back to clients (ক্লায়েন্ট তালিকায় ফিরে যান)
            </IonButton>
          </div>
        )}

        {/* LOGOUT MODAL */}
        <IonModal isOpen={showLogoutModal}>
          <div className="flex items-center justify-center h-full w-full bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Are you sure you want to logout? <span className="text-pink-500">(আপনি কি লগআউট করতে চান?)</span>
              </h2>
              <div className="flex justify-center space-x-4 mt-4">
                <IonButton color="danger" onClick={handleLogout}>Yes (হ্যাঁ)</IonButton>
                <IonButton color="medium" onClick={() => setShowLogoutModal(false)}>No (না)</IonButton>
              </div>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default MaidChat;
