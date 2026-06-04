// www/sw.js
const CACHE_NAME = 'app-cascade-v5';

// 1. Installation : on force l'activation immédiate
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// 2. Activation : nettoyage des anciens caches obsolètes
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME)
                          .map((name) => caches.delete(name))
            );
        })
    );
});

// 3. Stratégie de récupération (Fetch) : "Cache-first" avec mise à jour en arrière-plan
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // On retourne le cache si trouvé
            if (cachedResponse) return cachedResponse;

            // Sinon, on va sur le réseau
            return fetch(event.request).then((networkResponse) => {
                // On clone la réponse pour la stocker en cache
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    // On ajoute au cache pour que la ressource soit disponible hors ligne après
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            }).catch(() => {
                // Si tout échoue (aucune connexion, pas de cache), on renvoie une ressource par défaut
                // Vous pouvez mettre une image ou une page 404 ici
                return caches.match('index.html'); 
            });
        })
    );
});
