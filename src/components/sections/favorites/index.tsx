// src/components/favorites/index.tsx
"use client";

import Link from "next/link";
import { useFavoritesStore } from "@/stores/favorites";
import { FavoriteItemCard } from "@/components/shared/card/favorite";
import { Heart } from "lucide-react";
import { PATHS } from "@/constants/paths";

const content = {
	default: {
		title: "Избранное.",
		description:
			"Ваши сохраненные сборки. Вернитесь к ним в любой момент для просмотра или кастомизации.",
	},
	notFound: {
		icon: Heart,
		title: "Избранное пусто.",
		description:
			"Сохраняйте понравившиеся сборки из галереи, чтобы вернуться к ним позже.",
		button: {
			label: "Перейти к сборкам",
			href: PATHS.STORE,
		},
	},
};

export default function FavoritesWrapper() {
	const favorites = useFavoritesStore((state) => state.favorites);

	// Пустое избранное
	if (favorites.length === 0) {
		return (
			<div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
				<content.notFound.icon className="w-24 h-24 text-slate-200 mb-8" />
				<h1 className="font-light text-5xl tracking-tighter text-black mb-4">
					{content.notFound.title}
				</h1>
				<p className="text-lg text-slate-600 max-w-md mb-8">
					{content.notFound.description}
				</p>
				<Link
					href={content.notFound.button.href}
					className="h-16 inline-flex items-center justify-center px-8 bg-black text-white font-medium hover:bg-zinc-800 transition-colors">
					{content.notFound.button.label}
				</Link>
			</div>
		);
	}

	return (
		<div className="mx-auto px-4 lg:px-16 py-12 md:py-20 lg:py-24">
			<div className="mb-12 md:mb-16">
				<h1 className="font-light text-5xl md:text-7xl tracking-tighter text-black">
					{content.default.title}
				</h1>
				<p className="mt-4 text-lg text-slate-600 max-w-2xl">
					{content.default.description}
				</p>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
				{favorites.map((item) => (
					<FavoriteItemCard key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}
