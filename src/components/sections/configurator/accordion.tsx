// src/components/sections/configurator/accordion.tsx
"use client";

import { ChevronDown, MoveHorizontalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";
import { useCursorStore } from "@/stores/cursor";

type Item = {
	id: number | string;
	name: string;
	image: string | null;
	price?: string;
};

interface Props<T extends Item> {
	title: string;
	count?: number;
	selectedOptionName: string;
	isOpen: boolean;
	onToggle: () => void;
	items: T[];
	selectedItem: T | null;
	onSelect: (item: T) => void;
	disabled?: boolean;
	style?: {
		scale?: number;
		top?: number;
	};
	children?: React.ReactNode;
}

export function AccordionSection<T extends Item>({
	title,
	count = 0,
	selectedOptionName,
	isOpen,
	onToggle,
	items,
	selectedItem,
	onSelect,
	disabled = false,
	style,
	children,
}: Props<T>) {
	const { setVariant } = useCursorStore();
	const [api, setApi] = useState<CarouselApi>();
	const [canScroll, setCanScroll] = useState(false);

	useEffect(() => {
		if (!api) return;
		const checkScrollable = () => setCanScroll(api.canScrollNext());
		checkScrollable();
		api.on("reInit", checkScrollable);
		return () => {
			api.off("reInit", checkScrollable);
		};
	}, [api]);

	return (
		<div
			className={`px-2 border-b border-slate-200 ${
				disabled ? "opacity-50" : ""
			}`}>
			<button
				onClick={onToggle}
				disabled={disabled}
				onMouseEnter={() => setVariant("link")}
				onMouseLeave={() => setVariant("default")}
				className="flex justify-between items-center w-full py-5 lg:pl-6 lg:py-6 text-left disabled:cursor-not-allowed">
				<div>
					<h3 className="text-lg font-medium text-slate-900">
						{title}
						{count > 0 && (
							<span className="ml-2 text-slate-400 font-mono text-sm">
								({count})
							</span>
						)}
					</h3>
					<p className="font-mono text-sm uppercase tracking-wider text-slate-500 mt-1">
						{selectedOptionName}
					</p>
				</div>
				<motion.div animate={{ rotate: isOpen && !disabled ? 180 : 0 }}>
					<ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
				</motion.div>
			</button>

			<AnimatePresence initial={false}>
				{isOpen && !disabled && (
					<motion.section
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: "auto" },
							collapsed: { opacity: 0, height: 0 },
						}}
						transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
						className="overflow-hidden">
						{/* Условный рендеринг */}
						<div className="pb-6 px-2 lg:px-6 lg:pr-0">
							{children ? (
								// Если есть `children`, рендерим `children`
								children
							) : items.length === 0 ? (
								// Если массив `items` пуст, показываем сообщение
								<p className="text-sm text-center text-slate-500 font-mono">
									НЕТ ДОСТУПНЫХ ОПЦИЙ
								</p>
							) : (
								// Если сверху не сработало, рендерим карусель
								<div
									onMouseEnter={() => setVariant("drag")}
									onMouseLeave={() => setVariant("link")}>
									<Carousel
										setApi={setApi}
										opts={{ align: "start", dragFree: true }}
										className="w-full select-none">
										<CarouselContent className="-ml-2">
											{items.map((item) => (
												<CarouselItem
													key={item.id}
													className="pl-2 basis-1/3 sm:basis-1/4 md:basis-1/5">
													<button
														onClick={() => onSelect(item)}
														onMouseEnter={() => setVariant("link")}
														onMouseLeave={() => setVariant("drag")}
														className={`w-full block text-left p-1 lg:p-2 border-2 rounded-none transition-colors ${
															selectedItem?.id === item.id
																? "border-black"
																: "border-slate-200 hover:border-slate-400"
														}`}>
														<div className="w-full aspect-square mb-2 relative overflow-hidden bg-white">
															<div
																className="absolute inset-0 flex items-center justify-center"
																style={{
																	transform: `scale(${
																		(style?.scale ?? 100) / 100
																	})`,
																	top: `${style?.top ?? 0}%`,
																}}>
																{item.image ? (
																	<img
																		src={item.image}
																		alt={item.name}
																		className="h-full w-full object-cover"
																	/>
																) : (
																	<span className="text-xs text-slate-400">
																		No Img
																	</span>
																)}
															</div>
														</div>
														<p className="font-medium text-xs text-slate-800 truncate">
															{item.name}
														</p>
														{item.price && parseFloat(item.price) > 0 && (
															<p className="text-xs text-slate-500">
																+{" "}
																{parseFloat(item.price).toLocaleString("ru-RU")}
															</p>
														)}
													</button>
												</CarouselItem>
											))}
										</CarouselContent>
									</Carousel>
								</div>
							)}
						</div>

						{/* Подсказка о прокрутке (показывается, только если есть куда крутить) */}
						{!children && canScroll && (
							<div className="flex items-center justify-center text-xs text-slate-500 font-mono mb-6">
								<MoveHorizontalIcon className="size-4 mr-2" />
								<span>ПРОКРУТИТЕ ДЛЯ ПРОСМОТРА</span>
							</div>
						)}
					</motion.section>
				)}
			</AnimatePresence>
		</div>
	);
}
