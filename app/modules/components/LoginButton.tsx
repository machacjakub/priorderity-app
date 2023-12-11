'use client';
import useBoolean from "@/app/utils/hooks/useBoolean";
import { LoadingOutlined } from "@/icons";

export const LogInButton = ( {
	children,
	small,
	tailwind,
	formAction,
	loading,
}: {
	children: string;
	small?: boolean;
	tailwind?: string;
	formAction?: string;
	loading?: boolean;
} ) => {
	const isLoading = useBoolean( loading );
	return (
		<button formAction={formAction} onClick={isLoading.setTrue} className={`flex justify-between px-4 font-semibold text-foreground ${small ? "py-1" : "py-3"} rounded-xl hover:from-violet-200 hover:to-cyan-200 ${tailwind}`}>
			{isLoading.value ? <LoadingOutlined className='w-4 m-1 relative animate-spin'/> : <div className='w-6'/>}
			{children}
			<div className='w-6'/>
		</button>
	);
};
