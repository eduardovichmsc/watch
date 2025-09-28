// src/components/sections/configurator/logo/control_panel.tsx
"use client";

import { Upload, Trash2 } from "lucide-react";
import type { CustomLogoState } from "@/hooks/useConfigurator";
import { useCursorStore } from "@/stores/cursor";

interface LogoControlPanelProps {
	logoState: CustomLogoState;
	onLogoChange: (file: File) => void;
	onRemove: () => void;
}

export const LogoControlPanel = ({
	logoState,
	onLogoChange,
	onRemove,
}: LogoControlPanelProps) => {
	const { setVariant } = useCursorStore();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			if (e.target.files[0].size > 5 * 1024 * 1024) {
				alert("Файл слишком большой. Максимальный размер 5MB.");
				return;
			}
			onLogoChange(e.target.files[0]);
		}
	};

	if (!logoState.image) {
		return (
			<div className="text-center">
				<label
					htmlFor="logo-upload"
					onMouseEnter={() => setVariant("link")}
					onMouseLeave={() => setVariant("default")}
					className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer font-medium text-slate-800">
					<Upload size={18} />
					Загрузить изображение
				</label>
				<input
					id="logo-upload"
					type="file"
					accept="image/png, image/jpeg, image/svg+xml"
					className="hidden"
					onChange={handleFileChange}
				/>
				<p className="text-xs text-slate-500 mt-3">
					Рекомендуется PNG с прозрачным фоном (до 5MB)
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<button
				onClick={onRemove}
				onMouseEnter={() => setVariant("link")}
				onMouseLeave={() => setVariant("default")}
				className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-500/80 transition-colors cursor-pointer font-medium text-white">
				<Trash2 size={14} />
				Удалить
			</button>
		</div>
	);
};
