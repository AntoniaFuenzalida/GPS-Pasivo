import React, { useState, useRef, useEffect, use} from "react";
import { Link } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import CommentModal from "../components/CommentModal";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9008/api";

const ubicaciones1 = [
  {
    nombre: "Max",
    lugar: "Parque Central",
    coords: [-3.7038, 40.4168],
    fecha: "27/4/2025, 6:15:00",
    comentario: true,
    comentarioTexto:
      "Max fue encontrado corriendo sin correa en el parque. Lo detuve hasta que lo escanearon.",
  },
  {
    nombre: "Max",
    lugar: "Calle Principal",
    coords: [-3.7058, 40.418],
    fecha: "25/4/2025, 10:30:00",
    comentario: false,
  },
  {
    nombre: "Luna",
    lugar: "Avenida Roble",
    coords: [-3.7048, 40.417],
    fecha: "26/4/2025, 5:15:00",
    comentario: true,
    comentarioTexto:
      "Gatita muy amigable, parecía perdida pero tenía QR visible.",
  },
  {
    nombre: "Buddy",
    lugar: "Calle Olmo",
    coords: [-3.7058, 40.4148],
    fecha: "21/4/2025, 11:30:00",
    comentario: true,
    comentarioTexto:
      "Estaba asustado en la vereda, escaneé el código y llamé al dueño.",
  },
];

