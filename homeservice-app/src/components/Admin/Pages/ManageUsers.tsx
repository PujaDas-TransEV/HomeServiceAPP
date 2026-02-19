import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonInput,
  IonButtons,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuToggle,
} from "@ionic/react";
import {
  personCircleOutline,
  callOutline,
  eyeOutline,
  banOutline,
  trashOutline,
  searchOutline,
  homeOutline,
  settingsOutline,
  logOutOutline,
  peopleOutline,
  menuOutline,
  closeOutline,
} from "ionicons/icons";

import logoImg from "../../assets/logo.jpg"; // your admin logo
import bannerImg from "../../assets/manageusers.jpg";
const AdminUsers: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy Users
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Sharma", phone: "+91 9872805295", role: "helper", status: "active" },
    { id: 2, name: "Priya Das", phone: "+91 9872805296", role: "seeker", status: "inactive" },
    { id: 3, name: "Amit Roy", phone: "+91 9872805297", role: "helper", status: "active" },
    { id: 4, name: "Sneha Paul", phone: "+91 9872805298", role: "seeker", status: "active" },
  ]);

  const filteredUsers = users
    .filter(u => filter === "all" || u.role === filter)
    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleStatus = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

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

        {/* CONTENT */}
        <IonContent className="bg-pink-50 min-h-screen p-4">

       {/* Banner */}
<div className="w-full h-64 relative rounded-xl overflow-hidden shadow-lg mb-6">
  <img
    src={bannerImg}
    alt="Admin Banner"
    className="w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div> 
  {/* bg-black/40 → 40% opacity black overlay */}

  {/* Text */}
 <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
  <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-2">
    User Management
  </h2>
  <p className="text-white/80 text-lg drop-shadow-sm">
    View, edit, and organize all your helpers and seekers
  </p>
</div>

</div>



{/* Filters + Search (Dropdown Style) */}
<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
  
  {/* Filter Dropdown */}
  <div className="relative w-full md:w-48">
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 text-white font-semibold py-2 px-4 rounded-2xl shadow-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <option value="all">All Users</option>
      <option value="helper">Helpers</option>
      <option value="seeker">Seekers</option>
    </select>
    
    {/* Dropdown Arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Search Input */}
  <div className="flex items-center bg-white rounded-full shadow-md px-3 py-1 w-full md:w-64">
    <input
      type="text"
      placeholder="Search by name..."
      className="flex-1 outline-none text-gray-700 text-sm px-2 py-1 rounded-l-full"
      onChange={(e) => setFilter(e.target.value)}
    />
    <IonIcon icon={searchOutline} className="text-gray-500 text-lg cursor-pointer" />
  </div>
</div>

          {/* User Cards */}
          <div className="space-y-4">
            {filteredUsers.map(user => (
              <div key={user.id} className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition">

                {/* Left */}
                <div className="flex items-center gap-4">
                  <IonIcon icon={personCircleOutline} className="text-4xl text-pink-500" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <IonIcon icon={callOutline} /> {user.phone}
                    </p>

                    {/* Role Badge */}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.role === "helper" ? "bg-indigo-100 text-indigo-600" : "bg-green-100 text-green-600"
                    }`}>
                      {user.role.toUpperCase()}
                    </span>

                    {/* Status Badge */}
                    <span className={`text-xs px-2 py-1 rounded-full ml-2 font-medium ${
                      user.status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>

                {/* Right Buttons */}
                <div className="flex gap-2">
                  <IonButton size="small" fill="outline" color="primary" onClick={() => alert(`View details of ${user.name}`)}>
                    <IonIcon icon={eyeOutline} />
                  </IonButton>

                  <IonButton size="small" fill="outline" color="warning" onClick={() => toggleStatus(user.id)}>
                    <IonIcon icon={banOutline} />
                  </IonButton>

                  <IonButton size="small" fill="outline" color="danger" onClick={() => deleteUser(user.id)}>
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </div>

              </div>
            ))}
          </div>

        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminUsers;
