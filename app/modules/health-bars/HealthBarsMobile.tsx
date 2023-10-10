import { IHealthStats } from "@/app/types";
import { getHealthColor } from "@/app/modules/health-bars/utils";

const StatsBar = ({ title, stat }: { title: string; stat: number }) => {
	return (
		<div className="rounded-xl border-b-2 border-violet-500/30 bg-gradient-to-b from-gray-100 via-gray-50/90 to-white px-2 py-1 text-foreground backdrop-blur-sm dark:from-gray-900 dark:via-gray-900/70 dark:to-black">
			<div className="text-sm">{title}</div>
			<div
				className="text-center text-lg font-semibold"
				style={{ color: getHealthColor(stat) }}
			>
				{stat}%
			</div>
		</div>
	);
};

export const HealthBarsMobile = ({
	healthStats,
}: {
	healthStats: IHealthStats;
}) => {
	return (
		<div className="mt-1 flex w-screen justify-evenly">
			<StatsBar
				title={"Mental"}
				stat={healthStats.mental}
			/>
			<StatsBar
				title={"Physical"}
				stat={healthStats.physical}
			/>
			<StatsBar
				title={"Career"}
				stat={healthStats.career}
			/>
			<StatsBar
				title={"Social"}
				stat={healthStats.social}
			/>
			<StatsBar
				title={"Realization"}
				stat={healthStats.realization}
			/>
		</div>
	);
};
