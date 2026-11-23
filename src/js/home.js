import { loadLaptops } from './api.js';
import { getFavs } from './storage.js';
import { initLayout, money, message } from './ui.js';
initLayout();
const app = document.getElementById('app');
const tile = (label, v) => `<div class="rounded-xl border border-line bg-card p-4 text-center"><p class="text-3xl font-bold text-accent">${v}</p><p class="text-muted">${label}</p></div>`;
try {
  const laptops = await loadLaptops();
  const lowest = laptops.reduce((m, l) => Math.min(m, l.price), Infinity);
  const avgBattery = laptops.reduce((s, l) => s + l.batteryHours, 0) / laptops.length;
  app.innerHTML = `<h1 class="mb-2 text-3xl font-bold">Find the right laptop for school</h1>
  <p class="mb-6 text-muted">Browse, filter, save favorites and compare them side by side.</p>
  <div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">${tile('Laptops', laptops.length)}${tile('Lowest price', money(lowest))}
  ${tile('Avg battery (h)', avgBattery.toFixed(1))}${tile('Saved favorites', getFavs().length)}</div>
  <div class="flex flex-wrap gap-2"><a class="btn-action" href="laptops.html">Browse laptops</a><a class="btn-action" href="favorites.html">Favorites</a><a class="btn-action" href="compare.html">Compare</a></div>`;
} catch (e) { app.innerHTML = message('Could not load data. Use a local server and check data/laptops.json.'); }
