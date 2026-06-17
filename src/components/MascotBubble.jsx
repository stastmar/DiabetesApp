import React, { useEffect, useState } from 'react';

export default function MascotBubble({ message = '', open = undefined, onClose }) {
  const [visible, setVisible] = useState(!!open);

  useEffect(() => {
    if (typeof open === 'boolean') setVisible(open);
  }, [open]);

  const toggle = () => {
    const next = !visible;
    setVisible(next);
    if (!next && typeof onClose === 'function') onClose();
  };

  return (
    <div style={{ position: 'absolute', top: 8, right: 8 }}>
      <div className="mascot-btn" onClick={toggle} role="button" aria-label="Cukřík">
        <div style={{width:48,height:48,borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',background:'#0b1220',overflow:'hidden',border:'1px solid rgba(255,255,255,0.06)'}}>
          {/* Inline white cat SVG to ensure mascot always visible */}
          <svg width="44" height="44" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <circle cx="64" cy="64" r="62" fill="#0b1220" />
            <path fill="#fff" stroke="#e6eef6" strokeWidth="1" d="M64 22c-6-10-20-10-28 0-8 10-4 26 0 34 4 8 8 12 12 14 4 2 10 4 16 4s12-2 16-4c4-2 8-6 12-14 4-8 8-24 0-34-8-10-22-10-28 0z" />
            <ellipse cx="50" cy="56" rx="6" ry="8" fill="#5db8ff" />
            <ellipse cx="78" cy="56" rx="6" ry="8" fill="#5db8ff" />
            <circle cx="52" cy="54" r="1.5" fill="#fff" />
            <circle cx="80" cy="54" r="1.5" fill="#fff" />
          </svg>
        </div>
      </div>

      {visible && (
        <div className="mascot-bubble" onClick={(e) => e.stopPropagation()}>
          <div style={{fontWeight:700}}>Cukřík</div>
          <div style={{fontSize:13,opacity:0.9,marginTop:6}}>{message}</div>
          <div style={{textAlign:'right',marginTop:8}}>
            <button onClick={() => { setVisible(false); if (typeof onClose === 'function') onClose(); }}>Zavřít</button>
          </div>
        </div>
      )}
    </div>
  )
}
