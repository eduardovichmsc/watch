// src/components/gallery/model-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";
import { PATHS } from "@/constants/paths";
import type { WatchType } from "@/types";
import { useCursorStore } from "@/stores/cursor";

interface GalleryCardProps {
	model: WatchType;
}

export const GalleryCard = ({ model }: GalleryCardProps) => {
	const { setVariant } = useCursorStore();

	// Создаем ссылку на конфигуратор с ID этой модели
	const configuratorLink = `${PATHS.CONFIGURATOR}?model=${model.id}`;

	return (
		<div
			className="group relative block overflow-hidden border border-slate-200"
			onMouseEnter={() => setVariant("link")}
			onMouseLeave={() => setVariant("default")}>
			<Link href={configuratorLink}>
				<div className="aspect-square w-full bg-slate-50">
					{model.image && (
						<Image
							src={model.image}
							alt={model.name}
							width={500}
							height={500}
							className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
						/>
					)}
				</div>

				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

				<div className="absolute bottom-0 left-0 p-6 text-white w-full">
					<h3 className="text-2xl font-semibold">{model.name}</h3>
					<p className="font-mono text-sm uppercase text-slate-300">
						Базовая цена: {parseFloat(model.price).toLocaleString("ru-RU")} KZT
					</p>
				</div>

				{/* Кнопка, появляющаяся при наведении */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<div className="flex items-center gap-x-2 bg-white text-black px-6 py-3 font-semibold">
						<Settings size={18} />
						<span>Кастомизировать</span>
					</div>
				</div>
			</Link>
		</div>
	);
};
