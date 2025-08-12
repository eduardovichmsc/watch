// app/configurator/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";

import {
	getCases,
	getBezels,
	getDials,
	getStraps,
	getWatchTypes,
	getHands,
	getSecondHands,
	getGMTHands,
} from "@/services/data";
import { WatchConfigurator } from "@/components/sections/configurator";
import { ConfiguratorLoader } from "@/components/sections/configurator/loader";

export const metadata: Metadata = {
	title: "Конфигуратор | WotchModClub",
	description: "Кастомная сборка часов Seikomod | WotchModClub",
};

export default async function ConfiguratorPage() {
	const [
		watchTypes,
		cases,
		bezels,
		dials,
		straps,
		hands,
		secondHands,
		gmtHands,
	] = await Promise.all([
		getWatchTypes(),
		getCases(),
		getBezels(),
		getDials(),
		getStraps(),
		getHands(),
		getSecondHands(),
		getGMTHands(),
	]);

	return (
		<div className="min-h-screen">
			<main className="mx-auto px-4 lg:px-16 sm:pb-6 lg:pb-16">
				<Suspense fallback={<ConfiguratorLoader />}>
					<WatchConfigurator
						watchTypes={watchTypes}
						cases={cases}
						bezels={bezels}
						dials={dials}
						straps={straps}
						hands={hands}
						secondHands={secondHands}
						gmtHands={gmtHands}
					/>
				</Suspense>
			</main>
		</div>
	);
}
