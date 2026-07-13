import Link from 'next/link';
import { Lock, ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ServiceCardProps {
  /** Marathi label — primary, larger text */
  titleMr: string;
  /** English label — secondary, smaller text */
  titleEn: string;
  /** lucide-react icon component */
  icon: LucideIcon;
  /** Route href */
  href: string;
  /** Whether this service requires a citizen login */
  requiresLogin?: boolean;
  /** Tailwind bg color class for the icon container */
  bgColor?: string;
  /** Tailwind text color class for the icon */
  iconColor?: string;
  /** Optional description shown in larger/list layouts */
  description?: string;
  className?: string;
}

/**
 * ServiceCard — reusable card for displaying a single citizen service.
 *
 * Modern design with glassmorphism, gradients, and smooth animations
 */
export function ServiceCard({
  titleMr,
  titleEn,
  icon: Icon,
  href,
  requiresLogin = false,
  bgColor = 'bg-orange-50',
  iconColor = 'text-orange-600',
  description,
  className,
}: ServiceCardProps) {
  return (
    // @container wrapper — child elements respond to THIS container's width
    <div className={cn('@container', className)}>
      <Link
        href={href}
        aria-label={`${titleMr} — ${titleEn}${requiresLogin ? ' (लॉगिन आवश्यक)' : ''}`}
        className="group block h-full"
      >
        <div
          className={cn(
            'relative h-full rounded-lg bg-white shadow-sm border border-slate-200',
            'transition-all duration-300',
            'hover:shadow-lg hover:border-orange-200 hover:-translate-y-1',
            'overflow-hidden',
            // Compact layout (narrow columns — mobile 2-col, desktop 6-col)
            'flex flex-col items-center gap-4 p-6',
            // Wide layout at ≥120px container width — add description, horizontal layout
            '@[120px]:flex-row @[120px]:items-center @[120px]:gap-4 @[120px]:p-5',
            // Revert to vertical at ≥220px (card is wide enough to be vertical again)
            '@[220px]:flex-col @[220px]:items-center @[220px]:p-6'
          )}
        >
          {/* Gradient Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 via-transparent to-sky-50/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icon container */}
          <div
            className={cn(
              'relative shrink-0 rounded-lg flex items-center justify-center z-10',
              'w-14 h-14 @[220px]:w-16 @[220px]:h-16',
              bgColor,
              'ring-1 ring-inset ring-black/5',
              'group-hover:scale-105 transition-all duration-300'
            )}
          >
            <Icon
              className={iconColor}
              size={28}
              strokeWidth={2.5}
              aria-hidden
            />
            {requiresLogin && (
              <span
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 shadow-sm"
                aria-label="लॉगिन आवश्यक"
              >
                <Lock size={12} className="text-white" aria-hidden />
              </span>
            )}
          </div>

          {/* Text */}
          <div className="min-w-0 text-center @[120px]:text-left @[220px]:text-center z-10 flex-1">
            <p className="text-base @[220px]:text-lg font-bold leading-tight text-slate-900 group-hover:text-orange-700 transition-colors duration-300">
              {titleMr}
            </p>
            <p className="mt-1 text-xs @[220px]:text-sm text-slate-500 font-medium">{titleEn}</p>
            {description && (
              <p className="mt-2 hidden text-xs text-slate-600 @[220px]:block line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Arrow — only visible at wider container sizes */}
          <div className="hidden @[220px]:flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 group-hover:bg-orange-100 transition-all duration-300 z-10 ml-auto">
            <ArrowRight
              size={18}
              className="text-slate-500 group-hover:text-orange-700 group-hover:translate-x-1 transition-all duration-300"
              aria-hidden
            />
          </div>
          
        </div>
      </Link>
    </div>
  );
}
