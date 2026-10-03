import { ArrowUpRight, Check, FileText, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AgentAvatar } from '../listings/AgentCard';
import StatusBadge from './StatusBadge';
export interface PropertyItem {
  id: string; slug: string; name: string; tagline: string; location: string; state: string;
  category: string; price: number; price_formatted: string; price_note?: string; plot_size: string;
  title_type: string; is_featured: number | boolean; status: string; description: string;
  highlights: string; features: string; image: string; gallery?: string;
  listing_type?: 'sale' | 'rent'; video_url?: string | null; agent_id?: string | null;
  floor_plans?: string | null; image_caption?: string | null;
  agent_name?: string | null; agent_position?: string | null; agent_photo?: string | null;
}
export default function PropertyCard({ property, eager = false }: { property: PropertyItem; eager?: boolean }) {
  let highlights: string[] = [];
  try { const parsed: unknown = JSON.parse(property.highlights); if (Array.isArray(parsed)) highlights = parsed.filter((item): item is string => typeof item === 'string'); } catch { /* Missing optional highlights do not block the listing. */ }
  const isElevation = property.slug === 'elevation-estate';
  return <article className="property-card">
    <div className="property-image"><Image src={property.image} alt={property.name} fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" /><div className="property-image-badge"><StatusBadge status={property.status} /></div><span className="property-image-type">{property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}</span><span className="property-image-size">{property.plot_size}</span></div>
    <div className="property-content"><div className="property-location"><MapPin size={13} className="shrink-0 mt-0.5" />{property.location}, {property.state}</div><span className="eyebrow mb-2">{property.category}</span><h3><Link href={`/properties/${property.slug}`}>{property.name}</Link></h3><p className="property-tagline">{property.tagline}</p>
      <div className="property-documentation"><FileText size={17} /><div><span>Title documentation</span>{property.title_type}</div></div>
      <ul className="property-highlights">{highlights.slice(0, 2).map(item => <li key={item}><Check size={13} />{item}</li>)}</ul>
      {property.agent_name && <div className="property-agent"><AgentAvatar name={property.agent_name} photo={property.agent_photo ?? null} size={32} /><div><span>Listed by</span>{property.agent_name}</div></div>}
      <div className="property-price"><div><small>Investment Rate</small><strong>{property.price_formatted}</strong></div>{isElevation && <span className="text-[10px] text-slate-600">0–12 Mos Plans</span>}</div>
      <div className="property-actions"><Link className="button-secondary" href={`/properties/${property.slug}`} aria-label={`View ${property.name}`}>View Details</Link><Link className="button-primary" href={isElevation ? '/properties/elevation-estate/subscribe' : `/contact?property=${encodeURIComponent(property.name)}`}>{isElevation ? 'Subscribe' : 'Enquire'}<ArrowUpRight size={14} /></Link></div>
    </div>
  </article>;
}
