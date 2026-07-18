'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, MapPinned, Sparkles, Users, type LucideIcon } from 'lucide-react';

import { useTranslation } from '@/lib/i18n/LanguageContext';
import { ROUTES } from '@/lib/constants/routes';

type Metric = {
  value?: string;
  valueKey?: string;
  labelKey: string;
  icon: LucideIcon;
};

const metrics: Metric[] = [
  { value: '437 km²', labelKey: 'home.about.total_area', icon: MapPinned },
  { valueKey: 'home.about.population_val', labelKey: 'home.about.population', icon: Users },
  { value: '115', labelKey: 'home.about.wards', icon: Building2 },
  { value: '50+', labelKey: 'home.about.online_services', icon: Sparkles },
] as const;

/** A civic "blueprint" overview of CSMC and its citizen-service commitments. */
export default function AboutSection() {
  const { t, locale } = useTranslation();
  const promises =
    locale === 'mr'
      ? ['पारदर्शक प्रशासन', 'जलद नागरी सेवा', 'वारसा जपत विकास']
      : ['Transparent governance', 'Faster civic services', 'Heritage-led development'];

  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="about-heading">
      <div className="container-custom">
        <div className="mb-9 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
            <span className="h-px w-8 bg-orange-600" aria-hidden />
            {t('home.about.tag')}
          </p>
          <h2 id="about-heading" className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {t('home.about.title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('home.about.subtitle')}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
          <div
            className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] [background-size:28px_28px]"
            aria-hidden
          />
          <div className="relative grid lg:grid-cols-[1.06fr_0.94fr]">
            <div className="relative min-h-[310px] overflow-hidden lg:min-h-[410px]">
              <Image
                src="/images/home-slider/Bibi_ka_makbara.png"
                alt="Bibi Ka Maqbara, Chhatrapati Sambhajinagar"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" aria-hidden />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/35 bg-slate-950/45 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:left-7 sm:top-7">
                <MapPinned size={14} aria-hidden />
                Chhatrapati Sambhajinagar
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
                <div className="max-w-xs text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">City blueprint</p>
                  <p className="mt-2 text-base font-semibold leading-snug sm:text-lg">
                    Heritage, civic responsibility, and digital access in one city.
                  </p>
                </div>
                <div className="shrink-0 border-l border-white/40 pl-3 text-right text-white">
                  <p className="text-3xl font-bold leading-none sm:text-4xl">1936</p>
                  <p className="mt-1 text-xs font-medium text-white/80">{t('home.about.est_label')}</p>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-center bg-slate-950 px-6 py-9 text-white sm:px-9 lg:px-10">
              <div className="absolute right-6 top-6 h-16 w-16 rounded-full border border-orange-400/40" aria-hidden />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Citizen promise</p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                {t('home.about.desc_p1')}
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" aria-label="Citizen promises">
                {promises.map((promise, index) => (
                  <li key={promise} className="border-l border-orange-400/80 pl-3 text-sm font-semibold leading-snug text-white">
                    <span className="mb-1 block text-[10px] font-bold tracking-[0.18em] text-orange-300">0{index + 1}</span>
                    {promise}
                  </li>
                ))}
              </ul>

              <Link
                href={ROUTES.PUBLIC.ABOUT.BASE}
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t('home.about.read_more')}
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-5 grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="City metrics">
          {metrics.map(({ value, valueKey, labelKey, icon: Icon }, index) => (
            <div
              key={labelKey}
              className={`relative flex items-center gap-4 px-5 py-5 sm:px-6 ${index > 0 ? 'border-t border-slate-200 sm:border-t-0 lg:border-l' : ''}`}
              role="listitem"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange-200 bg-orange-50 text-orange-700" aria-hidden>
                <Icon size={20} />
              </span>
              <div>
                <p className="text-xl font-bold tracking-tight text-slate-950">{valueKey ? t(valueKey) : value}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{t(labelKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
