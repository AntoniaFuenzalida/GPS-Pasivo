import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const adminRoutes = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Usuarios", path: "/admin/usuarios" },
  { name: "Mascotas", path: "/admin/mascotas" },
  { name: "Escaneos", path: "/admin/escaneos" },
];

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar superior */}
      <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-red-600">🐾 MascotasID</h1>
        <nav className="flex gap-6">
          {adminRoutes.map((route) => (
            <NavLink
              key={route.name}
              to={route.path}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-red-600 border-b-2 border-red-600 pb-1"
                    : "text-gray-600 hover:text-red-600"
                }`
              }
            >
              {route.name}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Contenido dinámico */}
      <main className="px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
