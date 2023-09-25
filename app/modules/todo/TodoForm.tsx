import {ModalWindow} from "@/app/modules/components/ModalWindow";
import {FadingLine} from "@/app/modules/components/FadingLine";
import {Switch} from "@/app/Switch";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { handleAddPlannedActivity} from "@/database/actions";

interface IProps {
	onClose: () => void;
	isOpen: boolean
}

export const TodoForm = ( {onClose, isOpen}:IProps ) => {
	const handleSubmit = async ( formData: FormData ) => {
		const name = formData.get( 'name' );
		const priority = formData.get( 'priority' );

		await handleAddPlannedActivity( {name: String( name ), priority: Number( priority )} );
		onClose();
	};
	const hasDeadline = useBoolean( false );
	return (
		<ModalWindow onClose={onClose} isOpen={isOpen} tailwind="flex items-center justify-center">
			<div className="text-foreground p-6 backdrop-blur-lg bg-background/50 p-4 rounded-2xl border-2 border-foreground/90 " onClick={( e ) => e.stopPropagation()}>
				<h1 className="mx-6 mb-2 text-2xl text-center">Add new to-do item</h1>
				<FadingLine/>
				<form action={handleSubmit}>
					<div className='mt-4 grid grid-cols-4'>
						<label className="text-right p-2">Title: </label> <input name={'name'} placeholder="title of the todo" className="text-background/80 px-2 m-1 col-span-2"/> <div/>
						<label className="text-right p-2">Priority: </label> <input name={'priority'} placeholder="0" type='number' className="text-background/80 px-2 m-1 w-20 col-span-2" /> <div/>
						<label className="text-right p-2">Deadline: </label> <div className="p-1 flex col-span-2"><div className="mt-1.5"><Switch value={hasDeadline.value} size='tiny' onToggle={hasDeadline.toggle} /></div> {hasDeadline.value && ( <input className='px-1 ml-5 w-32 text-background/80' type='date'/> )}</div> <div/>
					</div>
					<div className='flex justify-between'>
						<button onClick={onClose} className="bg-red-600/30 px-3 py-2 mt-6 rounded-lg text-foreground hover:bg-red-600/50" >Close</button>
						<button type='submit' className="bg-gradient-to-r px-3 py-2 from-violet-500/50 to-cyan-400/30 p-2 mt-6 rounded-lg text-foreground hover:from-violet-500/75 hover:to-cyan-400/50" >Submit</button>
					</div>
				</form>

			</div>
		</ModalWindow>
	);
};
