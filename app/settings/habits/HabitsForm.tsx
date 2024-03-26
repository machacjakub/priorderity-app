import { useContext, useState } from "react";
import userDataContext from "@/app/modules/context/userDataContext";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { delay, labelToName } from "@/app/modules/utils";
import { AddButton } from "@/app/settings/AddButton";
import { SaveChangesButton } from "@/app/settings/SaveChangesButton";
import { handleUpdateHabits } from "@/database/actions";
import { HabitFormField } from "@/app/settings/habits/HabitFormField";

export const HabitsForm = ( ) => {
	const userData = useContext( userDataContext );
	const [ activities, setActivities ] = useState( userData?.habits ?? [] );
	const addingNew = useBoolean( false );
	const loading = useBoolean( false );
	const done = useBoolean( false );
	const handleActivityDelete = ( activityType: string ) => setActivities( activities.filter( activity => activity.type !== activityType ) );
	const handleActivityUpdate = ( activityType: string ) => ( label: string, daysToTrack: number[] ) => {
		setActivities( activities.map( ( activity ) => activity.type === activityType ? ( { ...activity, label, daysToTrack, type: labelToName( label ) } ) : activity ) );
	};
	const handleAddNewActivity = ( label: string, daysToTrack: number[] ) => {
		setActivities( [ ...activities, { type: labelToName( label ), label, daysToTrack } ] );
		addingNew.setFalse();
	};

	const handleSave = async () => {
		loading.setTrue();
		await handleUpdateHabits( activities );
		loading.setFalse();
		done.setTrue();
		await delay( 4000 );
		done.setFalse();
	};
	return (
		<div className='text-foreground px-4 mb-2'>
			{activities.map( ( activity, i ) => <HabitFormField key={`${i}-${activity.type}`} activity={activity} onDelete={handleActivityDelete} onSave={handleActivityUpdate( activity.type )} /> )}
			{addingNew.value
				? <HabitFormField onDelete={addingNew.setFalse} onSave={handleAddNewActivity} activity={{ label: '', type: '', daysToTrack:[ 0, 1, 2, 3, 4, 5, 6 ] }} isEditing={true} />
				: <div className='text-center'>
					<AddButton onClick={addingNew.setTrue}/>
				</div>
			}
			<div className='text-right'><SaveChangesButton loading={loading.value} done={done.value} onClick={handleSave}/></div>
		</div>
	);
};