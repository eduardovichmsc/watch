// app/components/configurator/preview_panel.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import type { WatchSelection, WatchType } from "@/types";
import { cn } from "@/lib/utils";

interface WatchPreviewPanelProps {
	isLoading: boolean;
	canShowPreview: boolean;
	selection: WatchSelection;
	selectedModel: WatchType | null;
	className?: string;
}

export function WatchPreviewPanel({
	isLoading,
	canShowPreview,
	selection,
	selectedModel,
	className,
}: WatchPreviewPanelProps) {
	return (
		<div className={cn(className)}>
			<div className="relative aspect-4/3 lg:aspect-square w-full">
				{/* Оверлей с лоадером */}
				<AnimatePresence>
					{isLoading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-none">
							<Loader2 className="w-10 h-10 animate-spin text-slate-700" />
						</motion.div>
					)}
				</AnimatePresence>

				{canShowPreview ? (
					Object.entries(selection).map(([partType, item]) => {
						const zIndexMap: { [key: string]: string } = {
							strap: "z-10",
							watchCase: "z-11",
							dial: "z-12",
							bezel: "z-13",
							hand: "z-14",
							secondHand: "z-15",
							gmtHand: "z-16",
						};
						return (
							<AnimatePresence key={partType}>
								{item && item.image && (
									<motion.img
										key={item.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										src={item.image}
										alt={item.name}
										className={`absolute inset-0 w-full h-full object-contain ${
											zIndexMap[partType] || "z-0"
										}`}
									/>
								)}
							</AnimatePresence>
						);
					})
				) : (
					// Заглушка
					<div className="w-full h-full bg-slate-50 flex items-center justify-center p-8">
						<p className="font-mono text-sm text-slate-400 text-center uppercase">
							Предпросмотр недоступен. <br /> Начните выбор компонентов.
						</p>
					</div>
				)}
			</div>

			{/* Информационная панель */}
			<div className="hidden lg:block mt-4 pt-4 lg:mt-6 lg:pt-6 border-t border-slate-200">
				<div className="flex justify-between items-baseline">
					<h3 className="text-lg lg:text-xl font-medium text-slate-900">
						{selectedModel?.name || "Ваша конфигурация"}
					</h3>
					<span className="font-mono text-xs lg:text-sm text-slate-400 text-right">
						{selectedModel
							? `MODEL - ${selectedModel.image
									?.split("/")
									.slice(4, 6)
									.join(" / ")
									.toUpperCase()}`
							: "CUSTOM BUILD"}
					</span>
				</div>
			</div>
		</div>
	);
}
