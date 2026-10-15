'use client';
// Ported from shadcn/ui's Carousel (Embla), using this project's class strings instead of cn().
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useState, type ComponentProps, type KeyboardEvent } from 'react';

export type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];

type CarouselContextValue = {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error('useCarousel must be used within a <Carousel />');
  return context;
}

export function Carousel({ opts, setApi, className = '', children, ...props }: ComponentProps<'div'> & { opts?: CarouselOptions; setApi?: (api: CarouselApi) => void }) {
  const [carouselRef, api] = useEmblaCarousel(opts);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((current: CarouselApi) => {
    if (!current) return;
    setCanScrollPrev(current.canScrollPrev());
    setCanScrollNext(current.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    setApi?.(api);
    api.on('reInit', onSelect).on('select', onSelect);
    // Embla is ready only after mount, so the initial button state is read on the next frame.
    const frame = requestAnimationFrame(() => onSelect(api));
    return () => { cancelAnimationFrame(frame); api.off('reInit', onSelect).off('select', onSelect); };
  }, [api, onSelect, setApi]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); api?.scrollPrev(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); api?.scrollNext(); }
  };

  return (
    <CarouselContext.Provider value={{ carouselRef, api, canScrollPrev, canScrollNext }}>
      <div onKeyDownCapture={onKeyDown} className={`relative ${className}`} role="region" aria-roledescription="carousel" {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className = '', ...props }: ComponentProps<'div'>) {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div className={`flex -ml-4 ${className}`} {...props} />
    </div>
  );
}

export function CarouselItem({ className = '', ...props }: ComponentProps<'div'>) {
  return <div role="group" aria-roledescription="slide" className={`min-w-0 shrink-0 grow-0 basis-full pl-4 ${className}`} {...props} />;
}

const arrowClass = 'absolute top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-md border border-slate-200 bg-white text-slate-900 shadow-sm transition-colors hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed';

export function CarouselPrevious({ className = '', ...props }: ComponentProps<'button'>) {
  const { api, canScrollPrev } = useCarousel();
  return (
    <button type="button" className={`${arrowClass} ${className}`} disabled={!canScrollPrev} onClick={() => api?.scrollPrev()} {...props}>
      <ChevronLeft size={20} aria-hidden="true" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

export function CarouselNext({ className = '', ...props }: ComponentProps<'button'>) {
  const { api, canScrollNext } = useCarousel();
  return (
    <button type="button" className={`${arrowClass} ${className}`} disabled={!canScrollNext} onClick={() => api?.scrollNext()} {...props}>
      <ChevronRight size={20} aria-hidden="true" />
      <span className="sr-only">Next slide</span>
    </button>
  );
}
