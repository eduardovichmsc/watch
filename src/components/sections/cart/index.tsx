// src/components/cart/index.tsx
"use client";

import { useCursorStore } from "@/stores/cursor";
import { Link, ShoppingBag } from "lucide-react";
import { useMemo } from "react";

import { OrderSummary } from "./order_summary";
import { CartItemCard } from "@/components/shared/card/cart";
import { PATHS } from "@/constants";
import { useCartStore } from "@/stores/cart";

const content = {
	default: {
		title: "Ваша корзина.",
	},
	orderSummary: {
		finish: {
			label: "Перейти к оформлению",
		},
	},
	notFound: {
		icon: ShoppingBag,
		title: "Корзина пуста.",
		description:
			"Похоже, вы еще не создали свои идеальные часы. Перейдите в конструктор, чтобы начать.",
		button: {
			label: "Перейти в конфигуратор",
			href: PATHS.CONFIGURATOR,
		},
	},
};

export const CartWrapper = () => {
	const items = useCartStore((state) => state.items);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const subtotal = useMemo(
		() => items.reduce((acc, item) => acc + item.totalPrice, 0),
		[items]
	);

	// Пустая корзина
	if (items.length === 0) {
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
		<div className="mx-auto px-4 py-12 sm:px-6 lg:px-16 pb-32 lg:pb-12">
			<h1 className="px-4 lg:px-0 font-light text-5xl md:text-7xl tracking-tighter text-black mb-12">
				{content.default.title}
			</h1>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
				{/* Список товаров */}
				<div className="lg:col-span-2 bg-white border border-slate-200 rounded-none">
					<div className="divide-y divide-slate-200">
						{items.map((item) => (
							<CartItemCard
								key={item.id}
								item={item}
								onRemove={removeFromCart}
							/>
						))}
					</div>
				</div>

				{/* Сводка по заказу (видна только на десктопе) */}
				<div className="hidden lg:block lg:sticky top-22">
					<OrderSummary subtotal={subtotal} />
					{/* Кнопка оформления */}
					<button
						onClick={() => alert("Переход к оформлению заказа (TBD)")}
						className="w-full h-16 mt-6 bg-black text-white font-semibold text-base rounded-none hover:bg-zinc-800 transition-colors">
						{content.orderSummary.finish.label}
					</button>
				</div>
			</div>

			{/* Липкий футер для мобилок */}
			<div className="z-50 sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 p-4 lg:hidden">
				<div className="flex justify-between items-center mb-4">
					<span className="font-medium text-lg text-black">Итого:</span>
					<span className="font-medium text-xl text-black">
						{subtotal.toLocaleString("ru-RU")} KZT
					</span>
				</div>
				<button
					onClick={() => alert("Переход к оформлению заказа (TBD)")}
					className="w-full h-14 bg-black text-white font-semibold text-base rounded-none hover:bg-zinc-800 transition-colors">
					{content.orderSummary.finish.label}
				</button>
			</div>
		</div>
	);
};
