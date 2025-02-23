self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("ramadan-tracker").then((cache) => {
      return cache.addAll(["/", "/index.html", "/src/main.jsx"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
