// src/stores/configurator.ts
import { create } from "zustand";

interface ConfiguratorState {
	modelFromStoreId: number | string | null;
	setModelFromStore: (id: number | string) => void;
	clearModelFromStore: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
	modelFromStoreId: null,
	setModelFromStore: (id) => set({ modelFromStoreId: id }),
	clearModelFromStore: () => set({ modelFromStoreId: null }),
}));
