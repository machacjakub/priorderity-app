import { experimental_useOptimistic as useOptimistic } from "react";
import { IPlannedActivity } from "@/app/types";
import {
	handleAddPlannedActivity,
	handleDeletePlannedActivity,
	handleMarkAsDone, handleUpdatePlannedActivity,
	IHandleUpdatePlannedActivityArguments
} from "@/database/actions";

type IAddPlannedActivityArguments = { name: string , priority: number, deadline: Date | null };
const useTodoActivities = ( initial: IPlannedActivity[] ) => {
	const [ activities, addOptimistic ] = useOptimistic<IPlannedActivity[], IAddPlannedActivityArguments>( initial, ( state: IPlannedActivity[], { name, priority, deadline }: IAddPlannedActivityArguments ) =>
		[
			{
				id: 0,
				priority,
				name,
				deadline,
				created_at: new Date(),
			},
			...state,
		] );
	const [ activities1, deleteOptimistic ] = useOptimistic<IPlannedActivity[], number>( activities, ( state: IPlannedActivity[], deleted: number ) => {
    	return state.filter( ( x ) => x.id !== deleted );
	} );

	const [ plannedActivities, updateOptimistic ] = useOptimistic<IPlannedActivity[], IHandleUpdatePlannedActivityArguments>( activities1, ( state: IPlannedActivity[], { id, name, priority, deadline }: IHandleUpdatePlannedActivityArguments ) => {
		return state.map( ( x ) => x.id === id ? { ...x, id, name, priority, deadline } : x );
	} );
	const addPlannedActivity = async ( activity: IAddPlannedActivityArguments ) => {
		addOptimistic( activity );
		await handleAddPlannedActivity( activity );
	};

	const deletePlannedActivity = async ( activityId: number ) => {
		deleteOptimistic( activityId );
		await handleDeletePlannedActivity( activityId );
	};

	const markPlannedActivityAsDone = async ( activityId: number, label: string ) => {
		deleteOptimistic( activityId );
		await handleMarkAsDone( activityId, label );
	};

	const updatePlannedActivity = async ( activity: IHandleUpdatePlannedActivityArguments ) => {
		updateOptimistic( activity );
		await handleUpdatePlannedActivity( activity );
	};
	return {
		plannedActivities,
		addPlannedActivity,
		updatePlannedActivity,
		markPlannedActivityAsDone,
		deletePlannedActivity,
	};
};

export default useTodoActivities;
