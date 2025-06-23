import React from 'react';

const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
        <div className="bg-orange-50 rounded-2xl shadow-2xl w-full max-w-lg border border-amber-200 flex flex-col" onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
);

export default Modal;
