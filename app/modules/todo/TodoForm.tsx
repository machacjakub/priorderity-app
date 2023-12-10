import { ModalWindow } from "@/app/modules/components/ModalWindow";
import { FadingLine } from "@/app/modules/components/FadingLine";
import { Switch } from "@/app/modules/components/Switch";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { useRef } from "react";
import { delay } from "@/app/modules/utils";
import { Button } from "@/app/modules/components/Button";
import { ITodoActivity } from "@/app/types";
import { padNumber } from "@/app/modules/todo/utils";
import { IHandleAddPlannedActivityArguments, IHandleUpdatePlannedActivityArguments
} from "@/database/actions";

interface IProps {
	onClose: () => void;
	isOpen: boolean;
	onSubmit: ( action: IHandleAddPlannedActivityArguments | IHandleUpdatePlannedActivityArguments ) => void;
	initialValue?: ITodoActivity;
}

export const TodoForm = ( { onClose, isOpen, onSubmit, initialValue }: IProps ) => {
	const datePickerRef = useRef<HTMLInputElement | null>( null );
	const hasDeadline = useBoolean( !!initialValue?.deadline );
	const handleSubmit = async ( formData: FormData ) => {
		const name = formData.get( "name" );
		const priority = formData.get( "priority" );
		const deadline = formData.get( "deadline" );
		const payload = { name: String( name ), priority: Number( priority ), deadline: deadline ? new Date( String( deadline ) ) : null, };
		await onSubmit( initialValue?.id ? { ...payload, id: initialValue.id } : payload );

		onClose();
	};

	const onDeadlineToggle = async () => {
		hasDeadline.toggle();
		await delay( 40 );
		if ( datePickerRef.current ) {
			datePickerRef.current.focus();
		}
	};
	return (
		<ModalWindow
			onClose={onClose}
			isOpen={isOpen}
			tailwind="flex items-center justify-center"
		>
			<div
				className="animate-in rounded-2xl border-2 border-foreground/90 bg-background/50 p-4 p-6 text-foreground backdrop-blur-lg"
				onClick={( e ) => e.stopPropagation()}
			>
				<h1 className="mx-6 mb-2 text-center text-2xl">
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
									ref={datePickerRef}
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
