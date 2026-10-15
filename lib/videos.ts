export interface Video {
  id: string;
  title: string;
  url: string;
  category: string;
  publishedAt: string;
}

export type VideoRow = { id: string; title: string; url: string; category: string | null; published_at: string | null };

// TODO: replace with the Benton Homes YouTube channel URL once it exists; bentonhomes.online links no channel yet.
export const YOUTUBE_CHANNEL_URL = 'https://www.bentonhomes.online/';

export const VIDEO_CATEGORIES = ['Mission', 'Campaign', 'Outreach', 'Event'] as const;

export function getYouTubeId(url: string) {
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : null;
}

export function getYouTubeThumbnail(url: string) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export const today = () => new Date().toISOString().slice(0, 10);

export function toVideo(row: VideoRow): Video {
  return { id: row.id, title: row.title, url: row.url, category: row.category || 'General', publishedAt: row.published_at || today() };
}

// Shown when the database is unreachable and nothing is cached. Kept empty so visitors see
// "Videos coming soon" rather than broken placeholders.
// TODO: add three real videos from the Benton Homes YouTube channel, e.g.
// { id: 'fallback-1', title: 'Elevation Estate site tour', url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', category: 'Event', publishedAt: '2026-10-01' },
// { id: 'fallback-2', title: 'TODO video title', url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', category: 'Campaign', publishedAt: '2026-09-01' },
// { id: 'fallback-3', title: 'TODO video title', url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', category: 'Mission', publishedAt: '2026-08-01' },
export const fallbackVideos: Video[] = [];
