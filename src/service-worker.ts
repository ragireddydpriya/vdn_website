/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = "vdn-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/favicon.ico",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first for images, cache fallback for others
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Image caching strategy
  if (url.pathname.includes("/images/") || 
      request.destination === "image" ||
      url.pathname.endsWith(".webp") ||
      url.pathname.endsWith(".png") ||
      url.pathname.endsWith(".jpg") ||
      url.pathname.endsWith(".jpeg")) {
    
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful image responses
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Return cached version if fetch fails
            return cache.match(request);
          });
      })
    );
    return;
  }

  // CSS/JS assets - cache first
  if (url.pathname.endsWith(".css") || 
      url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".woff2")) {
    
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (!response.ok) {
            return response;
          }
          const cache_copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, cache_copy);
          });
          return response;
        });
      })
    );
    return;
  }

  // Default: network first
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response.ok) {
          return response;
        }
        const cache_copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, cache_copy);
        });
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
