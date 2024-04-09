import { LoadingOutlined } from "@/icons";

export default async function Loading () {
	return <div className='w-screen h-screen flex justify-center bg-transparent'>
		<LoadingOutlined className='m-auto w-8 animate-spin text-foreground'/>
	</div>;
};