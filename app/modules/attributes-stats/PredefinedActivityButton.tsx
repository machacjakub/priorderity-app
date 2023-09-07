import {addDoneActivity} from "@/app/modules/done/doneModule";

interface IProps {
    activity: {type: string};
}

export const PredefinedActivityButton = ( {activity}: IProps ) => {
	return <button className="bg-blue-300/80 dark:bg-blue-400/80 bg-gradient-to-r from-violet-400/40 dark:from-violet-600/40 via-transparent to-cyan-500/30 text-foreground rounded-lg p-3 w-44 flex-grow max-w-40 text-background" onClick={async () => await addDoneActivity( activity.type )}>{activity.type}</button>;
};