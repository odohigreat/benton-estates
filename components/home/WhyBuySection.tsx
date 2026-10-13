import Reveal from '@/components/motion/Reveal';
import { ArrowRight, Check, FileCheck2, MapPinned, ReceiptText, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Verified Properties & Secure Documentation',
    body: 'At Benton Homes and Development Ltd., we prioritise your peace of mind. Every property is subjected to appropriate verification and due diligence to help ensure that you are investing in property with genuine ownership and proper documentation.',
  },
  {
    icon: ReceiptText,
    title: 'Transparent Pricing. No Hidden Stories.',
    body: 'What we tell you is what you pay. We believe in clear pricing, transparent transactions, and proper documentation at every stage. Your payments are duly acknowledged and receipted through the company.',
  },
  {
    icon: FileCheck2,
    title: 'Proper Documentation & Prompt Allocation',
    body: 'We provide the necessary documentation applicable to each property and ensure that the allocation process is clear, timely, and verifiable. From your initial payment to physical allocation, we keep you informed every step of the way.',
  },
  {
    icon: MapPinned,
    title: 'Strategic Locations With Investment Potential',
    body: 'We carefully select locations with strong development prospects and potential for appreciation. Whether you are buying to build, hold, or invest, our goal is to help you make property decisions with long-term value in mind.',
  },
];

const quickReasons = [
  { title: 'Verified Properties', body: 'We prioritise proper due diligence before offering properties to our clients.' },
  { title: 'Transparent Transactions', body: 'Clear pricing, proper documentation, and no unnecessary surprises.' },
  { title: 'Proper Documentation', body: 'We provide the relevant documents applicable to your property purchase.' },
  { title: 'Strategic Locations', body: 'Our properties are selected with accessibility, development, and investment potential in mind.' },
];

export default function WhyBuySection() {
  return (
    <section className="why-buy benton-container" aria-labelledby="why-buy-title">
      <div className="why-buy-layout">

        {/* Intro and quick reasons; sticky beside the pillars on large screens */}
        <div className="why-buy-intro">
          <span className="eyebrow">Why Buy From Benton Homes?</span>
          <h2 id="why-buy-title">Buy with confidence, from first payment to allocation.</h2>
          <p>Every purchase is backed by due diligence, transparent pricing, and documentation you can verify.</p>

          <ul className="why-buy-quick" aria-label="Quick reasons to choose Benton">
            {quickReasons.map(reason => (
              <li key={reason.title}>
                <span className="why-buy-check" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                <div>
                  <strong>{reason.title}</strong>
                  <span>{reason.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed pillars */}
        <ol className="why-buy-pillars">
          {pillars.map(({ icon: Icon, title, body }, index) => (
            <li key={title}>
              <Reveal className="why-buy-pillar">
                <div className="why-buy-pillar-head">
                  <span className="why-buy-number">{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* Our promise */}
      <Reveal className="why-buy-promise">
        <div>
          <span className="eyebrow">Our Promise To You</span>
          <p className="why-buy-promise-lead">
            At Benton Homes, we are committed to making property ownership clearer, safer, and more rewarding.
          </p>
        </div>
        <div>
          <p>
            You are not just buying a piece of land; you are making an investment in your future, with transparency, proper documentation, and professional guidance every step of the way.
          </p>
          <div className="why-buy-actions">
            <Link href="/properties" className="button-primary">View Properties <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/contact" className="why-buy-link">Speak with our team <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
