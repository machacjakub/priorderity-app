import { PredefinedActivityButton } from "@/app/modules/attributes-stats/PredefinedActivityButton";
import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import { useContext } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";

export const ActivitiesToAddMobile = ( ) => {
	const { predefinedActivities, addDoneActivity } = useContext( doneModuleContext );
	return (
		<>
			<DashboardSectionHeadingMobile>
				To add
			</DashboardSectionHeadingMobile>
			<div className="space-between mx-4 mt-1.5 flex flex-wrap justify-center gap-2">
				{predefinedActivities.map( ( activity ) => (
					<div key={activity.type}>
						{" "}<PredefinedActivityButton activity={activity} handleAdd={addDoneActivity}/>{" "}
					</div>
				) )}
			</div>
		</>
	);
};
