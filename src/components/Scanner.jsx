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
        <h3>Scanner 4E6</h3>
        <div className="last-row">
          <input value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==='Enter' && scan()} placeholder="čárový kód" />
          <button onClick={scan}>Hledat</button>
        </div>
      </div>

      {loading && <div className="card">Načítám...</div>}
      {product && product.error && <div className="card" style={{color:'red'}}>{product.error}</div>}
      {product && !product.error && <ProductCard product={product} />}
    </div>
  )
}
