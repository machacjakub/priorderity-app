import { ITodoActivity } from "@/app/types";
import {
	handleUpdatePlannedActivity, handleUpdateRecommendations,
	IHandleUpdatePlannedActivity, IHandleUpdatePlannedActivityArguments
} from "@/database/actions";
import { XOutlined } from "@/icons";
import { returnIfNotHigher } from "@/app/modules/utils";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { TodoForm } from "@/app/modules/todo/TodoForm";
import { IRecommendation, ITag } from "@/app/modules/profile/types";
import { useContext } from "react";
import userDataContext from "@/app/modules/context/userDataContext";
import { useTouch } from "@/app/utils/hooks/useTouch";
import { Responsive } from "@/app/modules/components/Responsive";
import { getDayAt6AM, incrementDay } from "@/app/utils/date";
import { pipe } from "fputils";

interface IOptionsProps {
	onClose: () => void
	onUpdate: IHandleUpdatePlannedActivity;
	activity: ITodoActivity;
	userTags: ITag[];
}

const delayRecommendedActivity = ( activity: ITodoActivity, date: Date ) => ( recommendation: IRecommendation ) => recommendation.activityLabel === activity.name ? { ...recommendation, delayed_to: date } : recommendation;
const Options = ( { onClose, onUpdate, activity, userTags
}: IOptionsProps ) => {
	const formDisplayed = useBoolean( false );
	const recommendations = useContext( userDataContext )?.recommendations ?? [];
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
		await handleUpdateRecommendations( recommendations?.map( delayRecommendedActivity( activity, tomorrow ) ) );
	};

	const onEdit = async ( activity: IHandleUpdatePlannedActivityArguments ) => {
		onClose();
		formDisplayed.setFalse;
		await onUpdate( activity );
	};
	return (
		<>
			{formDisplayed.value && <div className='w-screen h-screen top-0 z-30 fixed'><TodoForm onClose={formDisplayed.setFalse} isOpen={formDisplayed.value} onUpdate={onEdit} initialValue={activity} userTags={userTags}/></div>}
			<div className='fixed z-20 w-screen h-screen top-0 cursor-auto' onClick={onClose}/>
			<div className='z-30 bg-background/70 p-1 border-t rounded-b-lg flex justify-around cursor-auto' onClick={handleClick}>
				<div className='cursor-pointer' onClick={formDisplayed.setTrue}>Edit</div>
				<div className='cursor-pointer' onClick={handlePostponeTomorrow}>Tomorrow</div>
			</div>
		</>
	);
};

interface ICommonProps {
	activity: ITodoActivity;
	onDelete: ( id: number ) => void;
}

export const Common = ( { activity, onDelete }: ICommonProps ) => {
	const handleDelete = async ( e: any ) => {
		e.stopPropagation();
		await onDelete( activity.id );
	};

	const priorityToDisplay = returnIfNotHigher( Math.ceil( activity.calculatedPriority ), 11 );
	return (
		<>
			<span className="my-2 mx-2 w-7 text-center text-sm pt-0.5 text-transparent group-hover:text-foreground/70 group-hover:bg-foreground/10 rounded-full">
				{priorityToDisplay}
			</span>
			<div className='flex justify-between w-full' >
				<span className="my-2">{activity.name}</span>
				<button className="pr-4 hover:text-foreground/60 sm:my-2 sm:mr-4 sm:pr-0" onClick={handleDelete}>
					<XOutlined className={`w-5 ${activity.isRecommended && 'text-transparent'}`}/>
				</button>
			</div>
		</>
	);
};

interface ITodoItemProps {
	activity: ITodoActivity;
	onDelete: ( id: number ) => void;
	onUpdate: IHandleUpdatePlannedActivity
	onMarkAsDone: ( activity: ITodoActivity ) => void;
}
export const TodoItem = ( { activity, onDelete, onMarkAsDone, onUpdate }: ITodoItemProps ) => {
	const userData = useContext( userDataContext );
	const optionsDisplayed = useBoolean( false );
	const { onTouchStart, onTouchEnd, onTouchMove } = useTouch( {
		onHold: async () => {
			optionsDisplayed.setTrue();
		},
		onTap: async () => {
			await onMarkAsDone( activity );
		},
	} );

	const handleItemClick = async () => {
		await onMarkAsDone( activity );
	};
	const handleItemRightClick = async ( event: any ) => {
		event.preventDefault();
		optionsDisplayed.setTrue();
	};

	const priorityToDisplay = returnIfNotHigher( Math.ceil( activity.calculatedPriority ), 11 );
	const colors = [ 'border-l-priority-11', 'border-l-priority-10','border-l-priority-9','border-l-priority-8','border-l-priority-7','border-l-priority-6','border-l-priority-5','border-l-priority-4','border-l-priority-3','border-l-priority-2','border-l-priority-1', ];
	return (
		<>
			<Responsive.Desktop>
				<div className={`group m-2 flex flex-col rounded-lg border-l-8 border-l-priority-${priorityToDisplay} bg-gradient-to-r from-gray-500/10 to-blue-400/30 cursor-pointer hover:bg-gray-500/20`}>
					<div
						className='flex'
						onClick={handleItemClick}
						onContextMenu={handleItemRightClick}
					>
						<Common activity={activity} onDelete={onDelete}/>
					</div>
					{optionsDisplayed.value && <Options onClose={optionsDisplayed.setFalse} onUpdate={onUpdate} activity={activity} userTags={userData?.tags?.map( tag => activity?.tags?.includes( tag.label ) ? { ...tag, selected: true } : { ...tag, selected: false } ) ?? []} />}
				</div>
			</Responsive.Desktop>
			<Responsive.Mobile>
				<div className={`select-none group m-2 flex flex-col rounded-lg border-l-8 border-l-priority-${priorityToDisplay} bg-gradient-to-r from-gray-500/10 to-blue-400/30 cursor-pointer hover:bg-gray-500/20`}>
					<div
						className='flex '
						onContextMenu={( e ) => e.preventDefault()}
						onTouchStart={onTouchStart}
						onTouchEnd={onTouchEnd}
						onTouchMove={onTouchMove}
					>
						<Common activity={activity} onDelete={onDelete}/>
					</div>
					{optionsDisplayed.value && <Options onClose={optionsDisplayed.setFalse} onUpdate={onUpdate} activity={activity} userTags={userData?.tags?.map( tag => activity?.tags?.includes( tag.label ) ? { ...tag, selected: true } : { ...tag, selected: false } ) ?? []} />}
				</div>
			</Responsive.Mobile>
		</>
	);
};