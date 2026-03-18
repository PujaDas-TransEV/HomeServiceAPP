import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonAvatar,
  IonIcon,
} from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { attachOutline, sendOutline, closeOutline } from "ionicons/icons";
import Logo from "../../assets/logo.jpg";

const API_BASE = "http://192.168.0.187:9830"; // Use the correct API

export default function HelperChat() {
  const { booking_id, receiver_account_id }: any = useParams();
  const history = useHistory();

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<any>(null);

  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id"); // adjust if needed

  const [helper, setHelper] = useState({
    name: "Helper",
    profile_picture: "https://i.pravatar.cc/150?img=22",
  });

  // ================= FETCH CHAT HISTORY =================
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/chat/history/${booking_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      // sort messages oldest → newest
      const sorted = (data.messages || []).sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      setMessages(sorted);

      if (data.helper) setHelper(data.helper);

    } catch (err) {
      console.log("History error:", err);
    }
  };

  useEffect(() => {
    if (booking_id) fetchMessages();
  }, [booking_id]);

  // ================= WEBSOCKET =================
  useEffect(() => {
    if (!booking_id || !receiver_account_id) return;

    const ws = new WebSocket(
      `ws://192.168.0.187:9830/chat/stream/${booking_id}/${receiver_account_id}`
    );

    wsRef.current = ws;

    ws.onopen = () => console.log("✅ WebSocket Connected");

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        setMessages((prev) => {
          // prevent duplicate
          if (prev.find((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      } catch (err) {
        console.log("WS parse error:", err);
      }
    };

    ws.onerror = (err) => console.log("❌ WebSocket error:", err);
    ws.onclose = () => console.log("🔌 WebSocket closed");

    return () => ws.close();
  }, [booking_id, receiver_account_id]);

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/chat/send/${booking_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver_account_id,
          message: text,
        }),
      });

      const data = await res.json();

      // Show the sent message instantly
      setMessages((prev) => [...prev, data]);
      setText("");

    } catch (err) {
      console.log("Send error:", err);
    }
  };

  // ================= AUTO SCROLL =================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <IonPage className="bg-gray-100 dark:bg-gray-900">

      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600">
          <div className="flex items-center gap-3">

            <IonAvatar className="w-10 h-10">
              <img src={Logo} alt="Logo" />
            </IonAvatar>

            <IonTitle className="text-white font-bold text-lg">
              Chat with Helper
            </IonTitle>

            <IonButton fill="clear" onClick={() => history.goBack()}>
              <IonIcon icon={closeOutline} className="text-white text-xl" />
            </IonButton>

          </div>
        </IonToolbar>
      </IonHeader>

      {/* CHAT HEADER */}
      <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <IonAvatar className="w-12 h-12">
          <img src={helper.profile_picture} alt={helper.name} />
        </IonAvatar>
        <IonTitle className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
          {helper.name}
        </IonTitle>
      </div>

      {/* CHAT BODY */}
      <IonContent id="main-content" className="p-4">
        <div className="flex flex-col gap-2">

          {messages.map((msg, i) => {
            const isOwn = msg.sender_id == userId || msg.is_sender === true;
            return (
              <div
                key={msg.id || i}
                className={`max-w-[75%] p-2 rounded-xl text-sm ${
                  isOwn
                    ? "bg-indigo-600 text-white self-end rounded-br-none"
                    : "bg-gray-200 text-gray-900 self-start rounded-bl-none dark:bg-gray-700 dark:text-gray-100"
                }`}
              >
                {msg.message}
              </div>
            );
          })}

          <div ref={bottomRef} />

        </div>
      </IonContent>

      {/* INPUT */}
      <div className="p-2 flex gap-2 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <IonButton
          fill="clear"
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          <IonIcon icon={attachOutline} className="text-gray-700 dark:text-gray-200 text-xl" />
        </IonButton>

        <IonInput
          value={text}
          placeholder="Type a message..."
          onIonInput={(e: any) => setText(e.detail.value)}
          className="flex-1 rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-gray-100"
        />

        <IonButton onClick={sendMessage} className="bg-indigo-600 text-white">
          <IonIcon icon={sendOutline} />
        </IonButton>
      </div>
    </IonPage>
  );
}