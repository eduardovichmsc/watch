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
import {
	getCases,
	getBezels,
	getDials,
	getStraps,
	getHands,
	getSecondHands,
	getGMTHands,
} from "@/services/data";

type ConfiguratorMode = "loading" | "preselected" | "manual";
type PartsLoadingState = "idle" | "loading" | "loaded";

interface UseWatchConfiguratorProps {
	watchTypes: WatchType[];
	// ... (остальные пропсы не используются, но оставим для типа)
}

export function useWatchConfiguratorParams(props: UseWatchConfiguratorProps) {
	const { watchTypes } = props;
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { modelFromStoreId, componentsFromStore, clearPreselection } =
		useConfiguratorStore.getState();

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
	const prevModelId = useRef<string | number | null>(null);
	const isInitialMount = useRef(true);

	const [partsLoadingState, setPartsLoadingState] =
		useState<PartsLoadingState>("idle");
	const [fetchedParts, setFetchedParts] = useState<{
		cases: WatchCase[];
		bezels: Bezel[];
		dials: Dial[];
		straps: Strap[];
		hands: Hand[];
		secondHands: SecondHand[];
		gmtHands: GMTHand[];
	}>({
		cases: [],
		bezels: [],
		dials: [],
		straps: [],
		hands: [],
		secondHands: [],
		gmtHands: [],
	});

	// Эффект для инициализации модели (запускается один раз)
	useEffect(() => {
		let initialModel: WatchType | null = null;
		const modelIdFromUrl = searchParams.get("model");
		if (modelFromStoreId) {
			setMode("preselected");
			initialModel = watchTypes.find((m) => m.id === modelFromStoreId) || null;
		} else if (modelIdFromUrl) {
			setMode("manual");
			initialModel =
				watchTypes.find((m) => m.id.toString() === modelIdFromUrl) || null;
		} else {
			setMode("manual");
		}
		setSelectedModel(initialModel);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// --- ОБЪЕДИНЕННЫЙ ЭФФЕКТ ДЛЯ ЗАГРУЗКИ И УСТАНОВКИ ДЕТАЛЕЙ ---
	useEffect(() => {
		if (!selectedModel) {
			setFetchedParts({
				cases: [],
				bezels: [],
				dials: [],
				straps: [],
				hands: [],
				secondHands: [],
				gmtHands: [],
			});
			setSelection({
				watchCase: null,
				bezel: null,
				dial: null,
				strap: null,
				hand: null,
				secondHand: null,
				gmtHand: null,
			});
			setPartsLoadingState("idle");
			return;
		}

		if (selectedModel.id !== prevModelId.current) {
			const fetchAndSetParts = async () => {
				setPartsLoadingState("loading");
				const modelId = selectedModel.id;

				// 1. Загружаем все детали
				const [cases, bezels, dials, straps, hands, secondHands, gmtHands] =
					await Promise.all([
						getCases(modelId),
						getBezels(modelId),
						getDials(modelId),
						getStraps(modelId),
						getHands(modelId),
						getSecondHands(modelId),
						getGMTHands(modelId),
					]);

				// Сохраняем загруженные детали в состояние
				setFetchedParts({
					cases,
					bezels,
					dials,
					straps,
					hands,
					secondHands,
					gmtHands,
				});

				// 2. Сразу же вычисляем и устанавливаем `selection` на основе новых деталей
				const findPartById = <T extends { id: number | string }>(
					partId: number | string | undefined,
					parts: T[]
				): T | null => {
					if (partId !== undefined)
						return parts.find((p) => p.id === partId) || parts[0] || null;
					return parts[0] || null;
				};

				setSelection({
					watchCase: findPartById(componentsFromStore?.watchCase, cases),
					bezel: findPartById(componentsFromStore?.bezel, bezels),
					dial: findPartById(componentsFromStore?.dial, dials),
					strap: findPartById(componentsFromStore?.strap, straps),
					hand: findPartById(componentsFromStore?.hand, hands),
					secondHand: findPartById(
						componentsFromStore?.secondHand,
						secondHands
					),
					gmtHand: findPartById(componentsFromStore?.gmtHand, gmtHands),
				});

				// 3. Очищаем стор и завершаем загрузку
				if (modelFromStoreId) {
					clearPreselection();
				}
				prevModelId.current = selectedModel.id;
				setPartsLoadingState("loaded");

				// Устанавливаем открытый аккордеон
				if (
					mode === "preselected" ||
					(mode === "manual" && searchParams.get("model"))
				) {
					setOpenAccordion("strap");
				} else {
					setOpenAccordion("model");
				}
			};

			fetchAndSetParts();
		}
	}, [
		selectedModel,
		mode,
		modelFromStoreId,
		componentsFromStore,
		clearPreselection,
		searchParams,
	]);

	// Эффект для обновления URL
	useEffect(() => {
		if (
			isInitialMount.current ||
			mode === "loading" ||
			partsLoadingState === "loading"
		) {
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
	}, [
		selection,
		selectedModel,
		mode,
		partsLoadingState,
		pathname,
		router,
		searchParams,
	]);

	// filteredParts теперь является производным от fetchedParts
	const filteredParts = useMemo(
		() => ({
			filteredCases: fetchedParts.cases,
			filteredBezels: fetchedParts.bezels,
			filteredDials: fetchedParts.dials,
			filteredStraps: fetchedParts.straps,
			filteredHands: fetchedParts.hands,
			filteredSecondHands: fetchedParts.secondHands,
			filteredGMTHands: fetchedParts.gmtHands,
		}),
		[fetchedParts]
	);

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

	// Обработчики
	const handleSelectPart = <T extends keyof WatchSelection>(
		partType: T,
		item: WatchSelection[T]
	) => {
		setSelection((prev) => ({ ...prev, [partType]: item }));
	};

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
		isPartsLoading: partsLoadingState === "loading",
		mode,
		handleSelectPart,
		handleAccordionToggle,
	};
}
