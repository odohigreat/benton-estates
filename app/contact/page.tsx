import React, { Suspense } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  ExternalLink 
} from 'lucide-react';
import EnquiryForm from '@/components/forms/EnquiryForm';

export const metadata = {
  title: 'Contact Us | Benton Estates & Benton Homes & Development Limited',
  description: 'Get in touch with Benton Estates. Schedule a site inspection in Elevation Estate Ekrerahwe, consult with our property experts, or visit our Effurun corporate office.'
};

function ContactFormWrapper() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading form...</div>}>
      <EnquiryForm />
    </Suspense>
  );
}

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Banner */}
      <section className="bg-[#0A142F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E40C05] bg-red-950/60 border border-red-800 px-3 py-1 rounded-full inline-block">
              Client Support &amp; Enquiries
            </span>
            <h1 className="text-4xl sm:text-5xl font-black font-serif tracking-tight">
              Contact Benton Estates
            </h1>
            <p className="text-slate-300 text-base leading-relaxed">
              We welcome prospective homeowners, real estate investors, and corporate partners. Reach out to schedule on-site inspections or discuss real estate development advisory.
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Contact Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Channels & Location */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0304CE]">
                Reach Out Directly
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
                Corporate Office &amp; Channels
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our customer relationship officers and property surveyors are ready to assist you throughout your real estate transaction.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0304CE] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Telephone Enquiries</span>
                  <a
                    href="tel:+2348038357773"
                    className="text-base font-bold text-slate-900 hover:text-[#0304CE] transition-colors"
                  >
                    +234 803 835 7773
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Monday to Saturday: 8:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-emerald-800 uppercase font-bold block">Official WhatsApp Desk</span>
                  <a
                    href="https://wa.me/2348038357773?text=Hello%20Benton%20Estates,%20I%20would%20like%20to%20enquire%20about%20your%20properties."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    +234 803 835 7773
                  </a>
                  <p className="text-[11px] text-emerald-600 mt-0.5">Fast response for site inspections &amp; documentation</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#E40C05] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Head Office Address</span>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    Summer Plazza, 102 Effurun Sapele Road, Airport Junction, Opposite Our Lady&apos;s High School, Effurun, Delta State.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold block">Official Email</span>
                  <a
                    href="mailto:enquiries@bentonhomes.com"
                    className="text-xs font-bold text-slate-900 hover:text-[#0304CE]"
                  >
                    enquiries@bentonhomes.com
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">For corporate proposals and title verification</p>
                </div>
              </div>

            </div>

            {/* Inspection Notice Box */}
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
              <span className="font-bold flex items-center gap-1.5 text-slate-900">
                <Calendar className="w-4 h-4 text-[#0304CE]" />
                Scheduled Site Inspections
              </span>
              <p className="text-slate-600 leading-relaxed text-xs">
                Physical site inspections to <strong>Elevation Estate, Ekrerahwe</strong> and other development schemes are held on scheduled inspection days. Please notify our desk 24 hours in advance to coordinate vehicle logistics.
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Consultation Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0304CE] block mb-1">
                Direct Submission
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-serif">Send Us an Enquiry</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your enquiry will be securely processed and logged in our system. A representative will contact you with verified property details.
              </p>
            </div>

            <ContactFormWrapper />
          </div>

        </div>
      </section>

    </div>
  );
}
