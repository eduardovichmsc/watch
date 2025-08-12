// app/cart/page.tsx

import { Metadata } from "next";
import { CartWrapper } from "@/components/sections/cart";

export const metadata: Metadata = {
	title: "Корзина | WotchModClub",
	description: "Кастомная сборка часов Seikomod | WotchModClub",
};

export default function CartPage() {
	return <CartWrapper />;
}
