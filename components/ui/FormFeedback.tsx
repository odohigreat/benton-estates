'use client';
import { m, useReducedMotion } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';
export default function FormFeedback({ children, kind = 'error', className = '' }: { children: ReactNode; kind?: 'error' | 'success'; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => { ref.current?.focus({ preventScroll: true }); ref.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' }); }, []);
  return <m.div ref={ref} tabIndex={-1} role={kind === 'error' ? 'alert' : 'status'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.2 }} className={`form-feedback ${className}`}>{children}</m.div>;
}
