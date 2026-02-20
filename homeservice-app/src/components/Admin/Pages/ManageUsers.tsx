// import React, { useState } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonIcon,
//   IonButton,
//   IonInput,
//   IonButtons,
//   IonMenu,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonMenuToggle,
// } from "@ionic/react";
// import {
//   personCircleOutline,
//   callOutline,
//   eyeOutline,
//   banOutline,
//   trashOutline,
//   searchOutline,
//   homeOutline,
//   settingsOutline,
//   logOutOutline,
//   peopleOutline,
//   menuOutline,
//   closeOutline,
// } from "ionicons/icons";

// import logoImg from "../../assets/logo.jpg"; // your admin logo
// import bannerImg from "../../assets/manageusers.jpg";
// const AdminUsers: React.FC = () => {
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Dummy Users
//   const [users, setUsers] = useState([
//     { id: 1, name: "Rahul Sharma", phone: "+91 9872805295", role: "helper", status: "active" },
//     { id: 2, name: "Priya Das", phone: "+91 9872805296", role: "seeker", status: "inactive" },
//     { id: 3, name: "Amit Roy", phone: "+91 9872805297", role: "helper", status: "active" },
//     { id: 4, name: "Sneha Paul", phone: "+91 9872805298", role: "seeker", status: "active" },
//   ]);

//   const filteredUsers = users
//     .filter(u => filter === "all" || u.role === filter)
//     .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   const toggleStatus = (id: number) => {
//     setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
//   };

//   const deleteUser = (id: number) => {
//     setUsers(users.filter(u => u.id !== id));
//   };

//   const redirect = (path: string) => {
//     window.location.href = path;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     redirect("/login");
//   };

//   return (
//     <>
//       {/* SIDE MENU */}
//       <IonMenu side="end" menuId="adminMenu" contentId="adminContent">
//         <IonHeader>
//           <IonToolbar className="bg-indigo-600 text-purple-300 px-4">
//             <div className="flex justify-between items-center w-full">
//               <IonTitle>Admin Panel</IonTitle>
//               <IonButton fill="clear" onClick={() =>
//                 (window as any).document.querySelector("ion-menu")?.close()
//               }>
//                 <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
//               </IonButton>
//             </div>
//           </IonToolbar>
//         </IonHeader>

//        <IonContent className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
//            <div className="p-4 space-y-3">
       
//              {/* Profile */}
//              <IonMenuToggle autoHide>
//                <div
//                  onClick={() => redirect("/admin-profile")}
//                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//                >
//                  <IonIcon icon={personCircleOutline} className="text-purple-400 text-xl" />
//                  <span className="font-medium tracking-wide">Profile</span>
//                </div>
//              </IonMenuToggle>
       
//              {/* Dashboard */}
//              <IonMenuToggle autoHide>
//                <div
//                  onClick={() => redirect("/admin-home")}
//                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-blue-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//                >
//                  <IonIcon icon={homeOutline} className="text-blue-400 text-xl" />
//                  <span className="font-medium tracking-wide">Dashboard</span>
//                </div>
//              </IonMenuToggle>
//        <IonMenuToggle autoHide>
//   <div
//     onClick={() => redirect("/manage-users")}
//     className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//   >
//     <IonIcon icon={peopleOutline} className="text-purple-400 text-xl" />
//     <span className="font-medium tracking-wide">Manage Users</span>
//   </div>
// </IonMenuToggle>

//              {/* Services */}
//              <IonMenuToggle autoHide>
//                <div
//                  onClick={() => redirect("/admin-service")}
//                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-pink-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//                >
//                  <IonIcon icon={settingsOutline} className="text-pink-400 text-xl" />
//                  <span className="font-medium tracking-wide"> Manage Services</span>
//                </div>
//              </IonMenuToggle>
       
//              {/* Logout */}
//              <IonMenuToggle autoHide>
//                <div
//                  onClick={handleLogout}
//                  className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
//                >
//                  <IonIcon icon={logOutOutline} className="text-red-400 text-xl" />
//                  <span className="font-medium tracking-wide text-red-400">
//                    Logout
//                  </span>
//                </div>
//              </IonMenuToggle>
       
//            </div>
//          </IonContent>
//       </IonMenu>

//       <IonPage>
//         {/* NAVBAR */}
//         <div id="adminContent"
//           className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-5 py-3">

//           <div className="flex items-center gap-3">
//             <img
//               src={logoImg}
//               alt="Logo"
//               className="w-12 h-12 rounded-full border-2 border-pink-500"
//             />
//             <h1 className="font-bold text-xl text-indigo-600">
//               Maidigo Admin
//             </h1>
//           </div>

//           <IonButtons>
//             <IonButton onClick={() =>
//               (window as any).document.querySelector("ion-menu")?.toggle()
//             }>
//               <IonIcon icon={menuOutline}
//                 className="text-3xl text-pink-600" />
//             </IonButton>
//           </IonButtons>
//         </div>

//         {/* CONTENT */}
//         <IonContent className="bg-pink-50 min-h-screen p-4">

