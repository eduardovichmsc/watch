// src/components/layout/scroll.tsx
// @ts-nocheck
"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

function SmoothScroller({ children }: { children: ReactNode }) {
	const options = {
		lerp: 0.2,
		duration: 1,
		smoothTouch: true,
	};

	return (
		<ReactLenis root options={options}>
			{children}
		</ReactLenis>
	);
}

export default SmoothScroller;
