import { ITag } from "@/app/modules/profile/types";
import { useContext, useState } from "react";
import useBoolean from "@/app/utils/hooks/useBoolean";
import { EyeOutlined, EyeSlashOutlined } from "@/icons";
import { DoneButton } from "@/app/settings/DoneButton";
import { EditButton } from "@/app/settings/EditButton";
import { DeleteButton } from "@/app/settings/DeleteButton";
import { delay } from "@/app/modules/utils";
import { AddButton } from "@/app/settings/AddButton";
import { SaveChangesButton } from "@/app/settings/SaveChangesButton";
import { handleUpdateTags } from "@/database/actions";
import { TagColorPicker } from "@/app/settings/tags/TagColorPicker";
import userDataContext from "@/app/modules/context/userDataContext";

const colorClasses = [ [ "bg-yellow-200/70", "bg-yellow-400", "border-yellow-600", "text-yellow-800" ], [ "bg-red-200/70", "bg-red-400", "border-red-600", "text-red-800" ], [ "bg-green-200/70", "bg-green-400", "border-green-600", "text-green-800" ], [ "bg-blue-200/70", "bg-blue-400", "border-blue-600", "text-blue-800" ], [ "bg-orange-200/70", "bg-orange-400", "border-orange-600", "text-orange-800" ], [ "bg-gray-200/70", "bg-gray-400", "border-gray-600", "text-gray-800" ], [ "bg-cyan-200/70", "bg-cyan-400", "border-cyan-600", "text-cyan-800" ], [ "bg-pink-200/70", "bg-pink-400", "border-pink-600", "text-pink-800" ], [ "bg-purple-200/70", "bg-purple-400", "border-purple-600", "text-purple-800" ], [ "bg-lime-200/70", "bg-lime-400", "border-lime-600", "text-lime-800" ] ];

const TagField = ( { tag, onUpdate, onDelete, index }: { tag: ITag; index: number; onUpdate: ( updatedLabel: string, updatedColor: ITag['color'], index: number, hidden?: boolean ) => void, onDelete: ( index: number ) => void } ) => {
	const [ label, setLabel ] = useState( tag.label );
	const [ color, setColor ] = useState( tag.color );
	const editing = useBoolean( false );
	const hidden = useBoolean( tag.hidden );
	return (
		<div className='border-2 p-1.5 pl-4 my-2 flex justify-between rounded-xl w-full'>
			<div className='flex'>
				{editing.value || tag.label === 'new tag' ? <TagColorPicker value={color} onChange={( e ) => setColor( e.target.value )}/> : <div className={`w-5 h-5 my-auto mr-4 rounded-full bg-${color}-${hidden.value ? '200/70' : 400}`}/>}
				{editing.value || tag.label === 'new tag' ? <input className='text-black px-2 max-w-fit' value={label === 'new tag' ? undefined : label} placeholder={label === 'new tag' ? 'tag name' : undefined} onChange={( e ) => setLabel( e.target.value )}/> : <div className={`mt-0.5 ${hidden.value && 'text-gray-400 dark:text-gray-700' }`}>{tag.label}</div>}
			</div>
			<div className='flex gap-2'>
				<button className='p-1.5 rounded-full' onClick={() => {
					onUpdate( label, color, index, !hidden.value );
					hidden.toggle();
				}}>
					{hidden.value ? <EyeOutlined className='w-4'/> : <EyeSlashOutlined className='w-4'/>}
				</button>
				{editing.value || tag.label === 'new tag'
					? <DoneButton onClick={() => {
						onUpdate( label, color, index, hidden.value );
						editing.setFalse();
					}}/>
					: <EditButton onClick={editing.setTrue}/>}
				<DeleteButton onClick={() => onDelete( index )}/>
			</div>
		</div> );
};


export const TagsForm = ( ) => {
	const userTags = useContext( userDataContext )?.tags ?? [];
	const [ tags, setTags ] = useState<ITag[]>( userTags );
	const loading = useBoolean( false );
	const done = useBoolean( false );
	const updateTag = ( updatedLabel: string, updatedColor: ITag['color'], index: number, hidden?: boolean ) => {
		setTags( tags.map( ( tag, i ) => index === i ? { ...tag, label: updatedLabel, color: updatedColor, hidden: !!hidden } : tag ) );
	};
	const deleteTag = ( index: number ) => setTags( tags.filter( ( tag, i ) => index !== i ) );
	const handleSave = async () => {
		loading.setTrue();
		await handleUpdateTags( tags );
		loading.setFalse();
		done.setTrue();
		await delay( 4000 );
		done.setFalse();
	};
	return <div className='text-foreground px-4 mb-2'>
		{tags.map( ( tag, i ) => <div key={`${tag.label}-${tag.color}-${i}`}><TagField tag={tag} onUpdate={updateTag} onDelete={deleteTag} index={i}/></div> )}
		<div className='text-center'><AddButton onClick={() => setTags( [ ...tags, { label: 'new tag', color: 'yellow', hidden: false } ] ) } /></div>
		<div className='text-right'><SaveChangesButton loading={loading.value} done={done.value} onClick={handleSave}/></div>
	</div>;
};