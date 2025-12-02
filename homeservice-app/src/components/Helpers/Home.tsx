// import React, { useState } from "react";
// import {
//   IonPage,
//   IonContent,
//   IonIcon,
//   IonSearchbar,
// } from "@ionic/react";
// import {
//   menu,
//   personCircle,
//   chatbubbles,
//   logOut,
//   restaurant,
//   sparkles,
//   people,
//   heart,
//   home,
//   time,
// } from "ionicons/icons";
// import { useHistory } from "react-router-dom";

// import Logo from "../assets/logo.jpg"; // ⭐ Import logo here

// const HelperHome: React.FC = () => {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const history = useHistory();

//   const jobCategories = [
//     { name: "Cooking", icon: restaurant },
//     { name: "Cleaning", icon: sparkles },
//     { name: "Babysitting", icon: people },
//     { name: "Elderly Care", icon: heart },
//     { name: "Full-time Maid", icon: home },
//     { name: "Part-time Maid", icon: time },
//   ];

//   return (
//     <IonPage>
//       <IonContent className="bg-gray-100">

//         {/* NAVBAR */}
//         <div className="w-full bg-white shadow-md p-4 flex items-center justify-between">
//           {/* LOGO + NAME */}
//         <div className="flex items-center space-x-3">
//   <div className="w-12 h-12 rounded-full bg-pink-100 border-2 border-pink-500 flex items-center justify-center shadow">
//     <img
//       src={Logo}
//       alt="maidigo logo"
//       className="w-10 h-10 object-contain"
//     />
//   </div>

//   <h1 className="text-xl font-bold text-indigo-400">Maidigo</h1>
// </div>


//           {/* HAMBURGER */}
//           <button
//             onClick={() => setOpenMenu(!openMenu)}
//             className="p-2 rounded-lg bg-pink-600 text-white shadow-md"
//           >
//             <IonIcon icon={menu} className="text-2xl" />
//           </button>
//         </div>

//         {/* SLIDE MENU */}
//         <div
//           className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-all duration-300 z-50
//             ${openMenu ? "translate-x-0" : "translate-x-full"}`}
//         >
//           <div className="p-4 border-b flex justify-end">
//             <button
//               className="text-gray-600 font-bold"
//               onClick={() => setOpenMenu(false)}
//             >
//               ✕
//             </button>
//           </div>

//           <div className="p-4 space-y-4">
//             {/* Profile */}
//             <div
//               className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 setOpenMenu(false);
//                 history.push("/helper/profile");
//               }}
//             >
//               <IonIcon icon={personCircle} className="text-2xl text-pink-600" />
//               <span className="text-lg font-medium">Profile</span>
//             </div>

//             {/* Chat */}
//             <div
//               className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 setOpenMenu(false);
//                 history.push("/helper/chat");
//               }}
//             >
//               <IonIcon icon={chatbubbles} className="text-2xl text-pink-600" />
//               <span className="text-lg font-medium">Chat</span>
//             </div>

//             {/* Logout */}
//             <div
//               className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 setOpenMenu(false);
//                 history.push("/login");
//               }}
//             >
//               <IonIcon icon={logOut} className="text-2xl text-red-500" />
//               <span className="text-lg font-medium text-red-500">Logout</span>
//             </div>
//           </div>
//         </div>

//         {/* OVERLAY */}
//         {openMenu && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-40 z-40"
//             onClick={() => setOpenMenu(false)}
//           ></div>
//         )}

//         {/* BANNER SECTION */}
//         <div className="w-full bg-pink-50 py-6 px-4 rounded-b-3xl shadow">
//           <h1 className="text-2xl font-bold text-pink-700">
//             Find Your Perfect Job
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Search for cooking, babysitting, cleaning & more jobs.
//           </p>

//           {/* MINI PROFILE CARD */}
//           <div className="mt-4 bg-white p-4 rounded-xl shadow flex items-center space-x-3">
//             <IonIcon icon={personCircle} className="text-4xl text-pink-600" />
//             <div>
//               <p className="font-bold text-gray-700">Hello, Maid Helper!</p>
//               <p className="text-gray-500 text-sm">Ready to work today?</p>
//             </div>
//           </div>

//           </div>

//         {/* MAIN CONTENT */}
//         <div className="p-4 mt-4">
//               {/* SEARCH BAR */}
//           <IonSearchbar
//             placeholder="Search job (Cooking, Cleaning, Babysitting...)"
//             className="mt-4 rounded-xl shadow bg-white"
//             value={searchText}
//             onIonChange={(e) => setSearchText(e.detail.value!)}
//           />
      
//           <h2 className="text-xl font-bold mb-3">Job Categories</h2>

