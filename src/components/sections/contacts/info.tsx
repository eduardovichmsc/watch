"use client";
import { useCursorStore } from "@/stores/cursor";

export const InfoBlock = ({
	title,
	lines,
	hrefs,
}: {
	title: string;
	lines: string[];
	hrefs?: string[];
}) => {
	const { setVariant } = useCursorStore();

	return (
		<div>
			<h3 className="font-mono text-sm uppercase text-slate-400 mb-2">
				{title}
			</h3>
			{lines.map((line, index) => {
				const href = hrefs?.[index];
				if (href) {
					return (
						<a
							key={line}
							href={href}
							onMouseEnter={() => setVariant("link")}
							onMouseLeave={() => setVariant("default")}
							className="block text-2xl md:text-3xl text-white hover:opacity-75 transition-opacity">
							{line}
						</a>
					);
				}
				return (
					<p key={line} className="text-2xl md:text-3xl text-white">
						{line}
					</p>
				);
			})}
		</div>
	);
};
