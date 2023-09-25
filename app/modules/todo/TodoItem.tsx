import {IPlannedActivity} from "@/app/types";
import {CloseOutlined} from "@ant-design/icons";

export const TodoItem = ( {activity}: {activity: IPlannedActivity} ) => {
	return (
		<div className="flex justify-between bg-blue-400	m-2 py-2 px-4 rounded-xl">
			<span>{activity.priority}</span>
			<span>{activity.name}</span>
			<button className='hover:text-foreground/60'><CloseOutlined /></button>
		</div> );
};