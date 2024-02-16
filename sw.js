const cacheName = 'v1'

const cacheAssets = [
    'index.html',
    'index.js',
    'styles.css',
    'README.md',
    '/coordinator/index.html',
    '/coordinator/index.js',
    '/coordinator/scanner.js',
    '/coordinator/styles.css',
    '/scouter/index.html',
    '/scouter/index.js',
    '/scouter/button.js',
    '/scouter/qr.js',
    '/scouter/styles.css',
]

self.addEventListener('install', e => {
    console.log('Service worker installed')

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service worker caching files')
                cache.addAll(cacheAssets)
            })
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', e => {
    console.log('Service worker activated')

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service worker removing old caches')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', e => {
    console.log('Service worker fetching')

    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})