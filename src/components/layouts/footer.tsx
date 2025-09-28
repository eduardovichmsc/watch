// src/components/layout/footer.tsx
import Link from "next/link";
import { SOCIAL_MEDIA_LINKS, MAIN_LINKS, PATHS, SITE } from "@/constants";
import { getWatchTypes } from "@/services/data";

const generateContent = async () => {
	const watchTypes = await getWatchTypes();

	const topModels = watchTypes.slice(0, 3).map((model) => ({
		label: model.name,
		href: `${SITE.BASE}${PATHS.CONFIGURATOR}?model=${model.id}`,
	}));

	const modelLinks = [
		...topModels,
		...(watchTypes.length > 4
			? [
					{
						href: PATHS.CONFIGURATOR,
						label: "Посмотреть все",
					},
			  ]
			: []),
	];

	const modelsColumn = {
		title: "Наши модели",
		items: modelLinks,
	};

	return {
		logo: SITE.logo.text,
		tagline: "Инженерия. Воплощенная в вас.",
		socials: SOCIAL_MEDIA_LINKS,
		links: [
			{
				title: "Магазин",
				items: MAIN_LINKS.filter((item) => !item.label.includes("Контакты")),
			},
			modelsColumn,
			{
				title: "Компания",
				items: [
					{ href: "/about", label: "О нас" },
					{ href: "/craftsmanship", label: "Наше мастерство" },
					{ href: "/contacts", label: "Контакты" },
				],
			},
		],
		legal: {
			copyright: `© ${new Date().getFullYear()} WotchModClub. Все права защищены.`,
		},
		madeBy: {
			text: "Сделано",
			link: {
				label: "@joinway.24",
				href: "https://join-way.com/",
			},
		},
	};
};

export const Footer = async () => {
	const content = await generateContent();

	return (
		<footer className="bg-black text-zinc-400">
			<div className="mx-auto px-8 lg:px-16 py-16 sm:pt-24">
				{/* Верхняя часть футера */}
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
									target="_blank"
									rel="noopener noreferrer"
									className="transition-colors hover:text-white">
									<social.icon className="size-6" />
								</Link>
							))}
						</div>
					</div>

					{/* Средний блок: Колонки ссылок */}
					<div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
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
												className="transition-colors hover:text-white group">
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* Нижняя часть футера с копирайтом */}
				<div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
					<p className="font-mono text-xs text-zinc-500">
						{content.legal.copyright}
					</p>
					<div className="flex items-center gap-6">
						<span className="font-mono text-xs text-zinc-500">
							{content.madeBy.text}{" "}
							<Link
								href={content.madeBy.link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-zinc-200">
								{content.madeBy.link.label}
							</Link>
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};
