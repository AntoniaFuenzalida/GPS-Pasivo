import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Notifications from "./pages/Notifications";
import MapPage from "./pages/MapPage";
import MapTest from "./pages/MapTest";

import GuestPetView from "./pages/GuestPetView";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminMascotas from "./pages/AdminMascotas";
import AdminEscaneos from "./pages/AdminEscaneos";
import AdminLayout from "./layouts/AdminLayout"; // asegúrate de tener este archivo

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas / de usuario */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/notificaciones" element={<Notifications />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/mapatest" element={<MapTest />} />

        {/* Vista de invitado para ver datos de la mascota al escanear el QR */}
        <Route path="/pet/:id" element={<GuestPetView />} />

        {/* Grupo de rutas administrativas bajo un layout común */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="mascotas" element={<AdminMascotas />} />
          <Route path="escaneos" element={<AdminEscaneos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
