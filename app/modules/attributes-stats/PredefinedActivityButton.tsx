import { handleAddDoneActivity } from "@/database/actions";

interface IProps {
	activity: { type: string };
	handleAdd: (type: string) => void;
}

export const PredefinedActivityButton = ({ activity, handleAdd }: IProps) => {
	return (
		<form
			action={async (formData) => {
				const type = formData.get("type");
				await handleAdd(String(type));
				await handleAddDoneActivity(
					String(type),
				);
			}}
		>
			<button
				className="max-w-40 w-28 flex-grow rounded-lg bg-blue-300/80 bg-gradient-to-r from-violet-400/40 via-transparent to-cyan-500/30 px-2 py-3 text-xs text-background text-foreground dark:bg-blue-400/80 dark:from-violet-600/40 sm:w-44 sm:px-3 sm:text-base"
				value={activity.type}
				name="type"
			>
				{activity.type}
			</button>
		</form>
	);
};
