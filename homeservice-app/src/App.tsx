
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Pages */
import LandingPage from './components/users/pages/LandingPage';
import Signup from './components/Authentication/Signup';

import Home from './components/users/Home';
import UserSignup from './components/users/UserSignup';
import ProfilePage from './components/users/pages/Profile';
import ChatPage from './components/users/pages/Chat';
import MaidListPage from './components/users/pages/MaidList';
import Preferences from './components/users/pages/Preferences';
import HelperHome from './components/Helpers/Home';

import MaidProfile from './components/Helpers/Pages/Profile'
import HelperChat from './components/users/pages/HelperChat';
import MaidPreferences from './components/Helpers/Pages/ServicePreferences';
import AdminHome from './components/Admin/Home';
import AdminProfile from './components/Admin/Pages/Profile';
import AdminServicePage from './components/Admin/Pages/Service';


// import HelperWorkPreference from './components/Helpers/Pages/Helperworkpreference';
import LoginPage from './components/Authentication/Login';
import UpsertProfile from './components/Authentication/Profile';
import ForgetPassword from './components/Authentication/ForgetPassword';
import ManageUsers from './components/Admin/Pages/ManageUsers';
import ManageSupport from './components/Admin/Pages/Manage Support';
import ServiceWiseHelper from './components/users/pages/ServiceHelperBooking';
import HelperDetails from './components/users/pages/HelperDetails';
import SeekerDetails from './components/Helpers/SeekerDetails';
import HelperDetailsWiseChatPage from './components/users/pages/HelperChat';
import HelperBookingPage from  './components/users/pages/HelperBook'; // Existing booking page
import SeekerList from './components/Helpers/Pages/SeekerList';
import SeekerChat from './components/Helpers/Pages/SeekerChat';
import ServiceWiseSeeker from './components/Helpers/Pages/ServiceWiseSeeker';
import UserBooking from './components/users/pages/Mybooking';
import HelperBooking from './components/Helpers/Pages/Booking';
import SeekerHelpDesk from './components/users/pages/HelpDesk';
import HelperHelpDesk from './components/Helpers/Pages/Helpdesk';
import BookingWiseHelperChat from './components/users/pages/BookingWiseChat';
/* Core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();



const isLoggedIn = true; // <-- TEMPORARY: always allow access for now


const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>

            {/* Landing Page (Always Visible) */}
            <Route exact path="/" component={LandingPage} />

            {/* Auth Pages */}
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signup-user" component={UserSignup} />
            
              <Route exact path="/profile" component={ProfilePage} />
                 <Route exact path="/chat" component={ChatPage} />
                 <Route exact path="/maid-list" component={MaidListPage} />
                  <Route exact path="/preferences" component={Preferences} />
                  <Route exact path="/helper-home" component={HelperHome} />
                   <Route exact path="/upsertprofile" component={UpsertProfile} />
                  <Route exact path="/maid-profile" component={MaidProfile} />
                   {/* <Route exact path="/maid-chat" component={HelperChat} /> */}
                  <Route exact path="/maid-preferences" component={MaidPreferences} />
                  <Route exact path="/admin-home" component={AdminHome} />
                  <Route exact path="/admin-profile" component={AdminProfile} />
                  <Route exact path="/admin-service" component={AdminServicePage} />
                  <Route exact path="/chat/:id" component={HelperDetailsWiseChatPage} />
                  <Route exact path="/booking/:id" component={HelperBookingPage} />
                  {/* <Route exact path="/helper-workpreferences" component={ HelperWorkPreference} /> */}
                  <Route exact path="/forget-password" component={ForgetPassword} />
                  <Route exact path="/manage-support" component={ManageSupport} />
               <Route exact path="/manage-users" component={ManageUsers} />
                <Route exact path="/service/:serviceId" component={ServiceWiseHelper} />
                 <Route exact path="/service-seeker/:serviceId" component={ServiceWiseSeeker} />
                 <Route path="/helper/:helperId" component={HelperDetails} />
                  <Route exact path="/seeker/:id" component={SeekerDetails} />
                  <Route exact path="/seeker-list" component={SeekerList} />
             <Route exact path="/seeker-chat/:accountId" component={SeekerChat} />
                <Route exact path="/helper-chat/:registration_id" component={HelperChat} />
                  <Route exact path="/my-bookings" component={UserBooking} />
                    <Route exact path="/helper-bookings" component={HelperBooking} />
                    <Route exact path="/support" component={SeekerHelpDesk} />
                    <Route exact path="/support-system" component={HelperHelpDesk} />
  <Route
            path="/helper-chat/:booking_id/:receiver_account_id"
            component={BookingWiseHelperChat}
            exact
          />


            {/* Home Page (Temporarily Always Allowed) */}
            <Route
              exact
              path="/home"
              render={() =>
                isLoggedIn ? <Home /> : <Redirect to="/" />
              }
            />

            {/* Catch All */}
            <Route path="*">
              <Redirect to="/" />
            </Route>

          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
