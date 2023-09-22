import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import {PredefinedActivityButton} from "@/app/modules/attributes-stats/PredefinedActivityButton";

export const ActivitiesToAdd = ( {handleAdd}: {handleAdd: ( type: string ) => void} ) => {
	const activities = getPredefinedActivitiesAttributes();
	return (
		<div className="m-6 flex flex-wrap justify-center space-between gap-6">
			{activities.map( ( activity ) => ( <div key={activity.type}> <PredefinedActivityButton activity={activity} handleAdd={handleAdd}/> </div> ) )}
		</div>
	);
};