import { HabitStreakTag } from "@/app/modules/habits/HabitStreakTag";
import { useContext } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";
import userDataContext from "@/app/modules/context/userDataContext";
import { IUserData } from "@/app/modules/profile/types";
import { IDoneActivity } from "@/app/types";
import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import { getStreak } from "@/app/modules/habits/utils";

export const HabitsSectionMobile = () => {
	const doneActivities: IDoneActivity [] = useContext( doneModuleContext ).doneActivities;
	const habits: IUserData["habits"] = useContext( userDataContext )?.habits ?? [];
	if ( habits.length === 0 ) {
		return null;
	}
	return ( <div className='my-2'>
		<DashboardSectionHeadingMobile>Habits</DashboardSectionHeadingMobile>
		<div className='mx-4 my-2 flex gap-2 flex-wrap'>
			{habits.map( habit => <HabitStreakTag key={habit.label} label={habit.label} streak={getStreak( habit, doneActivities )} streakWithoutToday={getStreak( habit, doneActivities, true )} /> )}
		</div>
	</div>
	);
};