//           <div className="grid grid-cols-2 gap-4">
//             {jobCategories
//               .filter((job) =>
//                 job.name.toLowerCase().includes(searchText.toLowerCase())
//               )
//               .map((job, i) => (
//                 <div
//                   key={i}
//                   className="bg-white p-5 rounded-xl shadow flex flex-col items-center hover:scale-105 transition cursor-pointer"
//                 >
//                   <IonIcon icon={job.icon} className="text-3xl text-pink-600" />
//                   <p className="mt-2 font-semibold">{job.name}</p>
//                 </div>
//               ))}
//           </div>
//         </div>

//       </IonContent>
//     </IonPage>
//   );
// };

// export default HelperHome;

import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonSearchbar,
  IonButton,
  IonModal,
} from "@ionic/react";
import {
  menu,
  personCircle,
  chatbubbles,
  logOut,
  restaurant,
  sparkles,
  people,
  heart,
  home,
  time,
  arrowForward,
  send,
  settings
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

import Logo from "../assets/logo.jpg";
import User1 from "../assets/profile.png";
import User2 from "../assets/profile.png";
import User3 from "../assets/profile.png";

const HelperHome: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const history = useHistory();

  const jobCategories = [
    { name: "Cooking (রান্না)", icon: restaurant },
    { name: "Cleaning (পরিষ্কার)", icon: sparkles },
    { name: "Babysitting (শিশু দেখাশোনা)", icon: people },
    { name: "Elderly Care (বয়স্কদের যত্ন)", icon: heart },
    { name: "Full-time Maid (ফুল-টাইম কাজ)", icon: home },
    { name: "Part-time Maid (পার্ট-টাইম কাজ)", icon: time },
  ];

  const userList = [
    { image: User1, name: "Priya Sharma", need: "Cooking (রান্না)" },
    { image: User2, name: "Rahul Verma", need: "Babysitting (শিশু দেখাশোনা)" },
    { image: User3, name: "Sneha Kaur", need: "Cleaning (পরিষ্কার)" },
    { image: User1, name: "Aditi Roy", need: "Cooking (রান্না)" },
    { image: User2, name: "Imran Hossain", need: "Cleaning (পরিষ্কার)" },
    { image: User3, name: "Kajal Das", need: "Full-time Maid (ফুল-টাইম)" },
    { image: User1, name: "Rita Paul", need: "Elderly Care (বয়স্কদের যত্ন)" },
    { image: User2, name: "Rohan Sen", need: "Part-time Maid (পার্ট-টাইম)" },
  ];

  const filteredUsers =
    selectedJob !== null
      ? userList.filter((u) =>
          u.need.toLowerCase().includes(selectedJob.toLowerCase())
        )
      : [];

  const handleLogout = () => {
    setShowLogoutModal(false);
    history.push("/login");
  };

  return (
    <IonPage>
      <IonContent className="bg-gray-100">

        {/* NAVBAR */}
        <div className="w-full bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-pink-100 border-2 border-pink-500 flex items-center justify-center shadow">
              <img src={Logo} alt="maidigo logo" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-xl font-bold text-indigo-500">
              Maidigo (মেইডিগো)
            </h1>
          </div>

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-2 rounded-lg bg-pink-600 text-white"
          >
            <IonIcon icon={menu} className="text-2xl" />
          </button>
        </div>

        {/* SIDE MENU */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-all duration-300 z-50
            ${openMenu ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4 border-b flex justify-end">
            <button className="text-gray-600 font-bold" onClick={() => setOpenMenu(false)}>
              ✕
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Profile */}
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => { setOpenMenu(false); history.push("/maid-profile"); }}
            >
              <IonIcon icon={personCircle} className="text-2xl text-pink-600" />
              <span className="text-lg font-medium">Profile (প্রোফাইল)</span>
            </div>

            {/* Chat */}
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => { setOpenMenu(false); history.push("/maid-chat"); }}
            >
              <IonIcon icon={chatbubbles} className="text-2xl text-pink-600" />
              <span className="text-lg font-medium">Chat (চ্যাট)</span>
            </div>
           <div
  className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
  onClick={() => { setOpenMenu(false); history.push("/maid-preferences"); }}
>
  <IonIcon icon={settings} className="text-2xl text-pink-600" />
  <span className="text-lg font-medium">Preferences (পছন্দসমূহ)</span>
</div>

            {/* Logout */}
            <div
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => { setOpenMenu(false); setShowLogoutModal(true); }}
            >
              <IonIcon icon={logOut} className="text-2xl text-red-500" />
              <span className="text-lg font-medium text-red-500">Logout (লগআউট)</span>
            </div>
          </div>
        </div>

        {openMenu && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setOpenMenu(false)}
          ></div>
        )}

        {/* BANNER */}
        <div className="w-full bg-pink-50 py-6 px-4 rounded-b-3xl shadow">
          <h1 className="text-2xl font-bold text-pink-700">
            Find Your Perfect Job (আপনার পছন্দের কাজ খুঁজুন)
          </h1>

          <p className="text-gray-600 mt-1">
            Search for cooking, cleaning, babysitting & more.  
            (রান্না, পরিষ্কার, শিশু দেখাশোনা আরও অনেক কাজ খুঁজুন)
          </p>

          <div className="mt-4 bg-white p-4 rounded-xl shadow flex items-center space-x-3">
            <IonIcon icon={personCircle} className="text-4xl text-pink-600" />
            <div>
              <p className="font-bold text-gray-700">Hello, Maid Helper! (হ্যালো, মেইড হেলপার!)</p>
              <p className="text-gray-500 text-sm">Ready to work today? (আজ কাজ করতে প্রস্তুত?)</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
    
