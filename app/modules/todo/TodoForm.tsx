import { ModalWindow } from "@/app/modules/components/ModalWindow";
import { FadingLine } from "@/app/modules/components/FadingLine";
import { Switch } from "@/app/modules/components/Switch";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { useRef } from "react";
import { delay, returnIfNotLower } from "@/app/modules/utils";
import { Button } from "@/app/modules/components/Button";
import { ITodoActivity } from "@/app/types";
import { padNumber } from "@/app/modules/todo/utils";
import {
	IHandleAddPlannedActivity, IHandleUpdatePlannedActivity
} from "@/database/actions";

interface IProps {
	onClose: () => void;
	isOpen: boolean;
	onAdd?: IHandleAddPlannedActivity;
	onUpdate?: IHandleUpdatePlannedActivity;
	initialValue?: ITodoActivity;
}

export const TodoForm = ( { onClose, isOpen, onAdd, onUpdate, initialValue }: IProps ) => {
	const deadlineDatePickerRef = useRef<HTMLInputElement | null>( null );
	const delayDatePickerRef = useRef<HTMLInputElement | null>( null );
	const hasDeadline = useBoolean( !!initialValue?.deadline );
	const isDelayed = useBoolean( !!initialValue?.delayed_to );
	const handleSubmit = async ( formData: FormData ) => {
		const name = formData.get( "name" );
		const priority = formData.get( "priority" );
		const deadline = formData.get( "deadline" );
		const delay = formData.get( "delayed_to" );
		const payload = { name: String( name ), priority: returnIfNotLower( Number( priority ), 1 ), deadline: deadline ? new Date( String( deadline ) ) : null, delayed_to: delay ? new Date( String( delay ) ) : null };
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
		isDelayed.toggle();
		await delay( 40 );
		if ( delayDatePickerRef.current ) {
			delayDatePickerRef.current.focus();
		}
	};
	return (
		<ModalWindow
			onClose={onClose}
			isOpen={isOpen}
			tailwind="flex items-center justify-center bg-foreground/10"
		>
			<div
				className="animate-in rounded-2xl bg-white/70 dark:bg-black/60 p-8 text-foreground backdrop-blur-lg shadow-2xl shadow-blue-950/70 dark:shadow-blue-500/70"
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
							</div>{" "}
							{ hasDeadline.value && (
								<input
									className="ml-5 w-32 px-1 text-black/80"
									defaultValue={`${new Date( initialValue?.deadline ?? '' ).getFullYear()}-${new Date( initialValue?.deadline ?? '' ).getMonth() + 1}-${padNumber( new Date( initialValue?.deadline ?? '' ).getDate() )}`}
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
								<Switch value={isDelayed.value} size="tiny" onToggle={onDelayToggle}/>
							</div>{" "}
							{ isDelayed.value && (
								<input
									className="ml-5 w-32 px-1 text-black/80"
									defaultValue={`${new Date( initialValue?.delayed_to ?? '' ).getFullYear()}-${new Date( initialValue?.delayed_to ?? '' ).getMonth() + 1}-${padNumber( new Date( initialValue?.delayed_to ?? '' ).getDate() )}`}
									type="date"
									name="delayed_to"
									ref={delayDatePickerRef}
								/>
							)}
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
