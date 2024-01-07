"use client";

import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { ShowMoreButton } from "@/app/modules/components/mobile/ShowMoreButton";
import { DoneActivitiesHistory } from "@/app/modules/history/DoneActivitiesHistory";
import doneModuleContext from "@/app/modules/context/doneModuleContext";
import { useContext } from "react";


export const DoneActivitiesHistoryMobile = ( ) => {
	const isPreview = useBoolean( true );
	const { doneActivities } = useContext( doneModuleContext );
	return (
		<div className="mt-3">
			<DashboardSectionHeadingMobile>
				Done today
			</DashboardSectionHeadingMobile>
			<DoneActivitiesHistory daysVisible={isPreview.value ? 1 : 7}/>
			{doneActivities.length !== 0 && <div className='text-center'><ShowMoreButton isPreview={isPreview}/></div>}
		</div>
	);
};
