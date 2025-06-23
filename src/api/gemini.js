export async function callGeminiAPI(prompt) {
    const apiKey = ""; // API Anahtarınızı buraya ekleyin veya bir ortam değişkeninden alın
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
