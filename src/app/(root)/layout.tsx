import { ReactNode } from "react";

import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import SmoothScroller from "@/components/layouts/scroll";
import { GlobalAlert } from "@/components/layouts/alert";

import { CustomCursor } from "@/components/ui/cursor";
import { Preloader } from "@/components/layouts/preloader";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Preloader />

			<CustomCursor />
			<GlobalAlert />

			<SmoothScroller>
				<div className="min-h-screen bg-white flex flex-col justify-between">
					<Header />
					<main className="">{children}</main>
					<Footer />
				</div>
			</SmoothScroller>
		</>
	);
}
