import { experimental_useOptimistic as useOptimistic } from "react";
import { IDoneActivity } from "@/app/types";

const useDoneActivities = ( initial: IDoneActivity[] ) => {
	const [ activities1, addDoneActivity ] = useOptimistic<IDoneActivity[], string>(
		initial,
		( state: IDoneActivity[], newActivityType: string ) => [
			{ id: state[0].id + 1, type: newActivityType, created_at: new Date() },
			...state,
		] 
	);
	const [ doneActivities, deleteDoneActivity ] = useOptimistic<IDoneActivity[], number>(
		activities1,
		( state: IDoneActivity[], deleted: number ) => {
			return state.filter( ( x ) => x.id !== deleted );
		}
	);
	return {
		doneActivities,
		addDoneActivity,
		deleteDoneActivity
	};
};

export default useDoneActivities;