import type { PropertyItem } from '@/components/ui/PropertyCard';
import { locationLabel } from '@/lib/listings';
import { ArrowUpRight, Check, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const parseList = (value: string | null | undefined) => {
  try {
    const parsed: unknown = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

// Temporary homepage promotion for a single listing; content comes from the listing record.
export default function ListingBanner({ property, eyebrow }: { property: PropertyItem; eyebrow: string }) {
  const highlights = parseList(property.highlights).slice(0, 3);
  const progress = parseList(property.gallery).slice(0, 2);
  return (
    <section className="benton-container" aria-labelledby="listing-banner-title">
      <div className="listing-banner">
        <div className="listing-banner-media">
          <div className="listing-banner-image">
            <Image src={property.image} alt={property.name} fill sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover" />
            {property.image_caption && <span className="listing-banner-caption">Architectural 3D model</span>}
          </div>
          {progress.length > 0 && (
            <div className="listing-banner-thumbs">
              {progress.map((src, index) => (
                <div key={src} className="relative">
                  <Image src={src} alt={`${property.name} — site progress ${index + 1}`} fill sizes="(max-width: 1023px) 50vw, 27vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="listing-banner-body">
          <div className="flex flex-wrap gap-2">
            <span className="listing-banner-pill listing-banner-pill-accent">{eyebrow}</span>
            <span className="listing-banner-pill">{property.status.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase())}</span>
          </div>
          <h2 id="listing-banner-title">{property.name}</h2>
          <p className="listing-banner-location"><MapPin size={15} aria-hidden="true" />{property.location}, {locationLabel(property.state)}</p>
          <p className="listing-banner-tagline">{property.tagline}</p>
          <ul className="listing-banner-highlights">
            {highlights.map(item => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}
          </ul>
          <div className="listing-banner-price">
            <small>Investment</small>
            <strong>{property.price_formatted}</strong>
          </div>
          <div className="listing-banner-actions">
            <Link href={`/properties/${property.slug}`} className="button-primary">View Listing <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link href={`/contact?property=${encodeURIComponent(property.name)}`} className="button-secondary">Register Interest</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
