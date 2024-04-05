import { IDoneActivity, IHealthStat, IPlannedActivity } from "@/app/types";
import { IPredefinedActivity, IRecommendation } from "@/app/modules/profile/types";
import { getTodoActivities } from "@/app/modules/todo/todoModule";
import { experimental_useOptimistic as useOptimistic } from "react";
import {
	handleAddPlannedActivity,
	handleDeletePlannedActivity, handleUpdatePlannedActivity,
	IHandleUpdatePlannedActivityArguments
} from "@/database/actions";

type IAddPlannedActivityArgs = { name: string , priority: number, deadline: Date | null, delayed_to: Date | null, tags: string[], stats: IPredefinedActivity['metrics'] };
interface IUseTodoActivitiesArgs { planned: IPlannedActivity[], healthStats: IHealthStat[], doneActivities: IDoneActivity[], recommendations: IRecommendation[], day: Date}
const useTodoActivities = ( { planned, healthStats, doneActivities, recommendations, day }: IUseTodoActivitiesArgs ) => {
	const [ activities1, addOptimistic ] = useOptimistic<IPlannedActivity[], IAddPlannedActivityArgs>( planned, ( state: IPlannedActivity[], { name, priority, deadline, delayed_to, tags, stats }: IAddPlannedActivityArgs ) =>
		[
			{
				id: 0,
				priority,
				name,
				deadline,
				delayed_to,
				created_at: new Date(),
				tags,
				stats
			},
			...state,
		] );
	const [ activities2, deleteOptimistic ] = useOptimistic<IPlannedActivity[], number>( activities1, ( state: IPlannedActivity[], deleted: number ) => {
		return state.filter( ( x ) => x.id !== deleted );
	} );

	const [ plannedActivities, updateOptimistic ] = useOptimistic<IPlannedActivity[], IHandleUpdatePlannedActivityArguments>( activities2, ( state: IPlannedActivity[], { id, name, priority, deadline, delayed_to, tags, stats }: IHandleUpdatePlannedActivityArguments ) => {
		return state.map( ( x ) => x.id === id ? { ...x, id, name, priority, deadline, delayed_to, tags, stats } : x );
	} );
	const addPlannedActivity = async ( activity: IAddPlannedActivityArgs ) => {
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

	const todoActivities = getTodoActivities( { plannedActivities, healthStats, doneActivities, recommendations, day } );

	return {
		todoActivities,
		addPlannedActivity,
		updatePlannedActivity,
		deletePlannedActivity,
	};
};

export default useTodoActivities;
