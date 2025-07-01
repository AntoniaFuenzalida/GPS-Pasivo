import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FiUsers, FiHome, FiMap, FiActivity } from "react-icons/fi";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9008/api";

const COLORS = ["#4F46E5", "#EF4444"]; // azul para activos, rojo para inactivos

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalMascotas: 0,
    totalEscaneos: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/estadisticas/totales`
        );
        setStats(data);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };
    fetchStats();
  }, []);

  const activos = Math.floor(stats.totalUsuarios * 0.75);
  const inactivos = stats.totalUsuarios - activos;

  const summaryCards = [
    {
      title: "Usuarios",
      value: stats.totalUsuarios,
      icon: <FiUsers className="text-2xl text-indigo-500" />,
      change: "+12% vs mes pasado",
    },
    {
      title: "Mascotas",
      value: stats.totalMascotas,
      icon: <FiHome className="text-2xl text-indigo-500" />,
      change: "+18% vs mes pasado",
    },
    {
      title: "Escaneos",
      value: stats.totalEscaneos,
      icon: <FiMap className="text-2xl text-indigo-500" />,
      change: "+24% vs mes pasado",
    },
    {
      title: "Activos",
      value: activos,
      icon: <FiActivity className="text-2xl text-indigo-500" />,
      change: "+8% vs mes pasado",
    },
  ];

  const barData = summaryCards.map((c) => ({
    name: c.title,
    value: c.value,
  }));

  const pieData = [
    { name: "Activos", value: activos },
    { name: "Inactivos", value: inactivos },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-8">
      {/* Encabezado */}
      <header className="mb-8 animate-fadeIn">
        <h1 className="text-4xl font-extrabold">Panel de Administración</h1>
        <p className="text-gray-600 mt-2">
          Estadísticas generales y actividad del sistema
        </p>
      </header>

      {/* Resumen rápido */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fadeIn">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="flex items-center bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
          >
            <div className="p-3 bg-indigo-100 rounded-full mr-4">
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-green-600 mt-1">{card.change}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Gráficos */}
      <section className="grid lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-6 animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">Totales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6 animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">Usuarios Activos vs Inactivos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
