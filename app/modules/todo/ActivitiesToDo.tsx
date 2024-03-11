import { FadingLine } from "@/app/modules/components/FadingLine";
import { PlusOutlined } from "@/icons";
import { ITodoActivity } from "@/app/types";
import { handleUpdateTags, IHandleUpdatePlannedActivity } from "@/database/actions";
import { TodoList } from "@/app/modules/todo/TodoList";
import { useContext, useState } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";
import { Tags } from "@/app/modules/todo/Tags";
import { ITag } from "@/app/modules/profile/types";

interface IProps {
	onFormOpen: () => void;
	activities: ITodoActivity[];
	onDelete: ( action: number ) => void;
	onUpdate: IHandleUpdatePlannedActivity
	onMarkAsDone: ( activity: ITodoActivity ) => void;
	userTags: ITag[];
}
export const ActivitiesToDo = ( { onFormOpen, activities, onDelete, onUpdate, onMarkAsDone, userTags }: IProps ) => {
	const [ tags, setTags ] = useState( userTags );
	const { doneActivities } = useContext( doneModuleContext );
	const isAddButtonHighlighted = doneActivities.length === 0 && activities.length === 0;
	const onTagsUpdate = async ( clicked: ITag['label'] ) => {
		const newTags = tags.map( tag => tag.label === clicked ? { ...tag, selected: !tag.selected } : tag );
		setTags( newTags );
		await handleUpdateTags( newTags );
	};


	return (
		<>
			<div className="sticky top-0 bg-background/70 py-[0.1px] text-foreground backdrop-blur-sm">
				<h1 className="flex justify-between gap-2 my-3 mx-4 text-center text-xl">
					<span></span>
					<span className='py-0.5'>To-Do</span>
					<button className={`text-foreground p-1 bg-blue-400/20 rounded-2xl hover:bg-blue-400/50 ${isAddButtonHighlighted && 'animate-pulse'}`} onClick={onFormOpen}>
						<PlusOutlined className='w-6' />
					</button>
				</h1>
				<FadingLine/>
			</div>
			{tags.length > 0 && <div className='m-4'>
				<Tags tags={tags} onUpdate={onTagsUpdate}/>
			</div>}
			<TodoList activities={activities.filter( a => a.tags?.every( tag => tags.filter( t => t.selected ).map( t => t.label ).includes( tag ) ) || !a.tags )} onDelete={onDelete} onUpdate={onUpdate} onMarkAsDone={onMarkAsDone}/>
		</>
	);
};