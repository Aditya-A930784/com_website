'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb } from '@/components/shared/breadcrumb';

/**
 * PublicBreadcrumbBar — client wrapper that reads current pathname
 * and passes it down to the shared `<Breadcrumb />` component.
 *
 * This separates server-side static layout from client-side pathname-reading
 * in the Next.js App Router.
 */
export function PublicBreadcrumbBar() {
  const pathname = usePathname();
  
  // Render nothing on home route
  if (pathname === '/' || pathname === '/en' || pathname === '/mr') {
    return null;
  }

  // Remove locale prefix before routing lookup
  const cleanPath = pathname.replace(/^\/(en|mr|hi)/, '') || '/';

  return (
    <div className="bg-gray-50 border-b border-gray-100 py-3.5">
      <div className="container-custom">
        <Breadcrumb pathname={cleanPath} />
      </div>
    </div>
  );
}
