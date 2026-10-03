import { ArrowRight, CalendarCheck, Landmark, MapPin, MessageCircle, ShieldCheck, Wallet } from 'lucide-react';

const reasons = [
  {
    icon: MapPin,
    title: 'Location',
    body: 'We are close to Beta Glass Company, Transcorp Power and TMG Ministry, with easy access to the East–West Road. Where big companies go, development and price follow — land close to a major access road, especially where big companies are situated, is very valuable land.',
  },
  {
    icon: Wallet,
    title: 'Affordable pre-launch price',
    body: 'Our pre-launch price is still ₦1,195,000 instead of ₦1,500,000. That’s ₦305,000 savings for early investors.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure title',
    body: 'Every plot is 464 SQM with Registered Survey and Deed of Assignment, so your investment is safe and verifiable.',
  },
];

export default function ElevationInvestmentCase() {
  return (
    <section className="space-y-8" aria-labelledby="tee-heading">
      <div className="space-y-3">
        <span className="eyebrow">What you need to know</span>
        <h2 id="tee-heading" className="text-2xl sm:text-3xl font-semibold text-slate-900 font-serif">The Elevation Estate (TEE)</h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          The Elevation Estate, or TEE, is located in Ekrerahwe, behind Beta Glass Company. This is one of the fastest growing corridors in Delta State right now.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Why invest here now? Three reasons.</h3>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reasons.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="p-5 rounded-lg bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-[#0304CE]" aria-hidden="true" />
                <span className="text-[11px] font-bold text-slate-400">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h4 className="font-semibold text-slate-900">{title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row gap-5">
        <Landmark className="w-6 h-6 text-[#0304CE] shrink-0" aria-hidden="true" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">Not ready to build yet?</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Absolutely fine. TEE is perfect for land banking. Buy now, hold for 36 months or even more, and sell when the area develops further. We’ve seen similar corridors in Warri, Okpe and Ughelli double or triple in value.
          </p>
          <p className="text-sm font-semibold text-slate-900">With just ₦500,000 deposit, you can secure your plot and spread the balance.</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-lg bg-[#0A142F] text-white space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-300">
          <CalendarCheck className="w-4 h-4" aria-hidden="true" />
          Limited plots available at this price
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold font-serif">Book a FREE site inspection</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Come see the land and verify the documents. Our corporate office is at 102 Effurun–Sapele Road, Summer Plaza, Airport Junction, Effurun. Don’t wait until the price increases — lock your plot at TEE today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a href="#property-enquiry" className="button-primary">Book free inspection <ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
          <a
            href={`https://wa.me/2348038535773?text=${encodeURIComponent('Hello Benton Homes, I would like to book a free site inspection at The Elevation Estate (TEE).')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Book on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
