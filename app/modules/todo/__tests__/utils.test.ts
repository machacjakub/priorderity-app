import { getTimeUnitsSince } from "@/app/modules/todo/utils";

describe( 'utils', () => {
	describe( 'getTimeUnitsSince', () => {
		it( 'should.. ', ( ) => {
			expect( getTimeUnitsSince( 'h' )( new Date() ) ).toEqual( 0 );
			expect( getTimeUnitsSince( 'd' )( new Date( '2022-12-07' ) ) ).toBeGreaterThan( 365 );
			expect( getTimeUnitsSince( 'h' )( new Date( '2023-12-06' ) ) ).toBeGreaterThan( 20 );
		} );
	} );
} );