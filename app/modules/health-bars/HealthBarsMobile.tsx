import { getHealthColor } from "@/app/modules/health-bars/utils";
import { IHealthStat } from "@/app/types";

const StatsBar = ( { title, stat }: { title: string; stat: number } ) => {
	return (
		<div className="rounded-xl border-b-2 border-violet-500/30 bg-gradient-to-b from-gray-100 via-gray-50/90 to-white px-2 py-1 text-foreground backdrop-blur-sm dark:from-gray-900 dark:via-gray-900/70 dark:to-black">
			<div className="text-sm">{title}</div>
			<div
				className="text-center text-lg font-semibold"
				style={{ color: getHealthColor( stat ) }}
			>
				{stat}%
			</div>
		</div>
	);
};

export const HealthBarsMobile = ( {
	healthStats,
}: {
	healthStats: IHealthStat[];
} ) => {
	return (
		<div className="mt-1 flex w-screen justify-evenly">
			{healthStats.map( ( healthStat, i ) => <div key={`${i}-${healthStat.name}`}><StatsBar title={healthStat.label} stat={healthStat.score}/></div> )}
		</div>
	);
};
