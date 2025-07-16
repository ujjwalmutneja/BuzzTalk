
// import { Route } from "react-router-dom";
// import Homepage from './pages/Homepage';
// import Chatpage from './pages/Chatpage';
// import './index.css';
// import HomePag from "./Homed";
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Route path="/" component={HomePag} exact />
//        <Route path="/Hom" component={Homepage} exact /> 
//       <Route path="/chats" component={Chatpage} />
//         {/* <HomePag/> */}
//     </div>
//   );
// }

// export default App;

import { Route, useLocation } from "react-router-dom";
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';
import HomePag from "./Homed";
import './index.css';
import './App.css';

function App() {
  // Get the current route
  const location = useLocation();

  // Check if the current route is `/` (HomePag route)
  const isHomePage = location.pathname === "/";

  return (
    <div className={isHomePage ? "" : "App"}>
      {/* Routes */}
      <Route path="/" component={HomePag} exact />
      <Route path="/Hom" component={Homepage} exact /> 
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
