// import React, { useState } from "react";
// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonButtons,
//   IonMenuButton,
//   IonContent,
//   IonMenu,
//   IonItem,
//   IonLabel,
//   IonSelect,
//   IonSelectOption,
//   IonInput,
//   IonButton,
//   IonIcon,
//   IonToast,
// } from "@ionic/react";
// import {
//   menuOutline,
//   closeOutline,
//   briefcaseOutline,
//   peopleOutline,
//   locationOutline,
//   timeOutline,
//   cashOutline,
// } from "ionicons/icons";
// import {
//   FaHome,
//   FaUser,
//   FaComment,
//   FaCog,
//   FaSignOutAlt,
//   FaBroom,
//   FaUtensils,
//   FaBaby,
//   FaUserNurse,
//   FaProcedures,
//   FaBuilding,
//   FaUsers,
// } from "react-icons/fa";
// import Logo from "../../assets/logo.jpg";// replace with your actual logo path
// import { useHistory } from "react-router-dom";

// const JobPreference = () => {
//   const history = useHistory();
//   const [selectedServices, setSelectedServices] = useState<number[]>([]);
//   const [gender, setGender] = useState("any");
//   const [experience, setExperience] = useState("0");
//   const [skills, setSkills] = useState("");
//   const [city, setCity] = useState("");
//   const [area, setArea] = useState("");
//   const [jobType, setJobType] = useState("full_time");
//   const [workMode, setWorkMode] = useState("live_out");
//   const [workingDays, setWorkingDays] = useState(6);
//   const [weeklyOff, setWeeklyOff] = useState("sunday");
//   const [accommodation, setAccommodation] = useState(false);
//   const [salary, setSalary] = useState<number | undefined>();
//   const [minAge, setMinAge] = useState<number | undefined>();
//   const [maxAge, setMaxAge] = useState<number | undefined>();
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");

//   const servicesList = [
//     { id: 1, name: "Cleaning" },
//     { id: 2, name: "Cooking" },
//     { id: 3, name: "Baby Sitting" },
//     { id: 4, name: "Elderly Care" },
//     { id: 5, name: "Patient Care" },
//     { id: 6, name: "Office Cleaning" },
//   ];

//   const toggleService = (id: number) => {
//     setSelectedServices((prev) =>
//       prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
//     );
//   };

//   const savePreferences = () => {
//     setToastMessage("Preferences Saved!");
//     setShowToast(true);
//     // Save logic here
//   };

//   return (
//     <IonPage>

//       {/* Side Menu */}
//       <IonMenu side="end" contentId="main-content" type="overlay">
//         <IonHeader>
//           <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600">
//             <div className="flex items-center justify-between px-4 py-2 w-full">
//               <span className="text-purple-300 font-bold text-lg">HelperGo</span>
//               <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
//                 <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
//               </IonButton>
//             </div>
//           </IonToolbar>
//         </IonHeader>

//         <IonContent className="bg-gray-50">
//           <div className="flex flex-col p-3 space-y-2">
//             <IonItem button className="rounded-xl hover:bg-indigo-100" routerLink="/home">
//               <FaHome className="text-indigo-600 mr-3" />
//               <IonLabel>Home</IonLabel>
//             </IonItem>

//             <IonItem button className="rounded-xl hover:bg-indigo-100" routerLink="/profile">
//               <FaUser className="text-purple-600 mr-3" />
//               <IonLabel>Profile</IonLabel>
//             </IonItem>

//             <IonItem button className="rounded-xl hover:bg-indigo-100" routerLink="/chat">
//               <FaComment className="text-pink-500 mr-3" />
//               <IonLabel>Chat</IonLabel>
//             </IonItem>
//  <IonItem button className="hover:bg-indigo-100 rounded-lg" routerLink="/maid-list">
//               <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
//               <IonLabel>Maid List</IonLabel>
//             </IonItem>
//             <IonItem button className="rounded-xl bg-indigo-100">
//               <FaCog className="text-indigo-600 mr-3" />
//               <IonLabel className="font-semibold text-indigo-600">
//                 Preferences
//               </IonLabel>
//             </IonItem>

