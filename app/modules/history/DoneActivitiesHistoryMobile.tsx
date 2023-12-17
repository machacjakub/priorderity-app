"use client";

import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { ShowMoreButton } from "@/app/modules/components/mobile/ShowMoreButton";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";


export const DoneActivitiesHistoryMobile = ( ) => {
	const isPreview = useBoolean( true );
	return (
		<div className="mt-3">
			<DashboardSectionHeadingMobile>
				Done today
			</DashboardSectionHeadingMobile>
			<DoneActivitiesHistory daysVisible={isPreview.value ? 1 : 7}/>
			<div className='text-center'><ShowMoreButton isPreview={isPreview} /></div>
		</div>
	);
};
