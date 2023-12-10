import { IDoneActivity, IHealthStat } from "@/app/types";
import { IConditionToCompute, IDurationConditionDefinition, isDurationConditionToCompute, isMetricConditionToCompute } from "@/app/modules/profile/types";
import { getConditionToCompute, getRecommendedActivities, isActivityToRecommendByRules, isConditionTrue } from "@/app/modules/todo/todoModule";

const mockHealthStats: IHealthStat[] = [ { name: 'mental_health', label: 'Mental health', score: 60 }, { name: 'physical_health', label: 'Physical health', score: 40 }, ];
const mockDoneActivities: IDoneActivity[] = [ { id: 0, type: 'walk', label: 'Walk', created_at: new Date( '2023/10/10' ) }, { id: 1, type: 'meditation', label: 'Meditation', created_at: new Date() } ];
const durationConditionMockWalk: IDurationConditionDefinition = { id: 0, comparisonOperator: '>', unit: 'h', activityType: 'walk', userDuration: 60 };
describe( 'Todo module tests', () => {

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
				},
				{
					activityType: "15min_meditation",
					activityLabel: '15min meditation',
					rules: {
						logicalOperator: "and",
						conditions: [ { id: 0, comparisonOperator: "<", metric: 'mental_health', value: 50 } ],
					}
				},
				{
					activityType: "meditation",
					activityLabel: 'Meditation',
					rules: {
						logicalOperator: "and",
						conditions: [ { id: 0, comparisonOperator: ">", userDuration: 100, activityType: 'Meditation', unit: 'h' } ],
					}
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