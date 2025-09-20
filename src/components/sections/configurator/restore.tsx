// src/components/sections/configurator/restore-prompt.tsx
"use client";

import { motion } from "framer-motion";
import { History, FilePlus } from "lucide-react";
import { useCursorStore } from "@/stores/cursor";

interface RestorePromptProps {
	onRestore: () => void;
	onStartNew: () => void;
}

export const RestorePrompt = ({
	onRestore,
	onStartNew,
}: RestorePromptProps) => {
	const { setVariant } = useCursorStore();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="bg-white max-w-md w-full p-8 text-center">
				<History size={48} className="mx-auto text-slate-300 mb-6" />
				<h2 className="text-3xl font-light tracking-tight text-black mb-3">
					Продолжить сессию?
				</h2>
				<p className="text-slate-600 mb-8">
					Мы сохранили вашу предыдущую конфигурацию. Хотите продолжить с того
					места, где остановились?
				</p>
				<div className="flex flex-col sm:flex-row gap-4">
					<button
						onClick={onRestore}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="flex-1 h-14 flex items-center justify-center bg-black text-white font-semibold hover:bg-zinc-800 transition-colors">
						Да, продолжить
					</button>
					<button
						onClick={onStartNew}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="flex-1 h-14 flex items-center justify-center border border-slate-300 text-black font-medium hover:bg-slate-50 transition-colors">
						Начать заново
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};
