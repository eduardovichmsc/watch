// src/components/sections/configurator/action_panel.tsx
"use client";

import { cn } from "@/lib/utils";
import { useAlertStore } from "@/stores";
// import { useCartStore } from "@/stores";
import { useCursorStore } from "@/stores";
import { useFavoritesStore } from "@/stores";
import { WatchSelection, WatchType } from "@/types";
import {
	CheckIcon,
	Download,
	HeartIcon,
	Loader2,
	Share2Icon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import html2canvas from "html2canvas-pro";
import { useLogoStore } from "@/stores/logo";

interface ActionPanelProps {
	model: WatchType | null;
	selection: WatchSelection;
	totalPrice: number;
	className?: string;
}

export const ActionPanel = ({
	model,
	selection,
	totalPrice,
	className,
}: ActionPanelProps) => {
	// ZUSTAND сторы
	const { setVariant } = useCursorStore();
	const showAlert = useAlertStore((state) => state.showAlert);
	const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
	// const addToCart = useCartStore((state) => state.addToCart);

	// Состояние кнопок (локальные)
	const [isSharing, setIsSharing] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [isSavingFavorite, setIsSavingFavorite] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const [isAdded, setIsAdded] = useState(false);

	// Логика избранного
	const customBuildId =
		typeof window !== "undefined" ? window.location.href : "";
	const isCurrentlyFavorite = useMemo(
		() => isFavorite(customBuildId),
		[isFavorite, customBuildId]
	);

	const handleToggleFavorite = async () => {
		if (isSavingFavorite || !model) return;
		setIsSavingFavorite(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 300));

			if (isCurrentlyFavorite) {
				removeFavorite(customBuildId);
				showAlert("Конфигурация удалена из избранного", "info");
			} else {
				const favoriteItem = {
					type: "custom" as const,
					id: customBuildId,
					name: `${model.name}`,
					selection: selection,
					url: customBuildId,
					watch_type: model,
				};
				addFavorite(favoriteItem);
				showAlert("Конфигурация сохранена в избранное", "success");
			}
		} finally {
			setIsSavingFavorite(false);
		}
	};

	// Логика "поделиться"
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
			showAlert("Ссылка на конфигурацию скопирована", "success");
			setIsCopied(true);
		} catch (err) {
			console.error("Не удалось скопировать ссылку: ", err);
			showAlert("Не удалось скопировать ссылку", "error");
		} finally {
			setIsSharing(false);
		}
	};

	// Логика "В корзину"
	// useEffect(() => {
	// 	if (isAdded) {
	// 		const timer = setTimeout(() => setIsAdded(false), 2000);
	// 		return () => clearTimeout(timer);
	// 	}
	// }, [isAdded]);

	// const handleAddToCartClick = async () => {
	// 	if (isAddingToCart || !model) return;
	// 	setIsAddingToCart(true);
	// 	try {
	// 		await new Promise((resolve) => setTimeout(resolve, 500));
	// 		showAlert("Товар добавлен в корзину", "success");
	// 		addToCart(model, window.location.href, selection, totalPrice);
	// 		setIsAdded(true);
	// 	} catch (err) {
	// 		console.error("Ошибка при добавлении в корзину: ", err);
	// 		showAlert("Ошибка при добавлении в корзину", "error");
	// 	} finally {
	// 		setIsAddingToCart(false);
	// 	}
	// };

	// Логика "Скачивания сборки"
	const handleDownloadImage = async () => {
		const element = document.getElementById("watch-preview-container");
		if (!element) {
			showAlert("Не удалось найти элемент для скачивания.", "error");
			return;
		}

		setIsDownloading(true);
		setVariant("default");

		try {
			const canvas = await html2canvas(element, {
				// backgroundColor: null,
				allowTaint: true,
				ignoreElements: (e) => e.classList.contains("ignore-in-screenshot"),
			});

			const link = document.createElement("a");
			link.href = canvas.toDataURL("image/png");
			link.download = `WotchModClub_${model?.name || "Custom"}.png`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			showAlert("Изображение сохранено!", "success");
		} catch (error) {
			console.error("Ошибка при создании изображения:", error);
			showAlert("Не удалось сохранить изображение.", "error");
		} finally {
			setIsDownloading(false);
		}
	};

	// Блокировка всех кнопок
	const isAnyActionInProgress =
		isSharing ||
		isAddingToCart ||
		isCopied ||
		isAdded ||
		isSavingFavorite ||
		isDownloading;

	return (
		<div className={cn(className)}>
			<div
				className="flex w-full flex-col lg:items-stretch"
				hidden={model === null || false}>
				<p className="hidden text-sm text-slate-500 mb-6 text-left lg:block">
					Если возникли вопросы, свяжитесь с нашим{" "}
					<Link
						href="/contacts"
						className="font-medium text-black hover:underline"
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}>
						менеджером
					</Link>
				</p>

				<div className="flex w-full items-center justify-between gap-x-2">
					{/* Показатель стоимости - deprecated */}
					{/* <div className="lg:hidden">
						<span className="block font-mono text-xs uppercase text-slate-500">
							Стоимость
						</span>
						<span className="block font-medium text-2xl text-black">
							{totalPrice.toLocaleString("ru-RU")} KZT
						</span>
					</div> */}

					<div className="flex items-center gap-x-2 lg:gap-x-4 w-full">
						{/* Кнопка "В избранное" */}
						<button
							type="button"
							onClick={handleToggleFavorite}
							disabled={isAnyActionInProgress || !model}
							onMouseEnter={() => setVariant("link")}
							onMouseLeave={() => setVariant("default")}
							className={cn(
								"group aspect-auto flex-1 h-14 lg:h-16 flex items-center justify-center gap-x-2 rounded-none border transition-colors disabled:cursor-not-allowed disabled:opacity-50",
								isCurrentlyFavorite
									? "bg-rose-50 border-rose-200 text-rose-600"
									: "border-slate-200 text-slate-600 hover:bg-slate-100"
							)}
							aria-label={
								isCurrentlyFavorite
									? "Удалить из избранного"
									: "Добавить в избранное"
							}>
							{isSavingFavorite ? (
								<>
									<Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" />
									{/* hidden lg:inline - deprecated  */}
									<span className="font-medium">Сохранение...</span>
								</>
							) : (
								<>
									<HeartIcon
										className={cn(
											"w-5 h-5 lg:w-6 lg:h-6 transition-all",
											isCurrentlyFavorite && "text-rose-500 fill-current"
										)}
									/>
									{/* hidden lg:inline - deprecated  */}
									<span className="font-medium">
										{isCurrentlyFavorite ? "Добавлено" : "Добавить в избранное"}
									</span>
								</>
							)}
						</button>

						{/* Кнопка "Поделиться" */}
						<button
							type="button"
							onClick={handleShareClick}
							disabled={isAnyActionInProgress}
							onMouseEnter={() => setVariant("link")}
							onMouseLeave={() => setVariant("default")}
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
							aria-label="Поделиться конфигурацией">
							{isCopied ? (
								<div className="flex items-center gap-x-2">
									<CheckIcon className="w-5 h-5" />
									<span className="hidden lg:inline text-sm font-medium">
										Скопировано
									</span>
								</div>
							) : isSharing ? (
								<Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin text-slate-500" />
							) : (
								<Share2Icon className="w-5 h-5 lg:w-6 lg:h-6" />
							)}
						</button>

						{/* Кнопка "Скачать" */}
						<button
							type="button"
							onClick={handleDownloadImage}
							disabled={isAnyActionInProgress || !model}
							onMouseEnter={() => setVariant("link")}
							onMouseLeave={() => setVariant("default")}
							className={cn(
								"aspect-square lg:aspect-auto h-14 lg:h-16 flex items-center justify-center rounded-none border transition-all duration-300 disabled:cursor-not-allowed",
								{
									"w-14 lg:w-16 border-slate-300 bg-slate-100": isDownloading,
									"w-14 lg:w-16 border-slate-200 text-slate-600 hover:bg-slate-100":
										!isDownloading,
								}
							)}
							aria-label="Скачать изображение">
							{isDownloading ? (
								<Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" />
							) : (
								<Download className="w-5 h-5 lg:w-6 lg-h-6" />
							)}
						</button>

						{/* Кнопка "В корзину" - deprecated */}
						{/*
						<button
							type="button"
							onClick={handleAddToCartClick}
							disabled={isAnyActionInProgress || !model}
							className={cn(
								"aspect-square lg:aspect-auto flex-1 h-14 lg:h-16 flex items-center justify-center gap-x-2 lg:gap-x-3 text-white font-medium text-sm lg:text-base rounded-none transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed",
								{
									"bg-emerald-600": isAdded,
									"bg-zinc-700": isAddingToCart,
									"bg-black hover:bg-zinc-800": !isAdded && !isAddingToCart,
								}
							)}>
							{isAdded ? (
								<>
									<CheckIcon className="w-5 h-5 lg:w-6 lg:h-6" />
									<span className="hidden lg:inline">Добавлено</span>
								</>
							) : isAddingToCart ? (
								<>
									<Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" />
									<span className="hidden lg:inline">Добавление...</span>
								</>
							) : (
								<>
									<ShoppingCartIcon className="w-5 h-5 lg:w-6 lg:h-6" />
									<span className="hidden lg:inline">Добавить в корзину</span>
								</>
							)}
						</button>
						*/}
					</div>
				</div>
			</div>
		</div>
	);
};
