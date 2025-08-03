import { PATHS } from "@/constants/paths";
import { WatchType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PopularBuildsProps {
	builds: WatchType[];
}

const PopularBuilds = ({ builds }: PopularBuildsProps) => {
	return (
		<section className="mt-24">
			<h2 className="font-light text-4xl md:text-5xl tracking-tighter text-black">
				Популярные сборки
			</h2>
			<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{builds.map((build) => (
					<Link
						key={build.id}
						href={PATHS.CONFIGURATOR}
						className="group block">
						<div className="aspect-square bg-slate-50 border border-slate-200 overflow-hidden">
							{build.image && (
								<Image
									src={build.image}
									alt={build.name}
									width={500}
									height={500}
									className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
								/>
							)}
						</div>
						<div className="mt-4">
							<h3 className="font-semibold text-lg">{build.name}</h3>
							<p className="font-mono text-sm text-slate-600 mt-1">
								{build.price} KZT
							</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};
