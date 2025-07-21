// src/hooks/useConfiguratorParams.ts
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type {
	WatchType,
	WatchCase,
	Bezel,
	Dial,
	Strap,
	Hand,
	WatchSelection,
	SecondHand,
	GMTHand,
} from "@/types";

interface UseWatchConfiguratorProps {
	watchTypes: WatchType[];
	cases: WatchCase[];
	bezels: Bezel[];
	dials: Dial[];
	straps: Strap[];
	hands: Hand[];
	secondHands: SecondHand[];
	gmtHands: GMTHand[];
}

export function useWatchConfiguratorParams({
	watchTypes,
	cases,
	bezels,
	dials,
	straps,
	hands,
	secondHands,
	gmtHands,
}: UseWatchConfiguratorProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isInitialLoad = useRef(true);

	const [selectedModel, setSelectedModel] = useState<WatchType | null>(null);
	const [selection, setSelection] = useState<WatchSelection>({
		watchCase: null,
		bezel: null,
		dial: null,
		strap: null,
		hand: null,
		secondHand: null,
		gmtHand: null,
	});
	const [openAccordion, setOpenAccordion] = useState<string | null>("model");
	const [isLoading, setIsLoading] = useState(true);

	// Логика фильтрации деталей (без изменений)
	const filteredParts = useMemo(() => {
		if (!selectedModel) {
			return {
				filteredCases: [],
				filteredBezels: [],
				filteredDials: [],
				filteredStraps: [],
				filteredHands: [],
				filteredSecondHands: [],
				filteredGMTHands: [],
			};
		}
		const filterFn = (part: any) =>
			part.watch_types.some((wt: WatchType) => wt.id === selectedModel.id);
		return {
			filteredCases: cases.filter(filterFn),
			filteredBezels: bezels.filter(filterFn),
			filteredDials: dials.filter(filterFn),
			filteredStraps: straps.filter(filterFn),
			filteredHands: hands.filter(filterFn),
			filteredSecondHands: secondHands.filter(filterFn),
			filteredGMTHands: gmtHands.filter(filterFn),
		};
	}, [
		selectedModel,
		cases,
		bezels,
		dials,
		straps,
		hands,
		secondHands,
		gmtHands,
	]);

	// Эффект для инициализации состояния из URL при первой загрузке
	// И для установки деталей по умолчанию при смене модели
	useEffect(() => {
		// Определяем модель: из URL или первую по умолчанию
		const modelId = searchParams.get("model");
		const initialModel =
			watchTypes.find((m) => m.id.toString() === modelId) ||
			watchTypes[0] ||
			null;

		if (!selectedModel) {
			// Устанавливаем модель только при первой загрузке
			setSelectedModel(initialModel);
		}

		// Если модель (новая или старая) определена, устанавливаем для нее детали
		if (initialModel) {
			const {
				filteredCases,
				filteredBezels,
				filteredDials,
				filteredStraps,
				filteredHands,
				filteredSecondHands,
				filteredGMTHands,
			} = filteredParts;

			const findPart = <T,>(parts: T[], key: string): T | null => {
				const partId = searchParams.get(key);
				return (
					parts.find((p: any) => p.id.toString() === partId) || parts[0] || null
				);
			};

			// Устанавливаем детали: из URL или первые доступные по умолчанию
			setSelection({
				watchCase: findPart(filteredCases, "watchCase"),
				bezel: findPart(filteredBezels, "bezel"),
				dial: findPart(filteredDials, "dial"),
				strap: findPart(filteredStraps, "strap"),
				hand: findPart(filteredHands, "hand"),
				secondHand: findPart(filteredSecondHands, "secondHand"),
				gmtHand: findPart(filteredGMTHands, "gmtHand"),
			});
		}

		setIsLoading(false);

		// Мы хотим, чтобы этот сложный эффект запускался только при смене модели,
		// так как он сбрасывает/устанавливает всю конфигурацию.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedModel]);

	// Эффект для обновления URL при изменении состояния
	useEffect(() => {
		// Пропускаем самый первый рендер, чтобы не обновлять URL сразу после инициализации
		if (isInitialLoad.current) {
			isInitialLoad.current = false;
			return;
		}

		const params = new URLSearchParams();
		if (selectedModel) {
			params.set("model", selectedModel.id.toString());
		}
		Object.entries(selection).forEach(([key, value]) => {
			if (value) {
				params.set(key, value.id.toString());
			}
		});

		// Используем replace, чтобы не засорять историю браузера
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}, [selectedModel, selection, pathname, router]);

	// Логика вычисления цены и предпросмотра (без изменений)
	const totalPrice = useMemo(() => {
		return Object.values(selection).reduce(
			(acc, item) => acc + (item ? parseFloat(item.price || "0") : 0),
			selectedModel ? parseFloat(selectedModel.price || "0") : 0
		);
	}, [selection, selectedModel]);

	const canShowPreview = useMemo(() => {
		return Object.values(selection).some((item) => item?.image);
	}, [selection]);

	const handleSelectPart = <T extends keyof WatchSelection>(
		partType: T,
		item: WatchSelection[T]
	) => {
		setSelection((prev) => ({ ...prev, [partType]: item }));
	};

	// Переписан хендлер для смены модели, чтобы он корректно инициировал сброс конфигурации
	const handleSetSelectedModel = (model: WatchType) => {
		// Очищаем searchParams, чтобы при смене модели детали подставились по умолчанию, а не из старого URL
		const params = new URLSearchParams();
		params.set("model", model.id.toString());
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		setSelectedModel(model);
	};

	const handleAccordionToggle = (name: string) => {
		setOpenAccordion(openAccordion === name ? null : name);
	};

	return {
		selectedModel,
		selection,
		openAccordion,
		filteredParts,
		totalPrice,
		canShowPreview,
		isLoading,
		setSelectedModel: handleSetSelectedModel,
		handleSelectPart,
		handleAccordionToggle,
	};
}
