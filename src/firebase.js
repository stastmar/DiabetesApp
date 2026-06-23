import { fallbackProducts } from "./data/fallbackProducts";

async function initFirestore() {
  try {
    const firebase = await import('firebase/compat/app');
    await import('firebase/compat/firestore');

    const cfg = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    if (!cfg.apiKey || !cfg.projectId) {
      return null;
    }

    if (!firebase.apps.length) firebase.initializeApp(cfg);
    const db = firebase.firestore();
    return db;
  } catch (e) {
    return null;
  }
}

let _dbPromise = null;
export async function getDb() {
  if (!_dbPromise) _dbPromise = initFirestore();
  return _dbPromise;
}

export async function fetchProductsFromFirestore() {
  const db = await getDb();
  if (!db) return null;

  const snapshot = await db.collection('products').get();
  const items = [];
  snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
  return items;
}

export async function fetchProductByBarcode(barcode) {
  const db = await getDb();
  if (!db) return null;

  const q = await db.collection('products').where('barcode', '==', barcode).limit(1).get();
  if (q.empty) return null;
  const doc = q.docs[0];
  return { id: doc.id, ...doc.data() };
}

export async function getProductsPreferFirestore() {
  const items = await fetchProductsFromFirestore();
  if (items && items.length) return items;
  return fallbackProducts;
}

export async function getProductByBarcodePreferFirestore(barcode) {
  const p = await fetchProductByBarcode(barcode);
  if (p) return p;

  return fallbackProducts.find(x => x.barcode === barcode) || null;
}
