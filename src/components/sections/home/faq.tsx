// src/components/sections/faq.tsx
"use client";

import { motion } from "framer-motion";
import { FaqItem } from "@/components/shared/card/faq";
import { PATHS } from "@/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCursorStore } from "@/stores";
import { FAQDATA } from "@/constants";

const content = {
	title: "FAQ",
	subtitle: "Ответы на вопросы.",
	description:
		"Здесь собрана ключевая информация о наших материалах, сроках и гарантиях. Если вы не нашли ответ, свяжитесь с нами.",
	button: {
		label: "Перейти к контактам",
		href: PATHS.CONTACTS,
		icon: ArrowRight,
	},
};

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
} as const;

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	show: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	},
} as const;

export const FaqSection = () => {
	const { setVariant } = useCursorStore();

	return (
		<section className="w-full bg-white text-black py-20 md:py-28 lg:py-32">
			<motion.div
				className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12"
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				variants={containerVariants}>
				{/* Левая колонка: Заголовок */}
				<motion.div className="lg:col-span-1" variants={itemVariants}>
					<p className="font-mono text-sm uppercase tracking-wider text-slate-500 mb-2">
						{content.title}
					</p>
					<h2 className="font-light text-5xl md:text-6xl tracking-tighter text-black">
						{content.subtitle}
					</h2>
					<p className="mt-6 text-slate-600 leading-relaxed">
						{content.description}
					</p>
					<Link
						href={content.button.href}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="group inline-flex items-center gap-2 mt-8 text-black font-medium group">
						<span>{content.button.label}</span>
						<content.button.icon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</motion.div>

				{/* Правая колонка: Список вопросов */}
				<motion.div
					className="lg:col-span-2 space-y-2"
					variants={containerVariants}>
					{FAQDATA.map((item, index) => (
						<FaqItem
							key={index}
							index={index}
							question={item.question}
							answer={item.answer}
							isInitiallyOpen={index === 0}
							variants={itemVariants}
						/>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
};
