

import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonModal,
  IonSpinner,
  IonInput,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
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
} from "ionicons/icons";

import backgroundImg from "../../assets/support.webp";
import logoImg from "../../assets/logo.jpg";

interface Complaint {
  user_name: ReactNode;
  id: string;
  subject: string;
  description: string;
  status: "pending" | "resolved";
  created_at: string;
  account_id: string;
  phone: string;
}

const AdminComplaints: React.FC = () => {
  const history = useHistory();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchId, setSearchId] = useState("");
  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [blockedAccounts, setBlockedAccounts] = useState<string[]>([]);
  const [present] = useIonToast();

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
      const res = await fetch(
        "http://192.168.0.187:9830/complaint/admin/usercomplaintsdata",
        { headers: { Authorization: `Bearer ${token}` } }
      );
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

  useEffect(() => {
    fetchComplaints();
    fetchBlockedUsers();
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

  /* ================= BLOCK USER ================= */
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

  /* ================= UNBLOCK USER ================= */
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
      const matchFilter = filter === "all" ? true : c.status === filter;
      const matchSearch = searchId ? c.id.toLowerCase().includes(searchId.toLowerCase()) : true;
      return matchFilter && matchSearch;
    });
  }, [complaints, filter, searchId]);

  return (
    <>
      {/* ================= SIDE MENU ================= */}
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

      {/* ================= PAGE ================= */}
      <IonPage id="adminContent">
        {/* NAVBAR */}
        <div className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="Logo" />
            <h1 className="text-lg font-bold text-indigo-600">Manage Support</h1>
          </div>
          <IonMenuButton menu="adminMenu" className="text-pink-800 text-2xl" />
        </div>

        <IonContent>
          <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})` }}>
            <div className="min-h-screen bg-black/55 p-6">
              {/* FILTER + SEARCH */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 rounded-lg bg-purple-200 shadow border">
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>

                <div className="relative w-full md:w-96">
                  <IonIcon icon={searchOutline} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <IonInput
                    placeholder="Search by ID..."
                    value={searchId}
                    onIonChange={(e) => setSearchId(e.detail.value!)}
                    className="pl-10 bg-indigo-50 rounded-lg shadow"
                  />
                </div>
              </div>

              {loading && (
                <div className="flex justify-center">
                  <IonSpinner color="primary" />
                </div>
              )}

              {/* CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((c) => (
                    <div key={c.id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-indigo-600 text-sm">{c.id}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${c.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                          {c.status}
                        </span>
                      </div>

                      <p className="font-semibold">{c.subject}</p>
                      <p className="text-xs text-gray-500 mb-3">{c.phone}</p>

                      <div className="flex flex-wrap gap-2">
                        <IonButton
                          size="small"
                          fill="outline"
                          onClick={() => {
                            setSelectedComplaint(c);
                            setShowModal(true);
                          }}
                        >
                          <IonIcon icon={eyeOutline} slot="start" />
                          View
                        </IonButton>

                        {c.status === "pending" && (
                          <IonButton size="small" color="success" onClick={() => handleResolve(c.id)}>
                            <IonIcon icon={checkmarkDoneOutline} slot="start" />
                            Resolve
                          </IonButton>
                        )}

                        {blockedAccounts.includes(c.account_id) ? (
                          <IonButton size="small" color="medium" onClick={() => handleUnblock(c.account_id)}>
                            Unblock
                          </IonButton>
                        ) : (
                          <IonButton size="small" color="danger" onClick={() => handleBlock(c.account_id)}>
                            <IonIcon icon={banOutline} slot="start" />
                            Block
                          </IonButton>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                 <div className="col-span-full text-center text-gray-200 mt-6">
  {filter === "pending"
    ? "No pending complaints available."
    : filter === "resolved"
    ? "No resolved complaints available."
    : "No complaints available."}
</div>
                )}
              </div>

              {/* MODAL */}
            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
  <div className="p-6 bg-indigo-50 rounded-xl shadow-lg min-w-[300px] max-w-md mx-auto my-20">
    {selectedComplaint && (
      <>
        <h2 className="text-xl font-bold mb-4 text-indigo-700 border-b-2 border-indigo-300 pb-2">
          Complaint Details
        </h2>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold text-indigo-600">ID:</span> {selectedComplaint.id}</p>
          <p><span className="font-semibold text-indigo-600">Subject:</span> {selectedComplaint.subject}</p>
          <p><span className="font-semibold text-indigo-600">Description:</span> {selectedComplaint.description}</p>
          <p><span className="font-semibold text-indigo-600">Customer Name:</span> {selectedComplaint.user_name}</p>
          <p><span className="font-semibold text-indigo-600">Phone:</span> {selectedComplaint.phone}</p>
        </div>
      </>
    )}

    <IonButton 
      expand="block" 
      className="mt-6 bg-indigo-600 text-white hover:bg-indigo-700"
      onClick={() => setShowModal(false)}
    >
      Close
    </IonButton>
  </div>
</IonModal>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminComplaints;


