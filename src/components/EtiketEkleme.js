import React, { useState } from 'react';

const EtiketEkleme = ({ onAdd }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [etiket, setEtiket] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { 
            e.preventDefault(); 
            onAdd(etiket.trim()); 
            setEtiket(''); 
            setIsEditing(false); 
        } else if (e.key === 'Escape') { 
            setIsEditing(false); 
            setEtiket(''); 
        }
    };
    if (isEditing) return <input type="text" value={etiket} onChange={e => setEtiket(e.target.value)} onKeyDown={handleKeyDown} onBlur={() => setIsEditing(false)} className="text-xs bg-transparent border-b border-orange-400 focus:outline-none w-20" autoFocus />;
    return <button onClick={() => setIsEditing(true)} className="text-xs text-orange-600 hover:text-orange-900 border border-dashed border-orange-400 rounded-full w-5 h-5 flex items-center justify-center">+</button>;
};

export default EtiketEkleme;
