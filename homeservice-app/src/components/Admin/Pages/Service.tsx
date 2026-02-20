
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonInput,
  IonModal,
  IonToast,
  IonMenu,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonList,
  IonButtons,
} from "@ionic/react";

import {
  addOutline,
  createOutline,
  trashOutline,
  restaurantOutline,
  brushOutline,
  heartOutline,
  barbellOutline,
  menuOutline,
  closeOutline,
  personCircleOutline,
  homeOutline,
  settingsOutline,
  logOutOutline,
  leafOutline,
  schoolOutline,
  constructOutline,
  flashOutline,
  peopleOutline,

} from "ionicons/icons";

import logoImg from "../../assets/logo.jpg";
import service from '../../assets/service.webp' // Admin profile image
import { sendOutline,refreshOutline } from "ionicons/icons";

interface Service {
  id: number;
  name: string;
  description: string;
}

// Map service types to icons and gradient colors
const serviceIconMap: Record<string, { icon: string; color: string }> = {
  Cleaning: { icon: brushOutline, color: "from-green-400 to-green-600" },
  Cooking: { icon: restaurantOutline, color: "from-orange-400 to-orange-600" },
  Beauty: { icon: brushOutline, color: "from-pink-400 to-pink-600" },
  Fitness: { icon: barbellOutline, color: "from-purple-400 to-purple-600" },
  Care: { icon: heartOutline, color: "from-red-400 to-red-600" },
  
  "Baby Sitting": { icon: personCircleOutline, color: "from-yellow-400 to-yellow-600" },
  "Elderly Care": { icon: heartOutline, color: "from-indigo-400 to-indigo-600" },
  "Home Appliances": { icon: homeOutline, color: "from-teal-400 to-teal-600" },
  Tailor: { icon: brushOutline, color: "from-pink-300 to-pink-500" },
  Laundry: { icon: leafOutline, color: "from-blue-400 to-blue-600" },
  Tutoring: { icon: schoolOutline, color: "from-purple-300 to-purple-500" },
  Gardening: { icon: leafOutline, color: "from-green-300 to-green-500" },
  Plumbing: { icon: constructOutline, color: "from-orange-300 to-orange-500" },
  Electrician: { icon: flashOutline, color: "from-yellow-300 to-yellow-500" },
};

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({ name: "", description: "" });

  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const token = localStorage.getItem("access_token");

  const showToastMessage = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  const redirect = (path: string) => {
    window.location.href = path;
  };

  const handleLogout = () => {
  // Remove only the access token
  localStorage.removeItem("access_token");

  // Optional: remove any other related keys if needed
  // localStorage.removeItem("refresh_token");

  // Redirect to login page
  redirect("/login");
};


  // GET SERVICES
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.0.187:9830/services/getall", {
        headers: { Authorization: `Bearer ${token || ""}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setServices(data || []);
    } catch (err) {
      console.error(err);
      showToastMessage("Network or server error!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // CREATE SERVICE
  const handleCreate = async () => {
    if (!newService.name || !newService.description) {
      showToastMessage("All fields required");
      return;
    }
    try {
      const res = await fetch("http://192.168.0.187:9830/services/creat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        body: JSON.stringify(newService),
      });
      if (!res.ok) throw new Error("Create failed");
      showToastMessage("Service Created");
      setIsCreateOpen(false);
      setNewService({ name: "", description: "" });
      fetchServices();
    } catch (err) {
      console.error(err);
      showToastMessage("Network or server error!");
    }
  };

  // EDIT SERVICE
  const handleEdit = async () => {
    if (!selectedService) return;
    try {
      const res = await fetch(
        `http://192.168.0.187:9830/services/patch/${selectedService.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
          body: JSON.stringify({ description: selectedService.description }),
        }
      );
      if (!res.ok) throw new Error("Update failed");
      showToastMessage("Updated Successfully");
      setIsEditOpen(false);
      fetchServices();
    } catch (err) {
      console.error(err);
      showToastMessage("Network or server error!");
    }
  };

  // DELETE SERVICE

