const CACHE_NAME = 'Eric Gardens-v2';
const APP_SHELL = [
  './',
  './index.html',
  './properties.html',
  './property-details.html',
  './contact.html',
  './manifest.json',
  './vendor/bootstrap/css/bootstrap.min.css',
  './vendor/bootstrap/js/bootstrap.min.js',
  './vendor/jquery/jquery.min.js',
  './assets/css/templatemo-villa-agency.css',
  './assets/css/owl.css',
  './assets/js/custom.js',
  './assets/js/owl-carousel.js',
  './assets/js/isotope.min.js',
  './assets/js/counter.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});

