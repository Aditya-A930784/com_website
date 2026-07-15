"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Building2, ExternalLink, Mail, Phone, ShieldCheck, X } from 'lucide-react';

import { useTranslation } from '@/lib/i18n/LanguageContext';

type Official = {
  name: string;
  designation: string;
  department: string;
  group: 'State Leadership' | 'Civic Leadership' | 'Administration';
  image: string;
  profileUrl: string;
  email: string;
  phone: string;
  bio: string;
  focus: string[];
};

const officials: Official[] = [
  {
    name: 'Shri Devendra Fadnavis',
    designation: 'Hon. Chief Minister',
    department: 'Government of Maharashtra',
    group: 'State Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/DevendraFadnavis17.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    email: 'cm@maharashtra.gov.in',
    phone: '022-22025222',
    bio: 'Provides state-level direction for urban development, public infrastructure, and citizen-focused governance.',
    focus: ['Urban policy', 'Infrastructure', 'Public services'],
  },
  {
    name: 'Shri Eknath Shinde',
    designation: 'Hon. Deputy Chief Minister',
    department: 'Government of Maharashtra',
    group: 'State Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/Eknath_Shinde6.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    email: 'dcm@maharashtra.gov.in',
    phone: '022-22025151',
    bio: 'Supports major civic development decisions and coordinates state priorities for municipal transformation.',
    focus: ['Civic works', 'Coordination', 'Development'],
  },
  {
    name: 'Smt. Sunetra Ajit Pawar',
    designation: 'Hon. Deputy Chief Minister',
    department: 'Government of Maharashtra',
    group: 'State Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/vahini-saheb5.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    email: 'office@maharashtra.gov.in',
    phone: '022-22025353',
    bio: 'Guides development priorities connected to welfare, financial planning, and inclusive public delivery.',
    focus: ['Welfare', 'Finance', 'Governance'],
  },
  {
    name: 'Smt. Madhuri Misal',
    designation: 'Hon. Minister of State',
    department: 'Urban Development Department',
    group: 'State Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/madhuri_misal21.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    email: 'udd@maharashtra.gov.in',
    phone: '022-22026666',
    bio: 'Works with the Urban Development Department on city planning, implementation, and service improvement.',
    focus: ['Urban development', 'Planning', 'Implementation'],
  },
  {
    name: 'Shri Sameer Rajurkar',
    designation: 'Hon. Mayor',
    department: 'CSMC',
    group: 'Civic Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/samir-bhaiya-rajurkar4.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    email: 'mayor@chhsambhajinagarmc.org',
    phone: '0240-2333536',
    bio: 'Represents the city council and leads public priorities across wards, local works, and civic initiatives.',
    focus: ['Ward priorities', 'Public works', 'Citizen outreach'],
  },
  {
    name: 'Shri Rajendra Janjal',
    designation: 'Hon. Deputy Mayor',
    department: 'CSMC',
    group: 'Civic Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/raju-bhaiya-janjal5.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    email: 'deputymayor@chhsambhajinagarmc.org',
    phone: '0240-2333536',
    bio: 'Assists civic leadership with city-level coordination, committee work, and ward-level public engagement.',
    focus: ['Council support', 'Ward coordination', 'Committees'],
  },
  {
    name: 'Shri Amol Yedge, IAS',
    designation: 'Municipal Commissioner',
    department: 'CSMC',
    group: 'Administration',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/amol_sir_gem5.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    email: 'commissioner@chhsambhajinagarmc.org',
    phone: '0240-2333536',
    bio: 'Heads municipal administration and supervises service delivery, digital systems, and department operations.',
    focus: ['Administration', 'Digital services', 'Operations'],
  },
];

const groups = ['State Leadership', 'Civic Leadership', 'Administration'] as const;

export default function OfficialsSection() {
  const { t } = useTranslation();
  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(null);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24" aria-labelledby="officials-heading">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-orange-50 to-transparent" aria-hidden />
      <div className="container-custom relative">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-lg bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-800">
            <ShieldCheck size={16} aria-hidden />
            {t('home.officials.tag')}
          </span>
          <h2 id="officials-heading" className="mt-4 text-3xl font-bold text-slate-950 lg:text-4xl">
            {t('home.officials.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            {t('home.officials.description')}
          </p>
        </motion.div>

        <div className="space-y-10">
          {groups.map((group, groupIndex) => {
            const groupedOfficials = officials.filter((official) => official.group === group);

            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: groupIndex * 0.08, ease: 'easeOut' }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-orange-700 shadow-sm ring-1 ring-slate-200">
                    <Building2 size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{group}</h3>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      {groupedOfficials.length} profiles
                    </p>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
          <OfficialProfileModal official={selectedOfficial} onClose={() => setSelectedOfficial(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function OfficialCard({ official, onOpen }: { official: Official; onOpen: () => void }) {
  return (
    <motion.article
      className="group relative min-h-[388px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      role="listitem"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-orange-600 via-amber-500 to-sky-600" aria-hidden />
      <motion.div
        className="absolute right-5 top-5 h-12 w-12 rounded-full border border-white/35 bg-white/20 backdrop-blur"
        animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <div className="relative flex h-full flex-col px-5 pb-5 pt-10">
        <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg ring-1 ring-slate-200">
          <Image
            src={official.image}
            alt={official.name}
            width={112}
            height={112}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="mt-5 text-center">
          <h4 className="text-xl font-bold leading-tight text-slate-950">{official.name}</h4>
          <p className="mt-2 text-sm font-semibold text-orange-700">{official.designation}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{official.department}</p>
        </div>

        <p className="mt-4 line-clamp-3 text-center text-sm leading-relaxed text-slate-600">{official.bio}</p>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {official.focus.slice(0, 2).map((item) => (
            <span key={item} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-center gap-2 pt-5">
          <Link
            href={`mailto:${official.email}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
            aria-label={`Email ${official.name}`}
          >
            <Mail size={17} aria-hidden />
          </Link>
          <Link
            href={`tel:${official.phone}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            aria-label={`Call ${official.name}`}
          >
            <Phone size={17} aria-hidden />
          </Link>
          <motion.button
            type="button"
            onClick={onOpen}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
            whileTap={{ scale: 0.96 }}
            aria-label={`View profile for ${official.name}`}
          >
            Profile
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <motion.div
        className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl"
        initial={{ opacity: 0, y: 34, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="official-profile-title"
      >
        <div className="relative bg-gradient-to-r from-orange-600 via-amber-500 to-sky-600 px-5 py-6 text-white sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white transition hover:bg-white/25"
            aria-label="Close profile"
          >
            <X size={20} aria-hidden />
          </button>

          <div className="flex flex-col gap-4 pr-12 sm:flex-row sm:items-center">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
              <Image src={official.image} alt={official.name} width={96} height={96} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">{official.group}</p>
              <h3 id="official-profile-title" className="mt-1 text-2xl font-bold leading-tight">
                {official.name}
              </h3>
              <p className="mt-2 text-sm font-semibold text-white">{official.designation}</p>
              <p className="text-sm text-white/80">{official.department}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_220px]">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Profile</h4>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{official.bio}</p>

            <h4 className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Focus Areas</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {official.focus.map((item) => (
                <span key={item} className="rounded-md bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-800">
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
