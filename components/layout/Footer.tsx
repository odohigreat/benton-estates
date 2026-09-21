import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, MapPin, Mail, ArrowRight, ShieldCheck, ExternalLink, Lock } from 'lucide-react';
import BentonLogo from '../ui/BentonLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A142F] text-slate-300 pt-16 pb-8 border-t-4 border-[#0304CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Profile */}
          <div className="space-y-4">
            <BentonLogo variant="white" size="lg" showSubtitle />
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Benton Estates is a premier property development and consulting firm delivering transparent, litigation-free real estate opportunities across Delta State and beyond.
            </p>

            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider text-[#E40C05] font-bold mb-1">
                Brand Core Tagline
              </div>
              <p className="text-xs text-white font-medium tracking-wide">
                BUILDING PARTNERSHIPS • CREATING WEALTH • DEVELOPING COMMUNITIES
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 font-semibold border border-blue-800">
                HOME Values
              </span>
              <span>Honesty • Ownership • Service • Execution</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  About Us &amp; Mission
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  Featured Properties
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  Our Core Services
                </Link>
              </li>
              <li>
                <Link href="/become-a-realtor" className="hover:text-[#E40C05] transition-colors flex items-center gap-1.5 font-semibold text-white">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E40C05]" />
                  Become a Realtor
                </Link>
              </li>
              <li>
                <Link href="/properties/elevation-estate/subscribe" className="hover:text-[#E40C05] transition-colors flex items-center gap-1.5 font-semibold text-white">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E40C05]" />
                  Elevation Estate Subscription
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  Contact &amp; Inspection
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Portfolio */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-slate-800 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E40C05] mt-1.5 shrink-0" />
                <span>Property Development &amp; Construction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E40C05] mt-1.5 shrink-0" />
                <span>Real Estate Consulting &amp; Advisory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E40C05] mt-1.5 shrink-0" />
                <span>Surveyed Land Sales &amp; Allocation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E40C05] mt-1.5 shrink-0" />
                <span>Residential Property Schemes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E40C05] mt-1.5 shrink-0" />
                <span>Training, Mentoring &amp; Realtor Networks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E40C05] mt-1.5 shrink-0" />
                <span>Real Estate Technology Solutions</span>
              </li>
            </ul>

            <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-900/60 text-xs">
              <span className="text-white font-semibold flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#E40C05]" />
                Official Developer Account Notice
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Payments must be made directly to <strong className="text-slate-200">Benton Home and Development Limited</strong> designated accounts. We accept no cash payments to individual agents.
              </p>
            </div>
          </div>

          {/* Col 4: Corporate Office & Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-slate-800 pb-2">
              Corporate Office
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E40C05] shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed text-xs">
                  Summer Plazza, 102 Effurun Sapele Road, Airport Junction, Opposite Our Lady&apos;s High School, Effurun, Delta State.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0304CE] shrink-0" />
                <a href="tel:+2348038357773" className="hover:text-white text-xs">
                  +234 803 835 7773
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/2348038357773?text=Hello%20Benton%20Estates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-xs text-[#25D366] font-medium"
                >
                  WhatsApp Consultation
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href="mailto:enquiries@bentonhomes.com" className="hover:text-white text-xs">
                  enquiries@bentonhomes.com
                </a>
              </div>

              <div className="pt-2">
                <span className="text-xs text-slate-400 block mb-1">Official Client Portal:</span>
                <a
                  href="https://bentonhomes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300"
                >
                  https://bentonhomes.com
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} Benton Estates • Benton Homes &amp; Development Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-400 hover:text-[#E40C05] transition-colors"
            >
              <Lock className="w-3 h-3" />
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
