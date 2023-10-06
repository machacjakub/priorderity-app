import {TodoItem} from "@/app/modules/todo/TodoItem";
import { IPlannedActivity} from "@/app/types";
import {experimental_useOptimistic as useOptimistic} from "react";
import {DashboardSectionHeadingMobile} from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import useBoolean from "@/app/utils/hooks/useBoolean";
import {ShowMoreButton} from "@/app/modules/components/mobile/ShowMoreButton";

interface IProps {
	onFormOpen: () => void;
	planned: IPlannedActivity[];
}
export const ActivitiesToDoMobile = ( {onFormOpen, planned}: IProps ) => {
	const isPreview = useBoolean( true );
	const [optimisticActivities, deleteOptimisticActivity] = useOptimistic<IPlannedActivity[], number>(
		planned,
		( state: IPlannedActivity[], deletedActivity: number ) => {
			return state.filter( ( x ) => x.id !== deletedActivity );
		}
	);
	return (
		<div className='mt-2'>
			<DashboardSectionHeadingMobile>To-Do</DashboardSectionHeadingMobile>
			<div className="m-2 mb-6 text-center">
				{optimisticActivities.map( ( acitivity, i ) => {
					if ( isPreview.value && i > 2 ) {
						return;
					}
					return <TodoItem activity={acitivity} key={acitivity.id} onDelete={deleteOptimisticActivity}/>;} )}
				<ShowMoreButton isPreview={isPreview}/>
			</div>
		</div>
	);
};