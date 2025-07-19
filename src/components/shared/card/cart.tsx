// app/components/shared/card/cart.tsx
"use client";

import { CartItem } from "@/stores/cart";
import { useCursorStore } from "@/stores/cursor";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

export function CartItemCard({
	item,
	onRemove,
}: {
	item: CartItem;
	onRemove: (id: string) => void;
}) {
	const { setVariant } = useCursorStore();

	const watchName = item.model.name;

	const partSections = [
		{ key: "watchCase" as const, title: "Корпус" },
		{ key: "dial" as const, title: "Циферблат" },
		{ key: "bezel" as const, title: "Безель" },
		{ key: "strap" as const, title: "Браслет" },
		{ key: "hand" as const, title: "Стрелки" },
		{ key: "secondHand" as const, title: "Секундная стрелка" },
		{ key: "gmtHand" as const, title: "GMT-стрелка" },
	];

	return (
		<div className="grid grid-cols-[96px_1fr] items-start gap-4 p-4 sm:grid-cols-[128px_1fr_auto] sm:gap-6 sm:p-6">
			{/* Колонка с изображением */}
			<Link
				href={item.href || "/"}
				className="block size-24 sm:size-32 flex-shrink-0 relative bg-slate-100">
				{Object.entries(item.selection)
					.filter(([, part]) => part?.image)
					.map(([partType, part]) => {
						const zIndexMap: { [key: string]: string } = {
							strap: "z-10",
							watchCase: "z-11",
							dial: "z-12",
							bezel: "z-13",
							hand: "z-14",
							secondHand: "z-15",
							gmtHand: "z-16",
						};
						return (
							<img
								key={partType}
								src={part!.image!}
								alt={part!.name}
								className={`absolute p-1 sm:p-2 inset-0 w-full h-full object-contain ${
									zIndexMap[partType] || "z-0"
								}`}
							/>
						);
					})}
			</Link>

			{/* Колонка с деталями конфигурации */}
			<div className="flex flex-col h-full">
				<div className="flex-grow">
					<Link
						href={item.href || "/"}
						className="text-lg sm:text-xl font-medium text-black"
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}>
						{watchName}
					</Link>
					<p className="font-mono text-xs uppercase tracking-wider text-slate-500">
						Custom build
					</p>

					{/* На десктопе показываем полный список, на мобильных можно скрыть или сократить */}
					<dl className="mt-3 space-y-1 text-sm hidden sm:block">
						{partSections.map((section) => {
							const selectedPart = item.selection[section.key];
							if (!selectedPart) return null;
							return (
								<div
									key={section.key}
									className="grid grid-cols-[140px_1fr] gap-2">
									<dt className="font-mono text-xs uppercase text-slate-500 truncate">
										{section.title}:
									</dt>
									<dd className="text-slate-800 truncate">
										{selectedPart.name}
									</dd>
								</div>
							);
						})}
					</dl>
				</div>

				{/* Цена и кнопка - мобилка */}
				<div className="flex items-center justify-between mt-2 sm:hidden">
					<p className="font-medium text-lg text-black">
						{item.totalPrice.toLocaleString("ru-RU")} KZT
					</p>
					<button
						onClick={() => onRemove(item.id)}
						className="group flex items-center gap-1 text-slate-500 hover:text-red-600 transition-colors"
						aria-label="Удалить товар">
						<Trash2Icon className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Колонка с ценой и кнопкой (только для десктопа) */}
			<div className="hidden sm:flex flex-col items-end justify-between h-full flex-shrink-0">
				<p className="font-medium text-xl text-black whitespace-nowrap">
					{item.totalPrice.toLocaleString("ru-RU")} KZT
				</p>
				<button
					onClick={() => onRemove(item.id)}
					className="group mt-4 flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors"
					aria-label="Удалить товар">
					<Trash2Icon className="w-5 h-5" />
					<span className="font-mono text-xs uppercase">Удалить</span>
				</button>
			</div>
		</div>
	);
}
