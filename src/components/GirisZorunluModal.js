import React from 'react';
import Modal from './Modal';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FlaskIcon } from './Icons';

const GirisZorunluModal = ({ onClose }) => {
    
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            onClose(); // Giriş başarılı olunca modal'ı kapat
        } catch (error) {
            console.error("Google ile giriş hatası:", error);
        }
    };

    return (
        <Modal onClose={onClose}>
            <div className="p-6 text-center">
                <div className="mx-auto bg-amber-100 rounded-full h-16 w-16 flex items-center justify-center">
                    <FlaskIcon />
                </div>
                <h2 className="text-3xl mt-4 text-amber-900 font-serif">Atölyenize Adım Atın</h2>
                <p className="text-stone-600 mt-2">
                    Formüllerinizi güvenle kaydetmek, onlara her cihazdan ulaşmak ve hatırlatmalar almak için lütfen giriş yapın.
                </p>
                <button 
                    onClick={handleGoogleLogin} 
                    className="mt-6 w-full bg-amber-800 text-white font-semibold py-3 rounded-lg hover:bg-amber-900 transition-colors"
                >
                    Google ile Hızlı Giriş Yap
                </button>
            </div>
        </Modal>
    );
};

export default GirisZorunluModal;
