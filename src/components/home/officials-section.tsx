'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Building2, ExternalLink, Mail, Phone, ShieldCheck, X } from 'lucide-react';

import { officialGroups, officials, type Official } from '@/lib/constants/officials';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function OfficialsSection() {
  const { t } = useTranslation();
  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(null);

  return (
    <section
      className="relative overflow-hidden bg-slate-50 py-12 sm:py-16 lg:py-24"
      aria-labelledby="officials-heading"
    >
      <div
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-orange-50 to-transparent"
        aria-hidden
      />
      <div className="container-custom relative">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-lg bg-orange-100 px-3.5 py-2 text-xs font-semibold text-orange-800 sm:px-4 sm:text-sm">
            <ShieldCheck size={16} aria-hidden />
            {t('home.officials.tag')}
          </span>
          <h2
            id="officials-heading"
            className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl lg:text-4xl"
          >
            {t('home.officials.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            {t('home.officials.description')}
          </p>
        </motion.div>

        <div className="space-y-9 lg:space-y-12">
          {officialGroups.map((group, groupIndex) => {
            const groupedOfficials = officials.filter((official) => official.group === group);

            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: groupIndex * 0.08, ease: 'easeOut' }}
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-orange-700 shadow-sm ring-1 ring-slate-200">
                      <Building2 size={20} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold text-slate-950 sm:text-lg">
                        {group}
                      </h3>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                        {groupedOfficials.length} profiles
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3"
                  variants={{
                    visible: { transition: { staggerChildren: 0.08 } },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.16 }}
                  role="list"
                >
                  {groupedOfficials.map((official) => (
                    <OfficialCard
                      key={`${official.name}-${official.designation}`}
                      official={official}
                      onOpen={() => setSelectedOfficial(official)}
                    />
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
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
      className="group relative flex min-h-[360px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:min-h-[410px]"
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      role="listitem"
    >
      <div
        className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-orange-600 via-amber-500 to-sky-600 sm:h-24"
        aria-hidden
      />
      <motion.div
        className="absolute right-4 top-4 h-10 w-10 rounded-full border border-white/35 bg-white/20 backdrop-blur sm:right-5 sm:top-5 sm:h-12 sm:w-12"
        animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <div className="relative flex w-full flex-col px-4 pb-4 pt-8 sm:px-5 sm:pb-5 sm:pt-10">
        <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg ring-1 ring-slate-200 sm:h-28 sm:w-28">
          <Image
            src={official.image}
            alt={official.name}
            width={112}
            height={112}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="mt-4 text-center sm:mt-5">
          <h4 className="text-lg font-bold leading-tight text-slate-950 sm:text-xl">
            {official.name}
          </h4>
          <p className="mt-2 text-sm font-semibold text-orange-700">{official.designation}</p>
          <p className="mx-auto mt-1 max-w-[18rem] text-xs font-medium uppercase tracking-[0.12em] text-slate-500 sm:tracking-[0.16em]">
            {official.department}
          </p>
        </div>

        <p className="mt-3 line-clamp-3 text-center text-sm leading-relaxed text-slate-600 sm:mt-4">
          {official.bio}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-5">
          {official.focus.slice(0, 2).map((item) => (
            <span
              key={item}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-[1fr_1fr] items-center gap-2 pt-5">
          <Link
            href={`mailto:${official.email}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-800 transition hover:border-orange-300 hover:bg-orange-100"
            aria-label={`Email ${official.name}`}
          >
            <Mail size={17} aria-hidden />
            <span>Contact Office</span>
          </Link>
          <motion.button
            type="button"
            onClick={onOpen}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
            whileTap={{ scale: 0.96 }}
            aria-label={`View profile for ${official.name}`}
          >
            View Profile
            <ArrowUpRight size={16} aria-hidden />
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
        <div className="relative bg-gradient-to-r from-orange-600 via-amber-500 to-sky-600 px-5 py-5 text-white sm:px-6 sm:py-6">
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
