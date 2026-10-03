import EnquiryForm from '@/components/forms/EnquiryForm';
import PageHero from '@/components/ui/PageHero';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  GraduationCap,
  Home,
  Laptop,
  Map,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Our Services | Benton Estates & Benton Homes & Development Limited',
  description: 'Explore our comprehensive real estate services: Property Development, Consulting, Surveyed Land Sales, Training & Mentoring, and Technology solutions.'
};

export default function ServicesPage() {
  const services = [
    {
      id: 'development',
      title: 'Property Development',
      icon: Building2,
      color: 'text-[#0304CE]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Comprehensive property development from raw land acquisition, boundary layout design, perimeter fencing, civil earthworks, to residential and commercial building construction.',
      points: [
        'Master-planned estate layouts and drainage engineering',
        'Contemporary architectural design and construction management',
        'Quality control and adherence to structural building standards',
        'Turnkey residential and commercial delivery'
      ]
    },
    {
      id: 'consulting',
      title: 'Real Estate Consulting & Advisory',
      icon: Compass,
      color: 'text-[#E40C05]',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      description: 'Professional guidance for prospective property owners, diaspora investors, and commercial enterprises navigating property acquisition in Delta State and Nigeria.',
      points: [
        'Thorough title document verification and registry checks',
        'Site inspection coordination and topographic analysis',
        'Capital growth projection and location feasibility studies',
        'Strategic portfolio structuring for real estate investors'
      ]
    },
    {
      id: 'land-sales',
      title: 'Surveyed Land Sales & Allocation',
      icon: Map,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Providing genuine, litigation-free surveyed land parcels in prime, fast-appreciating corridors such as Elevation Estate, Ekrerahwe in Ughelli North.',
      points: [
        '100% dry table land free from adverse claims',
        'Standard 464 SQM demarcated plot sizes',
        'Instant issuance of Deed of Assignment and Registered Survey',
        'Guaranteed physical plot allocation upon full payment'
      ]
    },
    {
      id: 'residential',
      title: 'Residential Property Sales & Schemes',
      icon: Home,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      description: 'Delivering comfortable, modern homes and off-plan schemes designed for lasting durability, energy efficiency, and high family living comfort.',
      points: [
        'Contemporary duplex layouts and family residences',
        'Structured milestone-based construction payment options',
        'Secured gated community living with access control',
        'Paved roads, electrification, and modern utility networks'
      ]
    },
    {
      id: 'investment',
      title: 'Real Estate Investment-Related Services',
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'Guiding clients to capitalize on strategic land banking and high-yield real estate corridors with capital appreciation.',
      points: [
        'High-growth corridor identification in emerging urban fringes',
        'Flexible 3 to 12-month installment subscription models',
        'Official resale and developer transfer documentation support',
        'Transparent cost structure with no hidden charges'
      ]
    },
    {
      id: 'training',
      title: 'Training & Mentoring',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Empowering realtors, real estate marketers, and consultants through rigorous professional training in sales, digital marketing, and ethical transactions.',
      points: [
        'Comprehensive real estate onboarding for new practitioners',
        'Digital lead generation and modern social media marketing',
        'Professional sales ethics and client relationship management',
        'Lucrative commission structures and prompt payout cycles'
      ]
    },
    {
      id: 'technology',
      title: 'Real Estate Technology',
      icon: Laptop,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Harnessing modern digital tools to simplify real estate transactions, online estate subscriptions, transparent documentation, and client communication.',
      points: [
        'Digital subscription and electronic application workflows',
        'Transparent online records and instant application references',
        'Direct WhatsApp support integration with rapid response',
        'Digital documentation tracking and client status updates'
      ]
    }
  ];

  return (
    <div className="space-y-20 pb-20">

      {/* Banner */}
      <PageHero eyebrow="Corporate Capabilities" title="Our Professional Services" description={<>From land development and verified property sales to consulting, professional training, and digital property technology, Benton Estates is your trusted partner.</>} />

      {/* Services Grid */}
      <section className="benton-container">
        <div className="services-editorial space-y-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`bg-white rounded-lg border border-slate-200 p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-md ${service.bgColor} ${service.color} flex items-center justify-center shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Service Pillar {index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
                    {service.title}
                  </h3>

                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {service.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                        <CheckCircle2 className={`w-4 h-4 ${service.color} shrink-0 mt-0.5`} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href={`/contact?property=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0304CE] hover:text-[#143F9D]"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {service.id === 'training' && (
                      <Link
                        href="/become-a-realtor"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E40C05] hover:underline"
                      >
                        <span>Realtor Registration</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-50 rounded-lg p-6 border border-slate-200 flex flex-col justify-center text-center">
                  <div className="p-4 bg-white rounded-md shadow-xs border border-slate-100 mb-4">
                    <ShieldCheck className="w-8 h-8 text-[#0304CE] mx-auto mb-2" />
                    <span className="font-bold text-slate-900 text-sm block">Client Guarantee</span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Full transparency, legal compliance, and customer-first execution at every stage.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0304CE] hover:bg-[#143F9D] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-md transition-all"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="benton-container">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Have a Specific Development or Consulting Request?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Send our advisory team your specific requirements and we will provide a detailed proposal.
            </p>
          </div>
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-md">
            <EnquiryForm defaultProperty="Custom Service Advisory" />
          </div>
        </div>
      </section>

    </div>
  );
}
