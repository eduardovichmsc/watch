// src/components/sections/configurator/preview_panel.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRef, useState, useMemo } from "react";
import type { WatchSelection, WatchType } from "@/types";
import { cn } from "@/lib/utils";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { WATCH_PREVIEW_Z_INDEX } from "@/constants";
import type { CustomLogoState } from "@/hooks/useConfigurator";
import { TransformControls } from "./logo/transform_controls";

interface Props {
	isLoading: boolean;
	selection: WatchSelection;
	selectedModel: WatchType | null;
	className?: string;
	customLogo: CustomLogoState;
	onLogoRemove: () => void;
	onLogoUpdate: (transform: Partial<CustomLogoState>) => void;
}

export function WatchPreviewPanel({
	isLoading,
	selection,
	selectedModel,
	className,
	customLogo,
	onLogoRemove,
	onLogoUpdate,
}: Props) {
	const previewContainerRef = useRef<HTMLDivElement>(null);
	const dimensions = useResizeObserver(previewContainerRef);
	const [isLogoSelected, setIsLogoSelected] = useState(false);

	// Рассчитываем реальный размер логотипа в пикселях
	const LOGO_BASE_SIZE_PERCENT = 0.3;
	const logoBaseSize = dimensions
		? dimensions.width * LOGO_BASE_SIZE_PERCENT
		: 0;
	const currentLogoSize = logoBaseSize * customLogo.scale;

	// Динамически рассчитываем границы для перетаскивания, чтобы края логотипа не выходили за пределы
	const dragConstraints = useMemo(() => {
		if (!dimensions || !currentLogoSize) return false;

		const halfLogo = currentLogoSize / 2;
		return {
			left: -(dimensions.width / 2) + halfLogo,
			right: dimensions.width / 2 - halfLogo,
			top: -(dimensions.height / 2) + halfLogo,
			bottom: dimensions.height / 2 - halfLogo,
		};
	}, [dimensions, currentLogoSize]);

	// Определяем, что показывать в превью
	const isSelectionEmpty = useMemo(
		() => Object.values(selection).every((part) => !part?.image),
		[selection]
	);
	const canShowPreview = !isSelectionEmpty || !!selectedModel?.image;

	return (
		<div
			className={cn(className)}
			onClick={(e) => {
				if ((e.target as HTMLElement).closest(".logo-draggable") === null) {
					setIsLogoSelected(false);
				}
			}}>
			<div
				ref={previewContainerRef}
				className="relative aspect-4/3 lg:aspect-square w-full overflow-hidden">
				{" "}
				{/* Добавлен overflow-hidden для надежности */}
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
						{/* Рендеринг компонентов часов или базовой модели */}
						{!isSelectionEmpty
							? Object.entries(selection).map(([partType, item]) => {
									const isAboveLogoLayer = [
										"bezel",
										"hand",
										"secondHand",
										"gmtHand",
									].includes(partType);
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
													className={cn(
														"absolute inset-0 w-full h-full object-contain pointer-events-none",
														WATCH_PREVIEW_Z_INDEX[
															partType as keyof typeof WATCH_PREVIEW_Z_INDEX
														] || "z-0",
														isAboveLogoLayer && "pointer-events-none"
													)}
												/>
											)}
										</AnimatePresence>
									);
							  })
							: selectedModel?.image && (
									<motion.img
										key={selectedModel.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										src={selectedModel.image}
										alt={selectedModel.name}
										className="absolute inset-0 w-full h-full object-contain z-10"
									/>
							  )}

						{/* Рендеринг кастомного логотипа */}
						<AnimatePresence>
							{customLogo.image && (
								<motion.div
									className={cn(
										"logo-draggable absolute top-1/2 left-1/2 -ml-8 cursor-grab active:cursor-grabbing",
										WATCH_PREVIEW_Z_INDEX.customLogo
									)}
									drag
									dragConstraints={dragConstraints}
									dragMomentum={false}
									onDragEnd={(event, info) => {
										const containerRect =
											previewContainerRef.current?.getBoundingClientRect();
										if (!containerRect) return;
										const newX =
											((info.point.x - containerRect.left) /
												containerRect.width -
												0.5) *
											100;
										const newY =
											((info.point.y - containerRect.top) /
												containerRect.height -
												0.5) *
											100;
										onLogoUpdate({
											x: parseFloat(newX.toFixed(2)),
											y: parseFloat(newY.toFixed(2)),
										});
									}}
									onTap={() => setIsLogoSelected(true)}
									animate={{
										x: `${customLogo.x}%`,
										y: `${customLogo.y}%`,
										rotate: customLogo.rotation,
									}}
									style={{
										width: currentLogoSize,
										height: currentLogoSize,
									}}>
									<img
										src={customLogo.image}
										alt="Custom Logo"
										className="w-full h-full object-contain pointer-events-none select-none"
									/>
									<AnimatePresence>
										{isLogoSelected && (
											<TransformControls
												onRemove={() => {
													setIsLogoSelected(false);
													onLogoRemove();
												}}
												onScale={(e, info) => {
													const delta = info.delta.x + info.delta.y;
													const newScale = customLogo.scale + delta * 0.003;
													onLogoUpdate({
														scale: parseFloat(
															Math.max(0.05, Math.min(newScale, 1.0)).toFixed(3)
														),
													});
												}}
												onRotate={(e, info) => {
													onLogoUpdate({
														rotation: customLogo.rotation + info.delta.x * 0.5,
													});
												}}
											/>
										)}
									</AnimatePresence>
								</motion.div>
							)}
						</AnimatePresence>
					</>
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
