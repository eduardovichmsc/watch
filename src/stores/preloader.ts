import { create } from "zustand";

interface PreloaderState {
	isFinished: boolean;
	finish: () => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
	isFinished: false,
	finish: () => set({ isFinished: true }),
}));
