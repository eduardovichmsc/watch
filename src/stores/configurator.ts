import { create } from "zustand";

export interface PreselectedComponents {
	watchCase?: number | string;
	bezel?: number | string;
	dial?: number | string;
	strap?: number | string;
	hand?: number | string;
	secondHand?: number | string;
	gmtHand?: number | string;
}

interface ConfiguratorState {
	modelFromStoreId: number | string | null;
	componentsFromStore: PreselectedComponents | null;
	setPreselection: (
		modelId: number | string,
		components: PreselectedComponents
	) => void;
	setModelFromStore: (id: number | string) => void;
	clearPreselection: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
	modelFromStoreId: null,
	componentsFromStore: null,

	setPreselection: (modelId, components) =>
		set({
			modelFromStoreId: modelId,
			componentsFromStore: components,
		}),

	setModelFromStore: (id) =>
		set({
			modelFromStoreId: id,
			componentsFromStore: null,
		}),

	clearPreselection: () =>
		set({
			modelFromStoreId: null,
			componentsFromStore: null,
		}),
}));
