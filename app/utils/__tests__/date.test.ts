import { decrementDay, getDayAt6AM, getDayAtMidnight, getDiffInHours, incrementDay } from "../date";

describe( 'getDayAt6AM', () => {
	it( 'should return a Date object representing 6:00 AM on the given day', () => {
		const day = new Date( '2024-04-02T00:00:00' ); // April 2, 2024
		const expectedDate = new Date( '2024-04-02T06:00:00' ); // April 2, 2024 at 6:00 AM
		const result = getDayAt6AM( day );
		expect( result ).toEqual( expectedDate );
	} );

	it( 'should return a Date object representing 6:00 AM on the given day when time is not exactly at midnight', () => {
		const day = new Date( '2024-04-02T08:30:00' ); // April 2, 2024 at 8:30 AM
		const expectedDate = new Date( '2024-04-02T06:00:00' ); // April 2, 2024 at 6:00 AM
		const result = getDayAt6AM( day );
		expect( result ).toEqual( expectedDate );
	} );

	it( 'should return a Date object representing 6:00 AM on the given day when time is after 6:00 AM', () => {
		const day = new Date( '2024-04-02T12:30:00' ); // April 2, 2024 at 12:30 PM
		const expectedDate = new Date( '2024-04-02T06:00:00' ); // April 2, 2024 at 6:00 AM
		const result = getDayAt6AM( day );
		expect( result ).toEqual( expectedDate );
	} );

	it( 'should return a Date object representing 6:00 AM on the given day for dates spanning daylight saving time changes', () => {
		// Daylight Saving Time starts on March 10, 2024, at 2:00 AM
		const day = new Date( '2024-03-10T00:00:00' ); // March 10, 2024
		const expectedDate = new Date( '2024-03-10T06:00:00' ); // March 10, 2024 at 6:00 AM
		const result = getDayAt6AM( day );
		expect( result ).toEqual( expectedDate );
	} );

	it( 'should return a Date object representing 6:00 AM on the given day for dates spanning leap years', () => {
		const day = new Date( '2024-02-29T00:00:00' ); // February 29, 2024
		const expectedDate = new Date( '2024-02-29T06:00:00' ); // February 29, 2024 at 6:00 AM
		const result = getDayAt6AM( day );
		expect( result ).toEqual( expectedDate );
	} );
} );


describe( 'getDayAtMidnight', () => {
	it( 'should return a Date object representing the same day at midnight', () => {
		// Arrange
		const date = new Date( '2022-04-02T15:30:00' ); // Example date

		// Act
		const result = getDayAtMidnight( date );

		// Assert
		expect( result ).toBeInstanceOf( Date );
		expect( result.getFullYear() ).toEqual( 2022 );
		expect( result.getMonth() ).toEqual( 3 ); // Months are zero-based, so April is 3
		expect( result.getDate() ).toEqual( 2 );
		expect( result.getHours() ).toEqual( 0 ); // Midnight
		expect( result.getMinutes() ).toEqual( 0 );
		expect( result.getSeconds() ).toEqual( 0 );
		expect( result.getMilliseconds() ).toEqual( 0 );
	} );
} );

