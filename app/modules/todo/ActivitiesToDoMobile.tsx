import { TodoItem } from "@/app/modules/todo/TodoItem";
import { ITodoActivity } from "@/app/types";
import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { ShowMoreButton } from "@/app/modules/components/mobile/ShowMoreButton";

interface IProps {
	activities: ITodoActivity[];
	onDelete: ( action: number ) => void;
	onMarkAsDone: ( activity: ITodoActivity ) => void;
}
export const ActivitiesToDoMobile = ( { activities, onDelete, onMarkAsDone }: IProps ) => {
	const isPreview = useBoolean( true );
	const previewLength = 3;
	return (
		<div className='mt-2'>
			<DashboardSectionHeadingMobile>To-Do</DashboardSectionHeadingMobile>
			<div className="m-2 mb-6 text-center text-foreground">
				{activities.map(
					( acitivity, i ) => {
						if ( isPreview.value && i >= previewLength ) {
							return;
						}
						return <TodoItem activity={acitivity} key={acitivity.id} onDelete={onDelete} onMarkAsDone={onMarkAsDone}/>;} )}
				{activities.length > previewLength && <ShowMoreButton isPreview={isPreview}/>}
			</div>
		</div>
	);
};
