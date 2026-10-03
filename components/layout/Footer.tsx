import { ArrowRight, ExternalLink, Lock, Mail, MapPin, Megaphone, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import BentonLogo from '../ui/BentonLogo';

// Entries without a URL are hidden.
const socials: { label: string; href: string | null; path: string }[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Benton-Homes-Ltd/100072145611295/',
    path: 'M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8v3h2.5V21h3z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bentonhomesltd/',
    path: 'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 4.6c2.4 0 2.7 0 3.6.1 2.4.1 3.6 1.3 3.7 3.7.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 2.4-1.3 3.6-3.7 3.7-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-2.4-.1-3.6-1.3-3.7-3.7-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c.1-2.4 1.3-3.6 3.7-3.7.9-.1 1.2-.1 3.6-.1zM12 3c-2.4 0-2.7 0-3.7.1C5 3.2 3.2 5 3.1 8.3 3 9.3 3 9.6 3 12s0 2.7.1 3.7c.1 3.3 1.9 5.1 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.3-.1 5.1-1.9 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7C20.8 5 19 3.2 15.7 3.1 14.7 3 14.4 3 12 3z',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@benton.homes',
    path: 'M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="benton-container">
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

            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Follow Benton Homes</div>
              <ul className="flex items-center gap-2">
                {socials.filter(social => social.href).map(({ label, href, path }) => (
                  <li key={label}>
                    <a href={href!} target="_blank" rel="noopener noreferrer" aria-label={`Benton Homes on ${label}`} className="w-10 h-10 grid place-items-center rounded-md border border-slate-700 text-slate-300 hover:text-white hover:border-white transition-colors">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
                    </a>
                  </li>
                ))}
              </ul>
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
                <Link href="/properties" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  Properties for Sale &amp; Rent
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  Browse by Location
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  Our Core Services
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  Meet Our Agents
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0304CE]" />
                  About Us &amp; Mission
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

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
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
                <a href="tel:+2348038535773" className="hover:text-white text-xs">
                  +234 803 853 5773
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/2348038535773?text=Hello%20Benton%20Estates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-xs text-[#25D366] font-medium"
                >
                  WhatsApp Consultation
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Megaphone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://whatsapp.com/channel/0029Vb91UZy2phHGIsBg0z2q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-xs text-[#25D366] font-medium"
                >
                  Follow our WhatsApp Channel
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
