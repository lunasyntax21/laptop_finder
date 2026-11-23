import { loadLaptops } from './api.js';
import { getFavs, getSelected, setSelected } from './storage.js';
import { tableHTML } from './compare.js';
import { initLayout, message } from './ui.js';
initLayout();
const app = document.getElementById('app');
try {
  const laptops = await loadLaptops();
  const favs = laptops.filter(l => getFavs().includes(l.id));
  if (!favs.length) throw new Error('none');
  const draw = (note = '') => {
    const sel = getSelected(), chosen = favs.filter(l => sel.includes(l.id));
    app.innerHTML = `<h1 class="mb-2 text-2xl font-bold">Compare</h1><p class="mb-2 text-muted">Pick 2 to 4 favorites.</p>
    <div class="mb-2 flex flex-wrap gap-3">${favs.map(l => `<label class="flex items-center gap-1"><input type="checkbox" class="rounded border-line bg-card text-accent focus:ring-accent" data-id="${l.id}" ${sel.includes(l.id) ? 'checked' : ''}>${l.name}</label>`).join('')}</div>
    <p class="mb-4 font-semibold text-accent">${note}</p>${chosen.length >= 2 ? tableHTML(chosen) : message('Select at least two laptops to compare.')}`;
    app.querySelectorAll('input').forEach(cb => cb.onchange = () => {
      const id = Number(cb.dataset.id), cur = getSelected();
      if (cb.checked && cur.length >= 4) return draw('You can compare at most 4 laptops.');
      setSelected(cb.checked ? [...cur, id] : cur.filter(x => x !== id)); draw();
    });
  };
  draw();
} catch (e) { app.innerHTML = '<h1 class="mb-4 text-2xl font-bold">Compare</h1>' + message('Save some favorites first, then come back to compare them.'); }
