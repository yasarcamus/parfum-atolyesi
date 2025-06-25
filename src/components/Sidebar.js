import React from 'react';
import { BeakerIcon, LightbulbIcon, SparklesIcon } from './Icons';

const Sidebar = ({ aktifSayfa, setAktifSayfa }) => {
    const navItems = [
        { id: 'atolyem', ad: 'Atölyem', ikon: <BeakerIcon /> },
        { id: 'rehber', ad: 'Rehber', ikon: <LightbulbIcon /> },
        { id: 'ilham', ad: 'İlham Al', ikon: <SparklesIcon className="h-6 w-6" /> },
    ];

    return (
        <aside className="w-64 bg-white/50 border-r border-amber-200/60 p-4 flex-shrink-0">
            <nav className="flex flex-col gap-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setAktifSayfa(item.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                            aktifSayfa === item.id 
                            ? 'bg-amber-800 text-white shadow-lg shadow-amber-800/20' 
                            : 'text-stone-600 hover:bg-orange-100'
                        }`}
                    >
                        <span className="w-6 h-6">{item.ikon}</span>
                        <span className="font-semibold">{item.ad}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
