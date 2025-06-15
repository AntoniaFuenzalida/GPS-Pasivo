import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./axiosSetup";

// Páginas públicas
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestPetView from "./pages/GuestPetView";

// Páginas del usuario autenticado
import UserDashboard from "./pages/UserDashboard";
import Notifications from "./pages/Notifications";
import MapPage from "./pages/MapPage";
import MapTest from "./pages/MapTest";
import Perfil from "./pages/Perfil";

// Páginas administrativas
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminMascotas from "./pages/AdminMascotas";
import AdminEscaneos from "./pages/AdminEscaneos";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pet/:id" element={<GuestPetView />} />

        {/* Rutas protegidas para usuarios logueados */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notificaciones"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mapa"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mapatest"
          element={
            <ProtectedRoute>
              <MapTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas administrativas */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="mascotas" element={<AdminMascotas />} />
          <Route path="escaneos" element={<AdminEscaneos />} />
        </Route>

        {/* ❌ Ruta no encontrada (404) opcional */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;
