import {IDoneActivity} from "@/app/types";
import {ActivityInHistory} from "@/app/modules/history/ActivityInHistory";


export const ActivitiesInHistoryList = ( {activities}: { activities: IDoneActivity[] } ) => {
	return ( <div>
		{activities.map( activity => <div key={activity.id}><ActivityInHistory activity={activity}/></div> )}
	</div> );
};