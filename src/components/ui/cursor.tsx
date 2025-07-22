"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorStore } from "@/stores/cursor";
import { ChevronDown, Heart, MoveHorizontal, Search } from "lucide-react";

export const CustomCursor = () => {
	const [isTouchDevice, setIsTouchDevice] = useState(false);
	const { variant } = useCursorStore();
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);
	const springConfig = { damping: 25, stiffness: 300 };
	const springX = useSpring(cursorX, springConfig);
	const springY = useSpring(cursorY, springConfig);

	// Определение типа устройства
	useEffect(() => {
		const hasTouchSupport =
			"ontouchstart" in window || navigator.maxTouchPoints > 0;
		if (hasTouchSupport) {
			setIsTouchDevice(true);
		}
	}, []);

	useEffect(() => {
		// Курсор только для не-сенсорных устройств
		if (!isTouchDevice) {
			const moveCursor = (e: MouseEvent) => {
				cursorX.set(e.clientX);
				cursorY.set(e.clientY);
			};
			window.addEventListener("mousemove", moveCursor);
			return () => {
				window.removeEventListener("mousemove", moveCursor);
			};
		}
	}, [isTouchDevice, cursorX, cursorY]);

	if (isTouchDevice) {
		return null;
	}

	const dotVariants = {
		default: {
			scale: 1,
			backgroundColor: "rgba(255, 255, 255, 1)",
			mixBlendMode: "difference",
			height: 8,
			width: 8,
			borderRadius: "50%",
		},
		link: { scale: 0 },
		drag: { scale: 0 },
		preview: { scale: 0 },
		text: {
			scale: 1,
			height: 24,
			width: 2,
			borderRadius: 0,
			backgroundColor: "rgba(0, 0, 0, 1)",
			mixBlendMode: "normal",
		},
	};

	const ringVariants = {
		default: {
			height: 32,
			width: 32,
			borderColor: "rgba(255, 255, 255, 0.7)",
			mixBlendMode: "difference",
			borderWidth: "1px",
			backgroundColor: "transparent",
		},
		link: {
			height: 48,
			width: 48,
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: "1px",
			backgroundColor: "rgba(255, 255, 255, 1)",
			mixBlendMode: "difference",
		},
		text: { scale: 0 },
		drag: {
			height: 64,
			width: 64,
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: "1px",
			backgroundColor: "rgba(255, 255, 255, 1)",
			mixBlendMode: "difference",
		},
		preview: {
			height: 64,
			width: 64,
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: "1px",
			backgroundColor: "rgba(255, 255, 255, 1)",
			mixBlendMode: "difference",
		},
		open: {
			height: 64,
			width: 64,
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: "1px",
			backgroundColor: "rgba(255, 255, 255, 1)",
			mixBlendMode: "difference",
		},
		heart: {
			height: 64,
			width: 64,
			borderColor: "rgba(255, 255, 255, 1)",
			borderWidth: "1px",
			backgroundColor: "rgba(255, 255, 255, 1)",
			mixBlendMode: "difference",
		},
	};

	const iconVariants = {
		default: { opacity: 0, scale: 0 },
		link: { opacity: 0, scale: 0 },
		text: { opacity: 0, scale: 0 },
		drag: { opacity: 1, scale: 1 },
		preview: { opacity: 1, scale: 1 },
		open: { opacity: 1, scale: 1 },
		heart: { opacity: 1, scale: 1 },
	};

	return (
		<>
			<motion.div
				variants={dotVariants}
				animate={variant}
				transition={{ duration: 0.1 }}
				style={{
					x: cursorX,
					y: cursorY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				className="fixed top-0 left-0 z-[9999] pointer-events-none"
			/>
			<motion.div
				variants={ringVariants}
				animate={variant}
				transition={springConfig}
				style={{
					x: springX,
					y: springY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				className="fixed top-0 left-0 z-[9999] rounded-full border pointer-events-none flex items-center justify-center">
				<motion.div
					variants={iconVariants}
					animate={variant}
					transition={{ duration: 0.2 }}
					className="text-white">
					{variant === "drag" && (
						<MoveHorizontal className="mix-blend-difference" size={32} />
					)}
					{variant === "preview" && (
						<Search className="mix-blend-difference" size={32} />
					)}
					{variant === "open" && (
						<ChevronDown className="mix-blend-difference" size={32} />
					)}
					{variant === "heart" && (
						<Heart className="mix-blend-difference" size={32} />
					)}
				</motion.div>
			</motion.div>
		</>
	);
};
