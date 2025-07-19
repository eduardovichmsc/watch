// app/components/PopularDesigns.tsx
"use client";

import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel"; // Тип для API карусели

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const content = {
	smallText: "Выбор сообщества",
	title: "Популярные дизайны.",
	description:
		"Вдохновитесь работами других энтузиастов или используйте их как основу для своего уникального проекта.",
	carouselContent: [
		{
			id: 1,
			name: "The Aviator Mk. II",
			model: "MODEL-AV-02",
			imageSrc: "/watch-aviator.png",
			href: "/gallery/aviator-mk-ii",
		},
		{
			id: 2,
			name: "The Minimalist 40",
			model: "MODEL-MN-40",
			imageSrc: "/watch-minimal-2.png",
			href: "/gallery/minimalist-40",
		},
		{
			id: 3,
			name: "The Deep Dive Pro",
			model: "MODEL-DV-01-TI",
			imageSrc: "/watch-diver.png",
			href: "/gallery/deep-dive-pro",
		},
		{
			id: 4,
			name: "The Classic Chrono",
			model: "MODEL-CR-77",
			imageSrc: "/watch-minimal-2.png",
			href: "/gallery/classic-chrono",
		},
	],
};

export const PopularDesigns = () => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<section className="w-full bg-white text-black overflow-hidden">
			<div className="mx-auto px-16 py-24 sm:py-32">
				{/* Заголовок */}
				<div className="max-w-3xl">
					<p className="font-mono text-sm uppercase tracking-widest text-zinc-500">
						{content.smallText}
					</p>
					<h2 className="mt-4 font-light text-5xl md:text-7xl tracking-tighter text-black">
						{content.title}
					</h2>
					<p className="mt-6 text-lg text-zinc-600">{content.description}</p>
				</div>

				{/* Компонент карусели */}
				<Carousel setApi={setApi} className="mt-20 -ml-4">
					<CarouselContent>
						{content.carouselContent.map((design) => (
							<CarouselItem
								key={design.id}
								className="pl-4 md:basis-1/2 lg:basis-1/3">
								<div className="p-1">
									<Link href={design.href} className="group block">
										<div className="w-full overflow-hidden bg-zinc-100 rounded-none">
											<Image
												src={design.imageSrc}
												alt={`Дизайн часов ${design.name}`}
												width={600}
												height={600}
												className="aspect-square object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
											/>
										</div>
										<div className="mt-6">
											<p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
												{design.model}
											</p>
											<h3 className="mt-2 text-xl font-semibold text-black">
												{design.name}
											</h3>
											<div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
												Подробнее
												<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
											</div>
										</div>
									</Link>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					{/* Контролы карусели и кнопка "Смотреть все" */}
					<div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-8">
						<Link
							href="/gallery"
							className="group inline-flex items-center justify-center gap-x-3 h-16 w-full sm:w-auto px-8 bg-transparent text-black border border-zinc-800 rounded-none font-semibold transition-colors hover:bg-black hover:text-white">
							<span>Смотреть всю галерею</span>
							<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
						</Link>

						<div className="flex items-center gap-4">
							<div className="font-mono text-sm text-zinc-500">
								{current} / {count}
							</div>
							{/* Кастомные кнопки навигации */}
							<CarouselPrevious className="static -translate-y-0 w-16 h-16 rounded-none border-zinc-800 bg-transparent text-black hover:bg-black hover:text-white" />
							<CarouselNext className="static -translate-y-0 w-16 h-16 rounded-none border-zinc-800 bg-transparent text-black hover:bg-black hover:text-white" />
						</div>
					</div>
				</Carousel>
			</div>
		</section>
	);
};
