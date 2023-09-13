export const isSameDay = ( a: Date, b: Date ) => new Date( a ).getDate() === new Date( b ).getDate() && new Date( a ).getMonth() === new Date( b ).getMonth() && new Date( a ).getFullYear() === new Date( b ).getFullYear();

export type WeekDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const getDayName = ( dayNumber: WeekDayNumber ) => {
	const dayNames = {
		1: 'Monday',
		2: 'Tuesday',
		3: 'Wednesday',
		4: 'Thursday',
		5: 'Friday',
		6: 'Saturday',
		0: 'Sunday',
	};
	return dayNames[dayNumber];
};

export const getNewItemsFromPayload = ( items: { id: number }[], payload: { new: any, old: { id: number } } ): any[] => {
	if ( JSON.stringify( payload.new ) === '{}' ) {
		return [...items.filter( ( item: any ) => payload.old.id !== item.id )];
	}
	return [...items, payload.new];
};