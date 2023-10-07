export const LogInButton = ( { children, small, tailwind, formAction }: {children: string, small?: boolean, tailwind?: string, formAction?: string} ) => {
	return <button formAction={formAction} className={`text-black font-semibold px-4 ${small ? 'py-1' : 'py-3'} rounded-md hover:from-violet-200 hover:to-cyan-200 ${tailwind}`} >{children}</button>;
}; 