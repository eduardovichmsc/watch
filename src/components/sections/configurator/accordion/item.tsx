// src/components/sections/configurator/accordion/item.tsx
"use client";

import { useState, useEffect } from "react";
import { CarouselItem } from "@/components/ui/carousel";
import type { Item, AccordionItemStyle } from "./index";
import { Spinner } from "@/components/ui/spinner";

interface AccordionItemProps<T extends Item> {
	item: T;
	isSelected: boolean;
	onSelect: () => void;
	style?: AccordionItemStyle;
}

export function AccordionItem<T extends Item>({
	item,
	isSelected,
	onSelect,
	style,
}: AccordionItemProps<T>) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(!!item.image);
	}, [item.image]);

	return (
		<CarouselItem className="pl-2 basis-1/3 sm:basis-1/4 md:basis-1/5">
			<button
				onClick={onSelect}
				className={`w-full block text-left p-1 lg:p-2 border-2 rounded-none transition-colors ${
					isSelected
						? "border-black"
						: "border-slate-200 hover:border-slate-400"
				}`}>
				<div className="w-full aspect-square mb-2 relative overflow-hidden bg-slate-100/50">
					<div
						className="absolute inset-0 flex items-center justify-center"
						style={{
							transform: `scale(${(style?.scale ?? 100) / 100})`,
							top: `${style?.top ?? 0}%`,
						}}>
						{item.image ? (
							<>
								{isLoading && (
									<div className="absolute inset-0 bg-slate-100 flex justify-center items-center">
										<Spinner />
									</div>
								)}
								<img
									src={item.image}
									alt={item.name}
									className={`h-full w-full object-cover transition-opacity duration-300 ${
										isLoading ? "opacity-0" : "opacity-100"
									}`}
									onLoad={() => setIsLoading(false)}
									onError={() => setIsLoading(false)}
								/>
							</>
						) : (
							<span className="text-xs text-slate-400">No Img</span>
						)}
					</div>
				</div>
				<p className="font-medium text-xs text-slate-800 truncate">
					{item.name}
				</p>
				{item.price && parseFloat(item.price) > 0 && (
					<p className="text-xs text-slate-500">
						+ {parseFloat(item.price).toLocaleString("ru-RU")}
					</p>
				)}
			</button>
		</CarouselItem>
	);
}
