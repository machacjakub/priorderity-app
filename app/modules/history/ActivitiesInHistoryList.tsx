import { IDoneActivity } from "@/app/types";
import { ActivityInHistory } from "@/app/modules/history/ActivityInHistory";

interface IProps {
	activities: IDoneActivity[];
	handleDelete: ( id: number ) => void;
	editing: boolean;
}

export const ActivitiesInHistoryList = ( { activities, handleDelete,editing }: IProps ) => {
	return (
		<div>
			{activities.map( ( activity ) => <ActivityInHistory key={activity.id} activity={activity} handleDelete={handleDelete} editing={editing}/> )}
		</div>
	);
};
