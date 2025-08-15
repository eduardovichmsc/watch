// app/components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Settings, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { PATHS } from "@/constants";
import { usePreloaderStore } from "@/stores";
import { useCursorStore } from "@/stores";

const content = {
	image: {
		src: "/home/royal-collection.jpg",
		alt: "Премиальные кастомизированные часы",
	},
	subtitle: "БОЛЬШЕ, ЧЕМ ПРОСТО ЧАСЫ",
	title: {
		line1: "Ваше наследие,",
		line2: "Воплощенное.",
	},
	description:
		"Совершенная инженерия. Бескомпромиссный дизайн. Создайте часы, которые отражают именно вас.",
	button: {
		text: "Посмотреть модели",
		link: PATHS.STORE,
	},
	secondaryButton: {
		text: "Создать свои часы",
		link: PATHS.CONFIGURATOR,
	},
};

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
} as const;

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.22, 1, 0.36, 1],
		},
	},
} as const;

export const Hero = () => {
	const isPreloadingFinished = usePreloaderStore((state) => state.isFinished);
	const { setVariant } = useCursorStore();

	return (
		<section className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
			{/* Фоновое изображение и градиент */}
			<div className="absolute inset-0 z-0">
				<motion.div
					initial={{ scale: 1, opacity: 0.3 }}
					animate={{ scale: 1.05, opacity: 0.75 }}
					transition={{
						duration: 15,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "mirror",
					}}
					className="w-full h-full">
					<Image
						src={content.image.src}
						fill
						priority
						className="object-cover"
						alt={content.image.alt}
					/>
				</motion.div>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
			</div>

			{/* Контент */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate={isPreloadingFinished ? "visible" : "hidden"}
				className="relative z-10 flex flex-col items-center text-center px-4">
				<motion.p
					variants={itemVariants}
					className="font-mono text-sm uppercase tracking-widest text-zinc-400">
					{content.subtitle}
				</motion.p>

				<motion.h1
					variants={itemVariants}
					className="mt-4 font-extralight text-5xl md:text-8xl lg:text-9xl tracking-tighter text-white leading-none">
					{content.title.line1}
					<br />
					{content.title.line2}
				</motion.h1>

				<motion.p
					variants={itemVariants}
					className="mt-6 max-w-xl text-lg text-zinc-300">
					{content.description}
				</motion.p>

				{/* Контейнер для кнопок */}
				<motion.div
					variants={itemVariants}
					className="mt-12 font-medium flex flex-col sm:flex-row items-center gap-6">
					{/* Основная кнопка */}
					<Link
						href={content.button.link}
						className="group inline-flex items-center justify-center gap-x-3 h-14 w-full sm:w-auto px-8 bg-white text-black rounded-none transition-colors hover:bg-zinc-200">
						<Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
						<span>{content.button.text}</span>
					</Link>

					{/* Вторичная кнопка */}
					<Link
						href={content.secondaryButton.link}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="group inline-flex items-center gap-x-2 text-zinc-300 transition-colors hover:text-white">
						<span>{content.secondaryButton.text}</span>
						<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
};
