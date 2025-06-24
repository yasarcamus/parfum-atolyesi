import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UretimKarti from './components/UretimKarti';
import YeniUretimFormu from './components/YeniUretimFormu';
import TestGirisModal from './components/TestGirisModal';
import AnalizModal from './components/AnalizModal';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import GirisZorunluModal from './components/GirisZorunluModal';
import RehberBolumu from './components/RehberBolumu'; // YENİ

export default function App() {
    const [uretimler, setUretimler] = useState([]);
    const [modal, setModal] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // YENİ: Veri yükleme ve kaydetme mantığı basitleştirildi.
    // Bu bölüm, bir sonraki adımımız olan Firestore entegrasyonu ile tamamen değişecek.
    useEffect(() => {
        if (!user) {
            setUretimler([]); 
            return;
        }
        try {
            const savedUretimler = localStorage.getItem(`parfumAtolyem_${user.uid}`);
            if (savedUretimler) setUretimler(JSON.parse(savedUretimler));
        } catch (error) { console.error("Veri yüklenemedi:", error); }
    }, [user]);

    useEffect(() => {
        if (!user || !uretimler) return;
        try {
            localStorage.setItem(`parfumAtolyem_${user.uid}`, JSON.stringify(uretimler));
        } catch (error) { console.error("Veri kaydedilemedi:", error); }
    }, [uretimler, user]);

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

    const handleNewUretimClick = () => {
        if (user) {
            openModal('yeniUretim');
        } else {
            openModal('girisZorunlu');
        }
    };

    if (isLoading) {
        return (
            <div className="bg-orange-50 min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin"></div>
            </div>
        );
    }
    
    return (
        <div className="bg-orange-50 min-h-screen font-sans">
            <Header user={user} auth={auth} onNewUretimClick={handleNewUretimClick} />
            
            <main className="p-4 sm:p-6 md:p-8">
                {user ? (
                    // GİRİŞ YAPMIŞ KULLANICI GÖRÜNÜMÜ
                    <>
                        {uretimler.length === 0 ? (
                            <div className="text-center py-10 px-6">
                                <h2 className="text-2xl font-semibold text-amber-900 font-serif">Atölyeniz Henüz Boş</h2>
                                <p className="mt-2 text-stone-500 max-w-md mx-auto">İlk parfüm formülünüzü oluşturmak için yukarıdaki 'Yeni Üretim' butonuna tıklayın.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {uretimler.map(uretim => (
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
                    </>
                ) : (
                    // MİSAFİR KULLANICI GÖRÜNÜMÜ
                    <RehberBolumu onLoginClick={() => openModal('girisZorunlu')} />
                )}
            </main>
           
            {modal?.name === 'yeniUretim' && <YeniUretimFormu onSave={handleSaveUretim} onClose={() => setModal(null)} />}
            {modal?.name === 'testGiris' && <TestGirisModal uretim={modal.props.uretim} onSave={handleSaveUretim} onClose={() => setModal(null)} />}
            {modal?.name === 'analiz' && <AnalizModal uretim={modal.props.uretim} onClose={() => setModal(null)} />}
            {modal?.name === 'girisZorunlu' && <GirisZorunluModal onClose={() => setModal(null)} />}
        </div>
    );
}

