export const SliderControl = ({ icon, label, unit = "", ...props }: any) => (
	<div className="items-center gap-3 text-sm">
		<div className="text-slate-500">{icon}</div>
		<label className="text-slate-700">{label}</label>
		<input type="range" {...props} className="w-full" />
		<span className="font-mono text-xs text-slate-500 text-right">
			{props.value}
			{unit}
		</span>
	</div>
);
