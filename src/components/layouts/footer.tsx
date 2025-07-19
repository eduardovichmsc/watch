// src/components/layout/Footer.tsx
import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const content = {
	logo: "WotchModClub",
	tagline: "Инженерия. Воплощенная в вас.",
	socials: [
		{ href: "#", label: "Instagram", icon: Instagram },
		{ href: "#", label: "Facebook", icon: Facebook },
		{ href: "#", label: "YouTube", icon: Youtube },
		{ href: "#", label: "Twitter", icon: Twitter },
	],
	links: [
		{
			title: "Магазин",
			items: [
				{ href: "/catalog", label: "Каталог" },
				{ href: "/configurator", label: "Конфигуратор" },
				{ href: "/new-arrivals", label: "Новинки" },
			],
		},
		{
			title: "Компания",
			items: [
				{ href: "/about", label: "О нас" },
				{ href: "/craftsmanship", label: "Наше мастерство" },
				{ href: "/contact", label: "Контакты" },
			],
		},
		{
			title: "Поддержка",
			items: [
				{ href: "/faq", label: "FAQ" },
				{ href: "/shipping", label: "Доставка и оплата" },
				{ href: "/warranty", label: "Гарантия" },
			],
		},
	],
	newsletter: {
		title: "Будьте в курсе",
		description:
			"Подпишитесь, чтобы получать эксклюзивные предложения и новости о запуске коллекций.",
		placeholder: "Ваш email",
		buttonText: "Подписаться",
	},
	legal: {
		copyright: `© ${new Date().getFullYear()} ChronoLux. Все права защищены.`,
		links: [
			{ href: "/privacy-policy", label: "Политика конфиденциальности" },
			{ href: "/terms-of-service", label: "Условия использования" },
		],
	},
	madeBy: {
		text: "Сделано",
		link: {
			label: "@joinway.24",
			href: "https://join-way.com/",
		},
	},
};

export function Footer() {
	return (
		<footer className="bg-black text-zinc-400">
			<div className="mx-auto px-8 lg:px-16 py-16 sm:pt-24">
				{/* Верхняя часть футера с основной информацией */}
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					{/* Левый блок: Логотип и соцсети */}
					<div className="lg:col-span-4">
						<h2 className="font-cormorant text-4xl font-bold text-white">
							{content.logo}
						</h2>
						<p className="mt-4 font-mono text-sm uppercase tracking-wider text-zinc-500">
							{content.tagline}
						</p>
						<div className="mt-8 flex gap-5">
							{content.socials.map((social) => (
								<Link
									key={social.label}
									href={social.href}
									aria-label={social.label}
									className="transition-colors hover:text-white">
									<social.icon className="size-6" />
								</Link>
							))}
						</div>
					</div>

					{/* Средний блок: Колонки ссылок */}
					<div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-8">
						{content.links.map((column) => (
							<div key={column.title}>
								<h3 className="font-mono text-sm uppercase tracking-widest text-zinc-300">
									{column.title}
								</h3>
								<ul className="mt-6 space-y-4">
									{column.items.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className="transition-colors hover:text-white">
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* Deprecated Правый блок: Подписка */}
					{/* <div className="lg:col-span-4">
						<h3 className="text-lg font-semibold text-white">
							{content.newsletter.title}
						</h3>
						<p className="mt-4 text-sm text-zinc-400">
							{content.newsletter.description}
						</p>
						<form className="mt-6 flex flex-col sm:flex-row gap-2">
							<input
								type="email"
								placeholder={content.newsletter.placeholder}
								className="w-full h-12 px-4 bg-transparent border border-zinc-800 text-white rounded-none focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-colors"
								aria-label="Email для подписки"
							/>
							<button
								type="submit"
								className="h-12 px-6 bg-white text-black font-semibold rounded-none shrink-0 hover:bg-zinc-200 transition-colors">
								{content.newsletter.buttonText}
							</button>
						</form>
					</div> */}
				</div>

				{/* Нижняя часть футера с копирайтом */}
				<div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
					<p className="font-mono text-xs text-zinc-500">
						{content.legal.copyright}
					</p>
					<div className="flex items-center gap-6">
						<span className="font-mono text-xs text-zinc-500">
							{content.madeBy.text}{" "}
							<a
								href={content.madeBy.link.href}
								className="hover:text-zinc-200">
								{content.madeBy.link.label}
							</a>
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
