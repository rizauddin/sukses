'use strict';

// Bump VERSION whenever the shell changes. Complete caches remain immutable.
const VERSION = 'v8';
const PREFIX = 'sukses-shell-' + encodeURIComponent(new URL(self.registration.scope).pathname) + '-';
const CACHE = PREFIX + VERSION;
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'].map(path => new URL(path,self.registration.scope).href);

let shellTask = null;
function ensureShell() {
  // Share one repair across clients so only its owner may clean up a failed cache.
  if (!shellTask) shellTask = fillShell().finally(() => { shellTask = null; });
  return shellTask;
}
async function fillShell() {
  const existed = await caches.has(CACHE), cache = await caches.open(CACHE);
  if ((await Promise.all(SHELL.map(url => cache.match(url)))).every(Boolean)) return;
  // Interrupted installation or browser eviction may leave an incomplete cache.
  // addAll commits the complete replacement atomically; failed repairs keep old entries.
  try { await cache.addAll(SHELL.map(url => new Request(url,{cache:'reload'}))); }
  catch (error) { if (!existed) await caches.delete(CACHE); throw error; }
}

self.addEventListener('install',event => {
  event.waitUntil((async () => {
    await ensureShell();
    // Updates wait naturally. No skipWaiting here and no automatic clients.claim.
  })());
});

self.addEventListener('activate',event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE).map(name => caches.delete(name)));
  })());
});

self.addEventListener('fetch',event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  url.search = ''; url.hash = '';
  if (!SHELL.includes(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = request.mode === 'navigate' ? SHELL[1] : url.href;
    return await cache.match(key) || fetch(request);
  })());
});

self.addEventListener('message',event => {
  if (event.data?.type === 'CHECK_OFFLINE') {
    event.waitUntil((async () => {
      let ready = false;
      try { await ensureShell(); ready = true; } catch { /* Offline or denied storage: retain usable cached entries. */ }
      event.source?.postMessage({type:'OFFLINE_STATUS',ready});
    })());
  }
  if (event.data?.type === 'ACTIVATE_UPDATE') {
    event.waitUntil((async () => {
      // The initiating idle page must release ownership first. Another running or
      // paused owner prevents activation. Without Web Locks, close all windows.
      if (!self.navigator.locks?.request) { event.source?.postMessage({type:'UPDATE_BLOCKED'}); return; }
      await self.navigator.locks.request('sukses-timer-writer-v1',{ifAvailable:true},async lock => {
        if (lock) await self.skipWaiting();
        else event.source?.postMessage({type:'UPDATE_BLOCKED'});
      });
    })());
  }
});
