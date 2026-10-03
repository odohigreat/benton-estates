import PageHero from '@/components/ui/PageHero';
import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Benton Estates',
  robots: { index: false }
};

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="We couldn’t find that page." description="The link may be out of date, or the listing may have been taken down.">
      <div className="flex flex-wrap gap-3 mt-6">
        <Link href="/" className="button-primary">Back to home</Link>
        <Link href="/properties" className="button-secondary">Browse properties</Link>
      </div>
    </PageHero>
  );
}
