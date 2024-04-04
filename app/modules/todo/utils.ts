import { IDurationConditionDefinition, ITag } from "@/app/modules/profile/types";
import { ITodoActivity } from "@/app/types";
import { getDayAtMidnight, toReadableDate } from "@/app/utils/date";

export const padNumber = ( num: number ) => ( `0${num}` ).slice( -2 );

const hourInMilliseconds = 3600000;
const dayInMilliseconds = 86400000;
export const getTimeUnitsSince = ( timeUnit: IDurationConditionDefinition['unit'] ) => ( dateInPast: Date | number | string, today?: Date ) => {
	const milliseconds = timeUnit === 'h' ? hourInMilliseconds : dayInMilliseconds;
	const now = today ? today.getTime() : new Date().getTime();
	return ( now - new Date( dateInPast ).getTime() ) / milliseconds;
};

export const getDay = ( inputDate: Date ) => {
	const day = getDayAtMidnight( inputDate );
	const today = getDayAtMidnight( new Date() );
	if ( day.getTime() === today.getTime() ) {
		return 'Today';
	}
	if ( ( day.getTime() - today.getTime() ) / ( 1000 * 60 * 60 ) === 24 ) {
		return 'Tomorrow';
	}
	return toReadableDate( day );
};

export const getHoursSince = getTimeUnitsSince( 'h' );
export const getHours = ( timeUnit: IDurationConditionDefinition['unit'] ) => ( duration: number ) => timeUnit === 'd' ? duration*24 : duration;

export const calculatedPrioritySorter = ( a: ITodoActivity, b: ITodoActivity ) => a.calculatedPriority > b.calculatedPriority ? -1 : ( a.calculatedPriority < b.calculatedPriority ? 1 : ( a.created_at > b.created_at ? -1 : 1 ) );

export const getActivitiesFilteredByTags = ( activities: ITodoActivity[], tags: ITag[] ) => activities.filter( a => a.tags?.every( tag => tags.filter( t => t.selected ).map( t => t.label ).includes( tag ) ) || !a.tags );