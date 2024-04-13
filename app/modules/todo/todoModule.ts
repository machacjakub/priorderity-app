import { IDoneActivity, IHealthStat, IPlannedActivity, ITodoActivity } from "@/app/types";
import { calculatedPrioritySorter, getHours, getHoursSince } from "@/app/modules/todo/utils";
import { IConditionDefinition, IConditionToCompute, IDurationConditionToCompute, IMetricConditionToCompute, IRecommendation, isConditionDefinitionType, isMetricConditionDefinition, isMetricConditionToCompute } from "@/app/modules/profile/types";
import { returnIfNotHigher, returnIfNotLower } from "@/app/modules/utils";
import { isObjectPropertyEqual } from "@/app/utils/functionalProgramming";
import { decrementDay, getDayAtMidnight, getDiffInHours, isSameDay } from "@/app/utils/date";

interface IGetRecommendedArguments {
	healthStats: IHealthStat[];
	doneActivities: IDoneActivity[];
	recommendations: IRecommendation[];
	day?: Date;
}

export const filterDelayedActivities = ( recommendations: IRecommendation[], day?: Date ) => ( activity: ITodoActivity ) => {
	if ( activity.isRecommended ) {
		return recommendations.some( r => r.activityLabel === activity.name && ( !r.delayed_to || ( day ? day.getTime() >= new Date( r.delayed_to ).getTime() : new Date().getTime() >= new Date( r.delayed_to ).getTime() ) ) );
	}
	return !activity.delayed_to || ( day ? day.getTime() >= new Date( activity.delayed_to ).getTime() : new Date().getTime() >= new Date( activity.delayed_to ).getTime() );
};

export const isDurationConditionTrue = ( condition: IDurationConditionToCompute ) => condition.comparisonOperator === '<' ? condition.hoursSinceLast < condition.userHours : condition.hoursSinceLast > condition.userHours;
export const isMetricConditionTrue = ( condition: IMetricConditionToCompute ) => condition.comparisonOperator === '<' ? condition.metricScore < condition.value : condition.metricScore > condition.value ;
export const isConditionTrue = ( condition: IConditionToCompute ) => isMetricConditionToCompute( condition ) ? isMetricConditionTrue( condition ) : isDurationConditionTrue( condition );

export const getConditionToCompute = ( healthStats: IHealthStat[], doneActivities: IDoneActivity[], day?: Date ) => ( condition: IConditionDefinition ): IConditionToCompute => {
	if ( isMetricConditionDefinition( condition ) ) {
		return { comparisonOperator: condition.comparisonOperator, metricScore: healthStats.find( x => x.name === condition.metric )?.score ?? 0, value: condition.value };
	}
	return { hoursSinceLast: getHoursSince( doneActivities.find( isObjectPropertyEqual( condition.activityType, 'label' ) )?.created_at ?? 1000, day ), userHours: getHours( condition.unit )( condition.userDuration ), comparisonOperator: condition.comparisonOperator };
};

export const areMultipleConditionsTrue = ( logicalOperator: IRecommendation["rules"]["logicalOperator"], conditions: IConditionToCompute[] ) => ( logicalOperator === 'and' && conditions.every( isConditionTrue ) ) || ( logicalOperator === 'or' && conditions.some( isConditionTrue ) );

export const isActivityToRecommendByRules = ( healthStats: IHealthStat[], doneActivities: IDoneActivity[], day?: Date ) => ( recommendation: IRecommendation ): boolean => {
	if ( recommendation.rules.conditions.every( isConditionDefinitionType ) ) {
		const conditionsToResolve: IConditionToCompute[] = recommendation.rules.conditions.map( getConditionToCompute( healthStats, doneActivities, day ) );
		return areMultipleConditionsTrue( recommendation.rules.logicalOperator, conditionsToResolve );
	}
	console.warn( 'This should not happen !!! - invalid condition.' );
	return false;
};
const getPriorityFromMetricCondition = ( condition: IMetricConditionToCompute ) => {
	return condition.comparisonOperator === '<' ? returnIfNotHigher( ( condition.value - condition.metricScore )/5, 11 ) : 1;
};

const getPriorityFromDurationCondition = ( condition: IDurationConditionToCompute ) => {
	return condition.comparisonOperator === '>' ? returnIfNotHigher( ( condition.hoursSinceLast - condition.userHours )/( condition.userHours/2 ), 11 ): 1;
};
const getPriority = ( healthStats: IHealthStat[], doneActivities: IDoneActivity[], day?: Date ) => ( recommendation: IRecommendation ) => {
	const conditionDefinitions = recommendation.rules.conditions.filter( isConditionDefinitionType );
	return conditionDefinitions.reduce( ( acc, condition ) => {
		const conditionToCompute = getConditionToCompute( healthStats, doneActivities, day )( condition );
		const currentPriority = isMetricConditionToCompute( conditionToCompute ) ? getPriorityFromMetricCondition( conditionToCompute ) : getPriorityFromDurationCondition( conditionToCompute );
		return Math.max( currentPriority, acc );
	}, 0 );
};
export const getRecommendedActivities = ( { healthStats, doneActivities, recommendations, day } :IGetRecommendedArguments ): ITodoActivity[] => {
	if ( recommendations.length === 0 ) {
		return [];
	}
	return recommendations.filter( isActivityToRecommendByRules( healthStats, doneActivities, day ) ).map( ( activity, i ) => ( { name: activity.activityLabel, isRecommended: true, calculatedPriority: getPriority( healthStats, doneActivities, day )( activity ), priority: 9, deadline: null, delayed_to: null, id: i, created_at: new Date(), tags: activity.tags } ) );
};

interface IGetTodoArguments extends IGetRecommendedArguments{
	plannedActivities: IPlannedActivity[];
	day: Date;
	yesterday?: boolean;
}
export const getTodoActivities = ( { plannedActivities, healthStats, doneActivities, recommendations, day, yesterday } :IGetTodoArguments ): ITodoActivity[] => {
	const now = day ? day.getTime() : new Date().getTime();
	const planned = plannedActivities.map( a => {
		if ( a.deadline ) {
			const daysRemaining = Math.ceil( ( new Date( a.deadline ).getTime() - now ) / 86400000 );
			const days = daysRemaining > 0 ? daysRemaining : 1 + returnIfNotLower( daysRemaining / 30, -0.9 );
			return { ...a, calculatedPriority:  a.priority / days, isRecommended: false };
		}
		return { ...a, calculatedPriority: a.priority, isRecommended: false };
	} );
	const recommended = getRecommendedActivities( { healthStats, doneActivities, recommendations, day } );
	const todoActivities = [ ...planned, ...recommended ].sort( calculatedPrioritySorter ).filter( filterDelayedActivities( recommendations, day ) );

	const diffInHours = getDiffInHours( getDayAtMidnight( day ), getDayAtMidnight( new Date() ) );
	if ( diffInHours > 22 && !yesterday ) {
		const yesterdayActivities = getTodoActivities( { plannedActivities, healthStats, doneActivities, recommendations, yesterday: true, day: isSameDay( decrementDay( day ), new Date() ) ? new Date() : decrementDay( day ) } ).map( a => a.name );
		return todoActivities.filter( a => !yesterdayActivities.includes( a.name ) );
	}
	return todoActivities;
};

