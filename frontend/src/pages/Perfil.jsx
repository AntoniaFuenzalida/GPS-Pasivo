import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiLock, FiPhone, FiSave } from "react-icons/fi";

const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    contrasenaActual: "",
    contrasenaNueva: "",
    confirmarContrasena: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const usuarioData = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioData) {
      setUsuario(usuarioData);
      setFormData(prev => ({
        ...prev,
        nombre: usuarioData.nombre || "",
        telefono: usuarioData.telefono || ""
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar mensajes al escribir
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
      // Aquí se harian las llamadas al backend, pero me centré solo en hacer front
  };

  if (!usuario) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Cargando perfil...</div>
      </div>
    );
  }

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
          <Link to="/notificaciones" className="hover:text-red-600">
            Notificaciones
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          
          {/* Icono de perfil */}
          <Link 
            to="/perfil" 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 pb-1 transition-colors group"
            title="Mi Perfil"
          >
            <FiUser className="w-5 h-5 text-gray-600 text-red-600 transition-colors" />
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("usuario");
              window.location.href = "/login";
            }}
            className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="px-8 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Encabezado */}
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-3xl font-extrabold">Mi Perfil</h1>
            <p className="text-gray-600 mt-1">
              Actualiza tu información personal y configuración de seguridad
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 animate-fadeIn">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información Personal */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FiUser className="text-red-600" />
                  Información Personal
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Ej: +57 300 123 4567"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={usuario.correo}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    El correo electrónico no se puede cambiar
                  </p>
                </div>
              </div>

              {/* Cambio de Contraseña */}
              <div className="pb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FiLock className="text-red-600" />
                  Cambiar Contraseña
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      name="contrasenaActual"
                      value={formData.contrasenaActual}
                      onChange={handleChange}
                      placeholder="Ingresa tu contraseña actual"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        name="contrasenaNueva"
                        value={formData.contrasenaNueva}
                        onChange={handleChange}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        name="confirmarContrasena"
                        value={formData.confirmarContrasena}
                        onChange={handleChange}
                        placeholder="Repite la nueva contraseña"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fadeIn">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-fadeIn">
                  {success}
                </div>
              )}

              {/* Botón Guardar */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Guardar Cambios
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;