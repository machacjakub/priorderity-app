import { ITodoActivity } from "@/app/types";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { ShowMoreButton } from "@/app/modules/components/mobile/ShowMoreButton";
import { handleUpdateTags } from "@/database/actions";
import { TodoList } from "@/app/modules/todo/TodoList";
import { Tags } from "@/app/modules/todo/Tags";
import { ITag } from "@/app/modules/profile/types";
import { useContext, useState } from "react";
import { getActivitiesFilteredByTags, getDay } from "@/app/modules/todo/utils";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@/icons";
import { IDayReducerAction, isSameDay } from "@/app/utils/date";
import todoModuleContext from "@/app/modules/context/todoModuleContext";

interface IProps {
	userTags: ITag[];
	day: Date;
	setDay: ( action: IDayReducerAction ) => void
}
const isTodoActivity= ( x: any ): x is ITodoActivity => x !== null;
export const ActivitiesToDoMobile = ( { userTags, day, setDay }: IProps ) => {
	const { todoActivities } = useContext( todoModuleContext );
	const [ tags, setTags ] = useState( userTags );
	const isPreview = useBoolean( true );
	const previewLength = 3;
	const activitiesToDisplay: ITodoActivity[] = getActivitiesFilteredByTags( todoActivities, tags ).map( ( activity, i ) => {
		if ( isPreview.value && i >= previewLength ) {
			return null;
		}
		return activity;
	}
	).filter( isTodoActivity );

	const onTagsUpdate = async ( clicked: ITag['label'] ) => {
		const newTags = tags.map( tag => tag.label === clicked ? { ...tag, selected: !tag.selected } : tag );
		setTags( newTags );
		await handleUpdateTags( newTags );
	};
	
	return (
		<div className='mt-2'>
			<div className='text-foreground text-xl flex justify-between mx-5 gap-3'>
				{isSameDay( day, new Date() ) ? <span className={'w-6'}/> : <button onClick={() => setDay( 'decrement_day' )} className='p-0.5 px-1 bg-blue-400/20 rounded-2xl'><ArrowLeftOutlined className='w-6 my-0.5'/></button>}
				<span className='py-0.5'>{getDay( day )}</span>
				<button onClick={() => setDay( 'increment_day' )} className='p-0.5 px-1 bg-blue-400/20 rounded-2xl'><ArrowRightOutlined className='w-6 my-0.5'/></button>
			</div>
			<div className="m-2 mb-6 text-center text-foreground">
				{tags.length > 0 && <div className='m-4'>
					<Tags tags={tags} onUpdate={onTagsUpdate}/>
				</div>}
				<TodoList activities={activitiesToDisplay}/>
				{todoActivities.length > previewLength && <ShowMoreButton isPreview={isPreview}/>}
			</div>
		</div>
	);
};
