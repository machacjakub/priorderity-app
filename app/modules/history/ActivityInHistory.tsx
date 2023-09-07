import {CloseOutlined} from "@ant-design/icons";
import {deleteDoneActivity} from "@/app/modules/done/doneModule";
import {IDoneActivity} from "@/app/types";

interface IProps {
    activity:IDoneActivity;
}

export const ActivityInHistory = ( {activity}: IProps ) => {
	return (
		<div key={activity.id} className="bg-blue-300/80 dark:bg-blue-400/80 bg-gradient-to-r from-violet-400/40 dark:from-violet-600/40 via-transparent to-cyan-500/30 flex justify-between text-center rounded-lg p-3 m-3">
			<div className="px-1">{activity.type}</div>
			<CloseOutlined className="p-1" onClick={async() => await deleteDoneActivity( activity.id )}/>
		</div>
	);
};