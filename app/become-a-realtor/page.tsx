import React from 'react';
import RealtorForm from '@/components/forms/RealtorForm';
import { Award, TrendingUp, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Become a Realtor | Benton Homes & Development Limited',
  description: 'Official Realtor Registration Form for Benton Homes & Development Limited. Partner with us, earn high commissions, and access verified real estate developments in Delta State.'
};

export default function BecomeRealtorPage() {
  return (
    <div className="space-y-16 pb-24">
      
      {/* Banner */}
      <section className="bg-[#0A142F] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#E40C05] bg-red-950/60 border border-red-800 px-3 py-1 rounded-full inline-block">
            Realtor Partnership Network
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
            Partner With Benton Homes
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Join a forward-looking real estate company built on integrity, prompt commission disbursement, and authentic property developments.
          </p>
          <div className="pt-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
            Building Partnerships • Creating Wealth • Developing Communities
          </div>
        </div>
      </section>

      {/* Realtor Benefits Bar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Award className="w-5 h-5 text-[#0304CE] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-xs block">Top Tier Commissions</span>
              <span className="text-[11px] text-slate-500">Prompt payouts on closed deals</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-xs block">Verified Inventory</span>
              <span className="text-[11px] text-slate-500">100% litigation-free land</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#E40C05] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-xs block">Sales Training</span>
              <span className="text-[11px] text-slate-500">Regular skills &amp; closing clinics</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Users className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-xs block">Dedicated Manager</span>
              <span className="text-[11px] text-slate-500">Office inspection support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Realtor Form Component */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <RealtorForm />
      </section>

    </div>
  );
}
