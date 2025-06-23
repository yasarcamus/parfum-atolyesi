import React from 'react';
import { PlusIcon } from './Icons';

const Header = ({ onNewUretim }) => (
    <header className="bg-orange-50/80 backdrop-blur-lg sticky top-0 z-40 p-4 flex justify-between items-center border-b border-amber-200/60">
        <h1 className="text-3xl text-amber-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Parfüm Atölyem
        </h1>
        <button 
            onClick={onNewUretim} 
            className="flex items-center gap-2 bg-amber-800 text-white font-semibold px-4 py-2 rounded-lg shadow-lg shadow-amber-800/20 hover:bg-amber-900 transition-all duration-300 transform hover:scale-105"
        >
            <PlusIcon />
            <span className="hidden sm:inline">Yeni Üretim</span>
        </button>
    </header>
);

export default Header;