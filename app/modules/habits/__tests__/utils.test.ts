import { countConsecutiveDatesFromToday } from "@/app/modules/habits/utils";

const arr5 = [ new Date( '2024/03/19 12:04' ), new Date( '2024/03/18 16:04' ), new Date( '2024/03/17 16:04' ), new Date( '2024/03/16 16:04' ), new Date( '2024/03/15 16:04' ) ];
const arr0 = [ new Date( '2024/03/18 16:55' ), new Date( '2024/03/17 16:04' ), new Date( '2024/03/16 16:04' ), new Date( '2024/03/15 16:04' ) ];
const arr2 = [ new Date( '2024/03/19 16:04' ), new Date( '2024/03/18 21:04' ), new Date( '2024/03/15 16:04' ), new Date( '2024/03/14 16:04' ), new Date( '2024/03/13 16:04' ) ];
const arr3 = [ new Date( '2024/03/19 17:12' ), new Date( '2024/03/18 15:09' ), new Date( '2024/03/17 20:04' ), new Date( '2024/03/15 16:04' ), new Date( '2024/03/13 16:04' ) ];
const arr1 = [ new Date( '2024/03/19 11:04' ) ];
const whenTimeChangesSpring4 = [ new Date( '2024/04/01 15:09' ), new Date( '2024/03/31 10:44' ), new Date( '2024/03/30 20:04' ), new Date( '2024/03/29 16:20' ), new Date( '2024/03/27 16:04' ) ];
const whenTimeChangesFall3 = [ new Date( '2024/10/28 15:09' ), new Date( '2024/10/27 10:44' ), new Date( '2024/10/26 20:04' ), new Date( '2024/10/24 16:20' ), new Date( '2024/10/23 16:04' ) ];

describe( 'countConsecutiveDatesFromToday', () => {
	describe( 'normal scenarions', () => {
		beforeAll( () => {
			jest.useFakeTimers( 'modern' );
			jest.setSystemTime( new Date( '2024/03/19' ) );
		} );
		it( 'streak counter 0', () => {
			expect( countConsecutiveDatesFromToday( [] ) ).toEqual( 0 );
		} );

		it( 'arr5', () => {
			expect( countConsecutiveDatesFromToday( arr5 ) ).toEqual( 5 );
		} );

		it( 'arr0', () => {
			expect( countConsecutiveDatesFromToday( arr0 ) ).toEqual( 0 );
		} );

		it( 'arr1', () => {
			expect( countConsecutiveDatesFromToday( arr1 ) ).toEqual( 1 );
		} );

		it( 'arr2', () => {
			expect( countConsecutiveDatesFromToday( arr2 ) ).toEqual( 2 );
		} );

		it( 'arr3', () => {
			expect( countConsecutiveDatesFromToday( arr3 ) ).toEqual( 3 );
		} );
	} );
	describe( 'time change scenarios spring', () => {
		beforeAll( () => {
			jest.useFakeTimers( 'modern' );
			jest.setSystemTime( new Date( '2024/04/01' ) );
		} );
		it( 'time change', () => {
			expect( countConsecutiveDatesFromToday( whenTimeChangesSpring4 ) ).toEqual( 4 );
		} );
	} );
	describe( 'time change scenarios autumn', () => {
		beforeAll( () => {
			jest.useFakeTimers( 'modern' );
			jest.setSystemTime( new Date( '2024/10/28' ) );
		} );
		it( 'time change', () => {
			expect( countConsecutiveDatesFromToday( whenTimeChangesFall3 ) ).toEqual( 3 );
		} );
	} );
} );