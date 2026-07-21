import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { PublicBreadcrumbBar } from '@/components/shared';

export const metadata: Metadata = {
  title: {
    template: '%s | छत्रपती संभाजीनगर महानगरपालिका',
    default: 'छत्रपती संभाजीनगर महानगरपालिका (CSMC)',
  },
  description:
    'छत्रपती संभाजीनगर महानगरपालिकेच्या नागरी सेवा — मालमत्ता कर, पाणीपट्टी, तक्रार, प्रमाणपत्रे आणि अधिक.',
  openGraph: {
    siteName: 'CSMC — छत्रपती संभाजीनगर महानगरपालिका',
    locale: 'mr_IN',
  },
};

/**
 * Public layout — no authentication required.
 * All pages under (public)/ are served without any login check.
 *
 * Renders the shared structural Header and Footer, the accessibility
 * skip-to-content anchor, and the automatic breadcrumb bar on subpages.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      
      {/* Automatic Breadcrumb trace for subpages */}
      <PublicBreadcrumbBar />

      {/* Main content viewport containing the skip link target */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