//        {/* Banner */}
// <div className="w-full h-64 relative rounded-xl overflow-hidden shadow-lg mb-6">
//   <img
//     src={bannerImg}
//     alt="Admin Banner"
//     className="w-full h-full object-cover"
//   />

//   {/* Dark Overlay */}
//   <div className="absolute inset-0 bg-black/40"></div> 
//   {/* bg-black/40 → 40% opacity black overlay */}

//   {/* Text */}
//  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
//   <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-2">
//     User Management
//   </h2>
//   <p className="text-white/80 text-lg drop-shadow-sm">
//     View, edit, and organize all your helpers and seekers
//   </p>
// </div>

// </div>



// {/* Filters + Search (Dropdown Style) */}
// <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
  
//   {/* Filter Dropdown */}
//   <div className="relative w-full md:w-48">
//     <select
//       value={filter}
//       onChange={(e) => setFilter(e.target.value)}
//       className="w-full bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 text-white font-semibold py-2 px-4 rounded-2xl shadow-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
//     >
//       <option value="all">All Users</option>
//       <option value="helper">Helpers</option>
//       <option value="seeker">Seekers</option>
//     </select>
    
//     {/* Dropdown Arrow */}
//     <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
//       <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//       </svg>
//     </div>
//   </div>

//   {/* Search Input */}
//   <div className="flex items-center bg-white rounded-full shadow-md px-3 py-1 w-full md:w-64">
//     <input
//       type="text"
//       placeholder="Search by name..."
//       className="flex-1 outline-none text-gray-700 text-sm px-2 py-1 rounded-l-full"
//       onChange={(e) => setFilter(e.target.value)}
//     />
//     <IonIcon icon={searchOutline} className="text-gray-500 text-lg cursor-pointer" />
//   </div>
// </div>

//           {/* User Cards */}
//           <div className="space-y-4">
//             {filteredUsers.map(user => (
//               <div key={user.id} className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition">

//                 {/* Left */}
//                 <div className="flex items-center gap-4">
//                   <IonIcon icon={personCircleOutline} className="text-4xl text-pink-500" />
//                   <div>
//                     <h3 className="font-semibold text-gray-800">{user.name}</h3>
//                     <p className="text-sm text-gray-500 flex items-center gap-1">
//                       <IonIcon icon={callOutline} /> {user.phone}
//                     </p>

//                     {/* Role Badge */}
//                     <span className={`text-xs px-2 py-1 rounded-full font-medium ${
//                       user.role === "helper" ? "bg-indigo-100 text-indigo-600" : "bg-green-100 text-green-600"
//                     }`}>
//                       {user.role.toUpperCase()}
//                     </span>

//                     {/* Status Badge */}
//                     <span className={`text-xs px-2 py-1 rounded-full ml-2 font-medium ${
//                       user.status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
//                     }`}>
//                       {user.status}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Right Buttons */}
//                 <div className="flex gap-2">
//                   <IonButton size="small" fill="outline" color="primary" onClick={() => alert(`View details of ${user.name}`)}>
//                     <IonIcon icon={eyeOutline} />
//                   </IonButton>

//                   <IonButton size="small" fill="outline" color="warning" onClick={() => toggleStatus(user.id)}>
//                     <IonIcon icon={banOutline} />
//                   </IonButton>

//                   <IonButton size="small" fill="outline" color="danger" onClick={() => deleteUser(user.id)}>
//                     <IonIcon icon={trashOutline} />
//                   </IonButton>
//                 </div>

//               </div>
//             ))}
//           </div>

//         </IonContent>
//       </IonPage>
//     </>
//   );
// };

// export default AdminUsers;
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonButtons,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuToggle,
  IonModal,
  IonSpinner,
} from "@ionic/react";

import {
  eyeOutline,
  trashOutline,
  searchOutline,
  homeOutline,
  logOutOutline,
  menuOutline,
  closeOutline,
  personCircleOutline,
  peopleOutline,
  settingsOutline,
} from "ionicons/icons";

import logoImg from "../../assets/logo.jpg";
import bannerImg from "../../assets/manageusers.jpg";

