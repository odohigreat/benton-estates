'use client';

import FormFeedback from '@/components/ui/FormFeedback';
import FormProgress from '@/components/ui/FormProgress';
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import React, { useId, useState } from 'react';

export default function ElevationSubscriptionForm() {
  const formId = useId();
  const reduced = useReducedMotion();
  const [formData, setFormData] = useState({
    // Section 1: Subscriber Details
    title: 'Mr.',
    surname: '',
    otherNames: '',
    spouseName: '',
    address: '',
    dob: '',
    gender: 'Male',
    maritalStatus: 'Single',
    nationality: 'Nigerian',
    occupation: '',
    employerName: '',
    natureOfBusiness: '',
    yearsOfEmployment: '',
    countryOfResidence: 'Nigeria',
    languageSpoken: 'English',
    email: '',
    otherIncome: '',
    mobileNumber: '',
    idType: 'National ID Card',
    isPep: 'No',
    pepCategory: '',

    // Section 2: Next of Kin
    nokName: '',
    nokAddress: '',
    nokPhone: '',
    nokEmail: '',

    // Section 3: Plot Declaration
    plotType: 'Residential', // Residential | Commercial plot
    numberOfPlots: 1,
    plotSize: '464 SQM',
    paymentPlan: 'Outright (0–3 Months)', // 3 Months | 6 Months | Outright
    isCornerPiece: false,
    declarationName: '',
    declarationDate: new Date().toISOString().split('T')[0],
    signatureData: '',

    // Referral Details
    referralName: '',
    referralDate: '',
    referralPhone: '',
    referralEmail: '',

    // Terms Acceptance
    termsVersion: 'v1.0-2026',
    termsAccepted: false,
    acceptanceSignature: '',
    acceptanceDate: new Date().toISOString().split('T')[0]
  });

  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    ref: string;
    subscriberName: string;
    plotDetails: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Financial calculation based on PDF Page 1 & 2 terms
  const BASE_PRICE = 1195000;
  const numPlots = Math.max(1, formData.numberOfPlots);
  const baseLandCost = BASE_PRICE * numPlots;
  const commercialSurcharge = formData.plotType === 'Commercial plot' ? baseLandCost * 0.1 : 0;
  const cornerPieceSurcharge = formData.isCornerPiece ? baseLandCost * 0.1 : 0;
  const totalLandConsideration = baseLandCost + commercialSurcharge + cornerPieceSurcharge;

  // Additional Documentation fees as specified in FAQ item 8
  const deedOfAssignmentFee = 100000 * numPlots;
  const surveyFee = 200000 * numPlots;
  const demarcationFee = 50000 * numPlots;
  const totalAncillaryFees = deedOfAssignmentFee + surveyFee + demarcationFee;

  const faqs = [
    {
      q: '1. Where is Elevation Estate?',
      a: 'ELEVATION ESTATE is an undeveloped parcel of land located in Ekrerhavwe, Ughelli North Local Government Area of Delta State.'
    },
    {
      q: '2. Who are the owners/developers of Elevation Estate?',
      a: 'Benton Homes and Development Limited.'
    },
    {
      q: '3. What type of title does Elevation Estate, Ekrerhavwe have on the land?',
      a: 'REGISTERED SURVEY & DEED OF ASSIGNMENT.'
    },
    {
      q: '4. Are there any encumbrances on the land?',
      a: 'The land is free from every known government interests or adverse claims.'
    },
    {
      q: '5. What is the payment structure?',
      a: '• Outright payment of ₦1,195,000 only per 464 sqm.\n• 0-3 months outright, 0-6 months installment.\n• 12 Months Installment Payment is available and can be arranged.\n• NB: Non-payment of the monthly installments as and when due shall be treated as a fundamental breach of the contract which shall result in termination or revocation of the contract and attract default charge of 10% of the month payment.'
    },
    {
      q: '6. What is the size of the plot?',
      a: '464 SQM.'
    },
    {
      q: '7. Is the road to the estate motorable?',
      a: 'Yes. The road to the estate is motorable.'
    },
    {
      q: '8. What other payments do I make apart from the payment for the land?',
      a: '• Deed of Assignment: ₦100,000 only per plot (Subject to review upwards)\n• Survey Fee: ₦200,000 only per plot (Survey Plan with Company’s name attracts extra charges) (Subject to review upwards)\n• Plot Demarcation: ₦50,000 only per plot (Subject to review upwards)\n• Development Fee to be determined later.'
    },
    {
      q: '9. When do I make the other payments?',
      a: '1. Deed of Assignment, Provisional Survey Fee and Corner Plot Demarcation payment can be made immediately.\n2. Development Fee can be made after physical allocation of plot.'
    },
    {
      q: '10. What do I get after the initial payment deposit?',
      a: 'Starters pack comprising a letter of acknowledgement of subscription, receipts of payment.'
    },
    {
      q: '11. What do I get after completing payment for the land?',
      a: 'Completion Payment Receipt, Contract of Sales & Allocation Notification Letter, Deed of Assignment & Survey Plan after Physical Allocation is done.'
    },
    {
      q: '12. Can I start construction or building on the land now?',
      a: 'You can start building on the land after Physical Allocation while fencing and Estate development is going on.'
    },
    {
      q: '13. Can I re-sell my plot/property?',
      a: 'a. Yes. Subscribers who have paid up for their land (in full) can re-sell their plot(s). Benton Homes and Development Limited would require the seller to furnish the company with details of the buyer.\nb. A charge of 10% of the land consideration (Covering Transfer Documentation Fee) shall be paid to the company by the buyer.'
    },
    {
      q: '14. Can I pay cash to your agent?',
      a: 'We strongly advise that cash payments should ONLY be made to Benton Homes and Development Limited at its designated Banks. Otherwise, cheque(s) should be issued in favor of Benton Homes and Development Limited. We shall not accept any responsibility for any liability that may arise as a result of a deviation from the above instruction.'
    },
    {
      q: '15. What happens if I cannot continue with my payment? Can I request for a refund?',
      a: 'Yes, you can apply for refund only if you have NOT been allocated your plot(s). In the event of a refund, you are required to give the Company Ninety (90) days’ notice to process your refund request and a further Sixty (60) days if the process isn’t completed after the first 90 days. The refund shall be processed and paid less 40% (Administrative Fee and Others).'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    if (!formData.termsAccepted) {
      setErrorMessage('You must review and accept the Purchase Terms & Conditions to complete this subscription.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmissionSuccess({
          ref: data.subscriptionRef,
          subscriberName: `${formData.title} ${formData.surname} ${formData.otherNames}`,
          plotDetails: `${formData.numberOfPlots} Plot(s) (${formData.plotType}) - ${formData.paymentPlan} Plan`
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit application. Please review your entries.');
      }
    } catch {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <FormFeedback kind="success" className="bg-white rounded-lg border border-emerald-200 p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
          Estate Subscription Registered
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3">
          Subscription Received, {submissionSuccess.subscriberName}!
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Your application for land allocation at <strong>Elevation Estate, Ekrerahwe</strong> has been securely submitted. A Benton customer relationship officer will contact you with your starter pack and official payment guidance.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-md p-5 mb-6 text-left space-y-2.5 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Subscription Ref:</span>
            <span className="font-mono font-bold text-[#0304CE] text-base">{submissionSuccess.ref}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Selected Allocation:</span>
            <span className="font-semibold text-slate-800">{submissionSuccess.plotDetails}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Estimated Land Cost:</span>
            <span className="font-bold text-[#0304CE]">₦{totalLandConsideration.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Official Bank:</span>
            <span className="font-semibold text-slate-800">Zenith Bank — 1312097443</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Account Name:</span>
            <span className="font-medium text-slate-700">Benton Home and Development Limited</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 mb-8 text-left leading-relaxed">
          <strong className="block font-bold mb-1">Important Safety Notice (Clause 14):</strong>
          Payments must strictly be made in favour of <strong>Benton Home and Development Limited</strong> corporate account. Do NOT pay cash to any marketing agent.
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/2348038535773?text=Hello%20Benton%20Estates,%20I%20have%20completed%20the%20Elevation%20Estate%20subscription.%20My%20Reference%20is%20${encodeURIComponent(submissionSuccess.ref)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#167a45] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-emerald-600 transition-all shadow-sm"
          >
            Confirm on WhatsApp
          </a>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all"
          >
            Submit Another Form
          </button>
        </div>
      </FormFeedback>
    );
  }

  return (
    <div className="benton-form max-w-4xl mx-auto">
      {/* Form Header */}
      <div className="benton-form-header">
        <div className="inline-block bg-white px-4 py-2 rounded-md mb-4 shadow-md">
          <Image
            src="/images/benton-logo-transparent.png"
            alt="Benton Logo"
            width={48}
            height={36}
            className="mx-auto"
          />
        </div>
        <span className="text-xs uppercase tracking-widest text-red-200 font-bold block mb-1">
          Benton Presents
        </span>
        <h2 className="text-2xl sm:text-4xl font-semibold uppercase tracking-wider font-serif">
          ELEVATION ESTATE, EKRERAHWE
        </h2>
        <div className="h-1 w-24 bg-[#E40C05] mx-auto my-2 rounded-full" />
        <p className="text-blue-100 text-sm font-semibold tracking-wide uppercase">
          SUBSCRIPTION APPLICATION FORM
        </p>
        <p className="text-xs text-blue-200 mt-1 italic">
          Own a piece of mind in a fast rising investment • Ughelli North LGA, Delta State
        </p>
      </div>

      <FormProgress sections={[{ id: 'subscription-details', label: 'Your details' }, { id: 'subscription-kin', label: 'Next of kin' }, { id: 'subscription-plots', label: 'Plot selection' }, { id: 'subscription-referral', label: 'Referral' }, { id: 'subscription-terms', label: 'Terms & signature' }]} />
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
        {errorMessage && (
          <FormFeedback className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#E40C05]" />
            <span>{errorMessage}</span>
          </FormFeedback>
        )}

        {/* SECTION 1: SUBSCRIBER'S DETAILS */}
        <section id="subscription-details" className="space-y-4">
          <h2 className="bg-[#0304CE] text-white py-2.5 px-4 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-between">
            <span>SECTION 1: SUBSCRIBER&apos;S DETAILS</span>
            <span className="text-[11px] text-blue-200 font-normal">Fields with (*) are mandatory</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label htmlFor={`${formId}-title`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Title <span className="text-[#E40C05]">*</span>
              </label>
              <select id={`${formId}-title`}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none bg-white"
              >
                {['Mr.', 'Mrs.', 'Miss', 'Chief', 'Dr.', 'Engr.', 'Pastor', 'Others'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-surname`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Surname <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-surname`}
                type="text"
                required
                placeholder="Surname"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-otherNames`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Other Names <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-otherNames`}
                type="text"
                required
                placeholder="First &amp; Middle Names"
                value={formData.otherNames}
                onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor={`${formId}-spouseName`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Name of Spouse (If Applicable)
              </label>
              <input id={`${formId}-spouseName`}
                type="text"
                placeholder="Spouse Surname &amp; Other Names"
                value={formData.spouseName}
                onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor={`${formId}-address`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Residential Address <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-address`}
                type="text"
                required
                placeholder="Current physical residential address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-dob`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Date of Birth <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-dob`}
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-gender`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Gender <span className="text-[#E40C05]">*</span>
              </label>
              <select id={`${formId}-gender`}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-maritalStatus`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Marital Status <span className="text-[#E40C05]">*</span>
              </label>
              <select id={`${formId}-maritalStatus`}
                value={formData.maritalStatus}
                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none bg-white"
              >
                {['Single', 'Married', 'Divorced', 'Widowed'].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-nationality`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Nationality <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-nationality`}
                type="text"
                required
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-occupation`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Occupation
              </label>
              <input id={`${formId}-occupation`}
                type="text"
                placeholder="e.g. Civil Engineer, Trader, Banker"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-employerName`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Employer&apos;s Name / Business
              </label>
              <input id={`${formId}-employerName`}
                type="text"
                placeholder="Company / Enterprise name"
                value={formData.employerName}
                onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-natureOfBusiness`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Nature of Business
              </label>
              <input id={`${formId}-natureOfBusiness`}
                type="text"
                placeholder="e.g. Oil & Gas, Commerce, Tech"
                value={formData.natureOfBusiness}
                onChange={(e) => setFormData({ ...formData, natureOfBusiness: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-yearsOfEmployment`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Years of Employment / Business
              </label>
              <input id={`${formId}-yearsOfEmployment`}
                type="text"
                placeholder="e.g. 5 years"
                value={formData.yearsOfEmployment}
                onChange={(e) => setFormData({ ...formData, yearsOfEmployment: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-countryOfResidence`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Country of Residence
              </label>
              <input id={`${formId}-countryOfResidence`}
                type="text"
                value={formData.countryOfResidence}
                onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-languageSpoken`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Language Spoken
              </label>
              <input id={`${formId}-languageSpoken`}
                type="text"
                value={formData.languageSpoken}
                onChange={(e) => setFormData({ ...formData, languageSpoken: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-email`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Email Address <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-email`}
                type="email"
                required
                placeholder="subscriber@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-mobileNumber`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Mobile Number <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-mobileNumber`}
                type="tel"
                required
                placeholder="+234..."
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <fieldset><legend className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Identification Card Type <span className="text-[#E40C05]">*</span>
              </legend><div className="flex flex-wrap items-center gap-4">
                  {['National ID Card', "Driver's Licence", 'International Passport', 'NIN'].map((idType) => (
                    <label key={idType} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="idType"
                        checked={formData.idType === idType}
                        onChange={() => setFormData({ ...formData, idType })}
                        className="text-[#0304CE] focus:ring-[#0304CE]"
                      />
                      <span>{idType}</span>
                    </label>
                  ))}
                </div></fieldset>
            </div>

            <div>
              <label htmlFor={`${formId}-otherIncome`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Other Source of Income (If Any)
              </label>
              <input id={`${formId}-otherIncome`}
                type="text"
                placeholder="Optional"
                value={formData.otherIncome}
                onChange={(e) => setFormData({ ...formData, otherIncome: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div className="md:col-span-3 pt-1 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Are you a Politically Exposed Person (PEP)? <span className="text-[#E40C05]">*</span>
                </span>
                <div className="flex items-center gap-6">
                  {['No', 'Yes'].map((ans) => (
                    <label key={ans} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="isPep"
                        checked={formData.isPep === ans}
                        onChange={() => setFormData({ ...formData, isPep: ans })}
                        className="text-[#0304CE] focus:ring-[#0304CE]"
                      />
                      <span>{ans}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.isPep === 'Yes' && (
                <div className="mt-2"><label htmlFor={`${formId}-pepCategory`} className="block text-xs font-bold mb-2">PEP category</label>
                  <input id={`${formId}-pepCategory`}
                    type="text"
                    placeholder="If YES, what category? (e.g. Government appointee, elected official, relative of PEP)"
                    value={formData.pepCategory}
                    onChange={(e) => setFormData({ ...formData, pepCategory: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: NEXT OF KIN */}
        <section id="subscription-kin" className="space-y-4">
          <h2 className="bg-[#0304CE] text-white py-2.5 px-4 rounded-lg font-bold text-sm uppercase tracking-wider">
            SECTION 2: NEXT OF KIN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label htmlFor={`${formId}-nokName`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Name <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-nokName`}
                type="text"
                required
                placeholder="Full name of Next of Kin"
                value={formData.nokName}
                onChange={(e) => setFormData({ ...formData, nokName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-nokPhone`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Phone Number <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-nokPhone`}
                type="tel"
                required
                placeholder="+234..."
                value={formData.nokPhone}
                onChange={(e) => setFormData({ ...formData, nokPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-nokEmail`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Email Address
              </label>
              <input id={`${formId}-nokEmail`}
                type="email"
                placeholder="kin@example.com (Optional)"
                value={formData.nokEmail}
                onChange={(e) => setFormData({ ...formData, nokEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-nokAddress`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Residential Address <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-nokAddress`}
                type="text"
                required
                placeholder="Physical address of Next of Kin"
                value={formData.nokAddress}
                onChange={(e) => setFormData({ ...formData, nokAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: SUBSCRIBER'S DECLARATION & PLOT SELECTIONS */}
        <section id="subscription-plots" className="space-y-4">
          <h2 className="bg-[#0304CE] text-white py-2.5 px-4 rounded-lg font-bold text-sm uppercase tracking-wider">
            SECTION 3: SUBSCRIBER&apos;S DECLARATION &amp; PLOT SPECIFICATION
          </h2>

          <div className="p-4 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <p className="font-serif italic text-slate-800">
              &quot;I hereby affirm that all information provided as a requirement for the purchase of the land in Elevation Estate Ekrerhavwe, located in Ughelli North Local Government Area of Delta State, is true and any false or inaccurate information given by me may result in the decline of my application.&quot;
            </p>
          </div>

          {/* Plot Configuration Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Type of Plot <span className="text-[#E40C05]">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="plotType"
                    checked={formData.plotType === 'Residential'}
                    onChange={() => setFormData({ ...formData, plotType: 'Residential' })}
                    className="text-[#0304CE] focus:ring-[#0304CE]"
                  />
                  <span>Residential Plot (Standard)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="plotType"
                    checked={formData.plotType === 'Commercial plot'}
                    onChange={() => setFormData({ ...formData, plotType: 'Commercial plot' })}
                    className="text-[#0304CE] focus:ring-[#0304CE]"
                  />
                  <span className="font-semibold text-[#0304CE]">Commercial plot (+10%)</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor={`${formId}-numberOfPlots`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Number of Plots <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-numberOfPlots`}
                type="number"
                min={1}
                max={50}
                required
                value={formData.numberOfPlots}
                onChange={(e) => setFormData({ ...formData, numberOfPlots: parseInt(e.target.value) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Standard Plot Size: 464 SQM</span>
            </div>

            <div>
              <fieldset><legend className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Payment Plan <span className="text-[#E40C05]">*</span>
              </legend><div className="flex flex-col gap-1.5">
                  {['Outright (0–3 Months)', '6 Months', '12 Months'].map((plan) => (
                    <label key={plan} className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentPlan"
                        checked={formData.paymentPlan === plan}
                        onChange={() => setFormData({ ...formData, paymentPlan: plan })}
                        className="text-[#0304CE] focus:ring-[#0304CE]"
                      />
                      <span>{plan}</span>
                    </label>
                  ))}
                </div></fieldset>
            </div>

            <div className="sm:col-span-2 md:col-span-3 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 text-xs text-slate-800 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={formData.isCornerPiece}
                  onChange={(e) => setFormData({ ...formData, isCornerPiece: e.target.checked })}
                  className="rounded text-[#0304CE] focus:ring-[#0304CE]"
                />
                <span>Corner piece plot(s) — attracts additional 10% of land cost as specified in terms</span>
              </label>
            </div>
          </div>

          {/* Interactive Calculator Box */}
          <div className="investment-summary">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0304CE] flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                Live Investment Summary
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {numPlots} plot(s) • {numPlots * 464} SQM Total
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 border-b border-blue-200/60 pb-3 mb-3">
              <div className="flex justify-between">
                <span>Base Land Cost (₦1,195,000 × {numPlots}):</span>
                <span className="font-semibold text-slate-800">₦{baseLandCost.toLocaleString()}</span>
              </div>
              {commercialSurcharge > 0 && (
                <div className="flex justify-between text-blue-700">
                  <span>Commercial Surcharge (+10%):</span>
                  <span className="font-semibold">+₦{commercialSurcharge.toLocaleString()}</span>
                </div>
              )}
              {cornerPieceSurcharge > 0 && (
                <div className="flex justify-between text-blue-700">
                  <span>Corner Piece Surcharge (+10%):</span>
                  <span className="font-semibold">+₦{cornerPieceSurcharge.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-800 font-bold pt-1">
                <span>Total Land Consideration:</span>
                <span className="text-[#0304CE] text-sm">₦{totalLandConsideration.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <span className="font-semibold text-slate-700 block">Documentation Fees Payable (FAQ #8):</span><span className="block">Total documentation fees: ₦{totalAncillaryFees.toLocaleString()} · Development fee to be determined later.</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                <span>• Deed of Assignment: ₦{(100000 * numPlots).toLocaleString()}</span>
                <span>• Registered Survey Fee: ₦{(200000 * numPlots).toLocaleString()}</span>
                <span>• Plot Demarcation: ₦{(50000 * numPlots).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label htmlFor={`${formId}-declarationName`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Subscriber Signature Name <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-declarationName`}
                type="text"
                required
                placeholder="Type full legal name as digital signature"
                value={formData.declarationName}
                onChange={(e) => setFormData({
                  ...formData,
                  declarationName: e.target.value,
                  signatureData: e.target.value
                })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-serif italic focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-declarationDate`} className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Date <span className="text-[#E40C05]">*</span>
              </label>
              <input id={`${formId}-declarationDate`}
                type="date"
                required
                value={formData.declarationDate}
                onChange={(e) => setFormData({ ...formData, declarationDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* FOR REFERRAL DETAILS */}
        <section id="subscription-referral" className="space-y-4">
          <h2 className="bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-between border border-slate-200">
            <span>FOR REFERRAL DETAILS (OPTIONAL)</span>
            <span className="text-[11px] text-slate-500 font-normal">If referred by an authorized realtor</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            <div>
              <label htmlFor={`${formId}-referralName`} className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Referral Name</label>
              <input id={`${formId}-referralName`}
                type="text"
                placeholder="Name"
                value={formData.referralName}
                onChange={(e) => setFormData({ ...formData, referralName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor={`${formId}-referralDate`} className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Date</label>
              <input id={`${formId}-referralDate`}
                type="date"
                value={formData.referralDate}
                onChange={(e) => setFormData({ ...formData, referralDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor={`${formId}-referralPhone`} className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Phone No</label>
              <input id={`${formId}-referralPhone`}
                type="tel"
                placeholder="+234..."
                value={formData.referralPhone}
                onChange={(e) => setFormData({ ...formData, referralPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor={`${formId}-referralEmail`} className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email</label>
              <input id={`${formId}-referralEmail`}
                type="email"
                placeholder="realtor@email.com"
                value={formData.referralEmail}
                onChange={(e) => setFormData({ ...formData, referralEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* PAGE 2: FREQUENTLY ASKED QUESTIONS / TERMS AND CONDITIONS OF PURCHASE */}
        <section id="subscription-terms" className="space-y-4 pt-4 border-t-2 border-slate-200">
          <div className="bg-[#0A142F] text-white p-4 rounded-md flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-semibold text-blue-300 block">Page 2 Documentation</span>
              <h3 className="text-lg font-bold">FREQUENTLY ASKED QUESTIONS / TERMS AND CONDITIONS</h3>
            </div>
            <FileText className="w-6 h-6 text-[#E40C05]" />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            The following 15 contractual terms govern the purchase and physical allocation of land in Elevation Estate, Ekrerahwe. Please review each item carefully before appending your acknowledgement signature.
          </p>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaqs.includes(idx);
              return (
                <div key={idx} className="terms-accordion overflow-hidden bg-white">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${formId}-faq-${idx}`}
                    id={`${formId}-faq-trigger-${idx}`}
                    onClick={() => setExpandedFaqs(previous => isOpen ? previous.filter(item => item !== idx) : [...previous, idx])}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-800 text-xs sm:text-sm">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#0304CE] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>{isOpen && (
                    <m.div id={`${formId}-faq-${idx}`} role="region" aria-labelledby={`${formId}-faq-trigger-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.15 }} className="p-4 bg-slate-50/80 border-t border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                      {faq.a}
                    </m.div>
                  )}</AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setExpandedFaqs(expandedFaqs.length === faqs.length ? [] : faqs.map((_, index) => index))}
              className="text-xs font-bold text-[#0304CE] hover:underline"
            >
              {expandedFaqs.length === faqs.length ? 'Collapse Questions' : 'Expand All 15 Terms & FAQs'}
            </button>
          </div>

          {/* SUBSCRIBER ACKNOWLEDGEMENT (EXACT SOURCE TRANSLATION) */}
          <div className="bg-blue-50 border border-blue-200 p-5 rounded-md space-y-4">
            <div className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0304CE]" />
              SUBSCRIBER ACKNOWLEDGEMENT &amp; ACCEPTANCE
            </div>

            <p className="text-xs font-serif italic text-blue-950 leading-relaxed">
              &quot;I hereby confirm that I have seen the land and am ready to go on with the transaction.
              THEREFORE, THE INFORMATION PROVIDED, TERMS &amp; CONDITIONS HERE WITH IS ACCEPTABLE AND CONSENTED BY ME, I ACKNOWLEDGE RECEIVING A COPY OF IT.&quot;
            </p>

            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id={`${formId}-terms-accepted-check`}
                required
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-blue-300 text-[#0304CE] focus:ring-[#0304CE]"
              />
              <label htmlFor={`${formId}-terms-accepted-check`} className="text-xs text-blue-950 font-bold cursor-pointer leading-relaxed">
                I formally confirm that the information provided, and the 15 Terms &amp; Conditions of Purchase are acceptable and consented by me. <span className="text-[#E40C05]">*</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor={`${formId}-acceptanceSignature`} className="block text-xs font-bold text-blue-900 uppercase tracking-wide mb-1">
                  Subscriber Legal Name (Signature) <span className="text-[#E40C05]">*</span>
                </label>
                <input id={`${formId}-acceptanceSignature`}
                  type="text"
                  required
                  placeholder="Type your full name as signature acknowledgement"
                  value={formData.acceptanceSignature}
                  onChange={(e) => setFormData({ ...formData, acceptanceSignature: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-blue-300 bg-white text-sm font-serif italic focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-acceptanceDate`} className="block text-xs font-bold text-blue-900 uppercase tracking-wide mb-1">
                  Acknowledgement Date <span className="text-[#E40C05]">*</span>
                </label>
                <input id={`${formId}-acceptanceDate`}
                  type="date"
                  required
                  value={formData.acceptanceDate}
                  onChange={(e) => setFormData({ ...formData, acceptanceDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-blue-300 bg-white text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Developer Official Account Reference (Page 1 footer) */}
        <div className="p-4 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-900 block text-sm">Official Bank Account Information</span>
            <span className="text-slate-500">All payments must be made in favour of:</span>
            <p className="font-bold text-[#0304CE]">BENTON HOME AND DEVELOPMENT LIMITED CURRENT ACCOUNT</p>
          </div>
          <div className="bg-white border border-slate-300 px-4 py-2.5 rounded-lg text-center shadow-xs">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Zenith Bank</span>
            <span className="text-xl font-semibold font-mono text-slate-900 tracking-wider">1312097443</span>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0304CE] hover:bg-[#143F9D] text-white font-semibold text-base py-4 px-8 rounded-md transition-all shadow-md hover:shadow-sm cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting Estate Subscription Application...
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                Submit Elevation Estate Subscription Application
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-3 font-semibold uppercase tracking-wider">
            Summer Plazza, 102 Effurun Sapele Road, Airport Junction, Effurun, Delta State
          </p>
        </div>
      </form>
    </div>
  );
}
