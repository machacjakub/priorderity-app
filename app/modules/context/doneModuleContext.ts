import { createContext } from "react";
import { IDoneActivity, IHealthStat } from "@/app/types";
import { IPredefinedActivity } from "@/app/modules/profile/types";
import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import { IAddDoneActivityArguments } from "@/database/actions";

export interface IDoneActivitiesModule {
    doneActivities: IDoneActivity[];
    addDoneActivity: ( newDoneActivity: IAddDoneActivityArguments ) => void;
    deleteDoneActivity: ( activityId: number ) => void;
    predefinedActivities: IPredefinedActivity[];
    currentHealthStats: IHealthStat[];
    selectedHealthStats: IHealthStat[];
}

const defaultValue: IDoneActivitiesModule = {
	doneActivities: [],
	addDoneActivity: ( newDoneActivity ) => null,
	deleteDoneActivity: ( activityId: number ) => null,
	predefinedActivities: getPredefinedActivitiesAttributes(),
	currentHealthStats: [],
	selectedHealthStats: []
};
const doneModuleContext = createContext<IDoneActivitiesModule>( defaultValue );

export default doneModuleContext;