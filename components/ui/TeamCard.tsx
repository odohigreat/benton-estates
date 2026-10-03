import type { TeamMember } from '@/lib/team';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const linkedinPath = 'M6.9 8.6H3.6V20h3.3V8.6zM5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.4c0-3.1-1.7-4.9-4.3-4.9-1.6 0-2.6.8-3.1 1.6V8.6H9.8V20h3.3v-5.9c0-1.5.6-2.6 2-2.6 1.3 0 1.9 1 1.9 2.6V20h3.4v-6.6z';

export default function TeamCard({ member, eager = false }: { member: TeamMember; eager?: boolean }) {
  const initials = member.name.split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase();
  return (
    <article className="team-card">
      <div className="team-card-photo">
        {member.photo
          ? <Image src={member.photo} alt={`Portrait of ${member.name}`} fill loading={eager ? 'eager' : 'lazy'} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover object-top" />
          : <span aria-hidden="true">{initials}</span>}
      </div>
      <div className="team-card-body">
        <h3>{member.name}</h3>
        <p className="team-card-role">{member.role}</p>
        {member.bio && <p className="team-card-bio">{member.bio}</p>}
        {(member.email || member.phone || member.linkedin) && (
          <ul className="team-card-contact">
            {member.email && <li><a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}><Mail size={16} aria-hidden="true" /></a></li>}
            {member.phone && <li><a href={`tel:${member.phone}`} aria-label={`Call ${member.name}`}><Phone size={16} aria-hidden="true" /></a></li>}
            {member.linkedin && <li><a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d={linkedinPath} /></svg></a></li>}
          </ul>
        )}
      </div>
    </article>
  );
}
