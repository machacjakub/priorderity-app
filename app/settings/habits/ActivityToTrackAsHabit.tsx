import userDataContext from "@/app/modules/context/userDataContext";
import { useContext } from "react";

export const ActivityToTrackAsHabit = ( { activityType }: {activityType: string} ) => {
	const activities = useContext( userDataContext )?.activities_stats;
	return <div className='border-b-2 border-l-2 border-blue-400 p-1 px-2.5 mb-1 rounded-xl my-2 w-fit'>{activities?.find( a => a.type === activityType )?.label ?? activityType}</div>;
};