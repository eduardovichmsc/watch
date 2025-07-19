// src/components/layout/preloader.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Варианты для шторок не требуют изменений, они уже адаптивны.
const curtainVariants = {
	hidden: { y: 0 },
	visible: { y: 0 },
	exit: {
		transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] },
	},
} as const;

// Варианты для контента тоже в порядке.
const contentVariants = {
	initial: { opacity: 1 },
	exit: {
		opacity: 0,
		// Убрал scale, чтобы выход был чище, но это дело вкуса.
		transition: { duration: 0.4, ease: "easeInOut" },
	},
} as const;

export const Preloader = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const hasVisited = sessionStorage.getItem("preloaderShown");

		if (hasVisited) {
			setIsLoading(false);
			return;
		}

		// Блокируем скролл, пока активен прелоадер
		document.body.classList.add("no-scroll");

		const timer = setTimeout(() => {
			setIsLoading(false);
			sessionStorage.setItem("preloaderShown", "true");
		}, 2500); // Общая длительность

		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence
			mode="wait"
			// Разблокируем скролл только после завершения анимации выхода
			onExitComplete={() => document.body.classList.remove("no-scroll")}>
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
							{/* --- НАЧАЛО ИЗМЕНЕНИЙ --- */}

							{/* 1. Классы для размера шрифта перенесены на контейнер.
                                   Это задает базовый размер для единицы 'em'. */}
							<div className="font-mono text-6xl md:text-8xl font-light">
								{/* 2. Высота контейнера теперь '1em', а не 'h-24'.
                                       Это означает "высота одного символа текущего размера".
                                       Она будет автоматически меняться вместе с размером шрифта. */}
								<div className="h-[1em] overflow-hidden">
									{/* 3. Анимация 'y' теперь использует 'em' вместо пикселей.
                                           -1em всегда будет сдвигать блок ровно на одну строку вверх,
                                           независимо от того, какой сейчас размер шрифта. */}
									<motion.div
										animate={{ y: ["0em", "-1em", "-2em", "-3em"] }}
										transition={{
											times: [0, 0.3, 0.6, 1],
											duration: 1.5,
											ease: [0.83, 0, 0.17, 1],
										}}>
										{/* Числа остаются без изменений */}
										<div>00</div>
										<div>34</div>
										<div>78</div>
										<div>100</div>
									</motion.div>
								</div>

								{/* (Опционально) Добавляем подпись для большей эстетики.
                                    Она плавно появляется и исчезает вместе с контентом. */}
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5, duration: 0.5 }}
									className="text-sm md:text-base font-sans tracking-widest uppercase mt-4">
									WotchModClub
								</motion.p>
							</div>

							{/* --- КОНЕЦ ИЗМЕНЕНИЙ --- */}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
