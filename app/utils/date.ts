export const toReadableDate = ( date: Date ) => {
	// Get date components
	const hours = ( `0${ date.getHours()}` ).slice( -2 );
	const minutes = ( `0${ date.getMinutes()}` ).slice( -2 );
	const seconds = ( `0${ date.getSeconds()}` ).slice( -2 );
	const day = ( `0${ date.getDate()}` ).slice( -2 );
	const month = ( `0${ date.getMonth() + 1}` ).slice( -2 );
	const year = date.getFullYear();

	// Construct the readable date format
	return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
};
