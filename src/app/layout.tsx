import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
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
				<NextTopLoader
					color="#000000"
					initialPosition={0.5}
					crawlSpeed={50}
					height={5}
					crawl={false}
					showSpinner={false}
					easing="ease"
					speed={50}
					shadow="0 0 10px #000000,0 0 5px #000000"
				/>
				<Preloader />

				<CustomCursor />
				<GlobalAlert />
				{children}
			</body>
		</html>
	);
}
