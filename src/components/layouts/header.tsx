// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { MAIN_LINKS, PATHS } from "@/constants/paths";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { useCursorStore } from "@/stores/cursor";
import { SOCIAL_MEDIA_LINKS } from "@/constants/socials";

export function Header() {
	const { setVariant } = useCursorStore();
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const items = useCartStore((store) => store.items);

	const isHomePage = pathname === PATHS.HOME;
	const isLightMode = !isHomePage || isScrolled;

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

	const headerClasses = clsx(
		"w-full top-0 z-[101] transition-colors duration-300 ease-in-out",
		isHomePage ? "fixed" : "sticky",
		isLightMode
			? "bg-white lg:bg-white/80 backdrop-blur-md border-b border-slate-200"
			: "border-b border-transparent"
	);

	return (
		<>
			<header className={headerClasses}>
				<div
					className={clsx(
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
						className={clsx(
							"hidden lg:inline text-2xl sm:text-3xl font-bold font-cormorant transition-colors",
							isLightMode ? "text-slate-900" : "text-white"
						)}>
						WotchModsClub
					</Link>

					<div className="inline lg:hidden"></div>

					{/* Правая часть */}
					<div className="flex items-center gap-4 sm:gap-6">
						{/* Навигация для десктопа */}
						<nav className="hidden lg:flex items-center gap-6">
							{MAIN_LINKS.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									onMouseEnter={() => setVariant("link")}
									onMouseLeave={() => setVariant("default")}
									className={clsx(
										"text-sm font-medium transition-colors",
										pathname === item.href
											? isLightMode
												? "text-black"
												: "text-white"
											: isLightMode
											? "text-slate-500 hover:text-black"
											: "text-slate-300 hover:text-white"
									)}>
									{item.label}
								</Link>
							))}
						</nav>

						{/* Разделитель */}
						<div
							className="hidden lg:block w-px h-6 bg-slate-200"
							style={{
								backgroundColor: isLightMode ? "rgb(226, 232, 240)" : "white",
								mixBlendMode: isLightMode ? "normal" : "difference",
								opacity: isLightMode ? 1 : 0.5,
							}}></div>

						{/* Иконки и кнопка меню */}
						<div className="flex items-center gap-4 sm:gap-6">
							<Link
								href={PATHS.CART}
								aria-label="Корзина"
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								className={clsx(
									"relative transition-colors",
									isLightMode
										? "text-slate-600 hover:text-slate-900"
										: "text-slate-100 hover:text-white"
								)}>
								<ShoppingBag className="size-6" />
								{items.length > 0 && (
									<div
										className={clsx(
											"absolute -bottom-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full",
											isLightMode
												? "bg-black text-white"
												: "bg-white text-black"
										)}>
										<span className="text-xs font-semibold">
											{items.length > 9 ? "9+" : items.length}
										</span>
									</div>
								)}
							</Link>

							<button
								type="button"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								onMouseEnter={() => setVariant("link")}
								onMouseLeave={() => setVariant("default")}
								aria-label="Открыть меню"
								// className="lg:hidden"
							>
								<motion.div
									key={isMenuOpen ? "close" : "open"}
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									exit={{ rotate: 90, opacity: 0 }}
									transition={{ duration: 0.3 }}
									className={clsx(
										"transition-colors",
										isMenuOpen
											? "text-slate-800"
											: isLightMode
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
								{MAIN_LINKS.map((item, index) => (
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
											className={clsx(
												"text-5xl sm:text-6xl md:text-8xl text-right font-light transition-colors",
												pathname === item.href
													? "text-black"
													: "text-neutral-400 hover:text-black"
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
								{SOCIAL_MEDIA_LINKS.map((link, index) => (
									<>
										<a
											key={index}
											href="#"
											className="text-slate-500 hover:text-black transition-colors"
											onMouseEnter={() => setVariant("link")}
											onMouseLeave={() => setVariant("default")}>
											{link.label}
										</a>
										{SOCIAL_MEDIA_LINKS.length - 1 > index && (
											<span className="block text-slate-300">/</span>
										)}
									</>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
