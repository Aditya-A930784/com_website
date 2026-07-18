'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, ExternalLink, Mail, Phone, ShieldCheck, X } from 'lucide-react';

import { officials, type Official } from '@/lib/constants/officials';
import { useTranslation } from '@/lib/i18n/LanguageContext';

type DirectoryFilter = 'Leadership' | 'Administration' | 'Departments';

const directoryFilters: DirectoryFilter[] = ['Leadership', 'Administration', 'Departments'];

export default function OfficialsSection() {
  const { t } = useTranslation();
  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(null);
  const [activeFilter, setActiveFilter] = useState<DirectoryFilter>('Leadership');
  const filteredOfficials = officials.filter((official) => {
    if (activeFilter === 'Leadership') return official.group !== 'Administration';
    if (activeFilter === 'Administration') return official.group === 'Administration';
    return official.department.includes('Chhatrapati Sambhajinagar Municipal Corporation');
  });

  return (
    <section
      className="relative overflow-hidden bg-slate-50 py-12 sm:py-16 lg:py-24"
      aria-labelledby="officials-heading"
    >
      <div className="container-custom relative">
        <motion.div
          className="overflow-hidden rounded-2xl bg-slate-950 px-5 py-8 text-white shadow-lg sm:px-8 sm:py-10 lg:px-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                <ShieldCheck size={15} aria-hidden />
                {t('home.officials.tag')}
              </span>
              <h2 id="officials-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {t('home.officials.title')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
                {t('home.officials.description')}
              </p>
            </div>
            <p className="border-l-2 border-orange-500 pl-3 text-sm font-semibold text-slate-200">
              Official directory · {officials.length} profiles
            </p>
          </div>
        </motion.div>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2" aria-label="Official directory filters">
            {directoryFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  activeFilter === filter
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <Building2 size={15} aria-hidden />
            {filteredOfficials.length} listed
          </p>
        </div>

        <motion.div
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          role="list"
        >
          {filteredOfficials.map((official) => (
            <OfficialCard
              key={`${official.name}-${official.designation}`}
              official={official}
              onOpen={() => setSelectedOfficial(official)}
            />
          ))}
        </motion.div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <p className="text-sm text-slate-600">Need a department contact or the complete list of municipal offices?</p>
          <Link
            href="/about/officials"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 transition hover:text-orange-800"
          >
            Contact directory
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selectedOfficial && (
          <OfficialProfileModal
            official={selectedOfficial}
            onClose={() => setSelectedOfficial(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function OfficialCard({ official, onOpen }: { official: Official; onOpen: () => void }) {
  return (
    <motion.article
      className="group relative flex min-h-[315px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      role="listitem"
    >
      <div
        className="absolute inset-x-0 top-0 h-16 bg-slate-950"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 h-1 bg-orange-500" aria-hidden />

      <div className="relative flex w-full flex-col px-5 pb-5 pt-8">
        <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg ring-1 ring-slate-200">
          <Image
            src={official.image}
            alt={official.name}
            width={112}
            height={112}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold leading-tight text-slate-950 sm:text-xl">
            {official.name}
          </h3>
          <p className="mt-2 text-sm font-semibold text-orange-700">{official.designation}</p>
          <p className="mx-auto mt-1 max-w-[18rem] text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            {official.department}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <motion.button
            type="button"
            onClick={onOpen}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
            whileTap={{ scale: 0.96 }}
            aria-label={`View profile for ${official.name}`}
          >
            View Profile
            <ArrowRight size={16} aria-hidden />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

function OfficialProfileModal({ official, onClose }: { official: Official; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <motion.div
        className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-t-lg bg-white shadow-2xl sm:rounded-lg"
        initial={{ opacity: 0, y: 34, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="official-profile-title"
      >
        <div className="relative bg-slate-800 px-5 py-5 text-white sm:px-6 sm:py-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white transition hover:bg-white/25"
            aria-label="Close profile"
          >
            <X size={20} aria-hidden />
          </button>

          <div className="flex items-center gap-4 pr-12">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg sm:h-24 sm:w-24">
              <Image
                src={official.image}
                alt={official.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-sm sm:tracking-[0.18em]">
                {official.group}
              </p>
              <h3
                id="official-profile-title"
                className="mt-1 text-xl font-bold leading-tight sm:text-2xl"
              >
                {official.name}
              </h3>
              <p className="mt-2 text-sm font-semibold text-white">{official.designation}</p>
              <p className="text-sm text-white/80">{official.department}</p>
            </div>
          </div>
        </div>

        <div className="grid max-h-[calc(92vh-132px)] gap-6 overflow-y-auto p-5 sm:p-6 md:grid-cols-[1fr_220px]">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              Profile
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{official.bio}</p>

            <h4 className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              Focus Areas
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {official.focus.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href={`mailto:${official.email}`}
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50"
            >
              <Mail size={17} aria-hidden />
              Email office
            </Link>
            <Link
              href={`tel:${official.phone}`}
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50"
            >
              <Phone size={17} aria-hidden />
              Call office
            </Link>
            <Link
              href={official.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg bg-slate-950 px-3 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              <ExternalLink size={17} aria-hidden />
              Official page
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
