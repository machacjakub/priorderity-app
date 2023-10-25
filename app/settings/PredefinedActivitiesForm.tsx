

import {
	ArrowSmallUpOutlined,
	CheckOutlined,
	ClocksOutlined,
	DeleteOutlined,
	EditOutlined, PlusOutlined
} from "@/icons";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { IPredefinedActivity } from "@/app/modules/profile/types";
import { IHealthMetric } from "@/app/types";
import { useState } from "react";
import { SaveChangesButton } from "@/app/settings/SaveChangesButton";
import { labelToName } from "@/app/modules/utils";
import { handleUpdatePredefinedActivities } from "@/database/actions";

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

const NewActivityForm = ( { onClose, onSave, userMetrics }: { onClose: () => void, onSave: ( label: string ) => void, userMetrics: IHealthMetric[] } ) => {
	const [ label, setLabel ] = useState( '' );
	return (
		<div className='border-2 p-3 pl-4 rounded-xl my-2 flex justify-between'>
			<input className='text-black pl-1' value={label} onChange={( e ) => setLabel( e.target.value )} />
			<div className='flex gap-2'>
				<button className='p-1.5 rounded-full bg-green-500/20 border border-green-500' onClick={() => onSave( label )}>
					<CheckOutlined className='w-4'/>
				</button>
				<button className='p-1.5 rounded-full bg-red-500/20 border border-red-500' onClick={onClose}>
					<DeleteOutlined className='w-4' />
				</button>
			</div>
		</div>
	);
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
	isEditing && console.log( metrics );
	return (
		<div className='border-2 p-2 pl-4 rounded-xl my-2'>
			<div className='flex justify-between'>
				{editing.value ? <input className='text-black pl-1' defaultValue={label} onChange={( e ) => setLabel( e.target.value ) }/> : <div className='mt-0.5 flex'>{label}</div>}
				<div className='flex gap-2'>
					{editing.value
						? <button className='p-1.5 rounded-full bg-green-500/20 border border-green-500' onClick={() => {
							onSave( label, metrics );
							editing.setFalse();
						}}><CheckOutlined className='w-4'/></button>
						: <button className='p-1.5 rounded-full bg-blue-500/20 border border-blue-500' onClick={editing.setTrue}>
							<EditOutlined className='w-4'/>
						</button>}
					<button className='p-1.5 rounded-full bg-red-500/20 border border-red-500' onClick={() => onDelete( activity.type )}>
						<DeleteOutlined className='w-4' />
					</button>
				</div>
			</div>
			{editing.value
				?
				<div className='mt-2'>
					{userMetrics.map( ( metric,i ) =>
						<div key={i} className='text-sm grid grid-cols-4 my-1'>
							<div className='col-span-2'>{metric.label}</div>
							<div className='flex'><ArrowSmallUpOutlined className='w-4 mx-1'/><input type='number' className='w-8 text-black pl-1' onChange={( e ) => setMetrics( { ...metrics, [metric.name]: { points: Number( e.target.value ), duration: metrics[metric.name]?.duration ?? 0 } } )} defaultValue={metrics[metric.name]?.points}/></div>
							<div className='flex'><ClocksOutlined className='w-4 mx-1'/><input type='number' className='w-8 text-black pl-1' onChange={( e ) => setMetrics( { ...metrics, [metric.name]: { duration: Number( e.target.value ), points: metrics[metric.name]?.points ?? 0 } } )} defaultValue={metrics[metric.name]?.duration}/></div>
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
	const handleActivityDelete = ( activityType: string ) => setActivities( activities.filter( activity => activity.type !== activityType ) );
	const handleActivityUpdate = ( type: string ) => ( label: string, metrics: IPredefinedActivity["metrics"] ) => {
		setActivities( activities.map( ( activity ) => activity.type === type ? ( { ...activity, label, metrics } ) : activity ) );
	};
	const handleAddNewActivity = ( label: string, metrics: IPredefinedActivity["metrics"] ) => {
		setActivities( [ ...activities, { type: labelToName( label ), label, metrics } ] );
		addingNew.setFalse();
	};
	console.log( activities );
	return (
		<div className='text-foreground px-4 mb-2 3xl:bg-blue-500 sm:mx-10 md:mx-20 lg:mx-32 xl:mx-56 2xl:mx-72'>
			{activities.map( ( activity, i ) => <ActivityFormField key={`${i}-${activity.type}`} activity={activity} userMetrics={userMetrics} onDelete={handleActivityDelete} onSave={handleActivityUpdate( activity.type )} /> )}
			{addingNew.value
				? <ActivityFormField userMetrics={userMetrics} onDelete={addingNew.setFalse} onSave={handleAddNewActivity} activity={{ label: '', type: '', metrics: {} }} isEditing={true} />
				: <div className='text-center'>
					<button className='bg-blue-500/20 border border-blue-500 dark:border-blue-500/80 p-1 mt-1 rounded-full text-2xl' onClick={addingNew.setTrue}>
						<PlusOutlined/>
					</button>
				</div>
			}
			<div className='text-right'><SaveChangesButton active={activities.toString() !== predefinedActivities.toString()} onClick={async () => {
				await handleUpdatePredefinedActivities( activities );
			}}/></div>
		</div>
	);
};