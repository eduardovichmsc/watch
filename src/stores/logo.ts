// src/stores/logo.ts
import { create } from "zustand";

interface LogoState {
	isSelected: boolean;
	setSelected: (selected: boolean) => void;
	toggleSelected: () => void;
}

export const useLogoStore = create<LogoState>((set) => ({
	isSelected: false,
	setSelected: (selected) => set({ isSelected: selected }),
	toggleSelected: () => set((state) => ({ isSelected: !state.isSelected })),
}));
