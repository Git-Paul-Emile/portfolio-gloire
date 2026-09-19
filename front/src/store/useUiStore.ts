import { create } from 'zustand';

interface UiState {
  /** Menu de navigation en petit ecran. */
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
}

/**
 * Etat d'interface partage entre l'en-tete et la navigation mobile.
 * Volontairement minuscule : tout ce qui est local a un composant y reste.
 */
export const useUiStore = create<UiState>((set) => ({
  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
