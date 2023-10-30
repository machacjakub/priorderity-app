import { handleAddDoneActivity } from "@/database/actions";

interface IProps {
	activity: { label: string, type: string };
	handleAdd: ( type: string ) => void;
}

export const PredefinedActivityButton = ( { activity, handleAdd }: IProps ) => {
	return (
		<form
			action={async ( formData ) => {
				const type = formData.get( "type" );
				await handleAdd( String( type ) );
				await handleAddDoneActivity(
					String( type ),
				);
			}}
		>
			<button
				className="h-12 w-28 border border-blue-500 transition transform transition-colors duration-300 bg-blue-500/20 hover:bg-blue-500/40 flex-grow rounded-lg px-2.5 text-xs text-background text-foreground sm:w-44 sm:px-3 sm:text-base"
				value={activity.type}
				name="type"
			>
				{activity.label}
			</button>
		</form>
	);
};
