self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activate');
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // A minimal, pass-through fetch handler that satisfies PWA offline requirements
  e.respondWith(
    fetch(e.request).catch(() => {
      // Offline fallback
      return new Response("Offline mode - some content may not be available.");
    })
  );
});
