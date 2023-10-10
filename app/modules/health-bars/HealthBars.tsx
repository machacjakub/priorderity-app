"use client";
import { Bar } from "./Bar";
import { IHealthStats } from "@/app/types";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";

interface IProps {
	healthStats: IHealthStats;
}

export const HealthBars = ( { healthStats }: IProps ) => {
	return (
		<>
			<DashboardSectionHeading>
				Stats
			</DashboardSectionHeading>
			<div className="m-5 flex justify-between rounded-3xl bg-gradient-to-r from-transparent via-cyan-800/40 to-transparent px-4 py-3">
				<Bar
					title={"Mental health"}
					percentage={
						healthStats.mental
					}
				/>
				<Bar
					title={"Physical health"}
					percentage={
						healthStats.physical
					}
				/>
				<Bar
					title={"Career"}
					percentage={
						healthStats.career
					}
				/>
				<Bar
					title={"Relationships"}
					percentage={
						healthStats.social
					}
				/>
				<Bar
					title={"Realization"}
					percentage={
						healthStats.realization
					}
				/>
			</div>
		</>
	);
};
