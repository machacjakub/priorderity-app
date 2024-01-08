import { PlusOutlined, XOutlined } from "@/icons";
import useBoolean from "@/app/utils/hooks/useBoolean";
import {
	IConditionDefinition,
	IRecommendation,
	isConditionDefinitionType,
	isMetricConditionDefinition
} from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";
import { ChangeEvent, useState } from "react";
import { SaveChangesButton } from "@/app/settings/SaveChangesButton";
import { delay, labelToName } from "@/app/modules/utils";
import { handleUpdateRecommendations } from "@/database/actions";
import { EditButton } from "@/app/settings/EditButton";
import { DoneButton } from "@/app/settings/DoneButton";
import { DeleteButton } from "@/app/settings/DeleteButton";
import { SelectMetric } from "@/app/settings/SelectMetric";
import { mockRules } from "@/database/mockData";
import { AddButton } from "@/app/settings/AddButton";

const RulesEditForm = ( { rules, userMetrics, onChange }: {rules: IRecommendation["rules"], userMetrics: IHealthMetric[], onChange: ( rules: IRecommendation["rules"] ) => void} ) => {
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
const RulesCard = ( { rules, userMetrics }: {rules: IRecommendation["rules"], userMetrics: IHealthMetric[],} ) => {
	return (
		<div className='py-3 rounded-xl flex bg-gradient-to-r from-blue-400/20 via-foreground/5 to-background my-3'>
			<div className='my-auto px-2'>{rules.conditions.length <= 1 ? '' : rules.logicalOperator === 'and' ? 'AND' : 'OR'}</div>
			<div className='flex-grow'>{rules.conditions.filter( isConditionDefinitionType ).map( condition => <Condition key={JSON.stringify( condition )} condition={condition} userMetrics={userMetrics}/> )}</div>
		</div>
	);
};

const ConditionEditForm = ( { condition, userMetrics, onChange, onConditionDelete }: {condition: IConditionDefinition, userMetrics: IHealthMetric[], onChange: ( condition: IConditionDefinition ) => void, onConditionDelete: ( id: number ) => void } ) => {
	const handleChange = ( property: string ) => ( event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => onChange( { ...condition, [property]: event.target.value } );
	return (
		<div className='border-b-2 border-l-2 border-blue-400 p-1 px-2.5 mb-1 rounded-xl my-2 flex justify-between'>
			{isMetricConditionDefinition( condition )
				? <div><SelectMetric metrics={userMetrics} onChange={handleChange( 'metric' )} value={userMetrics.find( metric => metric.name === condition.metric )?.name ?? ''}/> {`<`} <input type='number' className='w-12 text-black px-1' onChange={handleChange( 'value' )} value={condition.value}/></div>
				: <div><input type='text' onChange={handleChange( 'activityType' )} value={condition.activityType} className='text-black w-32 pl-1' /> {`>`} <input type='number' className='w-12 text-black px-1' onChange={handleChange( 'userDuration' )} value={condition.userDuration}/> {condition.unit}</div> }
			<button onClick={() => onConditionDelete( condition.id )}><XOutlined className='w-5'/></button>
		</div> );
};
const Condition = ( { condition, userMetrics }: {condition: IConditionDefinition, userMetrics: IHealthMetric[]} ) => {
	return (
		<div className='border-b-2 border-l-2 border-blue-400 p-1 px-2.5 mb-1 rounded-xl my-2'>
			{isMetricConditionDefinition( condition ) ? `${userMetrics.find( x => x.name === condition.metric )?.label} ${condition.comparisonOperator} ${condition.value} p` : `${condition.activityType} ${condition.comparisonOperator} ${condition.userDuration} ${condition.unit}` }
		</div> );
};

interface IActivityFormFieldProps {
    recommendation: IRecommendation ,
    userMetrics: IHealthMetric[],
    onDelete: ( activityType: string ) => void,
    onSave: ( label: string, rules: IRecommendation["rules"] ) => void
    isEditing?: boolean;
}

const RecommendationField = ( { recommendation, userMetrics, onDelete, onSave, isEditing } : IActivityFormFieldProps ) => {
	const editing = useBoolean( isEditing );
	const [ label, setLabel ] = useState<string>( recommendation.activityLabel );
	const [ rules, setRules ] = useState<IRecommendation["rules"]>( recommendation.rules );
	const handleSave = () => {
		onSave( label, rules );
		editing.setFalse();
	};
	return (
		<div className='border-2 p-2 pl-4 rounded-xl my-2'>
			<div className='flex justify-between'>
				{editing.value ? <input className='text-black pl-1' defaultValue={label} onChange={( e ) => setLabel( e.target.value ) }/> : <div className='mt-0.5 flex'>{label}</div>}
				<div className='flex gap-2'>
					{editing.value
						? <DoneButton onClick={handleSave} />
						: <EditButton onClick={editing.setTrue} />}
					<DeleteButton onClick={() => onDelete( recommendation.activityType )} />
				</div>
			</div>
			{editing.value
				? <RulesEditForm rules={recommendation.rules} userMetrics={userMetrics} onChange={setRules}/>
				:
				<RulesCard rules={recommendation.rules} userMetrics={userMetrics}/>
			}
		</div>
	);
};
export const RecommendationsForm = ( { recommendationRules, userMetrics }: { recommendationRules: IRecommendation[], userMetrics: IHealthMetric[]} ) => {
	const [ recommendations, setRecommendations ] = useState<IRecommendation[]>( recommendationRules );
	const addingNew = useBoolean( false );
	const loading = useBoolean( false );
	const done = useBoolean( false );
	const handleRuleDelete = ( activityType: string ) => setRecommendations( recommendations.filter( rule => rule.activityType !== activityType ) );
	const handleRuleUpdate = ( type: string ) => ( activityLabel: string, rules: IRecommendation["rules"] ) => {
		setRecommendations( recommendations.map( ( recommendation ) => recommendation.activityType === type ? ( { ...recommendation, activityLabel, rules } ) : recommendation ) );
	};
	const handleAddNewRule = ( label: string, rules: IRecommendation["rules"] ) => {
		setRecommendations( [ ...recommendations, { activityType: labelToName( label ), activityLabel: label, rules } ] );
		addingNew.setFalse();
	};

	const handleAddInspiration = ( ) => {
		setRecommendations( [ ...recommendations, ...mockRules ] );
	};

	const handleSave = async () => {
		loading.setTrue();
		await handleUpdateRecommendations( recommendations );
		loading.setFalse();
		done.setTrue();
		await delay( 4000 );
		done.setFalse();
	};
	return (
		<div className='text-foreground px-4 mb-2'>
			{recommendations.map( ( rule, i ) => <RecommendationField key={`${i}-${rule.activityType}`} recommendation={rule} userMetrics={userMetrics} onDelete={handleRuleDelete} onSave={handleRuleUpdate( rule.activityType )} /> )}
			{addingNew.value
				? <RecommendationField userMetrics={userMetrics} onDelete={addingNew.setFalse} onSave={handleAddNewRule} recommendation={{ activityLabel: '', activityType: '', rules: { logicalOperator: 'and', conditions: [] } }} isEditing={true} />
				: <div className='flex justify-center gap-4'>
					<AddButton onClick={addingNew.setTrue}/>
					{recommendations.length === 0 && (
						<button className='flex gap-2 bg-warning/20 border border-warning dark:border-warning/80 p-1 my-3
						 rounded-full text-sm' onClick={handleAddInspiration}>
							<PlusOutlined/> <span className='my-auto pr-2'>Add some for inspiration</span>
						</button>
					)}
				</div>
			}
			<div className='text-right'><SaveChangesButton loading={loading.value} done={done.value} onClick={handleSave}/></div>
		</div>
	);
};