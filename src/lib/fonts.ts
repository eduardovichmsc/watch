import {
	Cormorant_Garamond,
	Geist,
	Geist_Mono,
	IBM_Plex_Mono,
	Urbanist,
} from "next/font/google";

export const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const cormorant = Cormorant_Garamond({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	variable: "--font-cormorant",
});

export const urbanist = Urbanist({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	variable: "--font-urbanist",
});

export const ibmPlexMono = IBM_Plex_Mono({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-ibmplexmono",
});
