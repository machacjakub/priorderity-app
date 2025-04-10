import { IHabit } from "@/app/modules/profile/types";
import { IDoneActivity } from "@/app/types";
import { getDayAtMidnight, toReadableDate } from "@/app/utils/date";
import { differenceInCalendarDays, isToday } from "date-fns";

interface IEventType {
	date: Date;
	label: string;
}

export interface IStreaks {
	clearStreak: number;
	totalStreak: number;
	clearWithToday: number;
}

const isZeroStreak = ( arrayOfDays: IEventType[], today: Date ) => !arrayOfDays.map( day => day.date ).map( toReadableDate ).includes( toReadableDate( today ) ) || arrayOfDays.length === 0 ;

const TWO_DAYS_IN_SECONDS = 180000000;

export const getStreak = ( habit: IHabit, doneActivities: IDoneActivity[] ): IStreaks => {
	const filtered = doneActivities.filter( a => habit.activityTypes.includes( a.type ) || a.label === 'Vacation' || a.label === 'Illness' );
	const arrayOfEvents: IEventType[] = filtered.map( a => ( { date: new Date( a.created_at ), label: a.label } ) ).sort( ( a, b ) => b.date.getTime() - a.date.getTime() );
	const arrayOfMidnightEvents: IEventType[] = arrayOfEvents.map( event => ( { date: getDayAtMidnight( event.date ), label: event.label } ) );
	const daysWithEvents: {day: Date; events: string[]}[] = [];
	for ( const day of arrayOfMidnightEvents ) {
		if ( daysWithEvents.length >= 2 && daysWithEvents[daysWithEvents.length - 2].day.getTime() - daysWithEvents[daysWithEvents.length - 1].day.getTime() > TWO_DAYS_IN_SECONDS ) {
			daysWithEvents.pop();
			break;
		}
		const indexOfDay = daysWithEvents.findIndex( ( d ) => toReadableDate( d.day ) === toReadableDate( day.date ) );
		if ( indexOfDay === -1 ) {
			daysWithEvents.push( { day: day.date, events: [ day.label ] } );
			continue;
		}
		daysWithEvents[indexOfDay].events.push( day.label );
	}
	for ( let i = daysWithEvents.length - 1; i >= 0; i-- ) {
		if ( daysWithEvents[i].events.every( event => event === 'Vacation' || event === 'Illness' ) ) {
			daysWithEvents.pop();
			continue;
		}
		break;
	}
	if ( daysWithEvents.length === 0 ) {
		return { clearStreak: 0, totalStreak:0 , clearWithToday:0 };
	}

	const includesToday = isToday( daysWithEvents[0].day );
	const streak = daysWithEvents.filter( day => !day.events.every( event => event === 'Illness' || event === 'Vacation' ) ).length;
	return {
		clearStreak: includesToday ? streak : 0,
		totalStreak: differenceInCalendarDays( daysWithEvents[0].day, daysWithEvents[daysWithEvents.length - 1].day ),
		clearWithToday: includesToday ? streak : streak + 1
	};
};

export const countConsecutiveDatesFromToday = ( eventsArray: IEventType[] ) => {
	const today = getDayAtMidnight( new Date() );
	const arrayOfDays = eventsArray.map( event => ( { date: getDayAtMidnight( event.date ), label: event.label } ) );
	if ( isZeroStreak( arrayOfDays, today ) ) {
		return 0;
	}

	let consecutiveCount = 0;
	for ( let i = 1; i < eventsArray.length; i++ ) {
		const prevDate = arrayOfDays[i - 1];
		const diffInHours = Math.floor( ( prevDate.date.getTime() - arrayOfDays[i].date.getTime() ) / ( 1000 * 60 * 60 ) );
		if ( diffInHours === 0 || eventsArray[i].label === 'Vacation' || eventsArray[i].label === 'Illness' ) {
			continue;
		}
		if ( diffInHours < 23 || diffInHours > 25 ) {
			break;
		}
		consecutiveCount++;
	}

	return consecutiveCount;
};