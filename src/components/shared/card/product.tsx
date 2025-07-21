// src/components/shared/card/product.tsx

import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
	id: string;
	imageUrl: string;
	modelName?: string;
	price: string;
	className?: string;

	isFavorite: boolean;
	onToggleFavorite: (id: string) => void;
}

export function ProductCard({
	id,
	imageUrl,
	modelName,
	price,
	className,
	isFavorite,
	onToggleFavorite,
}: ProductCardProps) {
	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.preventDefault();
		onToggleFavorite(id);
	};

	return (
		<Link
			href={`/configurator?id=${id}`}
			className={cn(
				"group space-y-3 cursor-pointer block py-4 bg-neutral-100",
				className
			)}>
			{/* Изображение */}
			<div className="relative aspect-square overflow-hidden">
				<Image
					src={imageUrl}
					fill
					className="object-contain transition-transform duration-500 group-hover:scale-105"
					alt={`Изображение часов ${modelName || ""}`}
				/>

				{/* В избранное */}
				<button
					type="button"
					onClick={handleFavoriteClick}
					className="absolute top-3 right-3 p-1.5 bg-white/70 rounded-full backdrop-blur-sm transition hover:bg-white"
					aria-label={
						isFavorite ? "Удалить из избранного" : "Добавить в избранное"
					}>
					<HeartIcon
						className={cn(
							"size-6 transition-colors",
							isFavorite ? "text-red-500 fill-red-500" : "text-neutral-600"
						)}
					/>
				</button>
			</div>

			{/* Информация о товаре */}
			<div className="flex flex-col justify-between items-center gap-1">
				<p className="text-lg lg:text-xl tracking-wide font-medium">
					{modelName}
				</p>
				<p className="text-lg lg:text-xl tracking-wide shrink-0 text-neutral-600">
					{price}
				</p>
			</div>
		</Link>
	);
}
