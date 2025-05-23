import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Notifications from "./pages/Notifications"; 
import MapPage from "./pages/MapPage";
import MapTest from "./pages/MapTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/notificaciones" element={<Notifications />} /> 
        <Route path="/mapatest" element={<MapTest />} />
        <Route path="/mapa" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;

