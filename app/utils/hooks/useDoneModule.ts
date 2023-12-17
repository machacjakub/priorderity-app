import { experimental_useOptimistic as useOptimistic } from "react";
import { IDoneActivity, IHealthMetric } from "@/app/types";
import { IDoneActivitiesModule } from "@/app/modules/context/doneModuleContext";
import { handleAddDoneActivity, handleDeleteDoneActivity } from "@/database/actions";
import { defaultMetrics } from "@/app/App";
import { getPredefinedActivitiesAttributes } from "@/app/modules/attributes-stats/predefinedActivities";
import { getHealthStats, isNotHidden } from "@/app/modules/health-bars/utils";
import { Nullable } from "fputils";
import { IUserData } from "@/app/modules/profile/types";

const useDoneModule = ( initial: IDoneActivity[], userData: Nullable<IUserData> ): IDoneActivitiesModule => {
	const userMetrics: IHealthMetric[] = userData?.metrics ?? defaultMetrics;
	const predefinedActivities = userData?.activities_stats ?? getPredefinedActivitiesAttributes();
	const [ activities1, optimisticAdd ] = useOptimistic<IDoneActivity[], {label: string , type: string}>(
		initial, ( state: IDoneActivity[], { label, type }: {label: string , type: string} ) => [ {
			id: state[0]?.id + 1, type, label, created_at: new Date()
		}, ...state, ]
	);
	const [ doneActivities, optimisticDelete ] = useOptimistic<IDoneActivity[], number>( activities1, ( state: IDoneActivity[], deleted: number ) => {
		return state.filter( ( x ) => x.id !== deleted );
	} );
	const addDoneActivity = async ( newDoneActivity: { label: string; type: string; } ) => {
		optimisticAdd( newDoneActivity );
		await handleAddDoneActivity( newDoneActivity );
	};

	const deleteDoneActivity = async ( activityId: number ) => {
		optimisticDelete( activityId );
		await handleDeleteDoneActivity( activityId );
	};
	const healthStats = getHealthStats( doneActivities, userMetrics.filter( isNotHidden ), predefinedActivities );
	return { doneActivities, addDoneActivity, deleteDoneActivity, predefinedActivities, healthStats };
};

export default useDoneModule;
