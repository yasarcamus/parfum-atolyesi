import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import YeniUretimFormu from './components/YeniUretimFormu';
import TestGirisModal from './components/TestGirisModal';
import AnalizModal from './components/AnalizModal';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import GirisZorunluModal from './components/GirisZorunluModal';
import MisafirAnaSayfa from './components/MisafirAnaSayfa';
import Sidebar from './components/Sidebar';
import AtolyeGorunumu from './components/AtolyeGorunumu';
import RehberBolumu from './components/RehberBolumu';

export default function App() {
    const [uretimler, setUretimler] = useState([]);
    const [modal, setModal] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [aktifSayfa, setAktifSayfa] = useState('atolyem');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser) {
                setAktifSayfa('atolyem');
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) { setUretimler([]); return; }
        const savedUretimler = localStorage.getItem(`parfumAtolyem_${user.uid}`);
        if (savedUretimler) setUretimler(JSON.parse(savedUretimler));
        else setUretimler([]);
    }, [user]);

    useEffect(() => {
        if (!user || !uretimler) return;
        localStorage.setItem(`parfumAtolyem_${user.uid}`, JSON.stringify(uretimler));
    }, [uretimler, user]);

    useEffect(() => {
        document.body.classList.toggle('modal-open', !!modal);
        return () => document.body.classList.remove('modal-open');
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
    
    const renderAktifSayfa = () => {
        switch (aktifSayfa) {
            case 'rehber':
                return <RehberBolumu onLoginClick={() => openModal('girisZorunlu')} isGuest={false} />;
            case 'ilham':
                return <MisafirAnaSayfa onOpenModal={openModal} isGuest={false} showTitle={false} />;
            case 'atolyem':
            default:
                return <AtolyeGorunumu 
                            uretimler={uretimler}
                            onUpdate={handleSaveUretim}
                            onDelete={handleDeleteUretim}
                            onOpenModal={openModal}
                        />;
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
            
            <div className="flex" style={{ height: 'calc(100vh - 73px)' }}>
                {user ? (
                    <>
                        <Sidebar aktifSayfa={aktifSayfa} setAktifSayfa={setAktifSayfa} />
                        <main className="flex-1 p-8 overflow-y-auto">
                           {renderAktifSayfa()}
                        </main>
                    </>
                ) : (
                    <main className="w-full p-4 sm:p-6 md:p-8 overflow-y-auto">
                        <MisafirAnaSayfa onOpenModal={openModal} isGuest={true} />
                    </main>
                )}
            </div>
           
            {modal?.name === 'yeniUretim' && <YeniUretimFormu onSave={handleSaveUretim} onClose={() => setModal(null)} />}
            {modal?.name === 'testGiris' && <TestGirisModal uretim={modal.props.uretim} onSave={handleSaveUretim} onClose={() => setModal(null)} />}
            {modal?.name === 'analiz' && <AnalizModal uretim={modal.props.uretim} onClose={() => setModal(null)} />}
            {modal?.name === 'girisZorunlu' && <GirisZorunluModal onClose={() => setModal(null)} />}
        </div>
    );
}

