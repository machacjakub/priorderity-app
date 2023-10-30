import { TodoItem } from "@/app/modules/todo/TodoItem";
import { FadingLine } from "@/app/modules/components/FadingLine";
import { IPlannedActivity } from "@/app/types";
import { experimental_useOptimistic as useOptimistic } from "react";
import { getTodoActivities } from "@/app/modules/todo/todoModule";
import { PlusOutlined } from "@/icons";

interface IProps {
	onFormOpen: () => void;
	planned: IPlannedActivity[];
}
export const ActivitiesToDo = ( { onFormOpen, planned }: IProps ) => {
	const [ optimisticActivities, deleteOptimisticActivity ] = useOptimistic<IPlannedActivity[], number>(
		planned,
		( state: IPlannedActivity[], deletedActivity: number ) => {
			return state.filter( ( x ) => x.id !== deletedActivity );
		}
	);
	return (
		<>
			<div className="sticky top-0 backdrop-blur-sm bg-background/70">

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
				{getTodoActivities( optimisticActivities ).map( acitivity =>
					<TodoItem activity={acitivity} key={acitivity.id} onDelete={deleteOptimisticActivity}/> )}
			</div>
		</>
	);
};