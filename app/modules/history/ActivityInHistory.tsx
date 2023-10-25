import { IDoneActivity } from "@/app/types";
import { handleDeleteDoneActivity } from "@/database/actions";
import { XOutlined } from "@/icons";

interface IProps {
	activity: IDoneActivity;
	handleDelete: ( id: number ) => void;
}

export const ActivityInHistory = ( { activity, handleDelete }: IProps ) => {
	return (
		<div
			key={activity.id}
			className="p-0 align-middle m-1.5 flex justify-between rounded-lg bg-blue-300/80 bg-gradient-to-r from-violet-400/40 via-transparent to-cyan-500/30 p-1 text-center dark:bg-blue-400/80 dark:from-violet-600/40"
		>
			<div className="px-1">{activity.type}</div>
			<form
				action={async ( formData ) => {
					const id = formData.get( "id" );
					await handleDelete( Number( id ) );
					await handleDeleteDoneActivity( Number( id ) );
				}}
				className='p-0 m-0 w-6 h-6'
			>
				<button value={activity.id} name="id">
					<XOutlined className='w-5 mt-0.5'/>
				</button>
			</form>
		</div>
	);
};
