// src/components/card/favorite.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Eye, Settings } from "lucide-react";
import type { FavoriteItem } from "@/stores";
import { useFavoritesStore } from "@/stores";
import { useCursorStore } from "@/stores";
import { PATHS } from "@/constants";
import { WATCH_PREVIEW_Z_INDEX } from "@/constants";

interface FavoriteItemCardProps {
	item: FavoriteItem;
}

export const FavoriteItemCard = ({ item }: FavoriteItemCardProps) => {
	const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
	const { setVariant } = useCursorStore();

	let linkHref: string;
	let buttonText: string;
	let buttonIcon: React.ReactNode;

	if (item.type === "custom") {
		linkHref = item.url;
		buttonText = "Изменить";
		buttonIcon = <Settings size={16} />;
	} else {
		linkHref = `${PATHS.STORE}/${item.id}`;
		buttonText = "Посмотреть";
		buttonIcon = <Eye size={16} />;
	}

	const renderPreview = () => {
		if (item.type === "build") {
			return (
				<Image
					src={item.image}
					alt={item.name}
					width={400}
					height={400}
					className="w-full h-full object-cover transition-transform duration-500 ease-in-out scale-105 group-hover:scale-100"
				/>
			);
		}

		if (item.type === "custom") {
			return (
				<div className="relative w-full h-full transition-transform duration-500 ease-in-out scale-95 group-hover:scale-90">
					{/* Преобразуем объект selection в массив и рендерим */}
					{Object.entries(item.selection).map(([partType, part]) => {
						if (!part || !part.image) return null;
						return (
							<Image
								key={partType}
								src={part.image}
								alt={part.name}
								width={400}
								height={400}
								className={`absolute inset-0 w-full h-full object-contain ${
									WATCH_PREVIEW_Z_INDEX[
										partType as keyof typeof WATCH_PREVIEW_Z_INDEX
									] || "z-0"
								}`}
							/>
						);
					})}
				</div>
			);
		}

		return (
			<div className="w-full h-full flex items-center justify-center text-slate-400">
				No Preview
			</div>
		);
	};

	return (
		<div className="group relative border border-slate-200 flex flex-col">
			<Link
				href={linkHref}
				onMouseEnter={() => setVariant("link")}
				onMouseLeave={() => setVariant("default")}
				className="block">
				<div className="aspect-square w-full bg-white overflow-hidden">
					{renderPreview()}
				</div>
			</Link>

			<button
				onClick={() => removeFavorite(item.id)}
				onMouseEnter={() => setVariant("link")}
				onMouseLeave={() => setVariant("default")}
				className="absolute top-3 right-3 z-20 size-10 flex items-center justify-center bg-white/80 text-slate-600 hover:bg-red-500 hover:text-white transition-colors"
				aria-label="Удалить из избранного">
				<X size={20} />
			</button>

			<div className="p-4 border-t border-slate-200 flex-grow">
				{item.type === "custom" && (
					<h3 className="font-semibold text-slate-800 truncate">
						Кастомная сборка
					</h3>
				)}
				<h3 className="font-semibold text-slate-800 truncate">{item.name}</h3>
				<p className="text-sm text-slate-500">На базе {item.watch_type.name}</p>
			</div>

			<Link
				href={linkHref}
				onMouseEnter={() => setVariant("link")}
				onMouseLeave={() => setVariant("default")}
				className="flex items-center justify-center gap-2 h-12 bg-black text-white font-semibold text-sm hover:bg-zinc-800 transition-colors">
				{buttonIcon}
				<span>{buttonText}</span>
			</Link>
		</div>
	);
};
