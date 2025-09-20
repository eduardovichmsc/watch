import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/ui/cursor";
import { Preloader } from "@/components/layouts/preloader";
import { GlobalAlert } from "@/components/layouts/alert";
import {
	cormorant,
	geistMono,
	geistSans,
	ibmPlexMono,
	urbanist,
} from "@/lib/fonts";

export const metadata: Metadata = {
	title: "Добро пожаловать | WotchModClub",
	description: "Кастомная сборка часов Seikomod | WotchModClub",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${ibmPlexMono.variable} ${urbanist.variable} ${geistSans.variable} ${cormorant.variable} ${geistMono.variable} antialiased`}>
				<Preloader />

				<CustomCursor />
				<GlobalAlert />
				{children}
			</body>
		</html>
	);
}
