import {IDoneActivity} from "@/app/types";
import {ActivityInHistory} from "@/app/modules/history/ActivityInHistory";

interface IProps {
    activities: IDoneActivity[]; 
}

export const ActivitiesList = ( {activities}: IProps ) => {
	return (
		<div className="my-6 mx-3">
			{activities.map( ( activity ) => ( <ActivityInHistory activity={activity} key={activity.id}/> ) )}
		</div>
	);
};