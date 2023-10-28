import { IHealthMetric } from "@/app/types";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { useState } from "react";
import { handleUpdateMetrics } from "@/database/actions";
import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined, EyeSlashOutlined, PlusOutlined } from "@/icons";
import { SaveChangesButton } from "@/app/settings/SaveChangesButton";

const MetricField = ( { metric, onUpdate, onDelete, index }: { metric: IHealthMetric; index: number; onUpdate: ( updatedLabel: string, index: number, hidden?: boolean ) => void, onDelete: ( index: number ) => void } ) => {
	const [ label, setLabel ] = useState( metric.label );
	const editing = useBoolean( false );
	const hidden = useBoolean( metric.hidden );
	return (
		<div className='border-2 p-1.5 pl-4 my-2 flex justify-between rounded-xl w-full'>
			{editing.value || metric.name === 'none' ? <input className='text-black px-2 max-w-fit' value={label} onChange={( e ) => setLabel( e.target.value )}/> : <div className={`mt-0.5 ${hidden.value && 'text-gray-400 dark:text-gray-700' }`}>{metric.label}</div>}
			<div className='flex gap-2'>
				<button className='p-1.5 rounded-full' onClick={() => {
					onUpdate( label, index, !hidden.value );
					hidden.toggle();
				}}>
					{hidden.value ? <EyeOutlined className='w-4'/> : <EyeSlashOutlined className='w-4'/>}
				</button>
				{editing.value || metric.name === 'none'
					? <button className='p-1.5 rounded-full bg-green-500/20 border border-green-500' onClick={() => {
						onUpdate( label, index, hidden.value );
						editing.setFalse();
					}}><CheckOutlined className='w-4'/></button>
					: <button className='p-1.5 rounded-full bg-blue-500/20 border border-blue-500' onClick={editing.setTrue}>
						<EditOutlined className='w-4'/>
					</button>}
				<button className='p-1.5 rounded-full bg-red-500/20 border border-red-500' onClick={() => onDelete( index )}>
					<DeleteOutlined className='w-4' />
				</button>
			</div>
		</div> );
};
export const MetricsForm = ( { userMetrics }: { userMetrics: IHealthMetric[] } ) => {
	const [ metrics, setMetrics ] = useState<IHealthMetric[]>( userMetrics );
	const updateMetricField = ( updatedLabel: string, index: number, hidden?: boolean ) => {
		setMetrics( metrics.map( ( metric, i ) => index === i ? { ...metric, name: metric.name === 'none' ? updatedLabel.toLowerCase().trim().split( ' ' ).join( '_' ) : metric.name, label: updatedLabel, hidden: !!hidden } : metric ) );
	};
	const deleteMetricField = ( index: number ) => setMetrics( metrics.filter( ( metric, i ) => index !== i ) );
	return (
		<div className='text-foreground px-4 mb-2 mx-auto sm:mx-0 lg:mx-30'>
			{metrics.map( ( metric, i ) => <div key={`${i}-${metric.name}`}><MetricField metric={metric} onUpdate={updateMetricField} onDelete={deleteMetricField} index={i}/></div> )}
			<div className='text-center'><button className='bg-blue-500/20 border border-blue-500 dark:border-blue-500/80 p-1 mt-1 rounded-full text-2xl' onClick={() => setMetrics( [ ...metrics, { name: 'none', label: '', hidden: false } ] ) } ><PlusOutlined /></button></div>
			<div className='text-right'><SaveChangesButton active={true} onClick={async () => handleUpdateMetrics( metrics ) }/></div>
		</div>
	);
};