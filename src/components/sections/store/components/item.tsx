// src/components/gallery/component-list-item.tsx
"use client";

import Image from "next/image";

const componentTypeMap: { [key: string]: string } = {
	case: "Корпус",
	bezel: "Безель",
	dial: "Циферблат",
	strap: "Браслет",
	hand: "Стрелки",
	secondhand: "Секундная стрелка",
	gmthands: "GMT-стрелка",
};

interface ComponentListItemProps {
	type: string;
	name: string;
	imageUrl: string;
}

export const ComponentListItem = ({
	type,
	name,
	imageUrl,
}: ComponentListItemProps) => {
	const displayName = componentTypeMap[type.toLowerCase()] || type;
	const fullImageUrl = `https://wotchmodclub.com${imageUrl}`;

	return (
		<div className="flex items-center gap-4 p-3 border-b border-slate-100 last:border-b-0">
			<div className="relative size-16 flex-shrink-0 bg-slate-100 overflow-hidden">
				<Image
					src={fullImageUrl}
					alt={name}
					fill
					className="object-contain p-1 scale-150"
				/>
			</div>
			<div className="flex-grow">
				<p className="font-mono text-xs uppercase text-slate-500">
					{displayName}
				</p>
				<p className="font-medium text-slate-800">{name}</p>
			</div>
		</div>
	);
};
