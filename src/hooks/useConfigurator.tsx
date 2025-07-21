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

	// Основные состояния
	const [shouldLoad, setShouldLoad] = useState<boolean>(false);
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
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// Флаг, чтобы избежать обновления URL при самой первой загрузке/инициализации
	const isInitialMount = useRef(true);

	// Вычисляем выбранную модель на основе URL.
	// Этот useMemo зависит только от внешних данных и стабилен.
	const selectedModel = useMemo(() => {
		const modelId = searchParams.get("model");
		if (!modelId) return null;
		return watchTypes.find((m) => m.id.toString() === modelId) || null;
	}, [searchParams, watchTypes]);

	// Фильтруем детали. Этот useMemo зависит от стабильного `selectedModel`.
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

	// Эффект для инициализации состояния. Запускается ОДИН РАЗ при изменении модели в URL.
	useEffect(() => {
		const modelId = searchParams.get("model");

		if (!modelId) {
			setShouldLoad(false);
			setIsLoading(false);
			return;
		}

		// Если `selectedModel` еще не определился (данные могли не успеть прийти), ждем.
		if (!selectedModel) {
			return;
		}

		setShouldLoad(true);

		// Используем `filteredParts`, так как на этом этапе они уже стабильны, потому что `selectedModel` определен.
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

		setSelection({
			watchCase: findPart(filteredCases, "watchCase"),
			bezel: findPart(filteredBezels, "bezel"),
			dial: findPart(filteredDials, "dial"),
			strap: findPart(filteredStraps, "strap"),
			hand: findPart(filteredHands, "hand"),
			secondHand: findPart(filteredSecondHands, "secondHand"),
			gmtHand: findPart(filteredGMTHands, "gmtHand"),
		});

		setIsLoading(false);

		// Зависим только от `selectedModel`. Когда он меняется (1 раз при заходе на страницу),
		// эффект запускается, устанавливает состояние и больше не беспокоит.
	}, [selectedModel, searchParams, filteredParts]);

	// Эффект для обновления URL при изменении ВЫБОРА ПОЛЬЗОВАТЕЛЯ.
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}
		if (isLoading || !shouldLoad || !selectedModel) return;

		const params = new URLSearchParams();
		params.set("model", selectedModel.id.toString());
		Object.entries(selection).forEach(([key, value]) => {
			if (value) {
				params.set(key, value.id.toString());
			}
		});

		const currentParams = searchParams.toString();
		const newParams = params.toString();

		// Обновляем URL, только если параметры действительно изменились
		if (currentParams !== newParams) {
			router.replace(`${pathname}?${newParams}`, { scroll: false });
		}
	}, [
		selection,
		selectedModel,
		isLoading,
		shouldLoad,
		pathname,
		router,
		searchParams,
	]);

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
		selection,
		openAccordion,
		filteredParts,
		totalPrice,
		canShowPreview,
		isLoading,
		shouldLoad,
		handleSelectPart,
		handleAccordionToggle,
	};
}
