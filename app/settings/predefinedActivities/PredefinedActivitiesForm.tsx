import useBoolean from "@/app/utils/hooks/useBoolean";
import { IPredefinedActivity } from "@/app/modules/profile/types";
import { useContext, useState } from "react";
import { SaveChangesButton } from "@/app/settings/SaveChangesButton";
import { delay, labelToName } from "@/app/modules/utils";
import { handleUpdatePredefinedActivities } from "@/database/actions";
import { AddButton } from "@/app/settings/AddButton";
import userDataContext from "@/app/modules/context/userDataContext";
import { ActivityFormField } from "@/app/settings/predefinedActivities/ActivityFormField";

export const PredefinedActivitiesForm = ( ) => {
	const userData = useContext( userDataContext );
	const userMetrics = userData?.metrics ?? [];
	const [ activities, setActivities ] = useState( userData?.activities_stats ?? [] );
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