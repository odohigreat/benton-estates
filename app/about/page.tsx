import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Target, Eye, ArrowRight, CheckCircle2, Building, Users, MapPin, Award } from 'lucide-react';
import EnquiryForm from '@/components/forms/EnquiryForm';

export const metadata = {
  title: 'About Us | Benton Estates & Benton Homes & Development Limited',
  description: 'Learn about Benton Estates, our corporate vision, mission, and core HOME values providing transparent, litigation-free properties in Delta State, Nigeria.'
};

export default function AboutPage() {
  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* Banner */}
      <section className="relative bg-[#0A142F] text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/corporate-office.jpg"
            alt="Benton Corporate Heritage"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E40C05] bg-red-950/60 border border-red-800 px-3 py-1 rounded-full inline-block">
              Corporate Profile &amp; Governance
            </span>
            <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight">
              About Benton Estates
            </h1>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
              Benton Estates, operating through <strong className="text-white font-bold">Benton Homes &amp; Development Limited</strong>, is a forward-thinking real estate development and advisory firm dedicated to bringing trust, transparency, and timely delivery to the African property sector.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0304CE] flex items-center justify-center mb-6 shadow-xs">
              <Eye className="w-7 h-7" />
            </div>
            <span className="text-xs uppercase font-extrabold text-[#0304CE] tracking-wider block mb-2">
              Our Long-Term Aspiration
            </span>
            <h2 className="text-2xl font-black text-slate-900 mb-4 font-serif">
              Company Vision
            </h2>
            <blockquote className="text-base text-slate-800 font-semibold italic leading-relaxed border-l-4 border-[#0304CE] pl-4 bg-blue-50/40 py-2.5 rounded-r-lg">
              &quot;To be Africa&apos;s leading real estate company renowned for transparency, trust, and timely delivery of quality homes.&quot;
            </blockquote>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E40C05] flex items-center justify-center mb-6 shadow-xs">
              <Target className="w-7 h-7" />
            </div>
            <span className="text-xs uppercase font-extrabold text-[#E40C05] tracking-wider block mb-2">
              Our Everyday Commitment
            </span>
            <h2 className="text-2xl font-black text-slate-900 mb-4 font-serif">
              Company Mission
            </h2>
            <blockquote className="text-base text-slate-800 font-semibold italic leading-relaxed border-l-4 border-[#E40C05] pl-4 bg-red-50/40 py-2.5 rounded-r-lg">
              &quot;To provide affordable, litigation-free properties and deliver homes by upholding integrity, transparency, and professionalism at every stage of the client journey.&quot;
            </blockquote>
          </div>

        </div>
      </section>

      {/* CORE VALUES: HOME IN-DEPTH */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-[#0304CE] bg-blue-50 px-3 py-1 rounded-md">
              The Pillar of Our Operations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
              The H.O.M.E Core Values
            </h2>
            <p className="text-slate-700 text-sm sm:text-base font-medium">
              Every decision at Benton Estates is anchored in four foundational principles:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#0304CE] text-white flex items-center justify-center font-black text-2xl mb-5 shadow-sm">
                H
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Honesty</h3>
              <p className="text-xs uppercase text-[#0304CE] font-bold tracking-wider mb-3">
                Radical Truth &amp; Clarity
              </p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                We believe trust is earned through complete truthfulness. We furnish prospective buyers with complete title details, accurate land surveys, and realistic timelines without exaggeration.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#143F9D] text-white flex items-center justify-center font-black text-2xl mb-5 shadow-sm">
                O
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ownership</h3>
              <p className="text-xs uppercase text-[#143F9D] font-bold tracking-wider mb-3">
                Accountability in Delivery
              </p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                We take total personal accountability for the estates we develop. We proactively resolve development hurdles and stand steadfastly behind every commitment made to our subscribers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#E40C05] text-white flex items-center justify-center font-black text-2xl mb-5 shadow-sm">
                M
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Mindset of Service</h3>
              <p className="text-xs uppercase text-[#E40C05] font-bold tracking-wider mb-3">
                Client Empathy First
              </p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Real estate is deeply personal. We treat every client—whether acquiring a single starter plot or multiple commercial acres—with the highest standard of attentive care.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#0A142F] text-white flex items-center justify-center font-black text-2xl mb-5 shadow-sm">
                E
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Execution</h3>
              <p className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-3">
                Disciplined Performance
              </p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Ideas only matter when executed. We pride ourselves on timely survey processing, swift contract documentation, site demarcation, and structured physical land allocations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Identity & Governance Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50/60 border border-blue-200 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-wider font-bold text-[#0304CE]">
              Corporate Details &amp; Operational Base
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Benton Homes &amp; Development Limited
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              Our registered operational headquarters is located at <strong className="text-slate-900">Summer Plazza, 102 Effurun Sapele Road, Airport Junction, Opposite Our Lady&apos;s High School, Effurun, Delta State</strong>. 
            </p>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              We specialize in land sales and property development across prominent regional economic hubs including Warri, Effurun, Udu, Asaba, and expanding corridors.
            </p>

            <div className="pt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Duly Registered Corporate Entity
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Designated Corporate Bank Accounts
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Physical Inspection Services
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase font-bold text-[#E40C05]">Get In Touch</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              Ready to Discuss Your Property Goals?
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Schedule a one-on-one session with our senior advisory team at our Effurun offices or via telephone / video consultation.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/2348038357773?text=Hello%20Benton%20Estates,%20I%20would%20like%20to%20schedule%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs hover:bg-emerald-600 transition-colors"
              >
                Instant WhatsApp Consultation
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
            <EnquiryForm defaultProperty="General Advisory Consultation" />
          </div>
        </div>
      </section>

    </div>
  );
}
