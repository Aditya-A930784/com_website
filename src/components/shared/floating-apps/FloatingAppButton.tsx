'use client';

import { motion } from 'framer-motion';

import type { ExternalAppLink } from './AppData';

type FloatingAppButtonProps = {
  app: ExternalAppLink;
  isOpen: boolean;
  offsetX: number;
  offsetY: number;
};

export default function FloatingAppButton({
  app,
  isOpen,
  offsetX,
  offsetY,
}: FloatingAppButtonProps) {
  const Icon = app.icon;

  return (
    <motion.div
      className="absolute right-0 top-0"
      initial={false}
      animate={{
        x: isOpen ? offsetX : 0,
        y: isOpen ? offsetY : 0,
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.6,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      role="none"
    >
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isOpen ? 0 : -1}
        aria-label={app.label}
        role="menuitem"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-orange-100 bg-white text-slate-700 shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-slate-100 dark:text-slate-900">
          {app.label}
        </span>
      </a>
    </motion.div>
  );
}
