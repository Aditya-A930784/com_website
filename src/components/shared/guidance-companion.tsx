'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp, X,
  ListChecks, PartyPopper, Volume2, VolumeX,
  HelpCircle, Info, Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useGuidanceStore } from '@/lib/smart-routing/guidance-store';
import { trackStep, trackFAQOpen } from '@/lib/smart-routing/telemetry';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function GuidanceCompanion() {
  const { locale } = useTranslation();
  const isMr = locale === 'mr';
  const pathname = usePathname();

  const {
    activeServiceId,
    titleMr, titleEn,
    stepsMr, stepsEn, stepDetails,
    currentStep,
    isMinimized,
    completeStep,
    minimize, expand, dismiss,
  } = useGuidanceStore();

  const [mounted, setMounted] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [ttsSupported, setTtsSupported] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const prevStepRef = useRef<number>(-99);
  const prevPathRef = useRef<string>('');

  useEffect(() => {
    setMounted(true);
    setTtsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  // E2 · Route-aware auto-advance
  useEffect(() => {
    if (!activeServiceId || currentStep < 0) return;
    if (prevPathRef.current && prevPathRef.current !== pathname) {
      completeStep();
      trackStep(activeServiceId, currentStep, true);
    }
    prevPathRef.current = pathname;
  }, [pathname, activeServiceId, currentStep, completeStep]);

  // Reset help panel and FAQ selection when step changes
  useEffect(() => {
    setHelpOpen(false);
    setOpenFAQ(null);
  }, [currentStep]);

  // E1 · TTS
  useEffect(() => {
    if (!mounted || !ttsEnabled || !ttsSupported) return;
    if (!activeServiceId || currentStep < 0) return;
    if (prevStepRef.current === currentStep) return;
    prevStepRef.current = currentStep;

    const steps = isMr ? stepsMr : stepsEn;
    const text = steps[currentStep];
    if (!text) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = isMr ? 'mr-IN' : 'en-IN';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }, [currentStep, isMr, stepsMr, stepsEn, activeServiceId, ttsEnabled, ttsSupported, mounted]);

  // Auto-dismiss after complete
  useEffect(() => {
    if (currentStep === -1) {
      const t = setTimeout(() => dismiss(), 3000);
      return () => clearTimeout(t);
    }
  }, [currentStep, dismiss]);

  function handleCompleteStep() {
    if (activeServiceId && currentStep >= 0) trackStep(activeServiceId, currentStep, true);
    completeStep();
  }

  function handleFAQClick(idx: number) {
    if (!activeServiceId) return;
    if (openFAQ === idx) {
      setOpenFAQ(null);
      return;
    }
    setOpenFAQ(idx);
    trackFAQOpen(activeServiceId, currentStep, idx);
  }

  if (!mounted || !activeServiceId) return null;

  const steps = isMr ? stepsMr : stepsEn;
  const title = isMr ? titleMr : titleEn;
  const isCompleted = currentStep === -1;
  const activeStepDetail = stepDetails && currentStep >= 0 ? stepDetails[currentStep] : null;
  const hasHelp = !!activeStepDetail;

  // ── Minimized ──────────────────────────────────────────────────────────────
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

  // ── Completed ──────────────────────────────────────────────────────────────
  if (isCompleted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-72 rounded-2xl bg-green-600 p-5 text-white shadow-2xl">
        <div className="flex items-center gap-3">
          <PartyPopper size={28} />
          <div>
            <div className="font-bold text-base">{isMr ? 'पूर्ण झाले!' : 'All done!'}</div>
            <div className="text-sm text-white/80">{isMr ? 'सर्व पायऱ्या पूर्ण झाल्या.' : 'All steps completed.'}</div>
          </div>
        </div>
      </div>
    );
  }

  // ── Active panel ───────────────────────────────────────────────────────────
  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-32px)] rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 max-h-[85vh] flex flex-col"
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

        {ttsSupported && (
          <button
            onClick={() => setTtsEnabled((v) => !v)}
            aria-label={ttsEnabled ? (isMr ? 'आवाज बंद' : 'Mute') : (isMr ? 'आवाज चालू' : 'Unmute')}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/70 hover:bg-white/15 hover:text-white transition"
          >
            {ttsEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        )}

        <button onClick={minimize} aria-label={isMr ? 'लहान करा' : 'Minimize'} className="flex h-7 w-7 items-center justify-center rounded-lg text-white/70 hover:bg-white/15 hover:text-white transition">
          <ChevronDown size={16} />
        </button>
        <button onClick={dismiss} aria-label={isMr ? 'बंद करा' : 'Close'} className="flex h-7 w-7 items-center justify-center rounded-lg text-white/70 hover:bg-white/15 hover:text-white transition">
          <X size={16} />
        </button>
      </div>

      {/* Scroll body */}
      <div className="overflow-y-auto flex-1">
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

        {/* Active step: help snippet + hint + Ask/FAQ toggle */}
        {activeStepDetail && (
          <div className="mx-4 mb-3 rounded-xl border border-primary-100 bg-primary-50/40 p-3 space-y-2">
            {(activeStepDetail.helpMr || activeStepDetail.helpEn) && (
              <p className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed">
                <Info size={14} className="mt-0.5 shrink-0 text-primary-600" />
                <span>{isMr ? activeStepDetail.helpMr : activeStepDetail.helpEn}</span>
              </p>
            )}
            {(activeStepDetail.hintMr || activeStepDetail.hintEn) && (
              <p className="flex items-start gap-2 text-xs text-amber-700 leading-relaxed">
                <Lightbulb size={14} className="mt-0.5 shrink-0" />
                <span>{isMr ? activeStepDetail.hintMr : activeStepDetail.hintEn}</span>
              </p>
            )}
            {activeStepDetail.faqs && activeStepDetail.faqs.length > 0 && (
              <button
                onClick={() => setHelpOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-xs font-semibold text-primary-700 shadow-sm hover:bg-primary-50 transition"
                aria-expanded={helpOpen}
              >
                <span className="flex items-center gap-1.5">
                  <HelpCircle size={14} />
                  {isMr
                    ? `${activeStepDetail.faqs.length} सामान्य प्रश्न`
                    : `${activeStepDetail.faqs.length} common questions`}
                </span>
                <ChevronDown size={14} className={cn('transition-transform', helpOpen && 'rotate-180')} />
              </button>
            )}
          </div>
        )}

        {/* FAQ accordion (only when open + faqs exist) */}
        {helpOpen && activeStepDetail?.faqs && (
          <div className="mx-4 mb-3 space-y-2">
            {activeStepDetail.faqs.map((faq, i) => {
              const isOpen = openFAQ === i;
              return (
                <div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                  <button
                    onClick={() => handleFAQClick(i)}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="flex-1 leading-snug">{isMr ? faq.qMr : faq.qEn}</span>
                    <ChevronDown size={14} className={cn('shrink-0 text-gray-400 transition-transform', isOpen && 'rotate-180')} />
                  </button>
                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50 px-3 py-2.5 text-xs text-gray-700 leading-relaxed">
                      {isMr ? faq.aMr : faq.aEn}
                      {faq.sourceRef && (
                        <div className="mt-2 text-[10px] text-gray-400">
                          {isMr ? 'स्रोत: ' : 'Source: '}{faq.sourceRef}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mx-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-500"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-xs text-gray-400">
          {isMr ? `पायरी ${currentStep + 1} / ${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
        </p>
        <button
          onClick={handleCompleteStep}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-primary-600 px-4 text-sm font-bold text-white hover:bg-primary-700 transition"
        >
          {isMr ? 'पूर्ण झाले →' : 'Done →'}
        </button>
      </div>
    </div>
  );
}
