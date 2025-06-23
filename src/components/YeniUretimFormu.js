import React, { useState } from 'react';
import Modal from './Modal';

const YeniUretimFormu = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({ 
        parfumAdi: '', esansOrani: '20', siseBoyutu: '50', notlar: '', dinlenmeSuresi: '15', hatirlatmaAktif: true,
        maliyet: { alkol: '', esans: '', sise: '', safSu: '' }
    });
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleMaliyetChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, maliyet: { ...prev.maliyet, [name]: value } }));
    }
    
    const handleSubmit = (e) => { e.preventDefault(); if(!formData.parfumAdi.trim() || !formData.dinlenmeSuresi) return; onSave(formData); };

    return (
        <Modal onClose={onClose}>
            <h2 className="text-3xl text-amber-900 p-6 pb-4 flex-shrink-0 font-serif">Yeni Formül Oluştur</h2>
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                <div className="p-6 pt-0 space-y-4 overflow-y-auto" style={{maxHeight: 'calc(90vh - 150px)'}}>
                    <div><label className="block text-sm font-medium text-stone-600">Parfüm Adı</label><input type="text" name="parfumAdi" value={formData.parfumAdi} onChange={handleChange} className="mt-1 block w-full bg-white border-stone-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
                    <div><label className="block text-sm font-medium text-stone-600">Notlar ve Karakter</label><textarea name="notlar" value={formData.notlar} onChange={handleChange} rows="3" className="mt-1 block w-full bg-white border-stone-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Örn: Vanilya, sıcak, odunsu..."></textarea></div>
                     <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-stone-600">Şişe Boyutu (ml)</label><select name="siseBoyutu" value={formData.siseBoyutu} onChange={handleChange} className="mt-1 block w-full bg-white border-stone-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"><option value="30">30</option><option value="50">50</option><option value="100">100</option></select></div>
                        <div><label className="block text-sm font-medium text-stone-600">Dinlenme Süresi (Gün)</label><input type="number" name="dinlenmeSuresi" value={formData.dinlenmeSuresi} onChange={handleChange} className="mt-1 block w-full bg-white border-stone-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500" required /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-stone-600">Esans Oranı: {formData.esansOrani}%</label><input type="range" min="10" max="40" step="1" name="esansOrani" value={formData.esansOrani} onChange={handleChange} className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer" /></div>
                    
                    <details className="border-t border-amber-200 pt-4">
                        <summary className="text-sm font-medium text-stone-600 cursor-pointer">Detaylı Maliyet Hesaplama (İsteğe Bağlı)</summary>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                           <div><label className="block text-xs font-medium text-stone-500">Alkol Maliyeti (₺)</label><input type="number" name="alkol" value={formData.maliyet.alkol} onChange={handleMaliyetChange} step="0.01" className="mt-1 w-full bg-white border-stone-300 rounded-md py-1 px-2 text-sm" /></div>
                           <div><label className="block text-xs font-medium text-stone-500">Esans Maliyeti (₺)</label><input type="number" name="esans" value={formData.maliyet.esans} onChange={handleMaliyetChange} step="0.01" className="mt-1 w-full bg-white border-stone-300 rounded-md py-1 px-2 text-sm" /></div>
                           <div><label className="block text-xs font-medium text-stone-500">Şişe Maliyeti (₺)</label><input type="number" name="sise" value={formData.maliyet.sise} onChange={handleMaliyetChange} step="0.01" className="mt-1 w-full bg-white border-stone-300 rounded-md py-1 px-2 text-sm" /></div>
                           <div><label className="block text-xs font-medium text-stone-500">Saf Su Maliyeti (₺)</label><input type="number" name="safSu" value={formData.maliyet.safSu} onChange={handleMaliyetChange} step="0.01" className="mt-1 w-full bg-white border-stone-300 rounded-md py-1 px-2 text-sm" /></div>
                        </div>
                    </details>
                    
                    <div className="border-t border-amber-200 pt-4">
                        <div className="flex items-center"><input id="hatirlatmaAktif" name="hatirlatmaAktif" type="checkbox" checked={formData.hatirlatmaAktif} onChange={handleChange} className="h-4 w-4 text-amber-700 border-stone-300 rounded focus:ring-amber-600" /><label htmlFor="hatirlatmaAktif" className="ml-2 block text-sm text-stone-700">Uygulama içi çalkalama hatırlatmalarını aç</label></div>
                    </div>

                </div>
                <div className="bg-white/50 px-6 py-4 flex justify-end gap-3 rounded-b-2xl border-t border-amber-100 flex-shrink-0">
                    <button type="button" onClick={onClose} className="bg-stone-200 text-stone-700 font-semibold px-4 py-2 rounded-lg hover:bg-stone-300 transition">İptal</button>
                    <button type="submit" className="bg-amber-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-amber-900 transition">Formülü Kaydet</button>
                </div>
            </form>
        </Modal>
    );
};

export default YeniUretimFormu;