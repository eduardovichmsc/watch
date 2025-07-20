// src/components/constructor/action_panel.tsx
"use client";

import { cn } from "@/lib/utils";
import { useAlertStore } from "@/stores/alert";
import { useCartStore } from "@/stores/cart";
import { useCursorStore } from "@/stores/cursor";
import { WatchSelection, WatchType } from "@/types";
import { CheckIcon, Loader2, Share2Icon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
	// zustand
	const { setVariant } = useCursorStore();
	const showAlert = useAlertStore((state) => state.showAlert);

	const [isCopied, setIsCopied] = useState(false);
	const [isAdded, setIsAdded] = useState(false);
	const [isSharing, setIsSharing] = useState(false);
	const [isAddingToCart, setIsAddingToCart] = useState(false);

	const addToCart = useCartStore((state) => state.addToCart);

	useEffect(() => {
		if (isAdded) {
			const timer = setTimeout(() => setIsAdded(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [isAdded]);

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
		} finally {
			setIsSharing(false);
		}
	};

	const handleAddToCartClick = async () => {
		if (isAddingToCart || !model) return;
		setIsAddingToCart(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			showAlert("Товар добавлен в корзину", "success");
			addToCart(model, window.location.href, selection, totalPrice);
			setIsAdded(true);
		} catch (err) {
			console.error("Ошибка при добавлении в корзину: ", err);
		} finally {
			setIsAddingToCart(false);
		}
	};

	const isAnyActionInProgress =
		isSharing || isAddingToCart || isCopied || isAdded;

	return (
		<div className={cn(className)}>
			<div className="flex w-full flex-col lg:items-stretch">
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

				<div className="px-2 lg:px-0 flex w-full items-center justify-between gap-x-2">
					<div className="lg:hidden">
						<span className="block font-mono text-xs uppercase text-slate-500">
							Стоимость
						</span>
						<span className="block font-medium text-2xl text-black">
							{totalPrice.toLocaleString("ru-RU")} KZT
						</span>
					</div>

					<div className="flex items-center gap-x-2 lg:gap-x-4 lg:w-full">
						<button
							type="button"
							onClick={handleShareClick}
							disabled={isAnyActionInProgress}
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
									<span className="hidden lg:inline text-sm font-semibold">
										Скопировано
									</span>
								</div>
							) : isSharing ? (
								<Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin text-slate-500" />
							) : (
								<Share2Icon className="w-5 h-5 lg:w-6 lg:h-6" />
							)}
						</button>

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
					</div>
				</div>
			</div>
		</div>
	);
};
