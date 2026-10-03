import { CATEGORIES, formatNaira, locationLabel, PRICE_STEPS, type SearchParams } from '@/lib/listings';
import { Search } from 'lucide-react';
import Form from 'next/form';

const value = (params: SearchParams, key: string) => (typeof params[key] === 'string' ? params[key] : '');

export default function PropertySearchBar({ locations, params = {}, showCategory = false }: {
  locations: string[]; params?: SearchParams; showCategory?: boolean;
}) {
  const type = value(params, 'type');
  return (
    <Form action="/properties" className="property-search" role="search" aria-label="Search properties">
      <fieldset className="property-search-type">
        <legend className="sr-only">Listing type</legend>
        {[['', 'All'], ['buy', 'Buy'], ['rent', 'Rent']].map(([val, label]) => (
          <label key={label}><input type="radio" name="type" value={val} defaultChecked={type === val} /><span>{label}</span></label>
        ))}
      </fieldset>
      <div className={`property-search-fields ${showCategory ? 'has-category' : ''}`}>
        <label><span>Location</span>
          <select name="location" defaultValue={value(params, 'location')}>
            <option value="">All locations</option>
            {locations.map(state => <option key={state} value={state}>{locationLabel(state)}</option>)}
          </select>
        </label>
        {showCategory && <label><span>Property type</span>
          <select name="category" defaultValue={value(params, 'category')}>
            <option value="">All types</option>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </label>}
        <label><span>Min price</span>
          <select name="minPrice" defaultValue={value(params, 'minPrice')}>
            <option value="">No min</option>
            {PRICE_STEPS.map(step => <option key={step} value={step}>{formatNaira(step)}</option>)}
          </select>
        </label>
        <label><span>Max price</span>
          <select name="maxPrice" defaultValue={value(params, 'maxPrice')}>
            <option value="">No max</option>
            {PRICE_STEPS.map(step => <option key={step} value={step}>{formatNaira(step)}</option>)}
          </select>
        </label>
        <button type="submit" className="button-primary"><Search size={16} aria-hidden="true" />Search</button>
      </div>
    </Form>
  );
}
