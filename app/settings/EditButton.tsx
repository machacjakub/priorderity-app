import { EditOutlined } from "@/icons";

export const EditButton = ( { onClick }:{onClick: () => void} ) => <button className='p-1.5 rounded-full transition transform transition-colors duration-300 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500' onClick={onClick}>
	<EditOutlined className='w-4'/>
</button>;