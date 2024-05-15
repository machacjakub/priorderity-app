import { ITodoActivity } from "@/app/types";
import { IHandleUpdatePlannedActivityArguments } from "@/database/actions";
import { XOutlined } from "@/icons";
import { returnIfNotHigher } from "@/app/modules/utils";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { TodoForm } from "@/app/modules/todo/TodoForm";
import { useContext } from "react";
import userDataContext from "@/app/modules/context/userDataContext";
import { useTouch } from "@/app/utils/hooks/useTouch";
import { Responsive } from "@/app/modules/components/Responsive";
import todoModuleContext from "@/app/modules/context/todoModuleContext";
import { TodoItemOptions } from "@/app/modules/todo/TodoItemOptions";

interface ICommonProps {
	activity: ITodoActivity;
}

export const Common = ( { activity }: ICommonProps ) => {
	const { deletePlannedActivity } = useContext( todoModuleContext );
	const handleDelete = async ( e: any ) => {
		e.stopPropagation();
		await deletePlannedActivity( activity.id );
	};

	const priorityToDisplay = returnIfNotHigher( Math.ceil( activity.calculatedPriority ), 11 );
	return (
		<>
			<span className="my-2 mx-2 w-7 text-center text-sm pt-0.5 text-transparent group-hover:text-foreground/70 group-hover:bg-foreground/10 rounded-full">
				{priorityToDisplay}
			</span>
			<div className='flex justify-between w-full' >
				<span className="my-2">{activity.name}</span>
				<button className="pr-4 hover:text-foreground/60 sm:my-2 sm:mr-4 sm:pr-0" onClick={handleDelete}>
					<XOutlined className={`w-5 ${activity.isRecommended && 'text-transparent'}`}/>
				</button>
			</div>
		</>
	);
};

interface ITodoItemProps {
	activity: ITodoActivity;
}
export const TodoItem = ( { activity }: ITodoItemProps ) => {
	const { handleMarkTodoActivityAsDone, updatePlannedActivity } = useContext( todoModuleContext );
	const userData = useContext( userDataContext );
	const optionsDisplayed = useBoolean( false );
	const formDisplayed = useBoolean( false );
	const { onTouchStart, onTouchEnd, onTouchMove } = useTouch( {
		onHold: async () => {
			optionsDisplayed.setTrue();
		},
		onTap: async () => {
			await handleMarkTodoActivityAsDone( activity );
		},
	} );

	const handleItemClick = async () => {
		await handleMarkTodoActivityAsDone( activity );
	};
	const handleItemRightClick = async ( event: any ) => {
		event.preventDefault();
		optionsDisplayed.setTrue();
	};

	const onFormEdit = async ( activity: IHandleUpdatePlannedActivityArguments ) => {
		optionsDisplayed.setFalse();
		formDisplayed.setFalse();
		await updatePlannedActivity( activity );
	};

	const priorityToDisplay = returnIfNotHigher( Math.ceil( activity.calculatedPriority ), 11 );
	const userTags = userData?.tags?.map( tag => activity?.tags?.includes( tag.label ) ? { ...tag, selected: true } : { ...tag, selected: false } ) ?? [];
	const _colors = [ 'border-l-priority-11', 'border-l-priority-10','border-l-priority-9','border-l-priority-8','border-l-priority-7','border-l-priority-6','border-l-priority-5','border-l-priority-4','border-l-priority-3','border-l-priority-2','border-l-priority-1', ];
	return (
		<>
			{formDisplayed.value && <div className='w-screen h-screen top-0 z-30 fixed'><TodoForm onClose={formDisplayed.setFalse} isOpen={formDisplayed.value} onUpdate={onFormEdit} initialValue={activity} userTags={userTags}/></div>}
			<Responsive.Desktop>
				<div className={`group m-2 flex flex-col rounded-lg border-l-8 border-l-priority-${priorityToDisplay} bg-gradient-to-r from-gray-500/10 to-blue-400/30 cursor-pointer hover:bg-gray-500/20`}>
					<div
						className='flex'
						onClick={handleItemClick}
						onContextMenu={handleItemRightClick}
					>
						<Common activity={activity} />
					</div>
					{optionsDisplayed.value && <TodoItemOptions onClose={optionsDisplayed.setFalse} activity={activity} formDisplayed={formDisplayed} />}
				</div>
			</Responsive.Desktop>
			<Responsive.Mobile>
				<div className={`select-none group m-2 flex flex-col rounded-lg border-l-8 border-l-priority-${priorityToDisplay} bg-gradient-to-r from-gray-500/10 to-blue-400/30 cursor-pointer hover:bg-gray-500/20`}>
					<div
						className='flex '
						onContextMenu={( e ) => e.preventDefault()}
						onTouchStart={onTouchStart}
						onTouchEnd={onTouchEnd}
						onTouchMove={onTouchMove}
					>
						<Common activity={activity} />
					</div>
					{optionsDisplayed.value && <TodoItemOptions onClose={optionsDisplayed.setFalse} activity={activity} formDisplayed={formDisplayed} />}
				</div>
			</Responsive.Mobile>
		</>
	);
};