const CACHE_NAME = 'site-cache-2025.07.02-v1';
const urlsToCache = [
  '/',
  '/index.html'

];

//install event
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - Network-First Strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // If successful, update cache for next time (optional)
        if (networkResponse.ok && networkResponse.type === 'basic') {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed, try to get from cache
        return caches.match(event.request);
      })
  );
});


self.addEventListener('activate', event => {
  const cacheWhitelist = ['site-cache-2025.07.02-v1'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});