import { CloseOutlined } from "@ant-design/icons";
import { IDoneActivity } from "@/app/types";
import { handleDeleteDoneActivity } from "@/database/actions";

interface IProps {
    activity:IDoneActivity;
	handleDelete: ( id: number ) => void
}
 
export const ActivityInHistory = ( { activity, handleDelete }: IProps ) => {
	return (
		<div key={activity.id} className="bg-blue-300/80 dark:bg-blue-400/80 bg-gradient-to-r from-violet-400/40 dark:from-violet-600/40 via-transparent to-cyan-500/30 flex justify-between text-center rounded-lg p-1 m-1.5">
			<div className="px-1">{activity.type}</div>
			<form action={async formData => {
				const id = formData.get( 'id' );
				await handleDelete( Number( id ) );
				await handleDeleteDoneActivity( Number( id ) );
			}}>
				<button value={activity.id} name="id">
					<CloseOutlined className="p-1" />
				</button>
			</form>
		</div>
	);
};