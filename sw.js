const CACHE_NAME = 'edukids-v1';
const urlsToCache = [
  '/edukids-app/',
  '/edukids-app/index.html',
  '/edukids-app/cp.html',
  '/edukids-app/ce1.html',
  '/edukids-app/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/edukids-app/index.html'))
  );
});
