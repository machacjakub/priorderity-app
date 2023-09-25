import {TodoItem} from "@/app/modules/todo/TodoItem";
import {FadingLine} from "@/app/modules/components/FadingLine";
import {PlusOutlined} from "@ant-design/icons";
import {IPlannedActivity} from "@/app/types";

interface IProps {
	onFormOpen: () => void;
	planned: IPlannedActivity[];
}
export const ActivitiesToDo = ( {onFormOpen, planned}: IProps ) => {

	return (
		<>
			<div className="sticky top-0 py-1 backdrop-blur-sm bg-background/70">
				<h1 className="flex justify-between gap-2 my-3 mx-4 text-center text-2xl">
					<span></span>
					<span>To-Do</span>
					<button className="text-foreground bg-blue-400/20 px-1 rounded-2xl hover:bg-blue-400/50" onClick={onFormOpen}><PlusOutlined className=''/></button>
				</h1>
				<FadingLine/>
			</div>
			<div className="m-2">
				{planned.map( acitivity => <TodoItem activity={acitivity} key={acitivity.id}/> )}
			</div>
		</>
	);
};