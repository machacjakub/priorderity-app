import { IDurationConditionDefinition } from "@/app/modules/profile/types";
import { ITodoActivity } from "@/app/types";
import { toReadableDate } from "@/app/utils/date";

export const padNumber = ( num: number ) => num < 10 ? `0${num}` : num;

const hourInMilliseconds = 3600000;
const dayInMilliseconds = 86400000;
export const getTimeUnitsSince = ( timeUnit: IDurationConditionDefinition['unit'] ) => ( dateInPast: Date | number | string ) => {
	const milliseconds = timeUnit === 'h' ? hourInMilliseconds : dayInMilliseconds;
	const now = new Date().getTime();
	return ( now - new Date( dateInPast ).getTime() ) / milliseconds;
};

export const getHoursSince = getTimeUnitsSince( 'h' );
export const getHours = ( timeUnit: IDurationConditionDefinition['unit'] ) => ( duration: number ) => timeUnit === 'd' ? duration*24 : duration;

export const calculatedPrioritySorter = ( a: ITodoActivity, b: ITodoActivity ) => a.calculatedPriority > b.calculatedPriority ? -1 : ( a.calculatedPriority < b.calculatedPriority ? 1 : ( a.created_at > b.created_at ? -1 : 1 ) );

export const getDayAtMidnight = ( date: Date ): Date => {
	const day = ( `0${ date.getDate()}` ).slice( -2 );
	const month = ( `0${ date.getMonth() + 1}` ).slice( -2 );
	const year = date.getFullYear();

	return new Date( `${year}/${month}/${day}` );
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