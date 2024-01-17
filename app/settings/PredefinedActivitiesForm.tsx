import { ArrowSmallUpOutlined, ClocksOutlined } from "@/icons";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { IPredefinedActivity } from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";
import { useState } from "react";
import { SaveChangesButton } from "@/app/settings/SaveChangesButton";
import { delay, labelToName } from "@/app/modules/utils";
import { handleUpdatePredefinedActivities } from "@/database/actions";
import { EditButton } from "@/app/settings/EditButton";
import { DoneButton } from "@/app/settings/DoneButton";
import { DeleteButton } from "@/app/settings/DeleteButton";
import { AddButton } from "@/app/settings/AddButton";

const getMetricLabel = ( userMetrics: IHealthMetric[], metricKey: string ) => userMetrics?.find( ( metric ) => metric.name === metricKey )?.label ?? metricKey;
const MetricRuleTag = ( { metrics, label, metricKey }: { metrics: IPredefinedActivity["metrics"], label: string, metricKey: string} ) => {
	return (
		<div className='border-b-2 border-l-2 border-blue-400 p-1 px-2.5 mb-1 rounded-xl text-xs'>
			<div className='font-semibold'>{label}</div>
			<div className='flex justify-between'>
				<span className='flex'><ArrowSmallUpOutlined className='w-4 mr-0.5'/>{metrics[metricKey]?.points}</span>
				<span className='flex'><ClocksOutlined className='w-4 mx-0.5'/>{metrics[metricKey]?.duration}h</span>
			</div>
		</div> );
};

interface IActivityFormFielProps {
	activity: IPredefinedActivity ,
	userMetrics: IHealthMetric[],
	onDelete: ( activityType: string ) => void,
	onSave: ( label: string, metrics: IPredefinedActivity["metrics"] ) => void
	isEditing?: boolean;
}

const ActivityFormField = ( { activity, userMetrics, onDelete, onSave, isEditing } : IActivityFormFielProps ) => {
	const editing = useBoolean( isEditing );
	const [ metrics, setMetrics ] = useState<IPredefinedActivity["metrics"]>( activity.metrics );
	const [ label, setLabel ] = useState<string>( activity.label );
	const handleSave = () => {
		onSave( label, metrics );
		editing.setFalse();
	};
	return (
		<div className='border-2 p-2 pl-4 rounded-xl my-2'>
			<div className='flex justify-between'>
				{editing.value ? <input className='text-black pl-1' defaultValue={label} onChange={( e ) => setLabel( e.target.value.trim() ) }/> : <div className='mt-0.5 flex'>{label}</div>}
				<div className='flex gap-2'>
					{editing.value
						? <DoneButton onClick={handleSave} />
						: <EditButton onClick={editing.setTrue} />}
					<DeleteButton onClick={() => onDelete( activity.type )} />
				</div>
			</div>
			{editing.value
				?
				<div className='mt-2'>
					{userMetrics.map( ( metric,i ) =>
						<div key={i} className='text-sm grid grid-cols-4 my-1'>
							<div className='col-span-2'>{metric.label}</div>
							<div className='flex'><ArrowSmallUpOutlined className='w-4 mx-1'/><input type='number' className='w-12 text-black pl-1' onChange={( e ) => setMetrics( { ...metrics, [metric.name]: { points: Number( e.target.value ), duration: metrics[metric.name]?.duration ?? 0 } } )} defaultValue={metrics[metric.name]?.points}/></div>
							<div className='flex'><ClocksOutlined className='w-4 mx-1'/><input type='number' className='w-12 text-black pl-1' onChange={( e ) => setMetrics( { ...metrics, [metric.name]: { duration: Number( e.target.value ), points: metrics[metric.name]?.points ?? 0 } } )} defaultValue={metrics[metric.name]?.duration}/></div>
						</div> )}
				</div>
				:
				<div className='flex gap-2 mt-2 flex flex-wrap'>
					{Object.keys( metrics ).filter( ( metricRulesKey ) => metrics[metricRulesKey] !== null && userMetrics.find( metric => metric.name === metricRulesKey ) ).map( ( metricRules, i ) =>
						<MetricRuleTag key={i} metrics={metrics} label={getMetricLabel( userMetrics, metricRules )} metricKey={metricRules}/> )}
				</div>
			}
		</div>
	);
};
export const PredefinedActivitiesForm = ( { predefinedActivities, userMetrics }: { predefinedActivities: IPredefinedActivity[], userMetrics: IHealthMetric[]} ) => {
	const [ activities, setActivities ] = useState( predefinedActivities );
	const addingNew = useBoolean( false );
	const loading = useBoolean( false );
	const done = useBoolean( false );
	const handleActivityDelete = ( activityType: string ) => setActivities( activities.filter( activity => activity.type !== activityType ) );
	const handleActivityUpdate = ( type: string ) => ( label: string, metrics: IPredefinedActivity["metrics"] ) => {
		setActivities( activities.map( ( activity ) => activity.type === type ? ( { ...activity, label, metrics } ) : activity ) );
	};
	const handleAddNewActivity = ( label: string, metrics: IPredefinedActivity["metrics"] ) => {
		setActivities( [ ...activities, { type: labelToName( label ), label, metrics } ] );
		addingNew.setFalse();
	};

	const handleSave = async () => {
		loading.setTrue();
		await handleUpdatePredefinedActivities( activities );
		loading.setFalse();
		done.setTrue();
		await delay( 4000 );
		done.setFalse();
	};
	return (
		<div className='text-foreground px-4 mb-2'>
			{activities.map( ( activity, i ) => <ActivityFormField key={`${i}-${activity.type}`} activity={activity} userMetrics={userMetrics} onDelete={handleActivityDelete} onSave={handleActivityUpdate( activity.type )} /> )}
			{addingNew.value
				? <ActivityFormField userMetrics={userMetrics} onDelete={addingNew.setFalse} onSave={handleAddNewActivity} activity={{ label: '', type: '', metrics: {} }} isEditing={true} />
				: <div className='text-center'>
					<AddButton onClick={addingNew.setTrue}/>
				</div>
			}
			<div className='text-right'><SaveChangesButton loading={loading.value} done={done.value} onClick={handleSave}/></div>
		</div>
	);
};