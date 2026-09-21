import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Shield, CheckCircle2, FileText } from 'lucide-react';

export interface PropertyItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  state: string;
  category: string;
  price: number;
  price_formatted: string;
  price_note?: string;
  plot_size: string;
  title_type: string;
  is_featured: number | boolean;
  status: string;
  description: string;
  highlights: string; // JSON
  features: string; // JSON
  image: string;
}

export default function PropertyCard({ property }: { property: PropertyItem }) {
  const highlights: string[] = (() => {
    try {
      return JSON.parse(property.highlights);
    } catch {
      return [];
    }
  })();

  const isElevation = property.slug === 'elevation-estate';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group property-card-hover">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={property.image}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category & Status Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0304CE] text-white shadow-md">
            {property.category}
          </span>
          {property.status === 'SELLING FAST' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E40C05] text-white shadow-md animate-pulse">
              Selling Fast
            </span>
          )}
          {property.status === 'COMING SOON' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-white shadow-md">
              Coming Soon
            </span>
          )}
        </div>

        {/* Plot Size Badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
          <span>{property.plot_size}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#E40C05]" />
            <span>{property.location}, {property.state}</span>
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0304CE] transition-colors line-clamp-1 mb-2">
            <Link href={`/properties/${property.slug}`}>
              {property.name}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {property.tagline}
          </p>

          {/* Title Type Indicator */}
          <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 flex items-start gap-2 mb-4">
            <FileText className="w-4 h-4 text-[#0304CE] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700">
              <span className="font-semibold text-slate-900 block">Title Document:</span>
              <span>{property.title_type}</span>
            </div>
          </div>

          {/* Key Highlights */}
          {highlights.length > 0 && (
            <div className="space-y-1.5 mb-5">
              {highlights.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0304CE] shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Price & Actions */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                Investment Rate
              </span>
              <span className="text-xl font-black text-[#0304CE]">
                {property.price_formatted}
              </span>
            </div>

            {isElevation && (
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                0-12 Mos Plans
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href={`/properties/${property.slug}`}
              className="w-full inline-flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-3 rounded-lg border border-slate-300 text-slate-700 hover:border-[#0304CE] hover:text-[#0304CE] transition-all"
            >
              View Details
            </Link>

            {isElevation ? (
              <Link
                href="/properties/elevation-estate/subscribe"
                className="w-full inline-flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-3 rounded-lg bg-[#E40C05] text-white hover:bg-red-700 transition-all shadow-xs"
              >
                Subscribe
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <Link
                href={`/contact?property=${encodeURIComponent(property.name)}`}
                className="w-full inline-flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-3 rounded-lg bg-[#0304CE] text-white hover:bg-[#143F9D] transition-all shadow-xs"
              >
                Enquire
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
