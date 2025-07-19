"use client";
import { useCursorStore } from "@/stores/cursor";
import type { ComponentType } from "react";

export const SocialLink = ({
	label,
	href,
	Icon,
}: {
	label: string;
	href: string;
	Icon: ComponentType<{ size?: number; className?: string }>;
}) => {
	const { setVariant } = useCursorStore();
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			onMouseEnter={() => setVariant("link")}
			onMouseLeave={() => setVariant("default")}
			className="flex items-center justify-center size-14 border border-slate-700 text-slate-300 hover:bg-white hover:text-black transition-colors"
			aria-label={label}>
			<Icon size={24} />
		</a>
	);
};
