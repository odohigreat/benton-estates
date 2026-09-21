import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Share2, 
  Calendar, 
  Layers, 
  Coins, 
  Phone,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { dbRepo } from '@/lib/db';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { PropertyItem } from '@/components/ui/PropertyCard';

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

  const gallery: string[] = (() => {
    try {
      return JSON.parse((property as any).gallery);
    } catch {
      return [property.image];
    }
  })();

  return (
    <div className="space-y-16 pb-20">
      
      {/* Property Header Banner */}
      <section className="bg-[#0A142F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0304CE] text-white">
                  {property.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E40C05] text-white">
                  {property.status}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
                {property.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <MapPin className="w-4 h-4 text-[#E40C05]" />
                <span>{property.location}, {property.state}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-right">
              <span className="text-xs uppercase text-slate-300 font-semibold block">Investment Rate</span>
              <span className="text-3xl font-black text-white">{property.price_formatted}</span>
              {property.price_note && (
                <p className="text-[11px] text-slate-300 mt-1 max-w-xs">{property.price_note}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Images, Specs, Details) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Main Featured Image */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src={property.image}
                alt={property.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>

            {/* If Elevation Estate: Subscription Callout Box */}
            {isElevation && (
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-[#E40C05] p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E40C05] animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#E40C05]">
                    Official Application Form Active
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                  Apply to Subscribe to Elevation Estate, Ekrerahwe
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Complete your digital customer application form, review the 15 Terms &amp; Conditions of Purchase, and receive your starter pack.
                </p>
                <div className="pt-2">
                  <Link
                    href="/properties/elevation-estate/subscribe"
                    className="inline-flex items-center gap-2 bg-[#E40C05] hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Complete Elevation Estate Subscription Form
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Quick Specs Table */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0304CE]" />
                Development Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Plot Size</span>
                  <span className="font-bold text-slate-900 text-sm">{property.plot_size}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Title Document</span>
                  <span className="font-bold text-slate-900 text-sm truncate block">{property.title_type}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Road Access</span>
                  <span className="font-bold text-emerald-600 text-sm">Motorable Access</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Zoning</span>
                  <span className="font-bold text-slate-900 text-sm">Residential / Commercial</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Encumbrances</span>
                  <span className="font-bold text-emerald-600 text-sm">100% Free &amp; Clear</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 uppercase font-semibold block mb-0.5">Allocation</span>
                  <span className="font-bold text-[#0304CE] text-sm">Physical Allocation</span>
                </div>
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
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
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

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
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
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
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
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg">
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
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase block">Prefer Instant Chat?</span>
                <span className="text-xs text-emerald-700">Chat with a property consultant</span>
              </div>
              <a
                href={`https://wa.me/2348038357773?text=${encodeURIComponent(`Hello Benton Estates, I would like to enquire about ${property.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-emerald-600 text-white p-2.5 rounded-xl transition-colors shadow-xs shrink-0"
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
