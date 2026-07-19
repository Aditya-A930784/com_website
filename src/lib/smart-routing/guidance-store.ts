import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GuidanceState {
  activeServiceId: string | null;
  titleMr: string;
  titleEn: string;
  steps: string[];          // labels for the current locale (set at start-time)
  stepsMr: string[];
  stepsEn: string[];
  currentStep: number;      // 0-indexed; -1 = completed
  isMinimized: boolean;
  // actions
  startGuidance: (params: {
    serviceId: string;
    titleMr: string;
    titleEn: string;
    stepsMr: string[];
    stepsEn: string[];
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
      currentStep: 0,
      isMinimized: false,

      startGuidance: ({ serviceId, titleMr, titleEn, stepsMr, stepsEn }) => {
        // Don't restart if already tracking the same service mid-flow
        if (get().activeServiceId === serviceId && get().currentStep >= 0) return;
        set({
          activeServiceId: serviceId,
          titleMr,
          titleEn,
          stepsMr,
          stepsEn,
          steps: stepsMr,
          currentStep: 0,
          isMinimized: false,
        });
      },

      completeStep: () => {
        const { currentStep, steps } = get();
        if (currentStep >= steps.length - 1) {
          // Last step done → mark completed
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
          currentStep: 0,
          isMinimized: false,
        }),
    }),
    {
      name: 'csmc-guidance',
      // Only persist the data fields, not the actions
      partialize: (state) => ({
        activeServiceId: state.activeServiceId,
        titleMr: state.titleMr,
        titleEn: state.titleEn,
        stepsMr: state.stepsMr,
        stepsEn: state.stepsEn,
        currentStep: state.currentStep,
        isMinimized: state.isMinimized,
      }),
    }
  )
);