describe( 'incrementDay', () => {
	it( 'should return the next day for a given date', () => {
		// Arrange
		const date = new Date( '2022-04-02T00:00:00' );

		// Act
		const result = incrementDay( date );

		// Assert
		expect( result ).toBeInstanceOf( Date );
		expect( result.getFullYear() ).toEqual( 2022 );
		expect( result.getMonth() ).toEqual( 3 ); // April (zero-based index)
		expect( result.getDate() ).toEqual( 3 );
		expect( result.getHours() ).toEqual( 0 );
		expect( result.getMinutes() ).toEqual( 0 );
		expect( result.getSeconds() ).toEqual( 0 );
		expect( result.getMilliseconds() ).toEqual( 0 );
	} );

	it( 'should handle leap years correctly', () => {
		// Arrange
		const date = new Date( '2024-02-28T00:00:00' ); // Leap year

		// Act
		const result = incrementDay( date );

		// Assert
		expect( result.getFullYear() ).toEqual( 2024 );
		expect( result.getMonth() ).toEqual( 1 ); // February (zero-based index)
		expect( result.getDate() ).toEqual( 29 ); // Next day should be leap day
		expect( result.getHours() ).toEqual( 0 );
		expect( result.getMinutes() ).toEqual( 0 );
		expect( result.getSeconds() ).toEqual( 0 );
		expect( result.getMilliseconds() ).toEqual( 0 );
	} );

	it( 'should handle daylight saving time changes correctly', () => {
		// Arrange
		const date = new Date( '2022-10-30T00:00:00' ); // Before daylight saving time ends

		// Act
		const result = incrementDay( date );

		// Assert
		expect( result.getFullYear() ).toEqual( 2022 );
		expect( result.getMonth() ).toEqual( 9 ); // October (zero-based index)
		expect( result.getDate() ).toEqual( 31 ); // Next day should be the next day after DST ends
		expect( result.getHours() ).toEqual( 0 );
		expect( result.getMinutes() ).toEqual( 0 );
		expect( result.getSeconds() ).toEqual( 0 );
		expect( result.getMilliseconds() ).toEqual( 0 );
	} );

	// Add more test cases as needed
} );

describe( 'decrementDay', () => {
	it( 'should return the previous day for a given date', () => {
		const date = new Date( '2022-04-02T00:00:00' );
		const result = decrementDay( date );
		expect( result ).toBeInstanceOf( Date );
		expect( result.getFullYear() ).toEqual( 2022 );
		expect( result.getMonth() ).toEqual( 3 );
		expect( result.getDate() ).toEqual( 1 );
		expect( result.getHours() ).toEqual( 0 );
		expect( result.getMinutes() ).toEqual( 0 );
		expect( result.getSeconds() ).toEqual( 0 );
		expect( result.getMilliseconds() ).toEqual( 0 );
	} );

	it( 'should handle leap years correctly', () => {
		const date = new Date( '2024-03-01T00:00:00' ); // Leap year
		const result = decrementDay( date );
		expect( result.getFullYear() ).toEqual( 2024 );
		expect( result.getMonth() ).toEqual( 1 );
		expect( result.getDate() ).toEqual( 29 );
		expect( result.getHours() ).toEqual( 0 );
		expect( result.getMinutes() ).toEqual( 0 );
		expect( result.getSeconds() ).toEqual( 0 );
		expect( result.getMilliseconds() ).toEqual( 0 );
	} );

	it( 'should handle daylight saving time changes correctly', () => {
		const date = new Date( '2022-11-01T00:00:00' ); // After DST ends
		const result = decrementDay( date );
		expect( result.getFullYear() ).toEqual( 2022 );
		expect( result.getMonth() ).toEqual( 9 );
		expect( result.getDate() ).toEqual( 31 );
		expect( result.getHours() ).toEqual( 0 );
		expect( result.getMinutes() ).toEqual( 0 );
		expect( result.getSeconds() ).toEqual( 0 );
		expect( result.getMilliseconds() ).toEqual( 0 );
	} );
} );

describe( 'getDiffInHours', () => {
	// Test case 1: Testing with date1 > date2
	it( 'should return the correct difference in hours when date1 > date2', () => {
		const date1 = new Date( '2024-04-01T12:00:00' );
		const date2 = new Date( '2024-04-01T06:00:00' );
		const diff = getDiffInHours( date1, date2 );
		expect( diff ).toBe( 6 ); // Expecting a difference of 6 hours
	} );

	// Test case 2: Testing with date1 < date2
	it( 'should return the correct difference in hours when date1 < date2', () => {
		const date1 = new Date( '2024-04-01T06:00:00' );
		const date2 = new Date( '2024-04-01T12:00:00' );
		const diff = getDiffInHours( date1, date2 );
		expect( diff ).toBe( -6 ); // Expecting a difference of -6 hours
	} );

	// Test case 3: Testing with date1 = date2
	it( 'should return 0 when date1 equals date2', () => {
		const date1 = new Date( '2024-04-01T12:00:00' );
		const date2 = new Date( '2024-04-01T12:00:00' );
		const diff = getDiffInHours( date1, date2 );
		expect( diff ).toBe( 0 ); // Expecting a difference of 0 hours
	} );
} );


