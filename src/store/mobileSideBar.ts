import { create } from "zustand";

export const useMobileSideBarStore = create((set) => ({
  isOpen: false,
  toggleIsOpen: () => set((state: any) => ({ isOpen: !state.isOpen })),
}));
