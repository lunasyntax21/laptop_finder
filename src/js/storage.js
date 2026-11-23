const read = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
};
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const getFavs = () => read("favs", []);
export const isFav = (id) => getFavs().includes(id);
export const getSelected = () =>
  read("selected", []).filter((id) => getFavs().includes(id));
export const setSelected = (ids) => write("selected", ids);
export const toggleFav = (id) => {
  const f = getFavs();
  write("favs", f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
};
export const clearFavs = () => {
  write("favs", []);
  write("selected", []);
};
export const getTheme = () => read("theme", "battery");
export const setTheme = (t) => write("theme", t);
