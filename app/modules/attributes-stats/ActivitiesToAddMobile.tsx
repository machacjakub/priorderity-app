import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import {PredefinedActivityButton} from "@/app/modules/attributes-stats/PredefinedActivityButton";
import {DashboardSectionHeadingMobile} from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";

export const ActivitiesToAddMobile = ( {onAdd}: {onAdd: ( type: string ) => void} ) => {
	const activities = getPredefinedActivitiesAttributes();
	return (
		<>
			<DashboardSectionHeadingMobile>To add</DashboardSectionHeadingMobile>
			<div className="mx-4 mt-1.5 flex flex-wrap justify-center space-between gap-2">
				{activities.map( ( activity ) => ( <div key={activity.type}> <PredefinedActivityButton activity={activity} handleAdd={onAdd}/> </div> ) )}
			</div>
		</>
	);
};