'use client';

import { ServiceCardGrid, type ServiceCardProps } from '@/components/shared';
import Link from 'next/link';
import {
  Home,
  Droplet,
  FileText,
  Search,
  Baby,
  AlertCircle,
  Download,
  Calculator,
  CreditCard,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { ROUTES } from '@/lib/constants/routes';

export default function OnlineServicesSection() {
  const { t, locale } = useTranslation();

  const primaryServices: ServiceCardProps[] = [
    {
      titleMr: 'मालमत्ता कर भरा',
      titleEn: 'Pay Property Tax',
      icon: Home,
      href: ROUTES.CITIZEN.PROPERTY_TAX,
      requiresLogin: true,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      description: t('home.services.tax_desc'),
    },
    {
      titleMr: 'पाणीपट्टी भरा',
      titleEn: 'Pay Water Bill',
      icon: Droplet,
      href: ROUTES.CITIZEN.WATER_BILLS,
      requiresLogin: true,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: t('home.services.water_desc'),
    },
    {
      titleMr: 'तक्रार नोंदवा',
      titleEn: 'File a Complaint',
      icon: FileText,
      href: ROUTES.PUBLIC.COMPLAINTS.NEW,
      requiresLogin: false,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      description: t('home.services.complaint_desc'),
    },
    {
      titleMr: 'तक्रार स्थिती तपासा',
      titleEn: 'Track Complaint',
      icon: Search,
      href: ROUTES.PUBLIC.COMPLAINTS.TRACK,
      requiresLogin: false,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      description: t('home.services.track_desc'),
    },
    {
      titleMr: 'दाखला मिळवा',
      titleEn: 'Get Certificate',
      icon: Baby,
      href: ROUTES.CITIZEN.CERTIFICATES.BASE,
      requiresLogin: true,
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      description: t('home.services.certificates_desc'),
    },
    {
      titleMr: 'सर्व सेवा',
      titleEn: 'All Services',
      icon: AlertCircle,
      href: ROUTES.PUBLIC.SERVICES.BASE,
      requiresLogin: false,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      description: t('home.services.all_services_desc'),
    },
  ];

  const quickLinks = [
    { titleMr: 'डाउनलोड', titleEn: 'Downloads', icon: Download, href: ROUTES.PUBLIC.DOCUMENTS },
    { titleMr: 'कर गणना', titleEn: 'Tax Calculator', icon: Calculator, href: ROUTES.PUBLIC.SERVICES.CALCULATOR },
    { titleMr: 'पेमेंट इतिहास', titleEn: 'Payment History', icon: CreditCard, href: ROUTES.CITIZEN.PAYMENTS },
    { titleMr: 'मदत केंद्र', titleEn: 'Help Centre', icon: AlertCircle, href: ROUTES.PUBLIC.ABOUT.FAQS },
  ] as const;

  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden" aria-labelledby="services-heading">
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-100 text-orange-800 text-sm font-bold mb-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {t('home.services.tag')}
          </div>
          
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-tight"
          >
            <span className="block">{t('home.services.title')}</span>
            <span className="text-orange-700">
              Citizen Services
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('home.services.description')}
          </p>
        </div>

        {/* ServiceCardGrid — Phase 2 shared component */}
        <ServiceCardGrid
          services={primaryServices}
          viewAllHref={ROUTES.PUBLIC.SERVICES.BASE}
          className="mb-16"
        />

        {/* Quick links bar - Modern Design */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-2xl font-black text-slate-950 mb-6 text-center sm:text-left">
                Quick Access
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.titleMr}
                      href={item.href}
                      className="group/link flex min-h-[80px] items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 hover:shadow-sm active:scale-[0.98]"
                      aria-label={`${item.titleMr} — ${item.titleEn}`}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-sm group-hover/link:scale-105 transition-all duration-300">
                        <Icon size={24} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-900 text-sm leading-tight group-hover/link:text-orange-700 transition-colors">
                          {locale === 'mr' ? item.titleMr : item.titleEn}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {locale === 'mr' ? item.titleEn : item.titleMr}
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-slate-400 group-hover/link:text-orange-600 group-hover/link:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
        </div>

        {/* Login indicator note */}
        <div className="text-center mt-8">
          <p className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {t('home.services.legend')}
          </p>
        </div>
      </div>
    </section>
  );
}
