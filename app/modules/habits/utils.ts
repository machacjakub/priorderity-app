import { IHabit } from "@/app/modules/profile/types";
import { IDoneActivity } from "@/app/types";
import { getDayAtMidnight, toReadableDate } from "@/app/utils/date";

export const getStreak = ( habit: IHabit, doneActivities: IDoneActivity[], withToday?: boolean ) => {
	const filtered = doneActivities.filter( a => habit.activityTypes.includes( a.type ) );
	const arrayOfDates = filtered.map( a => new Date( a.created_at ) ).sort( ( a, b ) => b.getTime() - a.getTime() );
	if ( withToday ) {
		return countConsecutiveDatesFromToday( [ new Date() ,...arrayOfDates ] );
	}
	return countConsecutiveDatesFromToday( arrayOfDates );
};

export const countConsecutiveDatesFromToday = ( dateArray: Date[] ) => {
	const today = getDayAtMidnight( new Date() );
	const arrayOfDays = dateArray.map( getDayAtMidnight );
	if ( !arrayOfDays.map( toReadableDate ).includes( toReadableDate( today ) ) || arrayOfDays.length === 0 ) {
		return 0;
	}

	let consecutiveCount = 1;
	for ( let i = 1; i < dateArray.length; i++ ) {
		const prevDate = arrayOfDays[i - 1];
		const diffInHours = Math.floor( ( prevDate.getTime() - arrayOfDays[i].getTime() ) / ( 1000 * 60 * 60 ) );
		if ( diffInHours === 0 ) {
			continue;
		}
		if ( diffInHours < 23 || diffInHours > 25 ) {
			break;
		}
		consecutiveCount++;
	}

	return consecutiveCount;
};