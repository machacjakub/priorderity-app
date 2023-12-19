import { PredefinedActivityButton } from "@/app/modules/attributes-stats/PredefinedActivityButton";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";
import { useContext } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";

export const ActivitiesToAdd = () => {
	const { predefinedActivities, addDoneActivity } = useContext( doneModuleContext );
	return (
		<>
			<DashboardSectionHeading>
				Activities
			</DashboardSectionHeading>
			<div className="space-between m-6 flex flex-wrap justify-center gap-6">
				{predefinedActivities.map( ( activity ) => (
					<div key={activity.type}>
						<PredefinedActivityButton activity={activity} handleAdd={addDoneActivity}/>
					</div>
				) )}
			</div>
		</>
	);
};
