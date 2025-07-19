// app/components/Gallery.tsx
import Image from "next/image";
import { Eye } from "lucide-react";

const GalleryImage = ({
	src,
	alt,
	className,
}: {
	src: string;
	alt: string;
	className?: string;
}) => (
	<div className={`group relative w-full h-full overflow-hidden ${className}`}>
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
		/>
		<div className="absolute inset-0 bg-black/20 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
			<div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
				<Eye className="h-6 w-6 text-white" />
			</div>
		</div>
		<a href="/gallery" className="absolute inset-0" aria-label={alt}></a>
	</div>
);

export const Gallery = () => {
	return (
		<section className="w-full bg-gray-900 text-gray-50 px-16 py-24 sm:py-32">
			<div className="w-full mx-auto">
				<div className="text-left mb-16 md:flex md:items-end md:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">
							Источник вдохновения
						</p>
						<h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-50">
							Создано нашими клиентами
						</h2>
					</div>
					<a
						href="/gallery"
						className="hidden md:inline-block mt-4 md:mt-0 font-semibold text-gray-300 hover:text-white transition-colors">
						Смотреть всю галерею →
					</a>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[300px] md:h-[600px]">
					{/* Большая картинка */}
					<GalleryImage
						src="/gallery-1.jpg"
						alt="Дизайн часов 1"
						className="md:col-span-2 md:row-span-2"
					/>
					{/* Маленькие картинки */}
					<GalleryImage src="/gallery-2.jpg" alt="Дизайн часов 2" />
					<GalleryImage src="/gallery-3.jpg" alt="Дизайн часов 3" />
					<GalleryImage src="/gallery-4.jpg" alt="Дизайн часов 4" />
					<GalleryImage src="/gallery-5.jpg" alt="Дизайн часов 5" />
				</div>
			</div>
		</section>
	);
};
