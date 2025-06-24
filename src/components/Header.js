import React from 'react';
import { PlusIcon } from './Icons';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const Header = ({ user, auth, onNewUretim }) => {

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google ile giriş hatası:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Çıkış yapma hatası:", error);
        }
    };

    return (
        <header className="bg-orange-50/80 backdrop-blur-lg sticky top-0 z-40 p-4 flex justify-between items-center border-b border-amber-200/60">
            <h1 className="text-3xl text-amber-900 font-serif">
                Parfüm Atölyem
            </h1>
            <div className="flex items-center gap-4">
                {user && (
                    <button 
                        onClick={onNewUretim} 
                        className="flex items-center gap-2 bg-amber-800 text-white font-semibold px-4 py-2 rounded-lg shadow-lg shadow-amber-800/20 hover:bg-amber-900 transition-all duration-300 transform hover:scale-105"
                    >
                        <PlusIcon />
                        <span className="hidden sm:inline">Yeni Üretim</span>
                    </button>
                )}
                
                {user ? (
                    <div className="flex items-center gap-3">
                        <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border-2 border-amber-700" />
                        <button onClick={handleLogout} className="text-sm text-stone-600 hover:underline">Çıkış Yap</button>
                    </div>
                ) : (
                    <button onClick={handleGoogleLogin} className="bg-white border border-stone-300 px-4 py-2 rounded-lg font-semibold text-stone-700 hover:bg-stone-100 transition-colors">
                        Google ile Giriş Yap
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
