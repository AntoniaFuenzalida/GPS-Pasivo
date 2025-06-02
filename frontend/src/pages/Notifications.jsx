import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiSmartphone, FiBellOff } from "react-icons/fi";

const Notifications = () => {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos a tu backend
    console.log("Guardando configuración:", {
      emailEnabled,
      email,
      smsEnabled,
      pushEnabled,
    });
    alert("Configuración de notificaciones guardada.");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center animate-fadeIn">
        <Link to="/" className="text-2xl font-bold text-red-600 flex items-center gap-2">
          🐾 MascotasID
        </Link>
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link to="/dashboard" className="hover:text-red-600">
            Panel de Control
          </Link>
          <Link to="/mapa" className="hover:text-red-600">
            Mapa
          </Link>
          <Link to="/notificaciones" className="text-red-600 border-b-2 border-red-600 pb-1">
            Notificaciones
          </Link>
        </nav>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </header>

      {/* Contenido */}
      <main className="px-8 py-10">
        {/* Encabezado de sección */}
        <div className="mb-8 animate-fadeIn max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold">Configuración de Notificaciones</h1>
          <p className="text-gray-600 mt-1">
            Configura cómo deseas recibir alertas de escaneos de tus mascotas
          </p>
        </div>

        {/* Tarjeta principal */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto animate-fadeIn">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Notificaciones por correo electrónico */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiMail className="text-2xl text-red-600" />
                <div>
                  <h2 className="text-lg font-semibold">Notificaciones por Correo</h2>
                  <p className="text-gray-500 text-sm">
                    Recibe alertas por correo cuando se escanee el código QR de tu mascota.
                  </p>
                </div>
              </div>
              {/* Toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailEnabled}
                  onChange={() => setEmailEnabled((prev) => !prev)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:bg-red-600 transition-colors" />
                <span
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform
                    peer-checked:translate-x-5`}
                />
              </label>
            </div>

            {emailEnabled && (
              <div className="mt-2 animate-fadeIn">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección de Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  required={emailEnabled}
                />
              </div>
            )}

            {/* Notificaciones SMS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiSmartphone className="text-2xl text-red-600" />
                <div>
                  <h2 className="text-lg font-semibold">Notificaciones SMS</h2>
                  <p className="text-gray-500 text-sm">
                    Recibe mensajes de texto cuando se escanee el código QR de tu mascota.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsEnabled}
                  onChange={() => setSmsEnabled((prev) => !prev)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:bg-red-600 transition-colors" />
                <span
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform
                    peer-checked:translate-x-5`}
                />
              </label>
            </div>

            {/* Notificaciones Push */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiBellOff className="text-2xl text-red-600" />
                <div>
                  <h2 className="text-lg font-semibold">Notificaciones Push</h2>
                  <p className="text-gray-500 text-sm">
                    Recibe notificaciones push en tus dispositivos.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={() => setPushEnabled((prev) => !prev)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:bg-red-600 transition-colors" />
                <span
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform
                    peer-checked:translate-x-5`}
                />
              </label>
            </div>

            {/* Botón Guardar */}
            <div className="pt-6 text-center animate-fadeIn">
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Guardar Configuración
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
