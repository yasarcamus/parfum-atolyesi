import React from 'react';
import UretimKarti from './UretimKarti';
import RehberBolumu from './RehberBolumu';

const demoUretimler = [
    { id: 'demo1', parfumAdi: 'Akdeniz Sabahı', esansOrani: '18', dinlenmeSuresi: '21', notlar: 'Üst notalarda bergamot ve mandalina, kalbinde yasemin ve incir yaprağı. Ferah, canlandırıcı ve yeşil bir başlangıç.', baslangicTarihi: '2024-05-20T10:00:00.000Z', etiketler: ['Yazlık', 'Ferah', 'Narenciye'], test: { kalicilik: '4', silaj: '3', begeni: '5' } },
    { id: 'demo2', parfumAdi: 'Kış Gecesi', esansOrani: '25', dinlenmeSuresi: '45', notlar: 'Sıcak baharatlar, vanilya ve tütün notalarının birleşimi. Yoğun ve etkileyici bir koku.', baslangicTarihi: '2024-04-10T10:00:00.000Z', etiketler: ['Kışlık', 'Yoğun', 'Tatlı'], test: { kalicilik: '5', silaj: '4', begeni: '5' } },
];

const MisafirAnaSayfa = ({ onOpenModal, isGuest, showTitle = true }) => {
    return (
        <div>
            {showTitle && (
                // DÜZENLENDİ: Üst boşluk azaltıldı.
                <div className="text-center pt-4 pb-10">
                     <h1 className="text-5xl font-bold text-amber-900 font-serif">Parfüm Sanatını Keşfet</h1>
                     <p className="mt-4 max-w-3xl mx-auto text-xl text-stone-600">
                        Kendi imza kokunuzu yaratmak için ihtiyacınız olan tüm araçlar, bilgiler ve ilham burada.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Sol Taraf: Örnek Kartlar */}
                {showTitle && (
                     // DÜZENLENDİ: "Atölyede neler yapabilirsiniz" başlığı kaldırıldı.
                    <div className="lg:col-span-1 space-y-8">
                         {demoUretimler.map(uretim => (
                            <UretimKarti key={uretim.id} uretim={uretim} isGuest={true} onOpenModal={onOpenModal} />
                         ))}
                    </div>
                )}
                
                {/* Sağ Taraf: Rehber */}
                <div className={`lg:col-span-2 ${!showTitle && 'lg:col-span-3'}`}>
                    <div className="relative">
                        {isGuest ? (
                            <RehberBolumu onLoginClick={() => onOpenModal('girisZorunlu')} isGuest={true} />
                        ): (
                             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {demoUretimler.map(uretim => (
                                    <UretimKarti key={uretim.id} uretim={uretim} isGuest={true} onOpenModal={onOpenModal} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MisafirAnaSayfa;