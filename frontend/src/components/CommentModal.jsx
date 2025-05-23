import React from "react";

const CommentModal = ({ visible, onClose, comentario }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-2">Comentario del Escaneo</h2>
        <p className="text-gray-700 text-sm whitespace-pre-line">{comentario}</p>
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
