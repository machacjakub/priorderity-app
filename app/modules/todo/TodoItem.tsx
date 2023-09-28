import {IPlannedActivity} from "@/app/types";
import {CloseOutlined} from "@ant-design/icons";
import {handleDeletePlannedActivity} from "@/database/actions";

export const TodoItem = ( {activity, onDelete}: {activity: IPlannedActivity, onDelete: ( id: number ) => void} ) => {
	return (
		<div className="flex justify-between bg-blue-300/80 m-2 py-2 px-4 rounded-xl">
			<span>{activity.priority}</span>
			<span>{activity.name}</span>
			<form className='hover:text-foreground/60' action={async () => {
				onDelete( activity.id );
				await handleDeletePlannedActivity( activity.id );
			}}><button><CloseOutlined /></button></form>
		</div> );
};