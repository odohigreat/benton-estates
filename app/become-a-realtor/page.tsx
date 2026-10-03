import RealtorForm from '@/components/forms/RealtorForm';
import PageHero from '@/components/ui/PageHero';
import { Award, ShieldCheck, TrendingUp, Users } from 'lucide-react';

export const metadata = {
  title: 'Become a Realtor | Benton Homes & Development Limited',
  description: 'Official Realtor Registration Form for Benton Homes & Development Limited. Partner with us, earn high commissions, and access verified real estate developments in Delta State.'
};

export default function BecomeRealtorPage() {
  return (
    <div className="space-y-16 pb-24">

      {/* Banner */}
      <PageHero eyebrow="Realtor Partnership Network" title="Partner With Benton Homes" description={<>Join a forward-looking real estate company built on integrity, prompt commission disbursement, and authentic property developments.</>} />

      {/* Realtor Benefits Bar */}
      <section className="benton-container benton-container-narrow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-md bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Award className="w-5 h-5 text-[#0304CE] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-xs block">Top Tier Commissions</span>
              <span className="text-[11px] text-slate-500">Prompt payouts on closed deals</span>
            </div>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-xs block">Verified Inventory</span>
              <span className="text-[11px] text-slate-500">100% litigation-free land</span>
            </div>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border border-slate-200 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#E40C05] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-xs block">Sales Training</span>
              <span className="text-[11px] text-slate-500">Regular skills &amp; closing clinics</span>
            </div>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Users className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 text-xs block">Dedicated Manager</span>
              <span className="text-[11px] text-slate-500">Office inspection support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Realtor Form Component */}
      <section className="benton-container benton-container-narrow">
        <RealtorForm />
      </section>

    </div>
  );
}
