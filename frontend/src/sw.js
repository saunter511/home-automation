import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', (event) => {
	const title = 'Home Automation';
	const options = {
		body: event.data.text(),
	};

	event.waitUntil(self.registration.showNotification(title, options));
});
