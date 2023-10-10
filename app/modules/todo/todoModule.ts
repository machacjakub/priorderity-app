import { IPlannedActivity, ITodoActivity } from "@/app/types";
import { returnIfNotLower } from "@/app/modules/utils";

export const getTodoActivities = ( plannedActivities: IPlannedActivity[] ): ITodoActivity[] => {
	const now = new Date().getTime();
	const planned = plannedActivities.map( a => {
		if ( a.deadline ) {
			const daysRemaining = Math.ceil( ( new Date( a.deadline ).getTime() - now ) / 86400000 );
			const days = daysRemaining > 0 ? daysRemaining : 1 + returnIfNotLower( daysRemaining / 30, -0.9 );
			return { ...a, calculatedPriority: Math.ceil( a.priority / days ), isRecommended: false };
		}
		return { ...a, calculatedPriority: a.priority, isRecommended: false };
	} );
	return planned.sort( ( a, b ) => a.calculatedPriority > b.calculatedPriority ? -1 : 1 );
};
