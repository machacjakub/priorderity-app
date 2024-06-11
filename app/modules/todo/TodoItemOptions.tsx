import { ITodoActivity } from "@/app/types";
import { IRecommendation } from "@/app/modules/profile/types";
import { useContext } from "react";
import todoModuleContext from "@/app/modules/context/todoModuleContext";
import userDataContext from "@/app/modules/context/userDataContext";
import { pipe } from "fputils";
import { getDayAt6AM, incrementDay } from "@/app/utils/date";
import { handleUpdatePlannedActivity } from "@/database/actions";

interface IOptionsProps {
    onClose: () => void
    activity: ITodoActivity;
    formDisplayed: {value: boolean, setFalse: () => void, setTrue: () => void};
}

const delayRecommendedActivity = ( activity: ITodoActivity, date: Date ) => ( recommendation: IRecommendation ) => recommendation.activityLabel === activity.name ? { ...recommendation, delayed_to: date } : recommendation;
export const TodoItemOptions = ( { onClose, formDisplayed, activity }: IOptionsProps ) => {
	const { updateRecommendations, recommendations } = useContext( todoModuleContext );
	const userData = useContext( userDataContext );
	const handleClick = ( e: any ) => {
		e.stopPropagation();
	};
	const handlePostponeTomorrow = async () => {
		onClose();
		const tomorrow = pipe( new Date(), incrementDay, getDayAt6AM );
		if ( !activity.isRecommended ) {
			await handleUpdatePlannedActivity( { ...activity, delayed_to: tomorrow } );
			return;
		}
		await updateRecommendations( recommendations?.map( delayRecommendedActivity( activity, tomorrow ) ) ?? null );
	};

	const onEdit = () => {
		formDisplayed.setTrue();
		onClose();
	};

	return (
		<>
			<div className='fixed z-20 w-screen h-screen top-0 cursor-auto' onClick={onClose}/>
			<div className='z-40 bg-background/70 p-1 border-t rounded-b-lg flex justify-around cursor-auto' onClick={handleClick}>
				<div className='cursor-pointer' onClick={onEdit}>Edit</div>
				<div className='cursor-pointer' onClick={handlePostponeTomorrow}>Tomorrow</div>
			</div>
		</>
	);
};