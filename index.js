
// const registerServiceWorker = async () => {
//     if ("serviceWorker" in navigator) {
//       try {
//         const registration = await navigator.serviceWorker.register("/sw.js", {
//           scope: "/",
//         });
//         if (registration.installing) {
//           console.log("Service worker installing");
//         } else if (registration.waiting) {
//           console.log("Service worker installed");
//         } else if (registration.active) {
//           console.log("Service worker active");
//         }
//         } catch (error) {
//         console.error(`Registration failed with ${error}`);
//         }
//     }
// };
  
// const addResourcesToCache = async (resources) => {
//     const cache = await caches.open("v1");
//     await cache.addAll(resources);
// };
  
// self.addEventListener("install", (event) => {
//     event.waitUntil(
//       addResourcesToCache([
//         "/",
//         "/index.html",
//         "/styles.css",
//         "/index.js",
//         "/README.md",
//         "/coordinator/index.html",
//         "/coordinator/index.js",
//         "/scouter/button.js",
//         "/scouter/index.html",
//         "/scouter/index.js",
//         "/scouter/layout.js",
//         "/scouter/scroll-indicator.js",
//         ]),
//     );
// });

// const putInCache = async (request, response) => {
//   const cache = await caches.open("v1");
//   await cache.put(request, response);
// };

// const cacheFirst = async ({ request, fallbackUrl }) => {
//   // First try to get the resource from the cache
//   const responseFromCache = await caches.match(request);
//   if (responseFromCache) {
//     return responseFromCache;
//   }

//   // Next try to get the resource from the network
//   try {
//     const responseFromNetwork = await fetch(request);
//     // response may be used only once
//     // we need to save clone to put one copy in cache
//     // and serve second one
//     putInCache(request, responseFromNetwork.clone());
//     return responseFromNetwork;
//   } catch (error) {
//     const fallbackResponse = await caches.match(fallbackUrl);
//     if (fallbackResponse) {
//       return fallbackResponse;
//     }
//     // when even the fallback response is not available,
//     // there is nothing we can do, but we must always
//     // return a Response object
//     return new Response("Network error happened", {
//       status: 408,
//       headers: { "Content-Type": "text/plain" },
//     });
//   }
// };

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     cacheFirst({
//       request: event.request,
//       fallbackUrl: "/gallery/myLittleVader.jpg",
//     }),
//   );
// });


  
// registerServiceWorker();
  

window.addEventListener('load', () => {
  if (!('serviceWorker' in navigator)) {
    // service workers not supported 😣
    return
  }

  navigator.serviceWorker.register('/worker.js').then(
    () => {
      // registered! 👍🏼
    },
    err => {
      console.error('SW registration failed! 😱', err)
    }
  )
})

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('my-site-name')
      .then(cache =>
        cache.addAll([
          '/',
        ])
      )
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        //we found an entry in the cache!
        return response
      }
      return fetch(event.request)
    })
  )
})