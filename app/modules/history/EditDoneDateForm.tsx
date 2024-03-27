import { FadingLine } from "@/app/modules/components/FadingLine";
import { Button } from "@/app/modules/components/Button";
import { ModalWindow } from "@/app/modules/components/ModalWindow";
import { IDoneActivity } from "@/app/types";
import { handleUpdateDoneActivity } from "@/database/actions";
import { getDateTimeInput } from "@/app/utils/date";

interface IProps {
    onClose: () => void;
    isOpen: boolean;
    activity: IDoneActivity;
}

export const EditDoneDateForm = ( { onClose, isOpen, activity }: IProps ) => {
	const handleSubmit = async ( formData: FormData ) => {
		const doneDate = formData.get( "done_date" );
		await handleUpdateDoneActivity( { id: activity.id, created_at: new Date( String( doneDate ) ) } );
		onClose();
	};
	return (
		<ModalWindow onClose={onClose} isOpen={isOpen} tailwind="flex items-center justify-center bg-foreground/10">
			<div
				className="animate-in rounded-2xl bg-white/70 dark:bg-black/60 p-8 text-foreground backdrop-blur-lg shadow-2xl shadow-blue-950/70 dark:shadow-blue-500/70"
				onClick={( e ) => e.stopPropagation()}
			>
				<h1 className="mx-6 mb-2 text-center text-xl p-1">
                  Edit item
				</h1>
				<FadingLine />
				<form action={handleSubmit}>
					<div className="mt-4 grid grid-cols-3">
						<label className="p-2 text-right">
                          Date of done:
						</label>
						<div className="col-span-2 flex p-1">
							<input
								className="ml-5 w-48 px-1 text-black/80"
								defaultValue={getDateTimeInput( activity.created_at )}
								type="datetime-local"
								name="done_date"
							/>
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