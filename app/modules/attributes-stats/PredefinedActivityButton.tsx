import {handleAddDoneActivity} from "@/database/actions";

interface IProps {
    activity: {type: string};
	handleAdd: ( type: string ) => void;
}

export const PredefinedActivityButton = ( {activity, handleAdd }: IProps ) => {

	return (
		<form action={async formData => {
			const type = formData.get( 'type' );
			await handleAdd( String( type ) );
			await handleAddDoneActivity( String( type ) );
		}
		} >
			<button className="bg-blue-300/80 dark:bg-blue-400/80 bg-gradient-to-r from-violet-400/40 dark:from-violet-600/40 via-transparent to-cyan-500/30 text-foreground rounded-lg px-2 py-3 sm:px-3 w-28 sm:w-44 text-xs sm:text-base flex-grow max-w-40 text-background" value={activity.type} name='type'>
				{activity.type}
			</button>
		</form>
	);
};