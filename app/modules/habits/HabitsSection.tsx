import { HabitStreakTag } from "@/app/modules/habits/HabitStreakTag";
import { useContext } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";
import userDataContext from "@/app/modules/context/userDataContext";
import { IUserData } from "@/app/modules/profile/types";
import { IDoneActivity } from "@/app/types";
import { getStreak } from "@/app/modules/habits/utils";
import todoModuleContext from "@/app/modules/context/todoModuleContext";

export const HabitsSection = () => {
	const { handleMarkTodoActivityAsDone } = useContext( todoModuleContext );
	const doneActivities: IDoneActivity [] = useContext( doneModuleContext ).doneActivities;
	const habits: IUserData["habits"] = useContext( userDataContext )?.habits ?? [];
	const handleClick = ( name: string ) => handleMarkTodoActivityAsDone( { id: Math.random() * 1000000 + 2000, name, tags: [], calculatedPriority:0, created_at: new Date(), deadline: null, priority: 0, delayed_to: null, isRecommended: false } );
	return (
		<div className='fixed bottom-4 right-4 flex flex-col gap-2'>
			{habits.map( habit => <HabitStreakTag key={habit.label} label={habit.label} streaks={getStreak( habit, doneActivities )}/> )}
			<div className="flex gap-2">
				<button onClick={() => handleClick( 'Vacation' )} className={'border-2 px-4 py-1 text-sm sm:text-base bg-blue-950/90 rounded-xl hover:bg-blue-800/90'}>Vacation</button>
				<button onClick={() => handleClick( 'Illness' )} className={'border-2 px-4 py-1 text-sm sm:text-base bg-amber-950/90 rounded-xl hover:bg-amber-800/90'}>Illness</button>
			</div>
		</div>
	);
};