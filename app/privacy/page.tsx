import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Benton Estates',
  description: 'Privacy policy and personal data protection procedures for Benton Estates and Benton Homes & Development Limited.'
};

export default function PrivacyPage() {
  return (
    <div className="legal-document max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0304CE] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="space-y-3">
        <span className="text-xs uppercase font-bold text-[#E40C05]">Legal &amp; Compliance</span>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 font-serif">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Effective Date: January 1, 2026</p>
      </div>

      <div className="prose prose-slate text-slate-700 text-sm leading-relaxed space-y-6">
        <p>
          At <strong>Benton Estates</strong> (operating as <strong>Benton Homes &amp; Development Limited</strong>), we are dedicated to safeguarding the privacy and personal data of our subscribers, clients, and partners. This policy explains how we collect, store, and process information collected via our website, realtor registrations, and property subscription forms.
        </p>

        <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
        <p>We collect personal information necessary for real estate transactions, legal property documentation, and anti-money laundering (AML) compliance:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Identity Information:</strong> Full legal names, dates of birth, identification types and numbers (NIN, Driver’s License, International Passport).</li>
          <li><strong>Contact Information:</strong> Phone/WhatsApp numbers, residential addresses, and email addresses.</li>
          <li><strong>Subscription &amp; Transaction Details:</strong> Selected plots, payment plan preferences, Next-of-Kin details, and PEP (Politically Exposed Person) declarations.</li>
          <li><strong>Realtor Profile Data:</strong> Sales experience, operational territory, and payment references.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
        <p>We utilize the collected information strictly for legitimate real estate business purposes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Processing property allocations and issuing contractual documentation (Deeds of Assignment, Registered Surveys, Allocation Letters).</li>
          <li>Verifying compliance with statutory real estate regulations in Delta State and Nigeria.</li>
          <li>Responding to inquiries and coordinating physical site inspections.</li>
          <li>Managing authorized realtor registrations and commission disbursements.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900">3. Data Protection &amp; Confidentiality</h2>
        <p>
          We implement industry-standard encryption and access control protocols. Sensitive records (such as identification numbers and Next-of-Kin details) are accessible solely by authenticated compliance and administrative personnel. We do not sell, rent, or lease client data to third parties.
        </p>

        <h2 className="text-lg font-bold text-slate-900">4. Contact &amp; Data Rights</h2>
        <p>
          To request an update or review of your stored personal details, contact our corporate office at:
          <br />
          <strong>Benton Homes &amp; Development Limited</strong>
          <br />
          Summer Plazza, 102 Effurun Sapele Road, Airport Junction, Effurun, Delta State.
          <br />
          Email: <a href="mailto:enquiries@bentonhomes.com" className="text-[#0304CE] underline">enquiries@bentonhomes.com</a>
        </p>
      </div>
    </div>
  );
}
