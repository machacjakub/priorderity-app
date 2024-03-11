import { ITag } from "@/app/modules/profile/types";
import { Tag } from "@/app/modules/todo/Tag";

interface IProps {
	tags: ITag[];
	onUpdate?: ( clicked: ITag['label'] ) => void;
	readOnly?: boolean;
}


export const Tags = ( { tags, onUpdate, readOnly }: IProps ) => {
	return <div className='text-foreground flex flex-wrap gap-2'>
		{tags.map( ( tag ) => <Tag key={`${tag.label}-${tag.color}`} onUpdate={onUpdate} tag={tag} readOnly={readOnly}/> )}
	</div>;
};