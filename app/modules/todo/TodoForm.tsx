import { ModalWindow } from "@/app/modules/components/ModalWindow";
import { FadingLine } from "@/app/modules/components/FadingLine";
import { Switch } from "@/app/modules/components/Switch";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { useContext, useRef, useState } from "react";
import { delay, returnIfNotLower } from "@/app/modules/utils";
import { Button } from "@/app/modules/components/Button";
import { ITodoActivity } from "@/app/types";
import {
	IHandleAddPlannedActivity, IHandleUpdatePlannedActivity
} from "@/database/actions";
import { Tags } from "@/app/modules/todo/Tags";
import { IPredefinedActivity, ITag } from "@/app/modules/profile/types";
import { PredefinedStatsForm } from "@/app/settings/predefinedActivities/PredefinedStatsForm";
import userDataContext from "@/app/modules/context/userDataContext";
import { getDateInput } from "@/app/utils/date";

interface IProps {
	onClose: () => void;
	isOpen: boolean;
	onAdd?: IHandleAddPlannedActivity;
	onUpdate?: IHandleUpdatePlannedActivity;
	initialValue?: ITodoActivity;
	userTags: ITag[];
}

export const TodoForm = ( { onClose, isOpen, onAdd, onUpdate, initialValue, userTags }: IProps ) => {
	const userData = useContext( userDataContext );
	const deadlineDatePickerRef = useRef<HTMLInputElement | null>( null );
	const delayDatePickerRef = useRef<HTMLInputElement | null>( null );
	const hasDeadline = useBoolean( !!initialValue?.deadline );
	const hasDelay = useBoolean( !!initialValue?.delayed_to );
	const hasMetricScores = useBoolean( !!initialValue?.stats );
	const [ tags, setTags ] = useState( userTags );
	const [ metrics, setMetrics ] = useState<IPredefinedActivity['metrics']>( initialValue?.stats ?? {} );
	const handleSubmit = async ( formData: FormData ) => {
		const name = formData.get( "name" );
		const priority = formData.get( "priority" );
		const deadline = formData.get( "deadline" );
		const delay = formData.get( "delayed_to" );
		const payload = {
			name: String( name ),
			priority: returnIfNotLower( Number( priority ), 1 ),
			deadline: deadline ? new Date( String( deadline ) ) : null,
			delayed_to: delay ? new Date( String( delay ) ) : null,
			tags: tags.filter( tag => tag.selected ).map( tag => tag.label ),
			stats: metrics,
		};
		if ( initialValue?.id && onUpdate ) {
			await onUpdate( { ...payload, id: initialValue.id } );
		}
		if ( !initialValue?.id && onAdd ) {
			await onAdd( payload );
		} 

		onClose();
	};

	const onDeadlineToggle = async () => {
		hasDeadline.toggle();
		await delay( 40 );
		if ( deadlineDatePickerRef.current ) {
			deadlineDatePickerRef.current.focus();
		}
	};

	const onDelayToggle = async () => {
		hasDelay.toggle();
		await delay( 40 );
		if ( delayDatePickerRef.current ) {
			delayDatePickerRef.current.focus();
		}
	};
	const onMetricScoresToggle = async () => {
		hasMetricScores.toggle();
	};
	return (
		<ModalWindow
			onClose={onClose}
			isOpen={isOpen}
			tailwind="flex items-center justify-center bg-foreground/10"
		>
			<div
				className="animate-in rounded-2xl bg-white/70 dark:bg-black/60 p-8 text-foreground backdrop-blur-lg shadow-2xl shadow-blue-950/70 dark:shadow-blue-500/70 z-50"
				onClick={( e ) => e.stopPropagation()}
			>
				<h1 className="mx-6 mb-2 text-center text-xl p-1">
					Add new to-do item
				</h1>
				<FadingLine />
				<form action={handleSubmit}>
					<div className="mt-4 grid grid-cols-3">
						<label className="p-2 text-right">
							Title:{" "}
						</label>{" "}
						<input
							name={"name"}
							defaultValue={initialValue?.name}
							placeholder="title of the todo"
							className="col-span-2 m-1 px-2 text-black/80"
							autoFocus
						/>
						<label className="p-2 text-right">
							Priority:{" "}
						</label>{" "}
						<input
							name={"priority"}
							defaultValue={initialValue?.priority}
							placeholder="0"
							type="number"
							min={0}
							max={10}
							className="col-span-2 m-1 w-20 px-2 text-black/80"
						/>
						<label className="p-2 text-right">
							Deadline:{" "}
						</label>{" "}
						<div className="col-span-2 flex p-1">
							<div className="mt-1.5">
								<Switch value={hasDeadline.value} size="tiny" onToggle={onDeadlineToggle}/>
							</div>
							{ hasDeadline.value && (
								<input
									className="ml-5 w-32 px-1 text-black/80"
									defaultValue={getDateInput( initialValue?.deadline ?? new Date() )}
									type="date"
									name="deadline"
									ref={deadlineDatePickerRef}
								/>
							)}
						</div>
						<label className="p-2 text-right">
							Delay:
						</label>{" "}
						<div className="col-span-2 flex p-1">
							<div className="mt-1.5">
								<Switch value={hasDelay.value} size="tiny" onToggle={onDelayToggle}/>
							</div>{" "}
							{ hasDelay.value && (
								<input
									className="ml-5 w-32 px-1 text-black/80"
									defaultValue={getDateInput( initialValue?.delayed_to ?? new Date() )}
									type="date"
									name="delayed_to"
									ref={delayDatePickerRef}
								/>
							)}
						</div>
						<label className="p-2 text-right">
							Metrics score:
						</label>
						<div className="col-span-2 flex p-1">
							<div className="mt-1.5">
								<Switch value={hasMetricScores.value} size="tiny" onToggle={onMetricScoresToggle}/>
							</div>
						</div>
						{ hasMetricScores.value && <div/>}
						{ hasMetricScores.value && (
							<div className={'ml-3 col-span-3 sm:col-span-2'}>
								<PredefinedStatsForm userMetrics={userData?.metrics ?? null} metrics={metrics} onChange={setMetrics}/>
							</div>
						)}
						<label className="p-2 text-right">
							Tags:
						</label>
						<div className="col-span-2 flex px-1 py-2" >
							<Tags tags={tags} onUpdate={( clicked: string ) => setTags( tags.map( tag => tag.label === clicked ? { ...tag, selected: !tag.selected } : tag ) )}/>
						</div>
					</div>
					<div className="flex justify-end mt-4 gap-3">
						<Button onClick={onClose} type="tertiary" color="warning">
							Close
						</Button>
						<Button buttonType="submit">
							Submit
						</Button>
					</div>
				</form>
			</div>
		</ModalWindow>
	);
};
