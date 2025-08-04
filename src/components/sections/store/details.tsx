// src/components/store/details.tsx
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
import { cn } from "@/lib/utils";
import { ComponentsList } from "./components/list";

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

	const handleBaseClick = () => {
		router.push(PATHS.CONFIGURATOR + "?model=" + build.watch_type.id);
	};

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
						className="absolute bottom-8 md:bottom-auto md:top-8 right-8 md:right-auto md:left-12 lg:left-16 flex items-center gap-2 bg-black/50 text-white px-4 py-2 backdrop-blur-sm hover:bg-black/80 transition-colors">
						<ArrowLeft size={18} />
						<span>Назад к сборкам</span>
					</button>
				</div>

				{/* Правая колонка: Информация */}
				<div className="py-8 md:py-12 lg:py-16 flex flex-col justify-center">
					<div className="flex flex-col">
						<p className="px-8 md:px-12 lg:px-16 order-1 mt-8 font-mono text-sm uppercase tracking-wider text-slate-500">
							На базе{" "}
							<span
								className="underline underline-offset-4"
								onClick={handleBaseClick}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}>
								{build.watch_type.name}
							</span>
						</p>

						{/* Название сборки */}
						<h1 className="px-8 md:px-12 lg:px-16 order-2 mt-4 lg:mt-2 font-light text-5xl md:text-6xl tracking-tighter text-black">
							{build.name}
						</h1>

						{/* Описание */}
						{build.description && (
							<p className="px-8 md:px-12 lg:px-16 order-3 mt-6 text-lg text-slate-600">
								{build.description}
							</p>
						)}

						{/* Список компонентов */}
						{build.components && build.components.length > 0 && (
							<ComponentsList build={build} />
						)}

						{/* Блок с кнопками */}
						<div className="px-8 md:px-12 lg:px-16 order-4 lg:order-5 mt-10 flex flex-row gap-4 sticky bottom-0 py-4 lg:py-0 lg:static bg-white lg:bg-transparent">
							{/* "Кастомизировать" */}
							<button
								onClick={handleCustomizeClick}
								disabled={isActionInProgress}
								className="group flex-1 inline-flex items-center justify-center gap-x-3 h-16 px-10 bg-black text-white font-medium hover:bg-zinc-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
								<Settings className="w-6 h-6" />
								<span>Кастомизировать</span>
							</button>

							{/* "Поделиться" */}
							<button
								type="button"
								onClick={handleShareClick}
								disabled={isActionInProgress}
								className={cn(
									"aspect-square lg:aspect-auto h-14 lg:h-16 flex items-center justify-center rounded-none border transition-all duration-300 disabled:cursor-not-allowed",
									{
										"w-auto px-4 bg-emerald-50 border-emerald-400 text-emerald-600":
											isCopied,
										"w-14 lg:w-16 border-slate-300 bg-slate-100": isSharing,
										"w-14 lg:w-16 border-slate-200 text-slate-600 hover:bg-slate-100":
											!isCopied && !isSharing,
									}
								)}
								aria-label="Поделиться сборкой">
								{isCopied ? (
									<div className="flex items-center gap-x-2">
										<CheckIcon className="w-6 h-6" />
										<span className="hidden lg:inline text-sm font-medium">
											Скопировано
										</span>
									</div>
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
