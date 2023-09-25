import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import {PredefinedActivityButton} from "@/app/modules/attributes-stats/PredefinedActivityButton";
import {DasboardSectionHeading} from "@/app/modules/components/DasboardSectionHeading";

export const ActivitiesToAdd = ( {onAdd}: {onAdd: ( type: string ) => void} ) => {
	const activities = getPredefinedActivitiesAttributes();
	return (
		<>
			<DasboardSectionHeading>Activities</DasboardSectionHeading>
			<div className="m-6 flex flex-wrap justify-center space-between gap-6">
				{activities.map( ( activity ) => ( <div key={activity.type}> <PredefinedActivityButton activity={activity} handleAdd={onAdd}/> </div> ) )}
			</div>
		</>
	);
};