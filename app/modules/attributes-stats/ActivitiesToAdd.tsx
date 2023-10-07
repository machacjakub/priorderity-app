import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import { PredefinedActivityButton } from "@/app/modules/attributes-stats/PredefinedActivityButton";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";
 
export const ActivitiesToAdd = ( { onAdd }: {onAdd: ( type: string ) => void} ) => {
	const activities = getPredefinedActivitiesAttributes();
	return (
		<>
			<DashboardSectionHeading>Activities</DashboardSectionHeading>
			<div className="m-6 flex flex-wrap justify-center space-between gap-6">
				{activities.map( ( activity ) => ( <div key={activity.type}> <PredefinedActivityButton activity={activity} handleAdd={onAdd}/> </div> ) )}
			</div>
		</>
	);
};