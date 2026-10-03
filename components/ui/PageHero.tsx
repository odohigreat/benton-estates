import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Container from './Container';

export default function PageHero({ eyebrow, title, description, children }: {
  eyebrow: string; title: string; description: ReactNode; children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <Container>
        <div className="page-hero-top"><span className="eyebrow">{eyebrow}</span><Link href="/contact" className="text-link">Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        <div className="page-hero-grid">
          <h1>{title}</h1>
          <div className="page-hero-description"><p>{description}</p>{children}</div>
        </div>
        <div className="page-hero-rule" aria-hidden="true"><span /></div>
      </Container>
    </section>
  );
}
