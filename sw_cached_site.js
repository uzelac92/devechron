const cacheName = ['v1'];

self.addEventListener('install', e => { });

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!cacheName.includes(key)) {
                    return caches.delete(key);
                }
            })
        ))
    );
});

self.addEventListener('fetch', e => {
    if (e.request.method === 'GET' && (e.request.url.indexOf('http') > -1)) {  
        e.respondWith(
            fetch(e.request).then(res => {
              const resClone = res.clone();
              caches.open(cacheName).then(cache => {
                cache.put(e.request, resClone);
              })
              return res;
            }).catch(err => caches.match(e.request).then(res => res))
        )
    }
});