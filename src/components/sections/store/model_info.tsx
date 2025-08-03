// src/components/store/model_info.tsx
"use client";

import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import type { WatchType } from "@/types";
import { PATHS } from "@/constants/paths";
import { useCursorStore } from "@/stores/cursor";
import { useConfiguratorStore } from "@/stores/configurator";

interface ModelInfoProps {
	model: WatchType;
}

export const ModelInfo = ({ model }: ModelInfoProps) => {
	const router = useRouter();
	const { setVariant } = useCursorStore();
	const setModelFromGallery = useConfiguratorStore(
		(state) => state.setModelFromStore
	);

	const handleCustomize = () => {
		setModelFromGallery(model.id);
		router.push(PATHS.CONFIGURATOR);
	};

	return (
		<div className="flex flex-col h-full">
			{/* Артикул */}
			<p className="font-mono text-sm uppercase text-slate-500">
				АРТ. {model.id}
			</p>

			{/* Название */}
			<h1 className="mt-2 font-light text-5xl md:text-6xl tracking-tighter text-black">
				{model.name}
			</h1>

			{/* Описание */}
			<p
				className="mt-6 text-slate-600 max-w-prose"
				dangerouslySetInnerHTML={{ __html: model.description }}></p>

			{/* Разделитель */}
			<div className="border-b border-slate-200 my-8"></div>

			{/* Цена */}
			<div className="mt-auto">
				<p className="font-mono text-xs uppercase text-slate-500">
					Базовая стоимость
				</p>
				<p className="text-4xl font-medium text-black">
					{parseFloat(model.price).toLocaleString("ru-RU")} KZT
				</p>

				{/* Кнопка CTA */}
				<button
					onClick={handleCustomize}
					onMouseEnter={() => setVariant("link")}
					onMouseLeave={() => setVariant("default")}
					className="group mt-8 w-full h-16 flex items-center justify-center gap-x-3 bg-black text-white font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors">
					<Settings className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
					<span>Кастомизировать</span>
				</button>
			</div>
		</div>
	);
};
