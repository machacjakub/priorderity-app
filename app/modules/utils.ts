export const isSameDay = ( a: Date, b: Date ) => new Date( a ).getDate() === new Date( b ).getDate() && new Date( a ).getMonth() === new Date( b ).getMonth() && new Date( a ).getFullYear() === new Date( b ).getFullYear();

export type WeekDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export const getDayName = ( dayNumber: WeekDayNumber ) => {
	const dayNames = {
		0: 'Monday',
		1: 'Tuesday',
		2: 'Wednesday',
		3: 'Thursday',
		4: 'Friday',
		5: 'Saturday',
		6: 'Sunday',
	};
	return dayNames[dayNumber];
};