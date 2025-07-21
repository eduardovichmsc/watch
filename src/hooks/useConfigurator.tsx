// src/hooks/useConfigurator.ts
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
import { useConfiguratorStore } from "@/stores/configurator";

// Определяем режимы работы конфигуратора для более чистой логики
type ConfiguratorMode = "loading" | "preselected" | "manual";

// Интерфейс для пропсов, которые хук получает от компонента
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

export function useWatchConfiguratorParams(props: UseWatchConfiguratorProps) {
	const {
		watchTypes,
		cases,
		bezels,
		dials,
		straps,
		hands,
		secondHands,
		gmtHands,
	} = props;
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Получаем функции из Zustand синхронно, чтобы сразу очистить состояние
	const { modelFromStoreId, clearModelFromStore } =
		useConfiguratorStore.getState();

	// Основные состояния
	const [mode, setMode] = useState<ConfiguratorMode>("loading");
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
	const [openAccordion, setOpenAccordion] = useState<string | null>(null);
	const isInitialMount = useRef(true);
	// Ref для отслеживания ID предыдущей модели, чтобы сбрасывать детали только при смене
	const prevModelId = useRef<string | number | null>(null);

	// Фильтруем детали, доступные для выбранной модели
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

	// Эффект для инициализации. Запускается только ОДИН РАЗ при монтировании.
	useEffect(() => {
		let initialModel: WatchType | null = null;
		const modelIdFromUrl = searchParams.get("model");

		if (modelFromStoreId) {
			setMode("preselected");
			initialModel = watchTypes.find((m) => m.id === modelFromStoreId) || null;
			setOpenAccordion("strap");
			clearModelFromStore();
		} else if (modelIdFromUrl) {
			setMode("manual");
			initialModel =
				watchTypes.find((m) => m.id.toString() === modelIdFromUrl) || null;
			setOpenAccordion("strap");
		} else {
			setMode("manual");
			setOpenAccordion("model");
		}

		setSelectedModel(initialModel);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Эффект, который устанавливает детали по умолчанию, ТОЛЬКО ПРИ СМЕНЕ МОДЕЛИ
	useEffect(() => {
		if (mode === "loading") return;

		// Если модель не выбрана, сбрасываем выбор
		if (!selectedModel) {
			setSelection({
				watchCase: null,
				bezel: null,
				dial: null,
				strap: null,
				hand: null,
				secondHand: null,
				gmtHand: null,
			});
			prevModelId.current = null;
			return;
		}

		// Ключевое условие: запускаем сброс, только если ID модели изменился
		if (selectedModel.id !== prevModelId.current) {
			const {
				filteredCases,
				filteredBezels,
				filteredDials,
				filteredStraps,
				filteredHands,
				filteredSecondHands,
				filteredGMTHands,
			} = filteredParts;

			setSelection({
				watchCase: filteredCases[0] || null,
				bezel: filteredBezels[0] || null,
				dial: filteredDials[0] || null,
				strap: filteredStraps[0] || null,
				hand: filteredHands[0] || null,
				secondHand: filteredSecondHands[0] || null,
				gmtHand: filteredGMTHands[0] || null,
			});

			// Обновляем ref, чтобы сброс не происходил при следующем рендере
			prevModelId.current = selectedModel.id;
		}
	}, [selectedModel, filteredParts, mode]);

	// Эффект для обновления URL
	useEffect(() => {
		if (isInitialMount.current || mode === "loading") {
			isInitialMount.current = false;
			return;
		}
		const params = new URLSearchParams();
		if (selectedModel) {
			params.set("model", selectedModel.id.toString());
			Object.entries(selection).forEach(([key, value]) => {
				if (value) params.set(key, value.id.toString());
			});
		}

		const currentParams = searchParams.toString();
		const newParams = params.toString();

		if (currentParams !== newParams) {
			router.replace(`${pathname}?${newParams}`, { scroll: false });
		}
	}, [selection, selectedModel, mode, pathname, router, searchParams]);

	// Вычисление итоговой цены
	const totalPrice = useMemo(() => {
		return Object.values(selection).reduce(
			(acc, item) => acc + (item ? parseFloat(item.price || "0") : 0),
			selectedModel ? parseFloat(selectedModel.price || "0") : 0
		);
	}, [selection, selectedModel]);

	// Проверка, можно ли показать предпросмотр
	const canShowPreview = useMemo(() => {
		return Object.values(selection).some((item) => item?.image);
	}, [selection]);

	// Обработчик выбора детали
	const handleSelectPart = <T extends keyof WatchSelection>(
		partType: T,
		item: WatchSelection[T]
	) => {
		setSelection((prev) => ({ ...prev, [partType]: item }));
	};

	// Обработчик открытия/закрытия аккордеона
	const handleAccordionToggle = (name: string) => {
		setOpenAccordion(openAccordion === name ? null : name);
	};

	return {
		selectedModel,
		setSelectedModel,
		selection,
		openAccordion,
		filteredParts,
		totalPrice,
		canShowPreview,
		isLoading: mode === "loading",
		mode,
		handleSelectPart,
		handleAccordionToggle,
	};
}
