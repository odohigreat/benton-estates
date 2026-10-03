'use client';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    // GSAP is loaded only by the homepage; the readable hero exists before it loads.
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-hero-line]', { y: 28, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out', clearProps: 'all' });
        gsap.from('[data-hero-support]', { y: 16, opacity: 0, duration: 0.65, delay: 0.22, stagger: 0.1, clearProps: 'all' });
        gsap.fromTo('[data-hero-image]', { scale: 1.055 }, { scale: 1, duration: 1.5, ease: 'power2.out' });
      }, root);
      media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to('[data-hero-parallax]', { y: 35, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 } });
      }, root);
      cleanup = () => media.revert();
    });
    return () => { disposed = true; cleanup?.(); };
  }, []);
  return (
    <section ref={root} className="home-hero">
      <div className="benton-container hero-heading-row"><span className="eyebrow">Benton Homes · Delta State, Nigeria</span><span className="hero-edition">Building partnerships. Creating wealth.</span></div>
      <div className="benton-container hero-editorial">
        <h1><span data-hero-line>Your Trusted Partner</span><span data-hero-line>in <em>Quality Real Estate.</em></span></h1>
        <div className="hero-intro"><p data-hero-support>Discover thoughtfully developed, litigation-free properties and strategic real estate opportunities with Benton Estates. Upholding integrity, transparency, and timely delivery at every step.</p><div className="hero-actions" data-hero-support><Link className="button-primary" href="#properties">Explore Properties <ArrowUpRight size={18} /></Link><Link className="text-link" href="/contact">Speak with an Advisor <ArrowUpRight size={16} /></Link></div></div>
      </div>
      <div className="hero-image-frame"><div className="hero-parallax" data-hero-parallax><Image data-hero-image src="/images/hero-estate.jpg" alt="Aerial view of a gated estate of white-finished homes with a landscaped park beside the residential streets" fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" /></div><div className="hero-image-shade" /><div className="benton-container hero-image-caption"><span><MapPin size={16} />Thoughtfully developed. Built for your future.</span><Link href="#properties" aria-label="Explore properties below"><ArrowDown size={22} /></Link></div></div>
      <div className="hero-trust benton-container"><div><span>01 / ASSURANCE</span><strong>100% Litigation-Free</strong><p>Free from adverse claims</p></div><div><span>02 / DOCUMENTATION</span><strong>Registered Titles</strong><p>Deed &amp; Survey documentation</p></div><div><span>03 / FLEXIBILITY</span><strong>Structured Installments</strong><p>0–12 month flexible plans</p></div></div>
    </section>
  );
}
