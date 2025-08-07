import Image from "next/image";

const content = {
	name: "Алексей Воронов",
	title: "Основатель и главный мастер",
	quote:
		"«Я всегда верил, что у каждого человека есть своя история. Моя цель — дать инструменты, чтобы эту историю можно было рассказать без слов, через объект, который будет с вами каждый день».",
	image: "/about/founder-photo.jpg",
};

const MeetTheFounder = () => (
	<section className="bg-slate-50 text-black py-24 sm:py-32">
		<div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
			<div className="order-last lg:order-first">
				<blockquote className="text-2xl md:text-3xl font-light italic text-black leading-snug">
					{content.quote}
				</blockquote>
				<footer className="mt-6">
					<p className="text-xl font-semibold">{content.name}</p>
					<p className="font-mono text-sm uppercase tracking-wider text-zinc-500">
						{content.title}
					</p>
				</footer>
			</div>
			<div className="relative w-full aspect-[4/5]">
				<Image
					src={content.image}
					fill
					className="object-cover grayscale"
					alt={`Фотография основателя: ${content.name}`}
				/>
			</div>
		</div>
	</section>
);
