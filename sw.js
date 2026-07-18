const CACHE = 'milref-v3';
const ASSETS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Source+Code+Pro:wght@400;500&family=Inter:wght@400;500&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

const cachePut = (req, res) => {
  if (res && res.status === 200 && res.type === 'basic') {
    const clone = res.clone();
    caches.open(CACHE).then(cache => cache.put(req, clone));
  }
  return res;
};

self.addEventListener('fetch', e => {
  const isHTML = e.request.mode === 'navigate' ||
    (e.request.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    // network-first: deploys reach returning visitors; cache is the offline fallback
    e.respondWith(
      fetch(e.request).then(res => cachePut(e.request, res))
        .catch(() => caches.match(e.request).then(c => c || caches.match('./index.html')))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached =>
        cached || fetch(e.request).then(res => cachePut(e.request, res))
      )
    );
  }
});
