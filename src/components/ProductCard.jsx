import React from 'react';

export default function ProductCard({ product }) {
  if (!product) return null;
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <div style={{display:'flex',gap:12}}>
        <div style={{width:120,height:80,background:'#f4f4f6',borderRadius:8}}>
          {product.image ? <img src={product.image} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : null}
        </div>
        <div>
          <div style={{fontSize:13,opacity:0.8}}>{product.category}</div>
          <div style={{fontWeight:700,marginTop:6}}>{product.energy} kcal • {product.portion}</div>
          <div style={{fontSize:13,opacity:0.8,marginTop:6}}>Sacharidy: {product.carbs} g • Cukry: {product.sugars} g</div>
          <div style={{fontSize:13,opacity:0.8}}>Bílkoviny: {product.protein} g • Tuky: {product.fat} g</div>
          <div style={{marginTop:8,fontWeight:700}}>{product.rating}</div>
          <div style={{fontSize:13,opacity:0.8,marginTop:6}}>{product.tip}</div>
        </div>
      </div>
    </div>
  )
}