const handleDelete = async (id: number) => {
  try {
    const res = await fetch(
      `http://192.168.0.187:9830/services/delete/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token || ""}` },
      }
    );

    if (!res.ok) throw new Error("Delete failed");

    showToastMessage("Deleted Successfully");
    fetchServices(); // Refresh the list
  } catch (err) {
    console.error(err);
    showToastMessage("Network or server error!");
  }
};

  return (
    <>
      {/* SIDE MENU */}
      <IonMenu side="end" menuId="adminMenu" contentId="adminContent">
  {/* Header */}
  <IonHeader>
    <IonToolbar className="bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 text-purple-300 px-4">
      <div className="flex justify-between items-center w-full">
        <IonTitle className="text-lg font-semibold tracking-wide">
          Admin Panel
        </IonTitle>
        <IonButton
          fill="clear"
          onClick={() =>
            (window as any).document.querySelector("ion-menu")?.close()
          }
        >
          <IonIcon icon={closeOutline} className="text-red-600 text-xl" />
        </IonButton>
      </div>
    </IonToolbar>
  </IonHeader>

  {/* Menu Content */}
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
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-pink-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
        >
          <IonIcon icon={peopleOutline} className="text-pink-400 text-xl" />
          <span className="font-medium tracking-wide">Manage Users</span>
        </div>
      </IonMenuToggle>
      {/* Services */}
      <IonMenuToggle autoHide>
        <div
          onClick={() => redirect("/admin-service")}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-blue-600/30 transition-all duration-300 cursor-pointer backdrop-blur-sm"
        >
          <IonIcon icon={settingsOutline} className="text-purple-400 text-xl" />
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


      {/* MAIN PAGE */}
      <IonPage id="adminContent">
        {/* Navbar */}
        <IonHeader>
          <IonToolbar className="bg-slate-900 text-white flex justify-between px-6">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
              />
                <h1 className="font-bold text-xl text-indigo-600 tracking-wide">Maidigo Admin</h1>
            </div>
            <IonButtons slot="end">
              <IonButton
                onClick={() =>
                  (window as any).document.querySelector("ion-menu")?.open()
                }
              >
                <IonIcon icon={menuOutline} className="text-pink-500 text-2xl" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {/* Page Content */}
        <IonContent fullscreen className="relative">
          <div className="w-full h-48 relative rounded-2xl overflow-hidden shadow-xl mb-6">
  {/* Background Image */}
  <img
    src={service}
    alt="Admin Banner"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30"></div>

  {/* Content Over Image */}
  <div className="absolute inset-0 flex items-center justify-center">
    <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg">
      Manage Services
    </h2>
  </div>
</div>

          {/* Fullscreen Background Image */}
          {/* <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581093588401-540cdd6073d8?auto=format&fit=crop&w=1350&q=80')",
            }}
          ></div> */}
 
        

          {/* Content Container */}
          <div className="relative z-10 min-h-screen p-8">
       <div className="max-w-6xl mx-auto bg-linear-to-r from-pink-400/40 to-purple-400/40 rounded-3xl p-6 shadow-lg backdrop-blur-md">

              {/* Header */}
              <div className="flex justify-between items-center mb-6">
             <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-indigo-500 drop-shadow-lg tracking-wide">
  Service Management
</h2>

              <IonButton
  className="bg-linear-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
  onClick={() => setIsCreateOpen(true)}
>
  <IonIcon icon={addOutline} className="mr-2 text-lg" />
  Create Service
</IonButton>



              </div>

              {/* Services Grid */}
              {loading ? (
                <p className="text-center text-white">Loading...</p>
              ) : services.length === 0 ? (
       <p className="mx-auto w-64 text-center text-gray-200 bg-gray-800/50 backdrop-blur-sm py-3 px-4 rounded-lg text-base font-medium shadow">
  No services available
</p>


              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => {
                    const serviceMeta =
                      serviceIconMap[service.name] || {
                        icon: heartOutline,
                        color: "from-gray-400 to-gray-600",
                      };
                    return (
                      <div
                        key={service.id}
                        className={`bg-linear-to-br ${serviceMeta.color} rounded-2xl p-5 shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <IonIcon
                            icon={serviceMeta.icon}
                            className="text-white text-3xl"
                          />
                          <h3 className="text-2xl font-bold text-white">
                            {service.name}
                          </h3>
                        </div>
                        <p className="text-white mb-4 text-lg">
                          {service.description}
                        </p>
                    <div className="flex gap-2 mt-auto">

  {/* Edit Button */}
  <IonButton
    size="small"
    className="h-8 px-3 bg-pink-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
    onClick={() => {
      setSelectedService(service);
      setIsEditOpen(true);
    }}
  >
    <IonIcon icon={createOutline} className="text-sm" />
  </IonButton>

  {/* Delete Button */}
  <IonButton
    size="small"
    className="h-8 px-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
    onClick={() => handleDelete(service.id)}
  >
    <IonIcon icon={trashOutline} className="text-sm" />
  </IonButton>

</div>


                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
       

    {/* CREATE MODAL */}
<IonModal isOpen={isCreateOpen}>
  <div className="flex items-center justify-center h-full bg-black/50 backdrop-blur-sm">
     <div className="bg-linear-to-br from-pink-300 via-slate-900 to-indigo-900
                  rounded-3xl p-8 w-full max-w-md
                  shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]
                  border border-pink-200">
                    {/* Close Icon */}
  <button
    onClick={() => setIsCreateOpen(false)}
    className="absolute top-4 right-4 text-red-500 hover:text-white 
               transition duration-200"
  >
    <IonIcon icon={closeOutline} className="text-xl" />
  </button>
      <h3 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-md">
        Create Service
      </h3>

      <IonInput
        placeholder="Service Name"
        className="mb-4 border border-white/30 rounded-xl p-3 bg-white text-white placeholder-white/70"
        value={newService.name}
        onIonChange={(e) =>
          setNewService({ ...newService, name: e.detail.value! })
        }
      />
      <IonInput
        placeholder="Description"
        className="mb-6 border border-white/30 rounded-xl p-3 bg-white text-white placeholder-white/70"
        value={newService.description}
        onIonChange={(e) =>
          setNewService({ ...newService, description: e.detail.value! })
        }
      />

    
    <div className="flex mt-4">

  <IonButton
    expand="block"
    fill="clear"
    color="none"
    className="bg-emerald-500! hover:bg-emerald-600!
               text-white! font-semibold 
               h-10 rounded-xl
               shadow-md hover:shadow-lg
               transition-all duration-300
               flex items-center justify-center gap-2"
    onClick={handleCreate}
  >
    <IonIcon icon={sendOutline} className="text-lg" />
    Submit
  </IonButton>

</div>
</div>
  </div>
</IonModal>

{/* EDIT MODAL */}
<IonModal isOpen={isEditOpen}>
  <div className="flex items-center justify-center h-full 
                  bg-slate-900/70 backdrop-blur-md">

    <div className="relative 
                    bg-linear-to-br from-slate-800 via-pink-600 to-slate-500
                    rounded-3xl p-8 w-full max-w-md
                    shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]
                    border border-indigo-500/20">

      {/* Close Icon */}
      <button
        onClick={() => setIsEditOpen(false)}
        className="absolute top-4 right-4 text-white/60 
                   hover:text-white transition duration-200"
      >
        <IonIcon icon={closeOutline} className="text-xl" />
      </button>

      {/* Title */}
      <h3 className="text-2xl font-semibold mb-6 text-center 
                     text-white tracking-wide">
        Edit Description
      </h3>

      {/* Input */}
      <IonInput
        className="mb-6 border border-white/20 rounded-xl p-3 
                   bg-white/10 text-white placeholder-white/60"
        value={selectedService?.description}
        onIonChange={(e) =>
          setSelectedService(
            selectedService
              ? { ...selectedService, description: e.detail.value! }
              : null
          )
        }
      />

      {/* Update Button */}
      <IonButton
        expand="block"
        fill="clear"
        color="none"
        className="bg-amber-500! hover:bg-amber-600!
                   text-white! font-semibold 
                   h-10 rounded-xl
                   shadow-md hover:shadow-lg
                   transition-all duration-300
                   flex items-center justify-center gap-2"
        onClick={handleEdit}
      >
        <IonIcon icon={refreshOutline} className="text-lg" />
        Update
      </IonButton>

    </div>
  </div>
</IonModal>


          <IonToast
            isOpen={showToast}
            message={toastMsg}
            duration={2000}
            onDidDismiss={() => setShowToast(false)}
          />
        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminServices;
