
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
import HelperChat from './components/Helpers/Pages/Chat';
import MaidPreferences from './components/Helpers/Pages/ServicePreferences';
import AdminHome from './components/Admin/Home';
import AdminProfile from './components/Admin/Pages/Profile';
import AdminServicePage from './components/Admin/Pages/Service';

import UserPreference from './components/users/pages/Userpreference';
import HelperWorkPreference from './components/Helpers/Pages/Helperworkpreference';
import LoginPage from './components/Authentication/Login';
import UpsertProfile from './components/Authentication/Profile';
import ForgetPassword from './components/Authentication/ForgetPassword';
import ManageUsers from './components/Admin/Pages/ManageUsers';
import ManageSupport from './components/Admin/Pages/Manage Support';

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
                   <Route exact path="/maid-chat" component={HelperChat} />
                  <Route exact path="/maid-preferences" component={MaidPreferences} />
                  <Route exact path="/admin-home" component={AdminHome} />
                  <Route exact path="/admin-profile" component={AdminProfile} />
                  <Route exact path="/admin-service" component={AdminServicePage} />
                
                  <Route exact path="/user-workpreferences" component={UserPreference} />
                  <Route exact path="/helper-workpreferences" component={ HelperWorkPreference} />
                  <Route exact path="/forget-password" component={ForgetPassword} />
                  <Route exact path="/manage-support" component={ManageSupport} />
             
                  <Route exact path="/manage-users" component={ManageUsers} />




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