//             <IonItem
//               button
//               className="rounded-xl hover:bg-red-100"
//               onClick={() => {
//                 localStorage.removeItem("access_token");
//                 history.push("/login");
//               }}
//             >
//               <FaSignOutAlt className="text-red-500 mr-3" />
//               <IonLabel className="text-red-500">Logout</IonLabel>
//             </IonItem>
//           </div>
//         </IonContent>
//       </IonMenu>

//       {/* Header */}
//       <IonHeader className="shadow-md">
//         <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
//           <div className="flex items-center justify-between w-full">
//             {/* Left: App Logo + Name */}
//             <div className="flex items-center gap-2">
//               <img src={Logo} alt="App Logo" className="w-10 h-10 rounded-full" />
//               <span className="text-indigo-400 font-bold text-lg">HelperGo</span>
//             </div>

//             {/* Center: Profile Name */}
//             {/* <div>
//               <span className="text-pink-400 font-semibold text-lg">{name || "User"}</span>
//             </div> */}

//             {/* Right: Hamburger */}
//             <IonButtons>
//               <IonMenuButton>
//                 <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
//                   <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//               </IonMenuButton>
//             </IonButtons>
//           </div>
//         </IonToolbar>
//       </IonHeader>

//       {/* Page Content */}
//       <IonContent id="main-content" fullscreen className="bg-linear-to-br from-indigo-200 via-purple-200 to-pink-200 py-10">
//         <div className="max-w-4xl mx-auto px-4">

//           {/* Form Card */}
//           <div className="bg-linear-to-r from-white/70 via-orange-100/50 to-white/70 backdrop-blur-md rounded-3xl p-6 shadow-2xl space-y-8">

//             {/* Title */}
//             <div className="text-center">
//               <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-500">
//                 Set Job Preference
//               </h1>
//               <p className="text-gray-700 mt-2">Customize your helper requirements easily</p>
//             </div>

//             {/* Services */}
//             <div className="bg-indigo-200/50 rounded-2xl p-4 shadow-inner">
//               <SectionTitle icon={briefcaseOutline} title="Select Services" />
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//                 {servicesList.map((service) => {
//                   const serviceIconMap: { [key: string]: { icon: React.ReactNode; color: string } } = {
//                     "Cleaning": { icon: <FaBroom className="text-3xl" />, color: "text-indigo-600" },
//                     "Cooking": { icon: <FaUtensils className="text-3xl" />, color: "text-red-500" },
//                     "Baby Sitting": { icon: <FaBaby className="text-3xl" />, color: "text-pink-500" },
//                     "Elderly Care": { icon: <FaUserNurse className="text-3xl" />, color: "text-purple-600" },
//                     "Patient Care": { icon: <FaProcedures className="text-3xl" />, color: "text-green-600" },
//                     "Office Cleaning": { icon: <FaBuilding className="text-3xl" />, color: "text-yellow-500" },
//                   };
//                   const { icon, color } = serviceIconMap[service.name] || { icon: <FaBroom className="text-3xl" />, color: "text-gray-600" };

//                   return (
//                     <div
//                       key={service.id}
//                       onClick={() => toggleService(service.id)}
//                       className={`cursor-pointer rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-300 shadow-md
//                         ${selectedServices.includes(service.id) ? "bg-indigo-500 text-white scale-105" : "bg-indigo-200 hover:bg-indigo-300"}`}
//                     >
//                       <div className={`${selectedServices.includes(service.id) ? "text-white" : color}`}>
//                         {icon}
//                       </div>
//                       <span className={`text-sm font-semibold text-center ${selectedServices.includes(service.id) ? "text-white" : "text-gray-800"}`}>
//                         {service.name}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Location */}
//          <div className="bg-purple-200 rounded-2xl p-4 shadow-inner space-y-4">
//            <SectionTitle icon={locationOutline} title="Location" />
//            <IonItem className="rounded-xl bg-purple-200">
//              <IonLabel position="stacked">City</IonLabel>
//              <IonInput value={city} onIonChange={e => setCity(e.detail.value!)} placeholder="Enter City" />
//            </IonItem>
//            <IonItem className="rounded-xl bg-purple-200">
//             <IonLabel position="stacked">Area</IonLabel>
//              <IonInput value={area} onIonChange={e => setArea(e.detail.value!)} placeholder="Enter Area" />
//            </IonItem>
//          </div>

