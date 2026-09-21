'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Shield, CheckCircle2, AlertCircle, Loader2, ArrowRight, UserCheck, Award } from 'lucide-react';
import BentonLogo from '../ui/BentonLogo';

export default function RealtorForm() {
  const [formData, setFormData] = useState({
    // Section 1: Personal Information
    fullName: '',
    phone: '',
    email: '',
    cityState: '',
    residentialAddress: '',

    // Section 2: Realtor Profile
    isRealtor: 'Yes',
    experience: '1–2 yrs',
    currentCompany: '',
    role: 'Realtor',
    areasOperate: ['Warri', 'Effurun'],
    otherArea: '',

    // Section 3: Sales & Marketing
    propertiesClosed: '1–5',
    strongestSkill: 'Lead Generation',
    mainLeadSource: 'WhatsApp',
    availableInspections: 'Yes',

    // Section 4: Digital Presence
    instagram: '',
    facebook: '',
    tiktok: '',
    linkedinOther: '',

    // Section 5: Benton Homes Partnership
    whyPartner: '',
    hopesToAchieve: ['Income', 'Career', 'Training'],
    heardAboutUs: 'Social Media',
    heardAboutUsOther: '',

    // Section 6: Identification & Reference
    meansOfId: 'National ID',
    idNumber: '',
    nextOfKinName: '',
    nextOfKinPhone: '',

    // Section 7: Declaration
    declarationAgreed: false,
    signatureName: '',
    signatureDate: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    ref: string;
    name: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleCheckbox = (field: 'areasOperate' | 'hopesToAchieve', value: string) => {
    setFormData((prev) => {
      const list = prev[field];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...list, value] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    if (!formData.declarationAgreed) {
      setErrorMessage('You must review and agree to the Declaration in Section 7.');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        areasOperate: formData.areasOperate.join(', '),
        hopesToAchieve: formData.hopesToAchieve.join(', ')
      };

      const res = await fetch('/api/realtor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmissionSuccess({
          ref: data.applicationRef,
          name: formData.fullName
        });
      } else {
        setErrorMessage(data.error || 'Unable to process registration. Please verify all entries.');
      }
    } catch (err) {
      setErrorMessage('Network error occurred. Please check your connectivity and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 p-8 sm:p-12 shadow-lg text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
          Application Received • Status: Pending
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
          Welcome to the Benton Network, {submissionSuccess.name}!
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Your Realtor Registration application has been securely recorded. Our Partner Relations team will review your credentials and assign your official Realtor ID and Account Manager.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 text-left space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Application Reference:</span>
            <span className="font-mono font-bold text-[#0304CE] text-base">{submissionSuccess.ref}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Initial Status:</span>
            <span className="font-semibold text-amber-600">Pending Office Verification</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Partner Entity:</span>
            <span className="font-medium text-slate-800">Benton Homes &amp; Development Limited</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/2348038357773?text=Hello%20Benton%20Homes,%20I%20have%20submitted%20my%20Realtor%20Registration%20application.%20My%20Reference%20is%20${encodeURIComponent(submissionSuccess.ref)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-emerald-600 transition-all shadow-sm"
          >
            Connect on WhatsApp with Reference
          </a>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Form Document Header */}
      <div className="bg-[#0304CE] text-white p-6 sm:p-8 text-center relative">
        <div className="inline-block bg-white px-4 py-2 rounded-xl mb-4 shadow-md">
          <Image
            src="/images/benton-logo-transparent.png"
            alt="Benton Logo"
            width={48}
            height={36}
            className="mx-auto"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider font-serif">
          REALTOR REGISTRATION FORM
        </h2>
        <p className="text-blue-200 text-xs sm:text-sm font-medium tracking-wide mt-1">
          Benton Homes &amp; Development Limited
        </p>
        <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-red-200 uppercase bg-black/20 px-3 py-1 rounded-full">
          <span>Building Partnerships</span> • <span>Creating Wealth</span> • <span>Developing Communities</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-10">
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#E40C05]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* SECTION 1: PERSONAL INFORMATION */}
        <section className="space-y-4">
          <div className="bg-[#0304CE] text-white py-2 px-4 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-between">
            <span>1. PERSONAL INFORMATION</span>
            <span className="text-[11px] text-blue-200 font-normal">All fields required</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Full Name <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Surname, First Name, Middle Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Phone / WhatsApp <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+234..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Email Address <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="realtor@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                City / State <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Warri, Delta State"
                value={formData.cityState}
                onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Residential Address <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="House Number, Street Name, Town / Local Govt Area"
                value={formData.residentialAddress}
                onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: REALTOR PROFILE */}
        <section className="space-y-4">
          <div className="bg-[#0304CE] text-white py-2 px-4 rounded-lg font-bold text-sm uppercase tracking-wider">
            2. REALTOR PROFILE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Are you currently a Realtor?
              </label>
              <div className="flex items-center gap-6">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="isRealtor"
                      checked={formData.isRealtor === opt}
                      onChange={() => setFormData({ ...formData, isRealtor: opt })}
                      className="text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Experience
              </label>
              <div className="flex flex-wrap items-center gap-4">
                {['<1 yr', '1–2 yrs', '3–5 yrs', '5+ yrs'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      checked={formData.experience === opt}
                      onChange={() => setFormData({ ...formData, experience: opt })}
                      className="text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Current Company / Business
              </label>
              <input
                type="text"
                placeholder="Current real estate firm or business name"
                value={formData.currentCompany}
                onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Role
              </label>
              <div className="flex flex-wrap items-center gap-4">
                {['Realtor', 'Consultant', 'Marketer', 'Investor'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      checked={formData.role === opt}
                      onChange={() => setFormData({ ...formData, role: opt })}
                      className="text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Areas You Operate (Select all that apply)
              </label>
              <div className="flex flex-wrap items-center gap-4 mb-3">
                {['Warri', 'Effurun', 'Udu', 'Asaba', 'Lagos'].map((area) => (
                  <label key={area} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.areasOperate.includes(area)}
                      onChange={() => toggleCheckbox('areasOperate', area)}
                      className="rounded text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{area}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                placeholder="Other area(s), specify here..."
                value={formData.otherArea}
                onChange={(e) => setFormData({ ...formData, otherArea: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: SALES & MARKETING */}
        <section className="space-y-4">
          <div className="bg-[#0304CE] text-white py-2 px-4 rounded-lg font-bold text-sm uppercase tracking-wider">
            3. SALES &amp; MARKETING
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Property Deals Closed
              </label>
              <div className="flex items-center gap-5">
                {['0', '1–5', '6–10', '10+'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="propertiesClosed"
                      checked={formData.propertiesClosed === opt}
                      onChange={() => setFormData({ ...formData, propertiesClosed: opt })}
                      className="text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Strongest Skill
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {['Lead Gen', 'Follow-up', 'Closing', 'Communication', 'Negotiation', 'Networking'].map((skill) => (
                  <label key={skill} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="strongestSkill"
                      checked={formData.strongestSkill === skill}
                      onChange={() => setFormData({ ...formData, strongestSkill: skill })}
                      className="text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Main Lead Source
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {['WhatsApp', 'Instagram', 'TikTok', 'Facebook', 'Referrals', 'Physical Marketing', 'Ads'].map((src) => (
                  <label key={src} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="mainLeadSource"
                      checked={formData.mainLeadSource === src}
                      onChange={() => setFormData({ ...formData, mainLeadSource: src })}
                      className="text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{src}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Available for Property Inspections?
              </label>
              <div className="flex items-center gap-6">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="availableInspections"
                      checked={formData.availableInspections === opt}
                      onChange={() => setFormData({ ...formData, availableInspections: opt })}
                      className="text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DIGITAL PRESENCE */}
        <section className="space-y-4">
          <div className="bg-[#0304CE] text-white py-2 px-4 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-between">
            <span>4. DIGITAL PRESENCE</span>
            <span className="text-[11px] text-blue-200 font-normal">Optional social handles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Instagram
              </label>
              <input
                type="text"
                placeholder="@username"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Facebook
              </label>
              <input
                type="text"
                placeholder="Facebook page / name"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                TikTok
              </label>
              <input
                type="text"
                placeholder="@username"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                LinkedIn / Other
              </label>
              <input
                type="text"
                placeholder="Profile link or other platform"
                value={formData.linkedinOther}
                onChange={(e) => setFormData({ ...formData, linkedinOther: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* SECTION 5: BENTON HOMES PARTNERSHIP */}
        <section className="space-y-4">
          <div className="bg-[#0304CE] text-white py-2 px-4 rounded-lg font-bold text-sm uppercase tracking-wider">
            5. BENTON HOMES PARTNERSHIP
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Why do you want to partner with Benton Homes? <span className="text-[#E40C05]">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tell us about your motivation to work with Benton Homes & Development Limited..."
                value={formData.whyPartner}
                onChange={(e) => setFormData({ ...formData, whyPartner: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                What do you hope to achieve? (Check all that apply)
              </label>
              <div className="flex flex-wrap items-center gap-4">
                {['Income', 'Career', 'Training', 'Personal Brand', 'Investment'].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hopesToAchieve.includes(item)}
                      onChange={() => toggleCheckbox('hopesToAchieve', item)}
                      className="rounded text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                How did you hear about us?
              </label>
              <div className="flex flex-wrap items-center gap-4 mb-2">
                {['Referral', 'Social Media', 'Event/Training', 'Other'].map((source) => (
                  <label key={source} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="heardAboutUs"
                      checked={formData.heardAboutUs === source}
                      onChange={() => setFormData({ ...formData, heardAboutUs: source })}
                      className="text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{source}</span>
                  </label>
                ))}
              </div>
              {formData.heardAboutUs === 'Other' && (
                <input
                  type="text"
                  placeholder="Please specify how you heard about us..."
                  value={formData.heardAboutUsOther}
                  onChange={(e) => setFormData({ ...formData, heardAboutUsOther: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
                />
              )}
            </div>
          </div>
        </section>

        {/* SECTION 6: IDENTIFICATION & REFERENCE */}
        <section className="space-y-4">
          <div className="bg-[#0304CE] text-white py-2 px-4 rounded-lg font-bold text-sm uppercase tracking-wider">
            6. IDENTIFICATION &amp; REFERENCE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                Means of ID <span className="text-[#E40C05]">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {['National ID', "Driver's Licence", 'Passport', "Voter's Card"].map((idOpt) => (
                  <label key={idOpt} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="meansOfId"
                      checked={formData.meansOfId === idOpt}
                      onChange={() => setFormData({ ...formData, meansOfId: idOpt })}
                      className="text-[#0304CE] focus:ring-[#0304CE]"
                    />
                    <span>{idOpt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                ID Number <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter identification document number"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Reference / Next of Kin <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Full name of reference or next of kin"
                value={formData.nextOfKinName}
                onChange={(e) => setFormData({ ...formData, nextOfKinName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Reference Phone Number <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+234..."
                value={formData.nextOfKinPhone}
                onChange={(e) => setFormData({ ...formData, nextOfKinPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* SECTION 7: DECLARATION */}
        <section className="space-y-4">
          <div className="bg-[#0304CE] text-white py-2 px-4 rounded-lg font-bold text-sm uppercase tracking-wider">
            7. DECLARATION
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
            <p className="font-medium italic">
              &quot;I confirm that the information provided is accurate. I agree to represent Benton Homes &amp; Development Limited professionally, follow company policies and sales procedures, and maintain ethical standards in all dealings.&quot;
            </p>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="realtor-declaration-check"
              required
              checked={formData.declarationAgreed}
              onChange={(e) => setFormData({ ...formData, declarationAgreed: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0304CE] focus:ring-[#0304CE]"
            />
            <label htmlFor="realtor-declaration-check" className="text-xs text-slate-800 font-semibold cursor-pointer">
              I have read, understood, and accept the ethical declaration above. <span className="text-[#E40C05]">*</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Typed Digital Signature (Full Name) <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Type your full legal name as digital signature"
                value={formData.signatureName}
                onChange={(e) => setFormData({ ...formData, signatureName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-serif italic focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Date <span className="text-[#E40C05]">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.signatureDate}
                onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#0304CE] focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* SECTION 8: FOR OFFICE USE ONLY (Visual acknowledgement) */}
        <section className="border border-dashed border-slate-300 bg-slate-50/70 p-5 rounded-xl text-xs text-slate-500">
          <div className="font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0304CE]" />
            FOR OFFICE USE ONLY (Administrative Field Placeholders)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="block text-slate-400">Realtor ID:</span>
              <span className="font-mono font-medium text-slate-600">[Auto-generated on approval]</span>
            </div>
            <div>
              <span className="block text-slate-400">Date Registered:</span>
              <span className="font-mono font-medium text-slate-600">[Timestamped upon submission]</span>
            </div>
            <div>
              <span className="block text-slate-400">Initial Status:</span>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                Pending Verification
              </span>
            </div>
          </div>
        </section>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0304CE] hover:bg-[#143F9D] text-white font-extrabold text-base py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-xl cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Realtor Application...
              </>
            ) : (
              <>
                <Award className="w-5 h-5" />
                Submit Realtor Registration Application
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-3 font-semibold uppercase tracking-wider">
            Building Partnerships • Creating Wealth • Developing Communities
          </p>
        </div>
      </form>
    </div>
  );
}
