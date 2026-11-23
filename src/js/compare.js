export const ROWS = [
  { key: "price", label: "Price ($)", best: "min" },
  { key: "cpu", label: "CPU" },
  { key: "ramGB", label: "RAM (GB)", best: "max" },
  { key: "storageGB", label: "Storage (GB)", best: "max" },
  { key: "batteryHours", label: "Battery (h)", best: "max" },
  { key: "weightKg", label: "Weight (kg)", best: "min" },
  { key: "screenInches", label: "Screen (in)" },
];
export const bestValue = (laptops, row) => {
  if (!row.best) return null;
  const vals = laptops.map((l) => l[row.key]);
  return row.best === "min" ? Math.min(...vals) : Math.max(...vals);
};
export const tableHTML = (
  laptops,
) => `<div class="overflow-x-auto"><table class="w-full border border-line text-left">
<thead><tr><th class="p-2"></th>${laptops.map((l) => `<th class="p-2">${l.name}</th>`).join("")}</tr></thead><tbody>
${ROWS.map((r) => {
  const b = bestValue(laptops, r);
  return `<tr class="border-t border-line"><th class="p-2">${r.label}</th>${laptops
    .map(
      (l) =>
        `<td class="p-2 ${l[r.key] === b ? "bg-best font-bold" : ""}">${l[r.key]}</td>`,
    )
    .join("")}</tr>`;
}).join("")}
</tbody></table></div>`;
