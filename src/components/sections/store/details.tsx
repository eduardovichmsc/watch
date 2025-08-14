// src/components/store/build/details.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	ArrowLeft,
	ShoppingCartIcon,
	CheckIcon,
	Loader2,
	Share2Icon,
	Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { PATHS } from "@/constants/paths";
import type { Build, WatchSelection } from "@/types";
import { useCursorStore } from "@/stores";
import { useCartStore } from "@/stores";
import { useAlertStore } from "@/stores";
import { useConfiguratorStore, PreselectedComponents } from "@/stores";
import { useFavoritesStore } from "@/stores";
import { cn } from "@/lib/utils";
import { ComponentsList } from "./components/list";
import { SELECTION_KEY_MAP } from "@/constants";

interface Props {
	build: Build;
	calculatedPrice: number;
}

export const BuildDetail = ({ build, calculatedPrice }: Props) => {
	const { setVariant } = useCursorStore();
	const setPreselection = useConfiguratorStore(
		(state) => state.setPreselection
	);
	const addToCart = useCartStore((state) => state.addToCart);
	const showAlert = useAlertStore((state) => state.showAlert);
	const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
	const router = useRouter();

	// Состояния для UI кнопок
	const [isSharing, setIsSharing] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const [isAdded, setIsAdded] = useState(false);

	const isCurrentlyFavorite = isFavorite(build.id);

	// Эффекты для сброса состояний кнопок
	useEffect(() => {
		if (isCopied) {
			const timer = setTimeout(() => setIsCopied(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [isCopied]);

	useEffect(() => {
		if (isAdded) {
			const timer = setTimeout(() => setIsAdded(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [isAdded]);

	const buildSelection = useMemo((): WatchSelection => {
		const selection: WatchSelection = {
			watchCase: null,
			bezel: null,
			dial: null,
			strap: null,
			hand: null,
			secondHand: null,
			gmtHand: null,
		};
		build.components.forEach((component) => {
			const key = SELECTION_KEY_MAP[component.type.toLowerCase()];
			if (key) {
				// @ts-ignore
				selection[key] = {
					id: component.id,
					name: component.name,
					image: component.image,
					price: "0",
					watch_types: [],
				};
			}
		});
		return selection;
	}, [build.components]);

	// Обработчики действий
	const handleShareClick = async () => {
		if (isSharing || isCopied) return;
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

	const handleAddToCartClick = async () => {
		if (isAddingToCart || isAdded) return;
		setIsAddingToCart(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			addToCart(
				build.watch_type,
				window.location.href,
				buildSelection,
				calculatedPrice
			);
			showAlert("Сборка добавлена в корзину", "success");
			setIsAdded(true);
		} catch (err) {
			console.error("Ошибка при добавлении в корзину: ", err);
			showAlert("Ошибка при добавлении в корзину", "error");
		} finally {
			setIsAddingToCart(false);
		}
	};

	const handleToggleFavorite = () => {
		if (isCurrentlyFavorite) {
			removeFavorite(build.id);
			showAlert("Удалено из избранного", "info");
		} else {
			const favoriteItem = {
				type: "build" as const,
				id: build.id,
				name: build.name,
				image: build.image,
				watch_type: build.watch_type,
			};
			addFavorite(favoriteItem);
			showAlert("Добавлено в избранное!", "success");
		}
	};

	const isActionInProgress = isSharing || isCopied || isAddingToCart || isAdded;
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

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
				<div className="py-8 md:py-12 lg:py-16 flex flex-col justify-center">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
						}}>
						<div className="px-8 md:px-12 lg:px-16">
							<motion.p
								variants={itemVariants}
								className="font-mono text-sm uppercase tracking-wider text-slate-500">
								На базе {build.watch_type.name}
							</motion.p>

							<motion.h1
								variants={itemVariants}
								className="mt-2 font-light text-5xl md:text-6xl tracking-tighter text-black">
								{build.name}
							</motion.h1>

							{build.description && (
								<motion.p
									variants={itemVariants}
									className="mt-6 text-lg text-slate-600">
									{build.description}
								</motion.p>
							)}
						</div>

						{/* Список компонентов */}
						{build.components && build.components.length > 0 && (
							<motion.div variants={itemVariants} className="mt-8">
								<ComponentsList build={build} />
							</motion.div>
						)}

						<motion.div
							variants={itemVariants}
							className="px-8 md:px-12 lg:px-16 mt-10 flex flex-col gap-4">
							{/* Блок с кнопками */}
							<div className="flex flex-row gap-4">
								{/* Корзина - deprecated */}
								{/* <button
									onClick={handleAddToCartClick}
									disabled={isActionInProgress}
									onMouseEnter={() => setVariant("link")}
									onMouseLeave={() => setVariant("default")}
									className={cn(
										"group flex-1 inline-flex items-center justify-center gap-x-3 h-16 px-6 text-white font-medium transition-colors disabled:cursor-not-allowed",
										{
											"bg-emerald-600": isAdded,
											"bg-zinc-700": isAddingToCart,
											"bg-black hover:bg-zinc-800": !isAdded && !isAddingToCart,
										}
									)}>
									{isAdded ? (
										<CheckIcon className="w-6 h-6" />
									) : isAddingToCart ? (
										<Loader2 className="w-6 h-6 animate-spin" />
									) : (
										<ShoppingCartIcon className="w-6 h-6" />
									)}
									<span className="text-sm sm:text-base">
										{isAdded
											? "Добавлено"
											: isAddingToCart
											? "..."
											: `В корзину за ${calculatedPrice.toLocaleString(
													"ru-RU"
											  )} KZT`}
									</span>
								</button> */}

								{/* Добавить в корзину */}
								<button
									type="button"
									onClick={handleToggleFavorite}
									disabled={isActionInProgress}
									onMouseEnter={() => setVariant("link")}
									onMouseLeave={() => setVariant("default")}
									className={cn(
										"group flex-1 inline-flex items-center justify-center gap-x-3 h-16 px-6 text-white font-medium transition-colors disabled:cursor-not-allowed",
										{
											"bg-red-500": isCurrentlyFavorite,
											"bg-black hover:bg-zinc-800": !isCurrentlyFavorite,
										}
									)}
									aria-label={
										isCurrentlyFavorite
											? "Удалить из избранного"
											: "Добавить в избранное"
									}>
									<Heart
										className={cn(
											"w-6 h-6 transition-all text-white",
											isCurrentlyFavorite && "fill-current"
										)}
									/>
									<span className="text-sm sm:text-base">
										{isCurrentlyFavorite ? "Добавлено" : "Добавить в избранное"}
									</span>
								</button>

								{/* Поделиться */}
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
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
