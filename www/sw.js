// Nom du cache utilisé par le Service Worker
const CACHE_NAME = 'app-cascade-v6';

// Lors de l'installation, active immédiatement la nouvelle version
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {

    // Intercepte toutes les requêtes du site
    event.respondWith(

        caches.open(CACHE_NAME).then((cache) => {

            // Recherche d'abord la ressource dans le cache
            return cache.match(event.request).then((cachedResponse) => {

                // Effectue également une requête réseau
                const fetchPromise = fetch(event.request).then((networkResponse) => {

                    // Met automatiquement en cache la ressource récupérée
                    cache.put(event.request, networkResponse.clone());

                    return networkResponse;
                });

                // Retourne la version en cache si elle existe,
                // sinon utilise la réponse du réseau
                return cachedResponse || fetchPromise;
            });
        })
    );
});