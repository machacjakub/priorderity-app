"use client";
import { Bar } from "./Bar";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";
import { useContext } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";


export const HealthBars = ( ) => {
	const { currentHealthStats } = useContext( doneModuleContext );
	return (
		<>
			<DashboardSectionHeading>
				Stats
			</DashboardSectionHeading>
			<div className="m-5 flex justify-around rounded-3xl bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-500/30 to-transparent px-4 py-3">
				{currentHealthStats.map( ( healthStat, i ) => <div key={`${i}-${healthStat.name}`}><Bar title={healthStat.label} percentage={healthStat.score}/></div> )}
			</div>
		</>
	);
};
