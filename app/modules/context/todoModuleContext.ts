import { createContext } from "react";
import { IPlannedActivity, ITodoActivity } from "@/app/types";
import { IHandleUpdatePlannedActivityArguments } from "@/database/actions";
import { IRecommendation } from "@/app/modules/profile/types";

export interface ITodoModule {

    todoActivities: ITodoActivity[];
    addPlannedActivity: ( activity: IPlannedActivity ) => void;
    updatePlannedActivity: ( activity: IHandleUpdatePlannedActivityArguments ) => void;
    deletePlannedActivity: ( id: number ) => void;
    handleMarkTodoActivityAsDone: ( activity: ITodoActivity ) => void;
    updateRecommendations: ( newRecommendations: IRecommendation[] ) => void;
    recommendations: IRecommendation[];

}

const defaultValue: ITodoModule = {
	todoActivities: [],
	addPlannedActivity: ( activity: IPlannedActivity ) => null,
	updatePlannedActivity: ( activity: IHandleUpdatePlannedActivityArguments ) => null,
	deletePlannedActivity: ( id: number ) => null,
	handleMarkTodoActivityAsDone: ( activity: ITodoActivity ) => null,
	updateRecommendations: ( newRecommendations ) => null,
	recommendations: [],
};
const todoModuleContext = createContext<ITodoModule>( defaultValue );

export default todoModuleContext;