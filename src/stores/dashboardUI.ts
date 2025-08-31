import { create } from "zustand";

type State = {
  jobModalOpen: boolean;
  openJobModal: () => void;
  closeJobModal: () => void;
  toggleJobModal: () => void;
};

export const useDashboardUIStore = create<State>((set) => ({
  jobModalOpen: false,
  openJobModal: () => set({ jobModalOpen: true }),
  closeJobModal: () => set({ jobModalOpen: false }),
  toggleJobModal: () => set((s) => ({ jobModalOpen: !s.jobModalOpen })),
}));
