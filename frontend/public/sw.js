// Happi PWA Service Worker
const CACHE_NAME = "happi-cache-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Bỏ qua các yêu cầu API và SSE stream để luôn nhận dữ liệu thời gian thực
  if (
    event.request.url.includes("/api/") ||
    event.request.url.includes("/stream")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
