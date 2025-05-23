import React, { useState } from "react";

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

const tabs = ["Dashboard", "Usuarios", "Mascotas", "Escaneos"];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-1">Panel de Administración</h1>
      <p className="text-zinc-400 mb-6">
        Gestiona usuarios, mascotas y visualiza estadísticas del sistema
      </p>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-zinc-800 text-white font-semibold"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Estadísticas Principales */}
      {activeTab === "Dashboard" && (
        <>
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-zinc-900 rounded-lg p-5 border border-zinc-800"
              >
                <h3 className="text-sm text-zinc-400">{s.title}</h3>
                <p className="text-2xl font-bold mt-1">{s.value}</p>
                <p className="text-sm text-green-500 mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          {/* Actividad Reciente */}
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-2">Actividad Reciente</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Resumen de la actividad reciente del sistema
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div
                  key={`recent-${i}`}
                  className="bg-zinc-950 rounded-lg p-5 border border-zinc-800"
                >
                  <h3 className="text-sm text-zinc-400">{s.title}</h3>
                  <p className="text-2xl font-bold mt-1">{s.value}</p>
                  <p className="text-sm text-green-500 mt-1">{s.change}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Tabs vacíos (puedes llenar luego) */}
      {activeTab !== "Dashboard" && (
        <div className="bg-zinc-900 p-6 rounded border border-zinc-800 text-zinc-400">
          <p className="italic">Contenido de <strong>{activeTab}</strong> próximamente...</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
