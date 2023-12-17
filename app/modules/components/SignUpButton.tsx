'use client';

import useBoolean from "@/app/utils/hooks/useBoolean";
import { LoadingOutlined } from "@/icons";

export const SignUpButton = ( {
	children,
	small,
	tailwind,
	formAction,
}: {
	children: string;
	small?: boolean;
	tailwind?: string;
	formAction?: string;
} ) => {
	const isLoading = useBoolean( false );
	return (
		<button formAction={formAction} onClick={isLoading.setTrue} className={`flex justify-between text-foreground font-semibold bg-blue-300 dark:bg-blue-500 ${small ? "sm:text-md" : "sm:text-xl"} ${small ? "px-4" : "px-6"} ${small ? "py-1" : "py-3"} rounded-xl hover:bg-blue-400 ${tailwind}`}>
			{isLoading.value ? <LoadingOutlined className='w-4 m-1 relative animate-spin'/> : <div className='w-6'/>}
			{children}
			<div className='w-6'/>
		</button>
	);
};
