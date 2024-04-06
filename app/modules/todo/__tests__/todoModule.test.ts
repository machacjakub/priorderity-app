import { IDoneActivity, IHealthStat } from "@/app/types";
import { IConditionToCompute, IDurationConditionDefinition, isDurationConditionToCompute, isMetricConditionToCompute } from "@/app/modules/profile/types";
import { getConditionToCompute, getRecommendedActivities, isActivityToRecommendByRules, isConditionTrue } from "@/app/modules/todo/todoModule";
import { IRecommendation } from "../../profile/types";
import { ITodoActivity } from "../../../types";
import { decrementDay, getDayAt6AM, incrementDay } from "../../../utils/date";
import { pipe } from "fputils";
import { filterDelayedActivities } from "../todoModule";

const mockHealthStats: IHealthStat[] = [ { name: 'mental_health', label: 'Mental health', score: 60 }, { name: 'physical_health', label: 'Physical health', score: 40 }, ];
const mockDoneActivities: IDoneActivity[] = [ { id: 0, type: 'walk', label: 'Walk', created_at: new Date( '2024/02/10' ) }, { id: 1, type: 'meditation', label: 'Meditation', created_at: new Date() } ];
const durationConditionMockWalk: IDurationConditionDefinition = { id: 0, comparisonOperator: '>', unit: 'h', activityType: 'walk', userDuration: 60 };
describe( 'Todo module tests', () => {
	beforeAll( () => {
		jest.useFakeTimers( 'modern' );
		jest.setSystemTime( new Date( '2024/03/11' ) );
	} );

	describe( 'isConditionTrue', () => {
		it( 'should return false when falsy metric condition provided', () => {
			expect( isConditionTrue( { comparisonOperator: "<", metricScore: 61, value: 60 } ) ).toEqual( false );
			expect( isConditionTrue( { comparisonOperator: "<", metricScore: 60, value: 60 } ) ).toEqual( false );
			expect( isConditionTrue( { comparisonOperator: ">", metricScore: 50, value: 60 } ) ).toEqual( false );
			expect( isConditionTrue( { comparisonOperator: ">", metricScore: 50, value: 50 } ) ).toEqual( false );
		} );
		it( 'should return false when falsy duration condition provided', () => {
			expect( isConditionTrue( { comparisonOperator: ">", hoursSinceLast: 20, userHours: 60 } ) ).toEqual( false );
			expect( isConditionTrue( { comparisonOperator: ">", hoursSinceLast: 60, userHours: 60 } ) ).toEqual( false );
			expect( isConditionTrue( { comparisonOperator: "<", hoursSinceLast: 40, userHours: 30 } ) ).toEqual( false );
		} );
		it( 'should return true when truthy condition provided', () => {
			expect( isConditionTrue( { comparisonOperator: "<", metricScore: 40, value: 60 } ) ).toEqual( true );
			expect( isConditionTrue( { comparisonOperator: ">", metricScore: 21, value: 20 } ) ).toEqual( true );
		} );
		it( 'should return true when truthy duration condition provided', () => {
			expect( isConditionTrue( { comparisonOperator: ">", hoursSinceLast: 80, userHours: 60 } ) ).toEqual( true );
			expect( isConditionTrue( { comparisonOperator: "<", hoursSinceLast: 40, userHours: 41 } ) ).toEqual( true );
		} );
	} );

	describe( 'getConditionToCompute', () => {
		it( 'should return transformed condition of type duration', () => {
			const result: IConditionToCompute = getConditionToCompute( mockHealthStats, mockDoneActivities )( { id: 0, comparisonOperator: '<', unit: 'h', activityType: 'walk', userDuration: 60 } );
			if ( !isDurationConditionToCompute( result ) ) {
				throw new Error( 'This should be of type IDurationConditionToCompute' );
			}
			expect( result ).toMatchObject( { comparisonOperator: '<', userHours: 60 } );
			expect( result.hoursSinceLast ).toBeGreaterThan( 1100 );
		} );

		it( 'should return transformed condition of type metric', () => {
			const result: IConditionToCompute = getConditionToCompute( mockHealthStats, mockDoneActivities )( { id: 0, comparisonOperator: '<', metric: 'mental_health', value: 80 } );
			if ( !isMetricConditionToCompute( result ) ) {
				throw new Error( 'This should be of type IDurationConditionToCompute' );
			}
			expect( result ).toEqual( { comparisonOperator: '<', metricScore: 60, value: 80 } );
		} );

	} );

	describe( 'isActivityToRecommendByRules', () => {
		it( 'should return false for not recommended activities with duration condition', () => {
			expect( isActivityToRecommendByRules( mockHealthStats, mockDoneActivities )( { activityType: 'walk', activityLabel: 'Walk', rules: { logicalOperator: 'and', conditions: [ { id: 0, comparisonOperator: '>', unit: 'h', activityType: 'Walk', userDuration: 3000 } ] } } ) ).toEqual( false );
		} );
		it( 'should return false for not recommended activities with metric condition', () => {
			expect( isActivityToRecommendByRules( mockHealthStats, mockDoneActivities )( { activityType: 'walk', activityLabel: 'Walk', rules: { logicalOperator: 'and', conditions: [ { id: 0, comparisonOperator: '<', metric: 'physical_health', value: 30 } ] } } ) ).toEqual( false );
		} );
		it( 'should return false for not recommended activities with multiple condition', () => {
			expect( isActivityToRecommendByRules( mockHealthStats, mockDoneActivities )( { activityType: '30min_exercise', activityLabel: '30min exercise', rules: { logicalOperator: 'and', conditions: [ { id: 0, comparisonOperator: '<', metric: 'physical_health', value: 50 }, { id: 1, comparisonOperator: '<', metric: 'mental_health', value: 10 } ] } } ) ).toEqual( false );
			expect( isActivityToRecommendByRules( mockHealthStats, mockDoneActivities )( { activityType: '30min_exercise', activityLabel: '30min exercise', rules: { logicalOperator: 'and', conditions: [ { id: 0, comparisonOperator: '<', metric: 'physical_health', value: 50 }, { id: 1, comparisonOperator: '>', unit: 'h', activityType: 'Walk', userDuration: 3000 } ] } } ) ).toEqual( false );
			expect( isActivityToRecommendByRules( mockHealthStats, mockDoneActivities )( { activityType: '30min_exercise', activityLabel: '30min exercise', rules: { logicalOperator: 'and', conditions: [ { id: 0, comparisonOperator: '<', metric: 'physical_health', value: 30 }, { id: 1, comparisonOperator: '>', unit: 'h', activityType: 'Walk', userDuration: 3 } ] } } ) ).toEqual( false );
		} );


		it( 'should return true for recommended activities with duration condition', () => {
			expect( isActivityToRecommendByRules( mockHealthStats, mockDoneActivities )( { activityType: 'walk', activityLabel: 'Walk', rules: { logicalOperator: 'and', conditions: [ durationConditionMockWalk ] } } ) ).toEqual( true );
		} );
		it( 'should return true recommended activities with metric condition', () => {
			expect( isActivityToRecommendByRules( mockHealthStats, mockDoneActivities )( { activityType: 'walk', activityLabel: 'Walk', rules: { logicalOperator: 'and', conditions: [ { id: 0, comparisonOperator: '<', metric: 'physical_health', value: 50 } ] } } ) ).toEqual( true );
		} );
		it( 'should return true recommended activities with multiple conditions', () => {
			expect( isActivityToRecommendByRules( mockHealthStats, mockDoneActivities )( { activityType: '30-ex', activityLabel: '30min exercise', rules: { logicalOperator: 'and', conditions: [ { id: 0, comparisonOperator: '<', metric: 'physical_health', value: 50 }, { id: 1, comparisonOperator: '<', metric: 'mental_health', value: 80 } ] } } ) ).toEqual( true );
			expect( isActivityToRecommendByRules( mockHealthStats, mockDoneActivities )( { activityType: '30-ex', activityLabel: '30min exercise', rules: { logicalOperator: 'and', conditions: [ durationConditionMockWalk, { id: 0, comparisonOperator: '<', metric: 'mental_health', value: 80 } ] } } ) ).toEqual( true );
		} );
	} );

	describe( 'getRecommendedActivities', () => {
		it( 'should return empty array', () => {
			expect( getRecommendedActivities( { healthStats: mockHealthStats, doneActivities: mockDoneActivities, recommendations: [
				{
					activityType:  "30min_exercise",
					activityLabel: '30min exercise',
					rules: {
						logicalOperator: "or",
						conditions: [ { id: 0, comparisonOperator: "<", metric: 'physical_health', value: 60 }, { id: 1, comparisonOperator: "<", metric: 'mental_health', value: 40 } ],
					}
					,
					tags: [],
				},
				{
					activityType: "15min_meditation",
					activityLabel: '15min meditation',
					rules: {
						logicalOperator: "and",
						conditions: [ { id: 0, comparisonOperator: "<", metric: 'mental_health', value: 50 } ],
					}
					,
					tags: [],
				},
				{
					activityType: "meditation",
					activityLabel: 'Meditation',
					rules: {
						logicalOperator: "and",
						conditions: [ { id: 0, comparisonOperator: ">", userDuration: 100, activityType: 'Meditation', unit: 'h' } ],
					}
					,
					tags: [],
				}
			] } ) ).toEqual( [] );
		} );
		it( 'should array of recommended activities', () => {
			expect( getRecommendedActivities( { healthStats: mockHealthStats, doneActivities: mockDoneActivities, recommendations: [
				{
					activityType:  "30min_exercise",
					activityLabel: '30min exercise',
					rules: {
						logicalOperator: "and",
						conditions: [ { id: 0, comparisonOperator: "<", metric: 'physical_health', value: 61 }, { id: 1, comparisonOperator: "<", metric: 'mental_health', value: 61 } ],
					}
				},
				{
					activityType: "15min_meditation",
					activityLabel: '15min meditation',
					rules: {
						logicalOperator: "and",
						conditions: [ { id: 0, comparisonOperator: "<", metric: 'mental_health', value: 88 } ],
					}
				},
				{
					activityType: "walk",
					activityLabel: 'Walk',
					rules: {
						logicalOperator: "and",
						conditions: [ { id: 0, comparisonOperator: ">", userDuration: 10, activityType: 'Walk', unit: 'h' } ],
					}
				}
			] } ) ).toMatchObject( [
				{
					"deadline": null,
					"id": 0,
					"isRecommended": true,
					"name": "30min exercise",
					"priority": 9
				},
				{
					"deadline": null,
					"id": 1,
					"isRecommended": true,
					"name": "15min meditation",
					"priority": 9
				},
				{
					"deadline": null,
					"id": 2,
					"isRecommended": true,
					"name": "Walk",
					"priority": 9
				}
			] );
		} );
	} );
} );

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