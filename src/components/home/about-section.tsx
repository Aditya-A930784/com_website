'use client';

import { Card, CardBody } from '@/components/ui/card';
import { ArrowRight, Building2, Users, Award, TrendingUp, Landmark } from 'lucide-react';
import Link from 'next/link';

import { useTranslation } from '@/lib/i18n/LanguageContext';
import { ROUTES } from '@/lib/constants/routes';

/**
 * AboutSection — citizen landing introduction.
 * Rebuilt in Phase 4 to read completely from the i18n Context.
 */
export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="about-heading">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-lg text-sm font-medium mb-4">
            {t('home.about.tag')}
          </span>
          <h2 id="about-heading" className="text-3xl lg:text-4xl font-bold text-slate-950 mb-4">
            {t('home.about.title')}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
            {t('home.about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Left - Visual landmark */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-orange-100 to-sky-100 rounded-lg overflow-hidden shadow-sm ring-1 ring-slate-200 flex items-center justify-center">
              <Landmark className="text-orange-700" size={90} strokeWidth={1.6} aria-hidden />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold">1936</div>
              <div className="text-sm font-medium">{t('home.about.est_label')}</div>
            </div>
          </div>

          {/* Right - Narrative */}
          <div className="space-y-6">
            <Card className="border-l-4 border-orange-600">
              <CardBody>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {t('home.about.desc_p1')}
                </p>
              </CardBody>
            </Card>

            <Card className="border-l-4 border-blue-600">
              <CardBody>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {t('home.about.desc_p2')}
                </p>
              </CardBody>
            </Card>

            <Link
              href={ROUTES.PUBLIC.ABOUT.BASE}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-orange-700 group shadow min-h-[44px]"
            >
              {t('home.about.read_more')}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} aria-hidden />
            </Link>
          </div>
        </div>

        {/* Municipal Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16" role="list">
          <Card hover className="text-center border-t-4 border-orange-600" role="listitem">
            <CardBody>
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4" aria-hidden>
                <Building2 className="text-orange-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-1 text-gray-900">437 km²</h3>
              <p className="text-gray-500 text-sm">{t('home.about.total_area')}</p>
            </CardBody>
          </Card>

          <Card hover className="text-center border-t-4 border-blue-600" role="listitem">
            <CardBody>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4" aria-hidden>
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-1 text-gray-900">{t('home.about.population_val')}</h3>
              <p className="text-gray-500 text-sm">{t('home.about.population')}</p>
            </CardBody>
          </Card>

          <Card hover className="text-center border-t-4 border-green-600" role="listitem">
            <CardBody>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4" aria-hidden>
                <Award className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-1 text-gray-900">115</h3>
              <p className="text-gray-500 text-sm">{t('home.about.wards')}</p>
            </CardBody>
          </Card>

          <Card hover className="text-center border-t-4 border-purple-600" role="listitem">
            <CardBody>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4" aria-hidden>
                <TrendingUp className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-1 text-gray-900">50+</h3>
              <p className="text-gray-500 text-sm">{t('home.about.online_services')}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
