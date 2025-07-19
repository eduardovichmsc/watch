// src/components/ui/spinner.tsx

import { clsx } from "clsx";

interface SpinnerProps {
	className?: string;
}

export function SquareSpinner({ className }: SpinnerProps) {
	return (
		<div
			className={clsx(
				"size-12 animate-spin rounded-md border-4 border-slate-200 border-t-slate-800",
				className
			)}
		/>
	);
}
