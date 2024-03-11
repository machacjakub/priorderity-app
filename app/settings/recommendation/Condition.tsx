import { IConditionDefinition, isMetricConditionDefinition } from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";

export const Condition = ( { condition, userMetrics }: {condition: IConditionDefinition, userMetrics: IHealthMetric[]} ) => {
	return (
		<div className='border-b-2 border-l-2 border-blue-400 p-1 px-2.5 mb-1 rounded-xl my-2'>
			{isMetricConditionDefinition( condition ) ? `${userMetrics.find( x => x.name === condition.metric )?.label} ${condition.comparisonOperator} ${condition.value} p` : `${condition.activityType} ${condition.comparisonOperator} ${condition.userDuration} ${condition.unit}` }
		</div> );
};