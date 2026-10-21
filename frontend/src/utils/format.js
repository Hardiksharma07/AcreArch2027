export const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0);
export const typeLabel = (value = '') => value ? value[0].toUpperCase() + value.slice(1) : 'Property';
export const splitList = (value) => Array.isArray(value) ? value : String(value || '').split(/[\n,;]/).map((item) => item.trim()).filter(Boolean);
