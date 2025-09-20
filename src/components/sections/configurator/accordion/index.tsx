// src/components/sections/configurator/accordion/index.tsx
"use client";

import { ChevronDown, MoveHorizontalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
	Carousel,
	CarouselContent,
	type CarouselApi,
} from "@/components/ui/carousel";
import { useCursorStore } from "@/stores";
import { AccordionItem } from "./item";
import { cn } from "@/lib/utils";

export type Item = {
	id: number | string;
	name: string;
	image: string | null;
	price?: string;
};

export type AccordionItemStyle = {
	scale?: number;
	top?: number;
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
	style?: AccordionItemStyle;
	children?: React.ReactNode;
	isLoading?: boolean;
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
	isLoading,
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
			className={cn(
				"mx-auto px-8 lg:pl-0 border-b border-slate-200",
				disabled ? "opacity-50" : "",
				isLoading ? "blur-xs" : ""
			)}>
			<button
				onClick={onToggle}
				disabled={disabled}
				className="flex justify-between items-center w-full py-6 lg:pl-6 text-left disabled:cursor-not-allowed">
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
						<div className="pb-6 px-2 lg:px-6 lg:pr-0">
							{children ? (
								children
							) : items.length === 0 ? (
								<p className="text-sm text-center text-slate-500 font-mono">
									НЕТ ДОСТУПНЫХ ОПЦИЙ
								</p>
							) : (
								<div
									onMouseEnter={() => setVariant("link")}
									onMouseLeave={() => setVariant("default")}>
									<Carousel
										setApi={setApi}
										opts={{ align: "start", dragFree: true }}
										className="w-full select-none">
										<CarouselContent className="-ml-2">
											{items.map((item) => (
												<AccordionItem
													key={item.id}
													item={item}
													isSelected={selectedItem?.id === item.id}
													onSelect={() => onSelect(item)}
													style={style}
												/>
											))}
										</CarouselContent>
									</Carousel>
								</div>
							)}
						</div>

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
