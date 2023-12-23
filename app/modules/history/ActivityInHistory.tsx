import { IDoneActivity } from "@/app/types";
import { handleDeleteDoneActivity } from "@/database/actions";
import { XOutlined } from "@/icons";

interface IProps {
	activity: IDoneActivity;
	handleDelete: ( id: number ) => void;
}

export const ActivityInHistory = ( { activity, handleDelete }: IProps ) => {
	//TODO dodelat zobrazeni activity.label
	return (
		<div
			key={activity.id}
			className="align-middle m-1.5 flex justify-between rounded-lg bg-background p-1 text-center"
		>
			<div className="px-1">{activity.label ?? activity.type}</div>
			<form
				action={async ( formData ) => {
					const id = formData.get( "id" );
					await handleDelete( Number( id ) );
					await handleDeleteDoneActivity( Number( id ) );
				}}
				className='p-0 m-0 w-6 h-6'
			>
				<button value={activity.id} name="id" className='hover:text-foreground/50'>
					<XOutlined className='w-5 mt-0.5'/>
				</button>
			</form>
		</div>
	);
};
