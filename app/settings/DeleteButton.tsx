import { DeleteOutlined } from "@/icons";

export const DeleteButton = ( { onClick }: {onClick: () => void} ) => <button className='p-1.5 rounded-full transition transform transition-colors duration-300 bg-red-500/20 hover:bg-red-500/40 border border-red-500' onClick={onClick}>
	<DeleteOutlined className='w-4' />
</button>;