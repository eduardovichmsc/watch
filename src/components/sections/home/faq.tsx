// src/components/sections/faq.tsx
"use client";

import { motion } from "framer-motion";
import { FaqItem } from "@/components/shared/card/faq";
import { PATHS } from "@/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCursorStore } from "@/stores/cursor";

const faqData = [
	{
		question: "Сколько времени занимает изготовление?",
		answer:
			"Каждые часы собираются вручную после вашего заказа. Сборка занимает от 7 до 14 рабочих дней. Сроки доставки зависят от вашего региона, но в среднем составляют 5-10 дней.",
	},
	{
		question: "Какая гарантия на часы?",
		answer:
			"На все наши часы предоставляется международная гарантия 2 года. Она покрывает любые дефекты механизма и производственные недостатки. Гарантия не распространяется на естественный износ и повреждения по вине владельца.",
	},
	{
		question: "Возможен ли возврат кастомных часов?",
		answer:
			"Поскольку каждые часы создаются по индивидуальному заказу, возврат возможен только в случае производственного брака. Мы рекомендуем тщательно проверять 3D-модель в конструкторе перед оформлением заказа.",
	},
];

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
				className="container mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12"
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				variants={containerVariants}>
				{/* Левая колонка: Заголовок */}
				<motion.div className="lg:col-span-1" variants={itemVariants}>
					<p className="font-mono text-sm uppercase tracking-wider text-slate-500 mb-2">
						FAQ
					</p>
					<h2 className="font-light text-5xl md:text-6xl tracking-tighter text-black">
						Ответы на вопросы.
					</h2>
					<p className="mt-6 text-slate-600 leading-relaxed">
						Здесь собрана ключевая информация о наших материалах, сроках и
						гарантиях. Если вы не нашли ответ, свяжитесь с нами.
					</p>
					<Link
						href={PATHS.CONTACTS}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="group inline-flex items-center gap-2 mt-8 text-black font-medium group">
						<span>Перейти к контактам</span>
						<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</motion.div>

				{/* Правая колонка: Список вопросов */}
				<motion.div
					className="lg:col-span-2 space-y-2"
					variants={containerVariants}>
					{faqData.map((item, index) => (
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
