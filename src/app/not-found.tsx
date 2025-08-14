// src/app/not-found.tsx
"use client";

import Link from "next/link";
import { Wrench, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { useCursorStore } from "@/stores/cursor";
import { PATHS } from "@/constants/paths";

const content = {
	errorCode: "404",
	title: "Страница не найдена",
	description:
		"Механизм этой страницы не существует или был перемещен. Давайте вернемся к чему-то более интересному.",
	primaryButton: {
		label: "На главную",
		path: PATHS.HOME,
	},
	secondaryButton: {
		label: "В магазин",
		path: PATHS.STORE,
	},
};

export default function NotFoundPage() {
	const { setVariant } = useCursorStore();

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center p-8 bg-white text-black">
			{/* Фон с шестеренками */}
			<div className="absolute inset-0 overflow-hidden opacity-5 z-0">
				<motion.div
					className="absolute -top-1/4 -left-1/4"
					animate={{ rotate: 360 }}
					transition={{ duration: 120, repeat: Infinity, ease: "linear" }}>
					<Wrench size={500} className="text-slate-900" />
				</motion.div>
				<motion.div
					className="absolute -bottom-1/4 -right-1/4"
					animate={{ rotate: -360 }}
					transition={{ duration: 150, repeat: Infinity, ease: "linear" }}>
					<Wrench size={600} className="text-slate-900" />
				</motion.div>
			</div>

			<div className="relative z-10">
				<motion.h1
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="font-mono text-7xl md:text-9xl font-bold text-black tracking-tighter">
					{content.errorCode}
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
					className="mt-4 font-light text-2xl md:text-4xl tracking-tight text-slate-800">
					{content.title}
				</motion.p>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
					className="mt-6 max-w-lg text-slate-600">
					{content.description}
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
					className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
					<Link
						href={content.primaryButton.path}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="flex items-center justify-center gap-2 w-full sm:w-auto h-14 px-8 bg-black text-white font-medium uppercase tracking-wider hover:bg-zinc-800 transition-colors">
						<Compass size={20} />
						{content.primaryButton.label}
					</Link>
					<Link
						href={content.primaryButton.path}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="flex items-center justify-center gap-2 w-full sm:w-auto h-14 px-8 border border-slate-300 text-slate-800 font-medium uppercase tracking-wider hover:bg-slate-100 transition-colors">
						<Wrench size={20} />
						{content.secondaryButton.label}
					</Link>
				</motion.div>
			</div>
		</div>
	);
}
