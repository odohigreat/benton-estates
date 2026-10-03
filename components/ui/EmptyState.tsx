import { Inbox } from 'lucide-react';
export default function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="empty-state" role="status"><Inbox size={24} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></div>;
}
