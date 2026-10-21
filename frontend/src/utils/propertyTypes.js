export const propertyTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "leasing", label: "Leasing" },
];

const legacyResidentialTypes = new Set([
  "apartment",
  "mansion",
  "penthouse",
  "villa",
]);

export function normalizePropertyType(type = "") {
  const normalized = String(type).trim().toLowerCase();
  return legacyResidentialTypes.has(normalized) ? "residential" : normalized;
}