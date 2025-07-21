// src/components/ui/breadcrumbs.tsx
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useCursorStore } from "@/stores/cursor";

interface Crumb {
	label: string;
	href?: string;
}

interface BreadcrumbsProps {
	crumbs: Crumb[];
	className?: string;
}

export const Breadcrumbs = ({ crumbs, className }: BreadcrumbsProps) => {
	const { setVariant } = useCursorStore();

	return (
		<nav aria-label="breadcrumb" className={className}>
			<ol className="flex items-center gap-2">
				{crumbs.map((crumb, index) => (
					<li key={index} className="flex items-center gap-2">
						{/* Если это не первая, показываем разделитель */}
						{index > 0 && <ChevronRight size={16} className="text-slate-400" />}

						{/* Рендерим ссылку / текст */}
						{crumb.href ? (
							<Link
								href={crumb.href}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className="font-mono text-xs uppercase tracking-wider text-slate-500 hover:text-black transition-colors">
								{crumb.label}
							</Link>
						) : (
							<span className="font-mono text-xs uppercase tracking-wider text-slate-900 font-medium">
								{crumb.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};
