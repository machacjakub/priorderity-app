"use client";

import { ActivitiesInHistoryList } from "@/app/modules/history/ActivitiesInHistoryList";
import { getDayName, isSameDay, returnIfNotLower, WeekDayNumber } from "@/app/modules/utils";
import { useContext } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";

interface IProps {
	daysVisible?: number;
}

const getDaysToDisplayCount = ( daysSinceFirst: number, maxDays?: number ): number => returnIfNotLower( Math.min( Math.ceil( daysSinceFirst ), maxDays ?? 7 ),1 );


const dayInSeconds = 86400000;
export const DoneActivitiesHistory = ( { daysVisible }: IProps ) => {
	const { doneActivities, deleteDoneActivity } = useContext( doneModuleContext );
	if ( doneActivities.length === 0 ) {
		return null;
	}
	const now = new Date().getTime();
	const sinceFirstActivity = ( now - new Date( doneActivities[doneActivities.length - 1]?.created_at ).getTime() ) / dayInSeconds;
	const dummyArray = Array( getDaysToDisplayCount( sinceFirstActivity, daysVisible ) ).fill( null );
	const days = dummyArray.map( ( day, i ) => {
		const thisDay = new Date( now - dayInSeconds * i );
		return {
			title: `${getDayName(
				thisDay.getDay() as WeekDayNumber,
			)} ${thisDay.getDate()}.${
				thisDay.getMonth() + 1
			}.`,
			activities: doneActivities.filter( ( activity ) =>
				isSameDay( activity.created_at, thisDay ),
			),
		};
	} );
	return (
		<>
			<div className="mx-3 max-w-lg mx-auto">
				{days.map( ( day, i ) => {
					return (
						<div key={i} className="mx-3 my-2 rounded-xl bg-gradient-to-l bg-foreground/5 from-foreground/5 via-blue-400/20 to-blue-400/30 dark:from-foreground/10 dark:via-blue-600/20 dark:to-blue-600/40 p-2 text-foreground">
							<div className="px-2 text-foreground/80">
								{day.title}
							</div>
							<ActivitiesInHistoryList activities={day.activities} handleDelete={deleteDoneActivity}/>
						</div>
					);
				} )}
			</div>
		</>
	);
};
