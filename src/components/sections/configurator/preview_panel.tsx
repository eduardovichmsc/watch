// src/components/sections/configurator/preview_panel.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRef, useMemo } from "react";
import type { WatchSelection, WatchType } from "@/types";
import { cn } from "@/lib/utils";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { WATCH_PREVIEW_Z_INDEX } from "@/constants/maps";
import { CustomLogoState } from "@/hooks/useConfigurator";

interface Props {
	isLoading: boolean;
	canShowPreview: boolean;
	selection: WatchSelection;
	selectedModel: WatchType | null;
	className?: string;
	customLogo: CustomLogoState; // <-- Раскомментируем проп
}

export function WatchPreviewPanel({
	isLoading,
	canShowPreview,
	selection,
	selectedModel,
	className,
	customLogo, // <-- Получаем проп
}: Props) {
	const previewContainerRef = useRef<HTMLDivElement>(null);
	const dimensions = useResizeObserver(previewContainerRef);

	const LOGO_BASE_SIZE_PERCENT = 0.3;
	const logoSize = dimensions ? dimensions.width * LOGO_BASE_SIZE_PERCENT : 0;

	const isSelectionEmpty = useMemo(() => {
		return Object.values(selection).every((part) => !part?.image);
	}, [selection]);

	const showSelectionParts = !isSelectionEmpty;
	const showBaseModelImage = isSelectionEmpty && !!selectedModel?.image;

	return (
		<div className={cn(className)}>
			<div
				ref={previewContainerRef}
				className="relative aspect-4/3 lg:aspect-square w-full">
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

				{showSelectionParts ? (
					<>
						{/* Рендеринг компонентов часов */}
						{Object.entries(selection).map(([partType, item]) => (
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
										className={cn(
											"absolute inset-0 w-full h-full object-contain",
											WATCH_PREVIEW_Z_INDEX[
												partType as keyof typeof WATCH_PREVIEW_Z_INDEX
											] || "z-0"
										)}
									/>
								)}
							</AnimatePresence>
						))}

						{/* --- РЕНДЕРИНГ КАСТОМНОГО ЛОГОТИПА --- */}
						<AnimatePresence>
							{customLogo.image && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ type: "spring", stiffness: 300, damping: 25 }}
									className={`absolute inset-0 flex items-center justify-center pointer-events-none ${WATCH_PREVIEW_Z_INDEX.customLogo}`}>
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
				) : showBaseModelImage ? (
					<motion.img
						key={selectedModel.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						src={selectedModel.image!}
						alt={selectedModel.name}
						className="absolute inset-0 w-full h-full object-contain z-10"
					/>
				) : (
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
