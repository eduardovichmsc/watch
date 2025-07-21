import { PATHS } from "@/constants/paths";
import { useCursorStore } from "@/stores/cursor";
import { Settings } from "lucide-react";
import Link from "next/link";

const content = {
	title: "Вы не выбрали модель",
	body: "Чтобы приступить к кастомизации, пожалуйста, выберите базовую модель из нашей галереи.",
	link: {
		label: "Перейти в галерею",
		href: PATHS.STORE,
	},
};

export const SelectModelPrompt = () => {
	const { setVariant } = useCursorStore();
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
			<Settings size={64} className="text-slate-200 mb-8" />
			<h2 className="text-4xl font-light tracking-tighter mb-4">
				{content.title}
			</h2>
			<p className="text-slate-600 max-w-md mb-8">{content.body}</p>
			<Link
				href={content.link.href}
				onMouseEnter={() => setVariant("link")}
				onMouseLeave={() => setVariant("default")}
				className="h-14 inline-flex items-center justify-center px-8 bg-black text-white font-semibold hover:bg-zinc-800 transition-colors">
				{content.link.label}
			</Link>
		</div>
	);
};
