// types/watches.ts

/* Тип отвата от API */
export interface PaginatedResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

/* Тип для моделей часов (Nautiko, Seikojust, ...) */
export interface WatchType {
	id: number;
	name: string;
	description: string;
	image: string | null;
	price: string;
}

/* База, для всех деталей часов */
interface BaseComponent {
	id: number;
	name: string;
	description: string;
	price: string;
	image: string | null;
	created_at: string;
	updated_at: string;
	watch_types: WatchType[];
}

export interface WatchCase extends BaseComponent {
	material: "steel" | "gold" | "titanium" | "ceramic";
	diameter: string;
	thickness: string;
	water_resistance: string;
}

export interface Bezel extends BaseComponent {
	material: string;
	color: string;
	style: string;
}

export interface Dial extends BaseComponent {
	color: string;
	material: string;
	diameter: string;
}

export interface Strap extends BaseComponent {
	strap_type: "leather" | "metal" | "rubber" | "nato";
	color: string;
	width: string;
	length: string;
}

export interface Hand extends BaseComponent {
	hand_type: "hour" | "minute" | "second";
	color: string;
	material: string;
	length: string;
}

export interface SecondHand extends BaseComponent {
	color: string;
	material: string;
	length: string;
}

export interface GMTHand extends BaseComponent {
	color: string;
	material: string;
	length: string;
}

/* Тип для хранения состояния текущего выбора пользователя в конфигураторе */
export interface WatchSelection {
	watchCase: WatchCase | null;
	bezel: Bezel | null;
	dial: Dial | null;
	strap: Strap | null;
	hand: Hand | null;
	secondHand: SecondHand | null;
	gmtHand: GMTHand | null;
}

// Типы для готовой сборки
interface BuildComponent {
	type: string;
	name: string;
	image: string;
	quantity: number;
	id: number;
	price?: string;
}

export interface Build {
	id: number;
	name: string;
	description: string;
	watch_type: WatchType;
	category: string;
	assembly: number;
	quantity: number;
	status: string;
	notes: string;
	image: string;
	components: BuildComponent[];
	component_images: {
		type: string;
		image_url: string;
		name: string;
	}[];
	created_at: string;
	updated_at: string;
}
