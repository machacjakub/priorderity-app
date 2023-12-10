"use client";

import { IDoneActivity } from "@/app/types";
import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { ShowMoreButton } from "@/app/modules/components/mobile/ShowMoreButton";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";

interface IProps {
	doneActivities: IDoneActivity[];
	handleDelete: ( id: number ) => void;
}

export const DoneActivitiesHistoryMobile = ( {
	doneActivities,
	handleDelete,
}: IProps ) => {
	const isPreview = useBoolean( true );
	return (
		<div className="mt-3">
			<DashboardSectionHeadingMobile>
				Done today
			</DashboardSectionHeadingMobile>
			<DoneActivitiesHistory doneActivities={doneActivities} handleDelete={handleDelete} daysVisible={isPreview.value ? 1 : 7}/>
			<div className='text-center'><ShowMoreButton isPreview={isPreview} /></div>
		</div>
	);
};
