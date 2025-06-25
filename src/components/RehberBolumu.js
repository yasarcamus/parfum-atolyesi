import React from 'react';

// Yeni, detaylı rehber içeriğimiz
const GuideSection = ({ title, children }) => (
    <section className="mb-12">
        <h2 className="text-3xl font-bold text-amber-900 font-serif border-b-2 border-amber-200 pb-2 mb-4">{title}</h2>
        <div className="space-y-4 text-stone-700 leading-relaxed">
            {children}
        </div>
    </section>
);

const RehberBolumu = ({ onLoginClick, isGuest }) => {
    return (
        <div className="relative max-w-4xl mx-auto">
            <div className="prose prose-lg prose-stone max-w-none">
                <GuideSection title="Başlangıç: Koku Maceranıza Hoş Geldiniz!">
                    <p>
                        Kendi parfümünüzü yaratma fikri, ilk başta göz korkutucu ve yalnızca kimyagerlere özgü karmaşık bir süreç gibi görünebilir. Ancak gerçek şu ki, doğru bilgi ve malzemelerle bu uğraş, son derece keyifli, yaratıcı ve ödüllendirici bir hobiye dönüşebilir. Yıllarımı parfüm atölyelerinde yeni başlayanlara yol göstererek geçirdim ve şimdi bu tecrübeyi size aktarmak için buradayım. Elinizdeki o küçük esans şişesi, birazdan sizin imzanız olacak, anılarınızı taşıyacak ve karakterinizi yansıtacak bir sanat eserine dönüşecek. Bu rehber, en sık sorulan soruları yanıtlamak, en yaygın hataları önlemek ve sizi bu yolculukta bir usta gibi yönlendirmek için tasarlandı. Hazırsanız, atölyemize başlayalım!
                    </p>
                </GuideSection>

                {/* Misafir kullanıcılar için bu bölümün altı kilitli olacak */}
                <div className="relative">
                    <GuideSection title="Bölüm 1: 'Hazır Esans' ile Parfüm Yapımının Temelleri">
                        <h3 className="text-xl font-semibold font-serif text-stone-800">"Hazır Parfüm Esansı" Nedir?</h3>
                        <p>
                            Elinizde tuttuğunuz "hazır parfüm esansı," parfüm dünyasına atılan en sağlam ilk adımdır. Parfüm yapımına sıfırdan, yani tek tek aroma kimyasallarını alarak başlamak, bir orkestra şefinin yüzlerce farklı enstrüman için tek tek nota yazmasına benzer. Bu, derin bir bilgi, tecrübe ve denge yeteneği gerektirir. "Hazır esans" ise, usta bir bestecinin bu notaları bir araya getirerek yarattığı bitmiş bir senfonidir. Sizin göreviniz ise bu bitmiş besteyi alıp, onu icra edecek orkestrayı (alkolü) ekleyerek kokuyu hayata geçirmektir.
                        </p>
                        <h3 className="text-xl font-semibold font-serif text-stone-800 mt-6">Neden Hazır Esansla Başlamalısınız?</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Karmaşıklığı Ortadan Kaldırır:</strong> En zor adım olan formül dengeleme işi sizin için zaten yapılmıştır.</li>
                            <li><strong>Başarıyı Garanti Eder:</strong> Doğru adımlarla sonuçta "güzel kokan" bir ürün elde etme olasılığınız çok yüksektir. Bu, motivasyonunuzu korumanızı sağlar.</li>
                            <li><strong>Daha Ekonomiktir:</strong> Onlarca farklı kimyasal almak yerine tek bir şişe ile başlayarak maliyeti düşürürsünüz.</li>
                        </ul>
                    </GuideSection>

                    <GuideSection title="Bölüm 2: Gerekli Malzemeler ve Seçim Kriterleri">
                        <h3 className="text-xl font-semibold font-serif text-stone-800">Parfümün Ruhu: Kozmetik Sınıfı Etil Alkol</h3>
                        <p>
                            Mutlaka kozmetik sınıfı, %96 ve üzeri saflıkta etil alkol (etanol) kullanmalısınız. Daha düşük saflıktaki alkoller yüksek oranda su içerir ve bu su, yağ bazlı esansın çözünmesini engelleyerek parfümünüzün bulanıklaşmasına neden olur. "Denatüre alkol" ifadesi sizi korkutmasın; bu, alkolün içilmesini engelleyen, cilde teması tamamen güvenli bir maddedir ve kullanmanız gereken doğru üründür.
                        </p>
                        <h3 className="text-xl font-semibold font-serif text-stone-800 mt-6">Yardımcı Ekipmanlarınız</h3>
                         <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Cam Beher:</strong> Karışımınızı hazırlamak için en ideal, reaktif olmayan kaptır.</li>
                            <li><strong>Dereceli Silindir (Mezür) veya Hassas Terazi:</strong> Yeni başlayanlar için mililitre (ml) ölçümü daha kolaydır. Profesyonel sonuçlar için 0.01g hassasiyetinde terazi önerilir.</li>
                             <li><strong>Cam Parfüm Şişesi:</strong> Parfümünüzü saklamak için mutlaka cam şişe kullanın. Plastik, kokuya ve kimyasal yapıya zarar verebilir.</li>
                        </ul>
                    </GuideSection>
                    
                    {/* İlerleyen bölümler burada yer alacak */}
                    <div className={isGuest ? 'blur-sm' : ''}>
                         <GuideSection title="Bölüm 3: Adım Adım Formülasyon: Altın Oranlar">
                             <p>Bu bölümde, EDP ve EDT gibi popüler konsantrasyonların nasıl hesaplandığını, 50ml'lik bir şişe için somut reçeteleri ve karıştırmanın en kritik kuralı olan "önce esans, sonra alkol" tekniğini öğreneceksiniz.</p>
                         </GuideSection>
                         <GuideSection title="Bölüm 4: Maserasyon: Sabrın Meyvesi">
                            <p>Parfümünüzün ilk başta neden sadece alkol koktuğunu ve "maserasyon" (dinlendirme) sürecinin kokunun karakterini ve kalıcılığını nasıl dönüştürdüğünü keşfedeceksiniz. İdeal saklama koşulları ve süreleri hakkında her şey burada.</p>
                         </GuideSection>
                         <GuideSection title="Bölüm 5: Sıkça Karşılaşılan Sorunlar ve Çözümleri">
                            <p>"Parfümüm neden bulanık oldu?", "Neden kalıcı değil?" gibi en yaygın sorunların ardındaki sebepleri ve pratik çözümlerini bu bölümde bulacaksınız.</p>
                         </GuideSection>
                    </div>

                    {isGuest && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-orange-50 via-orange-50/90 to-transparent pointer-events-none">
                            <div className="text-center p-8 pointer-events-auto">
                                 <button 
                                    onClick={onLoginClick}
                                    className="bg-amber-800 text-white font-bold py-4 px-10 rounded-lg shadow-xl shadow-amber-800/20 hover:bg-amber-900 transition-all transform hover:scale-105"
                                >
                                    Tüm Uzman Rehberini Okumak İçin Giriş Yapın
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RehberBolumu;
