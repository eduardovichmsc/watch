// src/components/home/recent_builds/index.tsx
import { getBuilds } from "@/services/data";
import { BuildsCarousel } from "./carousel";

const content = {
	title: "Недавние сборки.",
	description:
		"Вдохновитесь последними работами, созданными в нашем ателье. Каждая из них — это уникальная история, которую вы можете взять за основу.",
};

const LIMIT = 4;

export const RecentBuildsSection = async () => {
	const allBuilds = await getBuilds();

	const showMore = allBuilds.length > LIMIT;
	const recentBuilds = allBuilds.slice(0, LIMIT);

	if (recentBuilds.length === 0) {
		return null;
	}

	return (
		<section className="w-full bg-white text-black overflow-hidden">
			<div className="mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-24">
				<div className="max-w-3xl">
					<h2 className="mt-4 font-light text-5xl md:text-7xl tracking-tighter text-black">
						{content.title}
					</h2>
					<p className="mt-6 text-lg text-zinc-600">{content.description}</p>
				</div>

				<BuildsCarousel builds={recentBuilds} showMore={showMore} />
			</div>
		</section>
	);
};
