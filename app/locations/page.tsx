import Reveal from '@/components/motion/Reveal';
import EmptyState from '@/components/ui/EmptyState';
import PageHero from '@/components/ui/PageHero';
import { dbRepo } from '@/lib/db';
import { locationLabel } from '@/lib/listings';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { connection } from 'next/server';

export const metadata = {
  title: 'Locations | Benton Estates',
  description: 'Browse Benton Estates land and property listings by state and city.'
};

export default async function LocationsPage() {
  await connection();
  const locations = dbRepo.listLocations();
  return (
    <div className="space-y-16 pb-24">
      <PageHero eyebrow="Where we operate" title="Browse by Location" description={<>Choose a state to see every land, residential and commercial listing we currently manage there.</>} />
      <section className="benton-container">
        {locations.length > 0
          ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map(({ state, count, image, areas }) => (
                <Reveal key={state}>
                  <Link href={`/properties?location=${encodeURIComponent(state)}`} className="location-card">
                    <div className="location-card-image"><Image src={image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" /></div>
                    <div className="location-card-body">
                      <span className="eyebrow">{count} listing{count === 1 ? '' : 's'}</span>
                      <h2>{locationLabel(state)}</h2>
                      <p><MapPin size={13} aria-hidden="true" />{areas.split(',').join(' · ')}</p>
                      <span className="text-link">View properties <ArrowUpRight size={16} aria-hidden="true" /></span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          : <EmptyState title="No locations yet" description="Locations appear here as soon as listings are published." />}
      </section>
    </div>
  );
}
