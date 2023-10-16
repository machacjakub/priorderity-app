import { ModalWindow } from "@/app/modules/components/ModalWindow";
import { FadingLine } from "@/app/modules/components/FadingLine";
import { Switch } from "@/app/modules/components/Switch";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { handleAddPlannedActivity } from "@/database/actions";
import { useRef } from "react";
import { delay } from "@/app/modules/utils";

interface IProps {
	onClose: () => void;
	isOpen: boolean;
}

export const TodoForm = ( { onClose, isOpen }: IProps ) => {
	const datePickerRef = useRef<HTMLInputElement | null>( null );
	const hasDeadline = useBoolean( false );
	const handleSubmit = async ( formData: FormData ) => {
		const name = formData.get( "name" );
		const priority = formData.get( "priority" );
		const deadline = formData.get( "deadline" );

		await handleAddPlannedActivity( {
			name: String( name ),
			priority: Number( priority ),
			deadline: deadline
				? new Date( String( deadline ) )
				: null,
		} );
		onClose();
	};
	console.log( "render" );

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
							name={
								"name"
							}
							placeholder="title of the todo"
							className="col-span-2 m-1 px-2 text-black/80"
							autoFocus
						/>
						<label className="p-2 text-right">
							Priority:{" "}
						</label>{" "}
						<input
							name={
								"priority"
							}
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
								<Switch
									value={
										hasDeadline.value
									}
									size="tiny"
									onToggle={
										onDeadlineToggle
									}
								/>
							</div>{" "}
							{hasDeadline.value && (
								<input
									className="ml-5 w-32 px-1 text-black/80"
									type="date"
									name="deadline"
									ref={
										datePickerRef
									}
								/>
							)}
						</div>
					</div>
					<div className="flex justify-between">
						<button
							onClick={
								onClose
							}
							className="mt-6 rounded-lg bg-red-600/30 px-3 py-2 text-foreground hover:bg-red-600/50"
						>
							Close
						</button>
						<button
							type="submit"
							className="mt-6 rounded-lg bg-blue-400/40 p-2 px-3 py-2 text-foreground hover:bg-blue-400/60"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</ModalWindow>
	);
};
