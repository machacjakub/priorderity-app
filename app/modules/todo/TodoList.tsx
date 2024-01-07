import { TodoItem } from "@/app/modules/todo/TodoItem";
import { ITodoActivity } from "@/app/types";
import { IHandleUpdatePlannedActivity } from "@/database/actions";
import Link from "next/link";
import { useContext } from "react";
import doneModuleContext from "@/app/modules/context/doneModuleContext";
import { CheckOutlined } from "@/icons";

interface IProps {
    activities: ITodoActivity[];
    onDelete: ( action: number ) => void;
    onUpdate: IHandleUpdatePlannedActivity
    onMarkAsDone: ( activity: ITodoActivity ) => void;
}

const isTodoActivity= ( x: any ): x is ITodoActivity => x !== null;
export const TodoList = ( { activities, onDelete, onUpdate, onMarkAsDone }: IProps ) => {
	const { doneActivities } = useContext( doneModuleContext );
	if ( activities.length === 0 && doneActivities.length < 2 ) {
		return (
			<div className='text-center text-foreground'>
				<p className='my-4 text-foreground/70'>{`Your todo list is empty for now.`}</p>
				<p className='my-4 mx-10 text-sm text-foreground/40'>{`Let's start by clicking on the pulsing '+' button and add some items to the todo list.`}</p>
				<p>OR</p>
				<Link href='/guide'><button className='my-4 py-2 px-4 rounded-lg dark:bg-blue-900 dark:outline outline-offset-2 outline-blue-300/20 bg-blue-200 drop-shadow-lg hover:drop-shadow-none hover:bg-blue-500/20 hover:outline-blue-500'>See the guide</button></Link>
			</div> );
	}
	if ( activities.length === 0 ) {
		return (
			<div className='flex h-10 p-10 justify-center'>
				<div className='p-1.5 rounded-full w-min h-min bg-green-500/20 border-4 border-green-500 relative right-4 bottom-2'><CheckOutlined className='w-5'/></div>
				<p className='text-foreground/90 my-auto relative'>
					Good job
				</p>
			</div> );
	}
	return <div className="m-2 mb-20 text-foreground">
		{activities.filter( isTodoActivity ).map( activity =>
			<TodoItem onUpdate={onUpdate} activity={activity} key={activity.id} onDelete={onDelete} onMarkAsDone={onMarkAsDone} /> )}
	</div>;
};