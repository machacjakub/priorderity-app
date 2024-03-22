import { HabitStreakTag } from "@/app/modules/habits/HabitStreakTag";
import { useContext } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";
import userDataContext from "@/app/modules/context/userDataContext";
import { IUserData } from "@/app/modules/profile/types";
import { IDoneActivity } from "@/app/types";
import { getStreak } from "@/app/modules/habits/utils";

export const HabitsSection = () => {
	const doneActivities: IDoneActivity [] = useContext( doneModuleContext ).doneActivities;
	const habits: IUserData["habits"] = useContext( userDataContext )?.habits ?? [];
	return (
		<div className='fixed bottom-4 right-4 flex flex-col gap-2'>
			{habits.map( habit => <HabitStreakTag key={habit.label} label={habit.label} streak={getStreak( habit, doneActivities )} streakWithoutToday={getStreak( habit, doneActivities, true )}/> )}
		</div>
	);
};