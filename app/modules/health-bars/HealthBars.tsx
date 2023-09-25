'use client';
import {Bar} from "./Bar";
import {IHealthStats} from "@/app/types";
import {DasboardSectionHeading} from "@/app/modules/components/DasboardSectionHeading";

interface IProps {
	healthStats: IHealthStats;
}

export const HealthBars = ( {healthStats}: IProps ) => {
	return (
		<>
			<DasboardSectionHeading>Stats</DasboardSectionHeading>
			<div className="flex justify-between px-4 py-3 m-5 bg-gradient-to-r from-transparent via-cyan-800/40 to-transparent rounded-3xl">
				<Bar title={'Mental health'} percentage={healthStats.mental}/>
				<Bar title={'Physical health'} percentage={healthStats.physical}/>
				<Bar title={'Career'} percentage={healthStats.career}/>
				<Bar title={'Relationships'} percentage={healthStats.social}/>
				<Bar title={'Realization'} percentage={healthStats.realization}/>
			</div>
		</>
	);
};