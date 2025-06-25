import React from 'react';

const rehberAdimlari = [
    { adim: "01", baslik: "Vizyonunu Belirle: Hikayen Ne?", aciklama: "Her parfüm bir hikaye anlatır. Seninki hangisi olacak? Yağmurlu bir orman yürüyüşü mü, yoksa sıcak bir yaz akşamı mı? İlham panonu oluştur, notalarını (ferah, odunsu, baharatlı) ve karakterini düşünerek işe başla." },
    { adim: "02", baslik: "Malzemelerini Hazırla: Sanatçının Paleti", aciklama: "Yüksek kaliteli esansiyel yağlar, mutlaklar (absolutes), parfümör alkolü (SDA 40-B gibi), bir cam beher ve 0.01g hassasiyetinde bir terazi temel ihtiyaçlarındır. Unutma, enstrümanlarının kalitesi, müziğinin kalitesini belirler." },
    { adim: "03", baslik: "Formülünü Oluştur: Mimari Plan", aciklama: "Parfümeri bir mimaridir. Üst, orta ve alt notalarını bir piramit gibi düşün. Hangi notanın ne zaman ortaya çıkacağını planla. Uygulamamızın formül yaratıcısı ile oranları girerek ilk denemeni yap. Aracımız, hesaplama hatalarını ortadan kaldırarak yaratıcılığına odaklanmanı sağlar." },
    { adim: "04", baslik: "Karıştır ve Dinlendir: Sabır Sanatı", aciklama: "Alkol ve esans karışımını dikkatlice yap ve en zorlu ama en önemli adıma geç: maserasyon. Parfümün moleküllerinin birbirine bağlanıp olgunlaşması için onu en az 3-4 hafta serin ve karanlık bir yerde dinlenmeye bırak. Gerçek sihir burada başlar." },
    { adim: "05", baslik: "Test Et ve Geliştir: Son Dokunuşlar", aciklama: "Dinlenme süresi sonunda parfümünü bir test şeridine ve cildine sıkarak test et. Notaların açılışını, gelişimini ve kuruyuşunu gözlemle. Uygulamamıza kalıcılık ve yayılım notlarını girerek formülünü bir sonraki sefer için nasıl daha iyi hale getirebileceğini analiz et." },
];

const RehberBolumu = ({ onLoginClick, isGuest }) => {
    return (
        <div className="relative">
            <div className="space-y-10">
                {rehberAdimlari.map((step) => (
                    <div key={step.adim} className="flex gap-6">
                        <div className="flex-shrink-0 text-5xl font-bold text-orange-200 font-serif pt-1">
                            {step.adim}
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-stone-800 font-serif">{step.baslik}</h3>
                            <p className="mt-2 text-stone-600 leading-relaxed">{step.aciklama}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {isGuest && (
                <>
                    <div className="absolute -bottom-8 left-0 right-0 h-96 bg-gradient-to-t from-orange-50 via-orange-50/95 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center justify-center pointer-events-auto">
                         <button 
                            onClick={onLoginClick}
                            className="bg-amber-800 text-white font-bold py-4 px-10 rounded-lg shadow-xl shadow-amber-800/20 hover:bg-amber-900 transition-all transform hover:scale-105"
                        >
                            Daha Fazla Adım ve Gelişmiş Araçlar İçin Giriş Yapın
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RehberBolumu;