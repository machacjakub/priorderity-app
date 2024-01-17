import {
	IRecommendation,
	isConditionDefinitionType
} from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";
import { Condition } from "@/app/settings/recommendation/Conditiion";

export const RuleCard = ( { rules, userMetrics }: {rules: IRecommendation["rules"], userMetrics: IHealthMetric[],} ) => {
	return (
		<div className='py-3 rounded-xl flex bg-gradient-to-r from-blue-400/20 via-foreground/5 to-background my-3'>
			<div className='my-auto px-2'>{rules.conditions.length <= 1 ? '' : rules.logicalOperator === 'and' ? 'AND' : 'OR'}</div>
			<div className='flex-grow'>{rules.conditions.filter( isConditionDefinitionType ).map( condition => <Condition key={JSON.stringify( condition )} condition={condition} userMetrics={userMetrics}/> )}</div>
		</div>
	);
};

