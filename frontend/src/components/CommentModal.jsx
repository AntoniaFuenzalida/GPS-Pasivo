// src/components/CommentModal.jsx

import React from "react";

const CommentModal = ({ visible, comentario, onClose }) => {
  // Si no está visible, no renderices nada
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fadeIn relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-2">Comentario del Escaneo</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{comentario}</p>
      </div>
    </div>
  );
};

export default CommentModal;
