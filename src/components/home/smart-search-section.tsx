'use client';

import { useMemo, useState, useRef, type ComponentType, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles, Search, X, ArrowRight, Mic, Camera,
  IndianRupee, Droplets, Megaphone, ScrollText, BadgeCheck, CreditCard,
  Lock, Calculator, FileText, Users, Briefcase, Bell, Phone, HelpCircle,
  LayoutGrid, ListChecks,
} from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { classify } from '@/lib/smart-routing/resolve';
import type { ServiceEntry } from '@/lib/smart-routing/catalog';
import { useGuidanceStore } from '@/lib/smart-routing/guidance-store';

const ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  tax: IndianRupee,
  water: Droplets,
  complaint: Megaphone,
  track: Search,
  certificate: ScrollText,
  license: BadgeCheck,
  payment: CreditCard,
  locker: Lock,
  calculator: Calculator,
  documents: FileText,
  officials: Users,
  tender: Briefcase,
  notice: Bell,
  contact: Phone,
  help: HelpCircle,
  services: LayoutGrid,
};

// Seeded examples — the box is NEVER blank. One deliberately a symptom phrase
// ("पाणी येत नाही") to show the router mapping problem → service.
const CHIPS: { mr: string; en: string; q: string }[] = [
  { mr: 'पाणीपट्टी भरा', en: 'Pay water bill', q: 'पाणीपट्टी भरा' },
  { mr: 'कर भरा', en: 'Pay tax', q: 'कर भरा' },
  { mr: 'जन्म दाखला', en: 'Birth certificate', q: 'जन्म दाखला' },
  { mr: 'तक्रार नोंदवा', en: 'File a complaint', q: 'तक्रार नोंदवा' },
  { mr: 'पाणी येत नाही', en: 'No water', q: 'पाणी येत नाही' },
];

