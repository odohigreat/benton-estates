'use client';

import FormFeedback from '@/components/ui/FormFeedback';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import React, { useId, useState } from 'react';

interface EnquiryFormProps {
  defaultProperty?: string;
  className?: string;
}

export default function EnquiryForm({ defaultProperty = '', className = '' }: EnquiryFormProps) {
  const formId = useId();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: defaultProperty ? 'Property Enquiry' : 'General Enquiry',
    propertyOfInterest: defaultProperty,
    message: defaultProperty ? `I am interested in ${defaultProperty}. Please provide additional information and inspection details.` : '',
    consent: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const enquiryTypes = [
    'Property Enquiry',
    'Property Development',
    'Real Estate Consulting',
    'Land Purchase',
    'Realtor Partnership',
    'General Enquiry',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedRef(data.referenceId);
      } else {
        setErrorMsg(data.error || 'Failed to submit enquiry. Please verify your details.');
      }
    } catch {
      setErrorMsg('Network error. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <FormFeedback kind="success" className="bg-white p-8 rounded-lg border border-emerald-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Enquiry Received!</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          Thank you for reaching out to Benton Estates. Our advisory team will contact you shortly via phone and email.
        </p>
        <div className="inline-block bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-sm text-slate-700 font-mono mb-6">
          Reference Code: <strong className="text-[#0304CE]">{submittedRef}</strong>
        </div>
        <div>
          <button
            onClick={() => {
              setSubmittedRef(null);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                enquiryType: 'General Enquiry',
                propertyOfInterest: '',
                message: '',
                consent: true
              });
            }}
            className="text-xs font-bold uppercase tracking-wider text-[#0304CE] hover:underline"
          >
            Submit Another Enquiry
          </button>
        </div>
      </FormFeedback>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`enquiry-form space-y-4 ${className}`}>
      {errorMsg && (
        <FormFeedback className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </FormFeedback>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${formId}-fullName`} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-[#E40C05]">*</span>
          </label>
          <input id={`${formId}-fullName`}
            type="text"
            required
            placeholder="e.g. Chukwuemeka Adebayo"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0304CE] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone / WhatsApp <span className="text-[#E40C05]">*</span>
          </label>
          <input id={`${formId}-phone`}
            type="tel"
            required
            placeholder="e.g. +234 803 000 0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0304CE] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${formId}-email`} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-[#E40C05]">*</span>
          </label>
          <input id={`${formId}-email`}
            type="email"
            required
            placeholder="e.g. client@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0304CE] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor={`${formId}-enquiryType`} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Enquiry Type <span className="text-[#E40C05]">*</span>
          </label>
          <select id={`${formId}-enquiryType`}
            value={formData.enquiryType}
            onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0304CE] focus:border-transparent transition-all bg-white"
          >
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-propertyOfInterest`} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Property of Interest (Optional)
        </label>
        <input id={`${formId}-propertyOfInterest`}
          type="text"
          placeholder="e.g. Elevation Estate, Ekrerahwe or Commercial Plots"
          value={formData.propertyOfInterest}
          onChange={(e) => setFormData({ ...formData, propertyOfInterest: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0304CE] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Your Message / Requirements <span className="text-[#E40C05]">*</span>
        </label>
        <textarea id={`${formId}-message`}
          required
          rows={3}
          placeholder="Please describe your enquiry, preferred location, plot requirements or inspection schedule..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0304CE] focus:border-transparent transition-all resize-none"
        />
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id={`${formId}-consent-check`}
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0304CE] focus:ring-[#0304CE]"
        />
        <label htmlFor={`${formId}-consent-check`} className="text-xs text-slate-500 leading-relaxed cursor-pointer">
          I consent to Benton Estates processing the submitted information to respond to this enquiry and provide verified property details.
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#0304CE] hover:bg-[#143F9D] text-white font-bold text-sm py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-sm disabled:opacity-70 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending Enquiry...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Consultation Request
          </>
        )}
      </button>
    </form>
  );
}