//          {/* Work Details */}
//          <div className="bg-blue-100 rounded-2xl p-4 shadow-inner space-y-4">
//            <SectionTitle icon={timeOutline} title="Work Details" />
//            <IonItem className="bg-blue-200 rounded-xl">
//              <IonLabel>Job Type</IonLabel>
//              <IonSelect value={jobType} onIonChange={e => setJobType(e.detail.value)}>
//                <IonSelectOption value="full_time">Full Time</IonSelectOption>
//                <IonSelectOption value="part_time">Part Time</IonSelectOption>
//              </IonSelect>
//            </IonItem>
//            <IonItem className="bg-blue-200 rounded-xl">
//              <IonLabel>Work Mode</IonLabel>
//              <IonSelect value={workMode} onIonChange={e => setWorkMode(e.detail.value)}>
//                <IonSelectOption value="live_out">Live Out</IonSelectOption>
//                <IonSelectOption value="live_in">Live In</IonSelectOption>
//              </IonSelect>
//           </IonItem>
//            <IonItem className="bg-blue-200 rounded-xl px-4 py-2 flex justify-between items-center shadow-inner hover:shadow-lg transition-all duration-300">
//              <span className="text-blue-700 font-semibold">Working Days Per Week</span>
//              <IonInput
//               type="number"
//               value={workingDays}
//               onIonChange={e => setWorkingDays(Number(e.detail.value))}
//               placeholder="6"
//               className="w-16 text-center rounded-full bg-blue-100/80 p-2 text-blue-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             />
//           </IonItem>
//           <IonItem className="bg-blue-200 rounded-xl">
//             <IonLabel>Weekly Off Day</IonLabel>
//             <IonSelect value={weeklyOff} onIonChange={e => setWeeklyOff(e.detail.value)}>
//               {["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].map(day => (
//                 <IonSelectOption key={day} value={day}>{day.charAt(0).toUpperCase()+day.slice(1)}</IonSelectOption>
//               ))}
//             </IonSelect>
//           </IonItem>
//           <IonItem className="bg-blue-200 rounded-xl">
//             <IonLabel>Accommodation Provided</IonLabel>
//             <IonSelect value={accommodation} onIonChange={e => setAccommodation(e.detail.value)}>
//               <IonSelectOption value={true}>Yes</IonSelectOption>
//               <IonSelectOption value={false}>No</IonSelectOption>
//             </IonSelect>
//           </IonItem>
//         </div>

//         {/* Salary & Age */}
//         <div className="bg-pink-100/50 rounded-2xl p-4 shadow-inner space-y-4">
//           <SectionTitle icon={cashOutline} title="Salary & Age" />
//           <div className="flex flex-col items-center">
//             <label className="text-indigo-600 font-medium mb-2 text-m">Monthly Salary</label>
//             <IonInput
//               type="number"
//               value={salary}
//               onIonChange={e => setSalary(Number(e.detail.value))}
//               placeholder="Enter Amount"
//               className="w-3/4 text-center rounded-full bg-pink-200/80 p-3 text-pink-900 font-semibold placeholder-pink-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
//             />
//           </div>
//           <div className="flex gap-4 justify-center">
//             <div className="flex-1 flex flex-col items-center">
//               <label className="text-indigo-600 font-medium mb-2 text-m">Min Age</label>
//               <IonInput
//                 type="number"
//                 value={minAge}
//                 onIonChange={e => setMinAge(Number(e.detail.value))}
//                 placeholder="Min Age"
//                 className="w-3/4 text-center rounded-full bg-pink-200/80 p-3 text-pink-900 font-semibold placeholder-pink-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
//               />
//             </div>
//             <div className="flex-1 flex flex-col items-center">
//               <label className="text-indigo-600 font-medium mb-2 text-m">Max Age</label>
//               <IonInput
//                 type="number"
//                 value={maxAge}
//                 onIonChange={e => setMaxAge(Number(e.detail.value))}
//                 placeholder="Max Age"
//                 className="w-3/4 text-center rounded-full bg-pink-200/80 p-3 text-pink-900 font-semibold placeholder-pink-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
//               />
//             </div>
//           </div>
//         </div>

//        <div className="bg-emerald-100/50 rounded-2xl p-6 shadow-inner space-y-4">
//   <SectionTitle icon={peopleOutline} title="Helper Preference" />

