// app/components/home/process.tsx

const content = {
	header: {
		title: "Как это работает?",
		description:
			"Процесс создания ваших идеальных часов прост, прозрачен и полностью под вашим контролем.",
	},
	steps: [
		{
			number: "01",
			title: "Выбор базы",
			description:
				"Начните с основы. Выберите корпус из хирургической стали 316L, легкого титана Grade-5 или сверхпрочного кованого карбона. Это фундамент ваших часов.",
		},
		{
			number: "02",
			title: "Детализация",
			description:
				"Самое важное — в мелочах. Подберите циферблат, часовые метки, стрелки и безель. Сотни комбинаций для создания уникального лица вашего механизма.",
		},
		{
			number: "03",
			title: "Финализация",
			description:
				"Завершающий штрих. Подберите ремешок из кожи, каучука или стальной браслет. Проверьте свой дизайн в 3D-просмотре и получите готовый к производству чертеж.",
		},
	],
};

const StepCard = ({
	number,
	title,
	children,
}: {
	number: string;
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="relative group bg-zinc-950 hover:bg-zinc-950/10 p-8 transition-all duration-300 ease-in-out hover:-translate-y-2 border border-zinc-800 hover:border-zinc-700 rounded-none">
			<span className="absolute top-8 right-8 text-7xl font-bold text-zinc-800/80 transition-colors duration-300 group-hover:text-zinc-700/90 z-0">
				{number}
			</span>
			<div className="relative z-10">
				<h3 className="text-2xl font-semibold text-white">{title}</h3>
				<div className="mt-4 mb-6 h-px w-16 bg-zinc-700 transition-colors duration-300 group-hover:bg-zinc-500"></div>
				<p className="text-zinc-400 leading-relaxed">{children}</p>
			</div>
		</div>
	);
};

export const Process = () => {
	return (
		<section className="w-full bg-black text-white">
			<div className="mx-auto px-8 lg:px-16 py-24 sm:py-32">
				<div className="max-w-3xl mb-20">
					<h2 className="mt-4 font-light text-5xl md:text-7xl tracking-tighter text-white">
						<span className="uppercase">{content.header.title}</span>
					</h2>
					<p className="mt-6 text-lg text-zinc-400">
						{content.header.description}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{content.steps.map((step) => (
						<StepCard key={step.number} number={step.number} title={step.title}>
							{step.description}
						</StepCard>
					))}
				</div>
			</div>
		</section>
	);
};
