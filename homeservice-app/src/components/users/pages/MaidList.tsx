import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonAvatar,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonMenu,
  IonList,
  IonModal,
  IonIcon
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { closeOutline, chatbubbleEllipsesOutline } from "ionicons/icons";
import Logo from "../../assets/logo.jpg";
import DefaultAvatar from "../../assets/profile.png";
import { menuController } from "@ionic/core";
interface Maid {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  services: string[];
}

const dummyMaids: Maid[] = [
  { id: 1, name: "Ayesha Begum", phone: "+880 1111 2222", avatar: DefaultAvatar, services: ["Cleaning", "Cooking"] },
  { id: 2, name: "Fatima Akter", phone: "+880 3333 4444", avatar: DefaultAvatar, services: ["Babysitting"] },
  { id: 3, name: "Sohana Rahman", phone: "+880 5555 6666", avatar: DefaultAvatar, services: ["Cleaning", "Laundry"] },
  { id: 4, name: "Rina Khatun", phone: "+880 7777 8888", avatar: DefaultAvatar, services: ["Cooking"] },
  { id: 5, name: "Salma Parvin", phone: "+880 9999 0000", avatar: DefaultAvatar, services: ["Cleaning", "Cooking", "Babysitting"] },
];

const MaidListPage: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [serviceFilter, setServiceFilter] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedMaid, setSelectedMaid] = useState<Maid | null>(null);

  const filteredMaids = dummyMaids
    .filter((maid) => maid.name.toLowerCase().includes(searchText.toLowerCase()))
    .filter((maid) => (serviceFilter ? maid.services.includes(serviceFilter) : true))
    .sort((a, b) => (sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  const handleLogout = () => {
    setShowLogoutModal(false);
    history.push("/"); // Redirect to landing page
  };

  const Menu = (
    <IonMenu side="end" menuId="main-menu" contentId="main-content">
      <IonContent className="bg-white">
        <IonList className="mt-4">
          <IonItem button onClick={() => history.push("/home")}>
            <IonLabel>🏠 Home</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/profile")}>
            <IonLabel>👤 Profile</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/chat")}>
            <IonLabel>💬 Chat</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/maid-list")}>
            <IonLabel>🧹 Maid List</IonLabel>
          </IonItem>
          <IonItem
  button
  onClick={() => {
    history.push("/preferences"); // Navigate to preferences page
    menuController.close("main-menu");
  }}
>
  <IonLabel className="text-lg">⚙️ Preferences</IonLabel>
</IonItem>

          <IonItem button onClick={() => setShowLogoutModal(true)}>
            <IonLabel className="text-red-500">🚪 Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );

  return (
    <>
      {Menu}
      <IonPage id="main-content" className="bg-linear-to-b from-pink-50 via-white to-yellow-50">
        {/* Header */}
        <IonHeader>
          <IonToolbar className="flex justify-between items-center px-4 py-2 bg-pink-500 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <img src={Logo} alt="logo" className="w-8 h-8 object-cover rounded-full" />
              </div>
              <h1 className="text-l font-bold text-indigo-400">Maidigo</h1>
            </div>
            <IonButtons slot="end">
              <IonMenuButton menu="main-menu" className="text-white bg-yellow-500 p-2 rounded-lg shadow-md hover:bg-yellow-600" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {/* Content */}
        <IonContent className="p-4">
          {/* Search */}
          <IonInput
            value={searchText}
            placeholder="Search maids..."
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4 bg-white"
            onIonInput={(e: any) => setSearchText(e.target.value)}
          />

          {/* Sort */}
          <IonItem className="mb-4 bg-white rounded-xl shadow-md">
            <IonLabel>Sort by Name</IonLabel>
            <IonSelect value={sortOrder} onIonChange={(e: any) => setSortOrder(e.detail.value)}>
              <IonSelectOption value="asc">A-Z</IonSelectOption>
              <IonSelectOption value="desc">Z-A</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Filter by Service */}
          <IonItem className="mb-4 bg-white rounded-xl shadow-md">
            <IonLabel>Filter by Service</IonLabel>
            <IonSelect value={serviceFilter} onIonChange={(e: any) => setServiceFilter(e.detail.value)}>
              <IonSelectOption value="">All</IonSelectOption>
              <IonSelectOption value="Cleaning">Cleaning</IonSelectOption>
              <IonSelectOption value="Cooking">Cooking</IonSelectOption>
              <IonSelectOption value="Laundry">Laundry</IonSelectOption>
              <IonSelectOption value="Babysitting">Babysitting</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Maid List */}
          <div className="space-y-4">
            {filteredMaids.length > 0 ? (
              filteredMaids.map((maid) => (
                <div
                  key={maid.id}
                  className="flex items-center justify-between bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedMaid(maid)}
                >
                  <div className="flex items-center gap-3">
                    <IonAvatar className="w-12 h-12">
                      <img src={maid.avatar} alt={maid.name} />
                    </IonAvatar>
                    <div>
                      <h2 className="font-semibold text-gray-800">{maid.name}</h2>
                      <p className="text-gray-500 text-sm">{maid.phone}</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Services: {maid.services.join(", ")}
                      </p>
                    </div>
                  </div>
                  <IonButton
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering the modal
                      history.push(`/chat?maidId=${maid.id}`);
                    }}
                    className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl"
                  >
                    Chat
                  </IonButton>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No maids found</p>
            )}
          </div>
        </IonContent>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Logout</h2>
              <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-4">
                <IonButton
                  fill="outline"
                  color="medium"
                  onClick={() => setShowLogoutModal(false)}
                  className="px-6 py-2 rounded-xl hover:bg-gray-100"
                >
                  No
                </IonButton>
                <IonButton
                  color="danger"
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-xl hover:bg-red-600"
                >
                  Yes
                </IonButton>
              </div>
            </div>
          </div>
        )}

        {/* Maid Details Modal */}
        <IonModal isOpen={selectedMaid !== null} onDidDismiss={() => setSelectedMaid(null)}>
          {selectedMaid && (
            <div className="p-5 bg-white h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{selectedMaid.name}</h3>
                <IonButton fill="clear" onClick={() => setSelectedMaid(null)}>
                  <IonIcon icon={closeOutline} className="text-xl" />
                </IonButton>
              </div>
              <IonAvatar className="w-32 h-32 mx-auto mb-4">
                <img src={selectedMaid.avatar} alt={selectedMaid.name} />
              </IonAvatar>
              <p><strong>Phone:</strong> {selectedMaid.phone}</p>
              <p><strong>Services:</strong> {selectedMaid.services.join(", ")}</p>

              <IonButton
                expand="block"
                color="primary"
                className="mt-5"
                onClick={() => {
                  setSelectedMaid(null);
                  history.push(`/chat?maidId=${selectedMaid.id}`);
                }}
              >
                <IonIcon icon={chatbubbleEllipsesOutline} slot="start" />
                Chat with {selectedMaid.name}
              </IonButton>
            </div>
          )}
        </IonModal>
      </IonPage>
    </>
  );
};

export default MaidListPage;
