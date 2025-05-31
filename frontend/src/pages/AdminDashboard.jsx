import React from "react";

const statsPrincipales = [
  {
    title: "Total Usuarios",
    value: 245,
    change: "+12% desde el mes pasado",
  },
  {
    title: "Total Mascotas",
    value: 378,
    change: "+18% desde el mes pasado",
  },
  {
    title: "Total Escaneos",
    value: 1429,
    change: "+24% desde el mes pasado",
  },
  {
    title: "Usuarios Activos",
    value: 189,
    change: "+8% desde el mes pasado",
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-8 py-10">
      {/* Encabezado */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-3xl font-extrabold">Panel de Administración</h1>
        <p className="text-gray-600 mt-1">
          Gestiona usuarios, mascotas y visualiza estadísticas del sistema
        </p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fadeIn">
        {statsPrincipales.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Actividad Reciente */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 animate-fadeIn">
        <h2 className="text-xl font-bold mb-2">Actividad Reciente</h2>
        <p className="text-gray-600 mb-6">
          Resumen de la actividad reciente del sistema
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsPrincipales.map((stat, idx) => (
            <div
              key={`recent-${idx}`}
              className="bg-gray-50 rounded-lg border border-gray-200 p-5 hover:bg-white transition-colors"
            >
              <h3 className="text-sm text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
