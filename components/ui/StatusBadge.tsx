export default function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const tone = ['approved', 'verified', 'resolved', 'allocated', 'available'].includes(normalized) ? 'positive' : normalized === 'declined' ? 'negative' : 'neutral';
  return <span className={`status-badge status-${tone}`}><span aria-hidden="true" />{status.replaceAll('_', ' ')}</span>;
}
