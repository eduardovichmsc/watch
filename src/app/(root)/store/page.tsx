import { BuildWrapper } from "@/components/sections/store";
import { getBuilds, getCategories } from "@/services/data";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Магазин | WotchModClub",
	description: "Кастомная сборка часов Seikomod | WotchModClub",
};

const content = {
	title: "Готовые сборки",
	description:
		"Ознакомьтесь с нашими готовыми работами. Каждая из них — это отправная точка для вашего уникального дизайна.",
};

export default async function StorePage() {
	const [builds, categories] = await Promise.all([
		getBuilds(),
		getCategories(),
	]);

	return (
		<div className="px-4 py-12 sm:px-8 md:py-20 lg:px-16 lg:py-24">
			<div className="mb-12 md:mb-16">
				<h1 className="font-light text-5xl md:text-7xl tracking-tighter text-black">
					{content.title}
				</h1>
				<p className="mt-4 text-lg text-slate-600 max-w-2xl">
					{content.description}
				</p>
			</div>

			<BuildWrapper initialBuilds={builds} categories={categories} />
		</div>
	);
}
