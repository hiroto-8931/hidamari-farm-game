const CACHE='hidamari-v2';
const SHELL=['/','/index.html','/manifest.webmanifest','/icons/icon.svg','/assets/farm-title.png'];
const CACHEABLE_PATH=/^\/(?:assets\/|icons\/|manifest\.webmanifest$)/;
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin)return;if(request.mode==='navigate'){event.respondWith(fetch(request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put('/index.html',response.clone()));return response}).catch(()=>caches.match('/index.html')));return}if(!CACHEABLE_PATH.test(url.pathname))return;event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok&&response.type==='basic')caches.open(CACHE).then(cache=>cache.put(request,response.clone()));return response})))});

