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
import { useCursorStore } from "@/stores/cursor";

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
	const { setVariant } = useCursorStore();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			// Проверка на размер файла (например, 5MB)
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
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium text-slate-800">Настройки логотипа</p>
				<button
					onClick={onRemove}
					onMouseEnter={() => setVariant("link")}
					onMouseLeave={() => setVariant("default")}
					className="flex items-center gap-1 text-xs text-red-600 hover:opacity-75">
					<Trash2 size={14} />
					Удалить
				</button>
			</div>

			<div className="space-y-3">
				<SliderControl
					icon={<Scaling size={16} />}
					label="Размер"
					value={logoState.scale}
					onChange={(e: { target: { value: string } }) => {
						onPropChange("scale", parseFloat(e.target.value));
					}}
					min={0.05}
					max={0.5}
					step={0.01}
				/>
				<SliderControl
					icon={<MoveHorizontal size={16} />}
					label="Позиция X"
					value={logoState.x}
					onChange={(e: { target: { value: string } }) =>
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
					onChange={(e: { target: { value: string } }) =>
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

const SliderControl = ({ icon, label, unit = "", ...props }: any) => (
	<div className="grid grid-cols-[auto_1fr_45px] items-center gap-3 text-sm">
		<div className="text-slate-500">{icon}</div>
		<label className="text-slate-700">{label}</label>
		<input type="range" {...props} className="w-full accent-black" />
		<span className="font-mono text-xs text-slate-500 text-right">
			{props.value}
			{unit}
		</span>
	</div>
);
