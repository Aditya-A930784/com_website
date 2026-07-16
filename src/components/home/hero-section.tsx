'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bell, FileText, CreditCard, Phone } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

// Real Unsplash city/municipal photos — no local files needed
const slides = [
  {
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=85',
    alt: 'Smart City',
  },
  {
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=85',
    alt: 'City Skyline',
  },
  {
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&q=85',
    alt: 'Modern City',
  },
];

const stats = [
  { valueMr: '४३७ चौ.किमी', valueEn: '437 km²',    labelMr: 'क्षेत्रफळ',    labelEn: 'Total Area' },
  { valueMr: '१२ लाख+',    valueEn: '12 Lakh+',    labelMr: 'लोकसंख्या',    labelEn: 'Population' },
  { valueMr: '११५',         valueEn: '115',          labelMr: 'प्रभाग',       labelEn: 'Wards' },
  { valueMr: '५०+',         valueEn: '50+',          labelMr: 'ऑनलाइन सेवा', labelEn: 'Services' },
];

export default function HeroSection() {
  const { t, locale } = useTranslation();

  const quickActions = [
    {
      icon: CreditCard,
      labelMr: 'कर भरा',
      labelEn: 'Pay Tax',
      href: '/citizen/property-tax',
      color: 'bg-orange-500',
    },
    {
      icon: FileText,
      labelMr: 'तक्रार',
      labelEn: 'Complaint',
      href: '/citizen/complaints/new',
      color: 'bg-red-500',
    },
    {
      icon: Bell,
      labelMr: 'प्रमाणपत्र',
      labelEn: 'Certificate',
      href: '/citizen/certificates',
      color: 'bg-blue-500',
    },
    {
      icon: Phone,
      labelMr: 'संपर्क',
      labelEn: 'Contact',
      href: '/contact',
      color: 'bg-green-500',
    },
  ];

  return (
    <section className="relative h-[92vh] min-h-[580px] max-h-[800px] overflow-hidden" aria-label="Hero">

      {/* ── Sliding background images ──────────────────────────── */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.url}
            className="hero-slide absolute inset-0"
            style={{
              ['--delay' as string]: `${i * 7}s`,
              ['--cycle' as string]: `${slides.length * 7}s`,
            }}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              className="object-cover object-center"
              priority={i === 0}
              quality={i === 0 ? 90 : 75}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* ── Overlays ───────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="container-custom relative z-10 flex h-full flex-col justify-end pb-12 sm:pb-16 lg:pb-20">

        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            {locale === 'mr' ? 'छत्रपती संभाजीनगर महानगरपालिका' : 'CSMC — Smart Citizen Portal'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-white sm:text-5xl lg:text-6xl leading-tight max-w-3xl mb-4">
          {locale === 'mr'
            ? <>स्मार्ट नागरी सेवा<br /><span className="text-orange-400">एकाच ठिकाणी</span></>
            : <>Smart Municipal<br /><span className="text-orange-400">Services Online</span></>
          }
        </h1>

        {/* Subtitle */}
        <p className="text-base text-white/80 max-w-xl mb-8 leading-relaxed sm:text-lg">
          {locale === 'mr'
            ? 'मालमत्ता कर, पाणीपट्टी, तक्रारी, प्रमाणपत्रे — सर्व सेवा घरबसल्या मिळवा.'
            : 'Property tax, water bills, complaints, certificates — all services from home.'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/citizen/dashboard"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            {locale === 'mr' ? 'सेवा सुरू करा' : 'Get Started'}
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/citizen/complaints/track"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-xl border border-white/30 transition-all hover:scale-105"
          >
            {locale === 'mr' ? 'तक्रार ट्रॅक करा' : 'Track Complaint'}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 text-center">
              <div className="text-xl font-black text-white sm:text-2xl">
                {locale === 'mr' ? stat.valueMr : stat.valueEn}
              </div>
              <div className="text-xs text-white/70 mt-0.5 font-medium">
                {locale === 'mr' ? stat.labelMr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Pills */}
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20 transition-all hover:scale-105 hover:border-white/50"
              >
                <span className={`w-5 h-5 ${action.color} rounded-full flex items-center justify-center`}>
                  <Icon size={12} />
                </span>
                {locale === 'mr' ? action.labelMr : action.labelEn}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Slide dots indicator ───────────────────────────────── */}
      <div className="absolute bottom-4 right-6 z-10 flex gap-1.5">
        {slides.map((_, i) => (
          <div key={i} className="h-1.5 w-6 rounded-full bg-white/40" />
        ))}
      </div>
    </section>
  );
}
