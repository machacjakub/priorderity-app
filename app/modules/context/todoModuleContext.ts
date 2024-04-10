import { createContext } from "react";
import { IPlannedActivity, ITodoActivity } from "@/app/types";

export interface ITodoModule {

    todoActivities: ITodoActivity[];
    addPlannedActivity: ( activity: IPlannedActivity ) => void;
    updatePlannedActivity: ( activity: IPlannedActivity ) => void;
    deletePlannedActivity: ( id: number ) => void;

}

const defaultValue: ITodoModule = {
	todoActivities: [],
	addPlannedActivity: ( activity: IPlannedActivity ) => null,
	updatePlannedActivity: ( activity: IPlannedActivity ) => null,
	deletePlannedActivity: ( id: number ) => null,
};
const todoModuleContext = createContext<ITodoModule>( defaultValue );

export default todoModuleContext;