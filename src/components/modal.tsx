'use client'

import React from 'react';

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText = 'キャンセル' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">{title}</h2>
        <p className="text-gray-700 text-base leading-relaxed mt-2 mb-8">{message}</p>
        <div className="flex justify-end gap-4">
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded">
            {confirmText}
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
