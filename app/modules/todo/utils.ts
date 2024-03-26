import { IDurationConditionDefinition, ITag } from "@/app/modules/profile/types";
import { ITodoActivity } from "@/app/types";

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

export const getActivitiesFilteredByTags = ( activities: ITodoActivity[], tags: ITag[] ) => activities.filter( a => a.tags?.every( tag => tags.filter( t => t.selected ).map( t => t.label ).includes( tag ) ) || !a.tags );