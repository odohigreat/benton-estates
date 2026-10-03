import type { PropertySearch } from './db';

export type SearchParams = { [key: string]: string | string[] | undefined };

export const PRICE_STEPS = [500_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000, 25_000_000, 50_000_000, 100_000_000];

export const CATEGORIES = [
  { value: 'LAND', label: 'Land' },
  { value: 'RESIDENTIAL', label: 'Residential' },
  { value: 'COMMERCIAL', label: 'Commercial' },
];

const single = (value: string | string[] | undefined) => (typeof value === 'string' ? value.trim() : '');

const price = (value: string) => {
  const parsed = Number(value);
  return value && Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
};

// URL params use buy/rent for readability; the database stores sale/rent.
export function parsePropertySearch(params: SearchParams): PropertySearch {
  const type = single(params.type);
  const category = single(params.category).toUpperCase();
  return {
    type: type === 'buy' ? 'sale' : type === 'rent' ? 'rent' : undefined,
    location: single(params.location) || undefined,
    category: CATEGORIES.some(c => c.value === category) ? category : undefined,
    minPrice: price(single(params.minPrice)),
    maxPrice: price(single(params.maxPrice)),
  };
}

export const locationLabel = (state: string) => state.replace(/\s+State$/i, '');

export const formatNaira = (amount: number) =>
  amount >= 1_000_000 ? `₦${amount / 1_000_000}M` : `₦${(amount / 1_000).toLocaleString()}K`;
