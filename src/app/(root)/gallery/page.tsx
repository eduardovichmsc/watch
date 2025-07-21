// app/gallery/page.tsx
import { getWatchTypes } from "@/services/data";
import { GalleryCard } from "@/components/shared/card/gallery";

export default async function GalleryPage() {
	const watchTypes = await getWatchTypes();

	return (
		// Убираем container, добавляем отступы напрямую
		<div className="px-4 py-12 sm:px-8 md:py-20 lg:px-16 lg:py-24">
			{/* Заголовок стал более сдержанным */}
			<div className="max-w-4xl mb-12 md:mb-16">
				<h1 className="font-light text-5xl md:text-7xl tracking-tighter text-black">
					Галерея моделей.
				</h1>
				<p className="mt-4 text-lg text-slate-600">
					Каждая модель — это чистый холст для вашего воображения. Выберите
					базу, с которой начнется ваша история.
				</p>
			</div>

			{watchTypes.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
					{watchTypes.map((model) => (
						<GalleryCard key={model.id} model={model} />
					))}
				</div>
			) : (
				<div className="flex items-center justify-center min-h-[50vh] border border-dashed border-slate-300">
					<p className="text-center text-slate-500">
						В данный момент нет доступных моделей для кастомизации.
					</p>
				</div>
			)}
		</div>
	);
}
