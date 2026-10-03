import PropertySearchBar from '@/components/listings/PropertySearchBar';
import Reveal from '@/components/motion/Reveal';
import EmptyState from '@/components/ui/EmptyState';
import PageHero from '@/components/ui/PageHero';
import PropertyCard, { PropertyItem } from '@/components/ui/PropertyCard';
import { dbRepo } from '@/lib/db';
import { locationLabel, parsePropertySearch, type SearchParams } from '@/lib/listings';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Properties for Sale & Rent | Benton Estates',
  description: 'Search verified land, residential and commercial properties for sale and rent by location and price.'
};

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const search = parsePropertySearch(params);
  const properties = dbRepo.searchProperties(search) as unknown as PropertyItem[];
  const locations = dbRepo.listLocations().map(l => l.state);
  const filtered = Object.values(search).some(v => v !== undefined);

  return (
    <div className="space-y-16 pb-20">

      {/* Header Banner */}
      <PageHero eyebrow="Approved Properties & Schemes" title="Properties for Sale &amp; Rent" description={<>Search land, homes and commercial plots by location and budget. Every property undergoes meticulous title verification and physical survey.</>} />

      {/* Main Listing Area */}
      <section className="benton-container">

        <PropertySearchBar locations={locations} params={params} showCategory />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 mb-10 pb-6 border-b border-slate-200">
          <div className="text-xs text-slate-500 font-medium" aria-live="polite">
            Showing <strong className="text-slate-800">{properties.length}</strong> {search.type === 'rent' ? 'rental' : 'verified'} listing{properties.length === 1 ? '' : 's'}{search.location && <> in <strong className="text-slate-800">{locationLabel(search.location)}</strong></>}
          </div>
          {filtered && <Link href="/properties" className="text-link">Clear filters</Link>}
        </div>

        {properties.length > 0
          ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => <Reveal key={property.id}><PropertyCard property={property} eager={index < 3} /></Reveal>)}
            </div>
          : <EmptyState title="No listings match your search" description="Try a different location, widen the price range, or switch between Buy and Rent." />}

      </section>

      {/* Flagship Elevation Estate Feature Callout */}
      <section className="benton-container">
        <div className="bg-blue-50 border-2 border-[#0304CE] p-8 sm:p-12 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E40C05] bg-red-100 px-3 py-1 rounded-md">
              Immediate Allocation Available
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 font-serif">
              Ready to Subscribe to Elevation Estate, Ekrerahwe?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Standard 464 SQM plots starting at <strong>₦1,195,000</strong> outright, with 3, 6, and 12-month installment structures. Complete your official subscription application online.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/properties/elevation-estate/subscribe"
              className="inline-flex items-center justify-center gap-2 bg-[#E40C05] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-md shadow-md transition-all text-center"
            >
              <ShieldCheck className="w-4 h-4" />
              Start Subscription Application
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
