import HeroSection from '@/components/home/hero-section';
import SmartSearchSection from '@/components/home/smart-search-section';
import AboutSection from '@/components/home/about-section';
import OnlineServicesSection from '@/components/home/online-services-section';
import OfficialsSection from '@/components/home/officials-section';
import NewsSection from '@/components/home/news-section';
import SocialMediaSection from '@/components/home/social-media-section';
import QuickLinksSection from '@/components/home/quick-links-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'छत्रपती संभाजीनगर महानगरपालिका (CSMC) — नागरी सेवा पोर्टल',
  description:
    'मालमत्ता कर, पाणीपट्टी, तक्रार नोंदणी, प्रमाणपत्रे आणि अधिक — घरबसल्या नागरी सेवा मिळवा.',
  openGraph: {
    title: 'छत्रपती संभाजीनगर महानगरपालिका',
    description: 'नागरी सेवा पोर्टल — Citizen Services Portal',
    type: 'website',
    locale: 'mr_IN',
  },
};

/**
 * Public homepage — src/app/(public)/page.tsx
 *
 * Renders within the (public)/layout.tsx wrapper, which already contains
 * the Header, Footer, Skip-to-content target, and Breadcrumbs.
 */
export default function PublicHomePage() {
  return (
    <>
      <HeroSection />
      <SmartSearchSection />
      <AboutSection />
      <OnlineServicesSection />
      <OfficialsSection />
      <NewsSection />
      <SocialMediaSection />
      <QuickLinksSection />
    </>
  );
}
