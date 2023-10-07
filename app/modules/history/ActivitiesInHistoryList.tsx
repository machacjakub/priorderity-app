import { IDoneActivity } from "@/app/types";
import { ActivityInHistory } from "@/app/modules/history/ActivityInHistory";

 
export const ActivitiesInHistoryList = ( { activities, handleDelete }: { activities: IDoneActivity[], handleDelete: ( id: number ) => void } ) => {
	return ( <div>
		{activities.map( activity => <div key={activity.id}><ActivityInHistory activity={activity} handleDelete={handleDelete} /></div> )}
	</div> );
};