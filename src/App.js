import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UretimKarti from './components/UretimKarti';
import YeniUretimFormu from './components/YeniUretimFormu';
import TestGirisModal from './components/TestGirisModal';
import AnalizModal from './components/AnalizModal';
import { FlaskIcon } from './components/Icons';

export default function App() {
    const [uretimler, setUretimler] = useState([]);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        try {
            const savedUretimler = localStorage.getItem('parfumAtolyem_profesyonel_vFinal');
            if (savedUretimler) setUretimler(JSON.parse(savedUretimler));
        } catch (error) { console.error("Veri yüklenemedi:", error); }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('parfumAtolyem_profesyonel_vFinal', JSON.stringify(uretimler));
        } catch (error) { console.error("Veri kaydedilemedi:", error); }
    }, [uretimler]);
    
    useEffect(() => {
        const body = document.body;
        if (modal) {
            body.classList.add('modal-open');
        } else {
            body.classList.remove('modal-open');
        }
        return () => {
            body.classList.remove('modal-open');
        };
    }, [modal]);
    
    const handleSaveUretim = (uretimData) => {
        if (uretimData.id) {
            setUretimler(prev => prev.map(u => u.id === uretimData.id ? uretimData : u));
        } else {
            const uretimObj = { ...uretimData, id: Date.now(), baslangicTarihi: new Date().toISOString(), test: null, etiketler: ["Yeni Deneme"] };
            setUretimler(prev => [...prev, uretimObj]);
        }
        setModal(null);
    };

    const handleDeleteUretim = (uretimId) => {
        setUretimler(prev => prev.filter(u => u.id !== uretimId));
    };

    const openModal = (modalName, props = {}) => {
        setModal({ name: modalName, props });
    };

    return (
        <div className="bg-orange-50 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Header onNewUretim={() => openModal('yeniUretim')} />
            <main className="p-4 sm:p-6 md:p-8">
                {uretimler.length === 0 ? (
                     <div className="text-center py-20 px-6">
                         <FlaskIcon />
                        <h2 className="mt-4 text-2xl font-semibold text-amber-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Atölyenizde Üretim Başlatın</h2>
                        <p className="mt-2 text-stone-500 max-w-md mx-auto">Yeni bir parfüm formülü oluşturarak sanatsal yolculuğunuza başlayın. Yukarıdaki butona tıklayarak ilk üretiminizi kaydedin.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {uretimler.sort((a, b) => new Date(b.baslangicTarihi) - new Date(a.baslangicTarihi)).map(uretim => (
                            <UretimKarti 
                                key={uretim.id} 
                                uretim={uretim} 
                                onUpdate={handleSaveUretim}
                                onDelete={() => handleDeleteUretim(uretim.id)}
                                onOpenModal={openModal}
                            />
                        ))}
                    </div>
                )}
            </main>
            {modal?.name === 'yeniUretim' && <YeniUretimFormu onSave={handleSaveUretim} onClose={() => setModal(null)} />}
            {modal?.name === 'testGiris' && <TestGirisModal uretim={modal.props.uretim} onSave={handleSaveUretim} onClose={() => setModal(null)} />}
            {modal?.name === 'analiz' && <AnalizModal uretim={modal.props.uretim} onClose={() => setModal(null)} />}
        </div>
    );
}