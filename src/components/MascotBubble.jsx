import React, { useEffect, useState } from 'react';

export default function MascotBubble({ message = '', open = undefined, onClose }) {
  const [visible, setVisible] = useState(!!open);
  const [hasPng, setHasPng] = useState(null);

  useEffect(() => {
    if (typeof open === 'boolean') setVisible(open);
  }, [open]);

  // try to preload PNG to avoid broken <img> rendering
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => { if (!cancelled) setHasPng(true); };
    img.onerror = () => { if (!cancelled) setHasPng(false); };
    img.src = '/cukrik.png';
    return () => { cancelled = true; };
  }, []);

  const toggle = () => {
    const next = !visible;
    setVisible(next);
    if (!next && typeof onClose === 'function') onClose();
  };

  return (
    <div style={{ position: 'absolute', top: 8, right: 8 }}>
      <div className="mascot-btn" onClick={toggle} role="button" aria-label="Cukřík">
        <div style={{width:48,height:48,borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',background:'#0b1220',overflow:'hidden',border:'1px solid rgba(255,255,255,0.06)'}}>
          {hasPng === null && (
            // loading placeholder
            <div style={{width:32,height:32,borderRadius:16,background:'#ffffff22'}} />
          )}

          {hasPng === true && (
            <img src="/cukrik.png" alt="Cukřík" style={{width:44,height:44,objectFit:'cover',display:'block'}} />
          )}

          {hasPng === false && (
            // inline fallback svg when PNG not available
            <svg width="44" height="44" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="64" cy="64" r="62" fill="#0b1220" />
              <path fill="#fff" stroke="#e6eef6" strokeWidth="1" d="M64 22c-6-10-20-10-28 0-8 10-4 26 0 34 4 8 8 12 12 14 4 2 10 4 16 4s12-2 16-4c4-2 8-6 12-14 4-8 8-24 0-34-8-10-22-10-28 0z" />
            </svg>
          )}
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
