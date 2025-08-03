import { getBuilds } from "@/services/data";
import { BuildCard } from "@/components/shared/card/build";

export default async function GalleryPage() {
	const builds = await getBuilds();

	return (
		<div className="px-4 py-12 sm:px-8 md:py-20 lg:px-16 lg:py-24">
			<div className="mb-12 md:mb-16">
				<h1 className="font-light text-5xl md:text-7xl tracking-tighter text-black">
					Галерея Вдохновения
				</h1>
				<p className="mt-4 text-lg text-slate-600 max-w-2xl">
					Ознакомьтесь с нашими готовыми работами. Каждая из них — это отправная
					точка для вашего уникального дизайна.
				</p>
			</div>

			{builds.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{builds.map((build) => (
						<BuildCard key={build.id} build={build} />
					))}
				</div>
			) : (
				<p className="text-center text-slate-500">
					В галерее пока нет готовых работ.
				</p>
			)}
		</div>
	);
}
