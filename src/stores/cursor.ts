import { create } from "zustand";

export type CursorVariant =
	| "default"
	| "link"
	| "text"
	| "drag"
	| "preview"
	| "heart"
	| "open";

interface CursorState {
	variant: CursorVariant;
	setVariant: (variant: CursorVariant) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
	variant: "default",
	setVariant: (variant) => set({ variant: variant }),
}));
