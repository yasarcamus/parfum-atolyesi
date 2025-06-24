export const calculateKalanGun = (baslangicTarihi, dinlenmeSuresi) => {
    const gecenGun = Math.floor((new Date() - new Date(baslangicTarihi)) / (1000 * 60 * 60 * 24));
    return Math.max(0, (parseInt(dinlenmeSuresi) || 15) - gecenGun);
};

export const getCalkalamaMesaji = (uretim) => {
    // Hatırlatma kapalıysa veya bir saat belirtilmemişse, mesaj gösterme.
    if (!uretim.hatirlatmaAktif || !uretim.hatirlatmaSaati) return null;
    
    const dinlenmeSuresi = parseInt(uretim.dinlenmeSuresi) || 15;
    const kalanGun = calculateKalanGun(uretim.baslangicTarihi, dinlenmeSuresi);
    if (kalanGun === 0) return null;
    
    const gecenGun = dinlenmeSuresi - kalanGun;
    
    // YENİ: Mesaja kullanıcının seçtiği saati ekliyoruz.
    const mesaj = `Günlük çalkalama zamanı (${uretim.hatirlatmaSaati}) 💧`;
    
    if (gecenGun < dinlenmeSuresi / 2) {
        return mesaj;
    }
    if (gecenGun >= dinlenmeSuresi / 2 && gecenGun % 2 === 0) {
        return mesaj;
    }
    return null;
};