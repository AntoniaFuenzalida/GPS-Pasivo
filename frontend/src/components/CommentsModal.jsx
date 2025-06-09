import React from "react";
import ReactDOM from "react-dom";

const CommentsModal = ({ comentarios, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative z-[1000]">
        <h2 className="text-xl font-bold mb-4">Notas sobre la mascota</h2>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto">
          {Array.isArray(comentarios) && comentarios.length > 0 ? (
            comentarios.map((comentario, index) => (
              <div key={index} className="border-b pb-3">
                <p className="text-gray-800">{comentario}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay notas disponibles.</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Cerrar
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CommentsModal;
