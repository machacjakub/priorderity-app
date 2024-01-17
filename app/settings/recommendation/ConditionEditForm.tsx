import {
	IConditionDefinition, IDurationConditionDefinition,
	IMetricConditionDefinition,
	isMetricConditionDefinition
} from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";
import { ChangeEvent } from "react";
import { XOutlined } from "@/icons";
import { SelectMetric } from "@/app/settings/SelectMetric";
import { SelectComparisonOperator } from "@/app/settings/recommendation/SelectComparisonOperator";

interface IMetricConditionFormProps {
	userMetrics: IHealthMetric[];
	handleChange: ( property: string ) => ( event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => void;
	condition: IMetricConditionDefinition;
}
export const MetricConditionForm = ( { userMetrics, handleChange, condition }: IMetricConditionFormProps ) => {
	return ( <div>
		<SelectMetric metrics={userMetrics} onChange={handleChange( 'metric' )} value={userMetrics.find( metric => metric.name === condition.metric )?.name ?? ''}/>
		<SelectComparisonOperator value={condition.comparisonOperator} onChange={handleChange( 'comparisonOperator' )}/>
		<input type='number' className='w-12 text-black pl-1' onChange={handleChange( 'value' )} value={condition.value}/>
	</div>
	);
};


interface IDurationConditionFormProps {
	handleChange: ( property: string ) => ( event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => void;
	condition: IDurationConditionDefinition;
}
const DurationConditionForm = ( { handleChange, condition }: IDurationConditionFormProps ) => {
	return (
		<div>
			<input type='text' onChange={handleChange( 'activityType' )} value={condition.activityType} className='text-black w-32 pl-1' />
			<SelectComparisonOperator value={condition.comparisonOperator} onChange={handleChange( 'comparisonOperator' )}/>
			<input type='number' className='w-12 text-black pl-1' onChange={handleChange( 'userDuration' )} value={condition.userDuration}/> {condition.unit}
		</div>
	);
};
export const ConditionEditForm = ( { condition, userMetrics, onChange, onConditionDelete }: {condition: IConditionDefinition, userMetrics: IHealthMetric[], onChange: ( condition: IConditionDefinition ) => void, onConditionDelete: ( id: number ) => void } ) => {
	const handleChange = ( property: string ) => ( event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => onChange( { ...condition, [property]: event.target.value } );
	return (
		<div className='border-b-2 border-l-2 border-blue-400 p-1 px-2.5 mb-1 rounded-xl my-2 flex justify-between'>
			{isMetricConditionDefinition( condition )
				? <MetricConditionForm condition={condition} userMetrics={userMetrics} handleChange={handleChange}/>
				: <DurationConditionForm condition={condition} handleChange={handleChange}/>}
			<button onClick={() => onConditionDelete( condition.id )}><XOutlined className='w-5'/></button>
		</div> );
};