// src/components/layout/header.tsx
"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, User2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MAIN_LINKS, PATHS } from "@/constants";
import { SOCIAL_MEDIA_LINKS } from "@/constants";
import { SITE } from "@/constants";
import { useCartStore } from "@/stores/cart";
import { useCursorStore } from "@/stores/cursor";
import { useFavoritesStore } from "@/stores/favorites";
import { cn } from "@/lib/utils";

const content = {
	logo: "WotchsModClub",
	navLinks: MAIN_LINKS,
	buttonLinks: {
		auth: {
			label: "Авторизоваться",
			href: SITE.BASE + PATHS.ADMIN,
			icon: User2,
		},
		cart: {
			label: "Корзина",
			href: PATHS.CART,
			icon: ShoppingBag,
		},
		favorites: {
			label: "Избранное",
			href: PATHS.FAVORITES,
			icon: Heart,
		},
	},
	socialMediaLinks: SOCIAL_MEDIA_LINKS,
};

export function Header() {
	const { setVariant } = useCursorStore();
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	// const items = useCartStore((store) => store.items);
	const { favorites } = useFavoritesStore();

	const isHomePage = pathname === PATHS.HOME;

	// Логика скролла и закрытия меню
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 150);
		};

		if (isHomePage) {
			window.addEventListener("scroll", handleScroll);
			handleScroll();

			return () => window.removeEventListener("scroll", handleScroll);
		} else {
			setIsScrolled(true);
		}
	}, [isHomePage]);

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMenuOpen]);

	useEffect(() => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
		}
	}, [pathname]);

	const hasBackground = !isHomePage || isScrolled;

	const headerClasses = cn(
		"w-full top-0 z-[101] transition-colors duration-300 ease-in-out border-b",
		isHomePage ? "fixed" : "sticky",
		{
			"bg-white lg:bg-white/80 backdrop-blur-md border-slate-200":
				hasBackground,
			"border-transparent": !hasBackground,
		}
	);

	return (
		<>
			<header className={headerClasses}>
				<div
					className={cn(
						"mx-auto flex items-center justify-between px-8 lg:px-16 transition-all duration-300 ease-in-out",
						{
							"py-6 lg:py-10": isHomePage && !isScrolled,
							"py-4": !isHomePage || isScrolled,
						}
					)}>
					{/* Логотип */}
					<Link
						href={PATHS.HOME}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className={cn(
							"hidden lg:inline text-2xl sm:text-3xl font-bold font-cormorant transition-colors",
							hasBackground ? "text-slate-900" : "text-white"
						)}>
						{content.logo}
					</Link>

					<div className="inline lg:hidden"></div>

					{/* Правая часть */}
					<div className="flex items-center gap-4 sm:gap-6">
						{/* Навигация для десктопа */}
						<nav className="hidden lg:flex items-center gap-6">
							{content.navLinks.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									onMouseEnter={() => setVariant("link")}
									onMouseLeave={() => setVariant("default")}
									className={cn(
										"relative text-sm font-medium transition-colors",
										isMenuOpen && pathname !== item.href
											? "text-slate-500"
											: pathname === item.href
											? hasBackground
												? "text-black"
												: "text-white"
											: hasBackground
											? "text-slate-500 hover:text-black"
											: "text-slate-300 hover:text-white"
									)}>
									{item.label}
									{pathname === item.href && (
										<motion.span
											className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-current"
											layoutId="active-nav-dot"
											transition={{
												type: "spring",
												stiffness: 350,
												damping: 30,
											}}
										/>
									)}
								</Link>
							))}
						</nav>

						{/* Разделитель */}
						<div
							className={cn(
								"hidden lg:block w-px h-6",
								hasBackground
									? "bg-slate-400 mix-blend-normal opacity-100"
									: "bg-white mix-blend-difference opacity-50"
							)}
						/>

						{/* Иконки и кнопка меню */}
						<div className="flex items-center gap-4 sm:gap-6">
							<Link
								href={content.buttonLinks.auth.href}
								aria-label={content.buttonLinks.auth.label}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className={cn(
									"relative transition-colors",
									hasBackground
										? "text-slate-600 hover:text-slate-900"
										: "text-slate-100 hover:text-white",
									isMenuOpen ? "text-slate-600" : null
								)}>
								<content.buttonLinks.auth.icon className="size-6" />
							</Link>

							{/* Корзина - Deprecated */}
							{/* <Link
								href={content.buttonLinks.cart.href}
								aria-label={content.buttonLinks.cart.label}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className={cn(
									"relative transition-colors",
									hasBackground
										? "text-slate-600 hover:text-slate-900"
										: "text-slate-100 hover:text-white",
									isMenuOpen ? "text-slate-600" : null
								)}>
								<content.buttonLinks.cart.icon className="size-6" />
								{items.length > 0 && (
									<div
										className={cn(
											"absolute -bottom-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full",
											hasBackground
												? "bg-black text-white"
												: "bg-white text-black",
											isMenuOpen ? "border border-slate-900" : null
										)}>
										<span className="text-xs font-semibold">
											{items.length > 9 ? "9+" : items.length}
										</span>
									</div>
								)}
							</Link> */}

							<Link
								href={content.buttonLinks.favorites.href}
								aria-label={content.buttonLinks.favorites.label}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className={cn(
									"relative transition-colors",
									hasBackground
										? "text-slate-600 hover:text-slate-900"
										: "text-slate-100 hover:text-white",
									isMenuOpen ? "text-slate-600" : null
								)}>
								<content.buttonLinks.favorites.icon className="size-6" />
								{favorites.length > 0 && (
									<div
										className={cn(
											"absolute -bottom-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full",
											hasBackground
												? "bg-black text-white"
												: "bg-white text-black",
											isMenuOpen ? "border border-slate-900" : null
										)}>
										<span className="text-xs font-semibold">
											{favorites.length > 9 ? "9+" : favorites.length}
										</span>
									</div>
								)}
							</Link>

							<button
								type="button"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								aria-label="Открыть меню">
								<motion.div
									key={isMenuOpen ? "close" : "open"}
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.3 }}
									className={cn(
										"transition-colors",
										isMenuOpen
											? "text-slate-800"
											: hasBackground
											? "text-slate-800"
											: "text-white"
									)}>
									{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
								</motion.div>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Оверлей меню */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-[100] bg-white">
						{/* Контейнер */}
						<div className="h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16">
							{/* Пустой div для выравнивания с логотипом */}
							<div></div>

							{/* Основная навигация */}
							<nav className="flex flex-col items-end gap-y-4 -mt-20">
								{content.navLinks.map((item, index) => (
									<motion.div
										key={item.href}
										initial={{ x: 100, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{
											delay: 0.1 * index,
											type: "spring",
											stiffness: 100,
										}}
										onMouseEnter={() => setVariant("link")}
										onMouseLeave={() => setVariant("default")}>
										<Link
											href={item.href}
											className={cn(
												"text-5xl sm:text-6xl md:text-8xl text-right transition-colors",
												pathname === item.href
													? "text-black font-medium"
													: "text-neutral-400 hover:text-black font-light"
											)}>
											{item.label}
										</Link>
									</motion.div>
								))}
							</nav>

							{/* Футер меню */}
							<div className="flex justify-end items-center gap-x-6 text-sm">
								<a
									href="mailto:hello@wotchmod.club"
									className="text-slate-500 hover:text-black transition-colors"
									onMouseEnter={() => setVariant("link")}
									onMouseLeave={() => setVariant("default")}>
									hello@wotchmod.club
								</a>
								<span className="text-slate-300">/</span>
								{content.socialMediaLinks.map((link, index) => (
									<Fragment key={index}>
										<a
											href="#"
											className="text-slate-500 hover:text-black transition-colors"
											onMouseEnter={() => setVariant("link")}
											onMouseLeave={() => setVariant("default")}>
											{link.label}
										</a>
										{content.socialMediaLinks.length - 1 > index && (
											<span className="block text-slate-300">/</span>
										)}
									</Fragment>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
