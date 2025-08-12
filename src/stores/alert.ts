// src/stores/alert.ts
// @ts-nocheck
import { create } from "zustand";

export type AlertType = "success" | "error" | "info" | "warning";

interface AlertState {
	isOpen: boolean;
	message: string;
	type: AlertType;
	showAlert: (message: string, type: AlertType, duration?: number) => void;
	hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set, get) => ({
	isOpen: false,
	message: "",
	type: "info",

	showAlert: (message, type, duration = 3000) => {
		if (get()._timeoutId) {
			clearTimeout(get()._timeoutId as number);
		}

		set({ isOpen: true, message, type });

		const timeoutId = setTimeout(() => {
			get().hideAlert();
		}, duration);

		set({ _timeoutId: timeoutId } as any);
	},

	hideAlert: () => {
		if (get()._timeoutId) {
			clearTimeout(get()._timeoutId as number);
		}
		set({ isOpen: false, _timeoutId: null } as any);
	},

	_timeoutId: null,
}));
