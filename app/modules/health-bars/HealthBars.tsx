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
			<div className="m-5 flex justify-between rounded-3xl bg-gradient-to-r from-transparent via-cyan-800/10 dark:via-cyan-800/40 to-transparent px-4 py-3">
				{healthStats.map( ( healthStat, i ) => <div key={`${i}-${healthStat.name}`}><Bar title={healthStat.label} percentage={healthStat.score}/></div> )}
			</div>
		</>
	);
};
