import { CheckOutlined } from "@/icons";

export const DoneButton = ( { onClick }: {onClick: () => void} ) => <button className='p-1.5 rounded-full transition transform transition-colors duration-300 bg-green-500/20 hover:bg-green-500/40 border border-green-500' onClick={onClick}><CheckOutlined className='w-4'/></button>;