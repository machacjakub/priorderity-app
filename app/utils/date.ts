import { padNumber } from "@/app/modules/todo/utils";
import { pipe } from "fputils";

export const toReadableDateTime = ( date: Date ) => {
	const hours = ( `0${ date.getHours()}` ).slice( -2 );
	const minutes = ( `0${ date.getMinutes()}` ).slice( -2 );
	const seconds = ( `0${ date.getSeconds()}` ).slice( -2 );
	const day = padNumber( date.getDate() );
	const month = padNumber( date.getMonth() + 1 );
	const year = date.getFullYear();

	return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
};

export const toReadableDate = ( date: Date ) => {
	const day = padNumber( date.getDate() );
	const month = padNumber( date.getMonth() + 1 );
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
};

export const toStringDate = ( date: Date ) => {
	const day = padNumber( date.getDate() );
	const month = padNumber( date.getMonth() + 1 );
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
};
export const incrementDay = ( date: Date ): Date => {
	const nextDay = new Date( date );
	nextDay.setDate( nextDay.getDate() + 1 );
	return nextDay;
};

export const decrementDay = ( date: Date ): Date => {
	const nextDay = new Date( date );
	nextDay.setDate( nextDay.getDate() - 1 );
	return nextDay;
};

export const isSameDay = ( date1: Date, date2: Date ): boolean => date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
export const getDayAtMidnight = ( date: Date ): Date => new Date( `${toStringDate( date )} 0:00` );
export const getDayAt6AM = ( day: Date ): Date => new Date( `${toStringDate( day )} 6:00` );
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