import { PredefinedActivityButton } from "@/app/modules/attributes-stats/PredefinedActivityButton";
import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import { IPredefinedActivity } from "@/app/modules/profile/types";

interface IProps {
	onAdd: ( type: string ) => void;
	predefinedActivities: IPredefinedActivity[];
}

export const ActivitiesToAddMobile = ( { onAdd, predefinedActivities }: IProps ) => {
	return (
		<>
			<DashboardSectionHeadingMobile>
				To add
			</DashboardSectionHeadingMobile>
			<div className="space-between mx-4 mt-1.5 flex flex-wrap justify-center gap-2">
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
