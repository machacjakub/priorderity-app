import Link from "next/link";
import { ArrowLeftOutlined, HomeOutlined } from "@/icons";

export const MenuLink = ( { label, route, icon }: {label: string, route: string, icon?: 'home' | 'arrow'} ) => {
	return (
		<Link href={route} className='group text-foreground flex my-3'>
			<span className='text-transparent sm:group-hover:text-foreground relative top-0.5 left-4 group-hover:animate-fade duration-500'>{icon === 'home' ? <HomeOutlined className='h-6 py-0.5'/> : <ArrowLeftOutlined className='h-6 py-0.5'/>}</span>
			<div className='transition sm:group-hover:translate-x-5 duration-500 p-0.5'>
				{label}
			</div>
		</Link> );
};