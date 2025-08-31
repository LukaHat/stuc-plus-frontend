import { create } from "zustand";

type State = {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;
};

const useUIStore = create<State>((set) => ({
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  openMobileMenu: () => set({ mobileMenuOpen: true }),
}));

export default useUIStore;
