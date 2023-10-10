import { ITodoActivity } from "@/app/types";
import { CloseOutlined } from "@ant-design/icons";
import { handleDeletePlannedActivity, handleMarkAsDone } from "@/database/actions";

export const TodoItem = ( { activity, onDelete, }: { activity: ITodoActivity; onDelete: ( id: number ) => void; } ) => {
	const handleInteraction = async () => {
		onDelete( activity.id );
		await handleMarkAsDone( activity.id, activity.name );
	};

	const handleDelete = async ( e: any ) => {
		e.stopPropagation();
		onDelete( activity.id );
		await handleDeletePlannedActivity( activity.id );
	};
	const colors = [ 'border-l-priority-10','border-l-priority-9','border-l-priority-8','border-l-priority-7','border-l-priority-6','border-l-priority-5','border-l-priority-4','border-l-priority-3','border-l-priority-2','border-l-priority-1', ];
	return (
		<div
			className={`m-2 flex justify-between rounded-lg border border-l-8 border-l-priority-${activity.calculatedPriority} bg-gray-500/5`}
			onClick={handleInteraction}
		>
			<span className="my-2 ml-4">
				{activity.calculatedPriority}
			</span>
			<span className="my-2">{activity.name}</span>
			<button
				className="pr-4 hover:text-foreground/60 sm:my-2 sm:mr-4 sm:pr-0"
				onClick={handleDelete}
			>
				<CloseOutlined />
			</button>
		</div>
	);
};