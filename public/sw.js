// A very basic Service Worker to satisfy PWA requirements
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
  // Do nothing, let the browser handle all fetches normally.
  // This satisfies the PWA install requirement without interfering with Next.js caching.
});
