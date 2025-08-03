// src/components/shared/card/build.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";
import { PATHS } from "@/constants/paths";
import type { Build } from "@/types";
import { useCursorStore } from "@/stores/cursor";

interface BuildCardProps {
	build: Build;
}

export const BuildCard = ({ build }: BuildCardProps) => {
	const { setVariant } = useCursorStore();
	const goToLink = PATHS.STORE + "/" + build.id;

	return (
		<div className="group relative block overflow-hidden border border-slate-200">
			<Link href={goToLink} draggable={false}>
				<div className="aspect-4/5 w-full bg-slate-100">
					{build.image && (
						<Image
							src={build.image}
							alt={build.name}
							width={500}
							height={500}
							className="w-full h-full object-cover transition-transform duration-500 ease-in-out scale-105 group-hover:scale-100"
						/>
					)}
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition duration-500 group-hover:opacity-50" />
				<div className="absolute bottom-0 left-0 p-6 text-white w-full">
					<h3 className="text-2xl font-semibold leading-tight">{build.name}</h3>
					<p className="font-mono text-xs uppercase text-slate-300 mt-1">
						На базе {build.watch_type.name}
					</p>
				</div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">
					<div
						className="flex items-center gap-x-2 bg-white text-black px-6 py-3 font-medium"
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}>
						<Settings size={18} />
						<span>Посмотреть детали</span>
					</div>
				</div>
			</Link>
		</div>
	);
};
