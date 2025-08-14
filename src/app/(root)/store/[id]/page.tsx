// src/app/store/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
	getBezels,
	getBuildById,
	getCases,
	getDials,
	getGMTHands,
	getHands,
	getSecondHands,
	getStraps,
} from "@/services/data";
import { BuildDetail } from "@/components/sections/store/details";

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
	const [
		build,
		allCases,
		allBezels,
		allDials,
		allStraps,
		allHands,
		allSecondHands,
		allGmtHands,
	] = await Promise.all([
		getBuildById(id),
		getCases(),
		getBezels(),
		getDials(),
		getStraps(),
		getHands(),
		getSecondHands(),
		getGMTHands(),
	]);

	if (!build) {
		notFound();
	}

	let totalPrice = parseFloat(build.watch_type.price || "0");

	const priceMap = {
		case: new Map(allCases.map((i) => [i.id, parseFloat(i.price || "0")])),
		bezel: new Map(allBezels.map((i) => [i.id, parseFloat(i.price || "0")])),
		dial: new Map(allDials.map((i) => [i.id, parseFloat(i.price || "0")])),
		strap: new Map(allStraps.map((i) => [i.id, parseFloat(i.price || "0")])),
		hand: new Map(allHands.map((i) => [i.id, parseFloat(i.price || "0")])),
		secondhand: new Map(
			allSecondHands.map((i) => [i.id, parseFloat(i.price || "0")])
		),
		gmthands: new Map(
			allGmtHands.map((i) => [i.id, parseFloat(i.price || "0")])
		),
	};

	build.components.forEach((component) => {
		const componentType = component.type.toLowerCase() as keyof typeof priceMap;
		const price = priceMap[componentType]?.get(component.id);
		if (price) {
			totalPrice += price;
		}
	});

	return <BuildDetail build={build} calculatedPrice={totalPrice} />;
}
