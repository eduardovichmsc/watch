// src/app/contacts/page.tsx
"use client";

import { ContactForm } from "@/components/sections/contacts/form";
import { InfoBlock } from "@/components/sections/contacts/info";
import { SocialLink } from "@/components/sections/contacts/social_link";
import { SocialMediaList } from "@/constants/social";

export default function ContactsPage() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
			{/* Левая колонка*/}
			<div className="bg-black text-white p-8 md:p-12 lg:p-16 flex flex-col justify-between">
				<div>
					<h1 className="font-light text-5xl md:text-7xl xl:text-8xl tracking-tighter mb-12">
						Свяжитесь с нами.
					</h1>
					<div className="space-y-8">
						<InfoBlock
							title="Контакты"
							lines={["hello@wotchmod.club", "+7 (700) 123-45-67"]}
							hrefs={["mailto:hello@wotchmod.club", "tel:+77001234567"]}
						/>
					</div>
				</div>

				{/* Соцсети */}
				<div className="mt-16">
					<h3 className="font-mono text-sm uppercase text-slate-400 mb-4">
						Соцсети
					</h3>
					<div className="flex items-center gap-4">
						{SocialMediaList.map((link) => (
							<SocialLink
								key={link.label}
								label={link.label}
								href={link.href}
								Icon={link.icon}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Правая колонка */}
			<div className="p-8 md:p-12 lg:p-16 flex items-center border-t lg:border-t-0 lg:border-l border-slate-200">
				<ContactForm />
			</div>
		</div>
	);
}
