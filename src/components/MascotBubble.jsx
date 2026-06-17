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
          {/* preferred: public/cukrik.png (provided image). If missing, fall back to cukrik.svg */}
          <img
            src="/cukrik.png"
            alt="Cukřík"
            style={{width:44,height:44,objectFit:'cover',display:'block'}}
            onError={(e)=>{ e.target.onerror=null; e.target.src='/cukrik.svg'; }}
          />
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
