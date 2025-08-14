// src/components/sections/faq.tsx
"use client";

import { motion } from "framer-motion";
import { FaqItem } from "@/components/shared/card/faq";
import { PATHS } from "@/constants";

const faqData = [
	{
		question: "Какие материалы я могу использовать в конструкторе?",
		answer:
			"Мы предлагаем премиальные материалы: хирургическую сталь 316L, титан Grade 5, сапфировое стекло с антибликовым покрытием, а также натуральную кожу и каучук для ремешков.",
	},
	{
		question: "Сколько времени занимает изготовление и доставка?",
		answer:
			"Каждые часы собираются вручную после вашего заказа. Сборка занимает от 7 до 14 рабочих дней. Сроки доставки зависят от вашего региона, но в среднем составляют 5-10 дней.",
	},
	{
		question: "Какая гарантия на часы?",
		answer:
			"На все наши часы предоставляется международная гарантия 2 года. Она покрывает любые дефекты механизма и производственные недостатки. Гарантия не распространяется на естественный износ и повреждения по вине владельца.",
	},
	{
		question: "Могу ли я вернуть часы, если дизайн мне не понравился?",
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
	show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

export const FaqSection = () => {
	return (
		<section className="w-full bg-stone-50 text-stone-900 lg:px-16 py-24 sm:py-32 overflow-hidden">
			<motion.div
				className="w-full px-8 lg:px-16 lg:max-w-4xl mx-auto"
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				variants={containerVariants}>
				<motion.div className="text-center" variants={itemVariants}>
					<h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
						Частые вопросы
					</h2>
					<p className="mt-4 text-lg text-stone-600">
						Все, что вам нужно знать перед тем, как создать свои идеальные часы.
					</p>
				</motion.div>

				<motion.div
					className="mt-16 border-t border-stone-200"
					variants={containerVariants}>
					{faqData.map((item, index) => (
						<FaqItem
							key={index}
							question={item.question}
							answer={item.answer}
							isInitiallyOpen={index === 0}
							variants={itemVariants}
						/>
					))}
				</motion.div>

				<motion.div
					className="mt-16 text-center border border-stone-200 p-8"
					variants={itemVariants}>
					<h3 className="text-xl font-bold">Не нашли ответ?</h3>
					<p className="mt-2 text-stone-600">
						Наша команда поддержки готова помочь вам с любым вопросом.
					</p>
					<a
						href={PATHS.CONTACTS}
						className="
              group inline-flex items-center gap-3 mt-6 px-8 py-3 
              font-semibold text-base border border-stone-800 text-stone-800
              hover:bg-stone-800 hover:text-stone-50 
              transition-colors duration-300 ease-in-out
            ">
						Связаться с нами
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
};
