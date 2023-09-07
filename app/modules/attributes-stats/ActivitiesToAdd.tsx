import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import {PredefinedActivityButton} from "@/app/modules/attributes-stats/PredefinedActivityButton";

export const ActivitiesToAdd = () => {
	const activities = getPredefinedActivitiesAttributes();
	return (
		<div className="m-6 flex flex-wrap justify-center space-between gap-6">
			{activities.map( ( activity ) => ( <PredefinedActivityButton activity={activity} key={activity.type}/> ) )}
		</div>
	);
};