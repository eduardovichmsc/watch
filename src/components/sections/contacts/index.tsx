// src/components/contacts/index.tsx
"use client";

import { ContactForm } from "@/components/sections/contacts/form";
import { InfoBlock } from "@/components/sections/contacts/info";
import { SocialLink } from "@/components/sections/contacts/social_link";
import { SITE, SOCIAL_MEDIA_LINKS } from "@/constants";

const content = {
	title: "Связаться с нами.",
	contacts: {
		title: "Контакты",
		lines: [SITE.EMAIL.TEXT, SITE.PHONE.TEXT],
		hrefs: [`mailto:${SITE.EMAIL.TEXT}`, `tel:${SITE.PHONE.HREF}`],
	},
	socials: {
		title: "Социальные сети",
		array: SOCIAL_MEDIA_LINKS,
	},
};

export const ContactsWrapper = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
			{/* Левая колонка: Информация */}
			<div className="bg-black text-white p-8 md:p-12 lg:p-16 flex flex-col justify-between">
				<div>
					<h1 className="font-light text-5xl md:text-7xl xl:text-8xl tracking-tighter mb-12">
						{content.title}
					</h1>
					<div className="space-y-8">
						<InfoBlock
							title={content.contacts.title}
							lines={content.contacts.lines}
							hrefs={content.contacts.hrefs}
						/>
					</div>
				</div>

				{/* Соцсети */}
				<div className="mt-16">
					<h3 className="font-mono text-sm uppercase text-slate-400 mb-4">
						{content.socials.title}
					</h3>
					<div className="flex items-center gap-4">
						{content.socials.array.map((link) => (
							<SocialLink key={link.label} Icon={link.icon} {...link} />
						))}
					</div>
				</div>
			</div>

			{/* Правая колонка: Форма */}
			<div className="p-8 md:p-12 lg:p-16 flex items-center border-t lg:border-t-0 lg:border-l border-slate-200">
				<ContactForm />
			</div>
		</div>
	);
};
