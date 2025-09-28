// src/constants/z_index.ts

import { WatchSelection } from "@/types";

/**
 * Централизованная карта z-index для слоев предпросмотра часов.
 */
export const WATCH_PREVIEW_Z_INDEX = {
	dial: "z-12",
	customLogo: "z-13",
	strap: "z-20",
	watchCase: "z-21",
	bezel: "z-22",
	hand: "z-23",
	secondHand: "z-24",
	gmtHand: "z-25",
} as const;

export const SELECTION_KEY_MAP: { [key: string]: keyof WatchSelection } = {
	case: "watchCase",
	bezel: "bezel",
	dial: "dial",
	strap: "strap",
	hand: "hand",
	secondhand: "secondHand",
	gmthands: "gmtHand",
} as const;
