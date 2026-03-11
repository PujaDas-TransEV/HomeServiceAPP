// pages/HelperBookingPage.tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonDatetime,
  IonRadioGroup,
  IonRadio,
  IonCheckbox
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const HelperBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // helperId passed from MaidList
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [selectedMaid, setSelectedMaid] = useState<string | null>(id || null);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [workDetails, setWorkDetails] = useState({
    rooms: "",
    kitchen: false,
    bathroom: false,
    peopleCooking: "",
    instructions: ""
  });
  const [duration, setDuration] = useState<string | null>(null);
  const [maidPreference, setMaidPreference] = useState({
    female: false,
    experienced: false,
    language: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handleBooking = () => {
    const bookingData = {
      fullName,
      phone,
      email,
      address,
      city,
      pinCode,
      serviceType,
      selectedMaid,
      bookingDate,
      timeSlot,
      workDetails,
      duration,
      maidPreference,
      paymentMethod
    };
    console.log("Booking Data:", bookingData);
    alert("Booking submitted successfully!");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Book Helper</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* 1️⃣ User Information */}
        <div className="p-4 mb-4 rounded-xl shadow-md bg-blue-50">
          <h2 className="font-bold mb-2 text-lg text-blue-700">User Information</h2>
          <IonItem>
            <IonLabel position="stacked">Full Name</IonLabel>
            <IonInput value={fullName} onIonInput={(e: any) => setFullName(e.target.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Phone Number</IonLabel>
            <IonInput value={phone} onIonInput={(e: any) => setPhone(e.target.value)} type="tel" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email (optional)</IonLabel>
            <IonInput value={email} onIonInput={(e: any) => setEmail(e.target.value)} type="email" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Address</IonLabel>
            <IonInput value={address} onIonInput={(e: any) => setAddress(e.target.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">City / Area</IonLabel>
            <IonInput value={city} onIonInput={(e: any) => setCity(e.target.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Pin Code</IonLabel>
            <IonInput value={pinCode} onIonInput={(e: any) => setPinCode(e.target.value)} type="number" />
          </IonItem>
        </div>

        {/* 2️⃣ Service Type */}
        <div className="p-4 mb-4 rounded-xl shadow-md bg-green-50">
          <h2 className="font-bold mb-2 text-lg text-green-700">Service Type</h2>
          <IonSelect
            placeholder="Select Service"
            value={serviceType}
            onIonChange={(e) => setServiceType(e.detail.value)}
          >
            <IonSelectOption value="Cleaning">🧹 House Cleaning</IonSelectOption>
            <IonSelectOption value="Cooking">🍳 Cooking</IonSelectOption>
            <IonSelectOption value="Babysitting">👶 Babysitting</IonSelectOption>
            <IonSelectOption value="ElderlyCare">👵 Elder Care</IonSelectOption>
            <IonSelectOption value="FullTimeMaid">🏠 Full-Time Maid</IonSelectOption>
            <IonSelectOption value="Laundry">🧺 Laundry / Dish Washing</IonSelectOption>
          </IonSelect>
        </div>

        {/* 3️⃣ Select Maid */}
        <div className="p-4 mb-4 rounded-xl shadow-md bg-yellow-50">
          <h2 className="font-bold mb-2 text-lg text-yellow-700">Select Maid</h2>
          <IonInput
            placeholder="Maid Name / Skills / Rating"
            value={selectedMaid || ""}
            onIonInput={(e: any) => setSelectedMaid(e.target.value)}
          />
        </div>

        {/* 4️⃣ Date & Time */}
        <div className="p-4 mb-4 rounded-xl shadow-md bg-pink-50">
          <h2 className="font-bold mb-2 text-lg text-pink-700">Date & Time</h2>
          <IonItem>
            <IonLabel position="stacked">Booking Date</IonLabel>
        <IonDatetime
  value={bookingDate}
  onIonChange={(e) => {
    const value = e.detail.value; // can be string | string[]
    if (typeof value === "string") {
      setBookingDate(value); // safe
    } else if (Array.isArray(value) && value.length > 0) {
      setBookingDate(value[0]); // just take the first value
    }
  }}
  display-format="DD MMM YYYY"
/>
          </IonItem>

          <IonRadioGroup value={timeSlot} onIonChange={(e) => setTimeSlot(e.detail.value)}>
            <div className="flex gap-3 mt-2">
              <IonItem>
                <IonLabel>Morning</IonLabel>
                <IonRadio slot="start" value="Morning" />
              </IonItem>
              <IonItem>
                <IonLabel>Afternoon</IonLabel>
                <IonRadio slot="start" value="Afternoon" />
              </IonItem>
              <IonItem>
                <IonLabel>Evening</IonLabel>
                <IonRadio slot="start" value="Evening" />
              </IonItem>
            </div>
          </IonRadioGroup>
        </div>

        {/* 5️⃣ Work Details */}
        <div className="p-4 mb-4 rounded-xl shadow-md bg-purple-50">
          <h2 className="font-bold mb-2 text-lg text-purple-700">Work Details</h2>
          <IonItem>
            <IonLabel position="stacked">Number of Rooms</IonLabel>
            <IonInput
              value={workDetails.rooms}
              onIonInput={(e: any) => setWorkDetails({ ...workDetails, rooms: e.target.value })}
              type="number"
            />
          </IonItem>
          <IonItem lines="none">
            <IonCheckbox
              checked={workDetails.kitchen}
              onIonChange={(e) => setWorkDetails({ ...workDetails, kitchen: e.detail.checked })}
            />
            <IonLabel>Kitchen cleaning required</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonCheckbox
              checked={workDetails.bathroom}
              onIonChange={(e) => setWorkDetails({ ...workDetails, bathroom: e.detail.checked })}
            />
            <IonLabel>Bathroom cleaning required</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Number of people for cooking</IonLabel>
            <IonInput
              value={workDetails.peopleCooking}
              onIonInput={(e: any) => setWorkDetails({ ...workDetails, peopleCooking: e.target.value })}
              type="number"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Special Instructions</IonLabel>
            <IonInput
              value={workDetails.instructions}
              onIonInput={(e: any) => setWorkDetails({ ...workDetails, instructions: e.target.value })}
            />
          </IonItem>
        </div>

        {/* 6️⃣ Duration */}
        <div className="p-4 mb-4 rounded-xl shadow-md bg-orange-50">
          <h2 className="font-bold mb-2 text-lg text-orange-700">Duration</h2>
          <IonSelect placeholder="Select Duration" value={duration} onIonChange={(e) => setDuration(e.detail.value)}>
            <IonSelectOption value="2 Hours">2 Hours</IonSelectOption>
            <IonSelectOption value="4 Hours">4 Hours</IonSelectOption>
            <IonSelectOption value="8 Hours">8 Hours</IonSelectOption>
            <IonSelectOption value="Full Day">Full Day</IonSelectOption>
            <IonSelectOption value="Monthly Service">Monthly Service</IonSelectOption>
          </IonSelect>
        </div>

        {/* 7️⃣ Maid Preference */}
        <div className="p-4 mb-4 rounded-xl shadow-md bg-teal-50">
          <h2 className="font-bold mb-2 text-lg text-teal-700">Maid Preference (Optional)</h2>
          <IonItem lines="none">
            <IonCheckbox
              checked={maidPreference.female}
              onIonChange={(e) => setMaidPreference({ ...maidPreference, female: e.detail.checked })}
            />
            <IonLabel>Female maid</IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonCheckbox
              checked={maidPreference.experienced}
              onIonChange={(e) => setMaidPreference({ ...maidPreference, experienced: e.detail.checked })}
            />
            <IonLabel>Experienced maid</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Language Preference</IonLabel>
            <IonInput
              value={maidPreference.language}
              onIonInput={(e: any) => setMaidPreference({ ...maidPreference, language: e.target.value })}
            />
          </IonItem>
        </div>

        {/* 8️⃣ Payment Method */}
        <div className="p-4 mb-4 rounded-xl shadow-md bg-indigo-50">
          <h2 className="font-bold mb-2 text-lg text-indigo-700">Payment Method</h2>
          <IonRadioGroup value={paymentMethod} onIonChange={(e) => setPaymentMethod(e.detail.value)}>
            <IonItem>
              <IonLabel>Online Payment 💳</IonLabel>
              <IonRadio slot="start" value="Online Payment" />
            </IonItem>
            <IonItem>
              <IonLabel>UPI 📱</IonLabel>
              <IonRadio slot="start" value="UPI" />
            </IonItem>
            <IonItem>
              <IonLabel>Cash on Service 💵</IonLabel>
              <IonRadio slot="start" value="Cash on Service" />
            </IonItem>
            <IonItem>
              <IonLabel>Debit/Credit Card 💳</IonLabel>
              <IonRadio slot="start" value="Card" />
            </IonItem>
          </IonRadioGroup>
        </div>

        {/* 9️⃣ Submit Booking */}
        <IonButton expand="block" color="primary" onClick={handleBooking}>
          Confirm Booking
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HelperBookingPage;