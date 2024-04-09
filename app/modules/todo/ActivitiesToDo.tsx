import { FadingLine } from "@/app/modules/components/FadingLine";
import { ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined } from "@/icons";
import { handleUpdateTags } from "@/database/actions";
import { TodoList } from "@/app/modules/todo/TodoList";
import { useContext, useState } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";
import { Tags } from "@/app/modules/todo/Tags";
import { ITag } from "@/app/modules/profile/types";
import { getActivitiesFilteredByTags, getDay } from "@/app/modules/todo/utils";
import { IDayReducerAction, isSameDay } from "@/app/utils/date";
import todoModuleContext from "@/app/modules/context/todoModuleContext";

interface IProps {
	onFormOpen: () => void;
	userTags: ITag[];
	day: Date;
	setDay: ( action: IDayReducerAction ) => void
}
export const ActivitiesToDo = ( { onFormOpen, userTags, day, setDay }: IProps ) => {
	const { todoActivities } = useContext( todoModuleContext );
	const [ tags, setTags ] = useState( userTags );
	const { doneActivities } = useContext( doneModuleContext );
	const isAddButtonHighlighted = doneActivities.length === 0 && todoActivities.length === 0;
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
					{isSameDay( day, new Date() ) ? <span className={'w-6'}/> : <button onClick={() => setDay( 'decrement_day' )} className='p-0.5 px-1 bg-blue-400/20 rounded-2xl'><ArrowLeftOutlined className='w-6'/></button>}
					<span className='py-0.5'>{getDay( day )}</span>
					<button onClick={() => setDay( 'increment_day' )} className='p-0.5 px-1 bg-blue-400/20 rounded-2xl'><ArrowRightOutlined className='w-6 my-0.5'/></button>
					<button className={`text-foreground p-1 bg-blue-400/20 rounded-2xl hover:bg-blue-400/50 ${isAddButtonHighlighted && 'animate-pulse'}`} onClick={onFormOpen}>
						<PlusOutlined className='w-6' />
					</button>
				</h1>
				<FadingLine/>
				{tags.length > 0 && <div className='m-4'>
					<Tags tags={tags} onUpdate={onTagsUpdate}/>
				</div>}
			</div>
			<TodoList activities={getActivitiesFilteredByTags( todoActivities, tags )} />
		</>
	);
};