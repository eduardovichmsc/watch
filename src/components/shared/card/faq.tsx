// src/components/shared/card/faq.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCursorStore } from "@/stores/cursor";

type Props = {
	index: number;
	question: string;
	answer: string;
	isInitiallyOpen?: boolean;
	variants: any;
};

export const FaqItem = ({
	index,
	question,
	answer,
	isInitiallyOpen = false,
	variants,
}: Props) => {
	const [isOpen, setIsOpen] = useState(isInitiallyOpen);
	const { setVariant } = useCursorStore();

	return (
		<motion.div
			className="border-b border-slate-200"
			variants={variants}
			onMouseEnter={() => setVariant("link")}
			onMouseLeave={() => setVariant("default")}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full cursor-pointer py-6 text-left">
				<div className="flex items-center gap-4">
					<span className="font-mono text-slate-400">
						{String(index + 1).padStart(2, "0")}
					</span>
					<span className="flex-1 text-xl font-medium text-black">
						{question}
					</span>

					<motion.div
						className="ml-auto"
						animate={{ rotate: isOpen ? 90 : 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}>
						<ChevronRight className="size-5 text-slate-400" />
					</motion.div>
				</div>
			</button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.section
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
						<div className="pt-4 pb-8 pl-10 text-base text-slate-600 leading-relaxed">
							{answer}
						</div>
					</motion.section>
				)}
			</AnimatePresence>
		</motion.div>
	);
};
