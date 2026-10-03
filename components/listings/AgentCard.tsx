import { Mail, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';

export interface Agent {
  id: string; name: string; position: string; email: string | null; phone: string | null;
  photo: string | null; bio: string | null; listing_count?: number;
}

export function AgentAvatar({ name, photo, size = 64 }: { name: string; photo: string | null; size?: number }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase();
  return <span className="agent-avatar" style={{ width: size, height: size, fontSize: size * 0.34 }}>
    {photo ? <Image src={photo} alt={`Photo of ${name}`} fill sizes={`${size}px`} className="object-cover" /> : <span aria-hidden="true">{initials}</span>}
  </span>;
}

export default function AgentCard({ agent, heading, enquiry }: { agent: Agent; heading?: string; enquiry?: string }) {
  const whatsapp = agent.phone?.replace(/\D/g, '');
  const message = encodeURIComponent(enquiry ? `Hello ${agent.name}, I would like to enquire about ${enquiry}.` : `Hello ${agent.name}, I found you on the Benton Estates website.`);
  return (
    <article className="agent-card">
      {heading && <span className="eyebrow">{heading}</span>}
      <div className="agent-card-identity">
        <AgentAvatar name={agent.name} photo={agent.photo} />
        <div><h3>{agent.name}</h3><p>{agent.position}</p></div>
      </div>
      {agent.bio && <p className="agent-card-bio">{agent.bio}</p>}
      <ul className="agent-card-contact">
        {agent.email && <li><a href={`mailto:${agent.email}`}><Mail size={15} aria-hidden="true" />{agent.email}</a></li>}
        {agent.phone && <li><a href={`tel:${agent.phone}`}><Phone size={15} aria-hidden="true" />{agent.phone}</a></li>}
        {whatsapp && <li><a href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} aria-hidden="true" />WhatsApp {agent.name.split(' ')[0]}</a></li>}
      </ul>
      {agent.listing_count !== undefined && <p className="agent-card-count">{agent.listing_count} active listing{agent.listing_count === 1 ? '' : 's'}</p>}
    </article>
  );
}
