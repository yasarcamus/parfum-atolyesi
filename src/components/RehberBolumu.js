import React from 'react';

const rehberAdimlari = [
    {
        adim: "01",
        baslik: "Vizyonunu Belirle",
        aciklama: "Hayalindeki koku nasıl? Ferah, odunsu, baharatlı? İlham kaynaklarını topla ve parfümünün karakterini düşünerek işe başla."
    },
    {
        adim: "02",
        baslik: "Malzemelerini Hazırla",
        aciklama: "Yüksek kaliteli esansiyel yağlar, parfümör alkolü, bir cam beher ve hassas bir terazi temel ihtiyaçlarındır. Kalite, sonuçları doğrudan etkiler."
    },
    {
        adim: "03",
        baslik: "Formülünü Oluştur",
        aciklama: "Notalarını (üst, orta, alt) belirle ve oranlarını uygulamamıza girerek ilk denemeni yap. Aracımız, hesaplama hatalarını ortadan kaldırır."
    },
    {
        adim: "04",
        baslik: "Karıştır ve Dinlendir",
        aciklama: "Alkol ve esans karışımını dikkatlice yap ve en önemli adıma geç: sabır. Parfümün olgunlaşması için onu serin ve karanlık bir yerde dinlenmeye bırak."
    },
    {
        adim: "05",
        baslik: "Test Et ve Keyfini Çıkar",
        aciklama: "Dinlenme süresi sonunda parfümünü test et, notlarını al ve yarattığın eşsiz kokunun tadını çıkar. Her deneme yeni bir keşiftir."
    },
];

const RehberBolumu = ({ onLoginClick }) => {
    return (
        <div className="mt-16 mb-16">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-amber-900 font-serif">Parfüm Sanatına İlk Adım</h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-stone-600">
                    Kendi eşsiz kokunuzu yaratmak, birkaç basit adımdan oluşan büyülü bir yolculuktur. İşte temel rehberiniz:
                </p>
            </div>

            <div className="mt-12 max-w-4xl mx-auto relative">
                <div className="space-y-8">
                    {rehberAdimlari.map((step, index) => (
                        <div key={step.adim} className="flex gap-6">
                            <div className="flex-shrink-0 text-4xl font-bold text-orange-200 font-serif">
                                {step.adim}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-stone-800">{step.baslik}</h3>
                                <p className="mt-1 text-stone-500">{step.aciklama}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Giriş yapmamış kullanıcılar için gösterilecek katman */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-50 via-orange-50/80 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center justify-center pointer-events-auto">
                     <button 
                        onClick={onLoginClick}
                        className="bg-amber-800 text-white font-bold py-3 px-8 rounded-lg shadow-xl shadow-amber-800/20 hover:bg-amber-900 transition-all transform hover:scale-105"
                    >
                        Tüm Rehberi ve Araçları Keşfetmek İçin Giriş Yapın
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RehberBolumu;