const MapPage = () => {
  const [filtro, setFiltro] = useState("Todas");
  const [modalVisible, setModalVisible] = useState(false);
  const [comentarioActivo, setComentarioActivo] = useState("");
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const [popup, setPopup] = useState(null);

  const [mascotasUnicas, setMascotasUnicas] = useState([]);

  // datos de la API
  const [mascotas, setMascotas] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  const fetchMascotas = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const token = localStorage.getItem("token");

      if (!usuario || !token) throw new Error("No autenticado");

      const endpointMascotas =
        usuario.tipo === "administrador"
          ? `${API_URL}/mascotas/obtener`
          : `${API_URL}/mascotas/dueno/${usuario.id}`;

      const resMascotas = await fetch(endpointMascotas, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resMascotas.ok) throw new Error("Error al obtener mascotas");
      const dataMascotas = await resMascotas.json();
      setMascotas(dataMascotas);

      const ubicacionesPromises = dataMascotas.map(async (mascota) => {
        const resUbicaciones = await fetch(
          `${API_URL}/localizaciones/mascota/${mascota.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!resUbicaciones.ok) return [];

        const { localizaciones } = await resUbicaciones.json();

        return localizaciones.map((u) => {
          const fechaObj = new Date(u.fecha);
          const fechaFormateada = `${fechaObj.getDate()}/${fechaObj.getMonth() + 1}/${fechaObj.getFullYear()}, ${fechaObj.getHours()}:${fechaObj.getMinutes().toString().padStart(2, "0")}:${fechaObj.getSeconds().toString().padStart(2, "0")}`;

          return {
            nombre: mascota.nombre,
            lugar: `${u.longitud},${u.latitud}`,
            coords: [u.longitud, u.latitud],
            fecha: fechaFormateada,
            comentario: !!u.comentario,
            comentarioTexto: u.comentarioTexto || "",
          };
        });
      });

      const ubicacionesArray = await Promise.all(ubicacionesPromises);
      const todasUbicaciones = ubicacionesArray.flat();

      setUbicaciones(todasUbicaciones);
    } catch (error) {
      console.error("Error al obtener mascotas y ubicaciones:", error);
    }
  };


const ajustarMapa = () => {
  if (!mapInstance.current) return;
  if (ubicacionesFiltradas.length === 0) return;

  const bounds = new maplibregl.LngLatBounds();
  ubicacionesFiltradas.forEach((u) => {
    bounds.extend(u.coords);
  });

  mapInstance.current.fitBounds(bounds, {
    padding: 60,
    maxZoom: 15,
    duration: 1000,
  });
};


useEffect(() => {
  fetchMascotas();
}, []);

useEffect(() => {
  setMascotasUnicas([...new Set(ubicaciones.map((u) => u.nombre))]);
}, [ubicaciones]);

  const ubicacionesFiltradas =
    filtro === "Todas"
      ? ubicaciones
      : ubicaciones.filter((u) => u.nombre === filtro);

useEffect(() => {
  ajustarMapa();
  // eslint-disable-next-line
}, [ubicacionesFiltradas, mapInstance.current]);



  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [-3.7038, 40.4168],
      zoom: 13,
    });

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [-3.7038, 40.4168],
      zoom: 13,
    });

    mapInstance.current = map;

    ubicacionesFiltradas.forEach((u) => {
      const el = document.createElement("div");
      el.className = "text-2xl cursor-pointer";
      el.innerText = "📍";

      new maplibregl.Marker(el).setLngLat(u.coords).addTo(map); // sin const marker

      if (u.comentario) {
        el.onclick = () => {
          if (popup) popup.remove();

          const newPopup = new maplibregl.Popup({ offset: 25 })
            .setLngLat(u.coords)
            .setHTML(
              `
              <div class="font-sans text-sm">
                <h3 class="font-bold">${u.nombre}</h3>
                <p>${u.lugar}</p>
                <p class="text-xs text-gray-600">${u.fecha}</p>
              </div>
            `
            )
            .addTo(map);

          setPopup(newPopup);
        };
      }
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [popup, ubicacionesFiltradas]); // ✅ Dependencias corregidas

  useEffect(() => {
    if (!mapInstance.current) return;

    // Limpia los marcadores anteriores
    if (mapInstance.current.markers) {
      mapInstance.current.markers.forEach((m) => m.remove());
    }
    mapInstance.current.markers = [];

    // Agrega los nuevos marcadores
    ubicacionesFiltradas.forEach((u) => {
      const el = document.createElement("div");
      el.className = "text-2xl cursor-pointer";
      el.innerText = "📍";

      const marker = new maplibregl.Marker(el).setLngLat(u.coords).addTo(mapInstance.current);

      if (u.comentario) {
        el.onclick = () => {
          if (popup) popup.remove();

          const newPopup = new maplibregl.Popup({ offset: 25 })
            .setLngLat(u.coords)
            .setHTML(
              `
              <div class="font-sans text-sm">
                <h3 class="font-bold">${u.nombre}</h3>
                <p>${u.lugar}</p>
                <p class="text-xs text-gray-600">${u.fecha}</p>
              </div>
            `
            )
            .addTo(mapInstance.current);

          setPopup(newPopup);
        };
      }

      mapInstance.current.markers.push(marker);
    });

    // Ajusta el mapa a los puntos filtrados
    if (ubicacionesFiltradas.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      ubicacionesFiltradas.forEach((u) => bounds.extend(u.coords));
      mapInstance.current.fitBounds(bounds, {
        padding: 60,
        maxZoom: 15,
        duration: 1000,
      });
    }

  }, [ubicacionesFiltradas, popup]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md animate-fadeIn">
        <Link
          to="/"
          className="text-2xl font-bold text-red-600 flex items-center gap-2"
        >
          🐾 MascotasID
        </Link>
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link to="/dashboard" className="hover:text-red-600">
            Panel de Control
          </Link>
          <Link to="/mapa" className="text-red-600 border-b-2 border-red-600 pb-1">
            Mapa
          </Link>
          <Link to="/notificaciones" className="hover:text-red-600">
            Notificaciones
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {/* Dejé enlazado el ícono de perfil a la vista  */}
          <Link
            to="/perfil"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group"
            title="Mi Perfil"
          >
            <FiUser className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
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
        <div className="mb-6 animate-fadeIn">
          <h2 className="text-2xl font-bold">Localizaciones de Mascotas</h2>
          <p className="text-sm text-gray-600 mt-1">
            Visualiza dónde se han escaneado los códigos QR de tus mascotas
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Mapa */}
          <div className="md:w-2/3 h-[500px] border border-gray-300 rounded-lg overflow-hidden shadow-lg animate-fadeIn">
            <div ref={mapContainer} className="w-full h-full" />
          </div>

          {/* Historial lateral */}
          <div className="md:w-1/3 flex flex-col gap-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Últimas ubicaciones
              </h3>
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="border border-gray-300 bg-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Todas">Todas las mascotas</option>
                {mascotasUnicas.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-auto"
              style={{ maxHeight: "500px" }}
            >
              {ubicacionesFiltradas.map((u, idx) => (
                <div
                  key={idx}
                  className="p-4 border-b last:border-0 flex flex-col gap-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {u.nombre}
                      </h4>
                      <p className="text-sm text-gray-600">📍 {u.lugar}</p>
                      <p className="text-xs text-gray-500 mt-1">🕒 {u.fecha}</p>
                    </div>
                    {u.comentario && (
                      <button
                        className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1"
                        onClick={() => {
                          setComentarioActivo(
                            u.comentarioTexto || "Sin detalles"
                          );
                          setModalVisible(true);
                        }}
                      >
                        <BsChatLeftText className="text-base" />
                        Ver comentario
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {ubicacionesFiltradas.length === 0 && (
                <p className="p-4 text-gray-500 text-center">
                  No hay ubicaciones para mostrar.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de comentario */}
      <CommentModal
        visible={modalVisible}
        comentario={comentarioActivo}
        onClose={() => {
          setModalVisible(false);
          setComentarioActivo("");
        }}
      />
    </div>
  );
};

export default MapPage;
