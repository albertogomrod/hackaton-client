import "./App.css";
import { Routes, Route } from "react-router";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import HackatonList from "./pages/hackaton/HackatonList";
import TutorialList from "./pages/tutorial/TutorialList";

import HackatonDetails from "./pages/hackaton/HackatonDetails";
import HackatonEdit from "./pages/hackaton/HackatonEdit";
import HackatonCreate from "./pages/hackaton/HackatonCreate";

import TutorialDetails from "./pages/tutorial/TutorialDetails";
import TutorialEdit from "./pages/tutorial/TutorialEdit";
import TutorialCreate from "./pages/tutorial/TutorialCreate";

import Profile from "./pages/profile/Profile";

import Error from './pages/Error';
import NotFound from './pages/NotFound';

// Components
import Navbar from "./components/Navbar";
import IsAdmin from "./components/IsAdmin"
import IsCompany from "./components/IsCompany"


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas Hackaton */}
        <Route path= "/hackaton-list" element= {<HackatonList />} />
        <Route path= "/tutorial-list" element= {<TutorialList />} />

        <Route path= "/hackaton/details/:hackatonId" element= {<HackatonDetails />}/>
        <Route path= "/hackaton/edit/:hackatonId" element= {<IsCompany> <HackatonEdit /></IsCompany>}/>
        <Route path= "/hackaton/create" element= {<IsCompany> <HackatonCreate /> </IsCompany>}/>

        <Route path= "/tutorial/details/:tutorialId" element= {<TutorialDetails />}/>
        <Route path= "/tutorial/edit/:tutorialId" element= {<IsAdmin> <TutorialEdit /> </IsAdmin>}/>
        <Route path= "/tutorial/create" element= {<IsAdmin> <TutorialCreate /> </IsAdmin> } /> 

        <Route path= "/profile" element= {<Profile />}/>

        {/* Rutas Error */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
