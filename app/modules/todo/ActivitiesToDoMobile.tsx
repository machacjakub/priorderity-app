import { ITodoActivity } from "@/app/types";
import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { ShowMoreButton } from "@/app/modules/components/mobile/ShowMoreButton";
import { IHandleUpdatePlannedActivity } from "@/database/actions";
import { TodoList } from "@/app/modules/todo/TodoList";

interface IProps {
	activities: ITodoActivity[];
	onDelete: ( action: number ) => void;
	onUpdate: IHandleUpdatePlannedActivity;
	onMarkAsDone: ( activity: ITodoActivity ) => void;
}
const isTodoActivity= ( x: any ): x is ITodoActivity => x !== null;
export const ActivitiesToDoMobile = ( { activities, onDelete, onUpdate, onMarkAsDone }: IProps ) => {
	const isPreview = useBoolean( true );
	const previewLength = 3;
	const activitiesToDisplay: ITodoActivity[] = activities.map( ( acitivity, i ) => {
		if ( isPreview.value && i >= previewLength ) {
			return null;
		}
		return acitivity;
	}
	).filter( isTodoActivity );
	return (
		<div className='mt-2'>
			<DashboardSectionHeadingMobile>To-Do</DashboardSectionHeadingMobile>
			<div className="m-2 mb-6 text-center text-foreground">
				<TodoList activities={activitiesToDisplay} onDelete={onDelete} onUpdate={onUpdate} onMarkAsDone={onMarkAsDone}/>
				{activities.length > previewLength && <ShowMoreButton isPreview={isPreview}/>}
			</div>
		</div>
	);
};
