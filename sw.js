if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,c)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let r={};const f=e=>n(e,o),t={module:{uri:o},exports:r,require:f};s[o]=Promise.all(i.map((e=>t[e]||f(e)))).then((e=>(c(...e),r)))}}define(["./workbox-b833909e"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/html2canvas.esm-CBrSDip1.js",revision:null},{url:"assets/index-BkEf8Xeu.css",revision:null},{url:"assets/index-BNO28naE.js",revision:null},{url:"assets/index.es-BCM0u7ky.js",revision:null},{url:"assets/purify.es-a-CayzAK.js",revision:null},{url:"index.html",revision:"20b751a3dc7355beec3a7f81eb3cc4ec"},{url:"offline.html",revision:"e48b944095d9a1f582dff15022ebb7b2"},{url:"registerSW.js",revision:"d75471eb81b34c48b79cbc0188f67429"},{url:"favicon.svg",revision:"9f6708b61422d2a101f8aaad48c1b626"},{url:"icons/icon-128x128.png",revision:"7a4767ae2508c9b2b5d3a2b4754a67a7"},{url:"icons/icon-144x144.png",revision:"8f7c0f4f74fbbf614a8a2d8bfaff8d5c"},{url:"icons/icon-152x152.png",revision:"d478a2a01b142eb65391c2f2499f1a9b"},{url:"icons/icon-192x192.png",revision:"c43f14d3c201b049b80abe8734d73720"},{url:"icons/icon-384x384.png",revision:"e0b4cc53ea3db4b5a3bd363606249d7a"},{url:"icons/icon-512x512.png",revision:"2a6e26032fb8a3fb134aa12c1ec9147d"},{url:"icons/icon-72x72.png",revision:"bf435ff2f84218d3f120f3c878e802cd"},{url:"icons/icon-96x96.png",revision:"4b317fbf0f6ce298988c254fd7bdb438"},{url:"manifest.webmanifest",revision:"7ff9046e68937ff8e40d79906e3bb56c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new e.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
