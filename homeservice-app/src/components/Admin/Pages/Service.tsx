import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenu,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonList,
} from "@ionic/react";
import {
  menuOutline,
  closeOutline,
  addOutline,
  createOutline,
  trashOutline,
  homeOutline,
  personCircleOutline,
  settingsOutline,
  logOutOutline,
} from "ionicons/icons";

import logoImg from "../../assets/logo.jpg"; // Replace with your logo

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Cleaning", description: "Full house cleaning", price: "500" },
    { id: 2, name: "Cooking", description: "Home chef service", price: "800" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleAddService = () => {
    if (!newService.name || !newService.description || !newService.price) {
      alert("Please fill all fields");
      return;
    }
    const newId = services.length > 0 ? services[services.length - 1].id + 1 : 1;
    setServices([...services, { id: newId, ...newService }]);
    setNewService({ name: "", description: "", price: "" });
    setIsAddModalOpen(false);
  };

  const handleEditService = () => {
    if (!currentService) return;
    setServices(services.map(s => (s.id === currentService.id ? currentService : s)));
    setCurrentService(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteService = (id: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const redirect = (path: string) => {
    window.location.href = path;
  };

  return (
    <>
      {/* SIDE MENU */}
      <IonMenu side="end" menuId="adminMenu" contentId="adminContent" className="bg-white">
        <IonHeader>
          <IonToolbar className="bg-pink-600 text-pink-400 flex justify-between items-center">
            <IonTitle>Admin Menu</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => (window as any).document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-pink-50">
          <IonList className="mt-4">
            <IonMenuToggle autoHide={true}>
              <IonItem button onClick={() => redirect("/admin-profile")}>
                <IonIcon icon={personCircleOutline} className="mr-2 text-pink-600" />
                <IonLabel>Profile</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={true}>
              <IonItem button onClick={() => redirect("/admin-home")}>
                <IonIcon icon={homeOutline} className="mr-2 text-pink-600" />
                <IonLabel>Dashboard</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={true}>
              <IonItem button onClick={() => redirect("/admin-service")}>
                <IonIcon icon={settingsOutline} className="mr-2 text-pink-600" />
                <IonLabel>Services</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={true}>
              <IonItem button onClick={() => { localStorage.clear(); redirect("/login"); }}>
                <IonIcon icon={logOutOutline} className="mr-2 text-red-500" />
                <IonLabel className="text-red-500">Logout</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="adminContent">
        {/* Navbar */}
        <IonHeader>
          <IonToolbar className="bg-pink-600 text-white flex justify-between px-4">
            <div className="flex items-center gap-2">
         <img
              src={logoImg}
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
            />

              <IonTitle>Services</IonTitle>
            </div>
            <IonButtons slot="end">
              <IonButton onClick={() => (window as any).document.querySelector("ion-menu")?.open()}>
                <IonIcon icon={menuOutline} className="text-pink-600 text-2xl" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-pink-50 p-4 min-h-screen">
          {/* Add Service Button */}
          <div className="flex justify-end mb-4">
            <IonButton className="bg-pink-600 text-white flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
              <IonIcon icon={addOutline} />
              Add Service
            </IonButton>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <IonIcon icon={homeOutline} className="text-pink-600" />
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.description}</p>
                <p className="font-medium text-pink-600">Price: ₹{service.price}</p>
                <div className="flex gap-2 mt-2">
                  <IonButton size="small" className="bg-yellow-400 text-white flex-1" onClick={() => { setCurrentService(service); setIsEditModalOpen(true); }}>
                    <IonIcon icon={createOutline} />
                    Edit
                  </IonButton>
                  <IonButton size="small" className="bg-red-500 text-white flex-1" onClick={() => handleDeleteService(service.id)}>
                    <IonIcon icon={trashOutline} />
                    Delete
                  </IonButton>
                </div>
              </div>
            ))}
          </div>

          {/* Add Service Modal */}
          <IonModal isOpen={isAddModalOpen} backdropDismiss={true}>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Add Service</h2>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Service Name</IonLabel>
                  <IonInput value={newService.name} onIonChange={e => setNewService({ ...newService, name: e.detail.value! })} />
                </IonItem>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Description</IonLabel>
                  <IonInput value={newService.description} onIonChange={e => setNewService({ ...newService, description: e.detail.value! })} />
                </IonItem>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Price</IonLabel>
                  <IonInput type="number" value={newService.price} onIonChange={e => setNewService({ ...newService, price: e.detail.value! })} />
                </IonItem>
                <div className="flex gap-4 mt-4">
                  <IonButton expand="block" className="bg-pink-600 text-white" onClick={handleAddService}>
                    Add
                  </IonButton>
                  <IonButton expand="block" fill="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </IonButton>
                </div>
              </div>
            </div>
          </IonModal>

          {/* Edit Service Modal */}
          <IonModal isOpen={isEditModalOpen} backdropDismiss={true}>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Edit Service</h2>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Service Name</IonLabel>
                  <IonInput value={currentService?.name} onIonChange={e => setCurrentService(currentService ? { ...currentService, name: e.detail.value! } : null)} />
                </IonItem>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Description</IonLabel>
                  <IonInput value={currentService?.description} onIonChange={e => setCurrentService(currentService ? { ...currentService, description: e.detail.value! } : null)} />
                </IonItem>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Price</IonLabel>
                  <IonInput type="number" value={currentService?.price} onIonChange={e => setCurrentService(currentService ? { ...currentService, price: e.detail.value! } : null)} />
                </IonItem>
                <div className="flex gap-4 mt-4">
                  <IonButton expand="block" className="bg-pink-600 text-white" onClick={handleEditService}>
                    Save
                  </IonButton>
                  <IonButton expand="block" fill="outline" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </IonButton>
                </div>
              </div>
            </div>
          </IonModal>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminServices;
