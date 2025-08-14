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
		<div className="flex items-end justify-between gap-8 mb-10 border-b border-slate-200">
			{/* Категорий */}
			<div className="flex overflow-x-auto">
				{allCategories.map((category) => (
					<button
						key={category.id ?? "all"}
						onClick={() => onSelectCategory(category.id)}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className={cn(
							"px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-300",
							// активная
							selectedCategoryId === category.id
								? "border-b-2 border-black text-black"
								: // неактивная
								  "border-b-2 border-transparent text-slate-500 hover:text-black"
						)}>
						{category.name}
					</button>
				))}
			</div>

			{/* Количество сборок */}
			<div className="pb-2.5">
				<p className="text-sm font-medium text-slate-500 whitespace-nowrap">
					Найдено: {buildsCount}
				</p>
			</div>
		</div>
	);
};
