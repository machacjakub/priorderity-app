import useBoolean from "@/app/utils/hooks/useBoolean";
import { useState } from "react";
import { IHabit } from "@/app/modules/profile/types";
import { DoneButton } from "@/app/settings/DoneButton";
import { EditButton } from "@/app/settings/EditButton";
import { DeleteButton } from "@/app/settings/DeleteButton";
import { ActivityToTrackAsHabit } from "@/app/settings/habits/ActivityToTrackAsHabit";
import { PredefinedActivitySelect } from "@/app/settings/habits/PredefinedActivitySelect";
import { PlusButton } from "@/app/settings/PlusButton";

interface IActivityFormFieldProps {
    habit: IHabit,
    onDelete: ( activityType: string ) => void,
    onSave: ( label: string, activityTypes: string[] ) => void
    isEditing?: boolean;
}
export const HabitFormField = ( { habit, onDelete, onSave, isEditing } : IActivityFormFieldProps ) => {
	const editing = useBoolean( isEditing );
	const [ label, setLabel ] = useState<string>( habit.label );
	const [ activityTypes, setActivityTypes ] = useState<string[]>( habit.activityTypes ?? [] );
	// const [ daysToTrack, setDaysToTrack ] = useState<number[]>( activity.daysToTrack );

	const handleSave = async () => {
		const newActivityTypes = Array.from( new Set( activityTypes ) ).filter( type => type !== '-' );
		await onSave( label, newActivityTypes ) ;
		setActivityTypes( newActivityTypes );
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
					<DeleteButton onClick={() => onDelete( habit.type )} />
				</div>
			</div>
			{editing.value
				? <div className='flex flex-col gap-2 m-2'>{activityTypes?.map( ( a, index1 ) => <PredefinedActivitySelect key={`${index1}-${a}`} value={a} onChange={( event ) => setActivityTypes( activityTypes.map( ( type, index2 ) => ( type === a && index1 === index2 ? event.target.value : type ) ) )}/> )}</div>
				: <div>{activityTypes.filter( type => type !== '-' ).map( a => <ActivityToTrackAsHabit key={a} activityType={a}/> )}</div>
			}
			{editing.value && <PlusButton onClick={() => setActivityTypes( [ ...activityTypes, '-' ] )} label={'Add activity'}/>}
			{/*TODO add when ready*/}
			{/*{editing.value*/}
			{/*	?*/}
			{/*	<div className='mt-2'>*/}
			{/*		<DaysToTrackForm editing={true} days={daysToTrack} onChange={( index: number ) => setDaysToTrack( arrayItemToggle( index, daysToTrack ) )}/>*/}
			{/*	</div>*/}
			{/*	:*/}
			{/*	<>*/}
			{/*		<div className='flex gap-2 mt-2 flex flex-wrap'>*/}
			{/*			<DaysToTrackForm editing={false} days={daysToTrack}/>*/}
			{/*		</div>*/}
			{/*	</>*/}
			{/*}*/}
		</div>
	);
};