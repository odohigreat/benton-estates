'use client';
import { ArrowUpRight, MapPin, Menu, Phone, X } from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import BentonLogo from '../ui/BentonLogo';

const links = [
  ['Home', '/'], ['Properties', '/properties'], ['Locations', '/locations'], ['Services', '/services'],
  ['Agents', '/agents'], ['About Us', '/about'], ['Contact Us', '/contact'],
];
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const active = (href: string) => href === '/' ? pathname === href : pathname.startsWith(href);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    const frame = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
      if (event.key === 'Tab') {
        const nodes = [trigger.current, ...Array.from(menu.current?.querySelectorAll<HTMLElement>('a, button') || [])].filter((node): node is HTMLElement => node !== null);
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const desktop = window.matchMedia('(min-width: 1280px)');
    const resize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', resize);
    document.addEventListener('keydown', keyboard);
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown', keyboard); desktop.removeEventListener('change', resize); };
  }, [open]);
  const close = () => { setOpen(false); trigger.current?.focus(); };
  return <header className="site-header">
    <div className="utility-bar"><div className="benton-container"><span><MapPin size={12} />Summer Plazza, Airport Junction, Effurun, Delta State</span><a href="tel:+2348038535773"><Phone size={12} />+234 803 853 5773</a></div></div>
    <m.div className="navigation-bar" animate={{ backgroundColor: scrolled ? '#fdfdff' : '#ffffff', borderBottomColor: scrolled ? '#dce2ed' : '#edf0f5' }}>
      <div className="benton-container navigation-inner"><BentonLogo size="md" showSubtitle />
        <nav className="desktop-navigation" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined}>{label}</Link>)}</nav>
        <m.div className="navigation-cta" whileTap={{ scale: reduced ? 1 : 0.98 }}><Link href="/become-a-realtor" className="button-secondary" aria-current={active('/become-a-realtor') ? 'page' : undefined}>Become a Realtor</Link><Link href="/properties/elevation-estate/subscribe" className="button-primary">Elevation Estate <ArrowUpRight size={16} /></Link></m.div>
        <button ref={trigger} className="menu-trigger" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </m.div>
    <AnimatePresence>{open && <m.div id="mobile-navigation" ref={menu} className="mobile-navigation" initial={{ opacity: 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : 0.2 }}><nav aria-label="Mobile navigation">{links.map(([label, href], index) => <m.div key={href} initial={{ opacity: 0, x: reduced ? 0 : -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : index * 0.025 }}><Link href={href} onClick={close} aria-current={active(href) ? 'page' : undefined}><span>{label}</span><ArrowUpRight size={18} /></Link></m.div>)}</nav><Link href="/properties/elevation-estate/subscribe" onClick={close} className="button-primary">Subscribe to Elevation Estate <ArrowUpRight size={18} /></Link><Link href="/become-a-realtor" onClick={close} className="button-secondary">Become a Realtor</Link><a href="https://wa.me/2348038535773" target="_blank" rel="noopener noreferrer" className="button-secondary">WhatsApp Consultation</a><p>Building Partnerships • Creating Wealth • Developing Communities</p></m.div>}</AnimatePresence>
  </header>;
}
