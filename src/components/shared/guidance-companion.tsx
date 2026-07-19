'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, X, ListChecks, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useGuidanceStore } from '@/lib/smart-routing/guidance-store';
import { useTranslation } from '@/lib/i18n/LanguageContext';

/**
 * GuidanceCompanion — floating persistent checklist.
 *
 * Mounts once in the public layout. Becomes visible when a citizen selects a
 * service from SmartSearchSection (which calls useGuidanceStore.startGuidance).
 * Survives page navigations via Zustand + localStorage.
 */
export default function GuidanceCompanion() {
  const { locale } = useTranslation();
  const isMr = locale === 'mr';

  const {
    activeServiceId,
    titleMr,
    titleEn,
    stepsMr,
    stepsEn,
    currentStep,
    isMinimized,
    completeStep,
    minimize,
    expand,
    dismiss,
  } = useGuidanceStore();

  // Avoid hydration mismatch — only render after mount (localStorage may differ from SSR)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Auto-dismiss 3s after completion
  useEffect(() => {
    if (currentStep === -1) {
      const t = setTimeout(() => dismiss(), 3000);
      return () => clearTimeout(t);
    }
  }, [currentStep, dismiss]);

  if (!mounted || !activeServiceId) return null;

  const steps = isMr ? stepsMr : stepsEn;
  const title = isMr ? titleMr : titleEn;
  const isCompleted = currentStep === -1;

  // ── Minimized tab ──────────────────────────────────────────────────────────
  if (isMinimized) {
    return (
      <button
        onClick={expand}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-primary-600 px-4 py-3 text-sm font-bold text-white shadow-xl hover:bg-primary-700 transition-all"
        aria-label={isMr ? 'मार्गदर्शन उघडा' : 'Open guidance'}
      >
        <ListChecks size={18} />
        <span className="max-w-[140px] truncate">{title}</span>
        <span className="rounded-full bg-white/25 px-2 py-0.5 text-xs">
          {isCompleted ? '✓' : `${currentStep + 1}/${steps.length}`}
        </span>
        <ChevronUp size={16} className="opacity-70" />
      </button>
    );
  }

  // ── Completed state ────────────────────────────────────────────────────────
  if (isCompleted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-72 rounded-2xl bg-green-600 p-5 text-white shadow-2xl animate-in slide-in-from-bottom-4">
        <div className="flex items-center gap-3">
          <PartyPopper size={28} />
          <div>
            <div className="font-bold text-base">
              {isMr ? 'पूर्ण झाले!' : 'All done!'}
            </div>
            <div className="text-sm text-white/80">
              {isMr ? 'सर्व पायऱ्या पूर्ण झाल्या.' : 'All steps completed.'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Active panel ───────────────────────────────────────────────────────────
  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200"
      role="complementary"
      aria-label={isMr ? 'मार्गदर्शन सहाय्यक' : 'Guidance companion'}
    >
      {/* Header */}
      <div className="flex items-center gap-2 rounded-t-2xl bg-primary-600 px-4 py-3">
        <ListChecks size={18} className="shrink-0 text-white" />
        <span className="flex-1 truncate text-sm font-bold text-white">{title}</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white/90">
          {currentStep + 1}/{steps.length}
        </span>
        <button
          onClick={minimize}
          aria-label={isMr ? 'लहान करा' : 'Minimize'}
          className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg text-white/70 hover:bg-white/15 hover:text-white transition"
        >
          <ChevronDown size={16} />
        </button>
        <button
          onClick={dismiss}
          aria-label={isMr ? 'बंद करा' : 'Close'}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/70 hover:bg-white/15 hover:text-white transition"
        >
          <X size={16} />
        </button>
      </div>

      {/* Step list */}
      <ol className="px-4 py-3 space-y-2">
        {steps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <li
              key={i}
              className={cn(
                'flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition',
                active && 'bg-primary-50 ring-1 ring-primary-200',
                done && 'opacity-60'
              )}
            >
              {done ? (
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-500" />
              ) : active ? (
                <div className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded-full border-2 border-primary-500 bg-primary-500" />
              ) : (
                <Circle size={18} className="mt-0.5 shrink-0 text-gray-300" />
              )}
              <span className={cn('leading-snug', active ? 'font-semibold text-gray-900' : 'text-gray-500')}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Progress bar */}
      <div className="mx-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-500"
          style={{ width: `${((currentStep) / steps.length) * 100}%` }}
        />
      </div>

      {/* Action footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-xs text-gray-400">
          {isMr
            ? `पायरी ${currentStep + 1} / ${steps.length}`
            : `Step ${currentStep + 1} of ${steps.length}`}
        </p>
        <button
          onClick={completeStep}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-primary-600 px-4 text-sm font-bold text-white hover:bg-primary-700 transition"
        >
          {isMr ? 'पूर्ण झाले →' : 'Done →'}
        </button>
      </div>
    </div>
  );
}
