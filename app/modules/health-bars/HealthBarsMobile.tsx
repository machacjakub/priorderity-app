import { getHealthColor } from "@/app/modules/health-bars/utils";
import { CheckOutlined } from "@/icons";
import doneModuleContext from "@/app/modules/context/doneModuleContext";
import { useContext } from "react";

const StatsBar = ( { title, stat }: { title: string; stat: number } ) => {
	return (
		<div className="h-16 text-center max-w-24 rounded-xl border-b-2 border-violet-500/30 bg-gradient-to-b from-gray-100 via-gray-50/90 to-white px-2 py-1 text-foreground backdrop-blur-sm dark:from-gray-900 dark:via-gray-900/70 dark:to-black">
			<p className="text-sm truncate">{title}</p>
			<div
				className="text-center text-lg font-semibold"
				style={{ color: getHealthColor( stat ) }}
			>
				<div className='h-7'>{stat >= 100 ? <CheckOutlined className='text-success-light dark:text-success-dark w-6 m-auto' strokeWidth={3}/> : `${stat}%`}</div>
			</div>
		</div>
	);
};

export const HealthBarsMobile = ( ) => {
	const { currentHealthStats } = useContext( doneModuleContext );
	return (
		<div className="mt-1 flex w-screen justify-evenly gap-2 overflow-x-scroll">
			{currentHealthStats.map( ( healthStat, i ) => <div key={`${i}-${healthStat.name}`}><StatsBar title={healthStat.label} stat={healthStat.score}/></div> )}
		</div>
	);
};
