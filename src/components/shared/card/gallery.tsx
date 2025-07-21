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
	const configuratorLink = `${PATHS.CONFIGURATOR}?model=${model.id}`;

	return (
		// Убираем `relative` и `group` с корневого элемента
		<div className="flex flex-col border border-slate-200 bg-white">
			{/* Контейнер для изображения */}
			<div className="aspect-square w-full bg-slate-50 overflow-hidden">
				{model.image && (
					<Image
						src={model.image}
						alt={model.name}
						width={600}
						height={600}
						className="w-full h-full object-cover"
					/>
				)}
			</div>

			{/* Информационный блок под изображением */}
			<div className="flex flex-col flex-grow p-6">
				<div className="flex-grow">
					<h3 className="text-2xl font-medium text-black">{model.name}</h3>
					<p className="font-mono text-sm uppercase text-slate-500 mt-1">
						Базовая конфигурация
					</p>
				</div>

				<div className="border-t border-slate-100 my-4"></div>

				<div className="flex justify-between items-center">
					<div className="text-xl font-medium text-black">
						{model.price
							? `${parseFloat(model.price).toLocaleString("ru-RU")} KZT`
							: "Цена по запросу"}
					</div>
					<Link
						href={configuratorLink}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="flex items-center justify-center size-12 border border-slate-200 text-slate-600 hover:bg-black hover:text-white transition-colors"
						aria-label={`Кастомизировать ${model.name}`}>
						<Settings size={20} />
					</Link>
				</div>
			</div>
		</div>
	);
};
