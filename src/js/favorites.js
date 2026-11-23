import { loadLaptops } from './api.js';
import { getFavs, clearFavs } from './storage.js';
import { initLayout, cardHTML, bindFavButtons, message, money, grid } from './ui.js';
initLayout();
const app = document.getElementById('app');
try {
  const laptops = await loadLaptops();
  const draw = () => {
    const favs = laptops.filter(l => getFavs().includes(l.id));
    if (!favs.length) { app.innerHTML = '<h1 class="mb-4 text-2xl font-bold">Favorites</h1>' + message('No favorites yet. Save some from the catalogue.'); return; }
    const total = favs.reduce((s, l) => s + l.price, 0);
    app.innerHTML = `<h1 class="mb-2 text-2xl font-bold">Favorites</h1>
    <p class="mb-4">Total: <b>${money(total)}</b> · Average: <b>${money(Math.round(total / favs.length))}</b>
    <button id="clear" class="btn-action ml-2">Clear all</button></p><div id="list" class="${grid}">${favs.map(cardHTML).join('')}</div>`;
    document.getElementById('clear').onclick = () => { clearFavs(); draw(); };
    bindFavButtons(document.getElementById('list'), draw); // removing a card re-renders the page
  };
  draw();
} catch (e) { app.innerHTML = message('Could not load laptops.'); }
