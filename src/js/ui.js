import { getTheme, setTheme, isFav, toggleFav } from "./storage.js";
export const money = (n) => "$" + n.toLocaleString();
export const message = (text) =>
  `<p class="rounded-lg border border-line bg-card p-6 text-center text-muted">${text}</p>`;
export const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

const LINKS = [
  ["index.html", "Home"],
  ["laptops.html", "Laptops"],
  ["favorites.html", "Favorites"],
  ["compare.html", "Compare"],
];

export function initLayout() {
  document.documentElement.dataset.theme = getTheme(); // restore saved theme on every page
  const page = location.pathname.split("/").pop() || "index.html";
  const links = LINKS.map(
    ([h, t]) =>
      `<a href="${h}" class="rounded px-3 py-2 transition hover:bg-line ${h === page ? "font-bold text-accent" : ""}">${t}</a>`,
  ).join("");
  document.getElementById("header").outerHTML =
    `<header class="border-b border-line bg-card"><div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 p-4">
    <a href="index.html" class="text-lg font-bold text-accent">Student Laptop Finder</a>
    <button id="menuBtn" class="btn-action md:hidden" aria-label="Toggle menu">Menu</button>
    <nav id="nav" class="hidden w-full flex-col md:flex md:w-auto md:flex-row md:items-center">${links}
      <button id="themeBtn" class="btn-action mt-2 md:ml-2 md:mt-0"></button></nav></div></header>`;
  document.body.insertAdjacentHTML(
    "beforeend",
    '<footer class="border-t border-line p-4 text-center text-sm text-muted">Student Laptop Finder</footer>',
  );
  const btn = document.getElementById("themeBtn");
  const label = () =>
    (btn.textContent =
      getTheme() === "battery"
        ? "Switch to Performance"
        : "Switch to Battery Saver");
  label();
  btn.onclick = () => {
    setTheme(getTheme() === "battery" ? "performance" : "battery");
    document.documentElement.dataset.theme = getTheme();
    label();
  };
  document.getElementById("menuBtn").onclick = () =>
    document.getElementById("nav").classList.toggle("hidden");
}

export const favLabel = (id) => (isFav(id) ? "★ Saved" : "☆ Save");
export const cardHTML = (l) => `<article class="laptop-card">
  <img src="${l.image}" alt="${l.name}" class="h-32 w-full object-contain">
  <h3 class="font-bold">${l.name}</h3><p class="text-sm text-muted">${l.brand} · ${l.category}</p>
  <p class="text-xl font-bold text-accent">${money(l.price)}</p>
  <p class="text-sm">${l.cpu} · ${l.ramGB} GB RAM · ${l.batteryHours} h battery</p>
  <div class="mt-auto flex gap-2"><a class="btn-action" href="details.html?id=${l.id}">Details</a>
  <button class="btn-action fav-btn" data-id="${l.id}">${favLabel(l.id)}</button></div></article>`;

export const skeletonHTML = (n = 6) =>
  Array.from(
    { length: n },
    () => `<div class="laptop-card animate-pulse">
  <div class="h-32 rounded bg-line"></div><div class="h-4 w-2/3 rounded bg-line"></div>
  <div class="h-3 w-1/2 rounded bg-line"></div><div class="h-6 w-1/3 rounded bg-line"></div>
  <div class="h-8 rounded bg-line"></div></div>`,
  ).join("");

export const bindFavButtons = (container, onChange = () => {}) =>
  container.addEventListener("click", (e) => {
    const b = e.target.closest(".fav-btn");
    if (!b) return;
    const id = Number(b.dataset.id);
    toggleFav(id);
    b.textContent = favLabel(id);
    onChange();
  });
