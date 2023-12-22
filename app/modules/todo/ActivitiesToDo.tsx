import { TodoItem } from "@/app/modules/todo/TodoItem";
import { FadingLine } from "@/app/modules/components/FadingLine";
import { PlusOutlined } from "@/icons";
import { ITodoActivity } from "@/app/types";
import { IHandleUpdatePlannedActivity } from "@/database/actions";

interface IProps {
	onFormOpen: () => void;
	activities: ITodoActivity[];
	onDelete: ( action: number ) => void;
	onUpdate: IHandleUpdatePlannedActivity
	onMarkAsDone: ( activity: ITodoActivity ) => void;
}
export const ActivitiesToDo = ( { onFormOpen, activities, onDelete, onUpdate, onMarkAsDone }: IProps ) => {
	return (
		<>
			<div className="sticky top-0 bg-background/70 py-[0.1px] text-foreground backdrop-blur-sm">
				<h1 className="flex justify-between gap-2 my-3 mx-4 text-center text-xl">
					<span></span>
					<span className='py-0.5'>To-Do</span>
					<button className="text-foreground p-1 bg-blue-400/20 rounded-2xl hover:bg-blue-400/50" onClick={onFormOpen}>
						<PlusOutlined className='w-6' />
					</button>
				</h1>
				<FadingLine/>
			</div>
			<div className="m-2 mb-20 text-foreground">
				{activities.map( acitivity =>
					<TodoItem onUpdate={onUpdate} activity={acitivity} key={acitivity.id} onDelete={onDelete} onMarkAsDone={onMarkAsDone} /> )}
			</div>
		</>
	);
};