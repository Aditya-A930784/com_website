import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import AboutSection from '@/components/home/about-section';
import FeatureProcessSection from '@/components/home/feature-process-section';
import ResourcesSection from '@/components/home/resources-section';
import AssistantNotificationsSection from '@/components/home/assistant-notifications-section';
import OnlineServicesSection from '@/components/home/online-services-section';
import OfficialsSection from '@/components/home/officials-section';
import NewsSection from '@/components/home/news-section';
import SocialMediaSection from '@/components/home/social-media-section';
import QuickLinksSection from '@/components/home/quick-links-section';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-grow">
        <HeroSection />
        <AboutSection />
        <FeatureProcessSection />
        <OnlineServicesSection />
        <ResourcesSection />
        <AssistantNotificationsSection />
        <OfficialsSection />
        <NewsSection />
        <SocialMediaSection />
        <QuickLinksSection />
      </main>

      <Footer />
    </div>
  );
}
