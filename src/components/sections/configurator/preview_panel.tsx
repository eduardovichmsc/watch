// src/components/sections/configurator/preview_panel.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRef } from "react"; // Импортируем useRef
import type { WatchSelection, WatchType } from "@/types";
import { cn } from "@/lib/utils";
import type { CustomLogoState } from "@/hooks/useConfigurator";
import { useResizeObserver } from "@/hooks/useResizeObserver"; // Импортируем ваш хук

interface Props {
	isLoading: boolean;
	canShowPreview: boolean;
	selection: WatchSelection;
	selectedModel: WatchType | null;
	className?: string;
	customLogo: CustomLogoState;
}

export function WatchPreviewPanel({
	isLoading,
	canShowPreview,
	selection,
	selectedModel,
	className,
	customLogo,
}: Props) {
	// Хуки
	const previewContainerRef = useRef<HTMLDivElement>(null);
	const dimensions = useResizeObserver(previewContainerRef);

	// Дефолтные настройки логотипа
	const LOGO_BASE_SIZE_PERCENT = 0.3;
	const logoSize = dimensions ? dimensions.width * LOGO_BASE_SIZE_PERCENT : 0;

	return (
		<div className={cn(className)}>
			<div
				ref={previewContainerRef}
				className="relative aspect-4/3 lg:aspect-square w-full">
				{/* Оверлей с лоадером */}
				<AnimatePresence>
					{isLoading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-sm">
							<Loader2 className="w-10 h-10 animate-spin text-slate-700" />
						</motion.div>
					)}
				</AnimatePresence>

				{canShowPreview ? (
					<>
						{/* Рендеринг компонентов часов */}
						{Object.entries(selection).map(([partType, item]) => {
							const zIndexMap: { [key: string]: string } = {
								strap: "z-10",
								watchCase: "z-11",
								dial: "z-12",
								// z-13 = логотип
								bezel: "z-14",
								hand: "z-15",
								secondHand: "z-16",
								gmtHand: "z-17",
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
						})}

						{/* Рендеринг кастомного логотипа */}
						<AnimatePresence>
							{customLogo.image && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									className="absolute inset-0 z-[13] flex items-center justify-center pointer-events-none">
									<motion.div
										animate={{
											scale: customLogo.scale,
											x: `${customLogo.x}%`,
											y: `${customLogo.y}%`,
										}}
										className="relative">
										<img
											src={customLogo.image}
											alt="Custom Logo"
											style={{
												width: `${logoSize}px`,
												height: "auto",
											}}
											className="object-contain"
										/>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</>
				) : (
					// Заглушка, если предпросмотр недоступен
					<div
						ref={previewContainerRef}
						className="w-full h-full bg-slate-50 flex items-center justify-center p-8">
						<p className="font-mono text-sm text-slate-400 text-center uppercase">
							Предпросмотр недоступен. <br /> Начните выбор компонентов.
						</p>
					</div>
				)}
			</div>

			{/* Информационная панель под превью */}
			<div className="hidden lg:block mt-4 pt-4 lg:mt-6 lg:pt-6 border-t border-slate-200">
				<div className="flex justify-between items-baseline">
					<h3 className="text-lg lg:text-xl font-medium text-slate-900">
						{selectedModel?.name || "Ваша конфигурация"}
					</h3>
					<span className="font-mono text-xs lg:text-sm text-slate-400 text-right">
						{selectedModel
							? `MODEL - ${selectedModel.image
									?.split("/")
									.slice(2, 5)
									.join(" / ")
									.toUpperCase()}`
							: "CUSTOM BUILD"}
					</span>
				</div>
			</div>
		</div>
	);
}