<div className="p-4 mt-4 pb-24"> {/* Added pb-24 for spacing above bottom navbar */}
  <IonSearchbar
    placeholder="Search job (কাজ খুঁজুন)..."
    className="mt-2 rounded-xl shadow bg-white"
    value={searchText}
    onIonChange={(e) => setSearchText(e.detail.value!)}
  />

  {/* USER LIST SECTION */}
  <div className="mt-4 flex justify-between items-center">
    <h2 className="text-xl font-bold">
      User Preference List (ইউজার পছন্দ তালিকা)
    </h2>

    <button
      onClick={() => history.push("/helper/user-list")}
      className="text-pink-600 font-semibold flex items-center space-x-1"
    >
      <span>Show More (আরও দেখুন)</span>
      <IonIcon icon={arrowForward} />
    </button>
  </div>

  <div className="mt-3 space-y-3">
    {userList.map((user, i) => (
      <div key={i} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={user.image} alt="user" className="w-14 h-14 rounded-full object-cover" />
          <div>
            <p className="font-bold text-gray-800">{user.name}</p>
            <p className="text-gray-500 text-sm">Needs (প্রয়োজন): {user.need}</p>
          </div>
        </div>

        <IonButton
          shape="round"
          color="danger"
          onClick={() => history.push("/maid-chat")}
        >
          <IonIcon icon={send} className="mr-1" />
          Chat (চ্যাট)
        </IonButton>
      </div>
    ))}
  </div>

  {/* JOB CATEGORIES */}
  <h2 className="text-xl font-bold mt-6 mb-3">
    Job Categories (কাজের ক্যাটাগরি)
  </h2>

  <div className="grid grid-cols-2 gap-4">
    {jobCategories
      .filter((job) => job.name.toLowerCase().includes(searchText.toLowerCase()))
      .map((job, i) => (
        <div
          key={i}
          onClick={() => setSelectedJob(job.name)}
          className="bg-white p-5 rounded-xl shadow flex flex-col items-center border hover:border-pink-400 hover:scale-105 transition cursor-pointer"
        >
          <IonIcon icon={job.icon} className="text-3xl text-pink-600" />
          <p className="mt-2 font-semibold text-center">{job.name}</p>
        </div>
      ))}
  </div>

  {/* FILTERED USER LIST BELOW CATEGORY */}
  {selectedJob && (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-800">
        Users looking for (যারা খুঁজছে): {selectedJob}
      </h3>

      <div className="mt-3 space-y-3">
        {filteredUsers.map((user, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={user.image} alt="user" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <p className="font-bold text-gray-800">{user.name}</p>
                <p className="text-gray-500 text-sm">Needs: {user.need}</p>
              </div>
            </div>

            <IonButton
              shape="round"
              color="danger"
              onClick={() => history.push("/maid-chat")}
            >
              <IonIcon icon={send} className="mr-1" />
              Chat (চ্যাট)
            </IonButton>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


        {/* LOGOUT MODAL */}
        <IonModal isOpen={showLogoutModal}>
          <div className="flex items-center justify-center h-full w-full bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Are you sure you want to logout?{" "}
                <span className="text-pink-500">(আপনি কি লগআউট করতে চান?)</span>
              </h2>
              <div className="flex justify-center space-x-4 mt-4">
                <IonButton color="danger" onClick={handleLogout}>
                  Yes (হ্যাঁ)
                </IonButton>
                <IonButton color="medium" onClick={() => setShowLogoutModal(false)}>
                  No (না)
                </IonButton>
              </div>
            </div>
          </div>
        </IonModal>

        {/* BOTTOM NAVBAR */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner flex justify-around py-2">
          <button
            className="flex flex-col items-center text-pink-600"
            onClick={() => history.push("/helper-home")}
          >
            <IonIcon icon={home} className="text-2xl" />
            <span className="text-xs font-semibold">Home (হোম)</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-500"
            onClick={() => history.push("/maid-profile")}
          >
            <IonIcon icon={personCircle} className="text-2xl" />
            <span className="text-xs font-semibold">Profile (প্রোফাইল)</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-500"
            onClick={() => history.push("/helper/chat")}
          >
            <IonIcon icon={chatbubbles} className="text-2xl" />
            <span className="text-xs font-semibold">Chat (চ্যাট)</span>
          </button>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default HelperHome;
