'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ShieldCheck, Filter, ArrowRight, CheckCircle2 } from 'lucide-react';
import PropertyCard, { PropertyItem } from '@/components/ui/PropertyCard';

export default function PropertiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const properties: PropertyItem[] = [
    {
      id: 'prop-elevation-estate',
      slug: 'elevation-estate',
      name: 'Elevation Estate, Ekrerahwe',
      tagline: 'Own a piece of mind in a fast rising investment',
      location: 'Ekrerahwe, Ughelli North LGA',
      state: 'Delta State',
      category: 'LAND',
      price: 1195000,
      price_formatted: '₦1,195,000',
      price_note: 'Outright per 464 SQM plot (0-12 months installment available)',
      plot_size: '464 SQM',
      title_type: 'Registered Survey & Deed of Assignment',
      is_featured: 1,
      status: 'SELLING FAST',
      description: 'Elevation Estate is a prime undeveloped residential and commercial land development located in Ekrerahwe, Ughelli North Local Government Area of Delta State. Developed by Benton Homes and Development Limited.',
      highlights: JSON.stringify([
        'Registered Survey & Deed of Assignment',
        'Free from all adverse claims and government encumbrances',
        'Immediate motorable road access',
        'Physical allocation upon completion of payment'
      ]),
      features: JSON.stringify([
        '100% Dry Land',
        '464 SQM Standard Plot Size',
        'Residential & Commercial Zoning (Commercial +10%)',
        'Flexible 3, 6 & 12 Month Payment Plans'
      ]),
      image: '/images/elevation-estate.jpg'
    },
    {
      id: 'prop-benton-crest',
      slug: 'benton-crest-residences',
      name: 'Benton Crest Luxury Scheme',
      tagline: 'Sample Development • Upcoming Residential Scheme',
      location: 'Effurun / Warri Corridor',
      state: 'Delta State',
      category: 'RESIDENTIAL',
      price: 65000000,
      price_formatted: 'Price on Request',
      price_note: 'Off-plan architectural development scheme',
      plot_size: '4/5 Bedroom Duplex Layouts',
      title_type: 'Governor’s Consent / C of O in Process',
      is_featured: 1,
      status: 'COMING SOON',
      description: 'An upcoming exclusive residential development crafted for high-comfort living, featuring modern architectural aesthetics, perimeter security, and planned underground drainage.',
      highlights: JSON.stringify([
        'Sample Development Scheme for Planning & Registration',
        'Modern open-concept architectural duplex designs',
        '24/7 Gated security & access control'
      ]),
      features: JSON.stringify([
        'All En-Suite Bedrooms',
        'Smart Home Ready',
        'Dedicated Utility Transformer'
      ]),
      image: '/images/modern-duplex.jpg'
    },
    {
      id: 'prop-commercial-hub',
      slug: 'benton-commercial-plots',
      name: 'Benton Commercial Corridor',
      tagline: 'Sample Development • Strategic Commercial Scheme',
      location: 'Airport Junction / Sapele Road Axis, Effurun',
      state: 'Delta State',
      category: 'COMMERCIAL',
      price: 4500000,
      price_formatted: '₦4,500,000',
      price_note: 'Commercial plots with high thoroughfare visibility',
      plot_size: '928 SQM (Double Plot)',
      title_type: 'Registered Survey & Deed of Assignment',
      is_featured: 1,
      status: 'AVAILABLE',
      description: 'Strategically situated commercial plots tailored for warehousing, enterprise offices, shopping plazas, and logistics centers along the bustling Sapele Road / Airport corridor.',
      highlights: JSON.stringify([
        'Sample Development Scheme',
        'High-traffic commercial corridor',
        'Dual road access for heavy vehicles'
      ]),
      features: JSON.stringify([
        '928 SQM Commercial Parcel',
        'Heavy vehicle accessible',
        'Direct title transfer'
      ]),
      image: '/images/hero.jpg'
    }
  ];

  const filteredProperties = properties.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#0A142F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E40C05] bg-red-950/60 border border-red-800 px-3 py-1 rounded-full inline-block">
              Approved Properties &amp; Schemes
            </span>
            <h1 className="text-4xl sm:text-5xl font-black font-serif tracking-tight">
              Properties &amp; Developments
            </h1>
            <p className="text-slate-300 text-base leading-relaxed">
              Explore our current land developments and planned residential schemes across Delta State. Every property undergoes meticulous title verification and physical survey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { label: 'All Properties', val: 'ALL' },
              { label: 'Land Developments', val: 'LAND' },
              { label: 'Residential Schemes', val: 'RESIDENTIAL' },
              { label: 'Commercial Plots', val: 'COMMERCIAL' }
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setSelectedCategory(tab.val)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.val
                    ? 'bg-[#0304CE] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filteredProperties.length}</strong> verified development scheme(s)
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

      </section>

      {/* Flagship Elevation Estate Feature Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[#0304CE] p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E40C05] bg-red-100 px-3 py-1 rounded-md">
              Immediate Allocation Available
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              Ready to Subscribe to Elevation Estate, Ekrerahwe?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Standard 464 SQM plots starting at <strong>₦1,195,000</strong> outright, with 3, 6, and 12-month installment structures. Complete your official subscription application online.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/properties/elevation-estate/subscribe"
              className="inline-flex items-center justify-center gap-2 bg-[#E40C05] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all text-center"
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
