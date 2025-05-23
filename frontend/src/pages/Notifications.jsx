import React, { useState } from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [email, setEmail] = useState("usuario@ejemplo.com");

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="text-xl font-bold text-red-600">🐾 MascotasID</div>
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link to="/dashboard" className="hover:text-red-600">Panel de Control</Link>
          <Link to="/mis-mascotas" className="hover:text-red-600">Mis Mascotas</Link>
          <Link to="/mapa" className="hover:text-red-600">Mapa</Link>
          <Link to="/notificaciones" className="hover:text-red-600 font-semibold">Notificaciones</Link>
        </nav>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </header>

      {/* Contenido */}
      <main className="px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded p-6 shadow">
          <h2 className="text-xl font-bold mb-2">Configuración de Notificaciones</h2>
          <p className="text-sm text-gray-600 mb-6">
            Configura cómo quieres ser notificado cuando se escanee el código QR de tu mascota
          </p>

          {/* Email */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <div>
                <h3 className="font-semibold">Notificaciones por Correo Electrónico</h3>
                <p className="text-sm text-gray-600">Recibe alertas por correo cuando se escanee el código QR de tu mascota</p>
              </div>
              <input
                type="checkbox"
                checked={emailEnabled}
                onChange={() => setEmailEnabled(!emailEnabled)}
                className="w-5 h-5"
              />
            </div>
            {emailEnabled && (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
              />
            )}
          </div>

          {/* SMS */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Notificaciones SMS</h3>
              <p className="text-sm text-gray-600">Recibe mensajes de texto cuando se escanee el código QR de tu mascota</p>
            </div>
            <input
              type="checkbox"
              checked={smsEnabled}
              onChange={() => setSmsEnabled(!smsEnabled)}
              className="w-5 h-5"
            />
          </div>

          {/* Push */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Notificaciones Push</h3>
              <p className="text-sm text-gray-600">Recibe notificaciones push en tus dispositivos</p>
            </div>
            <input
              type="checkbox"
              checked={pushEnabled}
              onChange={() => setPushEnabled(!pushEnabled)}
              className="w-5 h-5"
            />
          </div>

          <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Guardar Configuración
          </button>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
