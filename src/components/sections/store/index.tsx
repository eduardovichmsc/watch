// src/components/store/wrapper.tsx
"use client";

import { useState, useMemo } from "react";
import type { Build, Category } from "@/types";
import { BuildCard } from "@/components/shared/card/build";
import { CategoryTabs } from "@/components/sections/store/category/tabs";

interface Props {
	initialBuilds: Build[];
	categories: Category[];
}

export const BuildWrapper = ({ initialBuilds, categories }: Props) => {
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null
	);

	const filteredBuilds = useMemo(() => {
		if (selectedCategoryId === null) {
			return initialBuilds;
		}
		return initialBuilds.filter(
			(build) => build.watch_type.category.id === selectedCategoryId
		);
	}, [initialBuilds, selectedCategoryId]);

	return (
		<>
			<CategoryTabs
				categories={categories}
				selectedCategoryId={selectedCategoryId}
				onSelectCategory={setSelectedCategoryId}
			/>

			{filteredBuilds.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredBuilds.map((build) => (
						<BuildCard key={build.id} build={build} />
					))}
				</div>
			) : (
				<p className="text-center text-slate-500 py-10">
					В этой категории пока нет готовых работ.
				</p>
			)}
		</>
	);
};
