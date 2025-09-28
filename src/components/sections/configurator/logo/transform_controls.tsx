// src/components/sections/configurator/logo/transform-controls.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RotateCw, Maximize, Trash2 } from "lucide-react";

interface TransformControlsProps {
	onRotate: (event: MouseEvent | TouchEvent | PointerEvent, info: any) => void;
	onScale: (event: MouseEvent | TouchEvent | PointerEvent, info: any) => void;
	onRemove: () => void;
}

const handleVariants = {
	initial: { scale: 0, opacity: 0 },
	animate: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
	exit: { scale: 0, opacity: 0 },
};

export const TransformControls = ({
	onRotate,
	onScale,
	onRemove,
}: TransformControlsProps) => {
	const ignoreClass = "ignore-in-screenshot";

	return (
		<>
			{/* Рамка */}
			<div
				className={cn(
					"absolute inset-0 border border-dashed border-blue-500 pointer-events-none",
					ignoreClass
				)}
			/>

			{/* Вращение */}
			<motion.div
				drag="x"
				onDrag={onRotate}
				dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
				dragElastic={0}
				variants={handleVariants}
				className="absolute -top-3 -right-3 size-8 bg-white rounded-full shadow-md flex items-center justify-center cursor-alias">
				<RotateCw size={16} className="text-slate-700" />
			</motion.div>

			{/* Масштабирование */}
			<motion.div
				drag
				onDrag={onScale}
				dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
				dragElastic={0}
				variants={handleVariants}
				className="absolute -bottom-3 -right-3 size-8 bg-white rounded-full shadow-md flex items-center justify-center cursor-nwse-resize">
				<Maximize size={16} className="text-slate-700" />
			</motion.div>

			{/* Удаление */}
			<motion.button
				onClick={onRemove}
				variants={handleVariants}
				className="absolute -bottom-3 -left-3 size-8 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white transition-colors">
				<Trash2 size={16} />
			</motion.button>
		</>
	);
};
