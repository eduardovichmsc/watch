import FavoritesWrapper from "@/components/sections/favorites";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Избранное | WotchModClub",
	description: "Кастомная сборка часов Seikomod | WotchModClub",
};

export default function FavoritesPage() {
	return <FavoritesWrapper />;
}
