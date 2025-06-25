import React from 'react';
import UretimKarti from './UretimKarti';

const AtolyeGorunumu = ({ uretimler, onUpdate, onDelete, onOpenModal }) => {
    if (uretimler.length === 0) {
        return (
            <div className="text-center py-20 px-6">
                <h2 className="text-3xl font-semibold text-amber-900 font-serif">Atölyeniz Henüz Boş</h2>
                <p className="mt-2 text-stone-500 max-w-md mx-auto">Yeni bir formül oluşturmak için yukarıdaki 'Yeni Üretim' butonuna tıklayarak atölyenizi doldurmaya başlayın.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {uretimler.map(uretim => (
                <UretimKarti 
                    key={uretim.id} 
                    uretim={uretim} 
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onOpenModal={onOpenModal}
                />
            ))}
        </div>
    );
};

export default AtolyeGorunumu;
