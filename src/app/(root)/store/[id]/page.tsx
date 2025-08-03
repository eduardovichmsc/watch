// src/app/store/[id]/page.tsx
import { getBuildById } from "@/services/data";
import { notFound } from "next/navigation";
import { BuildDetail } from "@/components/sections/store/details";
import type { Metadata } from "next";

interface Props {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const build = await getBuildById(id);

	if (!build) {
		return {
			title: "Сборка не найдена",
		};
	}

	return {
		title: `${build.name} | WotchModClub`,
		description:
			build.description ||
			`Кастомная сборка часов ${build.name} на базе ${build.watch_type.name}.`,
		openGraph: {
			images: [build.image],
		},
	};
}

export default async function BuildPage({ params }: Props) {
	const { id } = await params;
	const [build] = await Promise.all([getBuildById(id)]);

	if (!build) {
		notFound();
	}

	return <BuildDetail build={build} />;
}
