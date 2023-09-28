'use client';

import {IDoneActivity} from "@/app/types";
import {ActivitiesInHistoryList} from "@/app/modules/history/ActivitiesInHistoryList";
import {getDayName, isSameDay, WeekDayNumber} from "@/app/modules/utils";
import {DasboardSectionHeading} from "@/app/modules/components/DasboardSectionHeading";

interface IProps {
	doneActivities: IDoneActivity[];
	handleDelete: ( id: number ) => void
}

export const DoneActivitiesHistory = ( {doneActivities, handleDelete}: IProps ) => {
	const now = new Date().getTime();
	const dummyArray = Array( 7 ).fill( null );
	const days = dummyArray.map( ( day, i ) => {
		const thisDay = new Date( now - 86400000 * i );
		return {
			title: `${getDayName( thisDay.getDay() as WeekDayNumber )} ${thisDay.getDate()}.${thisDay.getMonth() + 1}.`,
			activities: doneActivities.filter( ( activity ) => isSameDay( activity.created_at, thisDay ) )
		};
	} );
	return (
		<>
			<DasboardSectionHeading>History</DasboardSectionHeading>
			<div className="mx-3">
				{days.map( ( day, i ) => {
					return (
						<div key={i} className="bg-foreground/10 border-b-2 border-b-violet-400/90 text-foreground p-2 mx-3 my-2 rounded-xl bg-gradient-to-bl from-foreground/10 via-transparent to-transparent">
							<div className="text-foreground/80 px-2">{day.title}</div>
							<ActivitiesInHistoryList activities={day.activities} handleDelete={handleDelete} />
						</div> );
				} )}
			</div>
		</>
	);
}
;