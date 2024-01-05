import { IDoneActivity } from "@/app/types";
import { ActivityInHistory } from "@/app/modules/history/ActivityInHistory";

interface IProps {
	activities: IDoneActivity[];
	handleDelete: ( id: number ) => void;
}

export const ActivitiesInHistoryList = ( { activities, handleDelete, }: IProps ) => {
	return (
		<div>
			{activities.map( ( activity ) => <ActivityInHistory key={activity.id} activity={activity} handleDelete={handleDelete}/> )}
		</div>
	);
};
