import PageShell from '@/components/pages/page-shell';
import SmartSearchSection from '@/components/home/smart-search-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'स्मार्ट सहाय्यक — CSMC',
  description: 'सेवा, तक्रार, कर आणि प्रक्रियेबद्दल त्वरित मार्गदर्शन.',
};

export default function AssistantPage() {
  return (
    <PageShell
      eyebrow="Smart Assistant"
      title="नगर सहाय्यक"
      description="सेवेचं नाव माहीत नसेल तरी चालेल — तुमच्या शब्दांत लिहा, आम्ही थेट योग्य ठिकाणी नेतो."
    >
      {/* SmartSearchSection is self-contained — it includes voice, chips, guidance launch */}
      <SmartSearchSection />
    </PageShell>
  );
}
