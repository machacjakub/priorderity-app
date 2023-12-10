"use client";

import { IDoneActivity } from "@/app/types";
import { ActivitiesInHistoryList } from "@/app/modules/history/ActivitiesInHistoryList";
import { getDayName, isSameDay, returnIfNotLower, WeekDayNumber } from "@/app/modules/utils";

interface IProps {
	doneActivities: IDoneActivity[];
	handleDelete: ( id: number ) => void;
	daysVisible?: number;
}

const getDaysToDisplayCount = ( daysSinceFirst: number, maxDays?: number ): number => returnIfNotLower( Math.min( Math.ceil( daysSinceFirst ), maxDays ?? 7 ),1 );


const dayInSeconds = 86400000;
export const DoneActivitiesHistory = ( { doneActivities, handleDelete, daysVisible }: IProps ) => {
	const now = new Date().getTime();
	const sinceFirstActivity = ( now - new Date( doneActivities[doneActivities.length - 1].created_at ).getTime() ) / dayInSeconds;
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
						<div
							key={i}
							className="mx-3 my-2 rounded-xl border-b-2 border-b-violet-400/90 bg-foreground/10 bg-gradient-to-bl from-foreground/10 via-transparent to-transparent p-2 text-foreground"
						>
							<div className="px-2 text-foreground/80">
								{
									day.title
								}
							</div>
							<ActivitiesInHistoryList
								activities={
									day.activities
								}
								handleDelete={
									handleDelete
								}
							/>
						</div>
					);
				} )}
			</div>
		</>
	);
};
