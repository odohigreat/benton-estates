import AgentCard, { type Agent } from '@/components/listings/AgentCard';
import Reveal from '@/components/motion/Reveal';
import EmptyState from '@/components/ui/EmptyState';
import PageHero from '@/components/ui/PageHero';
import { dbRepo } from '@/lib/db';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { connection } from 'next/server';

export const metadata = {
  title: 'Our Agents | Benton Estates',
  description: 'Meet the Benton Estates team handling inspections, documentation and allocation for every listing.'
};

export default async function AgentsPage() {
  await connection();
  const agents = dbRepo.listAgents() as unknown as Agent[];
  return (
    <div className="space-y-16 pb-24">
      <PageHero eyebrow="Know who you are dealing with" title="Meet Our Agents" description={<>Every listing has a named contact who handles inspections, questions and documentation from first visit to allocation.</>}>
        <Link href="/become-a-realtor" className="text-link">Become a Benton realtor <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </PageHero>
      <section className="benton-container">
        {agents.length > 0
          ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map(agent => <Reveal key={agent.id}><AgentCard agent={agent} /></Reveal>)}
            </div>
          : <EmptyState title="Agent profiles coming soon" description="Contact our head office for help with any listing." />}
      </section>
    </div>
  );
}
