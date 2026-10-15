'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/Carousel';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { useVideos } from '@/lib/useVideos';
import { getYouTubeId, getYouTubeThumbnail, YOUTUBE_CHANNEL_URL, type Video } from '@/lib/videos';
import { format, parseISO } from 'date-fns';
import { ArrowUpRight, Calendar, Play, Video as VideoIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function formatDate(date: string) {
  const parsed = parseISO(date);
  return Number.isNaN(parsed.getTime()) ? date : format(parsed, 'MMM d, yyyy');
}

function VideoCard({ video, onPlay }: { video: Video; onPlay: (video: Video) => void }) {
  const thumbnail = getYouTubeThumbnail(video.url);
  return (
    <article className="group flex h-full flex-col">
      <button type="button" onClick={() => onPlay(video)} className="relative block aspect-16/10 w-full overflow-hidden rounded-lg bg-slate-900" aria-label={`Play video: ${video.title}`}>
        {thumbnail && <Image src={thumbnail} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />}
        <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/50" aria-hidden="true" />
        <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
          <Play size={24} className="ml-1 fill-brand-blue text-brand-blue" />
        </span>
      </button>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
        <span className="rounded-md bg-blue-50 px-2.5 py-1 font-bold uppercase tracking-wider text-brand-blue">{video.category}</span>
        <span className="inline-flex items-center gap-1.5"><Calendar size={14} aria-hidden="true" /><time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time></span>
      </div>
      <h3 className="mt-3 text-lg leading-snug">
        <button type="button" onClick={() => onPlay(video)} className="line-clamp-2 text-left text-slate-900 transition-colors hover:text-brand-blue">{video.title}</button>
      </h3>
    </article>
  );
}

export default function VideoSection() {
  const { data: videos, loading } = useVideos();
  const [api, setApi] = useState<CarouselApi>();
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const activeId = activeVideo ? getYouTubeId(activeVideo.url) : null;

  useEffect(() => {
    if (!api) return;
    const sync = () => { setSnaps(api.scrollSnapList()); setSelected(api.selectedScrollSnap()); };
    api.on('select', sync).on('reInit', sync);
    const frame = requestAnimationFrame(sync);
    return () => { cancelAnimationFrame(frame); api.off('select', sync).off('reInit', sync); };
  }, [api]);

  return (
    <section className="benton-container" aria-labelledby="videos-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3">
          <span className="eyebrow">Our Work in Motion</span>
          <h2 id="videos-title" className="text-3xl sm:text-4xl text-slate-900">Featured Videos</h2>
          <p className="text-slate-600">Site tours, allocations and moments from our developments, in motion.</p>
        </div>
        <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="button-secondary self-start md:self-auto">
          Visit Channel <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading videos">
            {[0, 1, 2].map(i => <div key={i} className={`aspect-16/10 animate-pulse rounded-lg bg-slate-100 ${i === 1 ? 'hidden md:block' : i === 2 ? 'hidden lg:block' : ''}`} />)}
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-slate-300 px-6 py-14 text-center">
            <VideoIcon size={28} className="text-brand-blue" aria-hidden="true" />
            <h3 className="text-xl text-slate-900">Videos coming soon</h3>
            <p className="max-w-sm text-sm text-slate-600">We&apos;re putting together site tours and project updates. Check back shortly.</p>
          </div>
        ) : (
          <Carousel opts={{ align: 'start', loop: false }} setApi={setApi} aria-label="Featured videos">
            <CarouselContent>
              {videos.map(video => (
                <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                  <VideoCard video={video} onPlay={setActiveVideo} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:grid -left-5 top-[calc((100%-6rem)/2)]" />
            <CarouselNext className="hidden md:grid -right-5 top-[calc((100%-6rem)/2)]" />
            {snaps.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {snaps.map((_, index) => (
                  <button key={index} type="button" onClick={() => api?.scrollTo(index)} aria-label={`Go to slide ${index + 1}`} aria-current={index === selected}
                    className={`h-2 rounded-full transition-all duration-300 ${index === selected ? 'w-8 bg-brand-blue' : 'w-2 bg-slate-300 hover:bg-slate-400'}`} />
                ))}
              </div>
            )}
          </Carousel>
        )}
      </div>

      <Dialog open={activeVideo !== null} onOpenChange={open => { if (!open) setActiveVideo(null); }}>
        <DialogContent className="w-[90vw] max-w-4xl bg-black p-0" hideClose>
          <DialogTitle className="sr-only">{activeVideo?.title ?? 'Video player'}</DialogTitle>
          <DialogDescription className="sr-only">YouTube video player. Press Escape to close.</DialogDescription>
          <div className="flex justify-end p-1.5">
            <DialogClose className="grid h-9 w-9 place-items-center rounded-md text-white/70 hover:bg-white/10 hover:text-white" aria-label="Close video">
              <X size={18} aria-hidden="true" />
            </DialogClose>
          </div>
          <div className="relative aspect-video w-full">
            <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-4 border-white/20 border-t-white" aria-hidden="true" />
            {activeId && (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1`}
                title={activeVideo?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
