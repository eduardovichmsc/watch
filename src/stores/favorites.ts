// src/stores/favorites.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { WatchSelection, WatchType } from "@/types";

// Тип для готовой сборки из галереи
type FavoriteBuild = {
	type: "build";
	id: number | string;
	name: string;
	image: string;
	watch_type: WatchType;
};

// Тип для кастомной сборки из конфигуратора
type FavoriteCustom = {
	type: "custom";
	id: string;
	name: string;
	selection: WatchSelection;
	url: string;
	watch_type: WatchType;
};

export type FavoriteItem = FavoriteBuild | FavoriteCustom;

interface FavoritesState {
	favorites: FavoriteItem[];
	addFavorite: (item: FavoriteItem) => void;
	removeFavorite: (id: number | string) => void;
	isFavorite: (id: number | string) => boolean;
}

const FAVORITES_STORAGE_KEY = "wotchmod-favorites";

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],
			addFavorite: (item) =>
				set((state) => ({ favorites: [...state.favorites, item] })),
			removeFavorite: (id) =>
				set((state) => ({
					favorites: state.favorites.filter((item) => item.id !== id),
				})),
			isFavorite: (id) => get().favorites.some((item) => item.id === id),
		}),
		{
			name: FAVORITES_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
