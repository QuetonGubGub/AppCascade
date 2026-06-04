const CACHE_NAME = 'app-cascade-v4';

// Installation immédiate
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.delete('app-cascade-v3')); // Nettoie l'ancien cache
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Si on a le fichier en cache, on le renvoie
            if (cachedResponse) return cachedResponse;

            // Sinon, on va chercher sur le réseau
            return fetch(event.request).then((networkResponse) => {
                // On clone la réponse car elle ne peut être lue qu'une fois
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    // On met en cache TOUT ce qui passe par ici (images, tuiles de carte, pages)
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            }).catch(() => {
                // Si aucune connexion et pas dans le cache, on peut renvoyer une image par défaut
                return caches.match('/img/general/Fond.png');
            });
        })
    );
});
