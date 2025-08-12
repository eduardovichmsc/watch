// src/app/page.tsx
import { Metadata } from "next";
import { Fragment } from "react";

import { Hero } from "@/components/sections/home/hero";
import { Process } from "@/components/sections/home/process";
import { FaqSection } from "@/components/sections/home/faq";
import { PhilosophySection } from "@/components/sections/home/philosophy";
import { RecentBuildsSection } from "@/components/sections/home/recent_builds";

export const metadata: Metadata = {
	title: "Главная страница | WotchModClub",
	description: "Кастомная сборка часов Seikomod | WotchModClub",
};

export default function HomePage() {
	return (
		<Fragment>
			<Hero />
			<RecentBuildsSection />
			<Process />
			<PhilosophySection />
			<FaqSection />
		</Fragment>
	);
}
