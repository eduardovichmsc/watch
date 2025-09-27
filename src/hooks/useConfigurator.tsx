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
import { useDraftStore } from "@/stores/draft";
import {
	getCases,
	getBezels,
	getDials,
	getStraps,
	getHands,
	getSecondHands,
	getGMTHands,
} from "@/services/data";

// --- ТИПЫ ДЛЯ ХУКА ---

// Определяем режимы работы конфигуратора для более чистой логики
type ConfiguratorMode = "initial" | "loading" | "preselected" | "manual";
// Определяем состояния загрузки деталей
type PartsLoadingState = "idle" | "loading" | "loaded";

// Тип для состояния кастомного логотипа
export interface CustomLogoState {
	image: string | null;
	scale: number;
	x: number;
	y: number;
}

// Интерфейс для пропсов, которые хук получает от компонента
interface UseWatchConfiguratorProps {
	watchTypes: WatchType[];
}

export function useWatchConfiguratorParams(props: UseWatchConfiguratorProps) {
	const { watchTypes } = props;
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// --- ZUSTAND СТОРЫ ---
	const { modelFromStoreId, componentsFromStore, clearPreselection } =
		useConfiguratorStore.getState();
	const { setLastConfigUrl } = useDraftStore.getState();

	// --- ОСНОВНЫЕ СОСТОЯНИЯ ---
	const [mode, setMode] = useState<ConfiguratorMode>("initial");
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

	// Состояние для кастомного логотипа
	const [customLogo, setCustomLogo] = useState<CustomLogoState>({
		image: null,
		scale: 0.2,
		x: 0,
		y: 25,
	});

	// --- РЕФЫ ДЛЯ УПРАВЛЕНИЯ ЭФФЕКТАМИ ---
	const isInitialMount = useRef(true);
	const prevModelId = useRef<string | number | null>(null);

	// --- ЭФФЕКТЫ ЖИЗНЕННОГО ЦИКЛА ---

	// 1. Эффект для инициализации. Определяет режим работы. Запускается только один раз.
	useEffect(() => {
		const modelIdFromUrl = searchParams.get("model");
		let initialModel: WatchType | null = null;

		if (modelFromStoreId) {
			setMode("preselected");
			initialModel = watchTypes.find((m) => m.id === modelFromStoreId) || null;
		} else if (modelIdFromUrl) {
			setMode("manual");
			initialModel =
				watchTypes.find((m) => m.id.toString() === modelIdFromUrl) || null;
		} else {
			setMode("manual");
			setOpenAccordion("model");
		}

		setSelectedModel(initialModel);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 2. Эффект для загрузки и установки деталей. Срабатывает только при смене модели.
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

				setFetchedParts({
					cases,
					bezels,
					dials,
					straps,
					hands,
					secondHands,
					gmtHands,
				});

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

				if (modelFromStoreId) {
					clearPreselection();
				}
				prevModelId.current = selectedModel.id;
				setPartsLoadingState("loaded");
				setOpenAccordion("strap");
			};

			fetchAndSetParts();
		}
	}, [selectedModel, modelFromStoreId, componentsFromStore, clearPreselection]);

	// 3. Эффект для обновления URL и сохранения черновика.
	useEffect(() => {
		if (
			isInitialMount.current ||
			mode === "initial" ||
			partsLoadingState !== "loaded"
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

			const newUrl = `${pathname}?${params.toString()}`;
			const currentUrl = `${pathname}?${searchParams.toString()}`;

			if (newUrl !== currentUrl) {
				router.replace(newUrl, { scroll: false });
				setLastConfigUrl(newUrl);
			}
		} else {
			if (searchParams.has("model")) {
				router.replace(pathname, { scroll: false });
				setLastConfigUrl(null);
			}
		}
	}, [
		selection,
		selectedModel,
		mode,
		partsLoadingState,
		pathname,
		router,
		searchParams,
		setLastConfigUrl,
	]);

	// --- ВЫЧИСЛЯЕМЫЕ ЗНАЧЕНИЯ (useMemo) ---

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

	const totalPrice = useMemo(() => {
		return Object.values(selection).reduce(
			(acc, item) => acc + (item ? parseFloat(item.price || "0") : 0),
			selectedModel ? parseFloat(selectedModel.price || "0") : 0
		);
	}, [selection, selectedModel]);

	const canShowPreview = useMemo(() => {
		return Object.values(selection).some((item) => item?.image);
	}, [selection]);

	// --- ОБРАБОТЧИКИ ---

	const handleSelectPart = <T extends keyof WatchSelection>(
		partType: T,
		item: WatchSelection[T]
	) => {
		setSelection((prev) => ({ ...prev, [partType]: item }));
	};

	const handleAccordionToggle = (name: string) => {
		setOpenAccordion(openAccordion === name ? null : name);
	};

	const handleLogoChange = (file: File) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setCustomLogo((prev) => ({ ...prev, image: reader.result as string }));
		};
		reader.readAsDataURL(file);
	};

	const handleLogoPropChange = (prop: keyof CustomLogoState, value: number) => {
		setCustomLogo((prev) => ({ ...prev, [prop]: value }));
	};

	const removeLogo = () => {
		setCustomLogo({ image: null, scale: 0.2, x: 0, y: 25 });
	};

	// --- ВОЗВРАЩАЕМЫЙ ОБЪЕКТ ---
	return {
		selectedModel,
		setSelectedModel,
		selection,
		openAccordion,
		filteredParts,
		totalPrice,
		canShowPreview,
		isLoading: mode === "initial" || mode === "loading",
		isPartsLoading: partsLoadingState === "loading",
		mode,
		handleSelectPart,
		handleAccordionToggle,
		customLogo,
		handleLogoChange,
		handleLogoPropChange,
		removeLogo,
	};
}
