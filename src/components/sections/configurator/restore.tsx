// src/components/sections/configurator/restore.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, FilePlus } from "lucide-react";
import { useCursorStore } from "@/stores/cursor";

interface RestorePromptProps {
	isOpen: boolean;
	onContinue: () => void;
	onStartNew: () => void;
}

export const RestorePrompt = ({
	isOpen,
	onContinue,
	onStartNew,
}: RestorePromptProps) => {
	const { setVariant } = useCursorStore();

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 25 }}
						className="bg-white max-w-md w-full p-8 text-center">
						<History size={48} className="mx-auto text-slate-300 mb-6" />
						<h2 className="text-3xl font-light tracking-tighter text-black mb-2">
							Продолжить сессию?
						</h2>
						<p className="text-slate-600 mb-8">
							Мы сохранили вашу предыдущую конфигурацию. Хотите продолжить с
							того места, где остановились?
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<button
								onClick={onStartNew}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className="flex-1 h-14 flex items-center justify-center gap-2 border border-slate-300 text-black font-medium hover:bg-slate-50 transition-colors">
								<FilePlus size={18} />
								Начать заново
							</button>
							<button
								onClick={onContinue}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className="flex-1 h-14 bg-black text-white font-semibold hover:bg-zinc-800 transition-colors">
								Да, продолжить
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
