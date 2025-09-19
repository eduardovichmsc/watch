// src/components/sections/configurator/logo/control_panel.tsx
"use client";

import {
	Upload,
	Trash2,
	Scaling,
	MoveHorizontal,
	MoveVertical,
} from "lucide-react";
import type { CustomLogoState } from "@/hooks/useConfigurator";
import { SliderControl } from "./slider_control";

interface LogoControlPanelProps {
	logoState: CustomLogoState;
	onLogoChange: (file: File) => void;
	onPropChange: (prop: keyof CustomLogoState, value: number) => void;
	onRemove: () => void;
}

export const LogoControlPanel = ({
	logoState,
	onLogoChange,
	onPropChange,
	onRemove,
}: LogoControlPanelProps) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			onLogoChange(e.target.files[0]);
		}
	};

	if (!logoState.image) {
		return (
			<div className="text-center">
				<label
					htmlFor="logo-upload"
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
				<div className="mt-3">
					<p className="text-xs text-slate-500">
						Качество печати на циферблате напрямую зависит от загруженных
						файлов.
					</p>
					<p className="text-xs text-slate-500">
						Рекомендуется использовать PNG с прозрачным фоном.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium text-slate-800">Настройки логотипа</p>
				<button
					onClick={onRemove}
					className="flex items-center gap-1 text-xs text-red-600 hover:opacity-75">
					<Trash2 size={14} />
					Удалить
				</button>
			</div>

			{/* Слайдеры */}
			<div className="space-y-3">
				<SliderControl
					icon={<Scaling size={16} />}
					label="Размер"
					value={logoState.scale}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						onPropChange("scale", parseFloat(e.target.value))
					}
					min={0.05}
					max={0.5}
					step={0.01}
				/>
				<SliderControl
					icon={<MoveHorizontal size={16} />}
					label="Позиция X"
					value={logoState.x}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						onPropChange("x", parseInt(e.target.value))
					}
					min={-50}
					max={50}
					step={1}
					unit="%"
				/>
				<SliderControl
					icon={<MoveVertical size={16} />}
					label="Позиция Y"
					value={logoState.y}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						onPropChange("y", parseInt(e.target.value))
					}
					min={-50}
					max={50}
					step={1}
					unit="%"
				/>
			</div>
		</div>
	);
};
