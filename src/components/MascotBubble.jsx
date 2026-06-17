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
        <div style={{width:44,height:44,borderRadius:22,display:'flex',alignItems:'center',justifyContent:'center',background:'#0b1220',overflow:'hidden',border:'1px solid rgba(255,255,255,0.06)'}}>
          {/* load the bundled svg placed in public/ */}
          <img src="/cukrik.svg" alt="Cukřík" style={{width:40,height:40,objectFit:'cover',display:'block'}} onError={(e)=>{e.target.style.display='none'}} />
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
