import { CheckOutlined, LoadingOutlined } from "@/icons";

export const SaveChangesButton = ( { onClick, loading, done }: {loading?: boolean, done?: boolean, onClick: () => void} ) => {
	return (
		<button disabled={loading} className='text-foreground border border-green-400/90 transition transform transition-colors duration-300 bg-green-500/20 hover:bg-green-500/40  dark:border-green-500/80 py-1 px-4 mt-1 rounded-full'	 onClick={onClick} >
			<div className='flex gap-2'>
				{loading && <LoadingOutlined className='w-4 animate-spin text-foreground/70'/>}
				{!loading && done && <CheckOutlined className='w-4 text-foreground/70'/>}
				<span>Save changes</span>
			</div>
		</button> );
};