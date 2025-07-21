// src/components/card/gallery.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCursorStore } from "@/stores/cursor";
import { Spinner } from "@/components/ui/spinner";
import { PATHS } from "@/constants/paths";
import type { WatchType } from "@/types";

interface GalleryCardProps {
	model: WatchType;
}

export const GalleryCard = ({ model }: GalleryCardProps) => {
	const { setVariant } = useCursorStore();

	const [imageLoading, setImageLoading] = useState<boolean>(true);
	const configuratorLink = `${PATHS.CONFIGURATOR}?model=${model.id}`;

	return (
		<div className="flex flex-col border border-slate-200 bg-white">
			{/* Контейнер для изображения */}
			<div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
				{model.image && (
					<Image
						src={model.image}
						alt={model.name}
						width={600}
						height={600}
						onLoadingComplete={() => setImageLoading(false)}
						className={cn(
							"w-full h-full object-cover scale-100 duration-750 transition-all",
							imageLoading && "opacity-50 scale-90 blur-xl"
						)}
					/>
				)}
				{imageLoading && (
					<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
						<Spinner />
					</div>
				)}
			</div>

			{/* Информационный блок */}
			<div className="flex items-end flex-grow p-6 border-t-slate-200">
				<div className="flex-grow">
					<h3 className="text-2xl font-medium text-black">{model.name}</h3>
					<p className="font-mono text-sm uppercase text-slate-500 mt-1">
						Базовая конфигурация
					</p>
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
	);
};
