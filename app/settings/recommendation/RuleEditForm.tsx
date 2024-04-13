import {
	IConditionDefinition,
	IRecommendation, IRule,
	isConditionDefinitionType
} from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";
import { useState } from "react";
import { ConditionEditForm } from "@/app/settings/recommendation/ConditionEditForm";
import { PlusButton } from "@/app/settings/PlusButton";
import { LogicalOperatorSelect } from "@/app/settings/recommendation/LogicalOperatorSelect";

export const RuleEditForm = ( { rules, userMetrics, onChange }: {rules: IRecommendation["rules"], userMetrics: IHealthMetric[], onChange: ( rules: IRecommendation["rules"] ) => void} ) => {
	const [ conditions, setConditions ] = useState<IConditionDefinition[]>( rules.conditions.filter( isConditionDefinitionType ) );
	const [ logicalOperator, setLogicalOperator ] = useState( rules.logicalOperator );
	const handleConditionChange = ( conditionId: number ) => ( newCondition: IConditionDefinition ) => {
		const newConditions = conditions.map( condition => condition.id === conditionId ? newCondition : condition );
		setConditions( newConditions );
		onChange( { ...rules, conditions: newConditions, logicalOperator } );
	};

	const handleConditionDelete = ( id: number ) => {
		const newConditions = conditions.filter( condition => condition.id !== id );
		setConditions( newConditions );
		onChange( { ...rules, conditions: newConditions, logicalOperator } );
	};

	const handleConditionAdd = ( newCondition: IConditionDefinition ) => {
		const newConditions = [ ...conditions, newCondition ];
		setConditions( newConditions );
		onChange( { ...rules, conditions: newConditions, logicalOperator } );
	};

	const handleLogicalOperatorChange = ( newOperator: IRule["logicalOperator"] ) => {
		setLogicalOperator( newOperator );
		onChange( { ...rules, conditions, logicalOperator: newOperator } );
	};

	return (
		<div className='py-3 rounded-xl flex bg-gradient-to-r from-blue-400/20 via-foreground/5 to-background my-3'>
			<div className='my-auto px-2'><LogicalOperatorSelect value={logicalOperator} onChange={handleLogicalOperatorChange}/></div>
			<div className='flex-grow'>
				{conditions.filter( isConditionDefinitionType ).map( condition => <ConditionEditForm key={condition.id} condition={condition} userMetrics={userMetrics} onChange={handleConditionChange( condition.id )} onConditionDelete={handleConditionDelete} /> )}
				<div className='flex gap-y-1 gap-x-2 justify-center flex-wrap'>
					<PlusButton onClick={() => handleConditionAdd( { id: conditions.length, metric: userMetrics[0].name, comparisonOperator: '<', value: 0 } )} label={'Metric'}/>
					<PlusButton onClick={() => handleConditionAdd( { id: conditions.length, activityType: '', comparisonOperator: '>', userDuration: 0, unit: 'h' } )} label={'Duration'}/>
				</div>
			</div>
		</div>
	);
};