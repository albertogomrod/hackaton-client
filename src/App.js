import "./App.css";
import { Routes, Route } from "react-router";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import HackatonList from "./pages/hackaton/HackatonList";
import TutorialList from "./pages/tutorial/TutorialList";

// import HackatonDetails from "./pages/hackaton/HackatonDetails";
import HackatonDetails2 from "./pages/hackaton/HackatonDetails2";
import HackatonEdit from "./pages/hackaton/HackatonEdit";
import HackatonCreate from "./pages/hackaton/HackatonCreate";

import TutorialDetails from "./pages/tutorial/TutorialDetails";
import TutorialEdit from "./pages/tutorial/TutorialEdit";
import TutorialCreate from "./pages/tutorial/TutorialCreate";

import Profile from "./pages/profile/Profile";
import ProfileEdit from "./pages/profile/ProfileEdit";
import HackatonesCreados from "./pages/profile/HackatonesCreados";
import TutorialesCreados from "./pages/profile/TutorialesCreados";

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

        <Route path= "/hackaton/details/:hackatonId" element= {<HackatonDetails2 />}/>
        <Route path= "/hackaton/edit/:hackatonId" element= {<IsCompany> <HackatonEdit /></IsCompany>}/>
        <Route path= "/hackaton/create" element= {<IsCompany> <HackatonCreate /> </IsCompany>}/>

        <Route path= "/tutorial/details/:tutorialId" element= {<TutorialDetails />}/>
        <Route path= "/tutorial/edit/:tutorialId" element= {<IsAdmin> <TutorialEdit /> </IsAdmin>}/>
        <Route path= "/tutorial/create" element= {<IsAdmin> <TutorialCreate /> </IsAdmin> } /> 

        <Route path= "/profile" element= {<Profile />}/>
        <Route path= "/profile/edit" element= {<ProfileEdit />}/>
        <Route path= "/profile/hackaton-list-company" element= { <IsCompany> <HackatonesCreados /></IsCompany>}/>
        <Route path= "/profile/tutorial-list-admin" element= { <IsAdmin> <TutorialesCreados />  </IsAdmin>}/>


        {/* Rutas Error */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
