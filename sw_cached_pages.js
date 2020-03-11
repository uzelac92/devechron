const cacheName = 'v1';
const cacheAssests = [
    'index.html',
    '/srpski.html',
    '/sect-rs/footer.html',
    '/sect-rs/header.html',
    '/sect-rs/modalStranice.html',
    '/sect-rs/onama.html',
    '/sect-rs/partneri.html',
    '/sect-rs/projekti.html',
    '/sect-rs/responsive.html',
    '/sect-rs/services.html',
    '/sect-rs/templates.html',
    '/stilovi/styles.css',
    '/js/app.js'
];

// Call Install event
self.addEventListener('install', e => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                cache.addAll(cacheAssests);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate event
self.addEventListener('activate', (event) => {
    // Delete the old caches
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!cacheName.includes(key)) {
                    return caches.delete(key);
                }
            })
        )).then(() => {
            console.log('V3 now ready to handle fetches!');
        })
    );
});

// Call Fetch event
self.addEventListener('fetch', e => {
    // console.log('Service Worker: Fetching');
    if((e.request.url.indexOf('http') > -1)) {  
        e.respondWith(
            fetch(e.request)
                .then(res => {
                    // Make copy/clone of response
                    const resClone = res.clone();
                    // Open cache
                    caches
                        .open(cacheName)
                        .then(cache => {
                            cache.put(e.request, resClone);
                        })
                    return res;
                }).catch(err => caches.match(e.request).then(res => res))
        )
    }
});