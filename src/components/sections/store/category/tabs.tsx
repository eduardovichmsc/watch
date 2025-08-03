"use client";

import type { Category } from "@/types";
import { useCursorStore } from "@/stores/cursor";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
	categories: Category[];
	selectedCategoryId: number | null;
	onSelectCategory: (id: number | null) => void;
}

export const CategoryTabs = ({
	categories,
	selectedCategoryId,
	onSelectCategory,
}: CategoryTabsProps) => {
	const { setVariant } = useCursorStore();

	const allCategories = [{ id: null, name: "Все" }, ...categories];

	return (
		<div className="flex items-center gap-2 mb-10 overflow-x-auto">
			{allCategories.map((category) => (
				<button
					key={category.id ?? "all"}
					onClick={() => onSelectCategory(category.id)}
					onMouseEnter={() => setVariant("link")}
					onMouseLeave={() => setVariant("default")}
					className={cn(
						"px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-500 ease-in-out",
						selectedCategoryId === category.id
							? "text-black border-black" // Активная вкладка
							: "text-slate-500 border-slate-200 hover:text-black hover:border-black" // Неактивная вкладка
					)}>
					{category.name}
				</button>
			))}
		</div>
	);
};
