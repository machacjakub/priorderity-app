import { padNumber } from "@/app/modules/todo/utils";

export const toReadableDateTime = ( date: Date ) => {
	const hours = ( `0${ date.getHours()}` ).slice( -2 );
	const minutes = ( `0${ date.getMinutes()}` ).slice( -2 );
	const seconds = ( `0${ date.getSeconds()}` ).slice( -2 );
	const day = ( `0${ date.getDate()}` ).slice( -2 );
	const month = ( `0${ date.getMonth() + 1}` ).slice( -2 );
	const year = date.getFullYear();

	return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
};

export const toReadableDate = ( date: Date ) => {
	const day = ( `0${ date.getDate()}` ).slice( -2 );
	const month = ( `0${ date.getMonth() + 1}` ).slice( -2 );
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
};

export const getDayAtMidnight = ( date: Date ): Date => {
	const day = ( `0${ date.getDate()}` ).slice( -2 );
	const month = ( `0${ date.getMonth() + 1}` ).slice( -2 );
	const year = date.getFullYear();

	return new Date( `${year}/${month}/${day}` );
};

export const getDateTimeInput = ( date: Date ) => `${new Date( date ).getFullYear()}-${padNumber( new Date( date ).getMonth() + 1 )}-${padNumber( new Date( date ).getDate() )}T${padNumber( new Date( date ).getHours() )}:${padNumber( new Date( date ).getMinutes() )}`;
export const getDateInput = ( date: Date ) => `${new Date( date ).getFullYear()}-${padNumber( new Date( date ).getMonth() + 1 )}-${padNumber( new Date( date ).getDate() )}`;