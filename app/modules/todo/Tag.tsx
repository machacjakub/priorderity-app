import { ITag } from "@/app/modules/profile/types";

const colorClasses = [ "bg-yellow-500/30", "hover:bg-yellow-500/60", "border-yellow-500", "border-yellow-500/5", "bg-red-500/30", "hover:bg-red-500/60", "border-red-500", "border-red-500/5", "bg-green-500/30", "hover:bg-green-500/60", "border-green-500", "border-green-500/5", "bg-blue-500/30", "hover:bg-blue-500/60", "border-blue-500", "border-blue-500/5", "bg-orange-500/30", "hover:bg-orange-500/60", "border-orange-500", "border-orange-500/5", "bg-gray-500/30", "hover:bg-gray-500/60", "border-gray-500", "border-gray-500/5", "bg-cyan-500/30", "hover:bg-cyan-500/60", "border-cyan-500", "border-cyan-500/5", "bg-pink-500/30", "hover:bg-pink-500/60", "border-pink-500", "border-pink-500/5", "bg-purple-500/30", "hover:bg-purple-500/60", "border-purple-500", "border-purple-500/5", "bg-lime-500/30", "hover:bg-lime-500/60", "border-lime-500", "border-lime-500/5", "text-foreground/40", "text-foreground/40" ];

interface IProps {
	tag: ITag;
	onUpdate?: ( clicked: ITag['label'] ) => void;
	readOnly?: boolean;
}

export const Tag = ( { tag, onUpdate, readOnly }: IProps ) => {
	const handleClick = async () => {
		onUpdate && onUpdate( tag.label );
	};

	return <button onClick={handleClick} type={"button"} className={`bg-${tag.color}-500/30 ${!readOnly && `hover:bg-${tag.color}-500/60`} ${readOnly && 'cursor-default' } border border-${tag.color}-500${tag.selected ? '' : '/5'} text-foreground${tag.selected ? '' : '/40'} w-fit px-3 py-0.5 text-sm rounded-lg h-fit`}>{tag.label}</button>;
};