import React from "react";

const stats = [
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
      <h1 className="text-3xl font-bold mb-1">Panel de Administración</h1>
      <p className="text-gray-500 mb-6">
        Gestiona usuarios, mascotas y visualiza estadísticas del sistema
      </p>

      {/* Métricas Principales */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white border border-gray-300 rounded-lg p-5 shadow"
          >
            <h3 className="text-sm text-gray-500">{s.title}</h3>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
            <p className="text-sm text-green-600 mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Actividad Reciente */}
      <div className="bg-white rounded-lg p-6 border border-gray-300 shadow">
        <h2 className="text-xl font-bold mb-2">Actividad Reciente</h2>
        <p className="text-sm text-gray-500 mb-6">
          Resumen de la actividad reciente del sistema
        </p>
        <div className="grid md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={`recent-${i}`}
              className="bg-gray-50 rounded-lg p-5 border border-gray-200"
            >
              <h3 className="text-sm text-gray-500">{s.title}</h3>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
              <p className="text-sm text-green-600 mt-1">{s.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
