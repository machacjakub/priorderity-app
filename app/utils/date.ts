import { padNumber } from "@/app/modules/todo/utils";

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