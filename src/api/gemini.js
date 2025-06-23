// Dosya Yolu: src/api/gemini.js

export async function callGeminiAPI(prompt) {
    // Kodu, Netlify'a eklediğimiz ortam değişkenini okuyacak şekilde güncelliyoruz.
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

    if (!apiKey) {
        console.error("Gemini API anahtarı bulunamadı!");
        return "Yapay zeka özelliği için API anahtarı yapılandırılmamış. Lütfen site yöneticisi ile iletişime geçin.";
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API çağrısı başarısız oldu: ${response.status} - ${errorBody}`);
        }
        const result = await response.json();
        if (result.candidates && result.candidates.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            return "Yapay zekadan geçerli bir yanıt alınamadı.";
        }
    } catch (error) {
        console.error("Gemini API hatası:", error);
        return "Yapay zeka ile iletişim kurarken bir hata oluştu. Lütfen API anahtarınızın geçerli olduğundan emin olun ve tekrar deneyin.";
    }
}
