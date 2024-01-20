console.log("sw")

const registerServiceWorker = async () => {
    console.log("sw2")
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
};
  
const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };
  
  self.addEventListener("install", (event) => {
    event.waitUntil(
      addResourcesToCache([
          "/",
          "/scouter/button.js",
          "/scouter/index.html",
          "/scouter/index.js",
          "/scouter/qr.js",
          "/coordinator/index.html",
          "/coordinator/index.js",
          "/coordinator/scanner.js",
          "/coordinator/styles.css",
          "/html5-qrcode.min.js",
          "/index.html",
          "/index.js",
          "/README.md",
          "/styles.css",
          "/sw.js",
          "/package.json",
          "/package-lock.json"
      ]),
    );
  });

  const deleteCache = async (key) => {
    await caches.delete(key);
  };
  
  const deleteOldCaches = async () => {
    const cacheKeepList = ["v1"];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
  };
  
  self.addEventListener("activate", (event) => {
      event.waitUntil(self.registration?.navigationPreload.enable());
      event.waitUntil(deleteOldCaches());
  });
  

registerServiceWorker();

  