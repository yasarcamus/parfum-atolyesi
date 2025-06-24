import React from 'react';
import { calculateKalanGun, getCalkalamaMesaji } from '../utils/helpers';
import { BeakerIcon, SparklesIcon, TrashIcon } from './Icons';
import EtiketEkleme from './EtiketEkleme';

// YENİ: isGuest prop'u eklendi
const UretimKarti = ({ uretim, onUpdate, onDelete, onOpenModal, isGuest }) => {
    const kalanGun = calculateKalanGun(uretim.baslangicTarihi, uretim.dinlenmeSuresi);
    const calkalamaMesaji = getCalkalamaMesaji(uretim);
    const progressPercent = Math.min(100, ((uretim.dinlenmeSuresi - kalanGun) / uretim.dinlenmeSuresi) * 100);

    const calculateTotalCost = () => {
        if (!uretim.maliyet) return 0;
        return Object.values(uretim.maliyet).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    };
    const totalCost = calculateTotalCost();

    const handleAddEtiket = (yeniEtiket) => {
        if (isGuest) return; // Misafirler etiket ekleyemez
        if (yeniEtiket && !(uretim.etiketler || []).includes(yeniEtiket)) {
            onUpdate({ ...uretim, etiketler: [...(uretim.etiketler || []), yeniEtiket] });
        }
    };
    const handleRemoveEtiket = (etiketToRemove) => {
        if (isGuest) return; // Misafirler etiket silemez
        onUpdate({ ...uretim, etiketler: uretim.etiketler.filter(e => e !== etiketToRemove) });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-400 flex flex-col border border-stone-200/30">
            <div className="p-5 flex-grow">
                {/* ... (kartın üst kısmı aynı) ... */}
            </div>

            <div className="bg-orange-50/50 p-4 mt-auto rounded-b-2xl border-t border-orange-100">
                {/* ... (geri sayım kısmı aynı) ... */}
                
                {/* YENİ: Misafirler için butonları devre dışı bırakma */}
                {!uretim.test ? (
                    <button 
                        onClick={() => !isGuest && onOpenModal('testGiris', { uretim })} 
                        className={`w-full flex items-center justify-center gap-2 bg-amber-800 text-white font-bold py-3 rounded-lg transition-colors ${isGuest ? 'cursor-not-allowed bg-amber-700/50' : 'hover:bg-amber-900'}`}
                    >
                        <BeakerIcon /> Test Et & Değerlendir
                    </button>
                ) : (
                    <div className="flex flex-col gap-2">
                         <button 
                            onClick={() => !isGuest && onOpenModal('analiz', { uretim })} 
                            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold py-2 rounded-lg transition-opacity ${isGuest ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'}`}
                         >
                            <SparklesIcon /> AI ile Yeniden Analiz Et
                        </button>
                        {!isGuest && <button onClick={() => onOpenModal('testGiris', { uretim })} className="w-full text-xs text-stone-600 hover:underline">Test notlarını düzenle</button>}
                    </div>
                )}
                 {!isGuest && <button onClick={() => { if (window.confirm("Bu üretimi silmek istediğinizden emin misiniz?")) { onDelete(uretim.id) }}} className="text-xs text-stone-400 hover:text-red-600 hover:underline mt-4 w-full flex items-center justify-center gap-1"><TrashIcon /> Sil</button>}
            </div>
        </div>
    );
};

export default UretimKarti;