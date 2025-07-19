// src/components/ui/global-alert.tsx
"use client";

import { useAlertStore } from "@/stores/alert";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { clsx } from "clsx";

const alertConfig = {
	success: {
		icon: <CheckCircle2 size={24} />,
		bgClass: "bg-emerald-600/70",
	},
	error: {
		icon: <XCircle size={24} />,
		bgClass: "bg-red-500",
	},
	info: {
		icon: <Info size={24} />,
		bgClass: "bg-blue-500",
	},
	warning: {
		icon: <AlertTriangle size={24} />,
		bgClass: "bg-amber-500",
	},
};

export const GlobalAlert = () => {
	const { isOpen, message, type, hideAlert } = useAlertStore();
	const { icon, bgClass } = alertConfig[type];

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -100, opacity: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] backdrop-blur-xs">
					<div
						className={clsx(
							"flex items-center gap-4 text-white p-4 shadow-2xl min-w-[320px] max-w-md",
							bgClass
						)}>
						<div className="flex-shrink-0">{icon}</div>
						<p className="flex-grow font-medium">{message}</p>
						<button
							onClick={hideAlert}
							className="p-1 rounded-full hover:bg-white/20 transition-colors"
							aria-label="Закрыть уведомление">
							<X size={20} />
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
