

const CACHE_NAME = 'site-cache-2026.03.11-v1';
const criticalUrls = ['/', '/index.html'];

// Install event - pre-cache critical URLs only
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(criticalUrls))
  );
});

// Activate event - clear out any old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
          })
        )
      )
    ])
  );
});

// Fetch event - network first, lazily cache everything visited
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});