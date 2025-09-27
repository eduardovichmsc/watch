// src/components/sections/configurator/index.tsx
"use client";

import type {
	Bezel,
	Dial,
	GMTHand,
	Hand,
	SecondHand,
	Strap,
	WatchCase,
	WatchType,
} from "@/types";
import { AccordionSection } from "./accordion";
import { WatchPreviewPanel } from "./preview_panel";
import { ActionPanel } from "./action_panel";
import { useWatchConfiguratorParams } from "@/hooks/useConfigurator";
import { ConfiguratorLoader } from "./loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PATHS } from "@/constants";
import { LogoControlPanel } from "./logo/control_panel";

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
		setSelectedModel,
		selection,
		openAccordion,
		filteredParts,
		totalPrice,
		canShowPreview,
		handleSelectPart,
		handleAccordionToggle,

		mode,
		isLoading,
		isPartsLoading,
		// --- РАСКОММЕНТИРУЕМ ЛОГО ---
		customLogo,
		handleLogoChange,
		handleLogoPropChange,
		removeLogo,
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
			title: selectedModel?.name.toLowerCase().includes("shock")
				? "Боковые стрелки"
				: "Секундные стрелки",
			items: filteredParts.filteredSecondHands,
			selectedItem: selection.secondHand,
		},
		{
			key: "gmtHand" as const,
			title: selectedModel?.name.toLowerCase().includes("shock")
				? "Дисплей"
				: "GMT - стрелки",
			items: filteredParts.filteredGMTHands,
			selectedItem: selection.gmtHand,
		},
	];

	if (isLoading) {
		return <ConfiguratorLoader />;
	}

	const breadcrumbs = selectedModel
		? [
				{ label: "Все модели", href: PATHS.STORE },
				{ label: selectedModel.name },
		  ]
		: [];

	return (
		<div className="lg:grid lg:grid-cols-2 relative pb-8">
			<WatchPreviewPanel
				isLoading={isPartsLoading}
				canShowPreview={canShowPreview}
				selection={selection}
				selectedModel={selectedModel}
				customLogo={customLogo}
				className="sticky top-14 lg:top-17 lg:-mt-0.5 self-start bg-white p-4 lg:p-6 border-b lg:border border-slate-200 z-40 select-none"
			/>

			{/* Правая колонка */}
			<div className="h-fit">
				{/* Заголовок */}
				<div className="lg:sticky top-16 z-50 bg-white/80 backdrop-blur-md px-8 py-8 lg:pl-6 lg:py-8 border-b border-slate-200">
					{selectedModel && (
						<Breadcrumbs crumbs={breadcrumbs} className="mb-4" />
					)}
					<h2 className="font-light text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-black">
						{selectedModel
							? selectedModel.name.toUpperCase()
							: "Создание с нуля."}
					</h2>
					{!selectedModel && (
						<p className="mt-2 text-slate-600">
							Выберите базовую модель, чтобы начать.
						</p>
					)}
				</div>

				<div>
					{/* Выбор модели */}
					{mode === "manual" && (
						<AccordionSection
							title="Выберите модель"
							count={props.watchTypes.length}
							selectedOptionName={selectedModel?.name || "Не выбрано"}
							isOpen={openAccordion === "model"}
							onToggle={() => handleAccordionToggle("model")}
							items={props.watchTypes}
							selectedItem={selectedModel}
							onSelect={(item: WatchType) => setSelectedModel(item)}
						/>
					)}

					{/* Детали */}
					{selectedModel &&
						partSections.map((section, index) => {
							const isAvailable = section.items.length > 0;
							let selectedName = "Не доступно для этой модели";
							if (isPartsLoading) {
								selectedName = "Загружаем";
							} else if (isAvailable) {
								selectedName = section.selectedItem?.name || "Не выбрано";
							}
							return (
								<AccordionSection
									isLoading={isPartsLoading}
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

					{/* --- РАСКОММЕНТИРУЕМ АККОРДЕОН ЛОГОТИПА --- */}
					{selectedModel && (
						<AccordionSection
							title="Ваш логотип (опционально)"
							selectedOptionName={
								customLogo.image ? "Логотип загружен" : "Не загружен"
							}
							isOpen={openAccordion === "logo"}
							onToggle={() => handleAccordionToggle("logo")}
							items={[]} // Пустые, так как контент кастомный
							count={0}
							selectedItem={null}
							onSelect={() => {}}>
							{/* Передаем панель управления как дочерний элемент */}
							<LogoControlPanel
								logoState={customLogo}
								onLogoChange={handleLogoChange}
								onPropChange={handleLogoPropChange}
								onRemove={removeLogo}
							/>
						</AccordionSection>
					)}
				</div>
				<ActionPanel
					model={selectedModel}
					selection={selection}
					totalPrice={totalPrice}
					className="sticky bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm p-4 border-t border-slate-200 lg:static lg:bg-transparent lg:p-6 lg:pr-0 lg:pb-0 lg:border-t-0"
				/>
			</div>
		</div>
	);
}
