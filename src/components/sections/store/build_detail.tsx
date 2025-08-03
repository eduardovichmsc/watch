// src/components/gallery/build-detail.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Settings,
	ArrowLeft,
	CheckIcon,
	Loader2,
	Share2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PATHS } from "@/constants/paths";
import type { Build, WatchSelection } from "@/types";
import { useCursorStore } from "@/stores/cursor";
import {
	useConfiguratorStore,
	PreselectedComponents,
} from "@/stores/configurator";
import { useAlertStore } from "@/stores/alert";
import { ComponentListItem } from "@/components/sections/store/component_list_item";
import { cn } from "@/lib/utils";

const componentTypeKeyMap: { [key: string]: keyof WatchSelection } = {
	case: "watchCase",
	bezel: "bezel",
	dial: "dial",
	strap: "strap",
	hand: "hand",
	secondhand: "secondHand",
	gmthands: "gmtHand",
};

interface Props {
	build: Build;
}

export const BuildDetail = ({ build }: Props) => {
	const { setVariant } = useCursorStore();
	const { setPreselection } = useConfiguratorStore();
	const showAlert = useAlertStore((state) => state.showAlert);
	const router = useRouter();

	const [isSharing, setIsSharing] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			const timer = setTimeout(() => setIsCopied(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [isCopied]);

	const handleShareClick = async () => {
		if (isSharing) return;
		setIsSharing(true);
		try {
			await navigator.clipboard.writeText(window.location.href);
			showAlert("Ссылка на сборку скопирована", "success");
			setIsCopied(true);
		} catch (err) {
			console.error("Не удалось скопировать ссылку: ", err);
			showAlert("Не удалось скопировать ссылку", "error");
		} finally {
			setIsSharing(false);
		}
	};

	const handleCustomizeClick = () => {
		const preselectedComponents: PreselectedComponents = {};
		build.components.forEach((component) => {
			const key = componentTypeKeyMap[component.type.toLowerCase()];
			if (key) {
				preselectedComponents[key] = component.id;
			}
		});

		setPreselection(build.watch_type.id, preselectedComponents);
		router.push(PATHS.CONFIGURATOR);
	};

	const isActionInProgress = isSharing || isCopied;

	return (
		<div className="min-h-screen">
			<div className="grid grid-cols-1 lg:grid-cols-2">
				{/* Левая колонка: Изображение */}
				<div className="relative h-[60vh] lg:h-screen bg-slate-100">
					<Image
						src={build.image}
						alt={build.name}
						fill
						priority
						className="object-cover select-none"
					/>
					<button
						onClick={() => router.push(PATHS.STORE)}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 text-white px-4 py-2 backdrop-blur-sm hover:bg-black/80 transition-colors">
						<ArrowLeft size={18} />
						<span>Назад к сборкам</span>
					</button>
				</div>

				{/* Правая колонка: Информация */}
				<div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
					<div>
						<p className="font-mono text-sm uppercase tracking-wider text-slate-500">
							На базе {build.watch_type.name}
						</p>

						<h1 className="mt-2 font-light text-5xl md:text-6xl tracking-tighter text-black">
							{build.name}
						</h1>

						{build.description && (
							<p className="mt-6 text-lg text-slate-600">{build.description}</p>
						)}

						{/* Список компонентов */}
						{build.components && build.components.length > 0 && (
							<div className="mt-8">
								<h2 className="text-xl font-semibold text-slate-800 mb-4">
									Компоненты сборки:
								</h2>
								<div className="border border-slate-200">
									{build.components.map((component) => (
										<ComponentListItem
											key={component.id}
											type={component.type}
											name={component.name}
											imageUrl={component.image}
										/>
									))}
								</div>
							</div>
						)}

						{/* Блок с кнопками */}
						<div className="mt-10 flex flex-col sm:flex-row gap-4">
							{/* "Кастомизировать" */}
							<button
								onClick={handleCustomizeClick}
								disabled={isActionInProgress}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className="group flex-1 inline-flex items-center justify-center gap-x-3 h-16 px-10 bg-black text-white font-semibold hover:bg-zinc-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
								<Settings className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
								<span>Кастомизировать</span>
							</button>

							{/* "Поделиться" */}
							<button
								type="button"
								onClick={handleShareClick}
								disabled={isActionInProgress}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className={cn(
									"h-16 w-16 flex items-center justify-center shrink-0 border transition-all duration-300 disabled:cursor-not-allowed",
									{
										"bg-emerald-50 border-emerald-400 text-emerald-600":
											isCopied,
										"border-slate-300 bg-slate-100": isSharing,
										"border-slate-200 text-slate-600 hover:bg-slate-100":
											!isCopied && !isSharing,
									}
								)}
								aria-label="Поделиться сборкой">
								{isCopied ? (
									<CheckIcon className="w-6 h-6" />
								) : isSharing ? (
									<Loader2 className="w-6 h-6 animate-spin text-slate-500" />
								) : (
									<Share2Icon className="w-6 h-6" />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
