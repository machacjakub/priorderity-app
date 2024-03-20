import { getTimeUnitsSince } from "@/app/modules/todo/utils";

describe( 'utils', () => {
	describe( 'getTimeUnitsSince', () => {
		beforeAll( () => {
			jest.useFakeTimers( 'modern' );
			jest.setSystemTime( new Date( '2024/03/11' ) );
		} );
		it( 'should correctly return time units since event', ( ) => {
			expect( getTimeUnitsSince( 'h' )( new Date( '2024/03/11' ) ) ).toEqual( 0 );
			// expect( getTimeUnitsSince( 'h' )( new Date( '2024/04/02' ) ) ).toEqual( -527 );
			expect( getTimeUnitsSince( 'd' )( new Date( '2023/03/12' ) ) ).toEqual( 365 );
			expect( getTimeUnitsSince( 'h' )( new Date( '2024/03/09' ) ) ).toEqual( 48 );
		} );
	} );
} );