import { PredefinedActivityButton } from "@/app/modules/attributes-stats/PredefinedActivityButton";
import { DashboardSectionHeading } from "@/app/modules/components/DashboardSectionHeading";
import { IPredefinedActivity } from "@/app/modules/profile/types";

interface IProps {
	onAdd: ( type: string ) => void;
	predefinedActivities: IPredefinedActivity[];
}

export const ActivitiesToAdd = ( { onAdd, predefinedActivities }: IProps ) => {
	return (
		<>
			<DashboardSectionHeading>
				Activities
			</DashboardSectionHeading>
			<div className="space-between m-6 flex flex-wrap justify-center gap-6">
				{predefinedActivities.map( ( activity ) => (
					<div key={activity.type}>
						{" "}
						<PredefinedActivityButton
							activity={
								activity
							}
							handleAdd={
								onAdd
							}
						/>{" "}
					</div>
				) )}
			</div>
		</>
	);
};
