import { Build } from "@/types";
import { ComponentListItem } from "./item";

interface Props {
	build: Build;
}

export const ComponentsList = ({ build }: Props) => {
	return (
		<div className="px-8 md:px-12 lg:px-16 order-5 lg:order-4 mt-16 lg:mt-8">
			<h2 className="text-xl font-semibold text-slate-800 mb-4">
				Компоненты сборки:
			</h2>
			<div className="border border-slate-200">
				{build.components.map((component) => (
					<ComponentListItem
						key={component.id + component.name}
						type={component.type}
						name={component.name}
						imageUrl={component.image}
					/>
				))}
			</div>
		</div>
	);
};