interface User {
  account_id: string;
  phone: string;
  role: string;
  capacity: string;
  is_active: boolean;
  name: string;
  city: string;
  area: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://192.168.0.187:9830/services/admin/user-report",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= DELETE USER =================
  const deleteUser = async (accountId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await fetch(
        `http://192.168.0.187:9830/admin/users/${accountId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh list after delete
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredUsers = users
    .filter((u) => filter === "all" || u.role === filter)
    .filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const redirect = (path: string) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    redirect("/login");
  };

return (
    <>
      {/* SIDE MENU */}
      <IonMenu side="end" menuId="adminMenu" contentId="adminContent">
        <IonHeader>
          <IonToolbar className="bg-indigo-600 text-purple-300 px-4">
            <div className="flex justify-between items-center w-full">
              <IonTitle>Admin Panel</IonTitle>
              <IonButton fill="clear" onClick={() =>
                (window as any).document.querySelector("ion-menu")?.close()
              }>
                <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>

       <IonContent className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
           <div className="p-4 space-y-3">
       
             {/* Profile */}
             <IonMenuToggle autoHide>
               <div
                 onClick={() => redirect("/admin-profile")}
                 className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
               >
                 <IonIcon icon={personCircleOutline} className="text-purple-400 text-xl" />
                 <span className="font-medium tracking-wide">Profile</span>
               </div>
             </IonMenuToggle>
       
             {/* Dashboard */}
             <IonMenuToggle autoHide>
               <div
                 onClick={() => redirect("/admin-home")}
                 className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-blue-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
               >
                 <IonIcon icon={homeOutline} className="text-blue-400 text-xl" />
                 <span className="font-medium tracking-wide">Dashboard</span>
               </div>
             </IonMenuToggle>
       <IonMenuToggle autoHide>
  <div
    onClick={() => redirect("/manage-users")}
    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
  >
    <IonIcon icon={peopleOutline} className="text-purple-400 text-xl" />
    <span className="font-medium tracking-wide">Manage Users</span>
  </div>
</IonMenuToggle>

             {/* Services */}
             <IonMenuToggle autoHide>
               <div
                 onClick={() => redirect("/admin-service")}
                 className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-pink-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
               >
                 <IonIcon icon={settingsOutline} className="text-pink-400 text-xl" />
                 <span className="font-medium tracking-wide"> Manage Services</span>
               </div>
             </IonMenuToggle>
       
             {/* Logout */}
             <IonMenuToggle autoHide>
               <div
                 onClick={handleLogout}
                 className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
               >
                 <IonIcon icon={logOutOutline} className="text-red-400 text-xl" />
                 <span className="font-medium tracking-wide text-red-400">
                   Logout
                 </span>
               </div>
             </IonMenuToggle>
       
           </div>
         </IonContent>
      </IonMenu>

      <IonPage>
        {/* NAVBAR */}
        <div id="adminContent"
          className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-5 py-3">

          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-pink-500"
            />
            <h1 className="font-bold text-xl text-indigo-600">
              Maidigo Admin
            </h1>
          </div>

          <IonButtons>
            <IonButton onClick={() =>
              (window as any).document.querySelector("ion-menu")?.toggle()
            }>
              <IonIcon icon={menuOutline}
                className="text-3xl text-pink-600" />
            </IonButton>
          </IonButtons>
        </div>

        <IonContent className="bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">

          {/* Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
            <img src={bannerImg} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
              <h2 className="text-4xl font-extrabold tracking-wide">
                User Management
              </h2>
              <p className="mt-2 text-white/80">
                View & control all platform users
              </p>
            </div>
          </div>

          {/* Filter + Search RIGHT SIDE */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl bg-purple-500 text-white font-semibold shadow-md"
            >
              <option value="all">All Users</option>
              <option value="helper">Helpers</option>
              <option value="seeker">Seekers</option>
            </select>

          <div className="flex items-center bg-linear-to-r from-indigo-100 via-purple-100 to-pink-100 
                rounded-full shadow-md px-4 py-2 w-full md:w-80 
                border border-indigo-200 focus-within:ring-2 focus-within:ring-purple-400 transition">

  <input
    type="text"
    placeholder="Search user..."
    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <IonIcon icon={searchOutline} className="text-purple-600 text-lg" />
</div>
</div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center mt-10">
              <IonSpinner name="crescent" />
            </div>
          )}

          {/* USER CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.account_id}
                className="bg-linear-to-r from-white to-indigo-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-indigo-700">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {user.phone}
                    </p>

                    <div className="mt-3 flex gap-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                        {user.role}
                      </span>

                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          user.is_active
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {/* VIEW */}
                    <IonButton
                      size="small"
                      fill="clear"
                      className="text-indigo-600"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                      }}
                    >
                      <IonIcon icon={eyeOutline} />
                    </IonButton>

                    {/* DELETE */}
                    <IonButton
                      size="small"
                      fill="clear"
                      className="text-red-600"
                      onClick={() => deleteUser(user.account_id)}
                    >
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MODAL */}
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <div className="p-8 bg-linear-to-br from-indigo-600 to-purple-600 min-h-full text-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Details</h2>
                <IonButton fill="clear" onClick={() => setShowModal(false)}>
                  <IonIcon icon={closeOutline} className="text-white text-2xl" />
                </IonButton>
              </div>

              {selectedUser && (
                <div className="bg-pink-200 text-gray-800 p-6 rounded-2xl shadow-xl space-y-3">
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Phone:</strong> {selectedUser.phone}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                  <p><strong>Capacity:</strong> {selectedUser.capacity}</p>
                  <p><strong>Status:</strong> {selectedUser.is_active ? "Active" : "Inactive"}</p>
                  <p><strong>City:</strong> {selectedUser.city}</p>
                  <p><strong>Area:</strong> {selectedUser.area}</p>
                  <p className="text-s text-gray-500">
                   Account  ID: {selectedUser.account_id}
                  </p>
                </div>
              )}
            </div>
          </IonModal>

        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminUsers;