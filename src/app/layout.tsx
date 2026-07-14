import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import FloatingApps from '@/components/shared/floating-apps/FloatingApps';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['400', '500', '600', '700'],
  subsets: ['devanagari'],
  display: 'swap',
  variable: '--font-noto-sans-devanagari',
});

export const metadata: Metadata = {
  title: 'छत्रपती संभाजीनगर महानगरपालिका (CSMC)',
  description: 'छत्रपती संभाजीनगर महानगरपालिका - आपल्या शहराच्या विकासासाठी',
  keywords: ['CSMC', 'Chhatrapati Sambhajinagar', 'Municipal Corporation', 'Maharashtra'],
  authors: [{ name: 'CSMC' }],
  openGraph: {
    title: 'छत्रपती संभाजीनगर महानगरपालिका',
    description: 'छत्रपती संभाजीनगर महानगरपालिका - आपल्या शहराच्या विकासासाठी',
    type: 'website',
    locale: 'mr_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var size = localStorage.getItem('csmc-font-size');
                if (size === 'small') {
                  document.documentElement.style.fontSize = '90%';
                } else if (size === 'large') {
                  document.documentElement.style.fontSize = '110%';
                } else {
                  document.documentElement.style.fontSize = '100%';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-marathi antialiased">
        <LanguageProvider>
          {children}
          <FloatingApps />
        </LanguageProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
