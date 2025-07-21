export const PATHS = {
	HOME: "/",
	ABOUT: "/about",
	STORE: "/store",
	CONFIGURATOR: "/configurator",
	CONTACTS: "/contacts",
	CART: "/cart",
} as const;

export const MAIN_LINKS = [
	{ label: "Главная", href: PATHS.HOME },
	{ label: "О нас", href: PATHS.ABOUT },
	{ label: "Магазин", href: PATHS.STORE },
	{ label: "Контакты", href: PATHS.CONTACTS },
] as const;
