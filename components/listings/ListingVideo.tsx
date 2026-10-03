// Accepts YouTube/Vimeo page links or a direct video file (e.g. /videos/site-tour.mp4).
function embedUrl(url: string) {
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export default function ListingVideo({ url, title }: { url: string; title: string }) {
  const embed = embedUrl(url);
  return (
    <div className="listing-video">
      {embed
        ? <iframe src={embed} title={`${title} — video tour`} loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
        : <video src={url} controls preload="metadata" playsInline aria-label={`${title} — video tour`} />}
    </div>
  );
}
