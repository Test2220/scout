const version = "v1"

const cacheName = `scout-2220-${version}`

const appResources = [
    "https://scout-2220.vercel.app/",
    "https://scout-2220.vercel.app/index.html",
    "https://scout-2220.vercel.app/style.css",
    "https://scout-2220.vercel.app/logo.png",
    "https://scout-2220.vercel.app/README.md",
    "https://scout-2220.vercel.app/index.js",
    "https://scout-2220.vercel.app/manifest.json",
    "https://scout-2220.vercel.app/scouter/button.js",
    "https://scout-2220.vercel.app/scouter/index.html",
    "https://scout-2220.vercel.app/scouter/index.js",
    "https://scout-2220.vercel.app/scouter/qr.js",
    "https://scout-2220.vercel.app/scouter/styles.css",
    "https://scout-2220.vercel.app/scanner/index.html",
    "https://scout-2220.vercel.app/scanner/index.js",
    "https://scout-2220.vercel.app/scanner/styles.css",
    "https://scout-2220.vercel.app/scanner/scanner.js"
]
  
self.addEventListener("install", (event) => {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(cacheName)
        cache.addAll(appResources)
      })(),
    )
  })
  
  self.addEventListener("activate", (event) => {
    event.waitUntil(
      (async () => {
        const names = await caches.keys();
        await Promise.all(
          names.map((name) => {
            if (name !== cacheName) {
              return caches.delete(name);
            }
          }),
        );
        await clients.claim();
      })(),
    );
  });
  
  self.addEventListener("fetch", (event) => {
    // when seeking an HTML page
    if (event.request.mode === "navigate") {
      // Return to the index.html page
      event.respondWith(caches.match("/scouter"));
      return;
    }
  
    // For every other request type
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(event.request.url);
        if (cachedResponse) {
          // Return the cached response if it's available.
          return cachedResponse;
        }
        // Respond with a HTTP 404 response status.
        return new Response(null, { status: 404 });
      })(),
    );
  });
  
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").then(
      (registration) => {
        console.log("Service worker registration successful:", registration);
      },
      (error) => {
        console.error(`Service worker registration failed: ${error}`);
      },
    );
  } else {
    console.error("Service workers are not supported.");
  }
  