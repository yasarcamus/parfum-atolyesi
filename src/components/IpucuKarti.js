import React from 'react';
import { LightbulbIcon } from './Icons';

const IpucuKarti = ({ tip }) => {
    // Eğer gösterilecek bir ipucu yoksa, hiçbir şey gösterme
    if (!tip) return null;

    return (
        <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-white/70 border border-amber-200/50 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <LightbulbIcon />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-amber-900" style={{fontFamily: "'Cormorant Garamond', serif"}}>
                        Atölye İpucu
                    </h4>
                    <p className="text-sm text-stone-600 mt-1">{tip}</p>
                </div>
            </div>
        </div>
    );
};

export default IpucuKarti;