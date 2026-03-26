

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonAvatar,
  IonModal,
  IonItem,
  IonLabel,

  IonMenu,
} from "@ionic/react";
import { menu, send, personCircle, chatbubbles, logOut, home, settings, closeOutline } from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Logo from "../../assets/logo.jpg";
import { FaCalendarAlt, FaCog, FaComment, FaHeadset, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";

interface Booking {
  booking_id: string;
  regId: string;
  accountId: string;
  name: string;
  profile_picture: string;
}

interface Message {
  sender: string;
  text: string;
  attachment?: { url: string; name: string; type: string };
}

const API_BASE = "http://192.168.0.187:9830"; // Your API base
const token = localStorage.getItem("access_token");

const MaidChat: React.FC = () => {
  const history = useHistory();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { bookingId, receiverId } = useParams<{ bookingId: string; receiverId: string }>();

  const [openMenu, setOpenMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [chatBookings, setChatBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [chatUser, setChatUser] = useState<Booking | null>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch chat bookings and seeker details
  useEffect(() => {
    const fetchChatBookings = async () => {
      try {
        const res = await fetch(`${API_BASE}/chat/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (data.status === "success") {
          const enriched: Booking[] = [];

          for (const chat of data.chats) {
            const regId = chat.other_party_registration_id;
            const accountId = chat.other_party_account_id;

            // Skip invalid or None IDs
            if (!regId || regId === "None" || !accountId || accountId === "None") continue;

            // Fetch seeker details using accountId
            const seekerRes = await fetch(`${API_BASE}/seeker/seeker-details/${accountId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const seekerData = await seekerRes.json();

            const img =
              seekerData.account_info?.profile_picture ||
              "https://i.pravatar.cc/150?img=22";

            const name = seekerData.profile?.name || "Seeker";

            enriched.push({
              booking_id: chat.booking_id,
              regId: regId,
              accountId: accountId,
              name: name,
              profile_picture: img,
            });
          }

          setChatBookings(enriched);

          // Open chat automatically if URL params exist
          if (bookingId && receiverId) {
            const selected = enriched.find((b) => b.booking_id === bookingId);
            if (selected) {
              setChatUser(selected);
              setMessages([{ sender: "client", text: "হ্যালো, আমি সাহায্য চাই!" }]);
            }
          }
        }
      } catch (err) {
        console.log("Bookings fetch error:", err);
      }
    };

    fetchChatBookings();
  }, [bookingId, receiverId]);

  const handleSend = (attachment?: { url: string; name: string; type: string }) => {
    if (!newMsg.trim() && !attachment) return;

    const newMessage: Message = {
      sender: "maid",
      text: newMsg.trim() || (attachment ? "Attachment" : ""),
      ...(attachment && { attachment }),
    };

    setMessages([...messages, newMessage]);
    setNewMsg("");

    // Mock reply
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
      {/* SIDE MENU */}
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-red-500 to-pink-600 px-4">
            <div className="flex items-center justify-between w-full">
              <IonTitle className="text-indigo-500 font-bold text-lg">HelperGo</IonTitle>
              <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} className="text-pink-600 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-red-50">
          <div className="flex flex-col p-3 space-y-2">
            <IonItem button routerLink="/helper-home" className="rounded-lg hover:bg-red-100">
              <FaHome className="text-red-600 w-5 h-5 mr-3" />
              <IonLabel>Home / হোম</IonLabel>
            </IonItem>
            <IonItem button routerLink="/maid-profile" className="rounded-lg hover:bg-red-100">
              <FaUser className="text-orange-400 w-5 h-5 mr-3" />
              <IonLabel>Profile / প্রোফাইল</IonLabel>
            </IonItem>
            <IonItem button routerLink="/maid-chat" className="rounded-lg hover:bg-red-100">
              <FaComment className="text-pink-600 w-5 h-5 mr-3" />
              <IonLabel>Chat / চ্যাট</IonLabel>
            </IonItem>
            <IonItem button routerLink="/seeker-list" className="rounded-lg hover:bg-red-100">
              <FaUsers className="text-purple-600 w-5 h-5 mr-3" />
              <IonLabel>Seeker List / খোঁজকারী তালিকা</IonLabel>
            </IonItem>
            <IonItem button routerLink="/helper-bookings" className="rounded-lg hover:bg-red-100">
              <FaCalendarAlt className="text-yellow-600 w-5 h-5 mr-3" />
              <IonLabel>Bookings / বুকিংসমূহ</IonLabel>
            </IonItem>
            <IonItem button routerLink="/maid-preferences" className="rounded-lg hover:bg-red-100">
              <FaCog className="text-indigo-600 w-5 h-5 mr-3" />
              <IonLabel>Preferences / পছন্দসমূহ</IonLabel>
            </IonItem>
            <IonItem button routerLink="/support-system" className="rounded-lg hover:bg-red-100">
              <FaHeadset className="text-green-600 w-5 h-5 mr-3" />
              <IonLabel>Help Desk / সহায়তা কেন্দ্র</IonLabel>
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
              <IonLabel>Logout / লগ আউট</IonLabel>
            </IonItem>
          </div>
        </IonContent>
      </IonMenu>

      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-yellow-400 via-red-400 to-pink-500 px-4 py-3">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <img src={Logo} className="w-10 h-10 rounded-full shadow-lg border-2 border-white" alt="logo"/>
              <div>
                <p className="text-pink-500 text-s opacity-80">Welcome back 👋 / স্বাগতম</p>
              </div>
            </div>
            <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.open()}>
              <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z" clipRule="evenodd"/>
                </svg>
              </div>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bg-pink-50 dark:bg-teal-200">
        {!chatUser && (
          <>
            <h3 className="font-bold text-gray-700 mb-2 dark:text-teal-200">Chat Bookings</h3>
            {chatBookings.length > 0 ? (
              chatBookings.map((c, i) => (
                <div key={i} className="bg-teal-300 rounded-xl p-3 mb-2 shadow flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:bg-teal-200">
                  <div className="flex items-center space-x-3" onClick={() => history.push(`/seeker-chat/${c.booking_id}/${c.accountId}`)}>
                    <IonAvatar style={{ width: "35px", height: "35px" }}>
                      <img src={c.profile_picture} alt={c.name}  style={{ width: "35px", height: "35px", objectFit: "cover", borderRadius: "50%" }} />
                    </IonAvatar>
                    <div>
                      <p className="font-bold text-gray-800">{c.name}</p>
                      <p className="text-gray-500 text-sm">Chat</p>
                    </div>
                  </div>
                  <IonButton
                    color="primary"
                    onClick={() => history.push(`/seeker-chat/${c.booking_id}/${c.accountId}`)}
                  >
                    💬 Chat
                  </IonButton>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mb-3">No chats yet.</p>
            )}
          </>
        )}

        {chatUser && (
          <div className="flex flex-col h-full justify-between" style={{ minHeight: "70vh" }}>
            {/* Chat header */}
           <div className="bg-white p-3 rounded-xl shadow mb-3 flex items-center space-x-3">
  <IonAvatar style={{ width: "20px", height: "20px" }}>
    <img
      src={chatUser.profile_picture}
      alt={chatUser.name}
      style={{ width: "20px", height: "20px", objectFit: "cover", borderRadius: "50%" }}
    />
  </IonAvatar>
  <div>
    <p className="font-bold text-gray-800">{chatUser.name}</p>
    <p className="text-gray-500 text-sm">Chat</p>
  </div>
</div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-3 space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={`p-2 rounded-lg max-w-xs ${msg.sender === "maid" ? "bg-pink-200 self-end" : "bg-gray-200 self-start"}`}>
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
              <div ref={bottomRef} />
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

        {/* Logout Modal */}
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

