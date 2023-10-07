import { IHealthStats } from "@/app/types";
import { getHealthColor } from "@/app/modules/health-bars/utils";


const StatsBar = ( { title, stat }: { title: string, stat: number } ) => {
	return (
		<div className='text-foreground px-2 py-1 rounded-xl backdrop-blur-sm bg-gradient-to-b from-gray-100 dark:from-gray-900 via-gray-50/90 dark:via-gray-900/70 to-white dark:to-black border-b-2 border-violet-500/30' >
			<div className="text-sm">{title}</div>
			<div className="text-center font-semibold text-lg" style={{ color: getHealthColor( stat ) }}>{stat}%</div>
		</div> );
};
 
export const HealthBarsMobile = ( { healthStats }: { healthStats: IHealthStats } ) => {
	return (
		<div className="mt-1 w-screen flex justify-evenly">
			<StatsBar title={'Mental'} stat={healthStats.mental}/>
			<StatsBar title={'Physical'} stat={healthStats.physical}/>
			<StatsBar title={'Career'} stat={healthStats.career}/>
			<StatsBar title={'Social'} stat={healthStats.social}/>
			<StatsBar title={'Realization'} stat={healthStats.realization}/>
		</div>
	);
};

