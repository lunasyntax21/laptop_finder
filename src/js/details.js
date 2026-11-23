import { loadLaptops } from './api.js';
import { getFavs, getSelected, setSelected, toggleFav } from './storage.js';
import { initLayout, money, message, bindFavButtons, favLabel } from './ui.js';
initLayout();
const app = document.getElementById('app');
try {
  const id = Number(new URLSearchParams(location.search).get('id'));
  const l = (await loadLaptops()).find(x => x.id === id);
  if (!l) throw new Error('missing');
  const specs = [['Brand', l.brand],['Category', l.category],['CPU', l.cpu],['RAM', l.ramGB + ' GB'],['Storage', l.storageGB + ' GB'],
    ['Battery', l.batteryHours + ' h'],['Weight', l.weightKg + ' kg'],['Screen', l.screenInches + ' in'],['Price', money(l.price)]];
  app.innerHTML = `<div class="grid gap-6 md:grid-cols-2"><img src="${l.image}" alt="${l.name}" class="w-full rounded-xl border border-line bg-card p-6">
  <div><h1 class="text-3xl font-bold">${l.name}</h1><p class="my-3 text-muted">${l.description}</p>
  <div class="mb-4 flex flex-wrap gap-2"><button class="btn-action fav-btn" data-id="${l.id}">${favLabel(l.id)}</button>
  <button id="cmp" class="btn-action">Add to comparison</button></div><p id="msg" class="mb-2 text-sm text-accent"></p></div></div>
  <table class="mt-6 w-full border border-line"><tbody>${specs.map(([k, v]) => `<tr class="border-t border-line"><th class="p-2 text-left">${k}</th><td class="p-2">${v}</td></tr>`).join('')}</tbody></table>`;
  bindFavButtons(app);
  document.getElementById('cmp').onclick = () => {
    if (!getFavs().includes(l.id)) { toggleFav(l.id); app.querySelector('.fav-btn').textContent = favLabel(l.id); }
    const sel = getSelected(), msg = document.getElementById('msg');
    if (sel.includes(l.id)) msg.textContent = 'Already in comparison.';
    else if (sel.length >= 4) msg.textContent = 'You can compare at most 4 laptops.';
    else { setSelected([...sel, l.id]); msg.textContent = 'Added to comparison (saved to favorites too).'; }
  };
} catch (e) { app.innerHTML = message('Laptop not found or data could not be loaded. <a class="underline" href="laptops.html">Back to catalogue</a>'); }
