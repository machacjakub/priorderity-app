'use client';

import {User} from "@supabase/gotrue-js";
import {Navbar} from "@/app/modules/components/Navbar";
import {IDoneActivity} from "@/app/types";
import {Nullable} from "fputils";
import {ActivitiesToAdd} from "@/app/modules/attributes-stats/ActivitiesToAdd";
import {DoneActivitiesHistory} from "@/app/modules/history/DoneActivitiesHistory";
import {HealthBars} from "@/app/modules/health-bars/HealthBars";
import {getHealthStats} from "@/app/modules/health-bars/utils";
import { experimental_useOptimistic as useOptimistic } from 'react';
import {ActivitiesToDo} from "@/app/modules/todo/ActivitiesToDo";
import {ProfileNavigation} from "@/app/modules/profile/ProfileNavigation";
import useBoolean from "@/app/utils/hooks/useBoolean";
import {TodoForm} from "@/app/modules/todo/TodoForm";

interface IProps {
	user: Nullable<User>;
    done: Nullable<IDoneActivity[]>;
}
export const App = ( {user, done}: IProps ) => {
	const profileNavIsDisplayed = useBoolean( false );
	const todoFormDisplayed = useBoolean( false );
	const [optimisticActivities, addOptimisticActivity] = useOptimistic<IDoneActivity[], string>(
		done ?? [],
		( state: IDoneActivity[], newActivityType: string ) => [
			{ id: state[0].id + 1, type: newActivityType, created_at: new Date() },
			...state,
		]
	);
	return (
		<div className="w-full h-screen flex flex-col items-center">
			<Navbar user={user} onProfileClick={profileNavIsDisplayed.setTrue} />
			{profileNavIsDisplayed.value && <ProfileNavigation user={user ?? null} onClose={profileNavIsDisplayed.setFalse} isOpen={profileNavIsDisplayed.value}/>}
			{todoFormDisplayed.value && <TodoForm onClose={todoFormDisplayed.setFalse} isOpen={todoFormDisplayed.value}/>}
			<div className="w-full h-full animate-in text-foreground">
				<div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4">
					<div className="bg-background col-span-1 row-span-3 overflow-auto mt-16 relative">
						<ActivitiesToDo onFormOpen={todoFormDisplayed.setTrue}/>
					</div>
					<div className="bg-background col-span-2 mt-16">
						<HealthBars healthStats={getHealthStats( done ?? [] )}/>
					</div>
					<div className="bg-background row-span-3 overflow-auto mt-16 top">
						<DoneActivitiesHistory doneActivities={optimisticActivities}/>
					</div>
					<div className="bg-background col-span-2 row-span-2 overflow-auto mt-16">
						<ActivitiesToAdd onAdd={addOptimisticActivity}/>
					</div>
				</div>
			</div>
		</div>
	);
};