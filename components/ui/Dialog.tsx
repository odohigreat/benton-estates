'use client';
// Ported from shadcn/ui's Dialog (Radix), using this project's class strings instead of cn().
// Without tailwind-merge, conflicting classes can't be overridden, so callers set the width and background.
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ComponentProps } from 'react';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className = '', children, hideClose = false, ...props }: ComponentProps<typeof DialogPrimitive.Content> & { hideClose?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-[90] bg-black/70" />
      <DialogPrimitive.Content className={`dialog-content fixed left-1/2 top-1/2 z-[91] max-h-[calc(100dvh-32px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg shadow-xl focus:outline-none ${className}`} {...props}>
        {children}
        {!hideClose && (
          <DialogPrimitive.Close className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Close">
            <X size={18} aria-hidden="true" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({ className = '', ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={`text-xl text-slate-900 ${className}`} {...props} />;
}

export function DialogDescription({ className = '', ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={`text-sm text-slate-600 ${className}`} {...props} />;
}
