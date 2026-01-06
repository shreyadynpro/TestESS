// Simple IndexedDB wrapper for storing a single NDA PDF per user
 
const DB_NAME = 'ndaDB';
const STORE_NAME = 'ndaFiles';
const DB_VERSION = 1;
 
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
 
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('id', 'id', { unique: true });
      }
    };
 
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
 
export async function saveNdaFile(userId, file) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const record = {
      id: String(userId),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      blob: file,
    };
    const req = store.put(record);
    req.onsuccess = () => resolve(record);
    req.onerror = () => reject(req.error);
  });
}
 
export async function getNdaFile(userId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(String(userId));
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}
 
export async function deleteNdaFile(userId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(String(userId));
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}
 
 