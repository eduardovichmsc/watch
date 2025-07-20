"use client";

import type {
	WatchCase,
	Bezel,
	Dial,
	Strap,
	WatchType,
	Hand,
	SecondHand,
	GMTHand,
} from "@/types";
import { AccordionSection } from "./accordion";
import { WatchPreviewPanel } from "./preview_panel";
import { ActionPanel } from "./action_panel";
import { useWatchConfiguratorParams } from "@/hooks/useConfiguratorParams";
import { ConfiguratorLoader } from "./loader";

interface WatchConfiguratorProps {
	watchTypes: WatchType[];
	cases: WatchCase[];
	bezels: Bezel[];
	dials: Dial[];
	straps: Strap[];
	hands: Hand[];
	secondHands: SecondHand[];
	gmtHands: GMTHand[];
}

export function WatchConfigurator(props: WatchConfiguratorProps) {
	const {
		selectedModel,
		selection,
		openAccordion,
		filteredParts,
		totalPrice,
		canShowPreview,
		isLoading,
		setSelectedModel,
		handleSelectPart,
		handleAccordionToggle,
	} = useWatchConfiguratorParams(props);

	const partSections = [
		{
			key: "strap" as const,
			title: "Браслет",
			items: filteredParts.filteredStraps,
			selectedItem: selection.strap,
		},
		{
			key: "watchCase" as const,
			title: "Корпус",
			items: filteredParts.filteredCases,
			selectedItem: selection.watchCase,
		},
		{
			key: "bezel" as const,
			title: "Безели",
			items: filteredParts.filteredBezels,
			selectedItem: selection.bezel,
			style: {
				scale: 100,
			},
		},
		{
			key: "dial" as const,
			title: "Циферблат",
			items: filteredParts.filteredDials,
			selectedItem: selection.dial,
			style: { scale: 170 },
		},
		{
			key: "hand" as const,
			title: "Основные стрелки",
			items: filteredParts.filteredHands,
			selectedItem: selection.hand,
			style: { scale: 250, top: 10 },
		},
		{
			key: "secondHand" as const,
			title: "Секундные стрелки",
			items: filteredParts.filteredSecondHands,
			selectedItem: selection.secondHand,
			style: { scale: 250, top: 20 },
		},
		{
			key: "gmtHand" as const,
			title: "GMT - стрелки",
			items: filteredParts.filteredGMTHands,
			selectedItem: selection.gmtHand,
			style: { scale: 250 },
		},
	];

	if (isLoading) return <ConfiguratorLoader />;

	return (
		<div className="lg:grid lg:grid-cols-2 relative pb-8 lg:pb-0">
			<WatchPreviewPanel
				isLoading={isLoading}
				canShowPreview={canShowPreview}
				selection={selection}
				selectedModel={selectedModel}
				className="sticky top-16 self-start bg-white p-4 lg:p-6 border-b lg:border border-slate-200 z-40 select-none"
			/>

			{/* Правая колонка */}
			<div className="h-fit">
				{/* Заголовок */}
				<div className="lg:sticky top-17 z-50 bg-white/80 backdrop-blur-md px-2 py-6 lg:px-6 lg:py-8 border-b border-slate-200">
					<h2 className="font-light text-5xl lg:text-6xl tracking-tighter text-black">
						Конструктор.
					</h2>
				</div>

				<div>
					<AccordionSection
						title="Модель часов"
						count={props.watchTypes.length}
						selectedOptionName={selectedModel?.name || "Не выбрано"}
						isOpen={openAccordion === "model"}
						onToggle={() => handleAccordionToggle("model")}
						items={props.watchTypes}
						selectedItem={selectedModel}
						onSelect={(item: WatchType) => setSelectedModel(item)}
					/>

					{partSections.map((section) => {
						const isAvailable = section.items.length > 0;
						const selectedName = isAvailable
							? section.selectedItem?.name || "Не выбрано"
							: "Недоступно для этой модели";
						return (
							<AccordionSection
								key={section.key}
								title={section.title}
								count={section.items.length}
								selectedOptionName={selectedName}
								isOpen={openAccordion === section.key}
								onToggle={() => handleAccordionToggle(section.key)}
								items={section.items}
								selectedItem={section.selectedItem}
								style={section.style}
								onSelect={(item) => handleSelectPart(section.key, item)}
								disabled={!isAvailable}
							/>
						);
					})}
				</div>

				<ActionPanel
					model={selectedModel}
					selection={selection}
					totalPrice={totalPrice}
					className="sticky bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm py-4 border-t border-slate-200 lg:static lg:bg-transparent lg:p-6 lg:pb-0 lg:border-t-0"
				/>
			</div>
		</div>
	);
}
