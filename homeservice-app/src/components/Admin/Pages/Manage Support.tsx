import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonModal,
  IonSpinner,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenu,
  IonMenuToggle,
  IonMenuButton,
  useIonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import {
  eyeOutline,
  searchOutline,
  banOutline,
  checkmarkDoneOutline,
  logOutOutline,
  chatbubblesOutline,
  settingsOutline,
  peopleOutline,
  homeOutline,
  personCircleOutline,
  closeOutline,
  trashOutline,
} from "ionicons/icons";

import backgroundImg from "../../assets/support.webp";
import logoImg from "../../assets/logo.jpg";

interface Complaint {
  proof_image: any;
  booking_id: ReactNode;
  category: ReactNode;
  user_name: ReactNode;
  id: string;
  subject: string;
  description: string;
  status: "pending" | "resolved";
  created_at: string;
  account_id: string;
  phone: string;
  helper_id:string;
  helper_name:string;
  helper_phone:string;
}

interface Faq {
  id: string;
  question: string;
  answer: string;
  target_role: "seeker" | "helper" | "both";
}

const AdminComplaints: React.FC = () => {
  const history = useHistory();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchId, setSearchId] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [blockedAccounts, setBlockedAccounts] = useState<string[]>([]);
  const [present] = useIonToast();

  // FAQ state
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqRole, setFaqRole] = useState<"seeker" | "helper" | "both">("both");
const [showFaqModal, setShowFaqModal] = useState(false);
  const token = localStorage.getItem("access_token");

  const redirect = (path: string) => history.push(path);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    history.replace("/login");
  };

  /* ================= FETCH COMPLAINTS ================= */
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.0.187:9830/complaint/admin/usercomplaintsdata", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setComplaints(data);
    } catch {
      present({ message: "Failed to fetch complaints", duration: 2000, color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH BLOCKED USERS ================= */
  const fetchBlockedUsers = async () => {
    try {
      const res = await fetch("http://192.168.0.187:9830/admin/blocked-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data: { account_id: string }[] = await res.json();
      setBlockedAccounts(data.map((u) => u.account_id));
    } catch {
      present({ message: "Failed to fetch blocked users", duration: 2000, color: "danger" });
    }
  };

  /* ================= FETCH FAQ ================= */
  const fetchFaqs = async () => {
    try {
      const res = await fetch("http://192.168.0.187:9830/faq/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data: Faq[] = await res.json();
      setFaqs(data);
    } catch {
      present({ message: "Failed to fetch FAQs", duration: 2000, color: "danger" });
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchBlockedUsers();
    fetchFaqs();
  }, []);

  /* ================= RESOLVE ================= */
  const handleResolve = async (id: string) => {
    try {
      const res = await fetch(`http://192.168.0.187:9830/admin/complaints/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "resolved" }),
      });
      if (!res.ok) throw new Error();
      setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status: "resolved" } : c)));
      present({ message: "Complaint Resolved", duration: 2000, color: "success" });
    } catch {
      present({ message: "Resolve Failed", duration: 2000, color: "danger" });
    }
  };

  /* ================= BLOCK / UNBLOCK ================= */
  const handleBlock = async (accountId: string) => {
    try {
      const res = await fetch(`http://192.168.0.187:9830/admin/users/${accountId}/block`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setBlockedAccounts((prev) => [...prev, accountId]);
      present({ message: "User Blocked", duration: 2000, color: "danger" });
    } catch {
      present({ message: "Block Failed", duration: 2000, color: "danger" });
    }
  };

  const handleUnblock = async (accountId: string) => {
    try {
      const res = await fetch(`http://192.168.0.187:9830/admin/users/${accountId}/unblock`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setBlockedAccounts((prev) => prev.filter((id) => id !== accountId));
      present({ message: "User Unblocked", duration: 2000, color: "success" });
    } catch {
      present({ message: "Unblock Failed", duration: 2000, color: "danger" });
    }
  };

  /* ================= FILTERED COMPLAINTS ================= */
const filteredComplaints = useMemo(() => {
  return complaints.filter((c) => {
    // Status filter
    const matchFilter = filter === "all" ? true : c.status === filter;

    // Search by Booking ID (case-insensitive)
    const matchSearch = searchId
      ? String(c.booking_id).toLowerCase().includes(searchId.toLowerCase())
      : true;

    return matchFilter && matchSearch;
  });
}, [complaints, filter, searchId]);
  /* ================= ADD FAQ ================= */
  const handleFaqAdd = async () => {
    if (!faqQuestion || !faqAnswer) return present({ message: "Fill question and answer", duration: 2000, color: "warning" });
    try {
      const res = await fetch("http://192.168.0.187:9830/faq/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question: faqQuestion, answer: faqAnswer, target_role: faqRole }),
      });
      if (!res.ok) throw new Error();
      setFaqQuestion(""); setFaqAnswer("");
      fetchFaqs();
      present({ message: "FAQ added successfully", duration: 2000, color: "success" });
    } catch {
      present({ message: "FAQ add failed", duration: 2000, color: "danger" });
    }
  };

  /* ================= DELETE FAQ ================= */
  const handleFaqDelete = async (faqId: string) => {
    try {
      const res = await fetch(`http://192.168.0.187:9830/faq/${faqId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      fetchFaqs();
      present({ message: "FAQ deleted successfully", duration: 2000, color: "success" });
    } catch {
      present({ message: "FAQ delete failed", duration: 2000, color: "danger" });
    }
  };
 /* ================= DELETE COMPLAINT ================= */
  const handleDeleteComplaint = async (id: string) => {
    try {
      const res = await fetch(`http://192.168.0.187:9830/complaint/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error();
      setComplaints((prev) => prev.filter((c) => c.id !== id));
      present({ message: "Complaint deleted successfully", duration: 2000, color: "success" });
    } catch {
      present({ message: "Failed to delete complaint", duration: 2000, color: "danger" });
    }
  };

  return (
    <>
      {/* SIDE MENU */}
    <IonMenu side="end" menuId="adminMenu" contentId="adminContent">
        <IonHeader>
          <IonToolbar className="bg-indigo-600 text-purple-300 px-4">
            <div className="flex justify-between items-center w-full">
              <IonTitle>Admin Panel</IonTitle>
              <IonButton fill="clear" onClick={() => (window as any).document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} className="text-red-400 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-slate-900 text-white">
          <div className="p-4 space-y-3">
            {[
              { label: "Profile", icon: personCircleOutline, path: "/admin-profile", color: "text-purple-400" },
              { label: "Dashboard", icon: homeOutline, path: "/admin-home", color: "text-blue-400" },
              { label: "Manage Users", icon: peopleOutline, path: "/manage-users", color: "text-indigo-400" },
              { label: "Manage Services", icon: settingsOutline, path: "/admin-service", color: "text-pink-400" },
              { label: "Manage Support", icon: chatbubblesOutline, path: "/manage-support", color: "text-purple-300" },
            ].map((item) => (
              <IonMenuToggle key={item.label} autoHide>
                <div
                  onClick={() => redirect(item.path)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-indigo-600/40 transition cursor-pointer"
                >
                  <IonIcon icon={item.icon} className={`${item.color} text-xl`} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </IonMenuToggle>
            ))}

            <IonMenuToggle autoHide>
              <div
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-600/30 transition cursor-pointer"
              >
                <IonIcon icon={logOutOutline} className="text-red-400 text-xl" />
                <span className="text-red-400 font-medium">Logout</span>
              </div>
            </IonMenuToggle>
          </div>
        </IonContent>
      </IonMenu>

      {/* PAGE */}
      <IonPage id="adminContent">
        {/* NAVBAR */}
        <div className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="Logo" />
            <h1 className="text-lg font-bold text-indigo-600">Manage Support</h1>
          </div>
          <IonMenuButton menu="adminMenu" className="text-pink-800 text-2xl" />
        </div>

        <IonContent className="p-6">
          <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})` }}>
            <div className="min-h-screen bg-black/55 p-6">
              
              {/* ================= COMPLAINT FILTER + SEARCH ================= */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 rounded-lg bg-purple-200 shadow border">
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
              
  {/* Search by Complaint ID */}
{/* <div className="relative w-full md:w-96">
  <IonIcon
    icon={searchOutline}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  />
  <IonInput
    placeholder="Search by Complaint ID..."
    value={searchId}
    onIonChange={(e) => setSearchId(e.detail.value!)}
    className="pl-10 bg-indigo-50 rounded-lg shadow"
  />
</div> */}
<div className="relative w-full md:w-96">
  <IonIcon
    icon={searchOutline}
    className="absolute left-3 top-1/2 -translate-y-1/2 
      text-gray-400 dark:text-gray-500"
  />

  <IonInput
    placeholder="Search by Complaint ID..."
    value={searchId}
    onIonChange={(e) => setSearchId(e.detail.value!)}
    className="pl-10 rounded-lg shadow
      bg-indigo-50 dark:bg-pink-100
      border border-indigo-200 dark:border-gray-600"
    style={{
      '--color': 'black',          // light mode text
      '--placeholder-color': '#6b7280',
    } as any}
  />

  {/* 🔥 DARK MODE FORCE */}
  <style>
    {`
      .dark ion-input {
        --color: 'white '
        --placeholder-color: #9ca3af !important;
      }
    `}
  </style>
</div>

              </div>

              {/* ================= COMPLAINT CARDS ================= */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map(c => (
            <div
              key={c.id}
              className="bg-indigo-100 rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              <div className="flex justify-between mb-2">
                <span className="font-bold text-indigo-600 text-sm">{c.booking_id}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    c.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="font-semibold text-gray-700">Subject: {c.category}</p>
              <p className="text-xs text-gray-500 mb-3">Filled By : {c.user_name}</p>
              <div className="flex flex-wrap gap-2">
                <IonButton
                  size="small"
                  fill="outline"
                  onClick={() => {
                    setSelectedComplaint(c);
                    setShowModal(true);
                  }}
                >
                  <IonIcon icon={eyeOutline} slot="start" /> View
                </IonButton>

                {c.status === "pending" && (
                  <IonButton size="small" color="success" onClick={() => handleResolve(c.id)}>
                    <IonIcon icon={checkmarkDoneOutline} slot="start" /> Resolve
                  </IonButton>
                )}

                {/* {blockedAccounts.includes(c.account_id) ? (
                  <IonButton size="small" color="medium" onClick={() => handleUnblock(c.account_id)}>
                    Unblock
                  </IonButton>
                ) : (
                  <IonButton size="small" color="danger" onClick={() => handleBlock(c.account_id)}>
                    <IonIcon icon={banOutline} slot="start" /> Block
                  </IonButton>
                )} */}
                 {/* DELETE BUTTON */}
                      <IonButton size="small" color="danger" onClick={() => handleDeleteComplaint(c.id)}>
                        <IonIcon icon={trashOutline} slot="start" /> Delete
                      </IonButton>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Date & Time: {new Date(c.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-6">
            No complaints available.
          </div>
        )}
      </div>

    
     {/* Complaint Details Modal */}
<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
  <div className="p-6 bg-indigo-50 rounded-xl shadow-lg min-w-[300px] max-w-md mx-auto my-20 max-h-[80vh] overflow-y-auto">
    {selectedComplaint && (
      <>
        <h2 className="text-xl font-bold mb-4 text-indigo-700 border-b-2 border-indigo-300 pb-2">
          Complaint Details
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold text-indigo-600">Booking ID:</span>{" "}
            {selectedComplaint.booking_id}
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Category:</span>{" "}
            {selectedComplaint.category}
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Description:</span>{" "}
            {selectedComplaint.description}
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Filled By Customer Name:</span>{" "}
            {selectedComplaint.user_name}
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Customer Phone:</span>{" "}
            {selectedComplaint.phone}
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Against User Id:</span>{" "}
            {selectedComplaint.helper_id}
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Against User Name:</span>{" "}
            {selectedComplaint.helper_name}
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Against User Phone:</span>{" "}
            {selectedComplaint.helper_phone}
          </p>
          {selectedComplaint.proof_image && (
            <img
              src={selectedComplaint.proof_image}
              alt="Proof"
              className="w-full h-auto mt-2 rounded-lg border shadow-sm"
            />
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <IonButton
            fill="solid"
            color="primary"
            onClick={() => setShowModal(false)}
            className="px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Close
          </IonButton>
        </div>
      </>
    )}
  </div>
</IonModal>
              {/* ================= FAQ MANAGEMENT ================= */}
 <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6 mt-10 space-y-4 border border-white/20">
  <div className="flex justify-between items-center">
    <h2 className="text-xl font-semibold text-gray-700">Manage FAQs</h2>
    <IonButton
      color="primary"
      onClick={() => setShowFaqModal(true)}
      className="flex items-center gap-2"
    >
      <IonIcon icon={chatbubblesOutline} /> {/* You can replace with any icon you like */}
      Add New FAQ
    </IonButton>
  </div>

             <div className="space-y-4 mt-6">
  {faqs.map(f => (
    <div 
      key={f.id} 
      className="flex justify-between items-center p-4 rounded-xl shadow-md hover:shadow-lg transition bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50 border border-gray-200"
    >
      {/* FAQ Content */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <IonIcon icon={chatbubblesOutline} className="text-indigo-500 text-lg" />
          <p className="font-semibold text-gray-800 text-md">{f.question}</p>
        </div>
    
  <div>
  <p className="text-gray-700 text-sm ml-6">{f.answer}</p>
  <span className="ml-6 inline-flex justify-center items-center px-3 py-1 rounded-full text-xs font-semibold
                   text-white 
                   bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
                   shadow-md
                   capitalize
                   min-w-20  /* ensures all badges have same minimum width */
                   text-center">
    {f.target_role}
  </span>
</div>
</div>

      {/* Delete Button */}
      <IonButton 
        color="danger" 
        size="small" 
        fill="outline"
        className="hover:bg-red-100 hover:text-red-600 transition"
        onClick={() => handleFaqDelete(f.id)}
      >
        <IonIcon icon={trashOutline} slot="start" />
        Delete
      </IonButton>
    </div>
  ))}
</div>

              {/* ================= ADD FAQ MODAL ================= */}
              <IonModal isOpen={showFaqModal} onDidDismiss={() => setShowFaqModal(false)}>
                <div className="p-6 rounded-xl shadow-lg min-w-[400px] max-w-md mx-auto my-20 bg-linear-to-r from-indigo-100 via-purple-100 to-pink-100">
                  <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b-2 border-purple-300 pb-2">Add New FAQ</h2>

                 <IonInput
  placeholder="Question"
  value={faqQuestion}
  onIonChange={e => setFaqQuestion(e.detail.value!)}
  className="mb-3 px-3 py-2 rounded-lg 
    bg-white dark:bg-black 
    text-gray-800 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    border border-purple-300 dark:border-gray-600"
/>
                  <IonInput
                    placeholder="Answer"
                    value={faqAnswer}
                    onIonChange={e => setFaqAnswer(e.detail.value!)}
                   className="mb-3 px-3 py-2 rounded-lg 
    bg-white dark:bg-black 
    text-gray-800 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    border border-purple-300 dark:border-gray-600"
                  />
                  <select
                    value={faqRole}
                    onChange={e => setFaqRole(e.target.value as any)}
                   className="mb-3 px-3 py-2 rounded-lg 
    bg-white dark:bg-black 
    text-gray-800 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    border border-purple-300 dark:border-gray-600"
                  >
                    <option value="seeker">Seeker</option>
                    <option value="helper">Helper</option>
                    <option value="both">Both</option>
                  </select>

                  <div className="flex justify-between mt-4">
                    <IonButton color="medium" expand="block" onClick={() => setShowFaqModal(false)}>Cancel</IonButton>
                    <IonButton color="primary" expand="block" onClick={handleFaqAdd}>Add FAQ</IonButton>
                  </div>
                </div>
              </IonModal>

            </div>
          </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminComplaints;



             