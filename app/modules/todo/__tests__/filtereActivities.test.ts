import { IRecommendation } from "../../profile/types";
import { pipe } from "fputils";
import { decrementDay, getDayAt6AM, incrementDay } from "../../../utils/date";
import { ITodoActivity } from "../../../types";
import { filterDelayedActivities } from "../todoModule";

describe( 'filterDelayedActivities', () => {
	const recommendations: IRecommendation[] = [
		{ activityType: 'activity1', activityLabel: 'activity 1', rules: { logicalOperator: 'and', conditions: [] } },
		{ activityType: 'delayed1', activityLabel: 'delayed 1', rules: { logicalOperator: 'and', conditions: [] }, delayed_to: pipe( new Date(), incrementDay, getDayAt6AM ) },
		{ activityType: 'delayedToToday1', activityLabel: 'delayedToToday 1', rules: { logicalOperator: 'and', conditions: [] }, delayed_to: pipe( new Date(), getDayAt6AM ) }
	];
	it( 'should return true for not delayed recommended activity', () => {
		const activity: ITodoActivity = { name: 'activity 1', id: 1, isRecommended: true, calculatedPriority: 8, priority: 8, created_at: pipe( new Date(), decrementDay ), delayed_to: null, deadline: null };
		expect( filterDelayedActivities( recommendations, new Date() )( activity ) ).toEqual( true );
	} );
	it( 'should return false for delayed recommended activity - tomorrow', () => {
		const activity: ITodoActivity = { name: 'delayed 1', id: 1, isRecommended: true, calculatedPriority: 8, priority: 8, created_at: pipe( new Date(), decrementDay ), delayed_to: null, deadline: null };
		expect( filterDelayedActivities( recommendations, new Date() )( activity ) ).toEqual( false );
	} );
	it( 'should return true for delayed recommended activity - today', () => {
		const activity: ITodoActivity = { name: 'delayedToToday 1', id: 1, isRecommended: true, calculatedPriority: 8, priority: 8, created_at: pipe( new Date(), decrementDay ), delayed_to: null, deadline: null };
		expect( filterDelayedActivities( recommendations, new Date() )( activity ) ).toEqual( true );
	} );
	it( 'should return true for not delayed planned activity', () => {
		const activity: ITodoActivity = { name: 'planned 1', id: 1, isRecommended: false, calculatedPriority: 8, priority: 8, created_at: pipe( new Date(), decrementDay ), delayed_to: null, deadline: null };
		expect( filterDelayedActivities( recommendations, new Date() )( activity ) ).toEqual( true );
	} );
	it( 'should return true for delayed planned activity - today', () => {
		const activity: ITodoActivity = { name: 'planned Today', id: 1, isRecommended: false, calculatedPriority: 8, priority: 8, created_at: pipe( new Date(), decrementDay ), delayed_to: pipe( new Date(), getDayAt6AM ), deadline: null };
		expect( filterDelayedActivities( recommendations, new Date() )( activity ) ).toEqual( true );
	} );
	it( 'should return false for delayed planned activity - tomorrow', () => {
		const activity: ITodoActivity = { name: 'planned 1', id: 1, isRecommended: false, calculatedPriority: 8, priority: 8, created_at: pipe( new Date(), decrementDay ), delayed_to: pipe( new Date(), incrementDay, getDayAt6AM ), deadline: null };
		expect( filterDelayedActivities( recommendations, new Date() )( activity ) ).toEqual( false );
	} );
} );