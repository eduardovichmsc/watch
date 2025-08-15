export const PATHS = {
	HOME: "/",
	ABOUT: "/about",
	STORE: "/store",
	CONFIGURATOR: "/configurator",
	CONTACTS: "/contacts",
	CART: "/cart",
	FAVORITES: "/favorites",
	ADMIN: "/admin",
} as const;

export const MAIN_LINKS = [
	{ label: "Главная", href: PATHS.HOME },
	{ label: "Магазин", href: PATHS.STORE },
	{ label: "Конфигуратор", href: PATHS.CONFIGURATOR },
	{ label: "Контакты", href: PATHS.CONTACTS },
] as const;
