"use client";

import { useCursorStore } from "@/stores/cursor";
import Image from "next/image";

const content = {
	subtitle: "ДЛЯ НАСТОЯЩИХ ЦЕНИТЕЛЕЙ",
	title: "Создаем часы, отражающие вашу индивидуальность.",
	paragraphs: [
		"“Wotch Mods Club” — это не просто магазин, это сообщество ценителей уникальных часов. Мы родились из страсти к часовому искусству и желания дать каждому возможность создать нечто по-настоящему личное. Для нас часы — это не просто инструмент для измерения времени, а продолжение индивидуальности их владельца.",
		"Каждая деталь, от винтика в механизме до текстуры ремешка, подбирается с одной целью: воплотить ваше видение в реальность. Мы не производим копии или реплики. Наша цель — предложить вам часы с уникальным дизайном. Чтобы обеспечить чистоту нашего бренда и уважать права других, мы придерживаемся следующей политики:",
		"Чтобы подчеркнуть уникальность наших сборок и избежать смешения с другими брендами, мы в цифровом виде скрываем или закрашиваем логотипы производителей на циферблатах, которые мы используем в наших работах.",
	],
	image: "/home/about.jpg",
};

export const PhilosophySection = () => {
	const { setVariant } = useCursorStore();

	return (
		<section className="bg-white text-black py-24 sm:py-32">
			<div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16s items-center">
				<div
					className="relative w-full aspect-5/6"
					onMouseEnter={() => setVariant("heart")}
					onMouseLeave={() => setVariant("default")}>
					<Image
						src={content.image}
						fill
						className="object-cover"
						alt="Деталь часов ChronoLux"
					/>
				</div>
				<div>
					<p className="font-mono text-sm uppercase tracking-widest text-zinc-500">
						{content.subtitle}
					</p>
					<h2 className="mt-4 font-light text-4xl md:text-5xl tracking-tighter text-black">
						{content.title}
					</h2>
					<div className="mt-6 space-y-6 text-lg text-zinc-600 leading-relaxed">
						{content.paragraphs.map((p, i) => (
							<p key={i}>{p}</p>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
