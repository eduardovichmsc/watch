import { Spinner } from "@/components/ui/spinner";

export const ConfiguratorLoader = () => {
	return (
		<div className="flex min-h-[80vh] items-center justify-center col-span-2">
			<Spinner />
		</div>
	);
};
