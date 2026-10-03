import ElevationSubscriptionForm from '@/components/forms/ElevationSubscriptionForm';
import PageHero from '@/components/ui/PageHero';

export const metadata = {
  title: 'Elevation Estate Customer Subscription Form | Benton Estates',
  description: 'Official customer subscription and land allocation application for Elevation Estate, Ekrerahwe, Ughelli North Local Government Area of Delta State.'
};

export default function ElevationSubscribePage() {
  return (
    <div className="space-y-12 pb-24">
      {/* Banner */}
      <PageHero eyebrow="Official Land Allocation Portal" title="Elevation Estate Subscription Application" description={<>Please complete all required fields accurately. Once your application is submitted, our allocation desk will generate your official acknowledgment letter and starter pack.</>} />

      {/* Main Form Component */}
      <section className="benton-container benton-container-narrow">
        <ElevationSubscriptionForm />
      </section>
    </div>
  );
}
