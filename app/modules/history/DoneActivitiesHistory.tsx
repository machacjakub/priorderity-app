import {IDoneActivity} from "@/app/types";
import {ActivitiesInHistoryList} from "@/app/modules/history/ActivitiesInHistoryList";
import {getDayName, isSameDay, WeekDayNumber} from "@/app/modules/utils";

interface IProps {
	doneActivities: IDoneActivity[];
}

export const DoneActivitiesHistory = ( {doneActivities}: IProps ) => {
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
		<div className="my-6 mx-3">
			{days.map( ( day, i ) => {
				return (
					<div key={i} className="bg-foreground/10 border-b-2 border-b-violet-400/90 text-foreground p-2 mx-3 my-2 rounded-xl bg-gradient-to-bl from-foreground/10 via-transparent to-transparent">
						<div className="text-foreground/80 px-2">{day.title}</div>
						<ActivitiesInHistoryList activities={day.activities}/>
					</div> );
			} )}
		</div> );
}
;