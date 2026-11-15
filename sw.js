// Always fetch the newest files from the network so code updates apply on the next app open.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  // navigation requests cannot be re-created with init options, so build a plain request
  const fresh = new Request(req.url, { cache: 'no-store', credentials: 'same-origin' });
  e.respondWith(fetch(fresh).catch(() => fetch(req)));
});
