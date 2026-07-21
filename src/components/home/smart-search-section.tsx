'use client';

import {
  useMemo, useState, useRef, useEffect, useCallback,
  type KeyboardEvent,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles, Search, X, ArrowRight, Mic, MicOff, Camera,
  IndianRupee, Droplets, Megaphone, ScrollText, BadgeCheck, CreditCard,
  Lock, Calculator, FileText, Users, Briefcase, Bell, Phone, HelpCircle,
  LayoutGrid, ListChecks, Clock, TrendingUp,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { classify } from '@/lib/smart-routing/resolve';
import type { ServiceEntry } from '@/lib/smart-routing/catalog';
import { useGuidanceStore } from '@/lib/smart-routing/guidance-store';
import {
  trackQuery,
  recordRecentService,
  getRecentServices,
  getWeeklyStats,
  type RecentService,
} from '@/lib/smart-routing/telemetry';

const ICONS: Record<string, LucideIcon> = {
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

const CHIPS: { mr: string; en: string; q: string }[] = [
  { mr: 'पाणीपट्टी भरा', en: 'Pay water bill', q: 'पाणीपट्टी भरा' },
  { mr: 'कर भरा', en: 'Pay tax', q: 'कर भरा' },
  { mr: 'जन्म दाखला', en: 'Birth certificate', q: 'जन्म दाखला' },
  { mr: 'तक्रार नोंदवा', en: 'File a complaint', q: 'तक्रार नोंदवा' },
  { mr: 'पाणी येत नाही', en: 'No water', q: 'पाणी येत नाही' },
  { mr: 'व्यापार परवाना', en: 'Trade license', q: 'व्यापार परवाना' },
];

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function SmartSearchSection() {
  const { locale } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [recentServices, setRecentServices] = useState<RecentService[]>([]);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const startGuidance = useGuidanceStore((s) => s.startGuidance);
  const recognitionRef = useRef<any>(null);

  const isMr = locale === 'mr';
  const result = useMemo(() => (query.trim() ? classify(query) : null), [query]);

  useEffect(() => {
    setMounted(true);
    setRecentServices(getRecentServices());
    const stats = getWeeklyStats();
    setWeeklyCount(stats.selfServedCount + stats.routedCount);
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    setVoiceSupported(!!SR);
  }, []);

  // Track query after 800ms debounce
  useEffect(() => {
    if (!query.trim() || !result) return;
    const t = setTimeout(() => {
      trackQuery(query, result.status, result.matches[0]?.service.id);
    }, 800);
    return () => clearTimeout(t);
  }, [query, result]);

  // D1 · Voice input
  const toggleVoice = useCallback(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SR();
    recognition.lang = isMr ? 'mr-IN' : 'en-IN';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setQuery(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
    setIsListening(true);
    inputRef.current?.focus();
  }, [isListening, isMr]);

  function launch(service: ServiceEntry) {
    if (service.stepsMr && service.stepsMr.length > 0) {
      startGuidance({
        serviceId: service.id,
        titleMr: service.titleMr,
        titleEn: service.titleEn,
        stepsMr: service.stepsMr,
        stepsEn: service.stepsEn ?? service.stepsMr,
        stepDetails: service.stepDetails,
      });
    }
    recordRecentService({
      serviceId: service.id,
      titleMr: service.titleMr,
      titleEn: service.titleEn,
      route: service.route,
      iconKey: service.iconKey,
      ts: Date.now(),
    });
    setRecentServices(getRecentServices());
    router.push(service.route);
  }

  // H2 · Keyboard navigation
  function onInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && result?.status === 'confident') {
      launch(result.matches[0].service);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      chipRefs.current[0]?.focus();
    }
  }

  function onChipKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, idx: number, total: number) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      chipRefs.current[(idx + 1) % total]?.focus();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx === 0) inputRef.current?.focus();
      else chipRefs.current[idx - 1]?.focus();
    }
    if (e.key === 'Escape') inputRef.current?.focus();
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

          {/* H3 · Weekly self-served counter */}
          {mounted && weeklyCount > 0 && (
            <div className="mb-4 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 ring-1 ring-green-200">
                <TrendingUp size={14} className="text-green-600" />
                <span className="text-xs font-semibold text-green-700">
                  {isMr
                    ? `या आठवड्यात ${weeklyCount} नागरिकांना थेट सेवा मिळाली`
                    : `${weeklyCount} citizens self-served this week`}
                </span>
              </div>
            </div>
          )}

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
                onKeyDown={onInputKeyDown}
                aria-label={isMr ? 'सेवा शोधा' : 'Search services'}
                aria-describedby="search-hint"
                placeholder={
                  isMr
                    ? 'उदा. "पाणीपट्टी भरा", "जन्म दाखला", "पाणी येत नाही"...'
                    : 'e.g. "pay water bill", "birth certificate", "no water"...'
                }
                className="min-h-[48px] w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  aria-label={isMr ? 'साफ करा' : 'Clear'}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}

              {/* D1 · Voice */}
              {voiceSupported ? (
                <button
                  onClick={toggleVoice}
                  aria-label={isListening ? (isMr ? 'थांबा' : 'Stop') : (isMr ? 'आवाजाने शोधा' : 'Voice search')}
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition',
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'text-gray-400 hover:bg-primary-50 hover:text-primary-600'
                  )}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              ) : (
                <span title={isMr ? 'आवाज (उपलब्ध नाही)' : 'Voice (unavailable)'} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-200 cursor-not-allowed">
                  <Mic size={18} />
                </span>
              )}

              <span title={isMr ? 'फोटो (लवकरच)' : 'Photo (coming soon)'} className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-200 cursor-not-allowed">
                <Camera size={18} />
              </span>
            </div>
          </div>

          <p id="search-hint" className="sr-only">
            {isMr ? 'खाली बाणाने चिप्सवर जा. Enter दाबून थेट जा.' : 'Arrow down to navigate chips. Enter to go directly.'}
          </p>

          {/* Seeded chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2" role="list" aria-label={isMr ? 'लोकप्रिय शोध' : 'Popular searches'}>
            <span className="text-xs font-medium text-gray-500">{isMr ? 'लोकप्रिय:' : 'Popular:'}</span>
            {CHIPS.map((chip, idx) => (
              <button
                key={chip.q}
                ref={(el) => { chipRefs.current[idx] = el; }}
                role="listitem"
                onClick={() => { setQuery(chip.q); inputRef.current?.focus(); }}
                onKeyDown={(e) => onChipKeyDown(e, idx, CHIPS.length)}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                {isMr ? chip.mr : chip.en}
              </button>
            ))}
          </div>

          {/* E3 · Recent services */}
          {mounted && !query && recentServices.length > 0 && (
            <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-4">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <Clock size={13} />
                {isMr ? 'अलीकडे वापरलेल्या सेवा' : 'Recently used'}
              </p>
              <div className="flex flex-wrap gap-2">
                {recentServices.map((s) => {
                  const Icon = ICONS[s.iconKey] ?? LayoutGrid;
                  return (
                    <button
                      key={s.serviceId}
                      onClick={() => router.push(s.route)}
                      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <Icon size={14} />
                      {isMr ? s.titleMr : s.titleEn}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Voice listening state */}
          {isListening && (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-red-600 font-medium">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              {isMr ? 'ऐकत आहे... बोला' : 'Listening… speak now'}
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="mt-5">
              {result.status === 'none' && (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center">
                  <p className="mb-3 text-gray-700">
                    {isMr ? 'थेट सेवा सापडली नाही. हे प्रयत्न करा:' : "Couldn't match that directly. Try these:"}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/services" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700">
                      {isMr ? 'सर्व सेवा पहा' : 'View all services'}<ArrowRight size={16} />
                    </Link>
                    <Link href="/complaints/new" className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-200">
                      {isMr ? 'तक्रार नोंदवा' : 'File a complaint'}
                    </Link>
                  </div>
                </div>
              )}

              {result.status === 'confident' && (
                <div className="space-y-3">
                  <ConfidentCard
                    service={result.matches[0].service}
                    isMr={isMr} primary={primary} secondary={secondary} steps={steps}
                    Icon={ICONS[result.matches[0].service.iconKey] ?? LayoutGrid}
                    onLaunch={launch}
                  />
                  {result.matches.length > 1 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-2">
                      <p className="px-2 py-1 text-xs font-medium text-gray-500">{isMr ? 'इतर पर्याय' : 'Other options'}</p>
                      {result.matches.slice(1).map((m) => (
                        <ResultRow key={m.service.id} service={m.service} primary={primary} secondary={secondary} Icon={ICONS[m.service.iconKey] ?? LayoutGrid} onLaunch={launch} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {result.status === 'ambiguous' && (
                <div className="rounded-2xl border border-gray-200 bg-white p-2">
                  <p className="px-2 py-2 text-sm font-semibold text-gray-700">{isMr ? 'तुम्हाला यापैकी काय हवं आहे?' : 'Which one did you mean?'}</p>
                  {result.matches.map((m) => (
                    <ResultRow key={m.service.id} service={m.service} primary={primary} secondary={secondary} Icon={ICONS[m.service.iconKey] ?? LayoutGrid} onLaunch={launch} />
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

function ConfidentCard({ service, isMr, primary, secondary, steps, Icon, onLaunch }: {
  service: ServiceEntry; isMr: boolean;
  primary: (s: ServiceEntry) => string; secondary: (s: ServiceEntry) => string;
  steps: (s: ServiceEntry) => string[] | undefined;
  Icon: LucideIcon;
  onLaunch: (service: ServiceEntry) => void;
}) {
  const stepList = steps(service);
  return (
    <button onClick={() => onLaunch(service)} className="group block w-full rounded-2xl border-2 border-primary-500 bg-primary-50/50 p-4 text-left transition hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-400">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white"><Icon size={22} /></div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-bold text-gray-900">{primary(service)}</div>
          <div className="text-sm text-gray-500">{secondary(service)}</div>
        </div>
        <span className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl bg-primary-600 px-4 text-sm font-bold text-white group-hover:bg-primary-700">
          {isMr ? 'सुरू करा' : 'Start'}<ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
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

function ResultRow({ service, primary, secondary, Icon, onLaunch }: {
  service: ServiceEntry;
  primary: (s: ServiceEntry) => string; secondary: (s: ServiceEntry) => string;
  Icon: LucideIcon;
  onLaunch: (service: ServiceEntry) => void;
}) {
  return (
    <button onClick={() => onLaunch(service)} className={cn('flex min-h-[56px] w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400')}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600"><Icon size={18} /></div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold text-gray-900">{primary(service)}</div>
        <div className="truncate text-sm text-gray-500">{secondary(service)}</div>
      </div>
      <ArrowRight size={16} className="shrink-0 text-gray-300" />
    </button>
  );
}
