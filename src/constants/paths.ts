export const PATHS = {
	HOME: "/",
	DESIGN_GALLERY: "/design_gallery",
	CONFIGURATOR: "/configurator",
	CONTACTS: "/contacts",
	CART: "/cart",
} as const;

export const MAIN_LINKS = [
	{ label: "Главная", href: PATHS.HOME },
	{ label: "Галерея", href: PATHS.DESIGN_GALLERY },
	{ label: "Конфигуратор", href: PATHS.CONFIGURATOR },
	{ label: "Контакты", href: PATHS.CONTACTS },
] as const;
