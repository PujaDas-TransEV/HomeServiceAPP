// import { Route, Redirect, Switch } from 'react-router-dom';
// import {
//   IonApp,
//   IonRouterOutlet,
//   setupIonicReact
// } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';

// /* Pages */
// import LandingPage from './components/users/pages/LandingPage';
// import Signup from './components/users/pages/Signup';
// import Login from './components/users/pages/Login';
// import Home from './components/users/Home';

// /* Core CSS */
// import '@ionic/react/css/core.css';
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';
// import '@ionic/react/css/palettes/dark.system.css';
// import './theme/variables.css';

// setupIonicReact();

// // Dummy authentication check (replace with real logic)
// const isLoggedIn = false;

// const App: React.FC = () => {
//   return (
//     <IonApp>
//       <IonReactRouter>
//         <IonRouterOutlet>
//           <Switch>
//             {/* Landing Page */}
//             <Route exact path="/" component={LandingPage} />

//             {/* Authentication pages */}
//             <Route exact path="/login" component={Login} />
//             <Route exact path="/signup" component={Signup} />

//             {/* Protected Home Page */}
//             <Route
//               exact
//               path="/home"
//               render={() =>
//                 isLoggedIn ? <Home /> : <Redirect to="/" />
//               }
//             />

//             {/* Redirect unknown routes to landing */}
//             <Route path="*">
//               <Redirect to="/" />
//             </Route>
//           </Switch>
//         </IonRouterOutlet>
//       </IonReactRouter>
//     </IonApp>
//   );
// };

// export default App;
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Pages */
import LandingPage from './components/users/pages/LandingPage';
import Signup from './components/users/pages/Signup';
import Login from './components/users/pages/Login';
import Home from './components/users/Home';
// import HelperSignup from './components/users/pages/HelperSignup';
import UserSignup from './components/users/UserSignup';

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

// Dummy authentication check (replace with real logic)
const isLoggedIn = false;

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            {/* Landing Page */}
            <Route exact path="/" component={LandingPage} />

            {/* Authentication pages */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* <Route exact path="/signup-helper" component={HelperSignup} /> */}
            <Route exact path="/signup-user" component={UserSignup} />

            {/* Protected Home Page */}
            <Route
              exact
              path="/home"
              render={() =>
                isLoggedIn ? <Home /> : <Redirect to="/" />
              }
            />

            {/* Redirect unknown routes to landing */}
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
