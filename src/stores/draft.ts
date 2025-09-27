// src/stores/draft-store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DraftState {
	lastConfigUrl: string | null;
	setLastConfigUrl: (url: string | null) => void;
	clearLastConfigUrl: () => void;
}

const DRAFT_STORAGE_KEY = "wotchmod-configurator-draft";

export const useDraftStore = create<DraftState>()(
	persist(
		(set) => ({
			lastConfigUrl: null,
			setLastConfigUrl: (url) => set({ lastConfigUrl: url }),
			clearLastConfigUrl: () => set({ lastConfigUrl: null }),
		}),
		{
			name: DRAFT_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
