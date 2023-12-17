import { createContext } from "react";
import { IDoneActivity, IHealthStat } from "@/app/types";
import { IPredefinedActivity } from "@/app/modules/profile/types";
import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";

export interface IDoneActivitiesModule {
    doneActivities: IDoneActivity[];
    addDoneActivity: ( newDoneActivity: { label: string; type: string; } ) => void;
    deleteDoneActivity: ( activityId: number ) => void;
    predefinedActivities: IPredefinedActivity[];
    healthStats: IHealthStat[];
}

const defaultValue: IDoneActivitiesModule = {
	doneActivities: [],
	addDoneActivity: ( newDoneActivity ) => null,
	deleteDoneActivity: ( activityId: number ) => null,
	predefinedActivities: getPredefinedActivitiesAttributes(),
	healthStats: []
};
const doneModuleContext = createContext<IDoneActivitiesModule>( defaultValue );

export default doneModuleContext;