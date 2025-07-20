// src/components/layout/preloader.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreloaderStore } from "@/stores/preloader";

const curtainVariants = {
	hidden: { y: 0 },
	visible: { y: 0 },
	exit: {
		transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] },
	},
} as const;

const contentVariants = {
	initial: { opacity: 1 },
	exit: {
		opacity: 0,
		transition: { duration: 0.4, ease: "easeInOut" },
	},
} as const;

export const Preloader = () => {
	const [isLoading, setIsLoading] = useState(true);
	const finishPreloading = usePreloaderStore((state) => state.finish);

	useEffect(() => {
		const hasVisited = sessionStorage.getItem("preloaderShown");

		if (hasVisited) {
			setIsLoading(false);
			finishPreloading();
			return;
		}

		document.body.classList.add("no-scroll");

		const timer = setTimeout(() => {
			setIsLoading(false);
			sessionStorage.setItem("preloaderShown", "true");
		}, 2500);

		return () => clearTimeout(timer);
	}, [finishPreloading]);

	return (
		<AnimatePresence
			mode="wait"
			onExitComplete={() => {
				document.body.classList.remove("no-scroll");
				finishPreloading();
			}}>
			{isLoading && (
				<motion.div className="fixed inset-0 z-[200] pointer-events-none">
					{/* Верхняя шторка */}
					<motion.div
						className="absolute top-0 left-0 w-full h-1/2 bg-black origin-bottom"
						variants={curtainVariants}
						initial="hidden"
						animate="visible"
						exit={{ ...curtainVariants.exit, y: "-100%" }}
					/>
					{/* Нижняя шторка */}
					<motion.div
						className="absolute bottom-0 left-0 w-full h-1/2 bg-black origin-top"
						variants={curtainVariants}
						initial="hidden"
						animate="visible"
						exit={{ ...curtainVariants.exit, y: "100%" }}
					/>

					{/* Контент */}
					<motion.div
						variants={contentVariants}
						initial="initial"
						exit="exit"
						className="absolute inset-0 flex items-center justify-center">
						<div className="text-white text-center">
							<div className="font-mono text-6xl md:text-8xl font-light">
								<div className="h-[1em] overflow-hidden">
									<motion.div
										animate={{ y: ["0em", "-1em", "-2em", "-3em"] }}
										transition={{
											times: [0, 0.3, 0.6, 1],
											duration: 1.5,
											ease: [0.83, 0, 0.17, 1],
										}}>
										<div>00</div>
										<div>34</div>
										<div>78</div>
										<div>100</div>
									</motion.div>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
