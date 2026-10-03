'use client';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}><MotionConfig reducedMotion="user" transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>{children}</MotionConfig></LazyMotion>;
}
