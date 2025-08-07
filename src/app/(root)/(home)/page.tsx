// src/app/page.tsx
import { Hero } from "@/components/sections/home/hero";
import { Process } from "@/components/sections/home/process";
import { FaqSection } from "@/components/sections/home/faq";
import { PhilosophySection } from "@/components/sections/home/philosophy";
import { RecentBuildsSection } from "@/components/sections/home/recent_builds";

export default function HomePage() {
	return (
		<div className="">
			<Hero />
			<RecentBuildsSection />
			<Process />
			<PhilosophySection />
			<FaqSection />
		</div>
	);
}
