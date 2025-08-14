// src/constants/z_index.ts

import { WatchSelection } from "@/types";

/* Порядок от нижнего к верхнему:
 * - strap (ремешок)
 * - watchCase (корпус)
 * - dial (циферблат)
 * - customLogo (кастомный логотип)
 * - bezel (безель)
 * - hand (основные стрелки)
 * - secondHand (секундная стрелка)
 * - gmtHand (GMT-стрелка)
 */
export const WATCH_PREVIEW_Z_INDEX = {
	strap: "z-10",
	watchCase: "z-11",
	dial: "z-12",
	customLogo: "z-13",
	bezel: "z-14",
	hand: "z-15",
	secondHand: "z-16",
	gmtHand: "z-17",
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
