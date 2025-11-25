// import { Route, Redirect } from 'react-router-dom';
// import {
//   IonApp,
//   IonRouterOutlet,
//   setupIonicReact
// } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';

// /* Pages */
// import Tab1 from '../src/pages/Tab1' // make sure the path is correct

// /* Core CSS required for Ionic components to work properly */
// import '@ionic/react/css/core.css';

// /* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

// /* Optional CSS utils */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

// /* Ionic Dark Mode */
// import '@ionic/react/css/palettes/dark.system.css';

// /* Theme variables */
// import './theme/variables.css';

// setupIonicReact();

// const App: React.FC = () => (
//   <IonApp>
//     <IonReactRouter>
//       <IonRouterOutlet>
//         {/* Signup page route */}
//         <Route exact path="/signup">
//           <Tab1 />
//         </Route>

//         {/* Default route redirects to signup */}
//         <Route exact path="/">
//           <Redirect to="/signup" />
//         </Route>
//       </IonRouterOutlet>
//     </IonReactRouter>
//   </IonApp>
// );

// export default App;
import { Route, Redirect } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Pages */
import Tab1 from './pages/Tab1'; // Signup page
import Home from './components/Home'; // Home page

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Signup page route */}
        <Route exact path="/signup" component={Tab1} />

        {/* Home page route */}
        <Route exact path="/home" component={Home} />

        {/* Default route redirects to home */}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
