import { TodoItem } from "@/app/modules/todo/TodoItem";
import { FadingLine } from "@/app/modules/components/FadingLine";
import { PlusOutlined } from "@ant-design/icons";
import { IPlannedActivity } from "@/app/types";
import { experimental_useOptimistic as useOptimistic } from "react";

interface IProps {
	onFormOpen: () => void;
	planned: IPlannedActivity[];
}
export const ActivitiesToDo = ({ onFormOpen, planned }: IProps) => {
	const [optimisticActivities, deleteOptimisticActivity] =
		useOptimistic<IPlannedActivity[], number>(
			planned,
			(
				state: IPlannedActivity[],
				deletedActivity: number,
			) => {
				return state.filter(
					(x) =>
						x.id !==
						deletedActivity,
				);
			},
		);
	return (
		<>
			<div className="sticky top-0 bg-background/70 py-1 backdrop-blur-sm">
				<h1 className="mx-4 my-3 flex justify-between gap-2 text-center text-2xl">
					<span></span>
					<span>To-Do</span>
					<button
						className="rounded-2xl bg-blue-400/20 px-1 text-foreground hover:bg-blue-400/50"
						onClick={onFormOpen}
					>
						<PlusOutlined />
					</button>
				</h1>
				<FadingLine />
			</div>
			<div className="m-2 mb-20 text-foreground">
				{optimisticActivities.map(
					(acitivity) => (
						<TodoItem
							activity={
								acitivity
							}
							key={
								acitivity.id
							}
							onDelete={
								deleteOptimisticActivity
							}
						/>
					),
				)}
			</div>
		</>
	);
};
