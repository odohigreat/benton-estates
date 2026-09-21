import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Compass, 
  GraduationCap, 
  Laptop, 
  Phone, 
  MessageCircle,
  FileCheck2,
  CalendarCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import PropertyCard, { PropertyItem } from '@/components/ui/PropertyCard';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { dbRepo } from '@/lib/db';

export default function HomePage() {
  const properties = dbRepo.listProperties() as unknown as PropertyItem[];
  const elevationEstate = properties.find((p) => p.slug === 'elevation-estate') || properties[0];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* SECTION 1: HERO */}
      <section className="relative -mt-24 sm:-mt-28 min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Benton Estates Premier Developments"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 animate-in fade-in zoom-in-95 duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A142F]/90 via-[#0A142F]/75 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A142F] via-transparent to-transparent opacity-90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center sm:text-left flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#E40C05] animate-ping" />
              <span>Premier Real Estate in Delta State</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-serif">
              Your Trusted Partner in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">Quality Real Estate.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl">
              Discover thoughtfully developed, litigation-free properties and strategic real estate opportunities with Benton Estates. Upholding integrity, transparency, and timely delivery at every step.
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="#properties"
                className="inline-flex items-center justify-center gap-2.5 bg-[#0304CE] hover:bg-[#143F9D] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                Explore Properties
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-base px-8 py-4 rounded-xl transition-all"
              >
                Speak with an Advisor
              </Link>
            </div>

            {/* Value Indicators Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left border-t border-white/15">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#E40C05] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white text-xs font-bold block">100% Litigation-Free</span>
                  <span className="text-slate-300 text-[11px]">Free from adverse claims</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <FileCheck2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white text-xs font-bold block">Registered Titles</span>
                  <span className="text-slate-300 text-[11px]">Deed &amp; Survey documentation</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-start gap-2.5">
                <CalendarCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white text-xs font-bold block">Structured Installments</span>
                  <span className="text-slate-300 text-[11px]">0–12 month flexible plans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT BENTON ESTATES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with Floating Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-slate-200">
              <Image
                src="/images/corporate-office.jpg"
                alt="Benton Estates Consultation Lounge"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlay Trust Badge */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0304CE] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 block">Integrity First</span>
                  <span className="text-sm font-black text-slate-900">Benton Promise</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Timely physical allocation and authentic documentation for every subscriber.
              </p>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#0304CE] text-xs font-bold uppercase tracking-wider">
              About Benton Estates
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug font-serif">
              Building Sustainable Wealth Through Verified Real Estate.
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Operating as <strong className="text-slate-900">Benton Homes &amp; Development Limited</strong>, we are committed to making property ownership accessible, transparent, and rewarding for individuals, families, and corporate investors across Nigeria.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#0304CE]">
                <h4 className="text-xs uppercase font-bold text-[#0304CE] tracking-wider mb-1">
                  Our Stated Vision
                </h4>
                <p className="text-sm text-slate-800 italic">
                  &quot;To be Africa&apos;s leading real estate company renowned for transparency, trust, and timely delivery of quality homes.&quot;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#E40C05]">
                <h4 className="text-xs uppercase font-bold text-[#E40C05] tracking-wider mb-1">
                  Our Stated Mission
                </h4>
                <p className="text-sm text-slate-800 italic">
                  &quot;To provide affordable, litigation-free properties and deliver homes by upholding integrity, transparency, and professionalism at every stage of the client journey.&quot;
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0304CE] hover:text-[#143F9D] group"
              >
                <span>Learn More About Our Values &amp; Team</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED PROPERTIES */}
      <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 text-[#E40C05] text-xs font-bold uppercase tracking-wider mb-2">
              Our Property Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
              Featured Estates &amp; Schemes
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Carefully planned residential and commercial land developments situated in high-growth corridors.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0304CE] hover:text-[#143F9D] py-2 group shrink-0"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* SECTION 4: OUR SERVICES */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#0304CE] text-xs font-bold uppercase tracking-wider">
              Comprehensive Real Estate Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
              Our Core Services
            </h2>
            <p className="text-slate-600 text-sm">
              Providing holistic real estate expertise from property acquisition to structural development and professional mentoring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0304CE] flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Property Development</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  End-to-end residential and commercial construction, estate layout planning, drainage works, and quality residential home builds.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100">
                <Link href="/services#development" className="text-xs font-bold text-[#0304CE] hover:underline flex items-center gap-1">
                  Read Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E40C05] flex items-center justify-center mb-5">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Real Estate Consulting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Strategic property advisory, title verification guidance, site valuation, and investment risk assessment for individuals and corporate buyers.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100">
                <Link href="/services#consulting" className="text-xs font-bold text-[#0304CE] hover:underline flex items-center gap-1">
                  Read Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Land Sales &amp; Allocation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Litigation-free surveyed plots in master-planned estates like Elevation Estate, with motorable roads and prompt physical plot allocation.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100">
                <Link href="/services#land-sales" className="text-xs font-bold text-[#0304CE] hover:underline flex items-center gap-1">
                  Read Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Training &amp; Mentoring</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Equipping real estate entrepreneurs and realtors with high-performance sales skills, digital marketing, ethical standards, and deal closing.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100">
                <Link href="/become-a-realtor" className="text-xs font-bold text-[#0304CE] hover:underline flex items-center gap-1">
                  Join Realtor Network <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Real Estate Technology</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Leveraging modern digital workflows, transparent digital subscription portals, and verifiable mapping tools for a frictionless customer journey.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100">
                <Link href="/services#tech" className="text-xs font-bold text-[#0304CE] hover:underline flex items-center gap-1">
                  Read Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0304CE] to-[#143F9D] p-7 rounded-2xl text-white shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Become a Benton Realtor</h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Partner with Benton Homes &amp; Development Limited. Enjoy high commissions, regular product training, and marketing support.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-white/20">
                <Link
                  href="/become-a-realtor"
                  className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white bg-[#E40C05] hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Register as Realtor <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: WHY BENTON ESTATES? (HOME VALUES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#0304CE] text-xs font-bold uppercase tracking-wider">
            Our Guiding Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Why Choose Benton Estates?
          </h2>
          <p className="text-slate-600 text-sm">
            Our company culture and service delivery are anchored in our core <strong className="text-slate-900">HOME</strong> values.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-[#0304CE] transition-all shadow-xs group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0304CE] flex items-center justify-center text-xl font-black mb-4 group-hover:bg-[#0304CE] group-hover:text-white transition-colors">
              H
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Honesty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We practice radical transparency in land documentation, title status, boundary measurements, and development timelines. What we promise is what we deliver.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-[#0304CE] transition-all shadow-xs group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0304CE] flex items-center justify-center text-xl font-black mb-4 group-hover:bg-[#0304CE] group-hover:text-white transition-colors">
              O
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Ownership</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We take full responsibility for each estate scheme we introduce. We treat our clients&apos; investments with the same care and dedication as our own.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-[#0304CE] transition-all shadow-xs group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0304CE] flex items-center justify-center text-xl font-black mb-4 group-hover:bg-[#0304CE] group-hover:text-white transition-colors">
              M
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Mindset of Service</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our team puts client peace of mind first. From initial inquiry through on-site physical inspection to final documentation handover, we serve with empathy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-[#0304CE] transition-all shadow-xs group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0304CE] flex items-center justify-center text-xl font-black mb-4 group-hover:bg-[#0304CE] group-hover:text-white transition-colors">
              E
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Execution</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We focus on measurable, tangible delivery: swift contract generation, clear demarcations, verified survey plans, and scheduled physical land allocations.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 6: FEATURED DEVELOPMENT SPOTLIGHT (ELEVATION ESTATE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A142F] text-white rounded-3xl overflow-hidden border-2 border-[#0304CE] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Image */}
            <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full">
              <Image
                src="/images/elevation-estate.jpg"
                alt="Elevation Estate Ekrerahwe Delta State"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-5 left-5 bg-[#E40C05] text-white text-xs font-black uppercase px-3 py-1.5 rounded-md tracking-wider shadow-lg">
                Flagship Estate Development
              </div>
              <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-medium text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E40C05]" />
                <span>Ekrerahwe, Ughelli North LGA, Delta State</span>
              </div>
            </div>

            {/* Right Column: Key Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#E40C05] block mb-1">
                  Benton Presents
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-serif">
                  Elevation Estate, Ekrerahwe
                </h3>
                <p className="text-blue-200 text-xs sm:text-sm italic mt-1">
                  &quot;Own a piece of mind in a fast rising investment&quot;
                </p>

                <div className="mt-6 space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Title:</strong> Registered Survey &amp; Deed of Assignment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Plot Size:</strong> 464 SQM Standard Plot</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Motorable Access:</strong> Directly accessible by road</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Encumbrances:</strong> Free from all government interests &amp; adverse claims</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                      Outright Investment
                    </span>
                    <span className="text-2xl font-black text-white">₦1,195,000</span>
                    <span className="text-xs text-slate-400 ml-1">per 464 SQM</span>
                  </div>
                  <span className="text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-md font-semibold">
                    0–12 Mos Plans Available
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/properties/elevation-estate/subscribe"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E40C05] hover:bg-red-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md text-center"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Subscribe to This Estate
                </Link>

                <Link
                  href="/properties/elevation-estate"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all text-center"
                >
                  View Full Details &amp; FAQs
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT / CONSULTATION CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#0304CE] text-xs font-bold uppercase tracking-wider">
                Start Your Real Estate Journey
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif leading-snug">
                Let&apos;s Help You Find Your Next Property.
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you are looking to purchase surveyed land in Elevation Estate, schedule a site inspection, or discuss development advisory, our team is at your service.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0304CE] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase block">Telephone Line</span>
                    <a href="tel:+2348038357773" className="font-bold text-slate-900 hover:text-[#0304CE]">
                      +234 803 835 7773
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase block">Instant WhatsApp Support</span>
                    <a
                      href="https://wa.me/2348038357773?text=Hello%20Benton%20Estates,%20I%20would%20like%20to%20schedule%20a%20property%20inspection."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      Chat with an Advisor Now
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-[#E40C05] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase block">Corporate Office</span>
                    <span className="text-xs text-slate-700 leading-relaxed block">
                      Summer Plazza, 102 Effurun Sapele Road, Airport Junction, Opposite Our Lady&apos;s High School, Effurun, Delta State.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Request a Free Consultation</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the form below and a representative will respond within 24 hours.
                </p>
              </div>

              <EnquiryForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
