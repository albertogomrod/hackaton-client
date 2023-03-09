import './App.css';
import { Routes, Route } from "react-router";

// pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
// components
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>


    </div>
  );
}

export default App;
