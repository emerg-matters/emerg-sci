

const CACHE_NAME = 'site-cache-2026.03.11-v2';
const criticalUrls = [
      '/',
      '/index.html',
      '/training-API.html',
      '/training-info-all.html',
      '/trial-info-aspect.html',
      '/trial-info-BACH-b.html',
      '/trial-info-brains-tbi.html',
      '/trial-info-consept.html',
      '/trial-info-curly.html',
      '/trial-info-EVIS.html',
      '/trial-info-pocket.html',
      '/trial-info-tbi.html',
      '/trial-info-udcd-checklist-colour.html',
      '/trial-info-udcd-trial-revised.html'
    ];

// Install event - pre-cache critical URLs only
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log('Pre-caching all HTML files');
        return cache.addAll(urlsToCache);
      })
    );
  });

// Activate event - Force takeover and clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Fetch event - Network-First with forced cache update
self.addEventListener('fetch', event => {
  // We only care about GET requests for our files
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Only update cache if we get a valid response
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If network fails, return the pre-cached version
        return caches.match(event.request);
      })
  );
});