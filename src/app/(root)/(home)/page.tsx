// src/app/page.tsx
import { Hero } from "@/components/sections/hero";
import { PopularDesigns } from "@/components/sections/popular_designs";
import { Process } from "@/components/sections/process";
import { FaqSection } from "@/components/sections/faq";
import { PhilosophySection } from "@/components/sections/philosophy";
import { Gallery } from "@/components/sections/gallery";

export default function HomePage() {
	return (
		<div className="">
			<Hero />
			<PopularDesigns />
			<Process />
			<PhilosophySection />
			<FaqSection />
		</div>
	);
}
