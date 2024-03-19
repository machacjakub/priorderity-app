import useBoolean from "@/app/utils/hooks/useBoolean";
import { useState } from "react";
import { IHabit } from "@/app/modules/profile/types";
import { DoneButton } from "@/app/settings/DoneButton";
import { EditButton } from "@/app/settings/EditButton";
import { DeleteButton } from "@/app/settings/DeleteButton";

interface IActivityFormFieldProps {
    activity: IHabit,
    onDelete: ( activityType: string ) => void,
    onSave: ( label: string, daysToTrack: number[] ) => void
    isEditing?: boolean;
}
export const HabitFormField = ( { activity, onDelete, onSave, isEditing } : IActivityFormFieldProps ) => {
	const editing = useBoolean( isEditing );
	const [ label, setLabel ] = useState<string>( activity.label );
	const [ daysToTrack, setDaysToTrack ] = useState<number[]>( activity.daysToTrack );

	const handleSave = () => {
		onSave( label, daysToTrack );
		editing.setFalse();
	};

	const arrayItemToggle = ( item: any, array: any[] ) => array.includes( item ) ? array.filter( x => x !== item ) : [ ...array, item ];
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