self.addEventListener("install", (event) => {
	self.skipWaiting();
});
self.addEventListener("activate", (event) => {
	self.clients.claim();
});
self.addEventListener("fetch", (event) => {
	// Optionnel: mettre en cache les fichiers statiques
});
