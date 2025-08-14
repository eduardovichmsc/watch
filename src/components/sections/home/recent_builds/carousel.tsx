// src/components/home/builds-carousel.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import type { CarouselApi } from "@/components/ui/carousel";
import type { Build } from "@/types";
import { BuildCard } from "@/components/shared/card/build";
import { useCursorStore } from "@/stores";
import { PATHS } from "@/constants";

interface Props {
	builds: Build[];
	showMore: boolean;
}

export const BuildsCarousel = ({ builds, showMore }: Props) => {
	const { setVariant } = useCursorStore();
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
		<Carousel
			setApi={setApi}
			className="mt-16 lg:-ml-4"
			opts={{ align: "start", dragFree: true }}>
			<CarouselContent>
				{builds.map((build) => (
					<CarouselItem
						key={build.id}
						className="lg:pl-4 md:basis-1/2 lg:basis-1/3">
						<div className="p-1 h-full">
							<BuildCard build={build} />
						</div>
					</CarouselItem>
				))}
				{showMore && (
					<CarouselItem className="lg:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
						<div className="p-1 h-full">
							<Link
								href={PATHS.STORE}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className="group flex h-full w-full flex-col items-center justify-center gap-y-4 border border-zinc-800 bg-zinc-100/50 text-black transition-colors duration-500 hover:bg-black hover:text-white">
								<ArrowRight className="h-8 w-8 transition-transform duration-300" />
							</Link>
						</div>
					</CarouselItem>
				)}
			</CarouselContent>

			<div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-8">
				<Link
					href={PATHS.STORE}
					onMouseEnter={() => setVariant("link")}
					onMouseLeave={() => setVariant("default")}
					className="inline-flex items-center justify-center gap-x-3 h-14 w-full sm:w-auto px-8 bg-transparent text-black border border-zinc-800 font-medium transition-colors hover:bg-black hover:text-white">
					<span>Смотреть всю галерею</span>
				</Link>

				{builds.length > 3 && (
					<div className="flex items-center gap-4">
						<div className="font-mono text-sm text-zinc-500">
							{current} / {count}
						</div>
						<CarouselPrevious className="static -translate-y-0 size-14 rounded-none border-zinc-800 bg-transparent text-black hover:bg-black hover:text-white" />
						<CarouselNext className="static -translate-y-0 size-14 rounded-none border-zinc-800 bg-transparent text-black hover:bg-black hover:text-white" />
					</div>
				)}
			</div>
		</Carousel>
	);
};