//   {/* Gender */}
//   <IonItem className="bg-emerald-200 rounded-xl">
//     <IonLabel>Gender</IonLabel>
//     <IonSelect value={gender} onIonChange={e => setGender(e.detail.value)}>
//       <IonSelectOption value="any">Any</IonSelectOption>
//       <IonSelectOption value="female">Female</IonSelectOption>
//       <IonSelectOption value="male">Male</IonSelectOption>
//     </IonSelect>
//   </IonItem>

//   {/* Experience */}
//   <IonItem className="bg-emerald-200 rounded-xl">
//     <IonLabel>Experience</IonLabel>
//     <IonSelect value={setExperience} onIonChange={e => setExperience(e.detail.value)}>
//       <IonSelectOption value="0">0 Years</IonSelectOption>
//       <IonSelectOption value="1">1 Year</IonSelectOption>
//       <IonSelectOption value="2">2 Years</IonSelectOption>
//       <IonSelectOption value="3">3+ Years</IonSelectOption>
//     </IonSelect>
//   </IonItem>

//   {/* Skills */}
//   <IonItem className="bg-emerald-200 rounded-xl">
//     <IonLabel position="stacked">Skills</IonLabel>
//     <IonInput
//       value={skills}
//       placeholder="Enter Skills (comma separated)"
//       onIonChange={e => setSkills(e.detail.value!)}
//       className="text-sm"
//     />
//   </IonItem>
// </div>


//             <IonButton
//               expand="block"
//               className="h-14 rounded-2xl text-lg font-semibold bg-linear-to-r from-indigo-600 to-pink-500 shadow-xl hover:scale-105 transition-all duration-300"
//               onClick={savePreferences}
//             >
//               Save Preferences
//             </IonButton>

//           </div>
//         </div>

//         <IonToast
//           isOpen={showToast}
//           onDidDismiss={() => setShowToast(false)}
//           message={toastMessage}
//           duration={2000}
//           color="primary"
//         />
//       </IonContent>
//     </IonPage>
//   );
// };

// const SectionTitle = ({ icon, title }: any) => (
//   <div className="flex items-center gap-2 text-indigo-700 font-semibold text-lg">
//     <IonIcon icon={icon} className="text-xl" />
//     {title}
//   </div>
// );

// export default JobPreference;

