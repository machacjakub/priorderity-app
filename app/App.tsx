'use client';

import {User} from "@supabase/gotrue-js";
import {Navbar} from "@/app/modules/components/Navbar";
import {IDoneActivity} from "@/app/types";
import {Nullable} from "fputils";
import {ActivitiesToAdd} from "@/app/modules/attributes-stats/ActivitiesToAdd";
import {DasboardSectionHeading} from "@/app/modules/components/DasboardSectionHeading";
import {DoneActivitiesHistory} from "@/app/modules/history/DoneActivitiesHistory";
import {HealthBars} from "@/app/modules/health-bars/HealthBars";
import {getHealthStats} from "@/app/modules/health-bars/utils";
import { experimental_useOptimistic as useOptimistic } from 'react';

interface IProps {
	user: Nullable<User>;
    done: Nullable<IDoneActivity[]>;
}
export const App = ( {user, done}: IProps ) => {
	const [optimisticActivities, addOptimisticActivity] = useOptimistic<IDoneActivity[], string>(
		done ?? [],
		( state: IDoneActivity[], newActivityType: string ) => [
			{ id: state[0].id + 1, type: newActivityType, created_at: new Date() },
			...state,
		]
	);
	return (
		<div className="w-full h-screen flex flex-col items-center">
			<Navbar user={user} />
			<div className="w-full h-full animate-in text-foreground">
				<div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4">
					<div className="bg-blue-100 dark:bg-gray-900 flex justify-center items-center row-span-3 mt-16">to-do</div>
					<div className="bg-background col-span-2 mt-16">
						<DasboardSectionHeading>Stats</DasboardSectionHeading>
						<HealthBars healthStats={getHealthStats( done ?? [] )}/>
					</div>
					<div className="bg-background row-span-3 overflow-scroll mt-16 top">
						<DasboardSectionHeading>History</DasboardSectionHeading>
						<DoneActivitiesHistory doneActivities={optimisticActivities}/>
					</div>
					<div className="bg-background col-span-2 row-span-2 overflow-auto mt-16">
						<DasboardSectionHeading>Activities</DasboardSectionHeading>
						<ActivitiesToAdd handleAdd={addOptimisticActivity}/>
					</div>
				</div>
			</div>
		</div>
	);
};