import { PATHS } from "@/constants/paths";
import { WatchSelection, WatchType } from "@/types";

export function buildConfiguratorUrl(
	model: WatchType,
	selection: WatchSelection
): string {
	const params = new URLSearchParams();

	// Добавляем ID модели
	params.set("model", model.id.toString());

	// Добавляем ID каждого выбранного компонента
	Object.entries(selection).forEach(([key, value]) => {
		if (value) {
			params.set(key, value.id.toString());
		}
	});

	return `${PATHS.CONFIGURATOR}?${params.toString()}`;
}
