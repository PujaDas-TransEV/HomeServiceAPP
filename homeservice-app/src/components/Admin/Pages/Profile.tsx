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
  mailOutline,
  callOutline,
  settingsOutline,
  logOutOutline,
  personCircleOutline,
  homeOutline,
} from "ionicons/icons";

import logoImg from "../../assets/logo.jpg"; // Admin profile image

const AdminProfile: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [admin, setAdmin] = useState({
    name: "Puja Das",
    role: "Super Admin",
    email: "admin@example.com",
    phone: "+91 9876543210",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleSaveProfile = () => {
    setIsEditModalOpen(false);
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    setIsPasswordModalOpen(false);
    alert("Password changed successfully!");
    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
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
            {/* Close Button */}
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
              <IonItem button onClick={handleLogout}>
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
            <IonTitle>Admin Profile</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => (window as any).document.querySelector("ion-menu")?.open()}>
                <IonIcon icon={menuOutline} className="text-pink-600 text-2xl" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-pink-50 p-4 min-h-screen flex flex-col items-center">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center mb-6 w-full max-w-md">
            <img
              src={logoImg}
              alt="Admin"
              className="w-28 h-28 rounded-full border-4 border-pink-500 mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800">{admin.name}</h2>
            <p className="text-pink-600 font-medium mb-4">{admin.role}</p>

            {/* Contact Info */}
            <div className="w-full flex flex-col gap-3 mb-4">
              <div className="flex items-center gap-3 bg-pink-50 rounded-lg p-3 shadow-sm w-full">
                <IonIcon icon={mailOutline} className="text-pink-600 text-xl" />
                <span className="text-gray-700">{admin.email}</span>
              </div>
              <div className="flex items-center gap-3 bg-pink-50 rounded-lg p-3 shadow-sm w-full">
                <IonIcon icon={callOutline} className="text-pink-600 text-xl" />
                <span className="text-gray-700">{admin.phone}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <IonButton
                expand="block"
                className="bg-pink-600 hover:bg-pink-700 text-white"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Profile
              </IonButton>
              <IonButton
                expand="block"
                className="bg-white border border-pink-600 text-pink-600 hover:bg-pink-50"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Change Password
              </IonButton>
            </div>
          </div>

          {/* Edit Profile Modal */}
          <IonModal isOpen={isEditModalOpen} backdropDismiss={true}>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Name</IonLabel>
                  <IonInput
                    value={admin.name}
                    onIonChange={(e) => setAdmin({ ...admin, name: e.detail.value! })}
                  />
                </IonItem>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    value={admin.email}
                    onIonChange={(e) => setAdmin({ ...admin, email: e.detail.value! })}
                  />
                </IonItem>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Phone</IonLabel>
                  <IonInput
                    value={admin.phone}
                    onIonChange={(e) => setAdmin({ ...admin, phone: e.detail.value! })}
                  />
                </IonItem>
                <div className="flex gap-4 mt-4">
                  <IonButton expand="block" className="bg-pink-600 text-white" onClick={handleSaveProfile}>
                    Save
                  </IonButton>
                  <IonButton expand="block" fill="outline" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </IonButton>
                </div>
              </div>
            </div>
          </IonModal>

          {/* Change Password Modal */}
          <IonModal isOpen={isPasswordModalOpen} backdropDismiss={true}>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Old Password</IonLabel>
                  <IonInput
                    type="password"
                    value={passwords.oldPassword}
                    onIonChange={(e) => setPasswords({ ...passwords, oldPassword: e.detail.value! })}
                  />
                </IonItem>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">New Password</IonLabel>
                  <IonInput
                    type="password"
                    value={passwords.newPassword}
                    onIonChange={(e) => setPasswords({ ...passwords, newPassword: e.detail.value! })}
                  />
                </IonItem>
                <IonItem className="mb-3">
                  <IonLabel position="stacked">Confirm Password</IonLabel>
                  <IonInput
                    type="password"
                    value={passwords.confirmPassword}
                    onIonChange={(e) => setPasswords({ ...passwords, confirmPassword: e.detail.value! })}
                  />
                </IonItem>
                <div className="flex gap-4 mt-4">
                  <IonButton expand="block" className="bg-pink-600 text-white" onClick={handleChangePassword}>
                    Change
                  </IonButton>
                  <IonButton expand="block" fill="outline" onClick={() => setIsPasswordModalOpen(false)}>
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

export default AdminProfile;