export default function SmartSearchSection() {
  const { locale } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const startGuidance = useGuidanceStore((s) => s.startGuidance);

  const isMr = locale === 'mr';
  const result = useMemo(() => (query.trim() ? classify(query) : null), [query]);

  function launch(service: ServiceEntry) {
    if (service.stepsMr && service.stepsMr.length > 0) {
      startGuidance({
        serviceId: service.id,
        titleMr: service.titleMr,
        titleEn: service.titleEn,
        stepsMr: service.stepsMr,
        stepsEn: service.stepsEn ?? service.stepsMr,
      });
    }
    router.push(service.route);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && result?.status === 'confident') {
      launch(result.matches[0].service);
    }
  }

  const primary = (s: ServiceEntry) => (isMr ? s.titleMr : s.titleEn);
  const secondary = (s: ServiceEntry) => (isMr ? s.titleEn : s.titleMr);
  const steps = (s: ServiceEntry) => (isMr ? s.stepsMr : s.stepsEn);

  return (
    <section
      className="relative bg-gradient-to-b from-primary-50 to-white py-10 lg:py-14"
      aria-labelledby="smart-search-heading"
    >
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          {/* Heading */}
          <div className="mb-5 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 ring-1 ring-primary-200">
              <Sparkles size={15} className="text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                {isMr ? 'स्मार्ट शोध' : 'Smart Search'}
              </span>
            </div>
            <h2 id="smart-search-heading" className="text-2xl font-black text-gray-900 sm:text-3xl">
              {isMr ? 'तुम्हाला काय हवं आहे? फक्त लिहा.' : 'What do you need? Just type it.'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              {isMr
                ? 'सेवेचं नाव माहीत नसेल तरी चालेल — तुमच्या शब्दांत लिहा, आम्ही थेट योग्य ठिकाणी नेतो.'
                : "Don't know the service name? Describe it in your words — we take you straight to the right place."}
            </p>
          </div>

          {/* Search box */}
          <div className="rounded-2xl bg-white p-2 shadow-lg ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-primary-500">
            <div className="flex items-center gap-2">
              <Search size={20} className="ml-2 shrink-0 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label={isMr ? 'सेवा शोधा' : 'Search services'}
                placeholder={
                  isMr
                    ? 'उदा. "पाणीपट्टी भरा", "जन्म दाखला", "पाणी येत नाही"...'
                    : 'e.g. "pay water bill", "birth certificate", "no water"...'
                }
                className="min-h-[48px] w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  aria-label={isMr ? 'साफ करा' : 'Clear'}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
              {/* Roadmap affordances — voice is the highest-value next step for
                  low-literacy users; disabled + labelled so we never fake it. */}
              <div className="hidden items-center gap-1 sm:flex">
                <RoadmapButton icon={Mic} label={isMr ? 'आवाज (लवकरच)' : 'Voice (soon)'} />
                <RoadmapButton icon={Camera} label={isMr ? 'फोटो (लवकरच)' : 'Photo (soon)'} />
              </div>
            </div>
          </div>

          {/* Seeded example chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-gray-500">
              {isMr ? 'लोकप्रिय:' : 'Popular:'}
            </span>
            {CHIPS.map((chip) => (
              <button
                key={chip.q}
                onClick={() => {
                  setQuery(chip.q);
                  inputRef.current?.focus();
                }}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
              >
                {isMr ? chip.mr : chip.en}
              </button>
            ))}
          </div>

          {/* Results */}
          {result && (
            <div className="mt-5">
              {result.status === 'none' && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center">
                  <p className="mb-3 text-gray-700">
                    {isMr
                      ? 'थेट सेवा सापडली नाही. हे प्रयत्न करा:'
                      : "Couldn't match that directly. Try these:"}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link
                      href="/services"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
                    >
                      {isMr ? 'सर्व सेवा पहा' : 'View all services'}
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/complaints/new"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-200"
                    >
                      {isMr ? 'तक्रार नोंदवा' : 'File a complaint'}
                    </Link>
                  </div>
                </div>
              )}

              {result.status === 'confident' && (
                <div className="space-y-3">
                  <ConfidentCard
                    service={result.matches[0].service}
                    isMr={isMr}
                    primary={primary}
                    secondary={secondary}
                    steps={steps}
                    Icon={ICONS[result.matches[0].service.iconKey] ?? LayoutGrid}
                    onLaunch={launch}
                  />
                  {result.matches.length > 1 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-2">
                      <p className="px-2 py-1 text-xs font-medium text-gray-500">
                        {isMr ? 'इतर पर्याय' : 'Other options'}
                      </p>
                      {result.matches.slice(1).map((m) => (
                        <ResultRow
                          key={m.service.id}
                          service={m.service}
                          primary={primary}
                          secondary={secondary}
                          Icon={ICONS[m.service.iconKey] ?? LayoutGrid}
                          onLaunch={launch}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {result.status === 'ambiguous' && (
                <div className="rounded-2xl border border-gray-200 bg-white p-2">
                  <p className="px-2 py-2 text-sm font-semibold text-gray-700">
                    {isMr ? 'तुम्हाला यापैकी काय हवं आहे?' : 'Which one did you mean?'}
                  </p>
                  {result.matches.map((m) => (
                    <ResultRow
                      key={m.service.id}
                      service={m.service}
                      primary={primary}
                      secondary={secondary}
                      Icon={ICONS[m.service.iconKey] ?? LayoutGrid}
                      onLaunch={launch}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RoadmapButton({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
}) {
  return (
    <span
      title={label}
      aria-label={label}
      className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg text-gray-300"
    >
      <Icon size={18} />
    </span>
  );
}

function ConfidentCard({
  service,
  isMr,
  primary,
  secondary,
  steps,
  Icon,
  onLaunch,
}: {
  service: ServiceEntry;
  isMr: boolean;
  primary: (s: ServiceEntry) => string;
  secondary: (s: ServiceEntry) => string;
  steps: (s: ServiceEntry) => string[] | undefined;
  Icon: ComponentType<{ size?: number; className?: string }>;
  onLaunch: (service: ServiceEntry) => void;
}) {
  const stepList = steps(service);
  return (
    <button
      onClick={() => onLaunch(service)}
      className="group block w-full rounded-2xl border-2 border-primary-500 bg-primary-50/50 p-4 text-left transition hover:bg-primary-50"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
          <Icon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-bold text-gray-900">{primary(service)}</div>
          <div className="text-sm text-gray-500">{secondary(service)}</div>
        </div>
        <span className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl bg-primary-600 px-4 text-sm font-bold text-white group-hover:bg-primary-700">
          {isMr ? 'सुरू करा' : 'Start'}
          <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
        </span>
      </div>

      {stepList && stepList.length > 0 && (
        <div className="mt-3 flex items-start gap-2 border-t border-primary-200 pt-3">
          <ListChecks size={16} className="mt-0.5 shrink-0 text-primary-600" />
          <ol className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-600">
            {stepList.map((step, i) => (
              <li key={i} className="after:ml-2 after:text-gray-300 after:content-['›'] last:after:content-['']">
                <span className="font-semibold text-primary-700">{i + 1}.</span> {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </button>
  );
}

function ResultRow({
  service,
  primary,
  secondary,
  Icon,
  onLaunch,
}: {
  service: ServiceEntry;
  primary: (s: ServiceEntry) => string;
  secondary: (s: ServiceEntry) => string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  onLaunch: (service: ServiceEntry) => void;
}) {
  return (
    <button
      onClick={() => onLaunch(service)}
      className={cn(
        'flex min-h-[56px] w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-gray-50'
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold text-gray-900">{primary(service)}</div>
        <div className="truncate text-sm text-gray-500">{secondary(service)}</div>
      </div>
      <ArrowRight size={16} className="shrink-0 text-gray-300" />
    </button>
  );
}
