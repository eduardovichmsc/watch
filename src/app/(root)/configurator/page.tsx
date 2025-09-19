// app/configurator/page.tsx
import { Suspense } from "react";
import { getWatchTypes } from "@/services/data";
import { WatchConfigurator } from "@/components/sections/configurator";
import { ConfiguratorLoader } from "@/components/sections/configurator/loader";

export default async function ConfiguratorPage() {
	const watchTypes = await getWatchTypes();

	return (
		<div className="min-h-screen">
			<main>
				<Suspense fallback={<ConfiguratorLoader />}>
					<WatchConfigurator
						watchTypes={watchTypes}
						cases={[]}
						bezels={[]}
						dials={[]}
						straps={[]}
						hands={[]}
						secondHands={[]}
						gmtHands={[]}
					/>
				</Suspense>
			</main>
		</div>
	);
}
