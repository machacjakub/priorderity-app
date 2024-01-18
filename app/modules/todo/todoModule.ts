import { IDoneActivity, IHealthStat, IPlannedActivity, ITodoActivity } from "@/app/types";
import { calculatedPrioritySorter, getHours, getHoursSince } from "@/app/modules/todo/utils";
import {
	IConditionDefinition,
	IConditionToCompute, IDurationConditionToCompute, IMetricConditionToCompute,
	IRecommendation,
	isConditionDefinitionType,
	isMetricConditionDefinition,
	isMetricConditionToCompute
} from "@/app/modules/profile/types";
import { returnIfNotHigher, returnIfNotLower } from "@/app/modules/utils";
import { isObjectPropertyEqual } from "@/app/utils/functionalProgramming";



interface IGetRecommendedArguments {
	healthStats: IHealthStat[];
	doneActivities: IDoneActivity[];
	recommendations: IRecommendation[];
}

export const isConditionTrue = ( condition: IConditionToCompute ) => {
	if ( isMetricConditionToCompute( condition ) ) {
		return condition.comparisonOperator === '<' ? condition.metricScore < condition.value : condition.metricScore > condition.value ;
	}
	return condition.comparisonOperator === '<' ? condition.hoursSinceLast < condition.userHours : condition.hoursSinceLast > condition.userHours;
};

export const getConditionToCompute = ( healthStats: IHealthStat[], doneActivities: IDoneActivity[] ) => ( condition: IConditionDefinition ): IConditionToCompute => {
	if ( isMetricConditionDefinition( condition ) ) {
		return { comparisonOperator: condition.comparisonOperator, metricScore: healthStats.find( x => x.name === condition.metric )?.score ?? 0, value: condition.value };
	}
	return { hoursSinceLast: getHoursSince( doneActivities.find( isObjectPropertyEqual( condition.activityType, 'label' ) )?.created_at ?? 1000 ), userHours: getHours( condition.unit )( condition.userDuration ), comparisonOperator: condition.comparisonOperator };
};

// export const passActivityNameToCondition = ( recommendation: IRecommendation ) => ( condition: IConditionDefinition ): IConditionDefinition => {
// 	if ( isMetricConditionDefinition( condition ) ) return condition;
// 	return { ...condition, activityType: recommendation.activityType };
// };
export const isActivityToRecommendByRules = ( healthStats: IHealthStat[], doneActivities: IDoneActivity[] ) => ( recommendation: IRecommendation ): boolean => {
	if ( recommendation.rules.conditions.every( isConditionDefinitionType ) ) {
		const conditionsToResolve: IConditionToCompute[] = recommendation.rules.conditions.map( getConditionToCompute( healthStats, doneActivities ) );
		return conditionsToResolve.every( isConditionTrue );
	}
	return false;
};
const getPriorityFromMetricCondition = ( condition: IMetricConditionToCompute ) => {
	return condition.comparisonOperator === '<' ? returnIfNotHigher( ( condition.value - condition.metricScore )/5, 11 ) : 1;
};

const getPriorityFromDurationCondition = ( condition: IDurationConditionToCompute ) => {
	return condition.comparisonOperator === '>' ? returnIfNotHigher( ( condition.hoursSinceLast - condition.userHours )/( condition.userHours/2 ), 11 ): 1;
};
const getPriority = ( healthStats: IHealthStat[], doneActivities: IDoneActivity[] ) => ( recommendation: IRecommendation ) => {
	const conditionDefinitions = recommendation.rules.conditions.filter( isConditionDefinitionType );
	return conditionDefinitions.reduce( ( acc, condition ) => {
		const conditionToCompute = getConditionToCompute( healthStats, doneActivities )( condition );
		const currentPriority = isMetricConditionToCompute( conditionToCompute ) ? getPriorityFromMetricCondition( conditionToCompute ) : getPriorityFromDurationCondition( conditionToCompute );
		return Math.max( currentPriority, acc );
	}, 0 );
};
export const getRecommendedActivities = ( { healthStats, doneActivities, recommendations } :IGetRecommendedArguments ): ITodoActivity[] => {
	if ( recommendations.length === 0 ) {
		return [];
	}
	return recommendations.filter( isActivityToRecommendByRules( healthStats, doneActivities ) ).map( ( activity, i ) => ( { name: activity.activityLabel, isRecommended: true, calculatedPriority: getPriority( healthStats, doneActivities )( activity ), priority: 9, deadline: null, delayed_to: null, id: i, created_at: new Date() } ) );
};

interface IGetTodoArguments extends IGetRecommendedArguments{
	plannedActivities: IPlannedActivity[];
}
export const getTodoActivities = ( { plannedActivities, healthStats, doneActivities, recommendations } :IGetTodoArguments ): ITodoActivity[] => {
	const now = new Date().getTime();
	const planned = plannedActivities.map( a => {
		if ( a.deadline ) {
			const daysRemaining = Math.ceil( ( new Date( a.deadline ).getTime() - now ) / 86400000 );
			const days = daysRemaining > 0 ? daysRemaining : 1 + returnIfNotLower( daysRemaining / 30, -0.9 );
			return { ...a, calculatedPriority:  a.priority / days, isRecommended: false };
		}
		return { ...a, calculatedPriority: a.priority, isRecommended: false };
	} );
	const recommended = getRecommendedActivities( { healthStats, doneActivities, recommendations } );
	return [ ...planned, ...recommended ].sort( calculatedPrioritySorter );
};

