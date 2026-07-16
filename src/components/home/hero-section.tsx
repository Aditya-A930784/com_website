'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  FileText,
  MessageSquare,
  CreditCard,
  Search,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { ROUTES } from '@/lib/constants/routes';

// Real Unsplash city / civic images for the slider
const slides = [
  {
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=85',
    alt: 'Smart city aerial view',
  },
  {
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=85',
    alt: 'Municipal city street',
  },
  {
    url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85',
    alt: 'City skyline',
  },
  {
    url: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1600&q=85',
    alt: 'Urban infrastructure',
  },
];

const stats = [
  { valueMr: '४३७ चौ.किमी', valueEn: '437 sq km', labelMr: 'एकूण क्षेत्र', labelEn: 'Total Area' },
  { valueMr: '१२ लाख+', valueEn: '12 Lakh+', labelMr: 'लोकसंख्या', labelEn: 'Population' },
  { valueMr: '११५', valueEn: '115', labelMr: 'प्रभाग', labelEn: 'Wards' },
  { valueMr: '५०+', valueEn: '50+', labelMr: 'ऑनलाइन सेवा', labelEn: 'Online Services' },
];

const quickActions = [
  {
    iconEl: CreditCard,
    labelMr: 'कर भरा',
    labelEn: 'Pay Tax',
    href: ROUTES.CITIZEN.PROPERTY_TAX,
    color: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    iconEl: MessageSquare,
    labelMr: 'तक्रार नोंदवा',
    labelEn: 'File Complaint',
    href: ROUTES.PUBLIC.COMPLAINTS.NEW,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    iconEl: FileText,
    labelMr: 'प्रमाणपत्र',
    labelEn: 'Certificate',
    href: ROUTES.CITIZEN.CERTIFICATES.BASE,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    iconEl: Search,
    labelMr: 'तक्रार ट्रॅक करा',
    labelEn: 'Track Complaint',
    href: ROUTES.PUBLIC.COMPLAINTS.TRACK,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
];

export default function HeroSection() {
  const { locale } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goTo(indexOrUpdater: number | ((prev: number) => number)) {
    if (animating) return;
    setAnimating(true);
    setCurrent(typeof indexOrUpdater === 'function' ? indexOrUpdater(current) : indexOrUpdater);
    setTimeout(() => setAnimating(false), 600);
  }

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <section
      className="relative h-[85vh] min-h-[560px] max-h-[780px] overflow-hidden"
      aria-label="CSMC Hero Banner"
    >
      {/* ── Background Slider ───────────────────────────────────── */}
      {slides.map((slide, i) => (
        <div
          key={slide.url}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.url}
            alt={slide.alt}
            fill
            priority={i === 0}
            quality={i === 0 ? 90 : 75}
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Layered overlays */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-950/30" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

      {/* ── Slide Nav Arrows ───────────────────────────────────── */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-[10] -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition hidden sm:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-[10] -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition hidden sm:flex"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Slide Dots ─────────────────────────────────────────── */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-[10] flex gap-2 sm:bottom-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-orange-400' : 'w-2 bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Main Content ───────────────────────────────────────── */}
      <div className="container-custom relative z-[5] flex h-full flex-col justify-center pb-28 sm:pb-32">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-1.5 backdrop-blur-sm ring-1 ring-orange-400/40">
            <MapPin size={14} className="text-orange-300" />
            <span className="text-sm font-semibold text-orange-200">
              {locale === 'mr' ? 'छत्रपती संभाजीनगर महानगरपालिका' : 'Chhatrapati Sambhajinagar Municipal Corporation'}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {locale === 'mr' ? (
              <>
                <span className="block">स्मार्ट नागरिक</span>
                <span className="block bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  सेवा पोर्टल
                </span>
              </>
            ) : (
              <>
                <span className="block">Smart Citizen</span>
                <span className="block bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  Services Portal
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {locale === 'mr'
              ? 'घरबसल्या मालमत्ता कर, पाणीपट्टी, प्रमाणपत्रे, तक्रारी आणि इतर सर्व सेवा एका क्लिकवर मिळवा.'
              : 'Pay taxes, get certificates, file complaints and access all municipal services online — fast, easy and secure.'}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={ROUTES.PUBLIC.SERVICES.BASE}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all duration-200 hover:shadow-orange-600/40 hover:-translate-y-0.5"
            >
              {locale === 'mr' ? 'सर्व सेवा पहा' : 'View All Services'}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={ROUTES.PUBLIC.COMPLAINTS.NEW}
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-6 py-3.5 text-sm font-bold text-white backdrop-blur ring-1 ring-white/25 hover:bg-white/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              {locale === 'mr' ? 'तक्रार नोंदवा' : 'File a Complaint'}
            </Link>
            <a
              href="tel:02402331234"
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-6 py-3.5 text-sm font-bold text-white backdrop-blur ring-1 ring-white/25 hover:bg-white/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Phone size={16} />
              0240-2331234
            </a>
          </div>
        </div>
      </div>

      {/* ── Quick Actions Bar ──────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-[10]">
        <div className="container-custom pb-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {quickActions.map((action) => {
              const Icon = action.iconEl;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`group flex items-center gap-3 rounded-xl ${action.color} px-4 py-3.5 text-white shadow-lg backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-bold leading-tight">
                    {locale === 'mr' ? action.labelMr : action.labelEn}
                  </span>
                  <ArrowRight size={14} className="ml-auto opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Stats Strip ───────────────────────────────────────── */}
      <div className="absolute bottom-[5.5rem] left-0 right-0 z-[8] sm:bottom-[6.5rem]">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xl font-black text-orange-400 sm:text-2xl">
                  {locale === 'mr' ? stat.valueMr : stat.valueEn}
                </span>
                <span className="text-xs text-white/60 sm:text-sm">
                  {locale === 'mr' ? stat.labelMr : stat.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
