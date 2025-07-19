// src/components/shared/card/faq.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

type FaqItemProps = {
	question: string;
	answer: string;
	isInitiallyOpen?: boolean;
	variants: any;
};

export const FaqItem = ({
	question,
	answer,
	isInitiallyOpen = false,
	variants,
}: FaqItemProps) => {
	const [isOpen, setIsOpen] = useState(isInitiallyOpen);

	return (
		<motion.div className="border-b border-stone-200" variants={variants}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full cursor-pointer list-none items-center justify-between py-6 text-left text-lg font-semibold text-stone-800 transition-colors hover:text-stone-950">
				<span>{question}</span>
				<motion.div
					animate={{ rotate: isOpen ? 45 : 0 }}
					transition={{ duration: 0.3, ease: "easeOut" }}>
					<Plus className="h-5 w-5 flex-shrink-0" />
				</motion.div>
			</button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.section
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}>
						<div className="pb-6 pr-8 text-base text-stone-600 leading-relaxed">
							{answer}
						</div>
					</motion.section>
				)}
			</AnimatePresence>
		</motion.div>
	);
};
