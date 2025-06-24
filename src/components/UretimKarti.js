import React from 'react';
import { calculateKalanGun, getCalkalamaMesaji } from '../utils/helpers';
import { BeakerIcon, SparklesIcon, TrashIcon } from './Icons';
import EtiketEkleme from './EtiketEkleme';

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
        if (isGuest) return;
        if (yeniEtiket && !(uretim.etiketler || []).includes(yeniEtiket)) {
            onUpdate({ ...uretim, etiketler: [...(uretim.etiketler || []), yeniEtiket] });
        }
    };
    const handleRemoveEtiket = (etiketToRemove) => {
        if (isGuest) return;
        onUpdate({ ...uretim, etiketler: uretim.etiketler.filter(e => e !== etiketToRemove) });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-400 flex flex-col border border-stone-200/30">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-2xl text-amber-900 font-serif">{uretim.parfumAdi}</h3>
                    {totalCost > 0 && <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">₺{totalCost.toFixed(2)}</span>}
                </div>
                <p className="text-sm text-stone-500 mt-1">% {uretim.esansOrani} Esans • {uretim.dinlenmeSuresi} Gün Dinlenme</p>
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                    {(uretim.etiketler || []).map((etiket, index) => (
                        <span key={`${etiket}-${index}`} className="text-xs font-medium bg-orange-100 text-orange-800 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer" onClick={() => handleRemoveEtiket(etiket)} title="Etiketi kaldır">
                            {etiket} <span className="text-orange-600 hover:text-orange-900">×</span>
                        </span>
                    ))}
                    <EtiketEkleme onAdd={handleAddEtiket} />
                </div>
                {uretim.notlar && <p className="text-sm text-stone-700 mt-4 bg-orange-50/50 p-3 rounded-lg border border-orange-100">"{uretim.notlar}"</p>}
                
                {uretim.test && (
                    <div className="mt-4 pt-4 border-t border-orange-100">
                        <h4 className="font-semibold text-sm text-amber-900 font-serif">Değerlendirme Notları</h4>
                        <div className="text-sm text-stone-600 mt-2 space-y-1">
                            <p>Kalıcılık: <span className="font-bold">{uretim.test.kalicilik}/5</span></p>
                            <p>Yayılım: <span className="font-bold">{uretim.test.silaj}/5</span></p>
                            <p>Beğeni: <span className="font-bold">{uretim.test.begeni}/5</span></p>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-orange-50/50 p-4 mt-auto rounded-b-2xl border-t border-orange-100">
                {kalanGun > 0 && (
                    <div className="mb-4">
                        <div className="flex justify-between items-baseline mb-1"><span className="text-3xl font-bold text-amber-800">{kalanGun}</span><span className="text-sm text-stone-600">gün kaldı</span></div>
                        <div className="w-full bg-amber-200/50 rounded-full h-2"><div className="bg-gradient-to-r from-amber-500 to-amber-700 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div></div>
                        {calkalamaMesaji && (<p className="text-xs text-center mt-3 text-orange-800 bg-orange-100/70 p-2 rounded-lg">{calkalamaMesaji}</p>)}
                    </div>
                )}
                
                {!uretim.test ? (
                    <button 
                        onClick={() => !isGuest && onOpenModal('testGiris', { uretim })} 
                        className={`w-full flex items-center justify-center gap-2 bg-amber-800 text-white font-bold py-3 rounded-lg transition-colors ${isGuest ? 'cursor-not-allowed bg-amber-700/50' : 'hover:bg-amber-900'}`}
                        disabled={isGuest}
                    >
                        <BeakerIcon /> Test Et & Değerlendir
                    </button>
                ) : (
                    <div className="flex flex-col gap-2">
                         <button 
                            onClick={() => !isGuest && onOpenModal('analiz', { uretim })} 
                            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold py-2 rounded-lg transition-opacity ${isGuest ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'}`}
                            disabled={isGuest}
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
