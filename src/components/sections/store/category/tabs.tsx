"use client";

import type { Category } from "@/types";
import { useCursorStore } from "@/stores";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
	categories: Category[];
	selectedCategoryId: number | null;
	onSelectCategory: (id: number | null) => void;
	buildsCount: number;
}

export const CategoryTabs = ({
	categories,
	selectedCategoryId,
	onSelectCategory,
	buildsCount,
}: CategoryTabsProps) => {
	const { setVariant } = useCursorStore();

	const allCategories = [{ id: null, name: "Все" }, ...categories];

	return (
		<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 mb-10">
			{/* Количество сборок */}
			<div className="hidden lg:block pb-0 md:pb-2.5 md:order-2">
				<p className="text-sm font-medium text-slate-500 whitespace-nowrap">
					Найдено: {buildsCount}
				</p>
			</div>

			{/* Категории */}
			<div className="flex overflow-x-auto border-b border-slate-200 md:order-1">
				{allCategories.map((category) => (
					<button
						key={category.id ?? "all"}
						onClick={() => onSelectCategory(category.id)}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className={cn(
							"px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-500",
							selectedCategoryId === category.id
								? // активная
								  "border-b-2 border-black text-black"
								: // неактивная
								  "border-b-2 border-transparent text-slate-500 hover:text-black"
						)}>
						{category.name}
					</button>
				))}
			</div>
		</div>
	);
};
