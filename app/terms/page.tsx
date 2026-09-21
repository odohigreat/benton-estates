import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms and Conditions | Benton Estates',
  description: 'Terms and conditions governing website use and property transactions with Benton Estates and Benton Homes & Development Limited.'
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0304CE] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="space-y-3">
        <span className="text-xs uppercase font-bold text-[#E40C05]">Contractual Terms</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-slate-400">Effective Date: January 1, 2026</p>
      </div>

      <div className="prose prose-slate text-slate-700 text-sm leading-relaxed space-y-6">
        <p>
          These Terms and Conditions govern your engagement with <strong>Benton Estates</strong> (a brand of <strong>Benton Homes &amp; Development Limited</strong>). By submitting applications, reserving plots, or registering as a realtor, you acknowledge and agree to these provisions.
        </p>

        <h3 className="text-lg font-bold text-slate-900">1. Property Subscriptions &amp; Allocation</h3>
        <p>
          All estate subscriptions—including Elevation Estate, Ekrerahwe—are governed by their specific contractual Terms of Purchase and FAQs as set forth in the official subscription forms. Submission of a subscription form constitutes an application and does not constitute title transfer until payment in full is verified and contractual documentation is executed.
        </p>

        <h3 className="text-lg font-bold text-slate-900">2. Payment Integrity Policy (Clause 14)</h3>
        <p>
          Payments for properties must strictly be made in favour of <strong>Benton Home and Development Limited</strong> designated corporate bank accounts (e.g. Zenith Bank Account: <strong>1312097443</strong>) or bank drafts. Cash payments to independent realtors or agents are strictly prohibited, and the company disclaims all liability for unauthorized payments.
        </p>

        <h3 className="text-lg font-bold text-slate-900">3. Realtor Partnership Code of Conduct</h3>
        <p>
          Registered realtors agree to represent the company with utmost professional integrity, avoid misrepresenting property titles or guarantees, and adhere strictly to official company sales guidelines and marketing collateral.
        </p>

        <h3 className="text-lg font-bold text-slate-900">4. Applicable Law</h3>
        <p>
          These terms and all estate subscription contracts are governed by and construed in accordance with the laws of the Federal Republic of Nigeria, with Delta State as the primary jurisdiction.
        </p>
      </div>
    </div>
  );
}
