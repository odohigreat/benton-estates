'use client';

import PageHero from '@/components/ui/PageHero';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <PageHero eyebrow="Something went wrong" title="This page didn’t load properly." description="Please try again. If the problem continues, contact us directly and we’ll help.">
      <div className="flex flex-wrap gap-3 mt-6">
        <button type="button" onClick={reset} className="button-primary">Try again</button>
        <Link href="/contact" className="button-secondary">Contact us</Link>
      </div>
    </PageHero>
  );
}
