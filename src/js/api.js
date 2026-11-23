export const loadLaptops = async () => {
  const res = await fetch("data/laptops.json");
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
};
