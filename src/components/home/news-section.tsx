'use client';

import Image from 'next/image';
import { ArrowRight, Calendar, Eye, TrendingUp, Newspaper, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

// Real Unsplash photos for each news item
const newsPhotos = [
  'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&q=80', // smart city
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',    // digital services
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',    // cleanliness
  'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80', // park
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80', // road
  'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=800&q=80',    // water
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', // public meeting
  'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80', // electric bus
];

const categoryColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-cyan-600',
  'bg-rose-500',
  'bg-indigo-500',
];

const textColors = [
  'text-blue-600',
  'text-purple-600',
  'text-green-600',
  'text-emerald-600',
  'text-orange-600',
  'text-cyan-600',
  'text-rose-600',
  'text-indigo-600',
];

export default function NewsSection() {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const newsItems = [
    { id: 1, views: 3250 },
    { id: 2, views: 4300 },
    { id: 3, views: 2850 },
    { id: 4, views: 1980 },
    { id: 5, views: 2560 },
    { id: 6, views: 3100 },
    { id: 7, views: 1750 },
    { id: 8, views: 2890 },
  ];

  const displayedNews = showAll ? newsItems : newsItems.slice(0, 6);
  const featured = newsItems[0];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
              <Newspaper size={14} />
              {t('home.news.tag')}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {t('home.news.title')}
            </h2>
            <p className="text-gray-500 max-w-xl">{t('home.news.description')}</p>
          </div>
          <Link
            href="/news"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            {t('home.news.view_all')}
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* ── Featured + Side 2-cards ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Featured — large hero card */}
          <Link href="/news/1" className="group lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden h-full min-h-[340px] shadow-lg">
              <Image
                src={newsPhotos[0]}
                alt={t('home.news.item1_title')}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {t('home.news.item1_category')}
                </span>
                <h3 className="text-xl lg:text-2xl font-bold mb-2 group-hover:text-blue-200 transition-colors line-clamp-2">
                  {t('home.news.item1_title')}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-4">
                  {t('home.news.item1_desc')}
                </p>
                <div className="flex items-center justify-between text-white/70 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {t('home.news.item1_date')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={14} />
                    {featured.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Side cards — items 2 & 3 */}
          <div className="flex flex-col gap-6">
            {[2, 3].map((num) => {
              const item = newsItems[num - 1];
              return (
                <Link key={num} href={`/news/${num}`} className="group flex-1">
                  <div className="relative rounded-2xl overflow-hidden h-full min-h-[155px] shadow-md">
                    <Image
                      src={newsPhotos[num - 1]}
                      alt={t(`home.news.item${num}_title`)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <span className={`inline-block ${categoryColors[num - 1]} text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-2`}>
                        {t(`home.news.item${num}_category`)}
                      </span>
                      <h3 className="text-sm font-bold group-hover:text-blue-200 transition-colors line-clamp-2 mb-2">
                        {t(`home.news.item${num}_title`)}
                      </h3>
                      <div className="flex items-center gap-3 text-white/70 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {t(`home.news.item${num}_date`)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={11} />
                          {item.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Regular grid — items 4–8 ────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedNews.slice(3).map((item) => (
            <Link key={item.id} href={`/news/${item.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">

                {/* Real photo */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={newsPhotos[item.id - 1]}
                    alt={t(`home.news.item${item.id}_title`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`${categoryColors[item.id - 1]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {t(`home.news.item${item.id}_category`)}
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-base text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                    {t(`home.news.item${item.id}_title`)}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {t(`home.news.item${item.id}_desc`)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-gray-400" />
                      {t(`home.news.item${item.id}_date`)}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye size={13} className="text-gray-400" />
                        {item.views.toLocaleString()}
                      </span>
                      <span className="hidden group-hover:flex items-center gap-1 font-semibold text-blue-600">
                        {t('home.news.read_more')}
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Show More / Less ────────────────────────────────────── */}
        <div className="text-center mb-16">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 group"
          >
            {showAll ? t('home.news.view_less') : t('home.news.view_all')}
            <ArrowRight
              size={18}
              className={`transition-transform duration-300 ${showAll ? 'rotate-90' : 'group-hover:translate-x-1'}`}
            />
          </button>
        </div>

        {/* ── Stats Bar ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '500+', label: t('home.news.stats_published'), icon: Newspaper, color: 'text-blue-600',   bg: 'bg-blue-50' },
              { value: '50K+', label: t('home.news.stats_readers'),   icon: Users,     color: 'text-purple-600', bg: 'bg-purple-50' },
              { value: '24/7', label: t('home.news.stats_updates'),   icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
              { value: '10+',  label: t('home.news.stats_departments'),icon: BookOpen,  color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                  <stat.icon size={22} className={stat.color} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
