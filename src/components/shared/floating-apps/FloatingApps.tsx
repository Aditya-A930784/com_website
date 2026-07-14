'use client';

import React from 'react';
import { Grid2x2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { APP_LINKS } from './AppData';
import FloatingAppButton from './FloatingAppButton';

const FAN_ANGLES = [180, 202, 224, 246, 268];
const FAN_DISTANCE = 88;

export default function FloatingApps() {
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-4 right-4 z-[1200] sm:bottom-6 sm:right-6"
      aria-label="Floating app shortcuts"
    >
      <div className="relative h-14 w-14" role="menu" aria-label="App shortcuts speed dial">
        {APP_LINKS.map((app, index) => {
          const angle = FAN_ANGLES[index] ?? 180;
          const radians = (angle * Math.PI) / 180;
          const offsetX = Math.cos(radians) * FAN_DISTANCE;
          const offsetY = Math.sin(radians) * FAN_DISTANCE;

          return (
            <FloatingAppButton
              key={app.id}
              app={app}
              isOpen={isOpen}
              offsetX={offsetX}
              offsetY={offsetY}
            />
          );
        })}

        <motion.button
          type="button"
          aria-label={isOpen ? 'Close app shortcuts' : 'Open app shortcuts'}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-xl transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:bg-orange-500"
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Grid2x2 className="h-6 w-6" aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
}
