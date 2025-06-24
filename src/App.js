import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UretimKarti from './components/UretimKarti';
import YeniUretimFormu from './components/YeniUretimFormu';
import TestGirisModal from './components/TestGirisModal';
import AnalizModal from './components/AnalizModal';
import { FlaskIcon } from './components/Icons';
import IpucuKarti from './components/IpucuKarti';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";

const ipuclari = [
    "Dinlendirme sırasında şişeyi doğrudan güneş ışığından ve ısı kaynaklarından uzak tutun.",
    "İyi bir çalkalama, esans ve alkol moleküllerinin daha iyi bütünleşmesini sağlar.",
    "Parfümünüzü test ederken, önce bir kağıt test çubuğuna sıkıp birkaç dakika bekleyin.",
    "Kalıcılığı artırmak için formülünüze bir miktar gliserin veya ISO E Super gibi bir fiksatör eklemeyi düşünebilirsiniz.",
    "Farklı esans oranları (%EDP, %EDT) parfümün karakterini ve performansını tamamen değiştirir. Denemekten çekinmeyin!",
    "Parfüm notaları zamanla olgunlaşır. İlk günkü koku ile bir ay sonraki koku arasında fark olacaktır.",
    "Maliyet hesabı yaparken kullandığınız her malzemenin (hatta suyun bile) gram/ml maliyetini not alın."
];

export default function App() {
    const [uretimler, setUretimler] = useState([]);
    const [modal, setModal] = useState(null);
    const [aktifIpucu, setAktifIpucu] = useState('');
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setAktifIpucu(ipuclari[Math.floor(Math.random() * ipuclari.length)]);
        const intervalId = setInterval(() => {
            setAktifIpucu(ipuclari[Math.floor(Math.random() * ipuclari.length)]);
        }, 15000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!user) return; // Kullanıcı giriş yapmadıysa localStorage ile işlem yapma
        try {
            const savedUretimler = localStorage.getItem(`parfumAtolyem_${user.uid}`);
            if (savedUretimler) setUretimler(JSON.parse(savedUretimler));
        } catch (error) { console.error("Veri yüklenemedi:", error); }
    }, [user]);

    useEffect(() => {
        if (!user) return; // Kullanıcı giriş yapmadıysa localStorage'a kaydetme
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

    if (isLoading) {
        return (
            <div className="bg-orange-50 min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-orange-50 min-h-screen font-sans">
            <Header user={user} auth={auth} onNewUretim={() => openModal('yeniUretim')} />
            
            {user ? (
                 <main className="p-4 sm:p-6 md:p-8">
                    {uretimler.length === 0 ? (
                        <div className="text-center py-10 px-6">
                            <h2 className="text-2xl font-semibold text-amber-900 font-serif">Atölyeniz Henüz Boş</h2>
                            <p className="mt-2 text-stone-500 max-w-md mx-auto">İlk parfüm formülünüzü oluşturmak için yukarıdaki 'Yeni Üretim' butonuna tıklayın.</p>
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
                    <IpucuKarti tip={aktifIpucu} />
                </main>
            ) : (
                <div className="text-center py-20 px-6">
                    <FlaskIcon />
                    <h2 className="text-4xl mt-4 font-bold text-amber-900 font-serif">Parfüm Atölyenize Hoş Geldiniz</h2>
                    <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">Kendi özel parfümlerinizi yaratın, formüllerinizi kaydedin ve maliyetlerinizi takip edin. Başlamak için lütfen giriş yapın.</p>
                </div>
            )}
           
            {modal?.name === 'yeniUretim' && <YeniUretimFormu onSave={handleSaveUretim} onClose={() => setModal(null)} />}
            {modal?.name === 'testGiris' && <TestGirisModal uretim={modal.props.uretim} onSave={handleSaveUretim} onClose={() => setModal(null)} />}
            {modal?.name === 'analiz' && <AnalizModal uretim={modal.props.uretim} onClose={() => setModal(null)} />}
        </div>
    );
}