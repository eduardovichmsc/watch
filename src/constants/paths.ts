export const PATHS = {
	HOME: "/",
	ABOUT: "/about",
	DESIGN_GALLERY: "/gallery",
	CONFIGURATOR: "/configurator",
	CONTACTS: "/contacts",
	CART: "/cart",
} as const;

export const MAIN_LINKS = [
	{ label: "Главная", href: PATHS.HOME },
	{ label: "О нас", href: PATHS.ABOUT },
	{ label: "Галерея", href: PATHS.DESIGN_GALLERY },
	{ label: "Контакты", href: PATHS.CONTACTS },
] as const;
