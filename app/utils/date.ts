import { padNumber } from "@/app/modules/todo/utils";
import { pipe } from "fputils";
import { add, format, setHours, setMinutes, startOfDay, sub } from "date-fns";

export const toReadableDateTime = ( date: Date ) => format( date, 'hh:mm:ss dd.MM.yyyy' );

export const toReadableDate = ( date: Date ) => format( date, 'dd.MM.yyyy' );
export const toReadableDateWithDay = ( date: Date ) => format( date, 'iii dd.MM.yyyy' );
export const incrementDay = ( date: Date ): Date => add( date, { days: 1 } );

export const decrementDay = ( date: Date ): Date => sub( date, { days: 1 } );

export const isSameDay = ( date1: Date, date2: Date ): boolean => date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
export const getDayAtMidnight = ( date: Date ): Date => startOfDay( date );
// export const getDayAt6AM = ( day: Date ): Date => new Date( `${toReadableDate( day )} 6:00` );
export function getDayAt6AM ( date: Date ) {
	const midnight = startOfDay( date );
	return setMinutes( setHours( midnight, 6 ), 0 );
}
export const getDateTimeInput = ( date: Date ) => `${new Date( date ).getFullYear()}-${padNumber( new Date( date ).getMonth() + 1 )}-${padNumber( new Date( date ).getDate() )}T${padNumber( new Date( date ).getHours() )}:${padNumber( new Date( date ).getMinutes() )}`;
export const getDateInput = ( date: Date ) => `${new Date( date ).getFullYear()}-${padNumber( new Date( date ).getMonth() + 1 )}-${padNumber( new Date( date ).getDate() )}`;
export const getDiffInHours = ( date1: Date, date2: Date ) => Math.floor( ( date1.getTime() - date2.getTime() ) / ( 1000 * 60 * 60 ) );

export type IDayReducerAction = 'increment_day' | 'decrement_day';
export const dayReducer = ( state: { day: Date }, action: string ) => {
	if ( action === 'increment_day' ) {
		return { day: pipe( state.day, incrementDay, getDayAt6AM ) };
	}
	if ( action === 'decrement_day' ) {
		if ( isSameDay( decrementDay( state.day ), new Date() ) ) {
			return { day: new Date() };
		}
		return { day: pipe( state.day, decrementDay, getDayAt6AM ) };
	}
	return state;
};