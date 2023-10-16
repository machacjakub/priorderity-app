import { IHealthMetric } from "@/app/types";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { useState } from "react";
import { handleUpdateMetrics } from "@/database/actions";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@/icons";
import { defaultMetrics } from "@/app/App";

const MetricField = ( { metric, onUpdate, onDelete, index }: { metric: IHealthMetric; index: number; onUpdate: ( updatedLabel: string, index: number ) => void, onDelete: ( index: number ) => void } ) => {
	const [ label, setLabel ] = useState( metric.label );
	const editing = useBoolean( false );
	return (
		<div className='bg-slate-500/10 dark:bg-slate-500/30 p-1.5 pl-4 my-2 flex justify-between rounded-xl'>
			{editing.value || metric.name === 'none' ? <input className='text-black px-2' value={label} onChange={( e ) => setLabel( e.target.value )}/> : <div className='mt-1'>{metric.label}</div>}
			<div className='flex gap-2'>
				{editing.value || metric.name === 'none'
					? <button className='py-1 px-2 rounded-full bg-green-500/20 border border-green-500' onClick={() => {
						onUpdate( label, index );
						editing.setFalse();
					}}>ce</button>
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
	const [ metrics, setMetrics ] = useState<IHealthMetric[]>( userMetrics === null ? defaultMetrics : userMetrics );
	const updateMetricField = ( updatedLabel: string, index: number ) => {
		setMetrics( metrics.map( ( metric, i ) => index === i ? { ...metric, name: metric.name === 'none' ? updatedLabel.toLowerCase().trim().split( ' ' ).join( '_' ) : metric.name, label: updatedLabel } : metric ) );
	};
	const deleteMetricField = ( index: number ) => setMetrics( metrics.filter( ( metric, i ) => index !== i ) );
	return (
		<div className='text-foreground px-4 mb-2'>
			{metrics.map( ( metric, i ) => <div key={`${i}-${metric.name}`}><MetricField metric={metric} onUpdate={updateMetricField} onDelete={deleteMetricField} index={i}/></div> )}
			<div className='text-center'><button className='bg-blue-500/20 border border-blue-500 dark:border-blue-500/80 p-1 mt-1 rounded-full text-2xl' onClick={() => setMetrics( [ ...metrics, { name: 'none', label: '', hidden: false } ] ) } ><PlusOutlined /></button></div>
			<div className='text-right'><button className='border border-green-400/90 dark:border-green-500/80 bg-green-500/20 py-1 px-4 mt-1 rounded-full' onClick={async () => handleUpdateMetrics( metrics ) } >Save changes</button></div>
		</div>
	);
};