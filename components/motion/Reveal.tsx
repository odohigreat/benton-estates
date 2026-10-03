'use client';
import { m, useAnimate, useReducedMotion } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';

// Content stays visible in server HTML and when JavaScript is unavailable.
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const played = useRef(false);
  useEffect(() => {
    if (reduce || played.current || !scope.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !played.current) {
        played.current = true;
        void animate(scope.current, { opacity: [0.5, 1], transform: ['translateY(16px)', 'translateY(0px)'] }, { duration: 0.5, ease: [0.22, 1, 0.36, 1] });
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(scope.current);
    return () => observer.disconnect();
  }, [animate, reduce, scope]);
  return <m.div ref={scope} className={className}>{children}</m.div>;
}
