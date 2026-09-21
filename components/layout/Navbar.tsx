'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, MapPin, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import BentonLogo from '../ui/BentonLogo';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Properties', href: '/properties' },
    { name: 'Our Services', href: '/services' },
    { name: 'Become a Realtor', href: '/become-a-realtor' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#0A142F] text-gray-200 text-xs py-2 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#E40C05]" />
              Summer Plazza, Airport Junction, Effurun, Delta State
            </span>
            <span className="text-gray-400 hidden lg:inline">|</span>
            <span className="text-[#E40C05] font-semibold tracking-wider text-[11px] hidden lg:inline uppercase">
              Building Partnerships • Creating Wealth • Developing Communities
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+2348038357773"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#0304CE]" />
              +234 803 835 7773
            </a>
            <a
              href="https://wa.me/2348038357773?text=Hello%20Benton%20Estates,%20I%20would%20like%20to%20enquire%20about%20your%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white px-2.5 py-0.5 rounded-full transition-all font-medium"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100'
            : 'bg-white py-4 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <BentonLogo size="md" showSubtitle />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-[#0304CE]'
                      : 'text-slate-700 hover:text-[#0304CE] hover:bg-blue-50/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E40C05] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/properties/elevation-estate/subscribe"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-red-50 text-[#E40C05] hover:bg-[#E40C05] hover:text-white px-3.5 py-2.5 rounded-lg border border-red-200 hover:border-[#E40C05] transition-all shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              Elevation Estate
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0304CE] hover:bg-[#143F9D] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              Enquire Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="https://wa.me/2348038357773?text=Hello%20Benton%20Estates"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Contact"
              className="p-2 text-[#25D366] bg-emerald-50 rounded-lg sm:hidden"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0304CE] hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 text-[#0304CE] border-l-4 border-[#0304CE]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {isActive && <div className="w-2 h-2 rounded-full bg-[#E40C05]" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2.5">
            <Link
              href="/properties/elevation-estate/subscribe"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-[#E40C05] font-bold text-sm py-2.5 rounded-lg hover:bg-red-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              Subscribe to Elevation Estate
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#0304CE] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#143F9D] transition-colors"
            >
              Enquire Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-2 text-xs text-slate-500 flex flex-col gap-1.5 border-t border-gray-100">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0304CE]" />
              Direct: +234 803 835 7773
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E40C05]" />
              Airport Junction, Effurun, Delta State
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
