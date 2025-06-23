import React, { useState } from 'react';
import Modal from './Modal';

const TestGirisModal = ({ uretim, onSave, onClose }) => {
    const [testData, setTestData] = useState(uretim.test || { kalicilik: '3', silaj: '3', begeni: '3', yorum: '' });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        onSave({ ...uretim, test: testData }); 
    };
    
    return(
        <Modal onClose={onClose}>
            <h2 className="text-3xl text-amber-900 p-6 pb-4 flex-shrink-0 font-serif">{`"${uretim.parfumAdi}" Değerlendir`}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                <div className="p-6 pt-0 space-y-4 overflow-y-auto" style={{maxHeight: 'calc(90vh - 150px)'}}>
                    {['kalicilik', 'silaj', 'begeni'].map(alan => (
                        <div key={alan}>
                            <label className="block text-sm font-medium text-stone-600 capitalize">{alan === 'silaj' ? 'Yayılım (Silaj)' : alan}: <span className="font-bold text-amber-800">{testData[alan]}/5</span></label>
                            <input type="range" min="1" max="5" name={alan} value={testData[alan]} onChange={handleChange} className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                    ))}
                    <div><label className="block text-sm font-medium text-stone-600">Ek Yorumlar</label><textarea name="yorum" value={testData.yorum} onChange={handleChange} rows="4" className="mt-1 block w-full bg-white border-stone-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Tende ve kumaşta nasıl durdu? Hangi mevsim/ortam için uygun?"></textarea></div>
                </div>
                <div className="bg-white/50 px-6 py-4 flex justify-end gap-3 rounded-b-2xl border-t border-amber-100 flex-shrink-0">
                    <button type="button" onClick={onClose} className="bg-stone-200 text-stone-700 font-semibold px-4 py-2 rounded-lg hover:bg-stone-300 transition">İptal</button>
                    <button type="submit" className="bg-amber-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-amber-900 transition">Değerlendirmeyi Kaydet</button>
                </div>
            </form>
        </Modal>
    );
};

export default TestGirisModal;