import EnquiryForm from '@/components/forms/EnquiryForm';
import AgentCard, { type Agent } from '@/components/listings/AgentCard';
import ElevationInvestmentCase from '@/components/listings/ElevationInvestmentCase';
import ListingVideo from '@/components/listings/ListingVideo';
import { PropertyItem } from '@/components/ui/PropertyCard';
import { dbRepo } from '@/lib/db';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MapPin,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prop = dbRepo.getPropertyBySlug(slug) as unknown as PropertyItem;
  if (!prop) {
    return { title: 'Property Not Found | Benton Estates' };
  }
  return {
    title: `${prop.name} | Benton Estates`,
    description: prop.description
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = dbRepo.getPropertyBySlug(slug) as unknown as PropertyItem;

  if (!property) {
    notFound();
  }

  const isElevation = property.slug === 'elevation-estate';
  const agent = property.agent_id ? dbRepo.getAgent(property.agent_id) as Agent | undefined : undefined;

  const highlights: string[] = (() => {
    try {
      return JSON.parse(property.highlights);
    } catch {
      return [];
    }
  })();

  const features: string[] = (() => {
    try {
      return JSON.parse(property.features);
    } catch {
      return [];
    }
  })();

  const floorPlans: { src: string; label: string }[] = (() => {
    try {
      return JSON.parse(property.floor_plans || '[]');
    } catch {
      return [];
    }
  })();

  const gallery: string[] = (() => {
    try {
      return JSON.parse(property.gallery || '[]');
    } catch {
      return [property.image];
    }
  })();

  return (
    <div className="space-y-16 pb-20">

      {/* Property Header Banner */}
      <section className="property-detail-hero">
        <div className="benton-container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0304CE] text-white">
                  {property.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E40C05] text-white">
                  {property.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#0A142F] border border-slate-300">
                  {property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-semibold font-serif tracking-tight">
                {property.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4 text-[#E40C05]" />
                <span>{property.location}, {property.state}</span>
              </div>
            </div>

            <div className="property-hero-price">
              <span className="text-xs uppercase text-slate-300 font-semibold block">{isElevation ? 'Pre-launch Price' : 'Investment Rate'}</span>
              <span className="text-3xl font-semibold text-white">{property.price_formatted}</span>
              {isElevation && <span className="block text-xs mt-1 text-[#526176]"><s>₦1,500,000</s> · <strong className="text-[#E40C05]">Save ₦305,000</strong> as an early investor</span>}
              {property.price_note && (
                <p className="text-[11px] text-slate-300 mt-1 max-w-xs">{property.price_note}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="benton-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column (Images, Specs, Details) */}
          <div className="lg:col-span-8 space-y-10">

            {/* Main Featured Image */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-sm border border-slate-200">
              <Image
                src={property.image}
                alt={property.name}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>

            {property.image_caption && <p className="text-xs text-slate-500 -mt-6">{property.image_caption}</p>}

            {gallery.length > 1 && <div className="property-gallery" aria-label="Property photographs">{gallery.map((src, index) => <div key={`${src}-${index}`}><Image src={src} alt={`${property.name} — view ${index + 1}`} fill sizes="(max-width: 1023px) 50vw, 33vw" className="object-cover" /></div>)}</div>}

            {floorPlans.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 font-serif">Floor Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {floorPlans.map(plan => (
                    <figure key={plan.src} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                      <a href={plan.src} target="_blank" rel="noopener noreferrer" className="block relative aspect-square" aria-label={`Open ${plan.label.toLowerCase()} plan full size`}>
                        <Image src={plan.src} alt={`${property.name} — ${plan.label.toLowerCase()} plan`} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-contain p-3" />
                      </a>
                      <figcaption className="px-4 py-3 border-t border-slate-200 text-xs font-semibold text-slate-700">{plan.label} · tap to enlarge</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {property.video_url && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 font-serif">Video Tour</h3>
                <ListingVideo url={property.video_url} title={property.name} />
              </div>
            )}

            {isElevation && <ElevationInvestmentCase />}

            {/* If Elevation Estate: Subscription Callout Box */}
            {isElevation && (
              <div className="bg-slate-50 border-2 border-[#E40C05] p-6 sm:p-8 rounded-lg shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E40C05] " />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#E40C05]">
                    Official Application Form Active
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 font-serif">
                  Apply to Subscribe to Elevation Estate, Ekrerahwe
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Complete your digital customer application form, review the 15 Terms &amp; Conditions of Purchase, and receive your starter pack.
                </p>
                <div className="pt-2">
                  <Link
                    href="/properties/elevation-estate/subscribe"
                    className="inline-flex items-center gap-2 bg-[#E40C05] hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-md shadow-md transition-all"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Complete Elevation Estate Subscription Form
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Quick Specs Table */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0304CE]" />
                Development Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-white rounded-md border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Plot Size</span>
                  <span className="font-bold text-slate-900 text-sm">{property.plot_size}</span>
                </div>
                <div className="p-3 bg-white rounded-md border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Title Document</span>
                  <span className="font-bold text-slate-900 text-sm block">{property.title_type}</span>
                </div>
                {/* Verified site facts currently apply to Elevation Estate only. */}
                {isElevation && <>
                <div className="p-3 bg-white rounded-md border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Road Access</span>
                  <span className="font-bold text-emerald-600 text-sm">Motorable Access</span>
                </div>
                <div className="p-3 bg-white rounded-md border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Zoning</span>
                  <span className="font-bold text-slate-900 text-sm">Residential / Commercial</span>
                </div>
                <div className="p-3 bg-white rounded-md border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Encumbrances</span>
                  <span className="font-bold text-emerald-600 text-sm">100% Free &amp; Clear</span>
                </div>
                <div className="p-3 bg-white rounded-md border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Allocation</span>
                  <span className="font-bold text-[#0304CE] text-sm">Physical Allocation</span>
                </div>
                </>}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                Overview &amp; Location Profile
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Highlights & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-xs">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 text-[#0304CE]">
                  Key Highlights
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0304CE] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-white border border-slate-200 shadow-xs">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4 text-[#E40C05]">
                  Estate Amenities &amp; Features
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E40C05] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Terms Summary for Elevation Estate */}
            {isElevation && (
              <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  Frequently Asked Questions / Terms Summary (from PDF Page 2)
                </h4>
                <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p>• <strong>Payment Structure:</strong> ₦1,195,000 outright per 464 sqm. 0–3 months outright, 0–6 months installment, or 12 months installment.</p>
                  <p>• <strong>Ancillary Fees:</strong> Deed of Assignment (₦100,000), Survey Fee (₦200,000), Plot Demarcation (₦50,000), Development fee to be determined later.</p>
                  <p>• <strong>Resale:</strong> Permitted once land is paid in full, with 10% transfer documentation fee to the developer.</p>
                  <p>• <strong>Payment Safety:</strong> Cash payments to agents are strictly prohibited. Payments must be made directly to <strong>Benton Home and Development Limited</strong> corporate accounts.</p>
                </div>
              </div>
            )}

          </div>

          {/* Right Column (Inspection & Enquiry Form) */}
          <div className="lg:col-span-4 space-y-6">
            {agent && <AgentCard agent={agent} heading="Your property contact" enquiry={property.name} />}

            <div id="property-enquiry" className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm scroll-mt-32">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0304CE] block mb-1">
                  Property Enquiry
                </span>
                <h3 className="text-xl font-bold text-slate-900">Enquire or Book Inspection</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Direct enquiry for <strong>{property.name}</strong>
                </p>
              </div>

              <EnquiryForm defaultProperty={property.name} />
            </div>

            {/* WhatsApp Direct Help Card */}
            <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase block">Prefer Instant Chat?</span>
                <span className="text-xs text-emerald-700">Chat with a property consultant</span>
              </div>
              <a
                href={`https://wa.me/2348038535773?text=${encodeURIComponent(`Hello Benton Estates, I would like to enquire about ${property.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#167a45] hover:bg-emerald-800 text-white p-2.5 rounded-md transition-colors shadow-xs shrink-0"
                aria-label="WhatsApp Contact"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
