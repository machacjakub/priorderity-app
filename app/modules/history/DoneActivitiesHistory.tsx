"use client";

import { ActivitiesInHistoryList } from "@/app/modules/history/ActivitiesInHistoryList";
import { getDayName, isSameDay, returnIfNotLower, WeekDayNumber } from "@/app/modules/utils";
import { useContext } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";
import Link from "next/link";

interface IProps {
	daysVisible?: number;
}

const getDaysToDisplayCount = ( daysSinceFirst: number, maxDays?: number ): number => returnIfNotLower( Math.min( Math.ceil( daysSinceFirst ), maxDays ?? 7 ),1 );


const dayInSeconds = 86400000;
export const DoneActivitiesHistory = ( { daysVisible }: IProps ) => {
	const { doneActivities, deleteDoneActivity } = useContext( doneModuleContext );
	if ( doneActivities.length === 0 ) {
		return (
			<div className='text-center text-foreground'>
				<p className='my-4 text-foreground/70'>{`Your history of activities is now empty.`}</p>
				<p className='my-4 mx-10 text-sm text-foreground/40'>{`Let's start by adding some by clicking on any item in the activities section, or on an item in the todo list.`}</p>
				<p>OR</p>
				<Link href='/guide'><button className='my-4 py-2 px-4 rounded-lg dark:bg-blue-900 dark:outline outline-offset-2 outline-blue-300/20 bg-blue-200 drop-shadow-lg hover:drop-shadow-none hover:bg-blue-500/20 hover:outline-blue-500'>See the guide</button></Link>
			</div> );
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
