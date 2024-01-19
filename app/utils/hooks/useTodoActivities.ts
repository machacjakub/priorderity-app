import { IDoneActivity, IHealthStat, IPlannedActivity } from "@/app/types";


import { IRecommendation } from "@/app/modules/profile/types";
import { getTodoActivities } from "@/app/modules/todo/todoModule";
import { experimental_useOptimistic as useOptimistic } from "react";
import {
	handleAddPlannedActivity,
	handleDeletePlannedActivity, handleUpdatePlannedActivity,
	IHandleUpdatePlannedActivityArguments
} from "@/database/actions";

type IAddPlannedActivityArguments = { name: string , priority: number, deadline: Date | null, delayed_to: Date | null };
const useTodoActivities = ( { planned, healthStats, doneActivities, recommendations }: { planned: IPlannedActivity[], healthStats: IHealthStat[], doneActivities: IDoneActivity[], recommendations: IRecommendation[]} ) => {
	const [ activities1, addOptimistic ] = useOptimistic<IPlannedActivity[], IAddPlannedActivityArguments>( planned, ( state: IPlannedActivity[], { name, priority, deadline, delayed_to }: IAddPlannedActivityArguments ) =>
		[
			{
				id: 0,
				priority,
				name,
				deadline,
				delayed_to,
				created_at: new Date(),
			},
			...state,
		] );
	const [ activities2, deleteOptimistic ] = useOptimistic<IPlannedActivity[], number>( activities1, ( state: IPlannedActivity[], deleted: number ) => {
		return state.filter( ( x ) => x.id !== deleted );
	} );

	const [ plannedActivities, updateOptimistic ] = useOptimistic<IPlannedActivity[], IHandleUpdatePlannedActivityArguments>( activities2, ( state: IPlannedActivity[], { id, name, priority, deadline, delayed_to }: IHandleUpdatePlannedActivityArguments ) => {
		return state.map( ( x ) => x.id === id ? { ...x, id, name, priority, deadline, delayed_to } : x );
	} );
	const addPlannedActivity = async ( activity: IAddPlannedActivityArguments ) => {
		addOptimistic( activity );
		await handleAddPlannedActivity( activity );
	};

	const deletePlannedActivity = async ( activityId: number ) => {
		deleteOptimistic( activityId );
		await handleDeletePlannedActivity( activityId );
	};

	const updatePlannedActivity = async ( activity: IHandleUpdatePlannedActivityArguments ) => {
		updateOptimistic( activity );
		await handleUpdatePlannedActivity( activity );
	};

	const todoActivities = getTodoActivities( { plannedActivities, healthStats, doneActivities, recommendations } ).filter( ( activity ) => {
		if ( !activity.delayed_to ) {
			return true;
		}
		return new Date( activity.delayed_to ).getTime() < new Date().getTime();
	} );
	
	return {
		todoActivities,
		addPlannedActivity,
		updatePlannedActivity,
		deletePlannedActivity,
	};
};

export default useTodoActivities;
