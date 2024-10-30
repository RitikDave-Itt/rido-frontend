import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex   items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-800    opacity-50"
        onClick={onClose}
      ></div>
      
      <div className=" flex items-center relative justify-center    rounded-lg  w-[70%] h-full max-w-[90vw] p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3   text-gray-600 hover:text-gray-900"
        >
X        </button>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;