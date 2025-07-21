// src/components/sections/configurator/index.tsx
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
import { useWatchConfiguratorParams } from "@/hooks/useConfigurator";
import { ConfiguratorLoader } from "./loader";
import Link from "next/link";
import { PATHS } from "@/constants/paths";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SelectModelPrompt } from "./select_model";

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
		shouldLoad,
		handleSelectPart,
		handleAccordionToggle,
	} = useWatchConfiguratorParams(props);

	// Массив для рендеринга секций аккордеона
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
		},
		{
			key: "dial" as const,
			title: "Циферблат",
			items: filteredParts.filteredDials,
			selectedItem: selection.dial,
		},
		{
			key: "hand" as const,
			title: "Основные стрелки",
			items: filteredParts.filteredHands,
			selectedItem: selection.hand,
		},
		{
			key: "secondHand" as const,
			title: "Секундные стрелки",
			items: filteredParts.filteredSecondHands,
			selectedItem: selection.secondHand,
		},
		{
			key: "gmtHand" as const,
			title: "GMT - стрелки",
			items: filteredParts.filteredGMTHands,
			selectedItem: selection.gmtHand,
		},
	];

	// Прямой заход на /configurator без модели
	if (!shouldLoad && !isLoading) {
		return <SelectModelPrompt />;
	}

	// Модель выбрана и обработка данных
	if (isLoading) {
		return <ConfiguratorLoader />;
	}

	// Модель выбрана, но не найдена
	if (!selectedModel) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
				<h2 className="text-3xl font-light mb-4">Модель не найдена</h2>
				<p className="text-slate-600 mb-8">
					Возможно, вы перешли по неверной ссылке.
				</p>
				<Link
					href={PATHS.DESIGN_GALLERY}
					className="h-12 inline-flex items-center justify-center px-6 bg-black text-white font-semibold hover:bg-zinc-800 transition-colors">
					Вернуться в галерею
				</Link>
			</div>
		);
	}

	// Все готово
	// рендерим конфигуратор
	const breadcrumbs = [
		{ label: "Галерея", href: PATHS.DESIGN_GALLERY },
		{ label: selectedModel.name },
	];

	return (
		<div className="lg:grid lg:grid-cols-2 relative pb-[120px] lg:pb-0">
			<WatchPreviewPanel
				isLoading={isLoading}
				canShowPreview={canShowPreview}
				selection={selection}
				selectedModel={selectedModel}
				className="sticky top-16 self-start bg-white p-4 lg:p-6 border-b lg:border border-slate-200 z-40 select-none"
			/>

			{/* Правая колонка */}
			<div className="h-fit">
				<div className="lg:sticky top-17 z-50 bg-white/80 backdrop-blur-md px-4 py-6 lg:px-6 lg:py-6 border-b border-slate-200 ml-1">
					<Breadcrumbs crumbs={breadcrumbs} className="mb-4" />
					<h2 className="font-light text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-black">
						{selectedModel.name}.
					</h2>
				</div>
				<div>
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
					className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm p-4 border-t border-slate-200 lg:static lg:bg-transparent lg:p-6 lg:pb-0 lg:border-t-0"
				/>
			</div>
		</div>
	);
}
