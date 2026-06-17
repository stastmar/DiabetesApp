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
        <div style={{width:36,height:36,borderRadius:18,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid #cfe9ff'}}>
          {/* white cat svg */}
          <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <g stroke="#cfe9ff" strokeWidth="2" fill="#ffffff">
              <path d="M32 8 L24 18 L16 8 L12 20 C8 28 10 40 20 46 C24 49 28 50 32 50 C36 50 40 49 44 46 C54 40 56 28 52 20 L48 8 L40 18 L32 8 Z" />
            </g>
            <circle cx="24" cy="34" r="3" fill="#000" />
            <circle cx="40" cy="34" r="3" fill="#000" />
            <path d="M32 38 L30 42 L34 42 Z" fill="#ffb3b3" />
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
