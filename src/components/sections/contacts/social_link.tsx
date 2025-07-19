"use client";
import { useCursorStore } from "@/stores/cursor";

export const SocialLink = ({
	name,
	href,
	icon,
}: {
	name: string;
	href: string;
	icon: React.ReactNode;
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
			aria-label={name}>
			{icon}
		</a>
	);
};
