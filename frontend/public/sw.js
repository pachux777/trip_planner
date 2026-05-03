// Service Worker for TravelPro PWA
const CACHE_NAME = 'travelpro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Open cache and add response
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Network failed, try to serve from cache
        return caches.match(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-trips') {
    event.waitUntil(syncTrips());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Trip',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('TravelPro Update', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/main')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // User clicked on notification body
    event.waitUntil(
      clients.openWindow('/main')
    );
  }
});

// Sync trips when online
async function syncTrips() {
  try {
    const savedTrips = await getSavedTrips();
    
    for (const trip of savedTrips) {
      if (trip.needsSync) {
        await syncTrip(trip);
      }
    }
  } catch (error) {
    console.error('Error syncing trips:', error);
  }
}

// Get saved trips from IndexedDB
async function getSavedTrips() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('TravelProDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['trips'], 'readonly');
      const store = transaction.objectStore('trips');
      const getAllRequest = store.getAll();
      
      getAllRequest.onerror = () => reject(getAllRequest.error);
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
    };
  });
}

// Sync individual trip
async function syncTrip(trip) {
  try {
    const response = await fetch('/api/trips/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip)
    });
    
    if (response.ok) {
      trip.needsSync = false;
      await updateTripInDB(trip);
    }
  } catch (error) {
    console.error('Error syncing trip:', error);
  }
}

// Update trip in IndexedDB
async function updateTripInDB(trip) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('TravelProDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['trips'], 'readwrite');
      const store = transaction.objectStore('trips');
      const putRequest = store.put(trip);
      
      putRequest.onerror = () => reject(putRequest.error);
      putRequest.onsuccess = () => resolve(putRequest.result);
    };
  });
}
