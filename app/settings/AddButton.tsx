import { PlusOutlined } from "@/icons";

export const AddButton = ( { onClick }: {onClick: () => void} ) => {
	return <button className='transition transform transition-colors duration-300 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500 p-1 mt-1 rounded-full text-2xl' onClick={onClick}>
		<PlusOutlined/>
	</button>;
};