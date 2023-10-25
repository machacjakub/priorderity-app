import { IHealthMetric } from "@/app/types";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { useState } from "react";
import { handleUpdateMetrics } from "@/database/actions";
import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined, EyeSlashOutlined, PlusOutlined } from "@/icons";
import { SaveChangesButton } from "@/app/settings/SaveChangesButton";

const MetricField = ( { metric, onUpdate, onDelete, index }: { metric: IHealthMetric; index: number; onUpdate: ( updatedLabel: string, index: number ) => void, onDelete: ( index: number ) => void } ) => {
	const [ label, setLabel ] = useState( metric.label );
	const editing = useBoolean( false );
	const visible = useBoolean( true );
	return (
		<div className='border-2 p-1.5 pl-4 my-2 flex justify-between rounded-xl sm:w-[480px]'>
			{editing.value || metric.name === 'none' ? <input className='text-black px-2 max-w-fit' value={label} onChange={( e ) => setLabel( e.target.value )}/> : <div className={`mt-0.5 ${!visible.value && 'text-gray-400 dark:text-gray-700' }`}>{metric.label}</div>}
			<div className='flex gap-2'>
				<button className='p-1.5 rounded-full' onClick={visible.toggle}>
					{visible.value ? <EyeSlashOutlined className='w-4'/> : <EyeOutlined className='w-4'/>}
				</button>
				{editing.value || metric.name === 'none'
					? <button className='p-1.5 rounded-full bg-green-500/20 border border-green-500' onClick={() => {
						onUpdate( label, index );
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
	const updateMetricField = ( updatedLabel: string, index: number ) => {
		setMetrics( metrics.map( ( metric, i ) => index === i ? { ...metric, name: metric.name === 'none' ? updatedLabel.toLowerCase().trim().split( ' ' ).join( '_' ) : metric.name, label: updatedLabel } : metric ) );
	};
	const deleteMetricField = ( index: number ) => setMetrics( metrics.filter( ( metric, i ) => index !== i ) );
	return (
		<div className='text-foreground px-4 mb-2 max-w-lg mx-auto'>
			{metrics.map( ( metric, i ) => <div key={`${i}-${metric.name}`}><MetricField metric={metric} onUpdate={updateMetricField} onDelete={deleteMetricField} index={i}/></div> )}
			<div className='text-center'><button className='bg-blue-500/20 border border-blue-500 dark:border-blue-500/80 p-1 mt-1 rounded-full text-2xl' onClick={() => setMetrics( [ ...metrics, { name: 'none', label: '', hidden: false } ] ) } ><PlusOutlined /></button></div>
			<div className='text-right'><SaveChangesButton active={metrics.toString() !== userMetrics.toString()} onClick={async () => handleUpdateMetrics( metrics ) }/></div>
		</div>
	);
};