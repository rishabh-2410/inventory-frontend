import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const ONBOARDING_KEY = 'isOnboarded';

type OnboardingStore = {
  isOnboarded: boolean | null;
  hydrate: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  isOnboarded: null,

  hydrate: async () => {
    if (get().isOnboarded !== null) return;

    const value = await AsyncStorage.getItem(ONBOARDING_KEY);

    if (get().isOnboarded === true) return;

    set({ isOnboarded: value === 'true' });
  },

  completeOnboarding: async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    set({ isOnboarded: true });
  },
}));

export function useOnboardingStatus() {
  const isOnboarded = useOnboardingStore((state) => state.isOnboarded);

  useEffect(() => {
    useOnboardingStore.getState().hydrate();
  }, []);

  return isOnboarded;
}
