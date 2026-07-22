import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WorkflowStep } from './catalog';

export interface GuidanceState {
  activeServiceId: string | null;
  titleMr: string;
  titleEn: string;
  steps: string[];          // labels for the current locale (set at start-time)
  stepsMr: string[];
  stepsEn: string[];
  stepDetails: WorkflowStep[] | null; // rich per-step help/FAQs; null = simple checklist mode
  currentStep: number;      // 0-indexed; -1 = completed
  isMinimized: boolean;
  // actions
  startGuidance: (params: {
    serviceId: string;
    titleMr: string;
    titleEn: string;
    stepsMr: string[];
    stepsEn: string[];
    stepDetails?: WorkflowStep[];
  }) => void;
  completeStep: () => void;
  minimize: () => void;
  expand: () => void;
  dismiss: () => void;
}

export const useGuidanceStore = create<GuidanceState>()(
  persist(
    (set, get) => ({
      activeServiceId: null,
      titleMr: '',
      titleEn: '',
      steps: [],
      stepsMr: [],
      stepsEn: [],
      stepDetails: null,
      currentStep: 0,
      isMinimized: false,

      startGuidance: ({ serviceId, titleMr, titleEn, stepsMr, stepsEn, stepDetails }) => {
        // Don't restart if already tracking the same service mid-flow
        if (get().activeServiceId === serviceId && get().currentStep >= 0) return;
        set({
          activeServiceId: serviceId,
          titleMr,
          titleEn,
          stepsMr,
          stepsEn,
          stepDetails: stepDetails ?? null,
          steps: stepsMr,
          currentStep: 0,
          isMinimized: false,
        });
      },

      completeStep: () => {
        const { currentStep, steps } = get();
        if (currentStep >= steps.length - 1) {
          set({ currentStep: -1 });
        } else {
          set({ currentStep: currentStep + 1 });
        }
      },

      minimize: () => set({ isMinimized: true }),
      expand: () => set({ isMinimized: false }),

      dismiss: () =>
        set({
          activeServiceId: null,
          titleMr: '',
          titleEn: '',
          steps: [],
          stepsMr: [],
          stepsEn: [],
          stepDetails: null,
          currentStep: 0,
          isMinimized: false,
        }),
    }),
    {
      name: 'csmc-guidance',
      partialize: (state) => ({
        activeServiceId: state.activeServiceId,
        titleMr: state.titleMr,
        titleEn: state.titleEn,
        stepsMr: state.stepsMr,
        stepsEn: state.stepsEn,
        stepDetails: state.stepDetails,
        currentStep: state.currentStep,
        isMinimized: state.isMinimized,
      }),
    }
  )
);
