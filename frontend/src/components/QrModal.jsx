import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrModal = ({ visible, onClose, mascota }) => {
  const canvasRef = useRef();

  if (!visible || !mascota) return null;
  
  // Generar el valor del QR con la URL de la mascota
  const qrValue = `http://34.67.77.73:4000/track?id=${mascota.id}`;
  

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-${mascota.nombre}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-center">
          Código QR de {mascota.nombre}
        </h2>

        <div className="flex justify-center mb-4" ref={canvasRef}>
          <QRCodeCanvas value={qrValue} size={200} />
        </div>

        {/* Información de la mascota */}
        <div className="border rounded-lg p-3 mb-4 bg-gray-50">
          <h3 className="font-medium text-gray-800 mb-2">
            Información de la mascota
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-600">Nombre:</div>
            <div className="font-medium">{mascota.nombre}</div>

            {mascota.nombre_dueno && (
              <>
                <div className="text-gray-600">Dueño:</div>
                <div className="font-medium">{mascota.nombre_dueno}</div>
              </>
            )}

            {mascota.especie && (
              <>
                <div className="text-gray-600">Especie:</div>
                <div className="font-medium">{mascota.especie}</div>
              </>
            )}

            {mascota.raza && (
              <>
                <div className="text-gray-600">Raza:</div>
                <div className="font-medium">{mascota.raza}</div>
              </>
            )}
          </div>
        </div>

        <div className="text-sm text-center text-gray-600 mb-4">
          Escanea este código para ver la ficha completa de {mascota.nombre}
        </div>

        <div className="text-center">
          <button
            onClick={handleDownload}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Descargar QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrModal;
