import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { getProductByBarcodePreferFirestore } from '../firebase';

export default function Scanner() {
  const [code, setCode] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const scan = async () => {
    const c = (code || '').trim();
    if (!c) {
      setProduct({ error: 'Zadejte čárový kód' });
      return;
    }
    setLoading(true);
    const p = await getProductByBarcodePreferFirestore(c);
    setLoading(false);
    if (!p) setProduct({ error: 'Produkt nenalezen' });
    else setProduct(p);
  };

  return (
    <div className="home">
      <div className="card">
        <h3>Scanner</h3>
        <p style={{fontSize:13,opacity:0.8}}>Najdete čárový kód na obalu produktu (obvykle na zadní nebo spodní straně). Zadejte čísla čárového kódu do pole níže a stiskněte Hledat nebo Enter.</p>
        <div className="last-row">
          <input value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==='Enter' && scan()} placeholder="např. 123456 nebo 0123456789012" />
          <button onClick={scan}>Hledat</button>
        </div>
        <div style={{fontSize:12,opacity:0.7,marginTop:8}}>Tip: pokud nemáte čárový kód, zkuste napsat název produktu do Scanneru nebo použijte seznam potravin v Kuchyni.</div>
      </div>

      {loading && <div className="card">Načítám...</div>}
      {product && product.error && <div className="card" style={{color:'red'}}>{product.error}</div>}
      {product && !product.error && <ProductCard product={product} />}
    </div>
  )
}