import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonMenu,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonIcon,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import {
  menuOutline,
  closeOutline,
  briefcaseOutline,
  peopleOutline,
  locationOutline,
  timeOutline,
  cashOutline,
} from "ionicons/icons";
import {
  FaHome,
  FaUser,
  FaComment,
  FaCog,
  FaSignOutAlt,
  FaBroom,
  FaUtensils,
  FaBaby,
  FaUserNurse,
  FaProcedures,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";
import Logo from "../../assets/logo.jpg";
import { useHistory } from "react-router-dom";

const JobPreference = () => {
  const history = useHistory();

  // State
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [jobType, setJobType] = useState("full_time");
  const [workMode, setWorkMode] = useState("live_out");
  const [workingDays, setWorkingDays] = useState<number>(6);
  const [weeklyOff, setWeeklyOff] = useState("sunday");
  const [accommodation, setAccommodation] = useState(false);
  const [salary, setSalary] = useState<number>();
  
  const [gender, setGender] = useState("any");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [minSalary, setMinSalary] = useState<number | null>(null);
const [maxSalary, setMaxSalary] = useState<number | null>(null);

const [minAge, setMinAge] = useState<number | null>(null);
const [maxAge, setMaxAge] = useState<number | null>(null);

  const API_BASE1 = "http://192.168.0.187:9830";


  const token = localStorage.getItem("access_token"); // Authorization

  // 🧠 Fetch All Available Services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE1}/services/getall`);
      const data = await res.json();
      setServicesList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


// Keep a state to store initially fetched service IDs
const [initialServices, setInitialServices] = useState<string[]>([]);

const fetchMyPreferences = async () => {
  try {
    const res = await fetch(`${API_BASE1}/seeker/my-preferences`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return;

    const pref = await res.json();
    if (!pref) return;

    // Prefill selected services
    const serviceIds = pref.services?.map((s: any) => s.id) || [];
    setSelectedServices(serviceIds);
    setInitialServices(serviceIds); // store initial services

    // Location
    setCity(pref.details.location?.city || "");
    setArea(pref.details.location?.area || "");

    // Work Details
    setJobType(pref.details.work?.job_type || "full_time");
    setWorkMode(pref.details.work?.work_mode || "live_out");
    setWorkingDays(pref.details.work?.working_days || 6);
    setWeeklyOff(pref.details.work?.weekly_off?.toLowerCase() || "sunday");
    setAccommodation(pref.details.work?.accommodation || false);

    // Salary
    setMinSalary(pref.details.requirements?.min_salary || null);
    setMaxSalary(pref.details.requirements?.max_salary || null);

    // Age
    setMinAge(pref.details.requirements?.min_age);
    setMaxAge(pref.details.requirements?.max_age);

    // Gender
    setGender(pref.details.requirements?.gender || "any");

    // Experience
    setExperience(pref.details.requirements?.experience || "");

    // Skills
    setSkills(pref.details.helper_details?.skills || "");

  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  fetchServices();
  if (token) fetchMyPreferences();
}, []);
 

// Toggle service selection
const toggleService = (id: string) => {
  setSelectedServices((prev) =>
    prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
  );
};


// 🔥 UPDATE FUNCTION (NO latestValues)
const updatePreferences = async () => {
  try {
    const removedServiceIds = initialServices.filter(
      id => !selectedServices.includes(id)
    );

    const body = {
      service_ids: selectedServices,
      remove_service_ids: removedServiceIds.length
        ? removedServiceIds
        : null,
      location: { city, area },
      job_type: jobType,
      work_mode: workMode,
      work_schedule: {
        working_days_per_week: workingDays,
        weekly_off_day: weeklyOff,
        accommodation_provided: accommodation,
      },
      salary_range: {
        min: minSalary,
        max: maxSalary,
      },
      gender,
      age_range: {
        min: minAge,
        max: maxAge,
      },
      experience,
      skills,
    };

    const res = await fetch(`${API_BASE1}/seeker/updatepreferences`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    setToastMessage(data?.message || "Preferences updated successfully");
    setShowToast(true);

    // Update initial services after successful PATCH
    setInitialServices([...selectedServices]);

  } catch (err) {
    console.error(err);
    setToastMessage("Error updating preferences");
    setShowToast(true);
  }
};
  // 🔥 SAVE FUNCTION FIXED (salary → minSalary/maxSalary)
const savePreferences = async () => {
  const body = {
    service_ids: selectedServices,
    location: { city, area },
    job_type: jobType,
    work_mode: workMode,
    work_schedule: {
      working_days_per_week: workingDays,
      weekly_off_day: weeklyOff,
      accommodation_provided: accommodation,
    },
    salary_range: {
      min: minSalary,
      max: maxSalary,
    },
    gender,
    age_range: {
      min: minAge,
      max: maxAge,
    },
    experience,
    skills,
  };

  try {
    const res = await fetch(`${API_BASE1}/seeker/addpreferences`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    setToastMessage(data?.message || "Saved Successfully");
    setShowToast(true);

    // After first save → treat as existing preferences
    setInitialServices([...selectedServices]);

  } catch (err) {
    console.error(err);
    setToastMessage("Error saving");
    setShowToast(true);
  }
};
  return (
    <IonPage>

      {/* Side Menu */}
      <IonMenu side="end" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center justify-between px-4 py-2 w-full">
              <span className="text-purple-300 font-bold text-lg">HelperGo</span>
              <IonButton fill="clear" onClick={() => document.querySelector("ion-menu")?.close()}>
                <IonIcon icon={closeOutline} className="text-pink-500 text-xl" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-gray-50">
          <div className="flex flex-col p-3 space-y-2">
            <IonItem button className="rounded-xl hover:bg-indigo-100" routerLink="/home">
              <FaHome className="text-indigo-600 mr-3" />
              <IonLabel>Home</IonLabel>
            </IonItem>

            <IonItem button className="rounded-xl hover:bg-indigo-100" routerLink="/profile">
              <FaUser className="text-purple-600 mr-3" />
              <IonLabel>Profile</IonLabel>
            </IonItem>

            <IonItem button className="rounded-xl hover:bg-indigo-100" routerLink="/chat">
              <FaComment className="text-pink-500 mr-3" />
              <IonLabel>Chat</IonLabel>
            </IonItem>
 <IonItem button className="hover:bg-indigo-100 rounded-lg" routerLink="/maid-list">
              <FaUsers className="text-purple-400 w-5 h-5 mr-3" />
              <IonLabel>Helper List</IonLabel>
            </IonItem>
            <IonItem button className="rounded-xl bg-indigo-100">
              <FaCog className="text-indigo-600 mr-3" />
              <IonLabel className="font-semibold text-indigo-600">
                Preferences
              </IonLabel>
            </IonItem>

            <IonItem
              button
              className="rounded-xl hover:bg-red-100"
              onClick={() => {
                localStorage.removeItem("access_token");
                history.push("/login");
              }}
            >
              <FaSignOutAlt className="text-red-500 mr-3" />
              <IonLabel className="text-red-500">Logout</IonLabel>
            </IonItem>
          </div>
        </IonContent>
      </IonMenu>

      {/* Header */}
      <IonHeader className="shadow-md">
        <IonToolbar className="bg-linear-to-r from-indigo-600 to-purple-600 px-4">
          <div className="flex items-center justify-between w-full">
            {/* Left: App Logo + Name */}
            <div className="flex items-center gap-2">
              <img src={Logo} alt="App Logo" className="w-10 h-10 rounded-full" />
              <span className="text-indigo-400 font-bold text-lg">HelperGo</span>
            </div>

            {/* Center: Profile Name */}
            {/* <div>
              <span className="text-pink-400 font-semibold text-lg">{name || "User"}</span>
            </div> */}

            {/* Right: Hamburger */}
            <IonButtons>
              <IonMenuButton>
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition">
                  <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 4H3a1 1 0 100 2h14a1 1 0 100-2zm0 6H3a1 1 0 100 2h14a1 1 0 100-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </IonMenuButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>


       {/* Page Content */}
     <IonContent id="main-content" fullscreen className="bg-linear-to-br from-indigo-200 via-purple-200 to-pink-200 py-10">
  <div className="max-w-4xl mx-auto px-4">

    {/* Form Card */}
    <div className="bg-linear-to-r from-white/70 via-orange-100/50 to-white/70 backdrop-blur-md rounded-3xl p-6 shadow-2xl space-y-8">

      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-500">
          Set Job Preference
        </h1>
        <p className="text-gray-700 mt-2">Customize your helper requirements easily</p>
      </div>

      {/* Services */}
      <div className="bg-indigo-200/50 rounded-2xl p-4 shadow-inner">
        <SectionTitle icon={briefcaseOutline} title="Select Services" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {servicesList.map((service) => {
            const serviceIconMap: { [key: string]: { icon: React.ReactNode; color: string } } = {
              "Cleaning": { icon: <FaBroom className="text-3xl" />, color: "text-indigo-600" },
              "Cooking": { icon: <FaUtensils className="text-3xl" />, color: "text-red-500" },
              "Baby Sitting": { icon: <FaBaby className="text-3xl" />, color: "text-pink-500" },
              "Elderly Care": { icon: <FaUserNurse className="text-3xl" />, color: "text-purple-600" },
              "Patient Care": { icon: <FaProcedures className="text-3xl" />, color: "text-green-600" },
              "Office Cleaning": { icon: <FaBuilding className="text-3xl" />, color: "text-yellow-500" },
            };
            const { icon, color } = serviceIconMap[service.name] || { icon: <FaBroom className="text-3xl" />, color: "text-gray-600" };

            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`cursor-pointer rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-300 shadow-md
                  ${selectedServices.includes(service.id) ? "bg-indigo-500 text-white scale-105" : "bg-indigo-200 hover:bg-indigo-300"}`}
              >
                <div className={`${selectedServices.includes(service.id) ? "text-white" : color}`}>
                  {icon}
                </div>
                <span className={`text-sm font-semibold text-center ${selectedServices.includes(service.id) ? "text-white" : "text-gray-800"}`}>
                  {service.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div className="bg-purple-200 rounded-2xl p-4 shadow-inner space-y-4">
        <SectionTitle icon={locationOutline} title="Location" />
        <IonItem className="rounded-xl bg-purple-200">
          <IonLabel position="stacked">City</IonLabel>
          <IonInput value={city} onIonChange={e => setCity(e.detail.value!)} placeholder="Enter City" />
        </IonItem>
        <IonItem className="rounded-xl bg-purple-200">
          <IonLabel position="stacked">Area</IonLabel>
          <IonInput value={area} onIonChange={e => setArea(e.detail.value!)} placeholder="Enter Area" />
        </IonItem>
      </div>

      {/* Work Details */}
      <div className="bg-blue-100 rounded-2xl p-4 shadow-inner space-y-4">
        <SectionTitle icon={timeOutline} title="Work Details" />
        <IonItem className="bg-blue-200 rounded-xl">
          <IonLabel>Job Type</IonLabel>
          <IonSelect value={jobType} onIonChange={e => setJobType(e.detail.value)}>
            <IonSelectOption value="full_time">Full Time</IonSelectOption>
            <IonSelectOption value="part_time">Part Time</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem className="bg-blue-200 rounded-xl">
          <IonLabel>Work Mode</IonLabel>
          <IonSelect value={workMode} onIonChange={e => setWorkMode(e.detail.value)}>
            <IonSelectOption value="live_out">Live Out</IonSelectOption>
            <IonSelectOption value="live_in">Live In</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem className="bg-blue-200 rounded-xl px-4 py-2 flex justify-between items-center shadow-inner hover:shadow-lg transition-all duration-300">
          <span className="text-blue-700 font-semibold">Working Days Per Week</span>
          <IonInput
            type="number"
            value={workingDays}
            onIonChange={e => setWorkingDays(Number(e.detail.value))}
            placeholder="6"
            className="w-16 text-center rounded-full bg-blue-100/80 p-2 text-blue-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </IonItem>
        <IonItem className="bg-blue-200 rounded-xl">
          <IonLabel>Weekly Off Day</IonLabel>
          <IonSelect value={weeklyOff} onIonChange={e => setWeeklyOff(e.detail.value)}>
            <IonSelectOption value="none">No Day Off</IonSelectOption>
            {["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].map(day => (
              <IonSelectOption key={day} value={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem className="bg-blue-200 rounded-xl">
          <IonLabel>Accommodation Provided</IonLabel>
          <IonSelect value={accommodation} onIonChange={e => setAccommodation(e.detail.value)}>
          
            <IonSelectOption value={true}>Yes</IonSelectOption>
            <IonSelectOption value={false}>No</IonSelectOption>
          </IonSelect>
        </IonItem>
      </div>

{/* Salary & Age Section */}
<div className="bg-linear-to-br from-pink-100/60 to-purple-100/60 rounded-3xl p-8 shadow-xl space-y-10">

  <SectionTitle icon={cashOutline} title="Salary & Age Preference" />

  <div className="grid md:grid-cols-2 gap-10">

    {/* ========== Salary Card ========== */}
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg space-y-6 hover:shadow-2xl transition">

      <h3 className="text-center text-indigo-700 font-bold text-lg">
        Monthly Salary Range
      </h3>

      <div className="flex items-center gap-4">

        {/* Min Salary */}
       <div className="flex-1">
          <label className="block text-sm font-semibold text-indigo-600 mb-2">
            Min Salary
          </label>
          <IonInput
            type="number"
            value={minSalary ?? ""}
            placeholder="Minimum"
            className="w-full text-center rounded-xl bg-pink-200/80 p-3 text-pink-900 font-semibold shadow-inner focus:ring-2 focus:ring-pink-400 transition"
            onIonInput={(e: any) =>
              setMinSalary(e.target.value ? Number(e.target.value) : null)
            }
          />
        </div>

        <div className="text-pink-500 font-bold text-2xl mt-6">—</div>

        {/* Max Salary */}
         <div className="flex-1">
          <label className="block text-sm font-semibold text-indigo-600 mb-2">
            Max Salary
          </label>
          <IonInput
            type="number"
            value={maxSalary ?? ""}
            placeholder="Maximum"
            className="w-full text-center rounded-xl bg-pink-200/80 p-3 text-pink-900 font-semibold shadow-inner focus:ring-2 focus:ring-pink-400 transition"
            onIonInput={(e: any) =>
              setMaxSalary(e.target.value ? Number(e.target.value) : null)
            }
          />
        </div>

      </div>
    </div>

    {/* ========== Age Card ========== */}
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg space-y-6 hover:shadow-2xl transition">

      <h3 className="text-center text-indigo-700 font-bold text-lg">
        Age Range
      </h3>

      <div className="flex items-center gap-4">

        {/* Min Age */}
       <div className="flex-1">
          <label className="block text-sm font-semibold text-indigo-600 mb-2">
            Min Age
          </label>
          <IonInput
            type="number"
            value={minAge ?? ""}
            placeholder="Minimum"
            className="w-full text-center rounded-xl bg-purple-200/80 p-3 text-purple-900 font-semibold shadow-inner focus:ring-2 focus:ring-purple-400 transition"
            onIonInput={(e: any) =>
              setMinAge(e.target.value ? Number(e.target.value) : null)
            }
          />
        </div>

        <div className="text-purple-500 font-bold text-2xl mt-6">—</div>

        {/* Max Age */}
       <div className="flex-1">
          <label className="block text-sm font-semibold text-indigo-600 mb-2">
            Max Age
          </label>
          <IonInput
            type="number"
            value={maxAge ?? ""}
            placeholder="Maximum"
            className="w-full text-center rounded-xl bg-purple-200/80 p-3 text-purple-900 font-semibold shadow-inner focus:ring-2 focus:ring-purple-400 transition"
            onIonInput={(e: any) =>
              setMaxAge(e.target.value ? Number(e.target.value) : null)
            }
          />
        </div>

      </div>
    </div>

  </div>
</div>


{/* Save Button */}

      {/* Helper Preference */}
      <div className="bg-emerald-100/50 rounded-2xl p-6 shadow-inner space-y-4">
        <SectionTitle icon={peopleOutline} title="Helper Preference" />
        <IonItem className="bg-emerald-200 rounded-xl">
          <IonLabel>Gender</IonLabel>
          <IonSelect value={gender} onIonChange={e => setGender(e.detail.value)}>
            <IonSelectOption value="any">Any</IonSelectOption>
            <IonSelectOption value="female">Female</IonSelectOption>
            <IonSelectOption value="male">Male</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Experience */}
        <IonItem className="bg-emerald-100/60 rounded-2xl p-4 shadow-inner">
          <div className="w-full space-y-4">
            <IonLabel className="text-emerald-700 font-semibold text-md">Experience (Years)</IonLabel>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-emerald-600 font-medium">Quick Select</label>
                <IonSelect
                  interface="popover"
                  placeholder="Select"
                  value={experience}
                  onIonChange={e => setExperience(e.detail.value)}
                  className="bg-white rounded-xl px-3 py-2 shadow-sm border border-emerald-200"
                >
                  <IonSelectOption value="0">0 Years</IonSelectOption>
                  <IonSelectOption value="1">1 Year</IonSelectOption>
                  <IonSelectOption value="2">2 Years</IonSelectOption>
                  <IonSelectOption value="3">3+ Years</IonSelectOption>
                </IonSelect>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm text-emerald-600 font-medium">Custom Input</label>
                <IonInput
                  type="number"
                  min="0"
                  value={experience}
                  onIonChange={e => setExperience(e.detail.value!)}
                  placeholder="Enter years"
                  className="bg-white rounded-xl px-3 py-2 shadow-sm border border-emerald-200 text-center font-medium"
                />
              </div>
            </div>
          </div>
        </IonItem>

        {/* Skills */}
        <IonItem className="bg-emerald-200 rounded-xl">
          <IonLabel position="stacked">Skills</IonLabel>
          <IonInput
            value={skills}
            placeholder="Enter Skills (comma separated)"
            onIonChange={e => setSkills(e.detail.value!)}
            className="text-sm"
          />
        </IonItem>
      </div>

      {/* Save Button */}
   <IonButton
  expand="block"
  className="h-14 mt-8 rounded-2xl text-lg font-bold bg-linear-to-r from-indigo-600 to-pink-500 shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
  onClick={async () => {
    try {
      if (initialServices.length > 0) {
        await updatePreferences();
      } else {
        await savePreferences();
      }
    } catch (err) {
      console.error(err);
      setToastMessage("Something went wrong");
      setShowToast(true);
    }
  }}
>
  Save Preferences
</IonButton>

    </div>
  </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

const SectionTitle = ({ icon, title }: any) => (
  <div className="flex items-center gap-2 text-indigo-700 font-semibold text-lg">
    <IonIcon icon={icon} className="text-xl" />
    {title}
  </div>
);

export default JobPreference;

  