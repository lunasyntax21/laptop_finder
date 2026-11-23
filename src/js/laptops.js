import { loadLaptops } from './api.js';
import { initLayout, cardHTML, skeletonHTML, bindFavButtons, message, grid } from './ui.js';
initLayout();
const app = document.getElementById('app');
const input = 'rounded-lg border-line bg-card text-ink focus:border-accent focus:ring-accent';
app.innerHTML = `<h1 class="mb-4 text-2xl font-bold">Laptops</h1>
<div class="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
<input id="q" type="search" placeholder="Search name or brand" class="${input}">
<select id="cat" class="${input}"><option value="">All categories</option>${['ultrabook','gaming','2-in-1','creator','budget'].map(c => `<option>${c}</option>`).join('')}</select>
<input id="maxPrice" type="number" min="0" placeholder="Max price" class="${input}">
<select id="minBat" class="${input}"><option value="0">Any battery</option><option value="8">8+ h</option><option value="12">12+ h</option><option value="15">15+ h</option></select>
<select id="sort" class="${input}"><option value="">Sort by</option><option value="price:1">Price ↑</option><option value="price:-1">Price ↓</option>
<option value="batteryHours:1">Battery ↑</option><option value="batteryHours:-1">Battery ↓</option><option value="weightKg:1">Weight ↑</option><option value="weightKg:-1">Weight ↓</option></select></div>
<p id="count" class="mb-2 text-muted"></p><div id="list" class="${grid}">${skeletonHTML()}</div>`;
const list = document.getElementById('list');
const $ = id => document.getElementById(id);
try {
  const laptops = await loadLaptops();
  const render = () => {
    const q = $('q').value.trim().toLowerCase(), max = Number($('maxPrice').value) || Infinity;
    const found = laptops.filter(l => (l.name + ' ' + l.brand).toLowerCase().includes(q) &&
      (!$('cat').value || l.category === $('cat').value) && l.price <= max && l.batteryHours >= Number($('minBat').value));
    const [key, dir] = $('sort').value.split(':');
    const shown = key ? [...found].sort((a, b) => (a[key] - b[key]) * Number(dir)) : found; // sort a copy
    $('count').textContent = `${shown.length} laptop(s) found`;
    list.innerHTML = shown.length ? shown.map(cardHTML).join('') : message('No laptop matches your filters.');
  };
  ['q','cat','maxPrice','minBat','sort'].forEach(id => $(id).addEventListener('input', render));
  bindFavButtons(list);
  render();
} catch (e) { list.innerHTML = message('Could not load laptops. Please run a local server and try again.'); }
