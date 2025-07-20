// app/configurator/page.tsx

import { Suspense } from "react";

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
import { WatchConfigurator } from "@/components/sections/constructor";
import { SquareSpinner } from "@/components/ui/spinner";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dynamic = "force-dynamic";

const ConfiguratorLoader = () => {
	return (
		<div className="flex min-h-[80vh] items-center justify-center">
			<SquareSpinner />
		</div>
	);
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
