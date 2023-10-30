"use client";
import { Bar } from "./Bar";
import { IHealthStat } from "@/app/types";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";

interface IProps {
	healthStats: IHealthStat[];
}

export const HealthBars = ( { healthStats }: IProps ) => {
	return (
		<>
			<DashboardSectionHeading>
				Stats
			</DashboardSectionHeading>
			<div className="m-5 flex justify-between rounded-3xl bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-500/30 to-transparent px-4 py-3">
				{healthStats.map( ( healthStat, i ) => <div key={`${i}-${healthStat.name}`}><Bar title={healthStat.label} percentage={healthStat.score}/></div> )}
			</div>
		</>
	);
};
