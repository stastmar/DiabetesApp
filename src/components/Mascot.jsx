import React from 'react';

export default function Mascot({ children }) {
  return (
    <div style={{display:'flex',gap:12,alignItems:'center'}}>
      <div style={{width:64,height:64,background:'#fff',borderRadius:32,display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid #cfe9ff'}}>
        {/* simple avatar - white cat */}
        <div style={{width:40,height:40,borderRadius:20,background:'#fff',border:'2px solid #cfe9ff',display:'flex',alignItems:'center',justifyContent:'center'}}>🐱</div>
      </div>
      <div>
        <div style={{fontWeight:700}}>Cukřík</div>
        <div style={{fontSize:13,color:'#6b6375'}}>{children}</div>
      </div>
    </div>
  )
}
