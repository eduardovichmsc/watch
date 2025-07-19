// src/stores/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WatchSelection, WatchType } from "@/types";

export interface CartItem {
	id: string;
	href: string;
	model: WatchType;
	selection: WatchSelection;
	totalPrice: number;
}

interface CartState {
	items: CartItem[];
	addToCart: (
		model: WatchType,
		href: string,
		selection: WatchSelection,
		totalPrice: number
	) => void;
	removeFromCart: (itemId: string) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartState>()(
	// `persist` оборачивает наше хранилище, чтобы оно сохранялось в localStorage
	persist(
		(set) => ({
			items: [],

			addToCart: (model, href, selection, totalPrice) => {
				const newItem: CartItem = {
					id: `watch-${Date.now()}`,
					href,
					model,
					selection,
					totalPrice,
				};

				set((state) => ({
					items: [...state.items, newItem],
				}));
			},

			removeFromCart: (itemId) => {
				set((state) => ({
					items: state.items.filter((item) => item.id !== itemId),
				}));
			},

			clearCart: () => {
				set({ items: [] });
			},
		}),
		{
			name: "watch-cart-storage",
		}
	)
);
