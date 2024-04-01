import { IDoneActivity } from "@/app/types";
import {
	handleDeleteDoneActivity
} from "@/database/actions";
import { EditOutlined, XOutlined } from "@/icons";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { EditDoneDateForm } from "@/app/modules/history/EditDoneDateForm";

interface IProps {
	activity: IDoneActivity;
	handleDelete: ( id: number ) => void;
	editing: boolean;
}

export const ActivityInHistory = ( { activity, handleDelete, editing }: IProps ) => {
	const formDisplayed = useBoolean( false );
	//TODO dodelat zobrazeni activity.label
	return (
		<div
			key={activity.id}
			className="align-middle m-1.5 flex justify-between rounded-lg bg-background p-1 text-center"
		>
			{formDisplayed.value &&
				<div className='w-screen h-screen top-0 left-0 z-50 fixed'>
					<EditDoneDateForm onClose={formDisplayed.setFalse} isOpen={formDisplayed.value} activity={activity}/>
				</div>}
			<div className="px-1">{activity.label ?? activity.type}</div>
			{editing &&
				<div className='p-0 mr-0.5 w-12 h-5 flex gap-2'>
					<button value={activity.id} name="id" className='hover:text-foreground/50' onClick={formDisplayed.setTrue}>
						<EditOutlined className='w-5 mt-0.5'/>
					</button>
					<form
						action={async ( formData ) => {
							const id = formData.get( "id" );
							await handleDelete( Number( id ) );
							await handleDeleteDoneActivity( Number( id ) );
						}}
					>
						<button value={activity.id} name="id" className='hover:text-foreground/50'>
							<XOutlined className='w-5 mt-0.5'/>
						</button>
					</form>
				</div>}
		</div>
	);
};
