import { ITodoActivity } from "@/app/types";
import {
	handleUpdatePlannedActivity,
	IHandleUpdatePlannedActivity
} from "@/database/actions";
import { XOutlined } from "@/icons";
import { returnIfNotHigher } from "@/app/modules/utils";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { TodoForm } from "@/app/modules/todo/TodoForm";

interface IOptionsProps {
	onClose: () => void
	onEdit: IHandleUpdatePlannedActivity;
	activity: ITodoActivity;
}
const Options = ( { onClose, onEdit, activity }: IOptionsProps ) => {
	const formDisplayed = useBoolean( false );
	const handleClick = ( e: any ) => {
		e.stopPropagation();
	};
	return (
		<>
			{formDisplayed.value && <div className='w-screen h-screen top-0 z-30 fixed'><TodoForm onClose={formDisplayed.setFalse} isOpen={formDisplayed.value} onSubmit={onEdit} initialValue={activity}/></div>}
			<div className='fixed z-20 w-screen h-screen top-0 cursor-auto' onClick={onClose}/>
			<div className='z-30 bg-background/70 p-1 border-t rounded-b-lg flex justify-around cursor-auto' onClick={handleClick}>
				{!activity?.isRecommended && <div className='cursor-pointer' onClick={formDisplayed.setTrue}>Edit</div>}
			</div>
		</>
	);
};
interface ITodoItemProps {
	activity: ITodoActivity;
	onDelete: ( id: number ) => void;
	onMarkAsDone: ( id: number, label: string ) => void;
}
export const TodoItem = ( { activity, onDelete, onMarkAsDone }: ITodoItemProps ) => {
	const optionsDisplayed = useBoolean( false );
	const handleItemClick = async () => {
		await onMarkAsDone( activity.id, activity.name );
	};
	const handleItemRightClick = async ( event: any ) => {
		event.preventDefault();
		optionsDisplayed.toggle();
	};

	const handleDelete = async ( e: any ) => {
		e.stopPropagation();
		await onDelete( activity.id );
	};

	const priorityToDisplay = returnIfNotHigher( Math.ceil( activity.calculatedPriority ), 11 );
	const colors = [ 'border-l-priority-11', 'border-l-priority-10','border-l-priority-9','border-l-priority-8','border-l-priority-7','border-l-priority-6','border-l-priority-5','border-l-priority-4','border-l-priority-3','border-l-priority-2','border-l-priority-1', ];
	return (
		<div className={`m-2 flex flex-col rounded-lg border border-l-8 border-l-priority-${priorityToDisplay} bg-gray-500/5 cursor-pointer hover:bg-gray-500/10`}>
			<div
				className={`flex justify-between`}
				onClick={handleItemClick}
				onContextMenu={activity.isRecommended ? () => null : handleItemRightClick}
			>
				<span className="my-2 ml-4">
					{priorityToDisplay}
				</span>
				<span className="my-2">{activity.name}</span>
				<button
					className="pr-4 hover:text-foreground/60 sm:my-2 sm:mr-4 sm:pr-0"
					onClick={handleDelete}
				>
					<XOutlined className={`w-5 ${activity.isRecommended && 'text-transparent'}`}/>
				</button>
			</div>
			{optionsDisplayed.value && <Options onClose={optionsDisplayed.setFalse} onEdit={handleUpdatePlannedActivity} activity={activity} />}
		</div>
	);
};