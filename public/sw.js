const CACHE_NAME = 'holiday-cache-v1';
const OFFLINE_URL = '/offline.html';

// Add app shell files to cache
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Cache first, then network strategy
const cacheFirst = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // If offline and requesting a page, return offline page
    if (request.mode === 'navigate') {
      return cache.match(OFFLINE_URL);
    }
    throw error;
  }
};

// Install event - cache initial resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(APP_SHELL);
      }),
      // Cache offline page separately
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Caching offline page');
        return cache.add(OFFLINE_URL);
      })
    ]).then(() => {
      // Skip waiting to activate the new service worker immediately
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Enable immediate use of the new service worker
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip browser-sync and websocket requests
  if (event.request.url.includes('browser-sync') || 
      event.request.url.includes('ws') ||
      event.request.url.includes('sockjs-node')) {
    return;
  }

  event.respondWith(cacheFirst(event.request));
}); 