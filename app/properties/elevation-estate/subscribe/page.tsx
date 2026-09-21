import React from 'react';
import ElevationSubscriptionForm from '@/components/forms/ElevationSubscriptionForm';

export const metadata = {
  title: 'Elevation Estate Customer Subscription Form | Benton Estates',
  description: 'Official customer subscription and land allocation application for Elevation Estate, Ekrerahwe, Ughelli North Local Government Area of Delta State.'
};

export default function ElevationSubscribePage() {
  return (
    <div className="space-y-12 pb-24">
      {/* Banner */}
      <section className="bg-[#0A142F] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-bold text-[#E40C05] bg-red-950/60 border border-red-800 px-3 py-1 rounded-full inline-block mb-3">
            Official Land Allocation Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
            Elevation Estate Subscription Application
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2 max-w-2xl mx-auto">
            Please complete all required fields accurately. Once your application is submitted, our allocation desk will generate your official acknowledgment letter and starter pack.
          </p>
        </div>
      </section>

      {/* Main Form Component */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ElevationSubscriptionForm />
      </section>
    </div>
  );
}
