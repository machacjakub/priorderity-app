import { ITodoActivity } from "@/app/types";
import { DashboardSectionHeadingMobile } from "@/app/modules/components/mobile/DashboardSectionHeadingMobile";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { ShowMoreButton } from "@/app/modules/components/mobile/ShowMoreButton";
import { handleUpdateTags, IHandleUpdatePlannedActivity } from "@/database/actions";
import { TodoList } from "@/app/modules/todo/TodoList";
import { Tags } from "@/app/modules/todo/Tags";
import { ITag } from "@/app/modules/profile/types";
import { useState } from "react";
import { getActivitiesFilteredByTags } from "@/app/modules/todo/utils";

interface IProps {
	activities: ITodoActivity[];
	onDelete: ( action: number ) => void;
	onUpdate: IHandleUpdatePlannedActivity;
	onMarkAsDone: ( activity: ITodoActivity ) => void;
	userTags: ITag[];
}
const isTodoActivity= ( x: any ): x is ITodoActivity => x !== null;
export const ActivitiesToDoMobile = ( { activities, onDelete, onUpdate, onMarkAsDone, userTags }: IProps ) => {
	const [ tags, setTags ] = useState( userTags );
	const isPreview = useBoolean( true );
	const previewLength = 3;
	const activitiesToDisplay: ITodoActivity[] = getActivitiesFilteredByTags( activities, tags ).map( ( acitivity, i ) => {
		if ( isPreview.value && i >= previewLength ) {
			return null;
		}
		return acitivity;
	}
	).filter( isTodoActivity );

	const onTagsUpdate = async ( clicked: ITag['label'] ) => {
		const newTags = tags.map( tag => tag.label === clicked ? { ...tag, selected: !tag.selected } : tag );
		setTags( newTags );
		await handleUpdateTags( newTags );
	};
	
	return (
		<div className='mt-2'>
			<DashboardSectionHeadingMobile>To-Do</DashboardSectionHeadingMobile>
			<div className="m-2 mb-6 text-center text-foreground">
				{tags.length > 0 && <div className='m-4'>
					<Tags tags={tags} onUpdate={onTagsUpdate}/>
				</div>}
				<TodoList activities={activitiesToDisplay} onDelete={onDelete} onUpdate={onUpdate} onMarkAsDone={onMarkAsDone}/>
				{activities.length > previewLength && <ShowMoreButton isPreview={isPreview}/>}
			</div>
		</div>
	);
};
