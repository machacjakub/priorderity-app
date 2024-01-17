import {
	IConditionDefinition,
	IRecommendation,
	isConditionDefinitionType
} from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";
import { useState } from "react";
import { PlusOutlined } from "@/icons";
import { ConditionEditForm } from "@/app/settings/recommendation/ConditionEditForm";

export const RuleEditForm = ( { rules, userMetrics, onChange }: {rules: IRecommendation["rules"], userMetrics: IHealthMetric[], onChange: ( rules: IRecommendation["rules"] ) => void} ) => {
	const [ conditions, setConditions ] = useState<IConditionDefinition[]>( rules.conditions.filter( isConditionDefinitionType ) );
	const handleConditionChange = ( conditionId: number ) => ( newCondition: IConditionDefinition ) => {
		const newConditions = conditions.map( condition => condition.id === conditionId ? newCondition : condition );
		setConditions( newConditions );
		onChange( { ...rules, conditions: newConditions } );
	};

	const handleConditionDelete = ( id: number ) => {
		const newConditions = conditions.filter( condition => condition.id !== id );
		setConditions( newConditions );
		onChange( { ...rules, conditions: newConditions } );
	};

	const handleConditionAdd = ( newCondition: IConditionDefinition ) => {
		const newConditions = [ ...conditions, newCondition ];
		setConditions( newConditions );
		onChange( { ...rules, conditions: newConditions } );
	};

	return (
		<div className='py-3 rounded-xl flex bg-gradient-to-r from-blue-400/20 via-foreground/5 to-background my-3'>
			<div className='my-auto px-2'>{rules.conditions.length <= 1 ? '' : rules.logicalOperator === 'and' ? 'AND' : rules.logicalOperator === 'or' ? 'OR' : 'ble'}</div>
			<div className='flex-grow'>
				{conditions.filter( isConditionDefinitionType ).map( condition => <ConditionEditForm key={condition.id} condition={condition} userMetrics={userMetrics} onChange={handleConditionChange( condition.id )} onConditionDelete={handleConditionDelete} /> )}
				<div className='flex gap-y-1 gap-x-2 justify-center flex-wrap'>
					<button className='bg-blue-100 dark:bg-blue-950 border border-blue-500 dark:border-blue-500/80 py-1 px-3 mt-1 rounded-full flex' onClick={() => handleConditionAdd( { id: conditions.length, metric: userMetrics[0].name, comparisonOperator: '<', value: 0 } )}>
						<PlusOutlined/><span>Metric</span>
					</button>
					<button className='bg-blue-100 dark:bg-blue-950 border border-blue-500 dark:border-blue-500/80 py-1 px-3 mt-1 rounded-full flex' onClick={() => handleConditionAdd( { id: conditions.length, activityType: '', comparisonOperator: '>', userDuration: 0, unit: 'h' } )}>
						<PlusOutlined/><span>Duration</span>
					</button>
				</div>
			</div>
		</div>
	);
};