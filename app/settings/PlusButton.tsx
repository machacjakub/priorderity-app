import { PlusOutlined } from "@/icons";

export const PlusButton = ( { onClick, label }: {onClick: () => void, label: string} ) => {
	return ( <button className='bg-blue-100 dark:bg-blue-950 border border-blue-500 dark:border-blue-500/80 py-1 px-3 mt-1 rounded-full flex' onClick={onClick}>
		<PlusOutlined/><span>{label}</span>
	</button> );
};