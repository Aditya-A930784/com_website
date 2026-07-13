import { ServiceCard, type ServiceCardProps } from './service-card';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface ServiceCardGridProps {
  /** List of service cards to display. First 6 shown as primary. */
  services: ServiceCardProps[];
  /** Href for "All Services" link. Shown when services.length > 6 or always. */
  viewAllHref?: string;
  className?: string;
}

/**
 * ServiceCardGrid — responsive grid of ServiceCard components.
 *
 * Modern grid layout with improved spacing and visual hierarchy
 */
export function ServiceCardGrid({ services, viewAllHref, className }: ServiceCardGridProps) {
  const primary = services.slice(0, 6);

  return (
    <div className={cn('space-y-8', className)}>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-5"
        role="list"
        aria-label="नागरी सेवा"
      >
        {primary.map((service, index) => (
          <li 
            key={service.titleMr} 
            role="listitem"
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ServiceCard {...service} className="h-full" />
          </li>
        ))}
      </ul>

      {viewAllHref && (
        <div className="text-center pt-4">
          <Link
            href={viewAllHref}
            className="group inline-flex min-h-[52px] items-center gap-3 rounded-lg bg-orange-600 px-7 py-3 text-base font-bold text-white shadow-sm transition-all duration-300 hover:bg-orange-700 hover:shadow-md active:scale-[0.98]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>सर्व सेवा पाहा</span>
            <span className="text-sm text-white/80">View All Services</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
