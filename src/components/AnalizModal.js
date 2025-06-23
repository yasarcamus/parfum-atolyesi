import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { callGeminiAPI } from '../api/gemini';
import { SparklesIcon } from './Icons';

const AnalizModal = ({uretim, onClose}) => {
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const analyze = async () => {
            setIsLoading(true);
            const prompt = `Bir parfümün test sonuçları şunlardır: Kalıcılık ${uretim.test.kalicilik}/5, Yayılım ${uretim.test.silaj}/5, Genel Beğeni ${uretim.test.begeni}/5. Kullanıcı yorumu: '${uretim.test.yorum}'. Bu parfüme dair kısa, etkileyici bir özet ve bir sonraki üretim için 2 adet geliştirme önerisi sun. Cevabını Markdown formatında, başlıklar ve listeler kullanarak hazırla.`;
            const apiResult = await callGeminiAPI(prompt);
            setResult(apiResult);
            setIsLoading(false);
        };
        if(uretim.test){
            analyze();
        }
    }, [uretim]);

    return (
        <Modal onClose={onClose}>
            <h2 className="text-3xl text-amber-900 p-6 pb-4 flex items-center gap-2 flex-shrink-0 font-serif">
                <SparklesIcon className="h-6 w-6 text-purple-500"/>
                Yapay Zeka Analizi
            </h2>
            <div className="px-6 pb-6 overflow-y-auto" style={{maxHeight: 'calc(85vh - 130px)'}}>
                 <p className="text-stone-600 mb-4 text-sm">"{uretim.parfumAdi}" için</p>
                 {isLoading ? (
                    <div className="min-h-[200px] flex flex-col items-center justify-center text-center">
                        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-stone-600">Analiz ediliyor...</p>
                    </div>
                 ) : (
                    <div className="prose prose-sm prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />').replace(/##\s?(.*)/g, '<h3 class="font-serif font-bold text-lg mb-2 mt-4">$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\* (.*?)(<br \/>|$)/g, '<li class="ml-4" style="list-style-type: disc;">$1</li>') }} />
                 )}
            </div>
             <div className="bg-white/50 px-6 py-4 flex justify-end gap-3 rounded-b-2xl border-t border-amber-100 flex-shrink-0">
                <button type="button" onClick={onClose} className="bg-stone-200 text-stone-700 font-semibold px-4 py-2 rounded-lg hover:bg-stone-300 transition">Kapat</button>
            </div>
        </Modal>
    )
};

export default AnalizModal;